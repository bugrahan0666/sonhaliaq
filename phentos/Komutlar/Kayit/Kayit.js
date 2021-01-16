const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const Discord = require("discord.js");
const client  = new Discord.Client();
const db = require("quick.db");
const kullaniciverisi = new db.table("aKullanici");
const kullanicicinsiyet = new db.table("aCinsiyet");
let PenthosAyarlar = require("../../phentos-veri.json")
const phentos = PenthosAyarlar.kayıtRolleri
const PhentosTags = PenthosAyarlar.veri
const Ayarlar = PenthosAyarlar.tepkiId
const phentoskanallar = PenthosAyarlar.Kanallar
let Tag1 = PenthosAyarlar.Tag
let Tag2 = PenthosAyarlar.IkinciTag
const tepkiler = [
    Ayarlar.erkekTepkiId,
    Ayarlar.kadinTepkiId,
];
module.exports = {
    Isim: "kayıt",
    Komut: ["k", "kaydet"],
    Kullanim: "kayıt @phentos/ID <isim> <yaş>",
    Aciklama: "Belirlenen üyeyi sunucu da cinsiyetini belirleyerek kayıt işlemini yapar.",
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
    let embed = new MessageEmbed().setColor('0x2f3136').setFooter(client.altbaslik)
    if((!phentos.erkekRolleri && !phentos.kadinRolleri) || !phentos.kayıtYapanRoller) return message.channel.send("Sistemsel hata: Rol bulunamadı veya rol bilgileri girilemedi.").then(sil => sil.delete({timeout: 5000}));
    if(!phentos.kayıtYapanRoller.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Hata: Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin.`).then(sil => sil.delete({timeout: 5000}));
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.send(`Hata: Lütfen bir üye etiketleyin veya Id giriniz!  __Örn:__  \`${client.sistem.a_Prefix}kayıt @phentos/ID isim yaş\``).then(sil => sil.delete({timeout: 5000}));
    if(message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(`Hata: Belirlediğiniz üye sizden yetkili veya aynı yetkidesiniz.`).then(sil => sil.delete({timeout: 5000}));
    if(phentos.erkekRolleri.some(erkek => uye.roles.cache.has(erkek))) return message.channel.send(`Hata: Belirlediğiniz üye sunucuda zaten kayıtlı ne için tekrardan kayıt ediyorsun?`).then(sil => sil.delete({timeout: 5000}));
    if(phentos.kadinRolleri.some(kadin => uye.roles.cache.has(kadin))) return message.channel.send(`Hata: Belirlediğiniz üye sunucuda zaten kayıtlı ne için tekrardan kayıt ediyorsun?`).then(sil => sil.delete({timeout: 5000}));
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let BelirlenenIsim;
    let erkekRolleri;
    let kadinRolleri;
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || undefined;
    if(!isim || !yaş) return message.channel.send(`Hata: Lütfen tüm argümanları doldurunuz!  __Örn:__  \`${client.sistem.a_Prefix}kayıt @phentos/ID isim yaş\``).then(sil => sil.delete({timeout: 5000}));
        BelirlenenIsim = `${uye.user.username.includes(Tag1) ? Tag1 : (Tag2 ? Tag2 : (Tag1 || ""))} ${isim} | ${yaş}`;
        message.guild.members.cache.get(uye.id).setNickname(`${BelirlenenIsim}`).catch();
        kullaniciverisi.push(`k.${uye.id}.isimler`, {
            Isim: BelirlenenIsim,
            Yetkili: message.author.id,
            Zaman: Date.now()
        });
       kullaniciverisi.push(`k.${uye.id}.roller`, {
         roller: message.guild.members.roles.cache.get(erkekRolleri.id) 
       })
        let phentoskayit = await message.channel.send(embed
            .setDescription(`${uye} isimli kişinin cinsiyetini tepkilerle belirleyin!`)
            ).then(async m => {
            await m.react(Ayarlar.erkekTepkiId)
            await m.react(Ayarlar.kadinTepkiId)
            return m;
          }).catch(err => undefined);
          let tepki = await phentoskayit.awaitReactions((reaction, user) => user.id == message.author.id && tepkiler.some(emoji => emoji == reaction.emoji.id), { errors: ["time"], max: 1, time: 15000 }).then(coll => coll.first()).catch(err => { message.channel.send(embed.setDescription(`${message.author}, 15 saniye boyunca cevap vermediği için kayıt işlemi iptal edildi.`)).then(sil => sil.delete({timeout: 7500})); phentoskayit.delete().catch(); return; });
          if(!tepki) return;
          phentoskayit.delete()
          if (tepki.emoji.id == Ayarlar.erkekTepkiId) {
            kullaniciverisi.add(`teyit.${message.author.id}.erkekteyit`, 1);
            kullanicicinsiyet.push(`veri.${uye.id}.cinsiyet`, `erkek`);
            let erkek = uye.roles.cache.filter(x => x.managed).map(x => x.id).concat(phentos.erkekRolleri)
            await uye.roles.set(erkek)
            message.channel.send(embed.setDescription(`${uye}, adlı üye başarıyla ${message.author}, tarafından **Erkek** olarak kayıt edildi.`)).then(sil => sil.delete({timeout: 15000}));    } else {
         if (tepki.emoji.id == Ayarlar.kadinTepkiId) {
            kullaniciverisi.add(`teyit.${message.author.id}.kadinteyit`, 1);
            kullanicicinsiyet.push(`veri.${uye.id}.cinsiyet`, `kadin`);
            let kadın = uye.roles.cache.filter(x => x.managed).map(x => x.id).concat(phentos.kadinRolleri)
            await uye.roles.set(kadın)
            message.channel.send(embed.setDescription(`${uye}, adlı üye başarıyla ${message.author}, tarafından **Kadın** olarak kayıt edildi.`)).then(sil => sil.delete({timeout: 15000}));
         } 
       } if(uye.user.username.includes(Tag1)) uye.roles.add(phentos.tagRolu); 
       if(uye.voice.channel) await uye.voice.setChannel(phentoskanallar.kayitSonrasi);
       message.react("✅"); 
       return;
    }
};