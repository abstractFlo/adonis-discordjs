'use strict'

const path = require('path')
const resolve = require('resolve')
const { ServiceProvider } = require('@adonisjs/fold')

class DiscordBotProvider extends ServiceProvider {
  /**
   * Register all ioc bindings
   */
  register() {
    this.registerHelper()
    this.registerPluginLoader()
    this.registerMessageHandler()
    this.registerScheduler()
    this.registerStartBot()
  }

  /**
   * Register Plugin Loader
   */
  registerPluginLoader() {
    this.app.singleton('DiscordBot/PluginLoader', () => {
      const plugins = this.getPluginsConfig()
      return new (require('../src/DiscordBot/PluginLoader'))(plugins)
    })
  }

  /**
   * Register Message Handler
   */
  registerMessageHandler() {
    this.app.singleton('DiscordBot/MessageHandler', () => {
      return new (require('../src/DiscordBot/MessageHandler'))()
    })
  }

  /**
   * Register Scheduler
   */
  registerScheduler() {
    this.app.singleton('DiscordBot/Scheduler', () => {
      return new (require('../src/DiscordBot/Scheduler'))()
    })
  }

  /**
   * Register helper class
   */
  registerHelper() {
    this.app.singleton('DiscordBot/Helper', () => {
      const Env = this.app.use('Env')
      return new (require('../src/DiscordBot/Helper'))(Env.get('BOT_MESSAGE_PREFIX', '!'))
    })
  }

  /**
   * Register bot start
   */
  registerStartBot() {
    this.app.singleton('DiscordBot/StartBot', () => {
      const Env = this.app.use('Env')
      return new (require('../src/DiscordBot/Bot'))().then(bot => {
        this.app.use('DiscordBot/PluginLoader').loadPlugins(bot, this.app.use('DiscordBot/Helper'))

        bot.login(Env.get('BOT_TOKEN')).then(() => {
          bot.emit('loaded')
        })

        bot.on('message', message => {
          this.app
            .use('DiscordBot/MessageHandler')
            .handle(message, this.app.use('DiscordBot/PluginLoader'), this.app.use('DiscordBot/Scheduler'))
        })
      })
    })
  }

  /**
   * Return the plugin config
   */
  getPluginsConfig() {
    const resolveOpts = {
      baseDir: process.cwd(),
      paths: [process.cwd(), path.join(__dirname, '../stubs')]
    }

    return require(resolve.sync('bot-plugins.js', resolveOpts))
  }
}

module.exports = DiscordBotProvider
