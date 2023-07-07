"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateException = void 0;
const class_validator_1 = require("class-validator");
class ValidateException {
    async onValidate(body, res, next) {
        const errors = await (0, class_validator_1.validate)(body);
        if (errors.length > 0) {
            return res.status(400).json({ data: errors.map(i => i.constraints) });
        }
        return;
    }
}
exports.ValidateException = ValidateException;
