'use strict'

const path = require('path')
const Helpers = use('Adonis/Src/Helpers')
const fs = require('fs')
const chalk = require('chalk')

module.exports = async () => {
  try {
    const templateFile = path.join(__dirname, 'stubs', 'bot-plugins.js')
    const copyPath = path.join(Helpers.appRoot(), 'bot-plugins.js')

    let exists = await fs.existsSync(copyPath)

    if (!exists) {
      await fs.copyFileSync(templateFile, path.join(Helpers.appRoot(), 'bot-plugins.js'))
      console.log(chalk.green('Bot Plugins File copy success'))
    } else {
      console.log(chalk.yellow('Bot Plugins File already exists'))
    }
  } catch (error) {
    // Ignore Errors
  }
}
