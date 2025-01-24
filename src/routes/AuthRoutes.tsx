import {Route, Routes} from 'react-router';

import routeNames from "@app-consts/routeNames.ts";
import SignInPage from "@app-pages/auth/SignInPage";
import SignUpPage from "@app-pages/auth/SignUpPage";

export default function AuthRoutes() {

    return (
        <Routes>
            <Route path={`${routeNames.signIn}`} element={<SignInPage />} />
            <Route path={`${routeNames.signUp}`} element={<SignUpPage/>} />
        </Routes>
    );
}