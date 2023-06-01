const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('role')
    .setDescription('Use to remove a crew members role')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addSubcommand( addSubcommand =>
        addSubcommand.setName("remove")
        .setDescription("Removes the crew role")
        .addUserOption(option => option.setName("user").setDescription("Crew member that will lose their role").setRequired(true))
        .addRoleOption(option => option.setName("role").setDescription("The role that will be removed").setRequired(true)),)
    .addSubcommand( addSubcommand => 
        addSubcommand.setName("add")
        .setDescription("Adds the crew role")
        .addUserOption(option => option.setName("user").setDescription("Crew member that will lose their role").setRequired(true))
        .addRoleOption(option => option.setName("role").setDescription("The role that will be removed").setRequired(true)),),
    async execute(interaction) {
        const member = interaction.options.getMember("user");
        const role = interaction.options.getRole("role");
        const command = interaction.options.getSubcommand(["remove", "add"]);

        switch (command) {
            case "remove":

            if (interaction.user.id !== "553621831177863168")  return interaction.reply({content: "You don't have permission to do this", ephemeral: true});
    
            // if (member.id !== "664940874551263242")  return interaction.reply({content: "This command only works on Irish", ephemeral: true});
        
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

            if (interaction.user.id !== "553621831177863168")  return interaction.reply({content: "You don't have permission to do this", ephemeral: true});
    
            // if (member.id !== "664940874551263242")  return interaction.reply({content: "This command only works on Irish", ephemeral: true});
    
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