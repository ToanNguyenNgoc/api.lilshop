"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerJsDocOptions_1 = __importDefault(require("./swagger/swaggerJsDocOptions"));
const middlewares_1 = require("./middlewares");
const configs_1 = require("./configs");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
dotenv_1.default.config();
(0, configs_1.discordBotConfig)();
const PORT = process.env.POST || 4000;
const specs = (0, swagger_jsdoc_1.default)(swaggerJsDocOptions_1.default);
app_1.default.use((0, cors_1.default)({
    origin: ['https://api.fashional.pro', 'https://fashional.pro', 'http://localhost:4200'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    preflightContinue: true,
    credentials: true
}));
app_1.default.use((0, helmet_1.default)());
app_1.default.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
app_1.default.use(middlewares_1.errHandler);
app_1.default.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
