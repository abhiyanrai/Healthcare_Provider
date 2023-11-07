import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import {
  imageProfileApi,
  updateProviderDataById,
  updateProviderProfileById,
} from "../../../Apis/healthcareProvider";
import toast from 'react-hot-toast';
import "react-toastify/dist/ReactToastify.css";
import img from "../../../Assets/img/img-profile.jpg";
// import { SERVER_ENDPOINT } from "../../utils/baseUrl";
import { SERVER_ENDPOINT } from "../../../utils/baseUrl";
const ProviderItemData = (props) => {
  const { item, index, setRunUseEffect, runUseEffec ,loading} = props;
  // const { firstName, lastName } = item?.patientId;
  const [disabled, setDisabled] = useState(true);
  const [classes, setClasses] = useState("text-success");
  const date = new Date(item?.createdAt);
  const modal = document.getElementsByClassName("dsfdsfdsf");
  const { values, handleChange, handleSubmit, setValues, setFieldValue } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        number: "",
        specialization: "",
        experience: "",
        address: "",
        profilePic: "",
      },
      onSubmit: async (val) => {
        const data = {
          salutation: val.name.split(" ")[0],
          firstName: val.name.split(" ")[1],
          lastName: val.name.split(" ")[2],
          email: val.email,
          contactNo: val.number,
          id: item.userId._id,
          profilePic: val.profilePic,
        };
        const data1 = {
          specialization: val.specialization,
          address: val.address,
          experience: val.experience,
          id: item._id,
        };
        try {
          const response1 = await updateProviderProfileById(data);
          const response = await updateProviderDataById(data1);
          if (response.status === 200 && response1.status === 200) {
            modal.click();
            setDisabled(true);
            if (runUseEffec) {
              setRunUseEffect(false);
            } else {
              setRunUseEffect(true);
            }
            const message = response?.data?.message || response.statusText;

            toast.success(
              message,
              { position: toast.POSITION.TOP_RIGHT },
              { toastId: "err01" }
            );
            console.log(message);
          }
        } catch (err) {
          console.log(err);
        }
      },
    });

    const getcolor = (val)=>{
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
    }
  const handleSelectChange = (e) => {
    if (e.target.value == 1) {
      setClasses("text-warning");
    } else if (e.target.value == 2) {
      setClasses("text-danger");
    } else {
      setClasses("text-success");
    }
  };

  const handleEditProfile = async (e) => {
    const formdata = new FormData();
    formdata.append("file", e.target.files[0]);
    const res = await imageProfileApi(formdata);
    setFieldValue("profilePic", res?.data?.filePath);
    toast.success(res?.data?.message);
  };

  const handlePopup = (id) => {
    const modal = document.getElementById("modalholder" + id);
    modal.click();
  };

  useEffect(() => {
    if (props) {
      setValues({
        name:
          item?.userId?.salutation +
          " " +
          item?.userId?.firstName +
          " " +
          item?.userId?.lastName,
        email: item?.userId?.email,
        number: item?.userId?.contactNo,
        specialization: item?.specialization,
        experience: item?.experience,
        address: item?.address,
        profilePic: item?.userId?.profilePic,
      });
    }
  }, []);

  return (
    <>
      <tr>
        <td>
          <span className="text-heading font-bold">{index + 1}</span>
        </td>
        <td>
          {/* <img
            alt="..."
            src="/OwnerKit/img/people/img-profile.jpg" 
            className="avatar avatar-sm rounded-circle me-2"
          /> */}
          <a className="text-heading font-semibold">
            {/* { el.userId.firstName + " " + el.userId.lastName}  */}
            {item?.patientId?.salutation + " " + item?.patientId?.firstName + " " + item?.patientId?.lastName}
          </a>
        </td>
        <td>
          <span className="text-heading font-bold">{item?.serviceId?.serviceName}</span>
        </td>
        <td>{item?.roomId?.roomName}</td>
        <td>
          {item?.startTime?.split("T")[1]?.split(".")[0]?.split(":")?.slice(0,2)?.join(":") +" - "+item?.endTime?.split("T")[1]?.split(".")[0]?.split(":")?.slice(0,2)?.join(":")}
        </td>
        <td>
 
            <span className="p-1 rounded text-white"  style={{backgroundColor:`${getcolor(item?.appointmentType)}`}}> {item?.appointmentType}</span>
    
        </td>
        <td className="text-end">
          {/* <a
            href={"#modalholder" + item?.userId?._id}
            // href="#modalll"
            className="btn btn-sm  btn-primary border-base"
            data-bs-toggle="modal"
            title="View"
            // onClick={() => setEditForm(true)}
          > */}
            <Link to={`/patients/profile`} state={{"id": item?._id ,"patientId":item?.patientId?._id}} className="btn btn-sm  btn-primary border-base">
              Go to Visit
              {/* <i className="fa-solid fa-eye"></i> */}
            </Link>
          {/* </a> */}
        </td>
      </tr>
      {/* ----------------modal div----------------- */}
      <div
        className="modal fade dsfdsfdsf"
        id={"modalholder" + item?.userId?._id}
        // id="modalll"
        tabIndex={-1}
        aria-labelledby="modalholder"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered border-0">
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <div className="modal-content shadow-3 w-11/10">
              <div className="modal-header ">
                <button
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={(e) => e.preventDefault()}
                ></button>
              </div>
              <div className="d-flex px-10 justify-content-between mt-5 align-items-center">
                <div className="h4 text-center">Healthcare Providers Info</div>

                <div className="d-flex justify-content-end">
                  <div className="text-end">
                    <select
                      disabled={disabled}
                      className={`form-select  ${classes}  border-none shadow-none form-select-sm`}
                      aria-label=".form-select-sm example"
                      onChange={handleSelectChange}
                    >
                      <option className="text-success" value="0">
                        Active
                      </option>
                      <option className="text-warning" value="1">
                        Inactive
                      </option>
                      <option className="text-danger" value="2">
                        Disabled
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-body">
                <from onSubmit={handleSubmit}>
                  {/* Text */}
                  <div className="container-fluid ">
                    <div className="row align-items-start">
                      <div className="col-sm-2">
                        <div className="text-start">
                          <a className="avatar w-32 h-32 border  rounded-circle ">
                            <img
                              alt="..."
                              src={SERVER_ENDPOINT + "/" + values?.profilePic}
                              className="rounded-circle"
                              onError={(event) => {
                                event.target.src = img;
                                event.onerror = null;
                              }}
                            />
                          </a>
                          <input
                            type="file"
                            style={{ width: "100px", marginTop: "20px" }}
                            disabled={disabled}
                            onChange={handleEditProfile}
                          />
                        </div>
                      </div>

                      <div className="col-sm-10 mx-auto ">
                        <div className="row pb-4 d-flex justify-content-between align-items-center">
                          <div className="col-4 font-bold text-end pe-5">
                            <label>Full Name</label>
                          </div>
                          <input
                            className="col-8 py-2"
                            disabled={disabled}
                            style={{ backgroundColor: "#f8feff" }}
                            value={values.name}
                            onChange={handleChange}
                            name="name"
                          ></input>
                        </div>

                        <div className="row pb-4 d-flex justify-content-between align-items-center">
                          <div className="col-4 font-bold text-end pe-5">
                            <label>Email</label>
                          </div>

                          <input
                            className="col-8 py-2"
                            style={{ backgroundColor: "#f8feff" }}
                            disabled={disabled}
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                          ></input>
                        </div>

                        <div className="row pb-4 d-flex justify-content-between align-items-center">
                          <div className="col-4 font-bold text-end pe-5">
                            <label>Phone Number</label>
                          </div>

                          <input
                            className="col-8 py-2"
                            style={{ backgroundColor: "#f8feff" }}
                            name="number"
                            disabled={disabled}
                            value={values.number}
                            onChange={handleChange}
                          ></input>
                        </div>
                        <div className="row pb-4 d-flex justify-content-between align-items-center">
                          <div className="col-4 font-bold text-end pe-5">
                            <label>Specialization</label>
                          </div>

                          <input
                            className="col-8 py-2"
                            style={{ backgroundColor: "#f8feff" }}
                            name="specialization"
                            disabled={disabled}
                            value={values.specialization}
                            onChange={handleChange}
                          ></input>
                        </div>
                        <div className="row pb-4 d-flex justify-content-between align-items-center">
                          <div className="col-4 font-bold text-end pe-5">
                            <label>Experience in Industry</label>
                          </div>

                          <input
                            className="col-8 py-2"
                            style={{ backgroundColor: "#f8feff" }}
                            value={values.experience}
                            disabled={disabled}
                            name="experience"
                            onChange={handleChange}
                          ></input>
                        </div>
                        <div className="row pb-4 d-flex justify-content-between align-items-start  ">
                          <div className="col-4 font-bold text-end pe-5 pt-2">
                            <label>Address</label>
                          </div>

                          <input
                            className="col-8 py-2"
                            style={{
                              backgroundColor: "#f8feff",
                              // height: "5em",
                            }}
                            name="address"
                            disabled={disabled}
                            value={values.address}
                            onChange={handleChange}
                          ></input>
                        </div>

                        <div
                          onClick={() => setDisabled(false)}
                          className="d-flex justify-content-end"
                        >
                          <a
                            // href={"#modalholder" + item.userId._id}
                            className="btn btn-primary "
                            // data-bs-toggle="modal"
                            // title="Edit"

                            // onClick={() => setEditForm(false)}
                          >
                            <span className="">Edit</span>
                          </a>
                          {disabled ? (
                            ""
                          ) : (
                            <button
                              className="btn btn-primary ms-2"
                              type="submit"
                              onClick={() => handlePopup(item.userId._id)}
                            >
                              Save
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </from>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProviderItemData;

// const [editForm, setEditForm] = useState(false);
// const [sendLinkButton, setSendLinkButton] = useState(false);
// const date = new Date(item.createdAt);
// console.log(item,"L:L:L:L:L:L:L:L:L:")
// const {
//   values,
//   handleChange,
//   handleBlur,
//   handleSubmit,
//   touched,
//   errors,
//   setFieldValue,
// } = useFormik({
//   initialValues: {
//     salutation: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//     title: "",
//     specialization: "",
//     address: "",
//   },
//   validationSchema: healthCareProviderSchema,
//   onSubmit: async (values) => {
//     // console.log(values)
//     try {
//       if (sendLinkButton) {
//         const response = await sendLinkProviderApi(values);
//         if (response.status === 201) {
//           const message = response?.data?.message || response.statusText;
//           toast.success(
//             message,
//             { position: toast.POSITION.TOP_RIGHT },
//             { toastId: "err01" }
//           );
//           // console.log(message)
//         }
//       } else {
//         const response = await updateProviderProfileById({
//           ...values,
//           id: item.userId._id,
//         });
//         const response1 = await updateProviderDataById({
//           ...values,
//           id: item._id,
//         });
//         if (response.status === 200 && response1.status === 200) {
//           //  console.log(response?.data)
//           const message = response?.data?.message || response.statusText;
//           toast.success(
//             message,
//             { position: toast.POSITION.TOP_RIGHT },
//             { toastId: "err01" }
//           );
//           console.log(message);
//         }
//       }
//     } catch (err) {
//       console.log(err);
//       const message = err.response?.data?.message || err.response.statusText;
//       toast.error(
//         message,
//         { position: toast.POSITION.TOP_RIGHT },
//         { toastId: "err01" }
//       );
//     }
//   },
// });

// useEffect(() => {
//   if (props) {
//     const { title, specialization, address } = item;
//     const { firstName, lastName, email, salutation } = item.userId;
//     setFieldValue("title", title);
//     setFieldValue("specialization", specialization);
//     setFieldValue("address", address);
//     setFieldValue("firstName", firstName);
//     setFieldValue("lastName", lastName);
//     setFieldValue("salutation", salutation);
//     setFieldValue("email", email);
//   }
// }, [props]);
