import { useEffect, useState } from 'react';
import isNaN from 'lodash/isNaN';
import isNull from 'lodash/isNull';
import { useDispatch } from 'react-redux';

const useDetectIpad = ({ detectDevice }) => {
    const dispatch = useDispatch();
    const [dt, setDt] = useState(null);
    useEffect(() => {
        if (isNull(detectDevice) || isNaN(detectDevice)) {
            const isPadOS = navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform);
            setDt(+isPadOS === 1 ? 'tablet' : null);
        }
        return () => {
            setDt(null);
        };
    }, [detectDevice, dispatch]);

    return dt;
};

export default useDetectIpad;
