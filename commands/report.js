const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
require('dotenv/config');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('reportuser')
    .setDescription('Use to remove a members role')
    .setDMPermission(false),
    async execute(interaction) {
        const modal = new ModalBuilder()
        .setCustomId('reportmodal')
        .setTitle('Report User')

        const username = new TextInputBuilder()
        .setCustomId('usernamereport')
        .setLabel('Enter their username')
        .setPlaceholder('Shadower')
        .setMaxLength(50)
        .setRequired(true)
        .setStyle(TextInputStyle.Short);

        const user_id = new TextInputBuilder()
        .setCustomId('useridreport')
        .setLabel('Enter their user id')
        .setPlaceholder('shadower')
        .setMaxLength(50)
        .setRequired(true)
        .setStyle(TextInputStyle.Short);

        const reason = new TextInputBuilder()
        .setCustomId('reasonreport')
        .setLabel('Please enter the reason for the report')
        .setMinLength(10)
        .setMaxLength(500)
        .setRequired(true)
        .setStyle(TextInputStyle.Paragraph);

        const firstrow = new ActionRowBuilder().addComponents(username);
        const secondrow = new ActionRowBuilder().addComponents(user_id);
        const thirdtow = new ActionRowBuilder().addComponents(reason);

        modal.addComponents(firstrow, secondrow, thirdtow);

        await interaction.showModal(modal);
    }
}