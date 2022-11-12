module.exports.run = async (bot,message,args) => {
    let text = args.join(' ')
    if(!text) return
    if (text > 206 || text < 2) return bot.panel(null, `Статус не может быть больше 206 символов или менее 2`)
    User.findOne({userID: message.author.id}, (err, res) => {
        if(err) throw err
        if(res){
            if(text == "off"){
                res.status = "[ Без статуса ]"
                res.save()
                return bot.panel(null, `твой статус был успешно убран`) 
            }
            res.status = text
            res.save()
            bot.panel(null, `твой статус был изменен на:\n\`\`\`${text}\`\`\``)
        }
    })
}