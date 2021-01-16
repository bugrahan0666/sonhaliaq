const { Client, Discord, MessageEmbed, Collection, WebhookClient } = require('discord.js');
const client = global.client = new Client({fetchAllMembers: true});
const moment = require('moment')
global.client = client;
require("moment-duration-format")
moment.locale('tr')
const fs = require("fs");
client.komutlar = new Collection();
client.komut = new Collection();
client.veri = require("./acar/acar-veri.json");
client.sistem = require("./acar/acar-ayar.json");
client.modüller = {}; 
client.altbaslik = client.veri.Tag + " " + client.veri.sunucuUfakIsim + " Developer by ACAR"
fs.readdir("./acar/Komutlar/", (err, dirs) => {
    if (err) console.error(err);
    dirs.forEach(dir => {
      if (dir.endsWith(".js")) {
        fs.rename("./acar/Komutlar/" + dir, "./acar/Komutlar/Diger/" + dir, err =>
          console.log(err)
        );
      } else
        fs.readdir("./acar/Komutlar/" + dir, (err2, files) => {
          if (err) console.error(err2);
          files.forEach(f => {
            if (!f.endsWith(".js")) return;
            let referans = require(`./acar/Komutlar/${dir}/${f}`);
            console.log(`[~ ACAR ~] (${dir}/${f}) adlı komut çalışır hale getirildi.`)
            if(typeof referans.onLoad === "function") referans.onLoad(client);
            client.komutlar.set(referans.Isim, referans);
            if (referans.Komut) {
              referans.Komut.forEach(alias => client.komut.set(alias, referans));
            }
          });
        });
    });
  });
  fs.readdir("./acar/Etkinlikler/", (err, files) => {
    if (err) return console.myTime(err);
    files.forEach(fileName => {
      let referans = require("./acar/Etkinlikler/" + fileName);
        referans.onLoad(client);
        client.on(referans.Etkinlik, referans.onRequest);
      console.log(
        `[~ ACAR~ ] (${fileName}) isimli etkinlik yüklendi.`
      );
    });
  });
  client.gecmisTarihHesaplama = (date) => {
    const startedAt = Date.parse(date);
    var msecs = Math.abs(new Date() - startedAt);
  
    const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
    msecs -= years * 1000 * 60 * 60 * 24 * 365;
    const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
    msecs -= months * 1000 * 60 * 60 * 24 * 30;
    const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
    msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
    const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
    msecs -= days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(msecs / (1000 * 60 * 60));
    msecs -= hours * 1000 * 60 * 60;
    const mins = Math.floor((msecs / (1000 * 60)));
    msecs -= mins * 1000 * 60;
    const secs = Math.floor(msecs / 1000);
    msecs -= secs * 1000;
  
    var string = "";
    if (years > 0) string += `${years} yıl`
    else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`
    else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`
    else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`
    else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`
    else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`
    else if (secs > 0) string += `${secs} saniye`
    else string += `saniyeler`;
  
    string = string.trim();
    return `\`${string} önce\``;
  };
let anliktarih = Date.now()
let aylartoplam = {
  "01": "Ocak",
  "02": "Şubat",
  "03": "Mart",
  "04": "Nisan",
  "05": "Mayıs",
  "06": "Haziran",
  "07": "Temmuz",
  "08": "Ağustos",
  "09": "Eylül",
  "10": "Ekim",
  "11": "Kasım",
  "12": "Aralık"
};
let aylar = aylartoplam;
client.tarihsel = moment(anliktarih).format("DD") + " " + aylar[moment(anliktarih).format("MM")] + " " + moment(anliktarih).format("YYYY HH:mm")
client.emoji = function(x) {
  return client.emojis.cache.get(x);
};


client.login(client.sistem.a_Token).catch(err => console.error("[~ ACAR ~] Discord API Botun tokenini doğrulayamadı."));