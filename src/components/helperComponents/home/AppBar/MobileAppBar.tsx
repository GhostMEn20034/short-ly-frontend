import MuiAppBar from "@mui/material/AppBar";
import { styled } from '@mui/material/styles';

const MobileAppBar = styled(MuiAppBar)(({ theme }) => ({
    backgroundColor: "#ffffff",
    color: theme.palette.text.primary,
    borderBottom: `2px solid ${theme.palette.divider}`, // Optional border for styling
    boxShadow: "none",
}));

export default MobileAppBar;