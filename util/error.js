function errorHandler(err, req, res, next) {
  // Log error
  console.error(err.stack);

  res.status(err.status || 500).json({
    status: err.status || 500,
    error: err
  });
  next();
}

module.exports = errorHandler;
