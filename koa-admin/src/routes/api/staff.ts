import {
	queryStaffs,
	appendStaff,
	updateStaff,
	deleteStaff,
} from "../../controller/staffController";
import Router from "koa-router";

const router = new Router();

// 添加
router.post("/", appendStaff);
// 删除
router.delete("/", deleteStaff);
// 修改
router.put("/", updateStaff);
// 查询
router.get("/", queryStaffs);

export const StaffRouter = router;

export default StaffRouter;
