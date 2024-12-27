"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinType = exports.signupType = exports.updateBlogType = exports.blogPostType = void 0;
const zod_1 = __importDefault(require("zod"));
exports.blogPostType = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
});
exports.updateBlogType = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    id: zod_1.default.string(),
});
exports.signupType = zod_1.default.object({
    email: zod_1.default.string(),
    password: zod_1.default.string().min(8),
    name: zod_1.default.string().optional(),
});
exports.signinType = zod_1.default.object({
    email: zod_1.default.string(),
    password: zod_1.default.string().min(8),
});
