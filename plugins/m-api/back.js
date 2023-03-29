const axios = require("axios");

const { setOptions, getOptions } = require("../../config/plugins");
const registerCallback = require("../../providers/song-info");
const getSongControls = require("../../providers/song-controls");
const { ipcMain } = require("electron");

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

        let currentSongInfo

        registerCallback(songInfo => {
            currentSongInfo = songInfo
            axios.post("https://youtube-music-api.zohan.tech/api/status", { key: getOptions("m-api").key, ...songInfo })
                .catch(err => {
                    console.log(err.message, err.stack, songInfo)
                })
        })

        ipcMain.on('timeChanged', (_, t) => {
            if (currentSongInfo) {
                currentSongInfo.elapsedSeconds = t
                axios.post("https://youtube-music-api.zohan.tech/api/status", { key: getOptions("m-api").key, ...currentSongInfo })
                    .catch(err => {
                        console.log(err.message, err.stack, currentSongInfo)
                    })
            }
        })

        pollControls();

        async function pollControls() {
            const response = await axios.get(`https://youtube-music-api.zohan.tech/api/controls?key=${getOptions("m-api").key}`)
            const songControls = getSongControls(win);
            response.data.controls.forEach(control => {
                songControls[control]();
            })
            setTimeout(pollControls, 100);
        }
    })
}

module.exports.getKey = async (options) => {
    if (!options.key) {
        const response = await axios.get("https://youtube-music-api.zohan.tech/api/key");
        return response.data.key;
    }

    return options.key
}