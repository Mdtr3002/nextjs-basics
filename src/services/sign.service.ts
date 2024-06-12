import { baseUrl } from "@/constant";
import { SignInProps } from "@/types";
import axios from "axios";

const getSignMsg = () => axios.get(`${baseUrl}auth/sign`);

const signIn = (data: SignInProps) => axios.post(`${baseUrl}auth/sign_in`, data);

export const signMsgService = {
    getSignMsg,
    signIn,
};