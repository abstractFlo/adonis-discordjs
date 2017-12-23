class Prune {
  constructor(bot, helper) {
    this.helper = helper
    this.name = 'Prune'
    this.description = 'Plugin to prune a specific amount of messages'

    this.commands = {
      prune: {
        usage: '<x>',
        function: 'pruneMessages',
        description: 'Prunes the last x messages',
        permissions: ['MANAGE_MESSAGES']
      }
    }
  }

  pruneMessages(message, args) {
    message.delete().then(() => {
      if (args[0] && typeof args[0] === 'number') {
        const channel = message.channel
        let numOfMessagesToPrune = args[0]

        if (numOfMessagesToPrune > 100) {
          numOfMessagesToPrune = 100
        }

        channel
          .fetchMessages({
            limit: numOfMessagesToPrune
          })
          .then(message => {
            this.deleteMessages(message)
          })
      } else {
        this.helper.sendInfo(message, 'Please add a number for pruning messages', 'Errir while pruning', null, 'error')
      }
    })
  }

  deleteMessages(messages) {
    for (const message of messages) {
      message[1].delete().catch(console.error)
    }
  }
}

module.exports = Prune
