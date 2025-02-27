import authApi from '@/apis/authApi';
import { useAppDispatch } from '@/redux/hook';
import { setUser } from '@/redux/user/user.slice';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

function userLoginMutation() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: authApi.login,
        onSuccess: async (data) => {
            const myInFo = await authApi.getMe();
            dispatch(
                setUser({
                    firstName: myInFo.firstName,
                    lastName: myInFo.lastName,
                    email: myInFo.email,
                    avatar: myInFo.avatar,
                    role: myInFo.role
                })
            );
            if (myInFo.role === 'ADMIN') {
                navigate('/admin');
            }
            if (myInFo.role === 'USER') {
                navigate('/');
            }
        },
        onError: (error) => {
            console.log('error', error);
        }
    });
    return mutation;
}
export default userLoginMutation;
