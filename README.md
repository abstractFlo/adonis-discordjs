# Adonis-Discordjs

Discordjs is a powerfull javascript library to create Discord bots without pain.

It provide a simple, clean and readable syntax.

This package is a wrapper between adonisjs 4.x and discordjs. All functions from discordjs included and available.

### Installation

In your adonisjs 4.x installation type `adonis install adonis-discordjs` to install the package. After installation there is a `bot-plugins.js` file on your root folder. This file is the plugin config for all bot plugins. Add following to your `start/app.js`

```
const providers = [
  ....
  'adonis-discordjs/providers/Bot'
]
```

### Add .env variables

Please add following variables to your .env file

```
BOT_TOKEN=YOUR_BOT_TOKEN
BOT_MESSAGE_PREFIX=! // You can set your own prefix, default is !
```

### Start the bot

Start the bot is easy as possible. Add this to the end of your `server.js` File `use('DiscordBot/StartBot')`

Than you can start the adonis server with `adonis serve —dev` or in production `node server.js`

Thats all, your bot is logged in with token to your server. All errors logged to console from server

### Thanks

My biggest thanks goes to [https://github.com/Devcord/cordlr-cli](https://github.com/Devcord/cordlr-cli)

My package is only a wrapper between cordlr-cli and adonisjs 4 without the cli part from cordlr. It's a custom implementation with the power of serviceprovider from adonisjs
