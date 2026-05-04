const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('loop').setDescription('Toggle loop'),

  async execute(interaction, client) {
    const player = client.manager.players.get(interaction.guild.id);

    player.setTrackRepeat(!player.trackRepeat);

    interaction.reply(`🔁 Loop: ${player.trackRepeat}`);
  }
};
