import {Route, Routes} from "react-router";
import PrivateRoute from "@app-components/common/react-router/PrivateRoute.tsx";
import CreateQRCodePage from "@app-pages/qrCodes/CreateQRCodePage.tsx";
import {CreateQRCodeForExistingLinkPage} from "@app-pages/qrCodes/CreateQRCodeForExistingLinkPage.tsx";
import {AxiosInstance} from "axios";
import QRCodeListPage from "@app-pages/qrCodes/QRCodeListPage.tsx";
import UpdateQRCodeCustomizationPage from "@app-pages/qrCodes/UpdateQRCodeCustomizationPage.tsx";
import UpdateQRCodeContentPage from "@app-pages/qrCodes/UpdateQRCodeContentPage.tsx";
import QRCodeDetailsPage from "@app-pages/qrCodes/QRCodeDetailsPage.tsx";


export default function QRCodeRoutes({api}: { api: AxiosInstance }) {
    return (
        <Routes>
            <Route path="" element={
                <PrivateRoute>
                    <QRCodeListPage api={api} />
                </PrivateRoute>
            } />
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

            <Route path="/:qrCodeId/details" element={
                <PrivateRoute>
                    <QRCodeDetailsPage api={api} />
                </PrivateRoute>
            } />

            <Route path="/:qrCodeId/edit/customize" element={
                <PrivateRoute>
                    <UpdateQRCodeCustomizationPage api={api} />
                </PrivateRoute>
            } />
            <Route path="/:qrCodeId/edit/content" element={
                <PrivateRoute>
                    <UpdateQRCodeContentPage api={api} />
                </PrivateRoute>
            } />
        </Routes>
    );
}