/**
 * 导出全局路由方案
 */

import Router from "koa-router";
import { PingRoute } from "./ping";
import { ApiRouter } from "./api/index";
import jwtKoa from 'koa-jwt'
import { SECRET_WORD } from "../utils/encryp";

const router = new Router();

router.use(jwtKoa({secret: SECRET_WORD}).unless({
  path: [
    /^\/api\/login/,
    /^\/api\/ping/,
  ]
}))
router.use(PingRoute.routes(), PingRoute.allowedMethods());
router.use("/api", ApiRouter.routes());

export const GlobalRouter = router;
