import Db from "../db/index.js";

export const adminMiddleware = type => async (rq, rsp, next) => {
  console.log(type);
  const [userData] = await Db.auth.login({ id: rq.tokenData.uid });
  if (userData?.type === type) next();
  else
    return rsp.status(406).json({
      meta: {
        error: {
          code: 4060,
          message: `This resource is accessible only for ${type}s`
        }
      },
      data: {}
    });
};
