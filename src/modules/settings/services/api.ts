import { API_ENDPOINT, getData, postData } from "../../../utils/api";
import { LoginResponse, UserProfile } from "./dataTypes";

//#region Login
export const loginAPI = async (
  username: string,
  password: string
): Promise<LoginResponse | null> => {
  const url = `${API_ENDPOINT}/login/`;
  try {
    const res: any = await postData({ username, password }, url);
    return res;
  } catch (error: any) {
    console.log(`Error calling url ${url}`);
    console.log(error);
    throw error;
  }
};
//#endregion

//#region Get Users Profile
export const getUserProfilesAPI = (token: string): UserProfile | null => {
  const url = `${API_ENDPOINT}/users/profile/`;
  try {
    const res: any = getData(url, token);
    return res;
  } catch (error: any) {
    console.log(`Error while fetching codes : ${error}`);
  }

  return null;
};
//#endregion
