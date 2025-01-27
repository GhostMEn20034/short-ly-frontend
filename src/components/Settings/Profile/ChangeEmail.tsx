import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import {User} from "@app-types/user.ts";
import DefaultButton from "@app-components/common/buttons/DefaultButton.tsx";
import React, {useState} from "react";

interface ChangeEmailProps {
    user: User | null;
    updateEmail: (email: string | null) => Promise<Record<string, string[]> | null>;
}


export default function ChangeEmail({user, updateEmail}: ChangeEmailProps) {
    const [email, setEmail] = useState<string | null>(user!.email);
    const [formErrors, setFormErrors] = useState<Record<string, string[]> | null>(null);

    const handleSubmit = async () => {
        const errors = await updateEmail(email);
        setFormErrors(errors);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
        }}>
            <FormControl>
                <FormLabel><b>Email</b></FormLabel>
                <TextField
                    error={Boolean(formErrors?.email)}
                    helperText={formErrors?.email}
                    value={email ? email : ""}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const newValue = event.target.value.trim();
                        if (newValue === "") {
                            setEmail(null);
                        } else {
                            setEmail(event.target.value);
                        }
                    }}
                    name="lastName"
                    size="small"
                    type="email"
                    placeholder="Doe"
                    id="password"
                    autoComplete="current-password"
                    required
                    fullWidth
                    variant="outlined"
                    color={formErrors?.email ? 'error' : 'primary'}
                />
            </FormControl>
            <DefaultButton
                onClick={handleSubmit}
                variant="contained"
                sx={{
                    maxWidth: 175
                }}
            >
                Change Email
            </DefaultButton>
        </Box>
    )
}