const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('skip').setDescription('Skip song'),

  async execute(interaction, client) {
    const player = client.manager.players.get(interaction.guild.id);
    if (!player) return interaction.reply('Nothing playing');

    player.stop();
    interaction.reply('⏭️ Skipped');
  }
};
