"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putLogs = exports.errHandler = void 0;
const configs_1 = require("../configs");
const errHandler = (err, req, res, next) => {
    let error = { ...err };
    if (err.statusCode === 400) {
        error.statusCode = 400;
        error.message = err.message;
        (0, exports.putLogs)(req, err.statusCode, err.message);
    }
    if (err.statusCode === 401) {
        error.statusCode = 401;
        error.message = err.message;
        (0, exports.putLogs)(req, err.statusCode, err.message);
    }
    if (err.statusCode === 403) {
        error.statusCode = 403;
        error.message = err.message;
        (0, exports.putLogs)(req, err.statusCode, err.message);
    }
    if (err.statusCode === 404) {
        error.statusCode = 404;
        error.message = err.message;
        (0, exports.putLogs)(req, err.statusCode, err.message);
    }
    if (err.statusCode === 502) {
        error.statusCode = 502;
        error.message = err.message;
        (0, exports.putLogs)(req, err.statusCode, err.message);
    }
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Server Error';
    res.status(statusCode).json({
        statusCode,
        message
    });
    if (statusCode === 500) {
        (0, exports.putLogs)(req, 500, 'Server Error');
    }
};
exports.errHandler = errHandler;
const putLogs = (req, statusCode, message) => {
    const { client } = (0, configs_1.discordBotConfig)();
    const exampleEmbed = {
        color: statusCode === 500 ? 0xFF0000 : 0xFFFF00,
        title: message,
        url: 'https://discord.js.org/',
        author: {
            name: req.headers["user-agent"] || 'NONAME'
        },
        description: 'Some description here',
        fields: [
            { name: 'Host', value: req.headers.host || '' },
            { name: 'Header referer', value: req.headers.referer || '' },
            { name: 'Path', value: req.url },
            { name: 'Method', value: req.method },
            { name: 'Body', value: req.body ? JSON.stringify(req.body) : 'NO BODY' },
        ],
        footer: { text: 'By Swatcat BOT', icon_url: 'https://i.imgur.com/mliFXKq.jpg' }
    };
    client.api.channels.createMessage(process.env.DISCORD_CHANEL_ID_LOG || '', {
        content: `STATUS CODE: ${statusCode}`,
        embeds: [exampleEmbed]
    });
};
exports.putLogs = putLogs;
