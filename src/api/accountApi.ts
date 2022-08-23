import axios from "axios";

const accountApi = {
    login: async ({ login, password }: {
        login: string,
        password: string
    }): Promise<{
        type: string,
        token: string
    }> => {

        const body = {
            login: login,
            password: password
        };

        const config = {
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
            }
        }

        return axios.post(`http://localhost:3000/api/account/login`, body, config)
            .then(response => response.data)
            .catch(error => null);

    },
    register: async (params: {
        login: string,
        password: string,
        confirmPassword: string
    }) => {
        const body = {
            login: params['login'],
            password: params['password'],
            confirmPassword: params['confirmPassword'],
        };

        const config = {
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
            }
        }

        return axios.post(`http://localhost:3000/api/account/register`, body, config)
            .then(response => response.data)
            .catch(error => null);
    },
    info: async (token: string | null) => {
        const config = {
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${token}`,
            }
        }

        return axios.get(`http://localhost:3000/api/account/info`, config)
            .then(response => response.data)
            .catch(error => null);
    },
}


export default accountApi;