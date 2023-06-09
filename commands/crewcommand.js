const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('crewcommand')
    .setDescription('Part of the crew command')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .setDMPermission(false)
    .addSubcommand( addSubcommand =>
        addSubcommand.setName("remove")
        .setDescription("removes the vote")
        .addUserOption(option => option.setName("user").setDescription("Member that will lose their role").setRequired(true))
        .addChannelOption(option => option.setName("channel").setDescription("Channel the message will be removed in").setRequired(true)),)
    .addSubcommand( addSubcommand => 
        addSubcommand.setName("lock")
        .setDescription("Prevents people from using it")
        .addChannelOption(option => option.setName("channel").setDescription("Channel the message will be stored in").setRequired(true)),),
    async execute(interaction) {
        const member = interaction.options.getMember("user");
        const role = interaction.options.getRole("role");
        const command = interaction.options.getSubcommand(["remove", "add"]);
        const channel = interaction.options.getChannel("channel").id;
        let lock = false;



        if (!interaction.user.id == '553621831177863168' || !interaction.user.id == '183901411413590027') return interaction.reply({content: "You don't have permission to do this", ephemeral: true});

        switch (command) {
            case "add":

            const embed = new EmbedBuilder()
            .setTitle(`Creaw Management ${member.user.username}`)
            .setImage(member.user.displayAvatarURL())
            .setColor(colour)
            .setDescription('Click one of the buttons below the embed to perform an action.')
        
            const row = new ActionRowBuilder()
            .addComponents(
                [new ButtonBuilder()
                .setLabel("Add")
                .setStyle(ButtonStyle.Danger)
                .setCustomId(`crew-add`),
        
                new ButtonBuilder()
                .setLabel("Remove")
                .setStyle(ButtonStyle.Danger)
                .setCustomId(`crew-remove`),]
            )

            channel.send({embeds: [embed], components: [row]});

            break;

        }


    }
    }