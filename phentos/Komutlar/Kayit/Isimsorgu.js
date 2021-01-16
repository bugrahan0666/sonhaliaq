const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const db = require("quick.db");
const Discord = require("discord.js");
const client = new Discord.Client();
const kullaniciverisi = new db.table("aKullanici");
let kullanicicinsiyet = new db.table("aCinsiyet");
let PhentosAyarlar = require("../../phentos-veri.json")
let Pento1 = PhentosAyarlar.erkekRolleri
let Pento2 = PhentosAyarlar.kadinRolleri
let Pento3 = PhentosAyarlar.kayıtYapanRoller
let Pento4 = PhentosAyarlar.embedUfakResim
module.exports = {
    Isim: "isimler",
    Komut: ["isimsorgu"],
    Kullanim: "isimsorgu @phentos/ID",
    Aciklama: "Belirlenen üyenin önceki isim ve yaşlarını gösterir.",
    Kategori: "Kayıt Komutları",
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
    let embed = new MessageEmbed().setColor('0x2f3136').setFooter(client.altbaslik).setThumbnail(Pento4.embedUfakResim)
    if(!message.member.roles.cache.has(Pento3) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Hata: Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin.`).then(sil => sil.delete({timeout: 5000}));
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.send(`Hata: Lütfen bir üye etiketleyin veya Id giriniz!  __Örn:__  \`${client.sistem.a_Prefix}isimsorgu @phentos/ID\``).then(sil => sil.delete({timeout: 5000}));
    let isimsorgu = kullaniciverisi.get(`k.${uye.id}.isimler`) || [];
   let Liste = isimsorgu.length || `0`;
  isimsorgu = isimsorgu.reverse(); 
  let IsimGecmisi;
  IsimGecmisi = isimsorgu.length > 0 ? isimsorgu.map((value, index) => `\`${value.Isim}\``).join("\n") : "Üyenin herhangi bir kayıtı bulunamadı.";
    message.channel.send(embed.setAuthor(uye.displayName, uye.user.avatarURL({dynamic: true})).setDescription(`\n**Bu Kullanıcının Geçmiş İsimleri [${Liste}]**\n${IsimGecmisi}`));
    }
};