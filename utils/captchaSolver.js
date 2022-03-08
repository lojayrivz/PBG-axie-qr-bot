const axios = require('axios')
const anticaptcha = require("@antiadmin/anticaptchaofficial");
const { anticaptcha_key } = require('../config.json')
anticaptcha.setAPIKey(anticaptcha_key);

module.exports.captchaSolver = async () => {
    const options = {
        url: 'https://captcha.axieinfinity.com/api/geetest/register',
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) MavisHub/1.3.0 Chrome/78.0.3904.130 Electron/7.1.7 Safari/537.36',
            'Referer': 'https://hub.skymavis.com/client/login',
            'Content-Type': 'application/json',
        }
    }

    const geetest_challenge = await axios(options)
        .then(response => response.data?.success ? response.data : null)
        .catch(error => console.error(error))

    const captcha = await anticaptcha.solveGeeTestProxyless('https://hub.skymavis.com/client/login',
        geetest_challenge.gt,
        geetest_challenge.challenge)
        .then(result => {
            console.log(result)
            return result
        })
        .catch(error => console.error('Error:' + error));

    return captcha
}