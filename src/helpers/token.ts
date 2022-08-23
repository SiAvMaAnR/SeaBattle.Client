const tokenHelper = {

    getExpirationDate: (token: string | null): number => {
        try {
            if(!token){
                throw new Error();
            }
            let jwt = JSON.parse(atob(token.split('.')[1]));
            return (jwt && jwt.exp && jwt.exp * 1000) || 0;

        } catch (error) {
            return 0;
        }
    },

    isExpired: (lifeTime: number): boolean => {
        try {
            return (lifeTime) ? (Date.now() > lifeTime) : false;

        } catch (error) {
            return true;
        }
    },

    timeLeft: (lifeTime: number): number => {
        try {
            return lifeTime - Date.now();
        }
        catch (error) {
            return 0;
        }
    }
}

export default tokenHelper;