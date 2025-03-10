import authApi from '@/apis/authApi';
import { useAppDispatch } from '@/redux/hook';
import { toast } from '@/redux/toast/toast.action';
import { setUser } from '@/redux/user/user.slice';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

function userRegisterMutation() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (auhData: IAuthPayload) => {
            return authApi.register(auhData);
        },
        onSuccess: async () => {
            const myInfo = await authApi.getMe();
            dispatch(
                setUser({
                    firstName: myInfo.firstName,
                    lastName: myInfo.lastName,
                    email: myInfo.email,
                    avatar: myInfo.avatar,
                    role: myInfo.role
                })
            );
            dispatch(toast.success('Register successfully!'));
            navigate('/');
        },
        onError: (error: AxiosError<unknown, IErrorResponse>) => {
            dispatch(toast.error(error.message));
        }
    });

    return mutation;
}

export default userRegisterMutation;
