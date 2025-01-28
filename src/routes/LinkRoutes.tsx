import {Route, Routes} from "react-router";
import PrivateRoute from "@app-components/common/react-router/PrivateRoute.tsx";
import LinkListPage from "@app-pages/link/LinkListPage.tsx";
import {AxiosInstance} from "axios";
import LinkDetailsPage from "@app-pages/link/LinkDetailsPage.tsx";
import EditLinkPage from "@app-pages/link/EditLinkPage.tsx";
import CreateLinkPage from "@app-pages/link/CreateLinkPage.tsx";

export default function LinkRoutes({ api }: {api: AxiosInstance}) {
    return (
        <Routes>
            <Route path="" element={
                <PrivateRoute>
                    <LinkListPage api={api} />
                </PrivateRoute>
            }/>
            <Route path="/:shortCode/details" element={
                <PrivateRoute>
                    <LinkDetailsPage api={api} />
                </PrivateRoute>
            } />
            <Route path="/:shortCode/edit" element={
                <PrivateRoute>
                    <EditLinkPage api={api} />
                </PrivateRoute>
            } />
            <Route path="/create" element={
                <PrivateRoute>
                    <CreateLinkPage api={api} />
                </PrivateRoute>
            }/>
        </Routes>
    );
}