import Router from "koa-router";
import { AdminRouter } from "./admin";
import {StaffRouter} from './staff'
import {Login} from '../../controller/loginController'

const router = new Router();

router.post("/login", Login)
router.use("/admin", AdminRouter.routes())
router.use("/staff", StaffRouter.routes())

export const ApiRouter = router;

export default ApiRouter;
