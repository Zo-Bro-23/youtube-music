// const prompt = require("custom-electron-prompt");

const { setMenuOptions } = require("../../config/plugins");
// const promptOptions = require("../../providers/prompt-options");

// const { getKey } = require('./back')

module.exports = (win, options) => [
    // {
    //     label: "Set API key",
    //     click: () => setKey(win, options),
    // },
    {
        label: "Auto reconnect",
        type: "checkbox",
        checked: false,
        click: (item) => {
            options.autoReconnect = item.checked;
            setMenuOptions('api', options);
        }
    }
];

// async function setKey(win, options) {
    // let output = await prompt({
    //     title: 'Set API key',
    //     label: 'Enter new API key:',
    //     value: getKey(options),
    //     type: "input",
    //     width: 450,
    //     ...promptOptions()
    // }, win)

    // if (output) {
    //     options.key = output;
    //     setMenuOptions("api", options);
    // }
// }