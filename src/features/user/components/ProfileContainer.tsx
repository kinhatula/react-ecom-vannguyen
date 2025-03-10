import { Stack } from '@mui/material';
import ProfileTabs from './ProfileTabs';

function ProfileContainer() {
    return (
        <>
            <Stack alignItems={'center'} mt={5}>
                <ProfileTabs />
            </Stack>
        </>
    );
}

export default ProfileContainer;
