import { queryAdmins, appendAdmin, updateAdmin, deleteAdmin } from "../../controller/adminController";
import Router from "koa-router";

const router = new Router();

// 添加
router.post("/", appendAdmin);
// 删除
router.delete("/", deleteAdmin);
// 修改
router.put("/", updateAdmin);
// 查询
router.get("/", queryAdmins);

export const AdminRouter = router;

export default AdminRouter;

