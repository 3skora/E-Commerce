import Joi from "joi";

export const addToCartValidation = (data) => {
  const schema = Joi.object({
    productId: Joi.required(),
    quantity: Joi.number(),
  });

  return schema.validate(data);
};
