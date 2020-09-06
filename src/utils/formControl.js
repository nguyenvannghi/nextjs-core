const setValueFormControl = (Schema, data, setValue) => {
    if (typeof setValue === 'function') {
        Object.keys(Schema).forEach((item) => {
            setValue(Schema[item], data[Schema[item]]);
        });
    }
};

const resetVallueFormControl = (Schema, setValue) => {
    if (typeof setValue === 'function') {
        Object.keys(Schema).forEach((item) => {
            setValue(Schema[item], null);
        });
    }
};

export { setValueFormControl, resetVallueFormControl };
