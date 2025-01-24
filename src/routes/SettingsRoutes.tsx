import {Route, Routes} from "react-router";
import routeNames from "@app-consts/routeNames.ts";
import PrivateRoute from "@app-components/common/react-router/PrivateRoute.tsx";
import ProfilePage from "@app-pages/settingsMenu/ProfilePage.tsx";
import {AxiosInstance} from "axios";

export default function SettingsRoutes({ api }: {api: AxiosInstance}) {
    return (
        <Routes>
            <Route path={`${routeNames.profile}`} element={
                <PrivateRoute>
                    <ProfilePage api={api} />
                </PrivateRoute>
            } />
        </Routes>
    )
}