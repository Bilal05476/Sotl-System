import asyncHandler from "express-async-handler";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  let api;
  // Check if user is authenticated
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      api = req.headers.authorization.split(" ")[1];

      if (api === process.env.APIKEY) {
        next();
      }
    } catch (err) {
      res.status(401).json({ message: "Invalid Api Key" });
    }
  }
  // If not authenticated, redirect to login page or return an error response
  res.status(401).json({ message: "Unauthorized Request" });
});
