import axios from "axios";

const statisticApi = {
    getGames: async (token: string | null, find?: string) => {
        const config = {
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${token}`,
            }
        }

        return axios.get(`http://localhost:3000/api/statistic/games?find=${find}`, config)
            .then(response => response.data)
            .catch(error => null);
    },
    getCommon: async (token: string | null, find?: string) => {
        const config = {
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${token}`,
            }
        }

        return axios.get(`http://localhost:3000/api/statistic/common?find=${find}`, config)
            .then(response => response.data)
            .catch(error => null);
    }
}


export default statisticApi;