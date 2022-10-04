const errorHandling = (localCode) => {
  switch (localCode) {
    case "INVALID_BODY":
      return "Invalid data";
    case "INVALID_VALIDATION":
      return "Invalid validation";
    case "INVALID_CREDENTIALS":
      return "Incorrect password or email";
    case "AUTH_EMAIL_NOT_FOUND":
      return "Incorrect email";
    default:
      return "Unknown Error (idk ask mods)";
  }
};

export default errorHandling;
