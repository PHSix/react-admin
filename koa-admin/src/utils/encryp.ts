import md5 from "md5";

export const EncrypPassword = function(password: string) {
  return md5(password);
}

export const SECRET_WORD = "secret"

export default EncrypPassword;