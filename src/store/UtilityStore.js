import { defineStore } from 'pinia';
import { format, utcToZonedTime } from 'date-fns-tz'
import { subYears, addDays } from 'date-fns'
import { es } from 'date-fns/locale'

export const useUtilityStore = defineStore('utility', {
    state: () => ({
        docTypes: [],
        localeFormat: "dd MMMM, yyyy",
        dateRegion: { timeZone: 'America/Bogota', locale: es },
        defaultFormat: "yyyy-MM-dd",
        format: { year: "numeric", month: "short", day: "numeric" }
        // maxAge: 100,
        // minAge: 14
    }),
    actions: {
        formatDate(dateTime) {
            if (dateTime != null) {
                const date = utcToZonedTime(dateTime, 'America/Bogota');
                const actualDate = addDays(date, 1)
                return format(actualDate, this.localeFormat, this.dateRegion)
            }
            return "";
        },
        formatToDefaultDate(dateTime) {
            if (dateTime != null) {
                const date = new Date(dateTime);
                return format(date, this.defaultFormat, this.dateRegion);
            }
            return "";
        },
        formatISO(date) {
            if (date != "") {
                return new Date(date).toISOString()
            }
            return ""
        },
        calculateDate(years) {
            let actualDate = new Date();
            let date = subYears(actualDate, years);
            return format(date, this.defaultFormat);
        }

    }
});