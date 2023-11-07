import React from "react";

import { Link } from "react-router-dom";

const ProviderItemData = (props) => {
  const { item, index } = props;

  const getcolor = (val) => {
    switch (val) {
      case "New":
        return "#e71ae1";
        break;
      case "Reschedule":
        return "#aac4e9";
        break;
      case "Cancelled":
        return "#c5401d";
        break;
      case "Consultation":
        return "#68b04c";
        break;
      case "Regular":
        return "#d7bb58";
        break;
      default:
        return "#ffff";
    }
  };

  return (
    <>
      <tr>
        <td>
          <span className="text-heading=">{index + 1}</span>
        </td>
        <td>
          <a className="text-heading">
            {item?.patientId?.salutation +
              " " +
              item?.patientId?.firstName +
              " " +
              item?.patientId?.lastName}
          </a>
        </td>
        <td>
          <span className="text-heading">{item?.serviceId?.serviceName}</span>
        </td>
        <td>{item?.roomId?.roomName}</td>
        <td>
          {item?.startTime
            ?.split("T")[1]
            ?.split(".")[0]
            ?.split(":")
            ?.slice(0, 2)
            ?.join(":") +
            " - " +
            item?.endTime
              ?.split("T")[1]
              ?.split(".")[0]
              ?.split(":")
              ?.slice(0, 2)
              ?.join(":")}
        </td>
        <td>
          <span
            className="p-1 rounded text-white"
            style={{ backgroundColor: `${getcolor(item?.appointmentType)}` }}
          >
            {" "}
            {item?.appointmentType}
          </span>
        </td>
        <td className="text-end">
          <Link
            to={`/patients/profile`}
            state={{ id: item?._id, patientId: item?.patientId?._id }}
            className="btn btn-sm  btn-primary border-base"
          >
            Go to Visit
          </Link>
        </td>
      </tr>
    </>
  );
};

export default ProviderItemData;
