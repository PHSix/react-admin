import Router from "koa-router";
import { AdminRouter } from "./admin";
import { StaffRouter } from "./staff";
import { Login } from "../../controller/loginController";
import { DataRouter } from "./data";

const router = new Router();

router.post("/login", Login);
router.use("/total", DataRouter.routes());
router.use("/admin", AdminRouter.routes());
router.use("/staff", StaffRouter.routes());

export const ApiRouter = router;

export default ApiRouter;
