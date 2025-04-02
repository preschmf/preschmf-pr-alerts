# :inbox_tray: preschmf-pr-alerts
A Node.js and Express project that checks for changes or messages in all PRs made by a user in GitHub Enterprise through the GitHub Enterprise API. If any activity is detected on a PR made by the user, a Teams chat message is sent to the user from themselves supplying links to the updates. This message is sent using the Microsoft Teams Graph API.

## Why this project?
There are three main reasons for this project:
* Personally, I feel that the GitHub hooks that companies use to provide alerts for Pull Request and Issue activities gets very cluttered with messages, and as a result, it becomes less useful. Teams messages are very visible, and arrive with a popup and an alert sound. I found the Teams messages this app creates result in reacting to activty faster, improving workflow speed.
* Enterprsies do not always allow access to GitHub hooks, but must allow access to the GitHub API. This project works more universally across companies with different security policies.
* The constraint of being limited to the GitHub API and the Microsoft Graph API was a good challenge for making this project work, and allowed me to get familiar with both APIs that are frequently used in a professional context. This is valuable for the possibility of building off of the APIs in the future.

## Project Overview
* Used the Octokit npm package to simplify requests to the GitHub Enterprise API.
### server.js
* Sets up the Express server.
* Uses the GET /user GitHub API with GitHUb access token to get username automatically.
* Sets up the polling function the project is based around. newReviewComments will be called every time interval in ms that was specified in the .env file.

### newReviewComments Controller
* Since GitHub PRs are technically issues, we get all the PRs and issues with the GET /search/issues request.
* If there are open PRs, we check for recently updated PRs, if there are none, we save on computation and skip the rest of the function.
* If there are PRs updated since the last poll, we make a request to get all the reviews on the PR.
* Then we filter out the reviews made since the last poll.
* Finally, we send ourselves a message with a list of all new reviews, and the URL for each to quickly access them.
   * Self-chat is a special kind of chat in Microsoft Team, I found the POST /chats/48:notes/messages endpoint will send a message to yourself.

## Setting Up the Project
### Create.env file
Create an .env file in the root with five variables:
* POLL_INTERVAL = Time in ms that the project will poss the GitHub Enterprise API for changes
* PORT = Port you want the project to run on, eg: 9009
* GITHUB_AUTH_TOKEN = GitHub auth [token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
* MICROSOFT_GRAPH_TOKEN = This can be easily obtained by navigating to the [Graph Explorer](developer.microsoft.com/en-us/graph/graph-explorer), signing in, and clicking "access token" in the request
* GITHUB_ENTERPRSIE_BASE_URL = The base URL for your company's Enterprise GitHub, eg: https://github.mycompany.com/api/v3
