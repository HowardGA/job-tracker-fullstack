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

export const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

const normalizeDate = (date: Date) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    return startOfDay;
};

const isSameDay = (jobDate: Date, currentDate: Date): boolean => {
    if (isNaN(jobDate.getTime()) || isNaN(currentDate.getTime())) {
        return false;
    }
    return normalizeDate(jobDate).getTime() === normalizeDate(currentDate).getTime();
};

export const numberOfDays = (dateString: string): string => {
    const jobDate = new Date(dateString);
    const currentDate = new Date();

    if (isNaN(jobDate.getTime())) {
        return 'Invalid Date';
    }

    if (isSameDay(jobDate, currentDate)) {
        return 'New';
    }

    const jobStartOfDay = normalizeDate(jobDate).getTime();
    const currentStartOfDay = normalizeDate(currentDate).getTime();

    const diffInDays = Math.round((currentStartOfDay - jobStartOfDay) / (1000 * 60 * 60 * 24));

    if (diffInDays === 1) {
        return 'Yesterday';
    } else if (diffInDays > 1 && diffInDays <= 30) {
        return `${diffInDays} days ago`;
    } else {
        return '30+ days ago';
    }
};
