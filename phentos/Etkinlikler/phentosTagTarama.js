const { GuildMember, MessageEmbed,Client} = require("discord.js");
const qDb = require("quick.db");
const cezaDb = new qDb.table("aCezalar");
const kullaniciverisi = new qDb.table("aKullanici");
const moment = require('moment');
module.exports = {
    Etkinlik: "ready",
    /**
     * @param {Client} client
     */
    onLoad: function (client) {
       
    },
    /**
     * @param {GuildMember} member
     */
    onRequest: async function () {
        setInterval(() => {
            TagKontrolEt();
          }, 10000);
    }
  };

  function TagKontrolEt() {
    let phentos = client.veri;
    let sid = client.sistem.a_sunucuId;
    if (phentos.kayıtRolleri.kayıtsızRolleri) client.guilds.cache.get(sid).members.cache.filter(uye => uye.roles.cache.size === 1).array().forEach((uye, index) => setTimeout(() => { uye.roles.add(phentos.kayıtRolleri.kayıtsızRolleri).catch(console.error); }, index*1000));
    client.guilds.cache.get(sid).members.cache.filter(uye => uye.user.username.includes(phentos.Tag) && !uye.hasPermission('ADMINISTRATOR') && !uye.roles.cache.has(phentos.Roller.jailRolu) && !uye.roles.cache.has(phentos.Roller.yasakliTagRolu) && !uye.roles.cache.has(phentos.Roller.supheliRolu) && (!uye.roles.cache.has(phentos.kayıtRolleri.tagRolu) || !uye.displayName.startsWith(phentos.Tag))).array().forEach((uye, index) => {
        setTimeout(() => {
          uye.setNickname(uye.displayName.replace(phentos.IkinciTag, phentos.Tag));
          uye.roles.add(phentos.kayıtRolleri.tagRolu);
        }, index*5000);
      });
  };