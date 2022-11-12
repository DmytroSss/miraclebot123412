const { Client, Message, MessageEmbed } = require("discord.js")
const convertVoice = require("../../functions/convertVoiceTime")
const razbitNumber = require("../../functions/razbitNumber")
const a = ["message", "voice", "money", "$", "bal", "balance"]

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot, message, args) => {
    let numbers = {
        0: "",
        1: "<:leader1:1040309269645496331>",
        2: "<:leader2:1040309267472850974>",
        3: "<:leader3:1040309265795129344>",
        4: "<:invise:1040309271641997322>",
        5: "<:invise:1040309271641997322>",
        6: "<:invise:1040309271641997322>",
        7: "<:invise:1040309271641997322>",
        8: "<:invise:1040309271641997322>",
        9: "<:invise:1040309271641997322>",
        10: "<:invise:1040309271641997322>"
    };
    if(args[0] == a[0]){
        User.find({inTopChat: true}).sort([['msgs','descending']]).exec((err,res) => {
            if(err) throw err;
            if(res && res.length > 0){
                let toptext = ""
                let mon = ""
                if(res.length <= 10){
                    for(let i = 0;i < res.length;i++){
                        toptext = toptext + `${numbers[i + 1]} <@!${res[i].userID}>\n`
                        mon = mon + `**${res[i].msgs}**\n`
                    }
                } else {
                    for(let i = 0;i < 10;i++){
                        toptext = toptext + `${numbers[i + 1]} <@!${res[i].userID}>\n`
                        mon = mon + `**${res[i].msgs}**\n`
                    }
                }
                let topmoney = new MessageEmbed()
                .setTitle(" Топ по сообщениям ")
                .addField(`Ник:`, toptext, true)
                .addField(`Сообщений:`, mon, true)
                .setColor("#36393f")
                //.setImage("https://images-ext-2.discordapp.net/external/fv4ZOraVUJoIgcz8HTWdcRZthy7TsJWOj4NevDZQWa0/https/media.discordapp.net/attachments/823681920411107348/825483461040799784/1111.png")
                message.channel.send(topmoney)
            } else {
                return bot.panel(null, `Таблица этого сервера пуста`, null, null, "panel", null, 15)
            }
        })
    } else if(args[0] == a[1]){
        User.find({inTopVoice: true}).sort([['voice','descending']]).exec((err,res) => {
            if(err) throw err;
            if(res && res.length > 0){
                let toptext = ""
                let mon = ""
                if(res.length < 10){
                    for(let i = 0;i < res.length;i++){
                        toptext = toptext + `${numbers[i + 1]} <@!${res[i].userID}>\n`
                        mon = mon + `**${convertVoice(res[i].voice) || "0ч. 0м."}**\n`
                    }
                } else {
                    for(let i = 0;i < 10;i++){
                        toptext = toptext + `${numbers[i + 1]} <@!${res[i].userID}>\n`
                        mon = mon + `**${convertVoice(res[i].voice) || "0ч. 0м."}**\n`
                    }
                }
                let topmoney = new MessageEmbed()
                .setTitle(" Топ по голосовому онлайну ")
                .addField(`Ник:`, toptext, true)
                .addField(`Время:`, mon, true)
                .setColor("#36393f")
                //.setImage("https://images-ext-2.discordapp.net/external/fv4ZOraVUJoIgcz8HTWdcRZthy7TsJWOj4NevDZQWa0/https/media.discordapp.net/attachments/823681920411107348/825483461040799784/1111.png")
                message.channel.send(topmoney)
            } else {
                return bot.panel(null, `Таблица этого сервера пуста`, null, null, "panel", null, 15)
            }
        })
    } else if(args[0] == a[2] || args[0] == a[3] || args[0] == a[4] || args[0] == a[5]){
        User.find({inTopMoney: true}).sort([['crown','descending']]).exec((err,res) => {
            if(err) throw err;
            if(res && res.length > 0){
                let toptext = ""
                let mon = ""
                if(res.length < 10){
                    for(let i = 0;i < res.length;i++){
                        toptext = toptext + `${numbers[i + 1]} <@!${res[i].userID}>\n`
                        mon = mon + `**${razbitNumber(res[i].crown)}**\n`
                    }
                } else {
                    for(let i = 0;i < 10;i++){
                        toptext = toptext + `${numbers[i + 1]} <@!${res[i].userID}>\n`
                        mon = mon + `**${razbitNumber(res[i].crown)}**\n`
                    }
                }
                let topmoney = new MessageEmbed()
                .setTitle("ТОП-онлайн по конфетам")
                .addField(`Ник:`, toptext, true)
                .addField(`${bot.values.crown}Конфет:`, mon, true)
                .setColor("#36393f")
                //.setImage("https://images-ext-2.discordapp.net/external/fv4ZOraVUJoIgcz8HTWdcRZthy7TsJWOj4NevDZQWa0/https/media.discordapp.net/attachments/823681920411107348/825483461040799784/1111.png")
                message.channel.send(topmoney)
            } else {
                return bot.panel(null, `Таблица этого сервера пуста`, null, null, "panel", null, 15)
            }
        })
    }
}