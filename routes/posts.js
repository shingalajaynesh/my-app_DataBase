import express from "express";
import auth from "../middleware/auth.js";
import { v4 as uuidv4 } from "uuid";
import {
  addComment,
  addLike,
  deleteComment,
  getCommentsByPostID,
  getPostLikeByID,
  getPostOwner,
  getUserPostLikeByID,
  removeLike,
} from "../models/post.js";
const route = express.Router();

route.get("/posts", auth, async ({ db }, res) => {
  const [posts] = await db.query(
    "SELECT p.id as post_id,users.id as user_id,fname,lname,title,description,post_Photo_id,p.created_at, (select count(id) as count from likes where post_id=p.id) as count FROM posts p LEFT JOIN users ON users.id=p.user_id",
  );
  return res.json({
    posts,
    status: true,
    message: "This is Working",
  });
});

route.post("/post_like", auth, async ({ db, body, user, app }, res) => {
  let isPostLike = 0;

  if (body && body.post_id) {
    const [postLike] = await getUserPostLikeByID(db, body.post_id, user.id);
    console.log("postlike", postLike);

    if (postLike && postLike.id) {
      isPostLike = 1;
      const removePostLike = await removeLike(db, postLike.id);
      console.log("removePostLike", removePostLike);

      res.send({
        count: 0,
        message: "Dislike",
      });
    } else {
      isPostLike = 2;
      const addPostLike = await addLike(db, body, user);
      console.log("addPostLike", addPostLike);
      res.send({
        count: 1,
        message: "Like",
      });
    }
  }
  if (isPostLike > 0) {
    const wss = app.get("wss");
    const clients = app.get("clients");
    const [postCount] = await getPostLikeByID(db, body.post_id);
    wss.clients.forEach((c) => {
      console.log(c);
      c.send(
        JSON.stringify({
          topic: "POST_LIKE",
          data: {
            postid: body.post_id,
            count: postCount.count,
          },
        }),
      );
    });
    const [postUser] = await getPostOwner(db, body.post_id);
    const clientWs = clients.get(postUser.user_id);
    console.log("clientWs", postUser.user_id);
    if (clientWs && clientWs.readyState === 1) {
      clientWs.send(
        JSON.stringify({
          topic: "POST_LIKE_OWNER",
          data: {
            postId: body.post_id,
          },
        }),
      );
    }
  }
});

route.post("/add_comment", auth, async ({ db, body, user }, res) => {
  if (!body.post_id || !body.comment) {
    return res.send({
      status: false,
      message: "post_id and comment required",
    });
  }

  await addComment(db, body, user);

  return res.send({
    status: true,
    message: "Comment Added",
  });
});

route.get("/comments/:postId", auth, async ({ db, params }, res) => {
  const comments = await getCommentsByPostID(db, params.postId);

  return res.send({
    status: true,
    comments,
  });
});
route.delete("/delete_comment/:id", auth, async ({ db, params }, res) => {
  await deleteComment(db, params.id);

  return res.send({
    status: true,
    message: "Comment Deleted",
  });
});

export default route;
