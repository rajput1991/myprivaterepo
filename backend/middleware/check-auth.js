// we can use jsonwebtoken package to verify the token in incoming req.
const jwt = require('jsonwebtoken');
// export this , because we want to use this outside
// a MW is just a function
// which executes on in coming request
module.exports = (req, resp, next) => {
  try {
    console.log(req.headers);
    console.log(req.headers.Authorization);

    const token = req.headers.Authorization.split(" ")[1]; // wrap this in try catch because if no authorization header
    jwt.verify(token, 'secret_this_should_be_longer');
    // this string should be same which u used to create jwt
    next(); // now request will travel on
  }
  catch (error) {
    console.log(error);
    resp.status(401).json({
      message: 'Auth Failed here again in checkauth   '
  })
  };

}
