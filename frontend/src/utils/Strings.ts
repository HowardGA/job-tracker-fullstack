export const capitalizeFirsLetter = (str: string) => {
    if (str.length === 0){
        return str;
    }

    const firstLetter = str.charAt(0).toUpperCase();
    const restOfString = str.slice(1);
    return firstLetter + restOfString;
};

export const replaceUnderscoreWithSpace = (str: string) => {
    if (str.length === 0) {
        return str;
    }

    const transformedStr = str.replace('_',' ');
    return transformedStr;
}