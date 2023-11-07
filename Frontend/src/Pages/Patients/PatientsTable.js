import React from "react";
import { Link } from "react-router-dom";
import ConsultationForm from "../Consultation/consultaion-form/ConsultationForm";
import copy from "copy-to-clipboard";
import moment from "moment/moment";
const PatientsTable = (props) => {
  const modal = document.querySelector("#exampleModal");
  // const { item, index ,currentPageRecent ,page, limitRecent } = props;
  const date = new Date(item.createdAt);
  const reversedDate = moment(item.dob).format("DD/MM/YYYY");
  const arr = reversedDate.split("/");
  let temp = arr[0];
  arr[0] = arr[1];
  arr[1] = temp;

  const getAge = (date) => {
    var dob = new Date(date);
    var month_diff = Date.now() - dob.getTime();
    var age_dt = new Date(month_diff);
    var year = age_dt.getUTCFullYear();
    var age = Math.abs(year - 1970);
    if (age <= 0) {
      let days = Math.floor(month_diff / 86400000);
      if (days >= 30) {
        let month = Math.floor(days / 30);
        if (month >= 2) {
          return month + " " + "Months";
        } else {
          return month + " " + "Month";
        }
      } else {
        if (days >= 2) {
          return days + " " + "Days";
        } else {
          return days + " " + "Day";
        }
      }
    } else {
      if (age >= 2) {
        return age + " " + "Years";
      } else {
        return age + " " + "Year";
      }
    }
  };

  return (
    <>
      <tr className="text-start">
        <td>
          {console.log(currentPageRecent, limitRecent, index, "{{{{{{{{{{{")}
          <span className="text-heading font-bold">
            {(currentPageRecent - 1) * limitRecent + index + 1}
          </span>
        </td>
        <td>
          <span className="text-heading font-bold">
            {item.fileNo ? item.fileNo : "-"}
          </span>
          {item.fileNo && (
            <i
              title="copy"
              style={{ color: "lightslategray", cursor: "pointer" }}
              className="fa-solid fa-copy ms-1"
              onClick={() => copy(item.fileNo)}
            ></i>
          )}
        </td>
        <td>
          <a className="text-heading font-semibold">
            {item.salutation + " " + item.firstName + " " + item.lastName}
          </a>
        </td>
        <td>
          <span className="text-heading font-bold">
            {moment(item.registrationDate)?.format("DD/MM/YYYY")}
          </span>
        </td>
        <td>
          <span className="text-heading font-bold">{reversedDate}</span>
        </td>
        <td>
          <span className="text-heading font-bold">
            {/* == 0 ? "<1 Years": getAge(arr.join("/")) */}
            {getAge(arr.join("/"))}
          </span>
        </td>
        <td>
          <span className="text-heading font-bold">{item.gender}</span>
        </td>
        <td>
          <Link
            to={`/patients/profile?${item._id}`}
            className="btn btn-sm btn-primary border-base"
            // data-bs-toggle="modal"
            title="View"
          >
            <span>
              View
              {/* <i className="fa-solid fa-eye"></i> */}
            </span>
          </Link>
          <a
            // href="#exampleModal"
            className="btn btn-sm btn-primary border-base"
            title="Edit"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <span>
              Start Consultation
              {/* <i className="fa-solid fa-pen-to-square "></i> */}
            </span>
          </a>
        </td>
      </tr>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <ConsultationForm data={item._id} modal={modal} />
      </div>
    </>
  );
};

export default PatientsTable;
