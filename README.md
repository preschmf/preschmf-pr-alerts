# :inbox_tray: preschmf-pr-alerts
A Node.js and Express project that checks for changes or messages in all PRs made by a user in GitHub Enterprise. Using the GitHub Enterprise API, if any activity is detected on a PR made by the user, a Teams chat message is sent to the user from themselves alerting them to the change. This message is sent using the Microsoft Teams Graph API.

## Why this project?
There are two main reasons for this project:
* Personally, I feel that the GitHub hooks that companies use to provide alerts for Pull Request and Issue activities gets very cluttered with messages, and as a result, it becomes less useful. For me, Teams messages are very visible, and arrive with a popup and an alert sound. When you are in a situation with multiple pull requests that are getting reviews and comments, I found the Teams messages this app creates result in reacting faster, improving workflow speed.
* Enterprsies do not always allow access to GitHub hooks. This has been the case for me in the past. Special requests were required for creating GitHub hooks, and were rarely granted. This project is less performant than the same project using GitHub hooks instead of the GitHub Enterprise API, but it is not possible for a company using GitHub to block access to the GitHub API and have GitHub remain usable. Therefore, this project works more universally across companies with different security policies.

## Project Overview
### Adapters
* Used the Octokit npm package to simplify requests to the GitHub Enterprise API.

## Setting up project
### Create.env file
Create a .env file in the root with five variables:
```POLL_INTERVAL = <Time in ms that the project will poss the GitHub Enterprise API for changes>
PORT = <Port you want the project to run on eg: 9009>
GITHUB_AUTH_TOKEN = <GitHub auth [token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)>
MICROSOFT_GRAPH_TOKEN = <This can be easily obtained by navigating to the [Graph Explorer](developer.microsoft.com/en-us/graph/graph-explorer), signing in, and clicking "access token" in the request>
GITHUB_ENTERPRSIE_BASE_URL = <The base URL for your companies Enterprise GitHub eg: https://github.mycompany.com/api/v3>```
