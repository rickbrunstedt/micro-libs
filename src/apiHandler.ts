import type { NextApiHandler } from "next";

const apiHandler =
  <T = any>(cb: NextApiHandler<T>): NextApiHandler =>
  (req, res) => {
    return cb(req, res);
  };

export default apiHandler;
