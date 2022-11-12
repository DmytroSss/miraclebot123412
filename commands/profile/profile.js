const { Client, Message, MessageEmbed } = require("discord.js")
const colors = require("../../settings/colors")
const getMemb = require("../../functions/getMember")
const cnvTime = require("../../functions/convertVoiceTime")
const createDbUser = require("../../functions/createDbUser")
const razbitNumber = require("../../functions/razbitNumber")

let emoji = {
    oneday: "<:1d:1040189125044744202>",
    threeday: "<:3d:1040189130371498035>",
    sevenday: "<:7d:1040189128802828338>",
    selfchannel: "<:selfch:1040189121181782016>",
    elitestatus: "<:elite:1040189123383799808>"
}
/**
 * @param {Client} bot 
 * @param {Message} message 
 * @param {Array} args 
 */

module.exports.run = async (bot, message, args) => {

    function razbitXp(lvl) {
        return parseInt(5 * (lvl * lvl) + (50 * lvl) + 100);
    };
    function getBar(exp, nextAt){
        const empty = "<:0p:1040189133517234286>";
        const bar = ["<:40p:1040189132036640838>","<:30p:1040189135102681149>","<:20p:1040189136847519784>","<:10p:1040189138588139612>", empty]

        let procent = exp/nextAt;
        let line = "";
        for (let i=0;i<5;i-=-1) {
            if(procent > 0.20)
            line += bar[i]
            else
            line += empty;
            procent -=0.20
        }
        return line;
    };
    let memb = getMemb(message, args[0])
    if(!memb) memb = message.member

    User.findOne({userID: memb.id}, (err, res) => {
        if(err) throw err
        if(res){
            let marry;
            let voiceOnline = res.voice == 0 ? "0ч. 0м." : cnvTime(res.voice)
            if(res.marryID == "0") {
                marry = "Отсутствует";
            } else {
                marry = getMemb(message, res.marryID);
                marry = marry.user.tag;
            };
        
            let profile = new MessageEmbed()
            .setTitle(`Профиль  ${memb.user.tag} `)
            .setThumbnail(memb.user.displayAvatarURL({format: "png", dynamic: true, size: 1024}))
            .setDescription(`\`\`\`${res.status}\`\`\``)
            .addField(`Голос. онлайн`, `\`\`\`${voiceOnline}\`\`\``, true)
            .addField(`Сообщений`, `\`\`\`${razbitNumber(res.msgs)}\`\`\``, true)
            .addField(`Возлюбленная`, `\`\`\`${marry}\`\`\``, true)
            .addField(`Клан`, `В разработке`, true)
            .addField(`Уровень`, `${getBar(res.xp, razbitXp(res.lvl))} \`[${Math.trunc(parseInt(parseInt(res.xp / (razbitXp(res.lvl) / 100))))}%]\`\nУровень: \`${res.lvl}\``, true)
            .addField(`Хранилище`, `${emoji.oneday} \`${res.role1dSize}\` ${emoji.threeday} \`${res.role3dSize}\` ${emoji.sevenday} \`${res.role7dSize}\`\n ${emoji.selfchannel} \`${res.channel7dSize}\` ${emoji.elitestatus} \`${res.primeSize}\``, true)
            //.addField(`Хранилище`, `${bot.values.crown} \`${razbitNumber(res.crown)}\` ${bot.values.gem} \`${razbitNumber(res.gem)}\`\n${bot.values.key} \`${razbitNumber(res.key)}\` ${bot.values.gift} \`${razbitNumber(res.gift)}\``, true)
            .setFooter(`Кстати, а ты знал, что статус можно сменить? Попробуй, это делается при помощи команды ${bot.prefix}status [текст]`)
            .setColor(colors.default)
            .setImage(res.profileImg)

            message.channel.send(profile)
        } else {
            res = createDbUser(memb)

            let voiceOnline = res.voice == 0 ? "0ч. 0м." : cnvTime(res.voice)
            let marry = getMemb(message, res.marryID)
            if(!marry) marry = "Отсутствует"
            else marry = marry.user.tag
        
            let profile = new MessageEmbed()
            .setTitle(`Профиль ${memb.user.tag} `)
            .setThumbnail(memb.user.displayAvatarURL({format: "png", dynamic: true, size: 1024}))
            .setDescription(`\`\`\`${res.status}\`\`\``)
            .addField(`Голос. онлайн`, `\`\`\`${voiceOnline}\`\`\``, true)
            .addField(`Сообщений`, `\`\`\`${razbitNumber(res.msgs)}\`\`\``, true)
            .addField(`Возлюбленная`, `\`\`\`${marry}\`\`\``, true)
            .addField(`Клан`, `В разработке`, true)
            .addField(`Уровень`, `${getBar(res.xp, razbitXp(res.lvl))} \`[${Math.trunc(parseInt(parseInt(res.xp / (razbitXp(res.lvl) / 100))))}%]\`\nУровень: \`${res.lvl}\``, true)
            .addField(`Хранилище`, `${emoji.oneday} \`${res.role1dSize}\` ${emoji.threeday} \`${res.role3dSize}\` ${emoji.sevenday} \`${res.role7dSize}\`\n ${emoji.selfchannel} \`${res.channel7dSize}\` ${emoji.elitestatus} \`${res.primeSize}\``, true)
            //.addField(`Хранилище`, `${bot.values.crown} \`${razbitNumber(res.crown)}\` ${bot.values.gem} \`${razbitNumber(res.gem)}\`\n${bot.values.key} \`${razbitNumber(res.key)}\` ${bot.values.gift} \`${razbitNumber(res.gift)}\``, true)
            .setFooter(`Кстати, а ты знал, что статус можно сменить? Попробуй, это делается при помощи команды ${bot.prefix}status [текст]`)
            .setColor(colors.default)
            .setImage(res.profileImg)

            message.channel.send(profile)
        }
    })
}