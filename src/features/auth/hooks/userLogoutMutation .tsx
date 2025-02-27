import authApi from '@/apis/authApi';
import { useMutation } from '@tanstack/react-query';
import { on } from 'events';
import { useNavigate } from 'react-router-dom';

function userLogoutMutation() {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: authApi.logout,
        onSuccess: (data) => {
            console.log('logout', data);
            navigate('/sign-in');
        },
        onError: (error) => {
            console.log('error', error);
        }
    });
    return mutation;
}

export default userLogoutMutation;
