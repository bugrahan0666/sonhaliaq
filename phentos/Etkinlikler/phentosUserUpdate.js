const { GuildMember, MessageEmbed,Client,WebhookClient} = require("discord.js");
const qDb = require("quick.db");
const db = new qDb.table("ayarlar");
const moment = require('moment');
const cezaDb = new qDb.table("aCezalar");
const phentos = client.veri
module.exports = {
    Etkinlik: "userUpdate",
    /**
     * @param {Client} client
    */
    onLoad: function (client) {
       
    },

    /**
    * @param {User} oldMember
    * @param {User} newMember
    */
    onRequest: async function (oldUser, newUser) {
        if(oldUser.username == newUser.username || oldUser.bot || newUser.bot) return;
        let client = oldUser.client;
        let guild = client.guilds.cache.get(client.sistem.a_sunucuId);
        if(!guild) return console.error(`Hata: ${__filename} Sunucu bulunamadı!`);
        let user = guild.members.cache.get(oldUser.id);
        let ayarlar = db.get(`ayar`) || {};
        let yasakTaglilar = db.get('yasakTaglilar') || [];
      
        if ((ayarlar.yasakTaglar && ayarlar.yasakTaglar.some(tag => newUser.username.includes(tag))) && (phentos.Roller.yasakliTagRolu && !user.roles.cache.has(phentos.Roller.yasakliTagRolu))) {
          user.roles.set(user.roles.cache.has(phentos.Roller.boosterRolu) ? [phentos.Roller.boosterRolu, phentos.Roller.yasakliTagRolu] : [phentos.Roller.yasakliTagRolu]).catch();
          user.send(`**${user.guild.name}** sunucumuzun yasaklı taglarından birini kullanıcı adına aldığın için jaile atıldın! Tagı geri bıraktığında jailden çıkacaksın.`).catch();
          if(!yasakTaglilar.some(x => x.includes(newUser.id))) cezaDb.push('yasakTaglilar', `y${newUser.id}`);
          return;
        };
        if ((ayarlar.yasakTaglar && !ayarlar.yasakTaglar.some(tag => newUser.username.includes(tag))) && (phentos.Roller.yasakliTagRoluu && user.roles.cache.has(phentos.Roller.yasakliTagRolu)) && yasakTaglilar.some(x => x.includes(newUser.id))) {
          user.roles.set(phentos.kayıtRolleri.kayıtsızRolleri).catch();
          user.send(`**${user.guild.name}** sunucumuzun yasaklı taglarından birine sahip olduğun için jaildeydin ve şimdi bu yasaklı tagı çıkardığın için jailden çıkarıldın!`).catch();
          cezaDb.set('yasakTaglilar', yasakTaglilar.filter(x => !x.includes(newUser.id)));
          return;
        };


        // Tag Çıkardı Ekledi (Checkleyip Rol verme İsim Ayarlama İşlemi)
        if(newUser.username.includes(phentos.Tag) && !user.roles.cache.has(phentos.kayıtRolleri.tagRolu)){
             user.roles.add(phentos.kayıtRolleri.tagRolu).catch();
             if(user.manageable) user.setNickname(user.displayName.replace(phentos.IkinciTag, phentos.Tag)).catch();
       } else if(!newUser.username.includes(phentos.Tag) && user.roles.cache.has(phentos.kayıtRolleri.tagRolu)){
             user.roles.remove(phentos.kayıtRolleri.tagRolu).catch();
             if(user.manageable) user.setNickname(user.displayName.replace(phentos.Tag, phentos.IkinciTag)).catch();
            //log mesajı girilebilir
        }
    }
  };