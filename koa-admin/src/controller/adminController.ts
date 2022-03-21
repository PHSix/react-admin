import { Context } from "koa";
import {
	addAdmin,
	alterAdmin,
	dropAdminById,
	getAllAdmins,
} from "../service/adminService";
import jwt from "jsonwebtoken";
import { Admin } from "../entity/admin";

const isPermission = function (ctx: Context) {
	const { isSuper } = jwt.decode(
		ctx.request.header["authorization"]!.split(" ")[1]
	) as { isSuper: boolean };
	if (isSuper) {
		return true;
	} else {
		ctx.status = 401;
		return false;
	}
};

/**
 * 查询获取所有管理员信息
 * @param ctx
 */
export const queryAdmins = async function (ctx: Context) {
	const admins = await getAllAdmins();
	ctx.status = 200;
	ctx.body = {
		admins: admins.map((admin) => {
			return admin.filtePassword();
		}),
	};
};

/**
 * 添加管理员
 * @param ctx
 */
export const appendAdmin = async function (ctx: Context) {
	const isNext = isPermission(ctx);
	if (!isNext) return;
	const nr = new Admin();
	nr.isSuper = false;
	nr.name = ctx.request.body.name;
	nr.password = ctx.request.body.password;
	await addAdmin(nr);
	ctx.status = 201;
};

/**
 * 删除管理员
 * 注意超级管理员不可被删除
 * @param ctx
 */
export const deleteAdmin = async function (ctx: Context) {
	const isNext = isPermission(ctx);
	if (!isNext) return;
	await dropAdminById(ctx.request.body.id);
	ctx.status = 200;
};

/**
 * 更新管理员信息
 * @param ctx
 */
export const updateAdmin = async function (ctx: Context) {
	const isNext = isPermission(ctx);
	if (!isNext) return;
	const nr = new Admin();
	nr.isSuper = false;
	nr.name = ctx.request.body.name;
	nr.password = ctx.request.body.password;
	await alterAdmin(ctx.request.body.id, nr);
	ctx.status = 200;
};

export default {
	query: queryAdmins,
	append: appendAdmin,
	delete: deleteAdmin,
	alter: updateAdmin,
};
