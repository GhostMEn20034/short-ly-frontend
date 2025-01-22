import {Route, Routes, useLocation} from 'react-router';
import AuthRoutes from "./routes/AuthRoutes.tsx";
import {rootRoutePrefixes} from "@app-consts/routePrefixes";
import {apiBaseUrl} from "@app-settings";
import useAxios from "@app-utils/useAxios.ts";
import NavigationBar from "@app-components/common/dashboard/NavigationBar.tsx";
import routeNames from "@app-consts/routeNames.ts";
import PrivateRoute from "@app-components/common/react-router/PrivateRoute.tsx";
import HomePage from "@app-pages/home/HomePage.tsx";

function App() {

    const location = useLocation();
    console.log(location.pathname);
    const api = useAxios(apiBaseUrl);

    return (
        <>
            <Routes>
                <Route path={`/${rootRoutePrefixes.auth}/*`} element={<AuthRoutes api={api}/>}/>
                <Route path="/" element={<NavigationBar />}>
                    <Route path={`/${routeNames.home}`} element={
                        <PrivateRoute>
                            <HomePage/>
                        </PrivateRoute>
                    }/>
                </Route>
            </Routes>
        </>
    );
}

export default App
