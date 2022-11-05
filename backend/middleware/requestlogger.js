const logger = async (req, res, next) => {
  console.log(`${req.method} ${req.url} ${new Date().toDateString()}`);
  next();
};
export default logger;
