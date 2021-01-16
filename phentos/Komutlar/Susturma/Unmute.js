const { GuildMember, MessageEmbed,Client} = require("discord.js");
const qDb = require("quick.db");
const cezaDb = new qDb.table("aCezalar");
const cezaNoDb = new qDb.table("aVeri");
const kDb = new qDb.table("aKullanici");
const moment = require('moment');
const ms = require('ms');
const Discord = require("discord.js");
const client = new Discord.Client();
let PhentosAyarlar = require("../../phentos-veri.json")
let phentos = PhentosAyarlar.Roller 
let No = qDb.table("cezano")
module.exports = {
    Isim: "unmute",
    Komut: ["susturmakaldır"],
    Kullanim: "susturmakaldır @PHENTOS/ID",
    Aciklama: "Belirlenen üyeyi ses veya metin kanallarında ki susturmalarını kaldırır.",
    Kategori: "Yetkili Komutları",
    TekSunucu: true,
  /**
   * @param {Client} client 
   */
  onLoad: function (client) {
  },
  /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   * @param {Guild} guild
   */
  onRequest: async function (client, message, args, guild) {
 //   let unmuteicon = client.emojis.cache.get(phentos.Emojiler.susturmakaldirildi)
    let embed = new MessageEmbed().setColor('0x2f3136').setFooter(client.altbaslik).setTimestamp()
    if(!message.member.roles.cache.has(phentos) && !message.member.hasPermission("ADMINISTRATOR")) return message.reply("Hata: Bu komutunu kullanabilmek için yeterli yetkiye sahip değilsin").then(x => x.delete({timeout: 8000}))
   // if(!phentos.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Hata: Bu komutunu kullanabilmek için yeterli yetkiye sahip değilsin.`).then(sil => sil.delete({timeout: 5000}));
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.send(`Hata: Lütfen bir üye etiketleyin veya Id giriniz!  __Örn:__  \`${client.sistem.a_Prefix}unmute @PHENTOS/ID\``).then(sil => sil.delete({timeout: 5000}));
    if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(`Hata: Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`).then(sil => sil.delete({timeout: 5000}));
    let muteler = cezaDb.get(`susturulma`);
    let sesmuteler = cezaDb.get(`sessusturulma`) || [];
    let kalicimuteler = cezaDb.get(`kalicisusturma`) || [];
    let mutedRoles = `797445574508412948`
    uye.roles.remove(mutedRoles).catch();
  //if (muteler.some(j => j.id === uye.id)) cezaDb.set(`susturulma`, muteler.filter(x => x.id !== uye.id));
    if (sesmuteler.some(j => j.id === uye.id)) cezaDb.set(`sessusturulma`, sesmuteler.filter(x => x.id !== uye.id));
    if (kalicimuteler.some(j => j.id === uye.id)) cezaDb.set(`kalicisusturma`, kalicimuteler.filter(x => x.id !== uye.id));
    kDb.set(`ceza.${message.guild.id}.BitisZaman`, Date.now());
    kDb.set(`ceza.${message.guild.id}.BitisZaman`, Date.now());
    if (uye.voice.channel) uye.voice.setMute(false);
    //${unmuteicon} bunu al 49. satırda ${uye} yazısının soluna yapıştır
    message.channel.send(`${uye} (\`${uye.id}\`), üyesinin ses ve metin kanallarında ki susturulması __kaldırıldı__.`).catch().then(x => x.delete({timeout: 5000}));
    message.react("✅")
  // if(phentos.Kanallar.muteLogKanali && client.channels.cache.has(phentos.Kanallar.muteLogKanali)) client.channels.cache.get(phentos.Kanallar.muteLogKanali).send(embed.setDescription(`${uye} (\`${uye.id}\`), adlı üyenin ${message.author} (\`${message.author.id}\`), tarafından ses ve metin kanallarından susturulması kaldırıldı!`)).catch();
    }
};

