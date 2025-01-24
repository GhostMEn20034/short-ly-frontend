import * as React from "react";
import Box from "@mui/material/Box";
import SignIn from "@app-components/auth/SignIn.tsx";
import AuthContext, {AuthContextType} from "@app-context/AuthContext.tsx";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {Alert} from "@mui/material";
import routeNames from "@app-consts/routeNames.ts";



export default function SignInPage() {
    const { error, setError, loginUser } = React.useContext(AuthContext) as AuthContextType;

    const {state} = useLocation()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_emailError, setEmailError] = React.useState<boolean>(false); // TODO: Improve this line in the future


    // Group states into objects
    const emailState = {
        error: Boolean(error),
        setError: setEmailError,
        message: error,
        setMessage: setError,
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email: string = data.get("email") as string;
        const password: string = data.get("password") as string;
        loginUser(email, password, {nextDestination: `/${routeNames.home}`})
    };

    useEffect(() => {
        document.title = "Log In to the Shortly";
    }, []);

    return (
        <Box className="MainBox" sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>

            <Box>
                {state?.message && (
                    <Alert severity="success">
                        {state.message}
                    </Alert>
                )}
                <SignIn
                    emailState={emailState}
                    handleSubmit={handleSubmit}
                />
            </Box>
        </Box>
    );
}