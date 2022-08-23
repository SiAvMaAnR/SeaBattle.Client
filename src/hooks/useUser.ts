import React, { useEffect, useState } from "react";
import accountApi from "../api/accountApi";

const useUser = (props: [
    token: string | null,
    isLogged: boolean,
    logout: Function
]): [
        user: object
    ] => {
    const [token, isLogged, logout] = props;
    const [user, setUser] = useState<any>({});

    useEffect(() => {
        if (isLogged) {
            accountApi
                .info(token)
                .then((response) => {
                    setUser(response.data.user);
                })
                .catch((error) => {
                    logout();
                });
        } else {
            setUser({});
        }
    }, [isLogged]);

    return [user];
};

export default useUser;