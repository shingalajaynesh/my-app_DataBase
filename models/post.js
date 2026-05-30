import { v4 as uuidv4 } from "uuid";

export const getPostLikeByID = async (db, id) => {
  const [data] = await db.query(
    "SELECT COUNT(id) AS count FROM likes WHERE post_id=?",
    [id],
  );
  return data;
};

export const removeLike = async (db, id) => {
  return await db.query("DELETE from likes where id=? limit 1", [id], {
    return: true,
  });
};

export const addLike = async (db, body, user) => {
  return await db.query(
    "INSERT INTO likes values (?,?,?,?)",
    [uuidv4(), user.id, body.post_id, new Date()],
    { return: true },
  );
};
export const getUserPostLikeByID = async (db, postId, userId) => {
  const [data] = await db.query(
    "SELECT * FROM likes WHERE post_id=? and user_id = ?",
    [postId, userId],
    { return: true },
  );
  return data;
};

export const getPostOwner = async (db, post_id) => {
  const [data] = await db.query("select user_id from posts where id=?", [
    post_id,
  ]);
  return data;
};
export const addComment = async (db, body, user) => {
  a;

  return await db.query(
    `INSERT INTO comments 
        (id, user_id, post_id, comment, created_at, updated_at)
        VALUES (?,?,?,?,?,?)`,
    [uuidv4(), user.id, body.post_id, body.comment, new Date(), new Date()],
    { return: true },
  );
};

export const getCommentsByPostID = async (db, postId) => {
  const [data] = await db.query(
    `SELECT 
            comments.id,
            comments.comment,
            comments.created_at,
            users.id as user_id,
            users.fName,
            users.mName,
            users.lName
        FROM comments
        LEFT JOIN users 
        ON users.id = comments.user_id
        WHERE comments.post_id = ?
        ORDER BY comments.created_at DESC`,
    [postId],
  );

  return data;
};

export const deleteComment = async (db, id) => {
  return await db.query("DELETE FROM comments WHERE id=? LIMIT 1", [id], {
    return: true,
  });
};
