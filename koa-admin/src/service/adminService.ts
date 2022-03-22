import type { Context } from "koa";
import { EntityManager, getManager, Repository } from "typeorm";
import { Admin } from "../entity/admin";

let tm: EntityManager;
let rs: Repository<Admin>;

const initial = function () {
	if (!tm) {
		tm = getManager();
		rs = tm.getRepository(Admin);
	}
};

/**
 * 查找管理员是否存在
 * @retrun 存在返回true
 */
export const adminIsExist = async function (
	password: string,
	name: string
): Promise<boolean> {
	initial();
	const res = await rs.find({ name, password });
	if (res.length === 0) {
		return false;
	} else {
		return true;
	}
};

/**
 * 判断管理员是否为超级管理员
 * @param name username
 * @param password password
 * @returns
 */
export const isSuperAdmin = async function (
	name: string,
	password: string
): Promise<boolean> {
	const res = await rs.findOne({ name, password });
	return res?.isSuper!;
};

/**
 * 查找所有管理员信息
 * @returns 所有管理员信息
 */
export const getAllAdmins = async function () {
	initial();
	const res = await rs.find();
	return res;
};

/**
 * 添加新的管理员
 * @param a 添加的管理员信息
 */
export const addAdmin = async function (a: Admin) {
	initial();
	await rs.save(a);
};

/**
 * 修改管理员处理函数
 * @param id 修改的管理员ID
 * @param a 新的管理员信息
 */
export const alterAdmin = async function (id: number, a: Admin) {
	initial();
	await rs.update({ id }, a);
};

/**
 * 删除管理员
 * @param id 删除管理员的ID
 */
export const dropAdminById = async function (id: number) {
	initial();
	await rs.delete({ id });
};

/**
 * 获取当前所有管理员的数量接口
 * @returns 所有管理员的数量
 */
export const countAdmins = async function () {
	initial();
	const res = await getAllAdmins();
	return res.length;
};

