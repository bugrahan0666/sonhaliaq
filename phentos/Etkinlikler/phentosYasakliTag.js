const { GuildMember, Message, MessageEmbed, Client} = require("discord.js");
const client = require("discord.js")
const qDb = require("quick.db");
const db = new qDb.table("ayarlar");
const cezaDb = new qDb.table("aCezalar");
const kullaniciverisi = new qDb.table("aKullanici");
const moment = require('moment');
module.exports = {
    Etkinlik: "ready",
    /**
     * @param {Client} client
      * @param {Client} message
     */
    onLoad: function (client, message) {
       
    },
    /**
     * @param {GuildMember} member
     */
    onRequest: async function () {
        setInterval(() => {
            yasakliTagKontrolEt();
          }, 10000);
    }
  };

  function yasakliTagKontrolEt() {
    let phentos = client.veri;
    let phentosveri = db.get("ayar") || {};
    let PenthosAyarlar = require("../phentos-ayar.json")
    let Pentoss1 = PenthosAyarlar.a_sunucuId
    
    // Yasaklı tag tarama (Yasaklı Tag Checkleme)
    let yasakTaglar = phentosveri.yasakTaglar || [];
    let yasakTaglilar = cezaDb.get("yasakTaglilar") || [];
  for (let kisi of yasakTaglilar) {
    let uye = client.guilds.cache.get(Pentoss1).members.cache.get(kisi.slice(1));
    if (uye && yasakTaglar.some(tag => uye.user.username.includes(tag)) && !uye.roles.cache.has(phentos.Roller.yasakliTagRolu)) uye.roles.set(uye.roles.cache.has(phentos.Roller.boosterRolu) ? [phentos.Roller.boosterRolu, phentos.Roller.yasakliTagRolu] : [phentos.Roller.yasakliTagRolu]).catch();
    if (uye && !yasakTaglar.some(tag => uye.user.username.includes(tag)) && uye.roles.cache.has(phentos.Roller.yasakliTagRolu)) {
      db.set("yasakTaglilar", yasakTaglilar.filter(x => !x.includes(uye.id)));
      uye.roles.set(phentos.kayıtRolleri.kayıtsızRolleri).catch();
      if(phentos.IkinciTag) uye.setNickname(`${phentos.IkinciTag} İsim | Yaş`).catch();
      else if(phentos.Tag) uye.setNickname(`${phentos.Tag} İsim | Yaş`).catch();
    };
  };
  };