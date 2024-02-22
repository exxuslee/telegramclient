require("dotenv").config();
const {TelegramClient}  = require('telegram')
const {StringSession}  = require('telegram/sessions')

const apiId = parseInt(process.env.TELEGRAM_APIID);
const apiHash = process.env.TELEGRAM_APIHASH;
const stringSession = new StringSession(process.env.SESSION);
(async () => {
    console.log("Loading interactive example...");
    const client = new TelegramClient(stringSession, apiId, apiHash, {connectionRetries: 5,});
    await client.connect()

    await client.sendMessage('me', { message: "Hello!" });
})();