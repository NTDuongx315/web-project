import * as db from "../fake-db";

// Make calls to your db from this file!
async function getPosts(n = 5, sub = undefined) {
  return db.getPosts(n, sub);
}

async function getPost(id: number) {
  return db.getPost(id);
}

async function createPost(title: any, link: any, creator: any, description: any, subgroup: any) {
  return db.addPost(title, link, creator, description, subgroup);
}

async function updatePost(postid: any, changes: any) {
  return db.editPost(postid, changes);
}

async function removePost(postid: any) {
  return db.deletePost(postid);
}

async function createComment(postid: any, creator: any, description: any) {
  return db.addComment(postid, creator, description);
}

async function getSubs() {
  return db.getSubs();
}

export {
  getPosts,
  getPost,
  createPost,
  updatePost,
  removePost,
  createComment,
  getSubs
};