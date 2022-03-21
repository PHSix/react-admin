import { createConnection, getManager } from "typeorm";
import { Staff } from "./entity/staff";

createConnection()
	.then(() => {
		const tm = getManager();
		const rs = tm.getRepository(Staff);
	})
	.catch((error) => {
		console.log("connect mysql failed!");
		console.log("Error: " + error);
	});
