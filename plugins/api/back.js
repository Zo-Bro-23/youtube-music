const { dialog, app } = require("electron");

const registerCallback = require("../../providers/song-info");

module.exports = (win, { }) => {
    win.once("ready-to-show"), () => {
        registerCallback(songInfo => {
            console.log("songInfo", songInfo);
        })
    }
}