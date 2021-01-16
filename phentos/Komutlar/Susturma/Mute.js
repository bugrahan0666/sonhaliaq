const { GuildMember, MessageEmbed,Client} = require("discord.js");
const qDb = require("quick.db");
const cezaDb = new qDb.table("aCezalar");
const cezaNoDb = new qDb.table("aVeri");
const kDb = new qDb.table("aKullanici");
const moment = require('moment');
const ms = require('ms');
const phentos = Client.veri;
module.exports = {
    Isim: "mute",
    Komut: ["sustur","chatmute","cmute"],
    Kullanim: "sustur @phentos/ID <süre> <sebep>",
    Aciklama: "Belirlenen üyeyi metin kanallarında belirlenen süre boyunca susturur.",
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
    let cezano = cezaNoDb.get(`cezano.${client.sistem.a_SunucuID}`) + 1;
    if(!["795215619892183051"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR")))  return message.channel.send(`Hata: Bu komutunu kullanabilmek için yeterli yetkiye sahip değilsin.`).then(sil => sil.delete({timeout: 5000}));
let reawEmbed = new MessageEmbed().setFooter("Reawen ❤️ Phentos").setColor("010000").setTimestamp()  
let embed = reawEmbed;
let muteler = cezaDb.get(`susturulma`) || [];
let mutelers = cezaDb.get(`sessusturulma`) || [];
  
let reawMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);  
let süre = args[1]
let sebep = args.splice(2).join(" ") || "Sebep belirtilmedi";
  
if (!message.member.roles.cache.get("795215619892183051") && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Yeterli yetkiye sahip değilsiniz.`))
if (!args[0] && !reawMember) {
message.channel.send(reawEmbed.setDescription(`
:no_entry_sign: Birisini etiketlemeyi unuttun!

Bu sistemde aşağıdaki emojilerden ses/chat mute açacağını belirleyebilirsin!
`))  
return;  
}
  
  message.channel.send(embed.setDescription(`
${reawMember} isimli kullanıcıya sesli kanallarda mute atmak için <:v_:799375357513170978>, yazılı kanallarda mute atmak için <:4406_text_emoji1:799375236545511526> emojisine tıklamalısın.
`)).then(async mesaj => {
 await mesaj.react("799407473634181172"); //sesli id
  await mesaj.react("799407473312268339"); //yazılı id

const sesli = (reaction, user) =>
    reaction.emoji.id === "799407473634181172" && user.id === message.author.id; //sesli id
const yazili = (reaction, user) =>
    reaction.emoji.id === "799407473312268339" && user.id === message.author.id; //yazılı id

const seslimute = mesaj.createReactionCollector(sesli, { time: 10000 });
const yazilimute = mesaj.createReactionCollector(yazili, { time: 10000 });

yazilimute.on("collect", async sasa => {
    if (!süre) return message.channel.send(embed.setDescription(`Geçerli bir süre belirtmelisin!`))
mesaj.reactions.removeAll();
mesaj.react("✅"); //tik emoji id koyabilrsn
reawMember.roles.add("797445574508412948");
mesaj.edit(embed.setDescription(`
${reawMember} kullanıcısı yazılı kanallarda **${sebep}** sebebiyle susturuldu!
`))
   let ceza = {
      No: cezano,
      Cezalanan: reawMember.id,
      Yetkili: message.author.id,
      Tip: "MUTE",
      Tur: "Susturulma",
      Sebep: sebep,
      AtilanSure: süre,
      BitisZaman: "Şuan da susturulu",
      Zaman: Date.now() 
    };
  if(reawMember.voice.channel) reawMember.voice.setMute(true).catch();
    if (!muteler.some(j => j.id == reawMember.id)) {
      cezaDb.push(`sessusturulma`, {id: reawMember.id,No: cezano, kalkmaZamani: Date.now()+ms(süre)})
      kDb.add(`k.${message.author.id}.sesmute`, 1);
      kDb.push(`k.${reawMember.id}.sicil`, ceza);
      kDb.set(`ceza.${cezano}`, ceza)
    };
    cezaNoDb.add(`cezano.${client.sistem.a_SunucuID}`, 1)
message.guild.channels.cache.get("797445555986759690").send(embed.setDescription(`${reawMember} üyesi ${message.author} tarafından **${sebep}** sebebiyle **yazılı kanallarda** susturuldu!`))
setTimeout(() => {

reawMember.roles.remove("797445574508412948")
      message.channel.send(embed.setDescription(`${reawMember} adlı üyenin mutesi süresi dolduğu için açıldı!`))

    }, ms(süre))
});

seslimute.on("collect", async sasa => {
  if (!süre) return message.channel.send(embed.setDescription(`Geçerli bir süre belirtmelisin!`))
mesaj.reactions.removeAll();
mesaj.react("✅"); //tik emoji id koyabilirsn
message.guild.members.cache.get(reawMember.id).voice.setMute(true).catch();
mesaj.edit(embed.setDescription(`
${reawMember} kullanıcısı sesli kanallarda **${sebep}** sebebiyle susturuldu!
`))
message.guild.channels.cache.get("797445555986759690").send(embed.setDescription(`${reawMember} üyesi ${message.author} tarafından **${sebep}** sebebiyle **sesli kanallarda** susturuldu!`))
if(reawMember.voice.channel) reawMember.voice.setMute(true).catch();
    if (!mutelers.some(j => j.id == reawMember.id)) {
    let ceza = {
        No: cezano,
        Cezalanan: reawMember.id,
        Yetkili: message.author.id,
        Tip: "VMUTE",
        Tur: "Seste Susturulma",
        Sebep: sebep,
        AtilanSure: süre,
        BitisZaman: "Şuan da seste susturulu",
        Zaman: Date.now() 
      };
    if(reawMember.voice.channel) reawMember.voice.setMute(true).catch();
    if (!mutelers.some(j => j.id == reawMember.id)) {
      cezaDb.push(`sessusturulma`, {id: reawMember.id,No: cezano, kalkmaZamani: Date.now()+ms(süre)})
      kDb.add(`k.${message.author.id}.sesmute`, 1);
      kDb.push(`k.${reawMember.id}.sicil`, ceza);
      kDb.set(`ceza.${cezano}`, ceza)
    }
  
  setTimeout(() => {

reawMember.voice.setMute(false)
      message.channel.send(embed.setDescription(`${reawMember} adlı üyenin mutesi süresi dolduğu için açıldı!`))
    }, ms(süre))
}});

  });
}
};

