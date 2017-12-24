const hexToDec = require('hex-to-dec')

class Helper {
  constructor(prefix) {
    this.msgPrefix = prefix
  }

  /**
   * Sends a info embed for warnings, errors and success messages
   *
   * @param {object} message
   * @param {string} info
   * @param {string} [title='Info']
   * @param {object} [footer=null]
   * @param {string} [type='default']
   *
   * @memberOf CordlrPlugin
   */
  sendInfo(message, info, title = 'Info', footer = null, type = 'default') {
    const channel = message.channel
    let color = null

    switch (type) {
      case 'warning':
        color = this.colorToDecimal('#fff83d')
        break
      case 'error':
        color = this.colorToDecimal('#fc5246')
        break
      case 'success':
        color = this.colorToDecimal('#36c17e')
        break
      default:
        color = this.colorToDecimal('#7289DA')
    }

    channel.send({
      embed: {
        title: title,
        footer: footer,
        color: color,
        description: info
      }
    })
  }

  /**
   * Sends a embed containing multiple fields as a response to the channel
   *
   * @param {object} message
   * @param {array} fields
   * @param {string} [title=null]
   * @param {object} [footer=null]
   *
   * @memberOf CordlrPlugin
   */
  sendFields(message, fields, title = null, footer = null) {
    const channel = message.channel

    channel.send({
      embed: {
        title: title,
        footer: footer,
        fields: fields
      }
    })
  }

  /**
   * Converts a hexadecimal color to a decimal integer
   *
   * @param {string} color
   * @returns {int}
   *
   * @memberOf CordlrPlugin
   */
  colorToDecimal(color) {
    const hexValue = color.replace('#', '')
    return hexToDec(hexValue)
  }

  /**
   * Return the current prefix
   */
  get prefix() {
    return this.msgPrefix
  }
}

module.exports = Helper
