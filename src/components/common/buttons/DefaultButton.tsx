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
        border: '1px solid',
        lineHeight: 1.5,
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
}));

export default DefaultButton;