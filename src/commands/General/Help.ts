import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ICommand, IParsedArgs, ISimplifiedMessage } from '../../typings'
import { MessageType, Mimetype } from '@adiwajshing/baileys'
import request from '../../lib/request'


export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'help',
            description: 'Displays the help menu or shows the info of the command provided',
            category: 'general',
            usage: `${client.config.prefix}help (command_name)`,
            aliases: ['h']
        })
    }

    run = async (M: ISimplifiedMessage, parsedArgs: IParsedArgs): Promise<void> => {
            const n = [
            './assets/Rin/Rin.mp4'
        ]
        let chitoge = n[Math.floor(Math.random() * n.length)]
	if (!parsedArgs.joined) {
			const commands = this.handler.commands.keys();
			const categories: { [key: string]: ICommand[] } = {};
			for (const command of commands) {
				const info = this.handler.commands.get(command);
				if (!command) continue;
				if (!info?.config?.category || info.config.category === "dev") continue;
				if (
					!info?.config?.category ||
					(info.config.category === "nsfw" &&
						!(await this.client.getGroupData(M.from)).nsfw)
				)
					continue;
				if (Object.keys(categories).includes(info.config.category))
					categories[info.config.category].push(info);
				else {
					categories[info.config.category] = [];
					categories[info.config.category].push(info);
				}
			}
            let text = `
╭─「(づ￣ 3￣)づ」
│⋊ 𝕌𝕤𝕖𝕣: *${M.sender.username}*
│⋊ ℕ𝕒𝕞𝕖: 🅜🅞🅑🅐
│⋊ ℙ𝕣𝕖𝕗𝕚𝕩: ${this.client.config.prefix}
│⋊ 𝕆𝕨𝕟𝕖𝕣: *${this.client.config.prefix}mod*
│⋊ 𝕆𝕗𝕗𝕚𝕔𝕚𝕒𝕝 𝕓𝕠𝕥 𝕚𝕟𝕤𝕥𝕒: https://instagram.com/_mobasshirachaudhary_
│⋊ 𝕠𝕨𝕟𝕖𝕣 𝕚𝕟𝕤𝕥𝕒: https://instagram.com/falling_1392005
╰────────────┈平和                            \n\n`
            const keys = Object.keys(categories)
            for (const key of keys)
                text += `*『 ${this.client.util.capitalize(
					key
	         )} 』*\n❐ \`\`\`${categories[key]
                    .map((command) => command.config?.command)
                    .join(', ')}\`\`\`\n\n`
            return void this.client.sendMessage(M.from, { url: chitoge }, MessageType.video, {quoted:M.WAMessage,
            mimetype: Mimetype.gif,
            caption: `${text} 
 ──❅┈[ 𝔂𝓸𝓾𝓻 𝓯𝓪𝓿 ⓜⓞⓑⓐ ⓑⓞⓣ ]┈❅───
┌────────────┈❅
│ Ⓜⓞⓑⓐ ⓣⓗⓔ ⓑⓞⓣ, ⓦⓗⓞ ⓘⓢ ⓥⓔⓡⓨ ⓗⓞⓣ
 ⓚⓘⓛⓛ ⓤ ⓦⓘⓣⓗ ⓞⓝⓔ ⓢⓗⓞⓣ, ⓘ ⓐⓜ ⓨⓞⓤⓡ ⓑⓞⓣ
│   ֍𝓹𝓸𝓮𝓽𝓲𝓬 𝔀𝓸𝓻𝓵𝓭
└────────────┈⁂
❅┈[ʙᴇꜱᴛ ᴏꜰ ʟᴜᴄᴋ ʙᴀʙᴇ *${M.sender.username}* ]┈❅
߷ *ɴᴏᴛᴇ: Use ${this.client.config.prefix}help <command_name> ᴛᴏ ᴍᴀᴋᴇ ʏᴏᴜʀ ʟɪꜰᴇ ᴊᴏʏꜰᴜʟ*` }
            )
        }
        const key = parsedArgs.joined.toLowerCase()
        const command = this.handler.commands.get(key) || this.handler.aliases.get(key)
        if (!command) return void M.reply(`No Command of Alias Found | "${key}"`)
        const state = await this.client.DB.disabledcommands.findOne({ command: command.config.command })
        M.reply(
            `𓆉𓆏 *command* ${this.client.util.capitalize(command.config?.command)}\n📉 *Status:* ${
                state ? 'Disabled' : 'Available'
            }\n𓄆 *Category:* ${this.client.util.capitalize(command.config?.category || '')}${
                command.config.aliases
                    ? `\n𓆣 *Aliases:* ${command.config.aliases.map(this.client.util.capitalize).join(', ')}`
                    : ''
            }\n𓅋 *Group Only:* ${this.client.util.capitalize(
                JSON.stringify(!command.config.dm ?? true)
            )}\n𓆏 *Usage:* ${command.config?.usage || ''}\n\n📒 *Description:* ${command.config?.description || ''}`
        )
    }
}
