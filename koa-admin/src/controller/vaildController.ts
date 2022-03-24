import type {Context} from 'koa'

export const isVaild = async function(ctx: Context) {
  ctx.status = 200;
  ctx.body = {};
}