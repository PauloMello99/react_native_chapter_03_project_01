import React from 'react';
import { useTheme } from 'styled-components';
import {
    Calendar as CustomCalendar,
    DateCallbackHandler,
    LocaleConfig,
} from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';

import { ptBR } from './localeConfig';
import generateInterval from './generateInterval';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

interface MarkedDateProps {
    [date: string]: {
        color: string;
        textColor: string;
        disabled?: boolean;
        disableTouchEvent?: boolean;
    };
}

interface DayProps {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;
}

interface CalendarProps {
    markedDate: MarkedDateProps;
    onDayPress: DateCallbackHandler;
}

function Calendar({ markedDate, onDayPress }: CalendarProps) {
    const theme = useTheme();
    return (
        <CustomCalendar
            renderArrow={(direction) => (
                <Feather
                    name={direction === 'right' ? 'chevron-right' : 'chevron-left'}
                    size={24}
                />
            )}
            headerStyle={{
                backgroundColor: theme.colors.background_secondary,
                borderBottomWidth: 0.5,
                borderBottomColor: theme.colors.text_detail,
                paddingBottom: 12,
                marginBottom: 12,
            }}
            theme={{
                textDayFontFamily: theme.fonts.primary_400,
                textDayHeaderFontFamily: theme.fonts.primary_500,
                textDayHeaderFontSize: 12,
                textMonthFontSize: 20,
                textMonthFontFamily: theme.fonts.secondary_600,
                monthTextColor: theme.colors.title,
                arrowStyle: { marginHorizontal: -16 },
            }}
            firstDay={1}
            minDate={new Date()}
            markingType="period"
            markedDates={markedDate}
            onDayPress={onDayPress}
        />
    );
}

export { MarkedDateProps, DayProps, Calendar, generateInterval };
