import { Octokit } from '@octokit/rest'

const gitHubAuthToken = process.env.GITHUB_AUTH_TOKEN
const gitHubEnterpriseBaseUrl = process.env.GITHUB_ENTERPRISE_BASE_URL
const gitHubOwner = process.env.GITHUB_OWNER

const octokit = new Octokit({
    auth: gitHubAuthToken,
    userAgent: 'prAlerts v0.1',
    baseUrl: gitHubEnterpriseBaseUrl
})

export const getOpenPullRequestsByAuthor = async (userName) => {
    const queryString = `author:${userName} type:pr state:open`
    const { data } = await octokit.request(`GET /search/issues`, {
        q: queryString,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    }).catch((e) => {
        console.log(e?.message)
    })
    return data.items
}

export const getUserName = async () => {
    const { data } = await octokit.request('GET /user', {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    }).catch((e) => {
        console.log(e?.message)
    })
    return data.login
}

export const getReviewsOnPR = async (pullNumber, repo) => {
    const { data } = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews', {
        owner: gitHubOwner,
        repo: repo,
        pull_number: pullNumber,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    }).catch((e) => {
        console.log(e?.message)
    })
    return data
}