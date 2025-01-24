import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ChangeFullName from "@app-components/Settings/Profile/ChangeFullName.tsx";
import {useContext, useState} from "react";
import UserProvider, {UserContextType} from "@app-context/UserContext.tsx";
import ChangeEmail from "@app-components/Settings/Profile/ChangeEmail.tsx";
import ChangePassword from "@app-components/Settings/Profile/ChangePassword.tsx";
import axios, {AxiosInstance} from "axios";
import {parseErrors} from "@app-utils/errorParsers.ts";
import {Alert} from "@mui/material";
import {ChangePasswordForm} from "@app-types/profile.ts";
import AuthContext, {AuthContextType} from "@app-context/AuthContext.tsx";
import {rootRoutePrefixes} from "@app-consts/routePrefixes.ts";
import routeNames from "@app-consts/routeNames.ts";

export default function ProfilePage({api}: { api: AxiosInstance }) {
    const {userInfo, updateUserInfo} = useContext(UserProvider) as UserContextType;
    const [commonErrors, setCommonErrors] = useState<Record<string, string[]> | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const {logoutUser} = useContext(AuthContext) as AuthContextType;

    const updateFullName = async (
        firstName: string | null, lastName: string | null
    ): Promise<Record<string, string[]> | null> => {
        try {
            const response = await api.put(`/api/v1/users/update`, {
                first_name: firstName,
                last_name: lastName,
            });
            const data = await response.data;
            userInfo!["firstName"] = data.first_name;
            userInfo!["lastName"] = data.last_name;
            updateUserInfo(userInfo);
            setSuccessMessage("Full name updated successfully.");
            return null;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response!.status >= 400 && error.response!.status < 500) {
                    return parseErrors(error.response!.data.detail);
                } else {
                    setCommonErrors({"other": ["Something went wrong"]});
                    return null;
                }
            } else {
                setCommonErrors({"other": ["Something went wrong"]});
                return null;
            }
        }
    };

    const updateEmail = async (email: string | null): Promise<Record<string, string[]> | null> => {
        try {
            const response = await api.put(`/api/v1/users/change-email`, {
                email,
            });
            const data = await response.data;
            userInfo!["email"] = data.email;
            updateUserInfo(userInfo);
            setSuccessMessage("Email updated successfully.");
            return null;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response!.status >= 400 && error.response!.status < 500) {
                    return parseErrors(error.response!.data.detail);
                } else {
                    setCommonErrors({"other": ["Something went wrong"]});
                    return null;
                }
            } else {
                setCommonErrors({"other": ["Something went wrong"]});
                return null;
            }
        }
    };

    const changePassword = async (
        dataToUpdate: ChangePasswordForm
    ): Promise<Record<string, string[]> | null> => {
        try {
            await api.put(`/api/v1/users/change-password`, {
                old_password: dataToUpdate.oldPassword,
                new_password1: dataToUpdate.newPassword,
                new_password2: dataToUpdate.newPasswordConfirm,
            });
            logoutUser(`/${rootRoutePrefixes.auth}/${routeNames.signIn}`);
            return null;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response!.status >= 400 && error.response!.status < 500) {
                    return parseErrors(error.response!.data.detail);
                } else {
                    setCommonErrors({"other": ["Something went wrong"]});
                    return null;
                }
            } else {
                setCommonErrors({"other": ["Something went wrong"]});
                return null;
            }
        }
    };

    return (
        <Box>

            {successMessage && (
                <Box sx={{mb: 2}}>
                    <Alert severity="success" onClose={() => setSuccessMessage(null)}>
                        {successMessage}
                    </Alert>
                </Box>
            )}
            {commonErrors?.other && (
                <Box>
                    <Alert severity="error" onClose={() => setCommonErrors(null)}>
                        {commonErrors.other}
                    </Alert>
                </Box>
            )}
            <Box mb={2}>
                <Typography variant="h4">
                    <b>Profile</b>
                </Typography>
            </Box>
            {userInfo && (
                <>
                    <Box>
                        <Box mb={1}>
                            <Typography variant="h5">
                                <b>Preferences</b>
                            </Typography>
                        </Box>
                        <ChangeFullName user={userInfo} updateFullName={updateFullName}/>
                    </Box>
                    <Box sx={{mt: 4}}>
                        <Box sx={{mb: 1}}>
                            <Typography variant="h6">
                                <b>Email Address</b>
                            </Typography>
                        </Box>
                        <ChangeEmail user={userInfo} updateEmail={updateEmail} />
                    </Box>
                    <Box mt={6}>
                        <Box mb={1}>
                            <Typography variant="h5">
                                <b>Security</b>
                            </Typography>
                        </Box>
                        <ChangePassword changePassword={changePassword} />
                    </Box>
                </>
            )}
        </Box>
    );
}