import { Next } from "koa";
import { Context } from "vm";

export interface Fn {
	(ctx: Context, next?: Next): Promise<void> | void;
}
