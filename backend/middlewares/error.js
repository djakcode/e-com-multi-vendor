const createError = (status, message, details = null) => {
  if (typeof status !== "number" || !Number.isInteger(status)) {
    throw new Error(
      `Status code invalide: ${status}. Il doit etre un nombre entier.`
    );
  }

  const error = new Error(message);
  error.status = status;
  error.details = details;
  return error;
};

module.exports = createError;
