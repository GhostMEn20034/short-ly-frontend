import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import DefaultButton from "@app-components/common/buttons/DefaultButton.tsx";
import React, {useState} from "react";
import {ChangePasswordForm} from "@app-types/profile.ts";

interface ChangePasswordProps {
    changePassword: (dataToUpdate: ChangePasswordForm) => Promise<Record<string, string[]> | null>
}

export default function ChangePassword({changePassword}: ChangePasswordProps) {
    const [oldPassword, setOldPassword] = useState<string | null>(null);
    const [newPassword, setNewPassword] = useState<string | null>(null);
    const [newPasswordConfirm, setNewPasswordConfirm] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<Record<string, string[]> | null>(null);

    const handleSubmit = async () => {
        const errors = await changePassword({
            oldPassword, newPassword, newPasswordConfirm
        });
        setFormErrors(errors);
    };


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
        }}>
            <Box>
                <Typography variant="h6">
                    <b>Change password</b>
                </Typography>
                <Typography variant="body1">
                    You will be required to login after changing your password
                </Typography>
            </Box>
            <FormControl>
                <FormLabel><b>Current password</b></FormLabel>
                <TextField
                    error={Boolean(formErrors?.old_password)}
                    helperText={formErrors?.old_password}
                    name="OldPassword"
                    size="small"
                    autoComplete="email"
                    type="password"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const newValue = event.target.value.trim();
                        if (newValue === "") {
                            setOldPassword(null);
                        } else {
                            setOldPassword(event.target.value);
                        }
                    }}
                    required
                    fullWidth
                    variant="outlined"
                    color={formErrors?.old_password ? 'error' : 'primary'}
                />
            </FormControl>
            <FormControl>
                <FormLabel><b>New password</b></FormLabel>
                <TextField
                    error={Boolean(formErrors?.new_password1)}
                    helperText={formErrors?.new_password1}
                    name="newPassword1"
                    size="small"
                    type="password"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const newValue = event.target.value.trim();
                        if (newValue === "") {
                            setNewPassword(null);
                        } else {
                            setNewPassword(event.target.value);
                        }
                    }}
                    required
                    fullWidth
                    variant="outlined"
                    color={formErrors?.new_password1 ? 'error' : 'primary'}
                />
            </FormControl>
            <FormControl>
                <FormLabel><b>Confirm new password</b></FormLabel>
                <TextField
                    error={Boolean(formErrors?.new_password2)}
                    helperText={formErrors?.new_password2}
                    name="newPassword2"
                    size="small"
                    type="password"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const newValue = event.target.value.trim();
                        if (newValue === "") {
                            setNewPasswordConfirm(null);
                        } else {
                            setNewPasswordConfirm(event.target.value);
                        }
                    }}
                    required
                    fullWidth
                    variant="outlined"
                    color={formErrors?.new_password2 ? 'error' : 'primary'}
                />
            </FormControl>
            <DefaultButton
                onClick={handleSubmit}
                variant="contained"
                sx={{
                    maxWidth: 175
                }}
            >
                Change Password
            </DefaultButton>
        </Box>
    );
}