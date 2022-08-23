import { useContext, useState } from "react";
import { SocketContext } from "../App";

const useToken = (): [
    token: string | null,
    setTokenStorage: Function
] => {

    const socket = useContext(SocketContext);

    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem("token");
    });

    function setTokenStorage(token: string) {
        if (token) {
            localStorage.setItem("token", token);
            setToken(token);
            socket.emit("jwt", token);
        } else {
            localStorage.removeItem("token");
            setToken(null);
            socket.emit("jwt", null);
        }
    };

    return [token, setTokenStorage];
};

export default useToken;