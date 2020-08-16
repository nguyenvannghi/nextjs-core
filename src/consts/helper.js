import moment from 'moment';
import * as Yup from 'yup';

import * as APP_CONST from '.';

const downloadFile = (data, fileName, typeFile = APP_CONST.FILE_TYPE.EXPORT_FILE) => {
    const url = window.URL.createObjectURL(new Blob([data], { type: typeFile }));
    const link = document.createElement('a');
    link.href = url;
    const date = moment(new Date()).format(APP_CONST.FORMAT.DATE_ONLY);
    link.setAttribute('download', `${fileName}-${date}.csv`);
    document.body.appendChild(link);
    link.click();
    return true;
};

const isValidateFile = (files) => {
    if (!files) {
        return false;
    }
    const type = files[0] && files[0].type;
    const acceptType = type && type.replace('image/', '.');
    return acceptType && APP_CONST.FILE_TYPE.IMAGE_FILE.includes(acceptType.toLowerCase());
};

const isValidateFileSize = (files) => {
    if (!files) {
        return false;
    }
    const { size } = files[0];
    return size < APP_CONST.FILE_TYPE.FILE_MAX_SIZE;
};

const setFormControlValue = (data, schema, setValue) => {
    if (!Yup.reach(schema) || !data) {
        return;
    }
    const { fields } = Yup.reach(schema);
    Object.keys(fields).forEach((item) => {
        setValue(item, data[item] ? data[item] : null);
    });
};

const delayConfigSuccess = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const delayConfigFail = (ms) => new Promise((_, reject) => setTimeout(reject, ms));

export { downloadFile, isValidateFile, isValidateFileSize, setFormControlValue, delayConfigSuccess, delayConfigFail };
