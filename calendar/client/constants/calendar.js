import moment from 'moment';

export const FULL_WEEKDAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
export const WEEKDAYS = FULL_WEEKDAYS.map(val => val.substr(0, 3));
export const MONTH_NAMES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
export const NUMBER_OF_WEEKS = 6;
export const DAYS_IN_WEEK = 7;
export const NOW = moment();
export const TODAY = moment(0, "HH");
export const MONTHS_IN_YEAR = 12;
export const DAY = moment.duration(1, 'days'); 
export const DAYS_IN_MONTH_SPACE = 42;
export const WEEK = DAY * DAYS_IN_WEEK;