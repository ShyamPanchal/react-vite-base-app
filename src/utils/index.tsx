import { User } from "../modules/settings/services/dataTypes";

export const getUserName = (user?: User): string => {
  if (user === undefined) {
    return "";
  }
  let name = user.first_name;
  if (name !== "") name += " ";
  name += user.last_name;
  if (name === "") {
    name = user.username;
  }
  return name;
};
