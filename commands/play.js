const { SlashCommandBuilder } = require('discord.js');
const { getVolume } = require('../utils/database');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play music')
    .addStringOption(opt =>
      opt.setName('query').setDescription('Song / Spotify link').setRequired(true)
    ),

  async execute(interaction, client) {
    const query = interaction.options.getString('query');
    const vc = interaction.member.voice.channel;

    if (!vc) return interaction.reply({ content: 'Join VC first', ephemeral: true });

    const player = client.manager.create({
      guild: interaction.guild.id,
      voiceChannel: vc.id,
      textChannel: interaction.channel.id,
      selfDeafen: true
    });

    if (!player.connected) player.connect();

    const res = await client.manager.search(query, interaction.user);

    if (res.loadType === 'PLAYLIST_LOADED') {
      player.queue.add(res.tracks);
      if (!player.playing) player.play();
      return interaction.reply(`🎶 Added playlist (${res.tracks.length})`);
    }

    player.queue.add(res.tracks[0]);

const savedVolume = await getVolume(interaction.guild.id);
player.setVolume(savedVolume);

if (!player.playing) player.play();

    interaction.reply(`🎧 Playing: ${res.tracks[0].title}`);
  }
};
