import Button, {ButtonProps} from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import {blueGrey} from "@mui/material/colors";

interface AdditionalProps {
    to: string; // Where to redirect to on click
    // ( Applicable only if you specified component={Link}, Link from 'react-router' )
}


const DefaultButton = styled(Button)<ButtonProps | AdditionalProps>(({ theme }) => ({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
        backgroundColor: '#0069d9',
        borderColor: '#0062cc',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
    // Handles different sizes
    '&.MuiButton-sizeSmall': {
        fontSize: theme.typography.pxToRem(13),
        padding: '4px 10px',
    },
    '&.MuiButton-sizeMedium': {
        fontSize: theme.typography.pxToRem(16),
        padding: '6px 12px',
    },
    '&.MuiButton-sizeLarge': {
        fontSize: theme.typography.pxToRem(18),
        padding: '8px 16px',
    },
    // Secondary color
    '&.MuiButton-colorSecondary': {
        backgroundColor: 'white',
        borderColor: '#e0e0e0',
        color: blueGrey[800],
        '&:hover': {
            backgroundColor: '#f5f5f5',
            borderColor: '#d6d6d6',
            color: blueGrey[800],
            boxShadow: 'none',
        },
        '&:active': {
            backgroundColor: '#e8e8e8',
            borderColor: '#d0d0d0',
            color: blueGrey[800],
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.3)',
        },
    },
    // Button with variant="text"
    '&.MuiButton-text': {
        backgroundColor: 'transparent',
        color: theme.palette.primary.main, // Use theme's primary color
        border: 'none',
        boxShadow: 'none',
        padding: '6px 12px',
        '&:hover': {
            backgroundColor: "rgba(33, 150, 243, 0.04)", // Use a lighter shade of primary color
            color: theme.palette.primary.main,
        },
        '&:active': {
            backgroundColor: "rgba(33, 150, 243, 0.04)", // Use a darker shade of primary color
            color: theme.palette.primary.main,
        },
        '&:focus': {
            boxShadow: `0 0 0 0.2rem ${theme.palette.primary.light}`, // Subtle focus ring
        },
    },
}));

export default DefaultButton;