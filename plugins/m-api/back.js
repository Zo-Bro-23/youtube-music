const axios = require("axios");

const { setOptions, getOptions } = require("../../config/plugins");
const registerCallback = require("../../providers/song-info");

module.exports = (win) => {
    win.once("ready-to-show", () => {
        const options = getOptions("m-api")
        if (!options.key) {
            axios.get("https://youtube-music-api.zohan.tech/api/key")
                .then(response => {
                    options.key = response.data.key;
                    setOptions("m-api", options);
                })
        }

        registerCallback(songInfo => {
            axios.post("https://youtube-music-api.zohan.tech/api/status", { key: getOptions("m-api").key, ...songInfo })
                .catch(err => {
                    console.log(songInfo)
                })
        })
    })
}

module.exports.getKey = async (options) => {
    if (!options.key) {
        const response = await axios.get("https://youtube-music-api.zohan.tech/api/key");
        return response.data.key;
    }

    return options.key
}