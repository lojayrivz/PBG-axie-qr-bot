const { guild_id, client_status } = require('../config.json')

module.exports = async (client) => {
    client.user.setActivity(client_status.description, { type: client_status.type })

    const slashCommandsConfig = client.slashCommands.map(command => command.config)
    // GLOBAL SLASH COMMANDS - Global application commands will be available in all the guilds your application has the "applications.commands" scope authorized, as well as in DMs.
    // await client.application?.commands.set(slashCommandsConfig).then(() => console.log('GLOBAL SLASH COMMANDS SET'))
    // GUILD SLASH COMMANDS - Guild application commands are only available in the guild they were created in
    await client.guilds.cache.get(guild_id)?.commands.set(slashCommandsConfig).then(() => console.log('GUILD SLASH COMMANDS SET'))

    console.log(`Ready to serve!`)
}