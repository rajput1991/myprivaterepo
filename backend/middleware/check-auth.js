// we can use jsonwebtoken package to verify the token in incoming req.
const jwt = require('jsonwebtoken');
// export this , because we want to use this outside
// a MW is just a function
// which executes on in coming request
module.exports = (req, resp, next) => {
  try {
    console.log('Authorization Header coming from frontend App---'+req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1]; // wrap this in try catch because if no authorization header
   const decodedToken= jwt.verify(token, 'secret_this_should_be_longer');
    // this string should be same which u used to create jwt
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    // so every next middleware will get this data on req. object

    next(); // now request will travel on
  }
  catch (error) {
    console.log(error);
    resp.status(401).json({
      message: 'Auth Failed here again in checkauth '
  })
  };

}
