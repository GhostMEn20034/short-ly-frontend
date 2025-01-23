import Button from '@mui/material/Button';
import {ButtonProps} from "@mui/material/Button";
import { styled } from '@mui/material/styles';

interface AdditionalProps {
    to: string; // Where to redirect to on click
    // ( Applicable only if you specified component={Link}, Link from 'react-router' )
}

const DefaultOutlinedButton = styled(Button)<ButtonProps | AdditionalProps>(({ theme }) => ({
    boxShadow: 'none',
    textTransform: 'none',
    border: '1px solid #0063cc',
    backgroundColor: 'transparent',
    color: '#0063cc',
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
        backgroundColor: 'rgba(0, 99, 204, 0.1)',
        borderColor: '#0063cc',
        color: '#0056b3',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: 'rgba(0, 99, 204, 0.2)',
        borderColor: '#005cbf',
        color: '#0056b3',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
    // Handle different sizes dynamically
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
}));

export default DefaultOutlinedButton;