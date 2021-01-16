const bekleme = {};
module.exports = {
  Etkinlik: "message",
  Aktiflik: true,

  onLoad: function (client) { 
  },

  onRequest: async function (message) {
    if([".link", "!link"].includes(message.content.toLowerCase())){ 
    return message.channel.send(message.client.veri.sunucuDavetLinki); 
    }
    if([".tag", "!tag"].includes(message.content.toLowerCase())){ 
      return message.channel.send(message.client.veri.Tag); 
    }
    if (message.author.bot || !message.content.startsWith(message.client.sistem.a_Prefix)) return;
    let Args = message.content
      .substring(message.client.sistem.a_Prefix.length)
      .split(" ");
    let Komut = Args[0];
    let Phentos = message.client;
    Args = Args.splice(1);
    let Baslatici;
    let guild = message.guild || null;
    if (guild != null)
      await guild.fetch().then(result => guild = result)
    if (Phentos.komutlar.has(Komut)) {
      Baslatici = Phentos.komutlar.get(Komut);
      if (Baslatici.TekSunucu && message.channel.type == "dm")
        return;
      Baslatici.onRequest(Phentos, message, Args, guild);
    } else if (Phentos.komut.has(Komut)) {
      Baslatici = Phentos.komut.get(Komut);
      if (Baslatici.TekSunucu && message.channel.type == "dm")
        return;
      Baslatici.onRequest(Phentos, message, Args, guild);
    }
    bekleme[message.member.id] = Date.now();
  }
};