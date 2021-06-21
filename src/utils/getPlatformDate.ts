import { addDays } from 'date-fns';
import { Platform } from 'react-native';

export function getPlatformDate(date: Date) {
    if (Platform.OS === 'android') {
        return date;
    }
    return addDays(date, 1);
}
