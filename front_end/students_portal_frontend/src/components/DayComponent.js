import {
    isToday
  } from "date-fns";

const DayComponent = (props) => {
    const {
        setSelected,
        isSelected,
        setViewing,
        month,
        day
    } = props

    return(
        <td
                key={day.getMilliseconds()}
                >
                    <span 
                    onClick={() => {
                        // selected.push(day)
                        setSelected([day]);
                        setViewing(day);
                    }}
                    style={{
                        background: (isSelected(day) && month[1][0].getMonth() === day.getMonth()) ?  "#047857" : (isSelected(day) && month[1][0].getMonth() !== day.getMonth()) ? "#ECFDF5"  : "",
                        color: isSelected(day) ? "#D0D5DD" : "",
                        border: isToday(day) ? "1px solid green" : "",
                    }}
                    className="p-4 m-1 block rounded text-base leading-5">
                        {day.getDate()}
                    </span>
                </td>
    )
}


export default DayComponent