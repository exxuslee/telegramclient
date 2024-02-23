require("dotenv").config();
const {TelegramClient} = require('telegram')
const {StringSession} = require('telegram/sessions')

const apiId = parseInt(process.env.TELEGRAM_APIID);
const apiHash = process.env.TELEGRAM_APIHASH;
const stringSession = new StringSession(process.env.SESSION);
const client = new TelegramClient(stringSession, apiId, apiHash, {connectionRetries: 5,});
let lastMessage = 0


async function start(coin, side) {
    console.log(coin, side)
}

async function read() {
    let messages = await client.getMessages("invest_zonaa", {limit: 1})
    if (messages[0].time === lastMessage) return
    lastMessage = messages[0].time
    let text = messages.map((message) => message.message.split("\n").filter(item => item.trim() !== ''))[0]
    if (text[1] === "Long") await start(text[0], "BUY")
    if (text[1] === "Sort") await start(text[0], "SELL")
}

(async () => {
    await client.connect()
    setInterval(read, 15000)
})();