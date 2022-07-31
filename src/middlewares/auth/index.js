import jwt from "jsonwebtoken";
import Db from "../../db/index.js";

export function authMiddleware(rq, rsp, next) {
  const { authorization } = rq.headers;
  try {
    const token = authorization.split(" ")[1];
    const jwtSecretKey = process.env.JWT_SECRET_KEY || "";
    const decodedToken = jwt.verify(token, jwtSecretKey);
    rq.tokenData = decodedToken;
  } catch (err) {
    return rsp.status(406).json({
      meta: {
        error: {
          message: "Verification failed",
          code: 4060
        }
      },
      data: {}
    });
  }
  next();
}

export function authSocketMiddleware(socket, next) {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET_KEY, async function (err, decoded) {
      if (err) throw new Error("Authentication error");
      else {
        const [admin] = await Db.auth.login({ id: decoded.uid });
        socket.adminInfo = admin;
        next();
      }
    });
  } else {
    throw new Error("Authentication error");
  }
}

export function forUsersSocketMiddleware(socket, next) {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET_KEY, async function (err, decoded) {
      if (err) throw new Error("Authentication error");
      console.log(decoded);
      next();
    });
  } else {
    throw new Error("Authentication error");
  }
}
