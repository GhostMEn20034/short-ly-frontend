import {Route, Routes, useLocation} from 'react-router';
import AuthRoutes from "./routes/AuthRoutes.tsx";
import SettingsRoutes from "./routes/SettingsRoutes.tsx";
import HomePage from "@app-pages/home/HomePage.tsx";
import {rootRoutePrefixes} from "@app-consts/routePrefixes";
import {apiBaseUrl} from "@app-settings";
import useAxios from "@app-utils/useAxios.ts";
import NavigationBar from "@app-components/common/dashboard/NavigationBar.tsx";
import routeNames from "@app-consts/routeNames.ts";
import PrivateRoute from "@app-components/common/react-router/PrivateRoute.tsx";

import {UserProvider} from "@app-context/UserContext.tsx";
import LinkRoutes from "./routes/LinkRoutes.tsx";

function App() {

    const location = useLocation();
    const api = useAxios(apiBaseUrl);

    return (
        <>
            <UserProvider api={api}>
                <Routes>
                    <Route path={`/${rootRoutePrefixes.auth}/*`} element={<AuthRoutes />}/>
                    <Route path="/" element={<NavigationBar pathname={location.pathname}/>}>
                        <Route path={`/${routeNames.home}`} element={
                            <PrivateRoute>
                                <HomePage/>
                            </PrivateRoute>
                        }/>
                        <Route path={`/${rootRoutePrefixes.settings}/*`} element={
                            <SettingsRoutes api={api} />
                        } />

                        <Route path={`/${rootRoutePrefixes.links}/*`} element={
                            <LinkRoutes api={api} />
                        }/>
                    </Route>
                </Routes>
            </UserProvider>
        </>
    );
}

export default App
