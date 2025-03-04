import {Route, Routes} from "react-router";
import PrivateRoute from "@app-components/common/react-router/PrivateRoute.tsx";
import CreateQRCodePage from "@app-pages/qrCodes/CreateQRCodePage.tsx";
import {CreateQRCodeForExistingLinkPage} from "@app-pages/qrCodes/CreateQRCodeForExistingLinkPage.tsx";
import {AxiosInstance} from "axios";

export default function QRCodeRoutes({api}: { api: AxiosInstance }) {
    return (
        <Routes>
            <Route path="/create" element={
                <PrivateRoute>
                    <CreateQRCodePage api={api} />
                </PrivateRoute>
            } />

            <Route path="/create/:shortCode" element={
                <PrivateRoute>
                    <CreateQRCodeForExistingLinkPage api={api} />
                </PrivateRoute>
            } />
        </Routes>
    );
}