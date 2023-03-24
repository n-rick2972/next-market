import jwt from "jsonwebtoken";

const secret_key = "nextmarket";

const auth = (handler) => {
  return async (req, res) => {
    if (req.method === "GET") {
      return handler(req, res);
    }
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQG1vbm90ZWluLmNvbSIsImlhdCI6MTY3OTYzMzc5OSwiZXhwIjoxNjc5NzE2NTk5fQ.A1_i8hEdN7Fl-9t1pOIbtW_i6s5oorjaqf6Z1PCdnQA";
    // const token = await req.handlers.authorization.split("")[1];
    if (!token) {
      return res.status(401).json({ message: "トークンがありません" });
    }
    try {
      const decoded = jwt.verify(token, secret_key);
      req.body.email = decoded.email;
      return handler(req, res);
    } catch (err) {
      return res
        .status(401)
        .json({ message: "トークンが正しくないので、ログインしてください" });
    }
  };
};

export default auth;
