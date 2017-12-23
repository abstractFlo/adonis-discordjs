'use strict'

class Scheduler {
  constructor() {
    this.scheduledCommands = []
    this.scheduleTimer = false
  }

  /**
   * Add command to scheduled queue
   *
   * @param {string} command
   */
  addScheduledCommand(command) {
    if (!this.scheduleTimer) {
      this.scheduledCommands.push(command)
      this.runScheduledCommand()
    }
  }

  /**
   * Run a scheduled command
   */
  runScheduledCommand() {
    if (this.scheduledCommands.length >= 1) {
      const nextCommand = this.scheduledCommands[0]
      nextCommand.object[nextCommand.command](nextCommand.args.message, nextCommand.args.args, nextCommand.args.flags)

      this.scheduledCommands.splice(0, 1)

      this.createTimer()
    }
  }

  /**
   * Reset the scheduled timer
   */
  resetTimer() {
    clearInterval(this.scheduleTimer)
    this.scheduleTimer = false
  }

  /**
   * Create new scheduled timer
   */
  createTimer() {
    this.scheduleTimer = setInterval(() => {
      this.resetTimer()
    }, 1500)
  }
}

module.exports = Scheduler
