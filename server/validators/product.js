import Joi from "joi";

export const productValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required().min(2),
    description: Joi.string().required().min(2),
    category: Joi.string().required().min(2),
    price: Joi.number().required(),
    remainingQuantity: Joi.number().required(),
  });

  return schema.validate(data);
};
