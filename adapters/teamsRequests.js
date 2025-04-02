import axios from "axios"

const microsoftGraphToken = process.env.MICROSOFT_GRAPH_TOKEN

export const sendSelfMessage = async (messageText) => {
    const request = {
        body: {
            content: messageText
        }
    }

    const config = {
        headers: { 'Authorization': microsoftGraphToken }
    }

    return axios
        .post("https://graph.microsoft.com/v1.0/chats/48:notes/messages", request, config)
        .catch((e) => {
            console.log(e?.message)
        })
}