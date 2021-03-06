'use strict'
const { Command } = require('discord-akairo')

module.exports = class HelpCommand extends Command {
  constructor() {
    super('help', {
      aliases: ['help', 'h'],
      description: {
        content: 'Displays a list of available command, or detailed information for a specific command.',
        usage: '[command]'
      },
      args: [{
        id: 'command',
        type: 'commandAlias'
      }]
    })
  }

  async exec(message, { command }) {
    return
    if (!command) {
      const embed = this.client.util.embed()
      .setColor('#0099ff')
      .addField('❯ Commands', `A list of available commands.\nFor additional info on a command, type \`${this.handler.prefix}help <command>\``)
      for (const category of this.handler.categories.values()) {
        embed.addField(`❯ ${category.id.replace(/(\b\w)/gi, (lc) => lc.toUpperCase())}`, `${category.filter((cmd) => cmd.aliases.length > 0).map((cmd) => `\`${cmd.aliases[0]}\``).join(' ')}`)
      }
      return message.util.send(embed)
    }
    const embed = this.client.util.embed()
    .setColor('#00FF00')
    .setTitle(`\`${command.aliases[0]} ${command.description.usage ? command.description.usage: ''}\``)
    .addField('❯ Description', `${command.description.content ? command.description.content: ''} ${command.description.ownerOnly ? '\n**[Owner Only]**': ''}`)
    if (command.aliases.length > 1)
      embed.addField('❯ Aliases', `\`${command.aliases.join('` `')}\``, true)
    if (command.description.examples && command.description.examples.length)
      embed.addField('❯ Examples', `\`${command.aliases[0]} ${command.description.examples.join(`\`\n\`${command.aliases[0]} `)}\``, true)
    return message.util.send(embed)
  }
}