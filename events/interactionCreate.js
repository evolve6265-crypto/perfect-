const { Client, GatewayIntentBits } = require('discord.js');
const { l, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const play = require('play-dl');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const queue = new Map();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith('!') || message.author.bot) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // ▶️ PLAY COMMAND
    if (command === 'play') {
        const url = args[0];
        if (!url) return message.reply('Give a YouTube URL bro 🎶');

        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('Join a VC first 😭');

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('Connect') || !permissions.has('Speak')) {
            return message.reply('Need VC permissions 😤');
        }

        let songInfo = await play.video_info(url);
        let song = {
            title: songInfo.video_details.title,
            url: url
        };

        if (!queue.has(message.guild.id)) {
            const queueContruct = {
                voiceChannel: voiceChannel,
                songs: [],
                player: createAudioPlayer()
            };

            queue.set(message.guild.id, queueContruct);
            queueContruct.songs.push(song);

            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });

            playSong(message.guild, queueContruct.songs[0], connection);

        } else {
            const serverQueue = queue.get(message.guild.id);
            serverQueue.songs.push(song);
            return message.channel.send(`Added to queue: **${song.title}**`);
        }
    }

    // ⏭️ SKIP
    if (command === 'skip') {
        const serverQueue = queue.get(message.guild.id);
        if (!serverQueue) return message.reply('Nothing playing 😶');
        serverQueue.player.stop();
    }

    // ⏹️ STOP
    if (command === 'stop') {
        queue.delete(message.guild.id);
        message.reply('Stopped music 🛑');
    }
});

async function playSong(guild, song, connection) {
    const serverQueue = queue.get(guild.id);

    if (!song) {
        connection.destroy();
        queue.delete(guild.id);
        return;
    }

    const stream = await play.stream(song.url);
    const resource = createAudioResource(stream.stream, {
        inputType: stream.type
    });

    serverQueue.player.play(resource);
    connection.subscribe(serverQueue.player);

    serverQueue.player.on(AudioPlayerStatus.Idle, () => {
        serverQueue.songs.shift();
        playSong(guild, serverQueue.songs[0], connection);
    });

    serverQueue.player.on('error', error => console.error(error));
}

client.login('MTUwMDcwMTc0NTI2MzY3NzU1MA.G9ol8l.4tfDc9oGT4XYlG7dE_rVuSwbga86sUdr5DotV8');
