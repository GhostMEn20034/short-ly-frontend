import Typography from "@mui/material/Typography";
import SignUpContainer from "@app-helper-components/SignUp/SignUpContainer";
import Card from "@app-helper-components/SignUp/Card";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import {Link as RouterLink} from "react-router";
import {rootRoutePrefixes} from "@app-consts/routePrefixes.ts";
import routeNames from "@app-consts/routeNames.ts";
import DefaultButton from "@app-components/common/buttons/DefaultButton";
import Grid2 from "@mui/material/Grid2";
import {SignUpProps} from "@app-types/auth.ts";


export default function SignUp({formErrors, handleSubmit}: SignUpProps) {

    return (
        <>
            <SignUpContainer direction="column" justifyContent="space-between">
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
                        Create your account
                    </Typography>
                    <Box sx={{
                        mb: 2.25
                    }}>
                        <Typography variant="body1">
                            Already have an account? {" "}
                            <Link
                                component={RouterLink}
                                to={`/${rootRoutePrefixes.auth}/${routeNames.signIn}`}
                            >
                                Log in
                            </Link>
                        </Typography>
                    </Box>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{display: 'flex', flexDirection: 'column', gap: 2}}
                    >
                        <Grid2 container>
                            <Grid2 size={{xs: 12, sm: 6, md: 6, lg: 6, xl: 6}}>
                                <FormControl>
                                    <FormLabel htmlFor="name"><b>First Name</b></FormLabel>
                                    <TextField
                                        autoComplete="name"
                                        name="firstName"
                                        required
                                        size="small"
                                        fullWidth
                                        id="firstName"
                                        placeholder="John"
                                        error={formErrors?.first_name !== undefined}
                                        helperText={formErrors?.first_name}
                                        color={formErrors?.first_name !== undefined ? 'error' : 'primary'}
                                    />
                                </FormControl>
                            </Grid2>
                            <Grid2 size={{xs: 12, sm: 6, md: 6, lg: 6, xl: 6}}>
                                <FormControl>
                                    <FormLabel htmlFor="name"><b>Last Name (Optional)</b></FormLabel>
                                    <TextField
                                        autoComplete="name"
                                        name="lastName"
                                        size="small"
                                        fullWidth
                                        id="lastName"
                                        placeholder="Doe"
                                        error={formErrors?.last_name !== undefined}
                                        helperText={formErrors?.last_name}
                                        color={formErrors?.last_name !== undefined ? 'error' : 'primary'}
                                    />
                                </FormControl>
                            </Grid2>
                        </Grid2>
                        <FormControl>
                            <FormLabel htmlFor="email"><b>Email</b></FormLabel>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                placeholder="your@email.com"
                                name="email"
                                size="small"
                                autoComplete="email"
                                variant="outlined"
                                error={formErrors?.email !== undefined}
                                helperText={formErrors?.email}
                                color={formErrors?.email !== undefined ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password"><b>Password</b></FormLabel>
                            <TextField
                                required
                                fullWidth
                                name="password1"
                                size="small"
                                placeholder="••••••••"
                                type="password"
                                id="password1"
                                autoComplete="new-password"
                                variant="outlined"
                                error={formErrors?.password1 !== undefined}
                                helperText={formErrors?.password1}
                                color={formErrors?.password1 !== undefined ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password"><b>Repeat the password</b></FormLabel>
                            <TextField
                                required
                                fullWidth
                                name="password2"
                                size="small"
                                placeholder="••••••••"
                                type="password"
                                id="password2"
                                autoComplete="new-password"
                                variant="outlined"
                                error={formErrors?.password2 !== undefined}
                                helperText={formErrors?.password2}
                                color={formErrors?.password2 !== undefined ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <DefaultButton
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Sign up
                        </DefaultButton>
                    </Box>
                </Card>
            </SignUpContainer>
        </>
    );
}