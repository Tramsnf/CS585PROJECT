import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WeekComponent from "./WeekComponent";
import { getDay } from "date-fns";

const MonthComponent = (props) => {
  const { months, month } = props;

  return (
    <table style={{ backgroundColor: "#ffffff" }} className='p-16 m-4'>
      <thead>
        <tr>
          <td
            colSpan={7}
            style={{
              borderBottom: "1px solid #E7EAEE",
              color: "#191D23",
              fontWeight: "600",
              padding: "10px 0px",
            }}>
            <label>{`${months[month[1][0].getMonth()].name} ${
              month[1][0].getYear() + 1900
            }`}</label>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          {month[0].map((day, index) => (
            <td key={index} className='round p-4 text-base '>
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][getDay(day)]}
            </td>
          ))}
        </tr>
        {month.map((week, index) => (
          <WeekComponent week={week} {...props} key={index} />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td
            colSpan={7}
            style={{
              backgroundColor: "#047857",
              borderRadius: 4,
              fontSize: "16px",
              color: "#fff",
              height: 44,
              padding: 4,
            }}>
            <FontAwesomeIcon icon='check' />
            <label>&nbsp;&nbsp;View month</label>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default MonthComponent;
