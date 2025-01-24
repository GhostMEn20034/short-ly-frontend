import {createRoot} from 'react-dom/client';
import {BrowserRouter} from "react-router";
import {AuthProvider} from "./context/AuthContext.tsx";
import App from './App.tsx';
import {StrictMode} from "react";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>,
);
