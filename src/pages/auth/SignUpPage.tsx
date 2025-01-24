import Box from "@mui/material/Box";
import SignUp from "@app-components/auth/SignUp";
import { parseErrors } from "@app-utils/errorParsers";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import * as React from "react";
import {apiBaseUrl} from "@app-settings";
import {rootRoutePrefixes} from "@app-consts/routePrefixes";
import routeNames from "@app-consts/routeNames.ts";
import {Alert} from "@mui/material";


export default function SignUpPage() {
    const [formErrors, setFormErrors] = React.useState<Record<string, string[]>>({});

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const requestBody: Record<string, string> = {
            email: formData.get("email") as string,
            first_name: formData.get("firstName") as string,
            last_name: formData.get("lastName") as string,
            password1: formData.get("password1") as string,
            password2: formData.get("password2") as string,
        }

        try {
            const response = await axios.post(
                `${apiBaseUrl}/api/v1/users/signup`,
                requestBody,
            );
            if (response.status === 201) {
                navigate(
                    `/${rootRoutePrefixes.auth}/${routeNames.signIn}`,
                    {state: {message: "Sign Up completed successfully, now you can log in using your credentials."}},
                );
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response!.status >= 400 && error.response!.status < 500) {
                    setFormErrors(parseErrors(error.response!.data.detail));
                } else {
                    setFormErrors({"other": ["Something went wrong"]});
                }
            } else {
                setFormErrors({"other": ["Something went wrong"]});
            }
        }
    }

    useEffect(() => {
        document.title = "Sign Up for the Shortly"; // Set the page title
    }, []); // Empty dependency array to run only once

    console.log(formErrors)

    return (
        <Box
            className="MainBox"
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box>
                {formErrors?.other && (
                    <Alert severity="error">
                        {formErrors.other}
                    </Alert>
                )}
                <SignUp formErrors={formErrors} handleSubmit={handleSubmit} />
            </Box>
        </Box>
    );
}