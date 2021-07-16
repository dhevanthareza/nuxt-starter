import dayjs from 'dayjs'
import 'dayjs/locale/id'
dayjs.locale('id')
export default (context, inject) => {
  const date = (dateText) => {
    return dayjs(dateText)
      .locale('id')
      .format('dddd,  DD MMMM YYYY hh:mm:ss')
  }
  const dateFormat = dayjs
  inject('date', date)
  inject('dateFormat', dateFormat)
}
