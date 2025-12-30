const errorMiddleware = (err, req, res, next) => {
  console.error("❌ Error:", err);
  const statuscode = err.statuscode || 500;
  const message = err.message || "something went wrong !";

  return res
    .status(statuscode)
    .json({ statuscode, message, success: false, errors: err.errors || [] });
};

export default errorMiddleware;
