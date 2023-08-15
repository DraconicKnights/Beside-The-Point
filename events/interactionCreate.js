const { Events, InteractionType, EmbedBuilder } = require('discord.js');

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
            const reason = interaction.fields.getTextInputValue('reasonreport');

            console.log(interaction.user.username + " Has submited a modal ID: " + interaction.customId);


            const embed = new EmbedBuilder()
            .setTitle('Member Report')
            .setImage(interaction.user.displayAvatarURL())
            .setColor('Blue')
            .setDescription(`${interaction.user.username} has made a report`)
            .addFields(
                { name: 'Username', value: `${username}`, inline: true },
                { name: 'Reason', value: `${reason}`, inline: true },
            )

            const channelid = '';

            const channel = interaction.guild.channels.cache.get(channelid);

            channel.send({embeds: [embed]})

            interaction.reply({content: 'Report has been submited', ephemeral: true});
            break;
    }
}