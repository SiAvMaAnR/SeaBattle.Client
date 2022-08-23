import { useEffect, useState } from "react";
import tokenHelper from "../helpers/token";

type UseAuthResponse = [
    isLogged: boolean,
    login: (newToken: string) => void,
    logout: () => void
]

type UseAuthRequest = [
    token: string | null,
    setToken: (Function)
]

const useAuth = (props: UseAuthRequest): UseAuthResponse => {


    const [token, setToken] = props;
    const [isLogged, setIsLogged] = useState<boolean>(!!token);

    useEffect(() => {
        let exp = tokenHelper.getExpirationDate(token);

        const timeLeft = tokenHelper.timeLeft(exp);

        const verifyTokenTimeout = setTimeout(() => {
            logout();
        }, timeLeft);

        setIsLogged(!!token);

        return () => clearTimeout(verifyTokenTimeout);
    }, [token]);

    function login(newToken: string) {
        setToken(newToken);
    };

    function logout() {
        setToken(null);
    };

    return [isLogged, login, logout];
};

export default useAuth;