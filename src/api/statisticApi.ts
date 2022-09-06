import axios from "axios";
import axiosInstance from "./axios";

// axios interceptors

class StatisticApi {
    public async getGames(token: string | null, find?: string, page?: number, size?: number, sort?: string) {
        return axiosInstance.get(`/api/statistic/games?find=${find}&page=${page}&size=${size}&sort=${sort}`)
            .then(response => response.data)
            .catch(error => null);
    }

    public async getCommon(token: string | null, find?: string) {
        return axiosInstance.get(`/api/statistic/common?find=${find}`)
            .then(response => response.data)
            .catch(error => null);
    }
}


export default new StatisticApi();