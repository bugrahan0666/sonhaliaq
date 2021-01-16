const {Client, WebhookClient} = require("discord.js");
const qDb = require("quick.db");
const db = new qDb.table("ayarlar");
const cezaDb = new qDb.table("aCezalar");
const moment = require('moment');
const acarhook = new WebhookClient(client.veri.hosgeldinSistemi.webhookID, client.veri.hosgeldinSistemi.webhookTOKEN);
module.exports = {
    Etkinlik: "guildMemberAdd",
    /**
     * @param {Client} client
     */
    onLoad: function (client) {
    },
    /**
     * @param {GuildMember} member
     */
    onRequest: async function (member) {
        if(member.id == client.sistem.a_sID) {
            member.roles.add(client.veri.Roller.botcuRolu) 
            return
        };
        let acarkalkmazban = qDb.get(`akb_${member.guild.id}`)
        if(acarkalkmazban && acarkalkmazban.some(id => `k${member.user.id}` === id)) return;
        let acar = client.veri;
        let acarveri = db.get("ayar") || {};
        let cezalılar = cezaDb.get("cezalı") || [];
        let kalıcıcezalılar = cezaDb.get("kalıcıcezalı") || [];
        let yasakTaglilar = cezaDb.get("yasakTaglilar") || [];
        let kalicisusturulma = cezaDb.get("kalicisusturulma") || [];
        let sürelisusturma = cezaDb.get("susturulma") || [];
        let sessusturulma = cezaDb.get("sessusturulma") || [];
        let guvenili = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;
        if (acarveri.yasakTaglar && !acarveri.yasakTaglar.some(tag => member.user.username.includes(tag)) && yasakTaglilar.some(x => x.includes(member.id))) await cezaDb.set('yasakTaglilar', yasakTaglilar.filter(x => !x.includes(member.id)));
        if(cezalılar.some(x => x.includes(member.id)) || kalıcıcezalılar.some(x => x.id === member.id)){
        if(acar.Roller.jailRolu) member.roles.set([acar.Roller.jailRolu]).catch();
        } else if (acarveri.yasakTaglar && acarveri.yasakTaglar.some(tag => member.user.username.includes(tag))) {
         if(acar.Roller.yasakliTagRolu) member.roles.set([acar.Roller.yasakliTagRolu]).catch();
    if (!yasakTaglilar.some(id => id.includes(member.id))) cezaDb.push('yasakTaglilar', `y${member.id}`);
    member.send(`**${acar.Tag} ${acar.sunucuIsmi}** Yasak tag'da bulunduğunuz için otomatik olarak cezalıya atıldınız tagı çıkartana kadar cezalıda kalmaya devam ediceksin.`).catch();
  } else if (guvenili) {
          if(acar.Roller.supheliRolu) member.roles.set([acar.Roller.supheliRolu]).catch();
          if(acar.Kanallar.supheliLogKanali && member.guild.channels.cache.has(acar.Kanallar.supheliLogKanali)) return;
        } else if(acar.kayıtRolleri.kayıtsızRolleri) member.roles.add(acar.kayıtRolleri.kayıtsızRolleri).catch();
        if(sürelisusturma.some(x => x.id === member.id) || kalicisusturulma.some(x => x.includes(member.id))) member.roles.add(acar.Roller.muteRolu).catch();
        if(sessusturulma.some(x => x.id === member.id) && member.voice.channel) member.voice.setMute(true).catch();
        if(acar.IkinciTag) member.setNickname(`${acar.IkinciTag} İsim | Yaş`).catch();
        else if(acar.Tag) member.setNickname(`${acar.Tag} İsim | Yaş`).catch();
        var gün = moment(member.user.createdAt).format('DD')
        if(moment(member.user.createdAt).format('DD') === '01') {
           var gün = '1'
           }
        if(moment(member.user.createdAt).format('DD') === '02') {
           var gün = '2'
         }
        if(moment(member.user.createdAt).format('DD') === '03') {
           var gün = '3'
         }
        if(moment(member.user.createdAt).format('DD') === '04') {
           var gün = '4'
         }
        if(moment(member.user.createdAt).format('DD') === '05') {
           var gün = '5'
         }
        if(moment(member.user.createdAt).format('DD') === '06') {
           var gün = '6'
         }
        if(moment(member.user.createdAt).format('DD') === '07') {
           var gün = '7'
         }
        if(moment(member.user.createdAt).format('DD') === '08') {
           var gün = '8'
         }
        if(moment(member.user.createdAt).format('DD') === '09') {
           var gün = '9'
         }
        var tarih = ''
        if(moment(member.user.createdAt).format('MM') === '01') {
            var tarih = `${gün} Ocak ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
        }
        if(moment(member.user.createdAt).format('MM') === '02') {
            var tarih = `${gün} Şubat ${moment(member.user.createdAt).format('YYYY')}${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
        }
        if(moment(member.user.createdAt).format('MM') === '03') {
            var tarih = `${gün} Mart ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
        }
        if(moment(member.user.createdAt).format('MM') === '04') {
            var tarih = `${gün} Nisan ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
        }
        if(moment(member.user.createdAt).format('MM') === '05') {
            var tarih = `${gün} Mayıs ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
        }
        if(moment(member.user.createdAt).format('MM') === '06') {
            var tarih = `${gün} Haziran ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
        }
        if(moment(member.user.createdAt).format('MM') === '07') {
            var tarih = `${gün} Temmuz ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
        }
        if(moment(member.user.createdAt).format('MM') === '08') {
            var tarih = `${gün} Ağustos ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
        }
        if(moment(member.user.createdAt).format('MM') === '09') {
            var tarih = `${gün} Eylül ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
        }
        if(moment(member.user.createdAt).format('MM') === '10') {
            var tarih = `${gün} Ekim ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
        }
        if(moment(member.user.createdAt).format('MM') === '11') {
            var tarih = `${gün} Kasım ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
        }
        if(moment(member.user.createdAt).format('MM') === '12') {
            var tarih = `${gün} Aralık ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
        }
        acarhook.send(`
${client.emojis.cache.get(acar.Emojiler.hosgeldinGif1)} ${acar.sunucuUfakIsim} Sunucusuna Hoşgeldin!\n
${client.emojis.cache.get(acar.Emojiler.hosgeldinGif2)} ${member} (\`${member.id}\`) hesabın __${tarih}__ tarihinde ${client.gecmisTarihHesaplama(member.user.createdAt)} oluşturulmuş.\n
${client.emojis.cache.get(acar.Emojiler.hosgeldinGif3)} Ailemiz seninle birlikte **${member.guild.memberCount}** kişiye ulaştı! tagımızı alarak bizlere destek olabilirsin, <@&${acar.kayıtRolleri.kayıtYapanRoller}> rolüne sahip yetkililer senin ile ilgilenecektir.\n
${client.emojis.cache.get(acar.Emojiler.hosgeldinGif4)} Sunucu kurallarımız <#${acar.Kanallar.kurallarKanal}> kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek.\n
`); 
    }
  };