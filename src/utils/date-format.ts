import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
// dayjs扩展utc
dayjs.extend(utc)

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  // 设置utc事件偏移到东八区
  return dayjs.utc(utcString).utcOffset(8).format(format)
}
