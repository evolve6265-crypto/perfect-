const { Manager } = require('erela.js');

module.exports = (client) => {
  client.manager = new Manager({
    nodes: [
      {
        host: "lava.link",
        port: 80,
        password: "youshallnotpass"
      }
    ],
    send(id, payload) {
      const guild = client.guilds.cache.get(id);
      if (guild) guild.shard.send(payload);
    }
  });

  client.on("raw", (d) => client.manager.updateVoiceState(d));

  client.once("ready", () => {
    client.manager.init(client.user.id);
  });

  // autoplay
  client.manager.on("queueEnd", async (player) => {
    const res = await client.manager.search(
      `related:${player.queue.current.title}`,
      player
    );

    player.queue.add(res.tracks[0]);
    player.play();
  });
};
