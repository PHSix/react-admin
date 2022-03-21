/**
 * 测试接口
 */

import {Context} from 'koa'

export const Ping = function(ctx: Context) {
    ctx.status = 200;
    ctx.body = {
        msg: "pong"
    };
}