import {ReactNode} from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext, {AuthContextType} from "@app-context/AuthContext.tsx";
import routeNames from "@app-consts/routeNames.ts";
import {rootRoutePrefixes} from "@app-consts/routePrefixes.ts";

function PrivateRoute({ children }: {children: ReactNode}) {
    const {user} = useContext(AuthContext) as AuthContextType;
    return user ? <>{children}</> : <Navigate to={`/${rootRoutePrefixes.auth}/${routeNames.signIn}`} />;
}

export default PrivateRoute;