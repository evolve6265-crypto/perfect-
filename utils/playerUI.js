const { EmbedBuilder } = require('discord.js');

// 🎬 Progress Bar
function progressBar(current, total) {
  const size = 20;
  const progress = Math.round((current / total) * size);

  return '▰'.repeat(progress) + '▱'.repeat(size - progress);
}

// ❄️ Create Now Playing Embed
function createNowPlaying(track, player) {
  return new EmbedBuilder()
    .setColor('#AEEFFF')
    .setTitle('❄️ Aurelia Music Player')
    .setDescription(
      `🎶 **${track.title}**\n\n` +
      
      `⏱️ ${formatTime(player.position)} / ${formatTime(track.duration)}\n` +
      `🔊 Volume: ${player.volume}%`
      `${progressBar(player.position, track.duration)}`
    )
    .setFooter({ text: 'Winter Monarch • Stay Frosty' });
}

// ⏱️ Format Time (ms → mm:ss)
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;

  return `${m}:${s.toString().padStart(2, '0')}`;
}

// 🎬 Live Update (Animated UI)
async function startNowPlayingMessage(player, channel) {
  const track = player.queue.current;

  if (!track) return;

  const msg = await channel.send({
    embeds: [createNowPlaying(track, player)]
  });

  const interval = setInterval(() => {
    if (!player.playing || !player.queue.current) {
      clearInterval(interval);
      return;
    }

    const updatedEmbed = createNowPlaying(player.queue.current, player);
    msg.edit({ embeds: [updatedEmbed] });
  }, 5000);
}

module.exports = {
  createNowPlaying,
  startNowPlayingMessage
};
