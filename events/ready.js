const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const { Collection } = require("discord.js")
require("dotenv").config()

module.exports = {
    name: "ready",
    once: true,
    execute (client, bot) {
        //When bot loads
        console.log(`Logged in as ${client.user.tag}!`)

        /* Still working on this but it's disabled for now.
        
        const CLIENT_ID = process.env.CLIENT_ID
        
        client.slashcommands = new Collection()

        client.loadSlashCommands = (bot, reload) => require("./handlers/SlashCommands")
        client.loadSlashCommands(bot, false)
        
        */
        const rest = new REST({
        version: "9"
        }).setToken(process.env.TOKEN);

        (async () => {
        try {
            if (process.env.ENV === "Production") {
            await rest.put(Routes.applicationCommands(CLIENT_ID), {
                body: commands
            })
            console.log("Seccessfully registered commands globaly.");
            } else {
            await rest.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID), {
                body: commands
            })
            console.log("Seccessfully registered commands locally.");
            }
        } catch (err) {
            if (err) console.error(err);
        }
        })();
    }
}