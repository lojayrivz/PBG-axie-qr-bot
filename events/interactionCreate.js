const { getMissingPermission } = require('../utils/getMissingPermission')

module.exports = async (client, interaction) => {
    if (interaction.user.bot) return
    if (!interaction.isCommand()) return
    if (!client.slashCommands.has(interaction.commandName)) return

    // Command Logger
    const timeRightNow = new Date().toLocaleString()
    console.log(`[${timeRightNow}] ${interaction.user.tag} (${interaction.user.id}) used /${interaction.commandName} command`)

    const command = client.slashCommands.get(interaction.commandName)

    if (!interaction.inGuild() && command.settings.guildOnly) return interaction.reply({ content: 'You need to be in a server to use this command.', ephemeral: true })

    if (command.settings.botPermissions && interaction.inGuild()) {
        // Gets overall set of bot's permissions
        const botPerms = interaction.channel.permissionsFor(interaction.guild.me);

        // Check if the bot has enough permissions to execute the command
        if (!botPerms || !botPerms.has(command.settings.botPermissions)) {
            const missingPerms = await botPerms.missing(command.settings.botPermissions)
            const formattedMissingPerms = getMissingPermission(missingPerms).join('` `')
            return interaction.reply(`I don't have enough permissions to execute this command.\nMissing Permission: \`${formattedMissingPerms}\``)
        }
    }

    if (command.settings.userPermissions && interaction.inGuild()) {
        // Gets overall set of user's permissions
        const userPerms = interaction.channel.permissionsFor(interaction.member)

        // Check if the user has enough permissions to execute the command
        if (!userPerms || !userPerms.has(command.settings.userPermissions)) {
            const missingPerms = await userPerms.missing(command.settings.userPermissions)
            const formattedMissingPerms = getMissingPermission(missingPerms).join('` `')
            return interaction.reply({ content: `You don't have enough permissions to use this command.\nMissing Permission: \`${formattedMissingPerms}\``, ephemeral: true })
        }
    }

    try {
        await client.slashCommands.get(interaction.commandName).execute(interaction, client);
    } catch (error) {
        console.error(error)

        if (interaction.deferred) {
            await interaction.editReply({ content: 'There was an error while executing this command.', ephemeral: true }).catch(error => console.error(error))
        } else {
            await interaction.deferReply()
            await interaction.editReply({ content: 'There was an error while executing this command.', ephemeral: true }).catch(error => console.error(error))
        }
    }
}