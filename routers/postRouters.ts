// @ts-nocheck
import express from "express";
import * as database from "../controller/postController";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";

router.get("/", async (req, res) => {
  const posts = await database.getPosts(20);
  const user = await req.user;
  res.render("posts", { posts, user });
});

router.get("/create", ensureAuthenticated, (req, res) => {
  res.render("createPosts");
});

router.post("/create", ensureAuthenticated, async (req, res) => {
  const { title, link, description, subgroup } = req.body;

  if (!title || (!link && !description)) {
    return res.send("Invalid post");
  }

  const post = await database.createPost(
    title,
    link,
    req.user.id,
    description,
    subgroup
  );

  res.redirect(`/posts/show/${post.id}`);
});

router.get("/show/:postid", async (req, res) => {
  const post = await database.getPost(req.params.postid);

  res.render("individualPost", {
    post,
    user: req.user
  });
});

router.get("/edit/:postid", ensureAuthenticated, async (req, res) => {
  const post = await database.getPost(req.params.postid);

  if (post.creator.id !== req.user.id) {
    return res.send("Unauthorized");
  }

  res.render("editPost", { post });
});

router.post("/edit/:postid", ensureAuthenticated, async (req, res) => {
  const post = await database.getPost(req.params.postid);

  if (post.creator.id !== req.user.id) {
    return res.send("Unauthorized");
  }

  await database.updatePost(req.params.postid, {
    title: req.body.title,
    link: req.body.link,
    description: req.body.description
  });

  res.redirect(`/posts/show/${req.params.postid}`);
});

router.get("/deleteconfirm/:postid", ensureAuthenticated, async (req, res) => {
  const post = await database.getPost(req.params.postid);

  res.render("deletePost", { post });
});

router.post("/delete/:postid", ensureAuthenticated, async (req, res) => {
  const post = await database.getPost(req.params.postid);

  if (post.creator.id !== req.user.id) {
    return res.send("Unauthorized");
  }

  await database.removePost(req.params.postid);

  res.redirect(`/subs/show/${post.subgroup}`);
});

router.post(
  "/comment-create/:postid",
  ensureAuthenticated,
  async (req, res) => {
    await database.createComment(
    req.params.postid,
    req.user.id,
    req.body.description
  );

  res.redirect(`/posts/show/${req.params.postid}`);
  }
);

export default router;
