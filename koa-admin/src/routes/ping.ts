import {Ping} from '../controller/pingController'
import Router from 'koa-router';

const route = new Router();

route.get("/ping", Ping);

export const PingRoute = route