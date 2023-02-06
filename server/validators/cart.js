import Joi from "joi";

export const cartValidation = (data) => {
  const schema = Joi.object({
    userId: Joi.required(),
  });

  return schema.validate(data);
};

export const addToCartValidation = (data) => {
  const schema = Joi.object({
    productId: Joi.required(),
    quantity: Joi.number(),
  });

  return schema.validate(data);
};
