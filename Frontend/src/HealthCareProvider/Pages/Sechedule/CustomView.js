import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const CustomView = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([
    {
      name: "Patient",
      title: "hello how are you!",
      dName: "Doctor Name",
      type: "Treatment Type",
    },
    {
      name: "Patient",
      title: "hello how are you!",
      dName: "Doctor Name",
      type: "Treatment Type",
    },
    {
      name: "Patient",
      title: "hello how are you!",
      dName: "Doctor Name",
      type: "Treatment Type",
    },
    {
      name: "Patient",
      title: "hello how are you!",
      dName: "Doctor Name",
      type: "Treatment Type",
    },
  ]);
  const createRoom = () => {
    setData([...data, { name: "Room", title: "hello how are you!" }]);
  };

  return (
    <div
      className="cView"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <table className="table">
        <thead>
          <tr>
            <td style={{ textAlign: "center" }}>
              {" "}
              <h1> Room 1</h1>
            </td>
            <td style={{ textAlign: "center" }}>
              {" "}
              <h1> Room 2</h1>
            </td>
            <td style={{ textAlign: "center" }}>
              {" "}
              <h1> Room 3</h1>
            </td>
            <td style={{ textAlign: "center" }}>
              {" "}
              <h1> Room 4</h1>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {data.map((val, index) => {
                return (
                  <td
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Link to={`sechedule/mysechedule/${index + 1}`}>
                      <div
                        className="room"
                        style={{
                          border: "2px solid black",
                          padding: "20px 30px",
                          margin: "20px",
                          borderRadius: "20px",
                          width: "300px",
                        }}
                        // onClick={() => handleClick(index + 1)}
                      >
                        <h3>
                          {val.name} {index + 1}
                        </h3>
                        <h5>{val.dName}</h5>
                        <h5>{val.type}</h5>
                        <p>{val.title}</p>
                      </div>
                    </Link>
                  </td>
                );
              })}
            </td>
            <td>
              {data.map((val, index) => {
                return (
                  <td
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Link to={`sechedule/mysechedule/${index + 1}`}>
                      <div
                        className="room"
                        style={{
                          border: "2px solid black",
                          padding: "20px 30px",
                          margin: "20px",
                          borderRadius: "20px",
                          width: "300px",
                        }}
                        // onClick={() => handleClick(index + 1)}
                      >
                        <h3>
                          {val.name} {index + 1}
                        </h3>
                        <h5>{val.dName}</h5>
                        <h5>{val.type}</h5>
                        <p>{val.title}</p>
                      </div>
                    </Link>
                  </td>
                );
              })}
            </td>
            <td>
              {data.map((val, index) => {
                return (
                  <td
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Link to={`sechedule/mysechedule/${index + 1}`}>
                      <div
                        className="room"
                        style={{
                          border: "2px solid black",
                          padding: "20px 30px",
                          margin: "20px",
                          borderRadius: "20px",
                          width: "300px",
                        }}
                        // onClick={() => handleClick(index + 1)}
                      >
                        <h3>
                          {val.name} {index + 1}
                        </h3>
                        <h5>{val.dName}</h5>
                        <h5>{val.type}</h5>
                        <p>{val.title}</p>
                      </div>
                    </Link>
                  </td>
                );
              })}
            </td>
            <td>
              {data.map((val, index) => {
                return (
                  <td
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Link to={`sechedule/mysechedule/${index + 1}`}>
                      <div
                        className="room"
                        style={{
                          border: "2px solid black",
                          padding: "20px 30px",
                          margin: "20px",
                          borderRadius: "20px",
                          width: "300px",
                        }}
                        // onClick={() => handleClick(index + 1)}
                      >
                        <h3>
                          {val.name} {index + 1}
                        </h3>
                        <h5>{val.dName}</h5>
                        <h5>{val.type}</h5>
                        <p>{val.title}</p>
                      </div>
                    </Link>
                  </td>
                );
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CustomView;
