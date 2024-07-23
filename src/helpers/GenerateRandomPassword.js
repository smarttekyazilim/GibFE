import { GetRandomNum } from "./HELPERS";

const Allowed = {
  Uppers: "QWERTYUIOPASDFGHJKLZXCVBNM",
  Lowers: "qwertyuiopasdfghjklzxcvbnm",
  Numbers: "1234567890",
  Symbols: "!@#$%^&*",
};

const getRandomCharFromString = (str) =>
  str.charAt(Math.floor(GetRandomNum() * str.length));

export const GenerateRandomPassword = (length = 10) => {
  let pwd = "";
  pwd += getRandomCharFromString(Allowed.Uppers); // pwd will have at least one upper
  pwd += getRandomCharFromString(Allowed.Lowers); // pwd will have at least one lower
  pwd += getRandomCharFromString(Allowed.Numbers); // pwd will have at least one number
  pwd += getRandomCharFromString(Allowed.Symbols); // pwd will have at least one symbol
  for (let i = pwd.length; i < length; i++)
    pwd += getRandomCharFromString(Object.values(Allowed).join("")); // fill the rest of the pwd with random characters

  var shuffled = pwd
    .split("")
    .sort(function () {
      return 0.5 - GetRandomNum();
    })
    .join("");

  return shuffled;
};
