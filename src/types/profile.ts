export interface ChangePasswordForm {
    oldPassword: string | null;
    newPassword: string | null;
    newPasswordConfirm: string | null;
}