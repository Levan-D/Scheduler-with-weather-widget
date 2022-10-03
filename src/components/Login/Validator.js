const validFuncs = {
  isValidEmail: (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  },
  isValidName: (name) => {
    return /^[-'a-zA-ZÀ-ÖØ-öø-ſ]{3,64}$/u.test(name);
  },
  isValidPassword: (pass) => {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,64}$/.test(pass);
  },
};

export const { isValidEmail, isValidName, isValidPassword } = validFuncs;
