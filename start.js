require("dotenv").config();
const {TelegramClient} = require('telegram')
const { NewMessage } = require('telegram/events')
const {StringSession} = require('telegram/sessions')

const apiId = parseInt(process.env.TELEGRAM_APIID);
const apiHash = process.env.TELEGRAM_APIHASH;
const stringSession = new StringSession(process.env.SESSION);
const client = new TelegramClient(stringSession, apiId, apiHash, {connectionRetries: 5,});
let lastMessage = 0


async function start(coin, side) {
    console.log(coin, side)
}

async function eventPrint(event) {
    const message = event.message;
    if (event.isPrivate) {
        let text = message.message.split("\n").filter(item => item.trim() !== '')
        if (text[1] === "Long") await start(text[0], "BUY")
        if (text[1] === "Sort") await start(text[0], "SELL")
        console.log(text)
    }
}

(async () => {
    await client.connect()
    client.addEventHandler(async (event) => {
        eventPrint(event);
    }, new NewMessage({ incoming: true, channels: ['invest_zonaa'] }));
})();