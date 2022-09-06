import axios from "axios";
import axiosInstance from "./axios";

class AccountApi {

    public async login({ login, password }: {
        login: string,
        password: string
    }): Promise<{
        type: string,
        token: string
    }> {

        const body = {
            login: login,
            password: password
        };


        return axiosInstance.post(`/api/account/login`, body)
            .then(response => response.data)
            .catch(error => null);
    }

    public async register(params: {
        login: string,
        password: string,
    }) {
        const body = {
            login: params['login'],
            password: params['password'],
        };

        return axiosInstance.post(`/api/account/register`, body)
            .then(response => response.data)
            .catch(error => null);
    }

    public async info(token: string | null) {

        return axiosInstance.get(`/api/account/info`)
            .then(response => response.data)
            .catch(error => null);
    }
}


export default new AccountApi();