const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const db = require("quick.db");
const moment = require('moment');
require('moment-duration-format');
const acar = client.veri
module.exports = {
    Isim: "yardım",
    Komut: ["help"],
    Kullanim: "afk <sebep>",
    Aciklama: "Klavyeden uzak iseniz gitmeden önce bu komutu girdiğinizde sizi etiketleyenlere sizin klavye başında olmadığınızı açıklar.",
    Kategori: "-",
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
  onRequest: async (client, message, args) => {
    let command = args[0]
    let embed2 = new MessageEmbed().setAuthor(acar.Tag + " " + acar.sunucuUfakIsim + ` - Komut Bilgisi`, message.guild.iconURL({dynamic: true, size: 2048})).setFooter(client.altbaslik).setFooter(client.altbaslik)
  if (client.komutlar.has(command)) {
  
    command = client.komutlar.get(command)
    embed2
      .addField('Komut Adı', command.Isim, false)
      .addField('Komut Açıklaması', command.Aciklama, false)
      .addField('Doğru Kullanım', command.Kullanim)
      .addField('Alternatifler', command.Komut[0] ? command.Komut.join(', ') : 'Bulunmuyor')
      .setTimestamp()
      .setColor('0x2f3236')
    message.channel.send(embed2).then(msg => {
  msg.react(client.veri.Emojiler.Iptal)
  .then(r1 => {
     const cancelFilter1 = (reaction, user) => reaction.emoji.id === client.veri.Emojiler.Iptal && user.id === message.author.id;
      const cancel1 = msg.createReactionCollector(cancelFilter1, { time: 100000 });
      cancel1.on('collect', r1 => {
    message.channel.send(new MessageEmbed().setColor('0x2f3136').setDescription(`Başarılı: **${args[0]}** adlı komut bilgisi istek üzerine kapatıldı.`)).then(x =>  x.delete({timeout: 5000}) | x.react("✅"));
        msg.delete();
      })
     })
  });
  return;
}
      
        const embed = new MessageEmbed()
        .setColor("0x2F3236")
        .setAuthor(acar.Tag + " " + acar.sunucuUfakIsim+ " - Yardım Menüsü", message.guild.iconURL({dynamic: true, size: 2048})).setFooter(`Bir komut hakkında detaylı bilgi almak için; ${client.sistem.a_Prefix}yardım <komut ismi>`)
        .addField(`Bot Yönetim Komutları`, `${client.komutlar.filter(x => x.Kategori === "Bot/Taç").map(x => `${client.sistem.a_Prefix}` + x.Kullanim).join('\n ')}`)
        .addField(`Yönetim Komutları`, `${client.komutlar.filter(x => x.Kategori === "Yönetim Komutları").map(x => `${client.sistem.a_Prefix}` + x.Kullanim).join('\n ')}`)
        .addField(`Yetkili Komutları`, `${client.komutlar.filter(x => x.Kategori === "Yetkili Komutları").map(x => `${client.sistem.a_Prefix}` + x.Kullanim).join('\n ')}`)
        .addField(`Teyitci Komutları`, `${client.komutlar.filter(x => x.Kategori === "Kayıt Komutları").map(x => `${client.sistem.a_Prefix}` + x.Kullanim).join('\n ')}`)
        .addField(`Booster Komutları`, `${client.komutlar.filter(x => x.Kategori === "Booster").map(x => `${client.sistem.a_Prefix}` + x.Kullanim).join('\n ')}`,true)
        .addField(`Üye Komutları;`, `${client.komutlar.filter(x => x.Kategori === "Üye").map(x => `${client.sistem.a_Prefix}` + x.Kullanim).join('\n ')}`, true)
      message.channel.send({embed: embed});
 }
};