import Joi from "joi";

export const userValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().min(2),
    lastName: Joi.string().required().min(2),
    email: Joi.string().required().email(),
    password: Joi.string().alphanum().required().min(8),
    isAdmin: Joi.boolean().default(false),
  });

  return schema.validate(data);
};
