import userApi from '@/apis/userApi';
import userLogoutMutation from '@/features/auth/hooks/userLogoutMutation ';
import { useAppDispatch } from '@/redux/hook';
import { toast } from '@/redux/toast/toast.action';
import { changeUser } from '@/redux/user/user.slice';
import { useMutation } from '@tanstack/react-query';

interface IDataPayload {
    id: number;
    data: IUserPayload;
}
function useProfileInformationUpdate() {
    const dispatch = useAppDispatch();
    const logoutMutation = userLogoutMutation();
    return useMutation({
        mutationFn: ({ id, data }: IDataPayload) => userApi.update(id, data),
        onSuccess: (data) => {
            console.log('update profile success', data);
            dispatch(
                changeUser({
                    firstName: data.data.firstName,
                    lastName: data.data.lastName
                })
            );
            dispatch(toast.success('Update profile successfully!'));
            logoutMutation.mutate();
        },
        onError: (error) => {
            console.log('update profile error', error);
            dispatch(toast.error(error.message));
        }
    });
}

export default useProfileInformationUpdate;
