import {Route, Routes} from 'react-router';

import routeNames from "@app-consts/routeNames.ts";
import SignInPage from "@app-pages/auth/SignInPage";
import SignUpPage from "@app-pages/auth/SignUpPage";
import {AxiosInstance} from "axios";

export default function AuthRoutes({api}: {api: AxiosInstance}) {

    return (
        <Routes>
            <Route path={`${routeNames.signIn}`} element={<SignInPage api={api} />} />
            <Route path={`${routeNames.signUp}`} element={<SignUpPage api={api} />} />
        </Routes>
    );
}