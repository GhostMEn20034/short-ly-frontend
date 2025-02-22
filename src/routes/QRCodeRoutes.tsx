import {Route, Routes} from "react-router";
import PrivateRoute from "@app-components/common/react-router/PrivateRoute.tsx";
import CreateQRCodePage from "@app-pages/qrCodes/CreateQRCodePage.tsx";

export default function QRCodeRoutes() {
    return (
        <Routes>
            <Route path="/create" element={
                <PrivateRoute>
                    <CreateQRCodePage />
                </PrivateRoute>
            }/>
        </Routes>
    );
}