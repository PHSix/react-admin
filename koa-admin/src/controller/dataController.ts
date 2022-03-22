import type { Context } from "koa";
import { countAdmins } from "../service/adminService";
import { countStaffs, countStaffsHasClock } from "../service/staffService";
export const totolStaffs = async function (ctx: Context) {
	ctx.status = 200;
	const len = await countStaffs();
	ctx.body = {
		count: len,
	};
};

export const totalAdmins = async function (ctx: Context) {
	ctx.status = 200;
	const len = await countAdmins();
	ctx.body = {
		count: len,
	};
};

export const totalClock = async function (ctx: Context) {
	ctx.status = 200;
	const len = await countStaffsHasClock();
	ctx.body = {
		count: len,
	};
};
