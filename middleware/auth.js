import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    // Token missing
    if (!authHeader) {
      return res.status(401).json({
        status: false,
        message: "Token Missing",
      });
    }
    // Extract token
    const token = authHeader.split(" ")[1];
    // Verify token
    const verifyUser = jwt.verify(token, "mySecretKey");
    // Store user in request
    req.user = verifyUser;

    next();
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: "Invalid or Expired Token",
    });
  }
};

export default auth;
