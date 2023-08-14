import store from "../store/store";
import { clearAll } from "../store/loginSlice";

export function logoutApp (redirectRoute: string, navigation: any)  {
        try {
            store.dispatch(clearAll());
            setTimeout(() => {
                navigation.reset({
                    index: 0,
                    routes: [{  name : redirectRoute }]
                });
            }, 100);
           
        } catch (error) {
            console.log("Logout error", error);
            throw error;
        }
};