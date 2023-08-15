const { Events, InteractionType, EmbedBuilder } = require('discord.js');
const config = require('../config.json');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction, client) {
        const { guild } = interaction

        switch (interaction.type) {
            case InteractionType.ApplicationCommand:

                const command = interaction.client.commands.get(interaction.commandName);
    
                if (!command) {
                    console.error(`No command matching ${interaction.commandName} was found.`);
                    return;
                }
                
                console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction Command: ${interaction.commandName} Server: ${guild.name}.`);
        
                try {
                    await command.execute(interaction, client);
                } catch (error) {
                    console.error(error);
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
                break;

            case InteractionType.ModalSubmit:
                ModalFunc(interaction.customId, interaction);
                break;
        }


    }
}


function ModalFunc(modalId, interaction) {
    switch (modalId) {
        case 'reportmodal':
            const username = interaction.fields.getTextInputValue('usernamereport');
            const user_id = interaction.fields.getTextInputValue('useridreport');
            const reason = interaction.fields.getTextInputValue('reasonreport');

            console.log(interaction.user.username + " Has submited a modal ID: " + interaction.customId);


            const embed = new EmbedBuilder()
            .setTitle('Member Report')
            .setImage(interaction.guild.iconURL())
            .setColor('Blue')
            .setDescription(`${interaction.user.username} has made a report`)
            .addFields(
                { name: 'Username', value: `${username}`, inline: true },
                { name: 'User ID',  value: `${user_id}`, inline: true},
                { name: 'Reason', value: `${reason}`, inline: false },
            )

            const channelid = config.reportchannelid;

            const channel = interaction.guild.channels.cache.get(channelid);

            channel.send({embeds: [embed]})

            interaction.reply({content: 'Report has been submited', ephemeral: true});
            break;
    }
}