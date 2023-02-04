export const isLoggedIn = (req) => {
  if (!req.user) {
    throw req.authError;
  }
};

export const isAdmin = (req) => {
  if (!(req.user && req.user.isAdmin)) {
    const error = new Error("Logged in user must be admin!");
    error.statusCode = 403;
    throw error;
  }
};
export const raiseConfidentialError = (msg = "Wrong Email Or Password!") => {
  console.log("ConfidentialError !!");
  const error = new Error(msg);
  error.statusCode = 401;
  throw error;
};
