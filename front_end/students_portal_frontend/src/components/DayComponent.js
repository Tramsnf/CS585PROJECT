import {
    isToday
  } from "date-fns";

const DayComponent = (props) => {
    const {
        selected,
        setSelected,
        isSelected,
        viewing,
        setViewing,
        month,
        day
    } = props

    return(
        <td
                key={day.getMilliseconds()}
                className="p-4 rounded text-base leading-5"
                style={{
                    background: (isSelected(day) && month[1][0].getMonth() === day.getMonth()) ?  "#047857" : (isSelected(day) && month[1][0].getMonth() !== day.getMonth()) ? "#ECFDF5"  : "",
                    color: isSelected(day) ? "#D0D5DD" : "",
                    border: isToday(day) ? "1px solid green" : "",
                }}
                onClick={() => {
                    selected.push(day)
                    setSelected([...selected]);
                    setViewing(viewing);
                }}
                >
                {day.getDate()}
                </td>
    )
}


export default DayComponent