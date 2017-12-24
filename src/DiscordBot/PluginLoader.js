const resolve = require('resolve')
const chalk = require('chalk')

class PluginLoader {
  constructor(config) {
    this.pluginConfig = config
    this.loadedPlugins = []

    this.pluginCommands = []
    this.pluginData = []
  }

  /**
   * Return the plugin paths
   */
  getPluginPaths() {
    let pluginPaths = this.pluginConfig || []

    if (!Array.isArray(pluginPaths)) pluginPaths = [pluginPaths]
    return pluginPaths
  }

  /**
   * Load all plugins from specific path
   */
  loadPlugins(bot, helper) {
    const pluginPaths = this.getPluginPaths()

    const resolveOpts = {
      baseDir: process.cwd(),
      paths: [process.cwd(), __dirname, process.cwd() + '/node_modules']
    }

    pluginPaths.map(pluginPath => {
      const plugin = require(resolve.sync(pluginPath, resolveOpts))
      this.registerPluginClasses(plugin, bot, helper)
    })

    console.log(chalk.yellow(`Number of Plugins: ${this.loadedPlugins.length}`))

    // Initialize Hooks
    this.setHookData()
  }

  /**
   * Register new Plugin for Bot
   * @param {*} Plugin
   */
  registerPluginClasses(Plugin, bot, helper) {
    const pluginClass = new Plugin(bot, helper)

    if (pluginClass) {
      // Get plugin commands
      this.pluginCommands.push(pluginClass.commands || [])

      // Get plugin name, description and commands
      this.pluginData.push({
        name: pluginClass.name || '',
        description: pluginClass.description || '',
        commands: pluginClass.commands || {}
      })

      console.log(chalk.bgGreen(chalk.black(`\n--- ${pluginClass.name} loaded ---`)))
      console.log(chalk.white(`${pluginClass.description}\n`))

      this.loadedPlugins.push(pluginClass)
    }
  }

  /**
   * Hook data - not really needed at this point of development
   */
  setHookData() {
    for (const plugin of this.loadedPlugins) {
      if (plugin.hooks) {
        if (plugin.hooks.pluginData && typeof plugin[plugin.hooks.pluginData] === 'function') {
          plugin[plugin.hooks.pluginData](this.pluginData)
        }

        if (plugin.hooks.pluginCommands && typeof plugin[plugin.hooks.pluginCommands] === 'function') {
          plugin[plugin.hooks.pluginCommands](this.pluginCommands)
        }
      }
    }
  }

  /**
   * Return the plugin by command
   * @param {string} command
   */
  getPluginCommand(command) {
    for (const plugin of this.loadedPlugins) {
      if (plugin.commands !== undefined && command in plugin.commands) {
        const permissions = plugin.commands[command].permissions || []
        const description = plugin.commands[command].description || ''

        return {
          plugin,
          command,
          permissions,
          description
        }
      }
    }

    return false
  }
}

module.exports = PluginLoader
