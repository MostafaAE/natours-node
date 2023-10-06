module.exports = fn => {
  return (req, res, next) => {
    // Catch errors and propagate them to the global error handling middleware
    fn(req, res, next).catch(next);
  };
};
