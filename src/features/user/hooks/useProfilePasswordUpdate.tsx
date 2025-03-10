import userApi from '@/apis/userApi';
import userLogoutMutation from '@/features/auth/hooks/userLogoutMutation ';
import { useAppDispatch } from '@/redux/hook';
import { toast } from '@/redux/toast/toast.action';
import { useMutation } from '@tanstack/react-query';

function useProfilePasswordUpdate() {
    const logoutMutation = userLogoutMutation();
    const dispatch = useAppDispatch();
    return useMutation({
        mutationFn: (data: IUserPasswordPayload) =>
            userApi.changePassword(data),
        onSuccess: (data) => {
            console.log('change password success', data);
            dispatch(toast.success('Change password successfully!'));
            logoutMutation.mutate();
        },
        onError: (error) => {
            console.log('change password error', error);
            dispatch(toast.error(error.message));
        }
    });
}

export default useProfilePasswordUpdate;
