const joi = require('@hapi/joi');


const registerUser = (data) => {
  const schema = joi.object({
    firstName: joi.string().trim().required(),
    lastName: joi.string().trim().required(),
    email: joi.string().trim().email().required(),
    password: joi.string().trim().min(6).required(),
    gender: joi.string().trim().required(),
    jobRole: joi.string().trim().required(),
    department: joi.string().required(),
    address: joi.string().required(),
    isAdmin: joi.boolean().required()
  });

  return schema.validate(data);
}

const userLogin = (data) => {
  const schema = joi.object({
    email: joi.string().trim().email().required(),
    password: joi.string().trim().min(6).required()
  });

  return schema.validate(data);
}


module.exports.registerUser = registerUser;
module.exports.userLogin = userLogin;