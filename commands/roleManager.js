const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
require('dotenv/config');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('rolemanager')
    .setDescription('Use to remove a members role')
    .setDefaultMemberPermissions(PermissionsBitField.Administrator)
    .setDMPermission(false)
    .addSubcommand( addSubcommand =>
        addSubcommand.setName("remove")
        .setDescription("Removes the role")
        .addUserOption(option => option.setName("user").setDescription("Member that will lose their role").setRequired(true))
        .addRoleOption(option => option.setName("role").setDescription("The role that will be removed").setRequired(true)),)
    .addSubcommand( addSubcommand => 
        addSubcommand.setName("add")
        .setDescription("Adds the role")
        .addUserOption(option => option.setName("user").setDescription("Member that will lose their role").setRequired(true))
        .addRoleOption(option => option.setName("role").setDescription("The role that will be removed").setRequired(true)),),
    async execute(interaction) {
        const member = interaction.options.getMember("user");
        const role = interaction.options.getRole("role");
        const command = interaction.options.getSubcommand(["remove", "add"]);

        switch (command) {
            case "remove":

            if (interaction.user.id !== process.env.DEV_ID | !interaction.member.permissions.has(PermissionsBitField.Administrator) )  return interaction.reply({content: "You don't have permission to do this", ephemeral: true});
            
            if (!member.roles.cache.has(role.id)) {
                const embed = new EmbedBuilder()
                .setTitle(`Role Management ${member.user.username}`)
                .setImage(member.user.displayAvatarURL())
                .setColor('Aqua')
                .setDescription(`${member.user} dose not have the ${role} role`)
                .setTimestamp();
    
                return await interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            }

            await member.roles.remove(role.id);
    
            interaction.reply({content: `Role ${role} has been removed from ${member.user}`, ephemeral: true});

            break;
            
            case "add":

            if (interaction.user.id !== process.env.DEV_ID | !interaction.member.permissions.has(PermissionsBitField.Administrator) )  return interaction.reply({content: "You don't have permission to do this", ephemeral: true});
        
            if (member.roles.cache.has(role.id)) {
                const embed = new EmbedBuilder()
                .setTitle(`Role Management ${member.user.username}`)
                .setImage(member.user.displayAvatarURL())
                .setColor('Aqua')
                .setDescription(`${member.user} already has the ${role} role`)
                .setTimestamp();
    
                return await interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            }

            await member.roles.add(role.id);
            
            interaction.reply({content: `Role ${role} has been added to ${member.user} `, ephemeral: true});

            break;
            
        }


    }




}