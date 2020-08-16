import { useEffect, useRef } from 'react';
import moment from 'moment';
import { useImmer } from 'use-immer';

const useCountdown = ({ eventStart, downtime }) => {
    const timerRef = useRef(null);
    const [countDownState, setCountDownState] = useImmer({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
        disabled: false,
        isLoading: true,
    });

    useEffect(() => {
        if (eventStart) {
            const currentTime = moment().unix();
            const diffTime = eventStart - currentTime;
            let duration = moment.duration(diffTime * 1000, 'milliseconds');
            const interval = downtime || 1000;
            timerRef.current = setInterval(() => {
                duration = moment.duration(duration - interval, 'milliseconds');
                if (diffTime > 0) {
                    const tdays = duration.days();
                    const thours = duration.hours();
                    const tminutes = duration.minutes();
                    const tseconds = duration.seconds();
                    setCountDownState((draft) => {
                        draft.isLoading = false;
                        draft.days = tdays.toString().length > 1 ? tdays : `0${tdays}`;
                        draft.hours = thours.toString().length > 1 ? thours : `0${thours}`;
                        draft.minutes = tminutes.toString().length > 1 ? tminutes : `0${tminutes}`;
                        draft.seconds = tseconds.toString().length > 1 ? tseconds : `0${tseconds}`;
                    });
                } else {
                    setCountDownState((draft) => {
                        draft.isLoading = false;
                        draft.disabled = true;
                    });
                    clearInterval(timerRef.current);
                }
            }, interval);
        }
        return () => {
            clearInterval(timerRef.current);
        };
    }, [setCountDownState, eventStart, downtime]);

    return countDownState;
};

export default useCountdown;
