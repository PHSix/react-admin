import { Context } from "koa";
import { Staff } from "../entity/staff";
import {
	alterStaff,
	createStaff,
	dropStaffById,
	getAllStaffs,
	staffExist,
	staffExistById,
} from "../service/staffService";

/**
 * 从请求体构建员工对象
 * @param body 请求体
 * @returns 构建出来的员工对象
 */
const staffFromBody = function (body: any) {
	const staff = new Staff();
	staff.firstName = body.firstName;
	staff.secondName = body.secondName;
	staff.address = body.address;
	staff.email = body.email;
	staff.isClock = true;
	return staff;
};

/**
 * 判断输入的body携带的是否是合格有效的员工信息。
 * TODO: 添加类型检查，增加代码的健壮性
 * @param body request携带的请求体
 * @returns 有效返回true,无效返回false
 */
const vaildStaff = function (body: any): boolean {
	if (
		!body.firstName ||
		!body.secondName ||
		!body.email ||
		!body.address )
		return false;
	const staff: Staff = body;
	if (staff.firstName.length < 1 || staff.secondName.length < 1) return false;
	if (!staff.email.match("@.+.com")) return false;
	return true;
};

/**
 * 查询所有的员工信息
 * @param ctx
 */
export const queryStaffs = async function (ctx: Context) {
	const staffs = await getAllStaffs();
	ctx.status = 200;
	ctx.body = {
		staffs,
	};
};

/**
 * 添加员工
 * 当请求体非法时，拒绝请求
 * 正确时，返回200的状态码
 * @param ctx Context
 */
export const appendStaff = async function (ctx: Context) {
	if (!ctx.request.body) {
		ctx.status = 400;
		ctx.body = {
			msg: "failed with not have body request.",
		};
		return;
	}
	const isVaild = vaildStaff(ctx.request.body);
	if (isVaild == false) {
		ctx.status = 400;
		ctx.body = {
			msg: "invalid parameter request.",
		};
		return;
	}

	const isExist = await staffExist(ctx.request.body);
	if (isExist) {
		ctx.status = 418;
		ctx.body = {
			msg: "staff has exist.",
		};
		return;
	}
	const staff = staffFromBody(ctx.request.body);
	createStaff(staff);
	// 成功添加
	ctx.status = 201;
};

/**
 * 删除员工
 * 注意request的param里面id一定是一个string类型
 * @param ctx
 */
export const deleteStaff = async function (ctx: Context) {
	const queries = [];
	for (let key in ctx.request.query) {
		queries.push(key);
	}
	if (
		queries.length == 0 ||
		!queries.findIndex((key) => {
			return key === "id" && typeof ctx.request.query[key] != "string";
		})
	) {
		ctx.status = 400;
		ctx.body = {
			msg: "invaild request, has none id param in request.",
		};
		return;
	}
	const id = parseInt(ctx.request.query["id"] as string);
	if (id === NaN) {
		ctx.status = 400;
		ctx.body = {
			msg: "type of param error.",
		};
		return;
	}
	const isExist = await staffExistById(id);
	if (!isExist) {
		ctx.status = 418;
		ctx.body = {
			msg: "staff do not exist.",
		};
		return;
	}
	await dropStaffById(id);
	ctx.status = 200;
	ctx.body = {
		msg: "have delete staff.",
	};
};

/**
 * 更新员工信息
 * @param ctx
 */
export const updateStaff = async function (ctx: Context) {
	if (!ctx.request.body) {
		ctx.status = 400;
		ctx.body = {
			msg: "failed with not have body request.",
		};
		return;
	}
	const isVaild = vaildStaff(ctx.request.body);
	if (isVaild == false) {
		ctx.status = 422;
		ctx.body = {
			msg: "invalid parameter request.",
		};
		return;
	}

	const isExist = await staffExistById(ctx.request.body.id);
	if (!isExist) {
		ctx.status = 418;
		ctx.body = {
			msg: "staff have not exist.",
		};
		return;
	}
	const staff = staffFromBody(ctx.request.body);
	alterStaff(ctx.request.body.id, staff);
	ctx.status = 200;
	ctx.body = {
		msg: "sucessful update staff message and store.",
	};
};

export default {
	query: queryStaffs,
	append: appendStaff,
	delete: deleteStaff,
	alter: updateStaff,
};
