// Import the required modules
const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, } = require('discord.js');

// Define the slash command data
module.exports = {
  data: new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Verify yourself and get a role'),
  async execute(interaction) {
    // Get the guild and the role
    const { guild, options } = interaction;
    const role = guild.roles.cache.find(role => role.name === 'Dragon Member'); // Change this to your role name

    // Check if the role exists
    if (!role) {
      console.log('Role does not exist');
      return;
    }

    // Create an embed with some instructions
    const embed = new EmbedBuilder()
      .setTitle('Verification')
      .setDescription('Please click the button below to verify yourself and get access to the server.')
      .setColor('Green');

    // Create a button with a custom id
    const button = new ButtonBuilder()
      .setCustomId('verify-button')
      .setLabel('Verify')
      .setStyle(ButtonStyle.Success);

    // Create a row to hold the button
    const row = new ActionRowBuilder()
      .addComponents(button);

    // Reply with the embed and the button as ephemeral
    await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });

    // Create a collector to listen for button clicks
    const collector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 15000 }); // Change this to your desired time limit

    // Handle the collected interactions
    collector.on('collect', async i => {
      // Check if the custom id matches and the user is the same as the one who used the slash command
      if (i.customId === 'verify-button' && i.user.id === interaction.user.id) {
        // Get the member who clicked the button
        const member = guild.members.cache.get(i.user.id);

        // Add the role to the member
        await member.roles.add(role);

        // Update the button to be disabled
        const newButton = button.setDisabled(true);

        // Edit the reply with a confirmation message and the disabled button as ephemeral
        await i.update({ content: `You have been verified and given the ${role} role.`, embeds: [], components: [newButton], ephemeral: true });
      }
    });

    // Handle the end of the collector
    collector.on('end', async collected => {
      // Check if anyone clicked the button
      if (collected.size === 0) {
        // Edit the reply with a timeout message and no components as ephemeral
        await interaction.editReply({ content: 'Time limit reached. Please try again.', embeds: [], components: [], ephemeral: true });
      }
    });
  },
};

