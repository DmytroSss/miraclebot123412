const { Client, Message } = require("discord.js")
const ms = require("ms")
const { vmuteRole } = require("../../settings/config")
const getMemb = require("../../functions/getMember")
const convertTime = require("../../functions/convertTime")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot, message, args) => {
    if(!args[0]) return bot.panel(null, `Укажите пользователя`, null, null, "panel", null, 15)
    let memb = getMemb(message, args[0])
    if(!memb) return bot.panel(null, `Пользователь не найден`, null, null, "panel", null, 15)
    if(memb == message.member) return
    if(!args[1]) return bot.panel(null, `Укажите время`, null, null, "panel", null, 15)
    let time
    try {
        time = ms(args[1])
    } catch (error) {
        return bot.panel(null, `Укажите корректное время`, null, null, "panel", null, 15)
    }
    if(time <= 0) return bot.panel(null, `Укажите корректное время`, null, null, "panel", null, 15)
    let reas = args.slice(2).join(' ')
    if(!reas) return bot.panel(null, `Укажите причину`, null, null, "panel", null, 15)
    memb.roles.add(vmuteRole)
    if(memb.voice) memb.voice.kick()
    User.findOne({userID: memb.id}, (err, res) => {
        if(err) throw err
        if(res){
            res.history.push({
                moder: message.author.id,
                reas: reas,
                type: "vmute",
                time: args[1],
                date: Date.now()
            })
            res.mutev = parseInt(Date.now() + ms(args[1]))
            res.save()
            bot.panel(null, `участнику ${memb.user} был выдан мут в войсах на **${convertTime(parseInt(Date.now() + ms(args[1])))}** по причине: **${reas}**`, null, null, "admin", true)
        }
    })
}

module.exports.config = {
    admin: true
}