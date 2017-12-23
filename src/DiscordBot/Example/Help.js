class Help {
  constructor(bot, helper) {
    this.helper = helper

    this.name = 'Help'
    this.description = 'List all commands with usage info and description'

    this.commands = {
      help: {
        usage: '',
        function: 'showHelp',
        description: 'List all available commands',
        permissions: []
      },
      plugins: {
        usage: '',
        function: 'showPlugins',
        description: 'List all installed Bot Plugins',
        permissions: []
      }
    }

    this.hooks = {
      pluginCommands: 'getPluginCommands',
      pluginData: 'getPluginData'
    }
  }

  showHelp(message) {
    const fields = []
    this.pluginCommands.forEach(plugin => {
      for (const command in plugin) {
        const usage = plugin[command].usage || ''
        const description = plugin[command].description || 'No description added'

        fields.push({
          name: `${this.helper.getPrefix()}${command} ${usage}`,
          value: description
        })
      }
    })
    this.helper.sendFields(message, fields, 'Help:')
  }

  showPlugins(message) {
    const fields = []

    for (const plugin of this.pluginData) {
      fields.push({
        name: plugin.name,
        value: plugin.description
      })
    }

    this.helper.sendFields(message, fields, 'Plugins:')
  }

  getPluginCommands(pluginCommands) {
    this.pluginCommands = pluginCommands
    return pluginCommands
  }

  getPluginData(pluginData) {
    this.pluginData = pluginData
    return pluginData
  }
}

module.exports = Help
