import { LinearProgress } from '@mui/material';
import { useIsFetching } from '@tanstack/react-query';

function Loading() {
    const fetching = useIsFetching();

    return (
        <div
            style={{
                position: 'absolute',
                top: '0',
                zIndex: 10000,
                width: '100%'
            }}
        >
            {fetching ? (
                <LinearProgress variant='determinate' color='success' />
            ): null}
        </div>
    );
}

export default Loading;
