import {
  CreateLoginDto,
  CreateLogoutDto,
  CreateRegisterDto,
  LoginResponse,
  LogoutResponse,
  RegisterResponse,
} from "@/types/Auth.types";
import api from "@/utils/axiosCustomize";

const LOGIN_URL = "login";
const REGISTER_URL = "register";
const LOGOUT_URL = "logout";

const postLogin = async (loginInfo: CreateLoginDto): Promise<LoginResponse> => {
  try {
    const { data } = await api.post(LOGIN_URL, loginInfo);
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.detail || "Failed to log in";
    console.log(">>> Error logging in:", errorMessage);
    throw new Error(errorMessage);
  }
};

const postRegister = async (
  registerInfo: CreateRegisterDto,
): Promise<RegisterResponse> => {
  try {
    const { data } = await api.post(REGISTER_URL, registerInfo);
    return data;
  } catch (error) {
    console.error(">>> Error registering:", error);
    throw new Error(">>> Failed to register");
  }
};

const postLogout = async (
  logoutInfo: CreateLogoutDto,
): Promise<LogoutResponse> => {
  try {
    const { data } = await api.post(LOGOUT_URL, logoutInfo);
    return data;
  } catch (error) {
    console.error(">>> Error logging out:", error);
    throw new Error(">>> Failed to log out");
  }
};

export { postLogin, postLogout, postRegister };
