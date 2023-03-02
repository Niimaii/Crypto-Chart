const { validationResult } = require('express-validator');

exports.validationMiddleware = (req, res, next) => {
  // This is equal to the validation result from authValidation
  let errors = validationResult(req);

  //   if an error exists then return an error
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  //   Since this is a middleware, we have to tell it to move on to the next middleware
  next();
};
