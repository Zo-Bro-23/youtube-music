const { dialog, app } = require("electron");
const axios = require("axios");

const registerCallback = require("../../providers/song-info");

module.exports = (win, options) => {
    win.once("ready-to-show", () => {
        registerCallback(songInfo => {
            console.log("test", options);
        })
    })
}

module.exports.getKey = (options) => {
    // if (!options.key) {
    //     const response = axios.get("https://youtube-music-api.zohan.tech/key")
    //     return response.data.key
    // }

    // return options.key
    return 'test'
}