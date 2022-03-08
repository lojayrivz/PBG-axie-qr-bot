const axios = require('axios')
const Keyv = require('keyv')
const keyv = new Keyv()
const { createHash } = require('crypto')
const { captchaSolver } = require('./captchaSolver')

// Get AccessToken Using Email and Password - GraphQL
module.exports.getAccessToken = async (email, password, userId) => {

    const cachedToken = await keyv.get(`tokens?userId=${userId}`)
    if (cachedToken) {
        return { sucess: true, accessToken: cachedToken, source: 'CACHE' }
    }

    const solvedCaptcha = await captchaSolver()
    if (!solvedCaptcha || solvedCaptcha?.errorId >= 1) return { sucess: false, message: 'Failed to solve captcha' }

    password = createHash('sha256').update(password).digest('hex')
    const payload = {
        operationName: 'CreateAccessToken',
        variables: { email, password },
        query: `mutation CreateAccessToken($email: String!, $password: String!) {
                    createAccessToken(email: $email, password: $password) {
                        result
                        accessToken
                        __typename
                    }
                }`
    }

    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) MavisHub/1.3.0 Chrome/78.0.3904.130 Electron/7.1.7 Safari/537.36',
        'Content-Type': 'application/json',
        'captcha-token': {
            'geetest_challenge': solvedCaptcha.geetest_challenge,
            'geetest_validate': solvedCaptcha.geetest_validate,
            'geetest_seccode': solvedCaptcha.geetest_seccode
        },
        'Referer': 'https://hub.skymavis.com/client/login'
    }

    const token = await axios.post('https://graphql-gateway.axieinfinity.com/graphql', payload, { headers })
        .then(async ({ data: response }) => {
            if (response?.errors) {
                return { success: false, message: response?.errors[0]?.message }
            }

            const accessToken = response.data.createAccessToken.accessToken

            /**
             * Caching Access Token
             * Access Token usually expires after 2 weeks or 14 days
             * We set the cache time to live to 13 days just to be safe
             */

            const thirteenDaysTTL = 1000 * 60 * 60 * 24 * 13
            await keyv.set(`tokens?userId=${userId}`, accessToken, thirteenDaysTTL)

            return { sucess: true, accessToken, source: 'API' }
        })
        .catch(error => {
            console.error(error)

            return { success: false, message: error.message }
        })

    return token
}