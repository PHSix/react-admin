import Koa from "koa";
import http from "http";
import { GlobalRouter } from "./routes/index";
import Logger from "koa-logger";
import moment from "moment";
import { Connection, createConnection } from "typeorm";
import koaBody from "koa-body";
import "reflect-metadata";
import { Staff } from "./entity/staff";
import { Admin } from "./entity/admin";
import { EncrypPassword } from "./utils/encryp";

const PORT = 8080;

/**
 * 初始化处理数据库
 * 当admin里面没有用户的时候添加超级管理员
 * @param connecnt ORM连接
 */
const initSql = async function (connecnt: Connection) {
	const adminRepository = connecnt.getRepository(Admin);
	const res = await adminRepository.find();
	if (res.length === 0) {
		const root = new Admin();
		root.isSuper = true;
		root.name = "root";
		root.password = EncrypPassword("admin");
		adminRepository.save(root);
	}
	const staffRepository = connecnt.getRepository(Staff);

	const staffs = await staffRepository.find();
	if (staffs.length === 0) {
		const xiaoming = new Staff();
		xiaoming.firstName = "李";
		xiaoming.secondName = "小明";
		xiaoming.firstName = "li";
		xiaoming.secondName = "xiaoming";
		xiaoming.email = "abc@qq.com";
		xiaoming.address = "China";
		xiaoming.isClock = false;
		staffRepository.save(xiaoming);
	}
};

/**
 * 启动服务器
 */
const start = function (connecnt: Connection) {
	initSql(connecnt);
	const app = new Koa();
	app.use(koaBody());
	app.use(
		Logger((logMsg) => {
			console.log(moment().format("YYYY-MM-DD HH:mm:ss") + logMsg);
		})
	);
	app.use(GlobalRouter.routes());
	app.use(GlobalRouter.allowedMethods());
	const server = http.createServer(app.callback());
	server.listen(PORT, () => {
		console.log("[start]: The http server has start on port '" + PORT + "'.");
	});
};

createConnection({
	type: "mariadb",
	host: "localhost",
	port: 3306,
	database: "react_admin",
	username: "root",
	password: "phsix",
	// synchronize: true,
	logging: true,
	entities: [Staff, Admin],
})
	.then(start)
	.catch((err: string) => {
		console.log(
			"[debug] Typeorm start failed! Please check your ormconfig.json file."
		);
		console.log("[debug] error:", err);
	});
