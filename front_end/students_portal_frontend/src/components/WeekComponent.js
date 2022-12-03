import DayComponent from "./DayComponent";

const WeekComponent = (props) => {
    const {
        week
    } = props

    return(
        <tr>
            {week.map((day, index) => (
                <DayComponent {...props} day = {day} key={index} />
            ))}
        </tr>
    )
}

export default WeekComponent;