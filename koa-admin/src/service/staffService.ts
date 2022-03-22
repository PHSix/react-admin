/**
 * TODO: 函数装饰器简化代码内容
 */

import { Staff } from "../entity/staff";
import { getManager, EntityManager, Repository } from "typeorm";

let tm: EntityManager;
let rs: Repository<Staff>;

setTimeout(()=> {
	tm = getManager();
	rs = tm.getRepository(Staff);
}, 1000)
const initial = function () {
	if (!rs) {
		tm = getManager();
		rs = tm.getRepository(Staff);
	}
};

/**
 * 查找出所有的员工信息
 * @returns 关于所有员工信息的一个数组
 */
export const getAllStaffs = async function (): Promise<Staff[]> {
	initial();
	const all = await rs.find();
	return all;
};

/**
 * 创建员工并且添加到staff表中
 */
export const createStaff = async function (staff: Staff): Promise<void> {
	initial();
	rs.save(staff);
};

/**
 * 查询单个员工是否存在
 * @param staff 员工信息
 * @returns 存在返回true,不存在返回false
 */
export const staffExist = async function (staff: Staff): Promise<boolean> {
	initial();
	const queryRes = await rs.findOne(staff);
	if (queryRes) return true;
	else return false;
};

/**
 * 通过员工id判断员工是否存在
 * @param id 员工id
 * @returns
 */
export const staffExistById = async function (id: number): Promise<boolean> {
	initial();
	const res = await rs.findOne({
		id,
	});
	if (res) return true;
	return false;
};

/**
 * 删除员工
 * @param staff 员工信息
 */
export const dropStaffById = async function (id: number) {
	initial();
	await rs.delete({ id });
};

/**
 * 更新员工信息
 * @param id 员工的id
 * @param staff 员工信息
 */
export const alterStaff = async function (id: number, staff: Staff) {
	initial();
	await rs.update({ id }, staff);
};

/**
 * 获取当前数据库里面所有员工的数量
 * @returns 所有员工的数量
 */
export const countStaffs = async function () {
	const res = await getAllStaffs();
	return res.length;
};

/**
 * 获取已经到达的所有员工的数量
 * @returns 
 */
export const countStaffsHasClock = async function () {
	const res = await getAllStaffs();
	return res.filter((item) => {
		return item.isClock;
	}).length;
};
