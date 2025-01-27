import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import DefaultButton from "@app-components/common/buttons/DefaultButton.tsx";
import {User} from "@app-types/user.ts";
import React, {useState} from "react";

interface ChangeFullNameProps {
    user: User | null;
    updateFullName: (firstName: string | null, lastName: string | null) => Promise<Record<string, string[]> | null>;
}

export default function ChangeFullName({user, updateFullName}: ChangeFullNameProps) {
    const [firstName, setFirstName] = useState<string | null>(user!.firstName);
    const [lastName, setLastName] = useState<string | null>(user?.lastName ? user.lastName : null);
    const [formErrors, setFormErrors] = useState<Record<string, string[]> | null>(null);

    const handleSubmit = async () => {
        const errors = await updateFullName(firstName, lastName);
        setFormErrors(errors);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 2,
            }}
        >
            <FormControl>
                <FormLabel><b>First name</b></FormLabel>
                <TextField
                    error={Boolean(formErrors?.first_name)}
                    helperText={formErrors?.first_name}
                    value={firstName ? firstName : ""}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const newValue = event.target.value.trim();
                        if (newValue === "") {
                            setFirstName(null);
                        } else {
                            setFirstName(event.target.value);
                        }
                    }}
                    id="firstName"
                    name="firstName"
                    size="small"
                    placeholder="John"
                    autoComplete="email"
                    required
                    fullWidth
                    variant="outlined"
                    color={formErrors?.first_name ? 'error' : 'primary'}
                />
            </FormControl>
            <FormControl>
                <FormLabel><b>Last name</b></FormLabel>
                <TextField
                    error={Boolean(formErrors?.last_name)}
                    helperText={formErrors?.last_name}
                    value={lastName ? lastName : ""}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const newValue = event.target.value.trim();
                        if (newValue === "") {
                            setLastName(null);
                        } else {
                            setLastName(event.target.value);
                        }
                    }}
                    name="lastName"
                    size="small"
                    placeholder="Doe"
                    id="lastName"
                    required
                    fullWidth
                    variant="outlined"
                    color={formErrors?.first_name ? 'error' : 'primary'}
                />
            </FormControl>
            <DefaultButton
                onClick={handleSubmit}
                disabled={firstName === null && lastName === null}
                variant="contained"
                sx={{
                    maxWidth: 175
                }}
            >
                Update Full Name
            </DefaultButton>
        </Box>
    );
}