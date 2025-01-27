import {Route, Routes} from "react-router";
import PrivateRoute from "@app-components/common/react-router/PrivateRoute.tsx";
import LinkListPage from "@app-pages/link/LinkListPage.tsx";
import {AxiosInstance} from "axios";

export default function LinkRoutes({ api }: {api: AxiosInstance}) {
    return (
        <Routes>
            <Route path="" element={
                <PrivateRoute>
                    <LinkListPage api={api} />
                </PrivateRoute>
            }/>
        </Routes>
    );
}