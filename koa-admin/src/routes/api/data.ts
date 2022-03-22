import {
	totalAdmins,
	totalClock,
	totolStaffs,
} from "../../controller/dataController";
import Router from "koa-router";

const router = new Router();
router.get("/staffs", totolStaffs);
router.get("/admins", totalAdmins);
router.get("/clocked", totalClock);
export const DataRouter = router;
export default DataRouter;
