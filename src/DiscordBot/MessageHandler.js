'use strict'

const minimist = require('minimist')
const spawnargs = require('spawn-args')

class MessageHandler {
  constructor(prefix) {
    this.prefix = prefix || '!'
  }

  /**
   * Check if the message has the prefix
   * @param {string} message
   */
  checkIfMessageStartsWithPrefix(message) {
    return message.content.startsWith(this.prefix) && message.channel.type !== 'dm'
  }

  handle(message, PluginLoader, Scheduler) {
    if (this.checkIfMessageStartsWithPrefix(message)) {
      const input = spawnargs(message.content.slice(this.prefix.length))
      const flags = minimist(input)
      const args = flags._
      const command = args.shift()

      if (!command) {
        return false
      }

      const request = PluginLoader.getPluginCommand(command)
      if (request) {
        if (message.member.hasPermission(request.permissions)) {
          Scheduler.addScheduledCommand({
            object: request.plugin,
            command: request.plugin.commands[request.command].function,
            args: {
              message,
              args,
              flags
            }
          })
        } else {
          message.author.send(`Sorry, but you are not allowed to run the command ** ${command} **`)
        }
      }
    }
  }
}

module.exports = MessageHandler
