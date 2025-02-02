import React from "react";
import DefaultButton from "@app-components/common/buttons/DefaultButton.tsx";
import BootstrapDialog from "@app-components/common/dialog/BootstrapDialog.tsx";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import blueGrey from "@mui/material/colors/blueGrey";
import {Alert} from "@mui/material";


interface DeleteLinkDialogProps {
    handleClose: () => void;
    open: boolean;
    handleSubmit: () => Promise<void>;
    deleteLinkErrorMessage: string | null;
    setDeleteLinkErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
}


export default function DeleteLinkDialog(
    {open, handleClose, handleSubmit, deleteLinkErrorMessage, setDeleteLinkErrorMessage}: DeleteLinkDialogProps
) {
    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleClose}
                open={open}
            >
                <DialogTitle sx={{m: 0, p: 2, color: blueGrey[800]}} id="customized-dialog-title">
                   <b> Delete Link?</b>
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: blueGrey[800],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
                <DialogContent dividers>
                    {deleteLinkErrorMessage && (
                        <Alert severity="error" sx={{ my: 2 }} onClose={() => setDeleteLinkErrorMessage(null)}>
                            {deleteLinkErrorMessage}
                        </Alert>
                    )}
                    <Typography gutterBottom>
                        If you delete this link,
                        all future requests to this short link will result in an HTTP 404 Not Found error.
                    </Typography>
                    <Alert severity="warning">
                        If this link is attached to a QR Code, it will also be removed from your account.
                    </Alert>
                </DialogContent>
                <DialogActions sx={{ gap: 2 }}>
                    <DefaultButton onClick={handleClose}>
                        Cancel
                    </DefaultButton>
                    <DefaultButton onClick={handleSubmit} variant="contained" color="error">
                        Delete Link
                    </DefaultButton>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}