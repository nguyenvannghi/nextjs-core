import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import { DATE_FORMAT_PICKER } from 'consts';

const setDateState = (data, setState) => {
    if (isEmpty(data)) {
        return null;
    }
    if (typeof setState === 'function') {
        const date = moment(new Date(data));
        if (moment(date).isValid()) {
            setState(new Date(data));
        }
    }
};

const dateToUnix = (date) => date && moment(date).unix();
const dateFormat = (date, fmt = DATE_FORMAT_PICKER.DDMMYYYY) => {
    return date && moment(new Date(date)).format(fmt);
};
const checkDateValid = (date) => {
    const dateState = moment(new Date(date));
    return moment(dateState).isValid();
};

export { setDateState, dateToUnix, dateFormat, checkDateValid };
