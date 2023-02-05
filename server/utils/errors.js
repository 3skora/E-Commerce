export const raiseValidationError = (error) => {
  console.log("Validation Error !!");
  const customError = new Error(error.details[0].message.replaceAll('"', ""));
  customError.statusCode = 422;
  throw customError;
};

export const passError = (error, next) => {
  console.log("passError !!");
  console.log("🚀 ~ file: errors.js:10 ~ passError ~ error", error);
  if (!error.statusCode) {
    error.statusCode = 500;
    error.message = "Something went wrong please try again!";
  }
  next(error);
};

export const notFoundError = (obj, name, type = "id") => {
  if (!obj) {
    console.log("notFoundError !!");
    const error = new Error(`No ${name} was found with that ${type}!`);
    error.statusCode = 404;
    throw error;
  }
};

export const alreadyExistsError = (model, unique = "id") => {
  console.log("alreadyExistsError !!");
  const error = new Error(
    `${model} ${unique} already exists please try another ${unique}!`
  );
  error.statusCode = 422;
  throw error;
};

export const errorMiddlerWare = (error, _req, res, _next) => {
  console.log("errorMiddlerWare !!");
  if (error.statusCode) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }
  return res.status(500).json({
    success: false,
    message: "Something went wrong please try again!",
  });
};
