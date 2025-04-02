import { getReviewsOnPR } from "../adapters/gitHubRequests.js"
import { getOpenPullRequestsByAuthor } from "../adapters/gitHubRequests.js"
import { sendSelfMessage } from "../adapters/teamsRequests.js"

const determinePullRequestRepo = (pullRequest) => {
    const repoName = pullRequest.url.split('/').reverse()[2]
    return repoName
}

const formatReviewsForMessage = (reviews) => {
    let formattedMessage = 'New reviews: '
    reviews.map((review) => {
        const reviewUrl = review.html_url
        formattedMessage = formattedMessage.concat(' ', reviewUrl)
    })

    return formattedMessage
}

const checkForRecentlyUpdatedPRs = (pullRequests, pollInterval) => {
    const recentlyUpdatedPRs = pullRequests.filter((pr) => {
        const currentTime = new Date()
        const updatedTime = new Date(pr.updated_at)
        const timeSinceLastUpdate = currentTime.getTime() - updatedTime.getTime()
        if (timeSinceLastUpdate < pollInterval) {
            return true
        }
    })

    return recentlyUpdatedPRs
}

const getNewReviews = async (pullRequests, pollInterval) => {
    const newReviews = []

    for (const pr of pullRequests) {
        const reviews = await getReviewsOnPR(pr.number, determinePullRequestRepo(pr))

        if (reviews) {
            reviews.forEach((review) => {
                const currentTime = new Date()
                const updatedTime = new Date(review.submitted_at)
                const timeSinceReviewMade = currentTime.getTime() - updatedTime.getTime()
                if (timeSinceReviewMade < pollInterval) {
                    newReviews.push(review)
                }
            })
        }
    }

    return newReviews
}

export const newReviewComments = async (userName, pollInterval) => {


    const myOpenPullRequests = await getOpenPullRequestsByAuthor(userName)

    if (myOpenPullRequests) {
        const recentlyUpdatedPRs = checkForRecentlyUpdatedPRs(myOpenPullRequests, pollInterval)
        if (recentlyUpdatedPRs) {
            const newReviews = await getNewReviews(recentlyUpdatedPRs, pollInterval)
            console.log(newReviews)
            await sendSelfMessage(formatReviewsForMessage(newReviews))
        }
    }

}