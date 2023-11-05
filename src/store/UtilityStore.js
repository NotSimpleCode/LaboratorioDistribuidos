import { defineStore } from 'pinia';
import { format, subYears } from "date-fns";
import { es } from 'date-fns/locale'

export const useUtilityStore = defineStore('utility', {
    state: () => ({
        docTypes: [],
        localeFormat: "dd-MMMM-yyyy",
        dateRegion: { locale: es },
        defaultFormat: "yyyy-MM-dd",
        // maxAge: 100,
        // minAge: 14
    }),
    actions: {
        formatDate(dateTime) {
            if (dateTime != null) {
                const date = new Date(dateTime);
                return format(date, this.localeFormat, this.dateRegion);
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