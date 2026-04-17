// const { ensureAuthenticated } = require("../middleware/checkAuth");
import express from "express";
import * as database from "../controller/postController";
const router = express.Router();

router.get("/list", async (req: Request, res: Response) => {
  const subs = await database.getSubs();

  res.render("subs", { subs });
});

router.get("/show/:subname", async (req: Request, res: Response) => {
  const posts = await database.getPosts(20, req.params.subname);

  res.render("sub", {
    posts,
    user: req.user,
    subname: req.params.subname
  });
});

export default router;
