import { futimesSync } from "fs";
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

export const addAdmin = async function (a: Admin) {
	initial();
	await rs.save(a);
};

export const alterAdmin = async function (id: number, a: Admin) {
	initial();
	await rs.update({ id }, a);
};

export const dropAdminById = async function (id: number) {
	initial();
	await rs.delete({ id });
};
