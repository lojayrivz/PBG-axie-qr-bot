# AxieHelper-QR
### A Discord Bot to generate a QR Code for Axie Infinity.
#### Commands:
- `qr` - Generate a QR Code.

![image](https://i.imgur.com/l1Udc6b.png)

# Requirements
- Node.js version 16.6 or higher
- Discord Bot Token
- Discord Server ID & Discord User ID
- Axie Infinity Email and Password

# Installation
**Download the [Source Code](https://github.com/ikr0w/axiehelper-qr/releases) first**

Then extract the folder to your Desktop or somewhere you can easily access it
#

### Installing Node.js
Install [Node.js](https://nodejs.org/) v16.6 or higher

Next you'll need to open your terminal.

On Windows, either:
   - `Shift + Right-click` inside your bot folder and choose the "Open command window here" option
   - Press `Win + R` and run `cmd.exe`, and then `cd` into your folder directory

On macOS, either:
   - Open Launchpad or Spotlight and search for "Terminal"
   - In your "Applications" folder, under "Utilities", open the Terminal app

With the terminal open, run the `node -v` command to make sure you've successfully installed Node.js. If it outputs v16.6.0 or higher, great! Don't close the terminal yet, you still have steps to follow!

![image](https://i.imgur.com/SOk4qvv.png)

#
### Installing Dependencies
With Node.js installed, you can now install the required dependencies in order to run your discord bot

Using the terminal simply run this command in your discord bot folder to install the required dependencies:
```
npm install
```
Wait for it to finish and you should now have `node_modules` folder in the directory
#

### Creating a Discord Bot
Create your bot in [Discord Developer Portal](https://discord.com/developers/applications)

You can follow this [video](https://www.youtube.com/watch?v=b9KQxREfn4c) on creating a discord bot:

[![image](https://i.imgur.com/S0WO9vD.png1)](https://www.youtube.com/watch?v=b9KQxREfn4c)
#

### Inviting Your Bot
So far you’ve made a Discord Bot account but it’s not actually in any server

If you want to invite your bot you must create an Invite URL for it

There are 2 methods provided on how to do it
1. [Modifying the URL Provided](#1-modifying-the-url-provided)
2. [Generating the Invite URL](axiehelper-qr#2-generating-the-invite-url)

#### 1. Modifying the URL Provided
First you need to copy your `Client ID` at `OAuth2` then `General` and copy the `Client ID`

You just replace the `YOUR_BOT_ID` from this URL with the `Client ID` that you copied
```
https://discord.com/api/oauth2/authorize?client_id=YOUR_BOT_ID&permissions=100352&scope=bot%20applications.commands
```

#### 2. Generating the Invite URL
Simply go to `OAuth2` tab and and select `URL Generator`

![image](https://i.imgur.com/bQt9HMa.png)

On Scopes tick the `bots` and `application.commands`

![image](https://i.imgur.com/XyYjvHH.png)

Tick the permissions required for your bot to function under “Bot Permissions”

![image](https://i.imgur.com/w310qgf.gif)

Now the resulting URL can be used to add your bot to a server.

Copy and paste the URL into your browser, choose a server to invite the bot to, and click “Authorize”.
#

### Launching your Discord Bot 
Now your bot should be in your server but it is still offline and doesn't do anything

We need to setup the configuration first to launch your bot

Copy your Bot's Token in [Discord Developer Portal](https://discord.com/developers/applications)

![image](https://i.imgur.com/3TvBpQp.png?1)

In your discord bot folder, open the `config.json` and it should look like this:
```json
{
  "client_token": "DISCORD_BOT_TOKEN",
  "guild_id": "SERVER_ID",
  "scholars": [
    {
      "id": "DISCORD_USER_1_ID",
      "email": "EMAIL1@EMAIL",
      "password": "PASSWORD1"
    },
    {
      "id": "DISCORD_USER_2_ID",
      "email": "EMAIL2@EMAIL",
      "password": "PASSWORD2"
    },
    {
      "id": "",
      "email": "",
      "password": ""
    }
  ]
}
```
Replace the `DISCORD_BOT_TOKEN` to what you just copied

For `SERVER_ID`, `DISCORD_USER_ID_1`, and `DISCORD_USER_ID_2` you can follow this [guide](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-) to find the Server ID and User ID

**Save your changes and the bot is now ready**

**Run `start.bat` to launch your Discord Bot!**

You need to keep the process running in order for the commands to work.
You can also look for hosting providers that will run the your bot 24/7.
I will not cover it and you must do your own research as there are a lot of options out there on hosting your bot.

# Customization
### Icon
You can replace the `icon.png` at `./assets/images/` to any image you like just make sure the file name and file extension is still the same

### Status
Customize your bot's status in `config.json` and change the `type` and `description` to your liking 
| Type | Format | Example 
| --- | --- | --- |
| PLAYING | Playing {description} | Playing Axie Infinity
| LISTENING | Listening to {description} | Listening to Spotify
| WATCHING | Watching {description} | Watching YouTube Together
| COMPETING | 	Competing in {description} | 	Competing in Infinity Cup Tournament

# Support
[![Discord Banner 2](https://discordapp.com/api/guilds/864194584732106782/widget.png?style=banner2)](https://discord.gg/xyWaa4rRBy)

If you don't understand something in the documentation or you are experiencing problems, please don't hesitate to join our [Discord Server](https://discord.gg/xyWaa4rRBy)

# License
[GNU GPL V3](https://www.gnu.org/licenses/gpl-3.0.en.html)
