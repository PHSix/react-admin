import type { Context } from "koa";
import jwt from "jsonwebtoken";
import { adminIsExist, isSuperAdmin } from "../service/adminService";
import { SECRET_WORD } from "../utils/encryp";

const getToken = async function (name: string, password: string) {
	const isSuper = await isSuperAdmin(name, password);
	return jwt.sign({ isSuper }, SECRET_WORD, { expiresIn: "2h" });
};


/**
 * 登录处理的Controller
 * @param ctx 
 * @returns 
 */
export const Login = async function (ctx: Context) {
	const bodyFields = Object.keys(ctx.request.body);
	if (
		bodyFields.length !== 2 ||
		!bodyFields.includes("name") ||
		!bodyFields.includes("password")
	) {
		ctx.status = 422;
		return;
	}
	const name = ctx.request.body.name;
	const password = ctx.request.body.password;
	const isExist = await adminIsExist(password, name);
	if (isExist) {
		ctx.status = 200;
		ctx.body = { token: await getToken(name, password) };
	} else {
		ctx.status = 400;
	}
};
