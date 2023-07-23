"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorHelper = void 0;
const class_validator_1 = require("class-validator");
const exceptions_1 = require("../exceptions");
const validatorHelper = async (body) => {
    const errors = await (0, class_validator_1.validate)(body);
    if (errors.length > 0) {
        const constraints = errors.map(i => i.constraints?.isNotEmpty ||
            i.constraints?.isArray ||
            i.constraints?.isBoolean ||
            i.constraints?.isEmail).join(', ');
        throw new exceptions_1.ErrorException(400, constraints);
    }
};
exports.validatorHelper = validatorHelper;
