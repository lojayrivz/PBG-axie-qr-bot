const { getAccessToken } = require('../utils/getAccessToken')
const { MessageAttachment, MessageEmbed } = require('discord.js')
const { createQR } = require('../utils/createQR')
const fs = require('fs')

module.exports.config = {
    name: 'qr',
    description: 'Generate a QR Code',
}

module.exports.settings = {
    userPermissions: ['USE_APPLICATION_COMMANDS'],
    botPermissions: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'ATTACH_FILES'],
    guildOnly: false,
    ownerOnly: false,
}

module.exports.execute = async (interaction, client) => {
    const processEmbed = new MessageEmbed()
        .setThumbnail('https://i.imgur.com/pZZaY0o.gif')
        .setAuthor({ name: 'Generating QR...' })
        .setDescription('Please wait while I process your request')
        .setColor('BLURPLE')
    await interaction.reply({ embeds: [processEmbed], ephemeral: true })

    const { scholars } = JSON.parse(fs.readFileSync('./config.json'))
    const scholarCredentials = scholars.find(scholar => scholar.id === interaction.user.id && scholar.email && scholar.password)

    if (!scholarCredentials) {
        processEmbed.setThumbnail('https://i.imgur.com/8kjQPBF.gif')
        processEmbed.setAuthor({ name: 'Missing/Invalid Credentials' })
        processEmbed.setDescription(`You don't have any match or valid credentials in the database`)
        processEmbed.setColor('RED')
        return interaction.editReply({ embeds: [processEmbed] })
    }

    const response = await getAccessToken(scholarCredentials.email, scholarCredentials.password, interaction.user.id)

    if (response.success == false) {
        processEmbed.setThumbnail('https://i.imgur.com/8kjQPBF.gif')
        processEmbed.setAuthor({ name: 'An Error Occurred!' })
        processEmbed.setDescription(`**__Error:__**\n\`\`\`${response.message}\`\`\``)
        processEmbed.setColor('RED')
        return interaction.editReply({ embeds: [processEmbed] })
    }

    const qr_code = await createQR(response.accessToken)
    const attachment = new MessageAttachment(qr_code, 'qr.png')

    const successEmbed = new MessageEmbed()
        .setDescription(`Always keep your QR Code safe and don't let anyone see it`)
        .setColor('GREEN')
        .setImage('attachment://qr.png')
        .setFooter({ text: `Source: ${response.source}` })

    processEmbed.setThumbnail('https://i.imgur.com/e2daQCy.gif')
    processEmbed.setAuthor({ name: 'Generated QR Code' })
    processEmbed.setDescription('Process has been completed')
    processEmbed.setColor('GREEN')

    await interaction.editReply({ embeds: [processEmbed] })
    interaction.followUp({ embeds: [successEmbed], files: [attachment], ephemeral: true })
}