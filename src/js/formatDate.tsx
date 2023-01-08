import dayjs from "dayjs";

export function formatDate(date: string | undefined) {
    if ((date || '') === '') return '';
    return dayjs(new Date(date as string)).format('YYYY 年 MM 月 DD 日 hh:mm');
}
