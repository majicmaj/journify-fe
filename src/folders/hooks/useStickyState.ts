import { useEffect, useState } from "react"; 

const PROJECT_PREFIX = "journify_";

const getLocalStorageValue = (
    key: string,
    setValue: (value: string) =>  void
) => {
    const stickyValue = window.localStorage.getItem(PROJECT_PREFIX + key);

    if (stickyValue !== null) {
        setValue(stickyValue);
    }
};

const useStickyState = (key: string, defaultValue: string) => {
    const [value, setValue] = useState<string>(defaultValue);


    useEffect(() => getLocalStorageValue(key, setValue), []);


    const setStickyValue = (newValue: string) => {
        window.localStorage.setItem(PROJECT_PREFIX + key, newValue);
        setValue(newValue);
};

return [value, setStickyValue];

};

export default useStickyState;
