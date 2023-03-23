import jwt from "jsonwebtoken";

const secret_key = "nextmarket";

const auth = (handler) => {
  return async (req, res) => {
    if (req.method === "GET") {
      return handler(req, res);
    }
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZW1haWwub2NtIiwiaWF0IjoxNjc5NTU2MzE5LCJleHAiOjE2Nzk2MzkxMTl9.gNVuzTMVB3__rsbOuhfRVmn9g19jg1CYYTDwU4RVLeA";
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
