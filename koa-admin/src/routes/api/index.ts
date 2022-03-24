import Router from "koa-router";
import { AdminRouter } from "./admin";
import { StaffRouter } from "./staff";
import { Login } from "../../controller/loginController";
import { DataRouter } from "./data";
import { isVaild } from "../../controller/vaildController";

const router = new Router();

router.post("/login", Login);
router.get("/login", isVaild);
router.use("/total", DataRouter.routes());
router.use("/admin", AdminRouter.routes());
router.use("/staff", StaffRouter.routes());

export const ApiRouter = router;

export default ApiRouter;
