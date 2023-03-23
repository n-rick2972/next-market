import jwt from "jsonwebtoken";

const secret_key = "nextmarket";

const auth = (handler) => {
  return async (req, res) => {
    if (req.method === "GET") {
      return handler(req, res);
    }
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQG1vbm90ZWluLmNvbSIsImlhdCI6MTY3OTU1MzI4MCwiZXhwIjoxNjc5NjM2MDgwfQ.n8M7u1LTLHi_vLaDfFjYBjX8UTDuxi-p-zTb5Vgs28k";
    // const token = await req.handlers.authorization.split("")[1];
    if (!token) {
      return res.status(401).json({ message: "トークンがありません" });
    }
    try {
      const decoded = jwt.verify(token, secret_key);
      console.log(decoded);
      return handler(req, res);
    } catch (err) {
      return res
        .status(401)
        .json({ message: "トークンが正しくないので、ログインしてください" });
    }
  };
};

export default auth;
