const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('shuffle').setDescription('Shuffle queue'),

  async execute(interaction, client) {
    const player = client.manager.players.get(interaction.guild.id);

    player.queue.shuffle();

    interaction.reply('🔀 Queue shuffled');
  }
};
