const info = (...text) => {
  console.log(new Date().toISOString() + " #INFO#", ...text);
  // console.log('Error here ======================>>>>>>>>> ' + " #INFO#", ...text)
};

const debug = (...text) => {
  if (process.env.LOGGER_DEBUG) {
    console.log(new Date().toISOString() + "#DEBUG#", ...text);
  }
};

const error = (...text) => {
  console.error(new Date().toISOString() + "#ERROR#", ...text);
};

module.exports = {
  info,
  debug,
  error,
};
