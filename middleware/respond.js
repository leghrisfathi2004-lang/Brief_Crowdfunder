const RES = (res, status, message, data = null) => {
  const msg = { success: status < 400, message };
  if (data !== null) msg.data = data;
  return res.status(status).json(msg);
};

module.exports = RES;