export const routeNameKeys = [
    "signIn", "signUp", "home", "profile",
] as const;

type routeNameKey = typeof routeNameKeys[number];

const routeNames: Record<routeNameKey, string> = {
    // Auth
    signIn: "sign_in",
    signUp: "sign_up",
    // Home
    home: "home",
    // settings
    profile: "profile",

};

export default routeNames;