import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DefaultButton from '@app-components/common/buttons/DefaultButton';
import Card from '@app-helper-components/SignIn/Card';
import {Link as RouterLink} from 'react-router';
import {rootRoutePrefixes} from "@app-consts/routePrefixes";
import routeNames from "@app-consts/routeNames";
import SignInContainer from "@app-helper-components/SignIn/SignInContainer";
import {SignInProps} from "@app-types/auth.ts";


export default function SignIn({ emailState, handleSubmit}: SignInProps) {

    return (
        <>
            <SignInContainer className="sign-in-container" direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    <Link
                        component={RouterLink}
                        to={`/`}
                        sx={{
                            width: 'fit-content',
                        }}
                    >
                        <Box
                            component="img"
                            src="/shortly-logo.png"
                            sx={{
                                width: "120px",
                                height: "60px",
                            }}
                        />
                    </Link>
                    <Typography
                        component="h4"
                        variant="h4"
                        sx={{
                            width: '100%',
                            fontSize: 'clamp(1.50rem, 5vw, 1rem)',
                            fontWeight: 'bold',
                        }}
                    >
                        Log in and start sharing your links
                    </Typography>
                    <Box sx={{
                        mb: 2.25
                    }}>
                        <Typography variant="body1">
                            Don't have an account? {" "}
                            <Link
                                component={RouterLink}
                                to={`/${rootRoutePrefixes.auth}/${routeNames.signUp}`}
                            >
                                Sign Up
                            </Link>
                        </Typography>
                    </Box>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 3,
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="email"><b>Email</b></FormLabel>
                            <TextField
                                error={emailState.error}
                                helperText={emailState.message}
                                id="email"
                                type="email"
                                name="email"
                                size="small"
                                placeholder="your@email.com"
                                autoComplete="email"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={emailState.error ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password"><b>Password</b></FormLabel>
                            <TextField
                                helperText=""
                                name="password"
                                size="small"
                                placeholder="••••••••"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                            />
                        </FormControl>
                        <DefaultButton
                            size="small"
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Sign in
                        </DefaultButton>
                    </Box>
                </Card>
            </SignInContainer>
        </>
    );
}