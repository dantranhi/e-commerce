import moment from "moment"

export default function formatDate(date, formatString){
    return moment(date).format(formatString)
}