const { SlashCommandBuilder } = require('discord.js');
const { setVolume } = require('../utils/database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Set volume')
    .addIntegerOption(option =>
      option.setName('level')
        .setDescription('0 - 200')
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const player = client.manager.players.get(interaction.guild.id);

    if (!player)
      return interaction.reply({ content: 'Nothing playing', ephemeral: true });

    const vol = interaction.options.getInteger('level');

    if (vol < 0 || vol > 200)
      return interaction.reply('Volume must be 0-200');

    player.setVolume(vol);

    // 💾 Save to DB
    await setVolume(interaction.guild.id, vol);

    interaction.reply(`🔊 Volume set to ${vol}%`);
  }
};
