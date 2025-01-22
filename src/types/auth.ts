import * as React from "react";

export interface AuthStateProps {
    error: boolean; // Is there error ?
    setError: React.Dispatch<React.SetStateAction<boolean>>;
    message: string | null; // Error message
    setMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface SignInProps {
    emailState: AuthStateProps,
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
}

export interface SignUpProps {
    formErrors: Record<string, string[]>,
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>,
}