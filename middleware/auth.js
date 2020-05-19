// Its a function that has access to request and response cycle and object every time after hitting a endpoint wew will fire this function to check if there is jwt present

const jwt = require("jsonwebtoken");
const config = require("config");

// in every middleware function we have next parameter after doing our work we have to call next to move on to next middleware
module.exports = function (req, res, next) {
  //get token from header
  const token = req.header("x-auth-token"); //key to token inside header

  //Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization Denied" }); //401=Unauthorize
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    //we have set it to req.user so that we can have access to it inside route
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
