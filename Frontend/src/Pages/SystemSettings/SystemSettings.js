import React, { useState, useEffect, useRef } from "react";
import "../Examination/Examination.css";
import Select, { components } from "react-select";
import "./Systemsetting.css";
import {
  addDataIntoOptionApi,
  deleteOptionApi,
  deleteRoomApi,
  deleteSlotApiData,
  getAllAppontmentsApi,
  getAllOptionsApi,
  getOptionListApiById,
  getRoomsApi,
  getScheduleDetailsApi,
  getServiceApi,
  updateOptionApi,
  updatePatientProfileById,
} from "../../Apis";
import toast from 'react-hot-toast';
import RoomModal from "./RoomModal";
import { Link, useNavigate } from "react-router-dom";
import Addoption from "./Modal";
import ConsultationDropDown from "./consultation/ConsultationDropDown";
import ExaminationDropdown from "./examination/ExaminationDropdown";
import Service from "./service/Service";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import BillingTax from "./billing/BillingTax";
import ClinicSchedule from "./clinicSchedule/ClinicSchedule";
import Holidays from "./holidays/Holidays";
import HolidayModal from "./clinicSchedule/HolidayModal";
import { dropdownIds } from "./data";
import { WhiteLoader } from "../../Components/common/Errors/loader/WhiteLoader";

const SystemSettings = () => {

  const [selectId, setSelectId] = useState("");
  const [availableSlots, setAvaliableSlots] = useState([]);
  const [toggleServices, setToggleServices] = useState(false);
  const [toggleRooms, setToggleRooms] = useState(false);
  const [roomInfoId, setRoomInfoId] = useState();
  const [serviceIdd, setServiceId] = useState();
  const [roomInfoName, setRoomInfoName] = useState();
  const [search, setSearch] = useState({ fromDate: "", toDate: "" });
  const [allRooms, setAllRooms] = useState([]);
  const [allOptions, setAllOptions] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [viewModal, setViewModal] = useState(false);  
 const [hoiday,setHoliday]=useState([])
 const [aId,setAid]=useState()
 const [state, setstate] = useState([]);
const [trackLoader,setTrackLoader]=useState(false);
 const [pId, setPId] = useState("");
 const [toggleEdit, setToggleEdit] = useState(false);
 const [updateData, setUpdateData] = useState();
 const [editData, setEditData] = useState();
 const [toggle, setToggle] = useState(false);
 const [trackInfo, setTrackInfo] = useState();
 const [errormsg, setErrorMsg] = useState("");
 const [optionId, setOptionId] = useState();
 const [toggleHoliday,setToogleHoliday]=useState(true)
 const [trackPatient, setTrackPatient] = useState();
  const [singleServiceData, setSingleServiceData] = useState();
  const [addData, setAddData] = useState("");
  const [excludeDate,setExcludeDate]=useState([])
  const [ids, setIds] = useState();
  const modal = document.getElementById("exampleModaltwow");
  const modalq = document.getElementById("confirmPopups");
  const selectmodal = document.getElementById("exampleModalj");

 const modals = document.getElementById("holiday");

  function getFormattedDate(today) {
    var week = new Array(
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    );
    var day = week[today?.getDay()];
    return day;
  }
  const handleDeleteSlot = async (id) => {
    try {
      const res = await deleteSlotApiData({id});
      console.log(res);
      toast.success(res.data.message);
      selectmodal.click();
      getAllSotsData();
      // getavailableSlots();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handleServices = (name) => {
    switch (name) {
      case "service":
        if (toggleServices) {
          setToggleServices(false);
          setToggleRooms(false);
        } else {
          setToggleServices(true);
          setToggleRooms(false);
        }
        break;
      case "rooms":
        if (toggleRooms) {
          setToggleRooms(false);
          setToggleServices(false);
        } else {
          setToggleRooms(true);
          setToggleServices(false);
        }
        break;
      default:
        return;
    }
  };
  const handleAddData = (e) => {
    setAddData(e.target.value);
    if (e.target.value) {
      setErrorMsg("");
    }
  };
  const handleSubmitOption = async () => {
    setTrackLoader(true)
    if (optionId && addData) {
      try {
        const res = await addDataIntoOptionApi({
          name: addData,
          modelId: optionId,
        });
        if (res?.status === 200 || res?.status === 201) {
          // toast.success(res?.data?.message);
          toast.success("Track Patient option added")
          setOptionId("");
          setAddData("");
          setToggle(false);
          setTrackLoader(false)
        }
      } catch (err) {
        toast.error(err);
        setTrackLoader(false)
      }
    } else {
      setErrorMsg("Required field.");
      setTrackLoader(false)
    }
  };
  const handleClose = () => {
    setErrorMsg("");
    setToggleEdit(false);
    setToggle(false);
    setOptionId("");
    setAddData("");
  };
  const manageData = (data) => {
    let dd = data;
    let mm = dd.push({ name: "Add other", id: "" });
    setstate(mm);
  };
  const handleInputChange = async (e, name) => {
    if (e.value === "Add other") {
      setToggle(true);
      e.preventDefault()
    } 
    setTrackPatient("")
    // else {
    //   setTrackPatient(e);
    //   try {
    //     const res = await updatePatientProfileById({
    //       id: pId,
    //       trackPatient: e,
    //     });
    //     if (res.status === 200 || res.status === 201) {
    //       toast.success(res.data.message, { id: "002" });
    //     }
    //     console.log(res, "RESPOSDOFASDOFODSFODAS");
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
  };
  const CustomOption = (props) => {
    const deleteoption = async (d) => {
      try {
        const res = await deleteOptionApi({ id: data.id });
        if (res.status === 200 || res.status === 201) {
          toast.success(res.data.message,{id:"003"});
        }
      } catch (err) {
        console.log(err);
      }
    };
    console.log(trackPatient, "tsfskjfgpsiysfd");
    const editOption = (data) => {
      setToggleEdit(true);
      setEditData(data);
      setUpdateData(data?.value)
      console.log(data, "dataafdfdastdsafd");
    };

    const { data, innerRef, innerProps, selectProps, selectOption } = props;
    const { optionAdd, optionEdit, optionDelete } = selectProps;
    const onClick = {
      option: () => {},
      label: () => selectOption(data),
      add: () => optionAdd(data),
      edit: () => editOption(data),
      delete: () => deleteoption(data),
    };
    return data.custom ? (
      <div style={{ cursor: "pointer" }} ref={innerRef} {...innerProps}></div>
    ) : (
      <components.Option {...props}>
        <span onClick={onClick.label}>{data?.label}</span>
        {!!data?.id && (
          <span style={{ float: "right" }}>
            <button style={{ margin: "0 10px" }} onClick={onClick.edit}>
              <i class="bi bi-pencil-square"></i>
            </button>
            <button onClick={onClick.delete}>
              <i class="bi bi-trash"></i>
            </button>
          </span>
        )}
      </components.Option>
    );
  };
  const options1 =
    state?.length > 0
      ? state?.map((el, i) => {
          let container = {};
          container["value"] = el?.name;
          container["label"] = el?.name;
          container["id"] = el?._id;
          return container;
        })
      : [{ custom: true }];
  console.log(trackInfo, "trackinfo");
  const handleUpdateData = (e) => {
    setUpdateData(e.target.value);
  };
  const handleUpdateOption = async () => {
    try {
      const res = await updateOptionApi({ id: editData.id, name: updateData });
      if (res.status === 200 || res.status === 201) {
        toast.success(res.data.message);
        setToggleEdit(false);
        getSymptomData(editData.id);
      }
      console.log(res, "fdajsdjfkadsjflkjdas");
    } catch (err) {
      console.log(err);
    }
  };

  const getSymptomData = async (id) => {
    setstate([
      {
        name: "Loading ....",
        _id: "",
      },
    ]);
    setTimeout(async () => {
      if (id) {
        setOptionId(id);
        try {
          const res = await getOptionListApiById(id);
          if (res.status === 200 || res.status === 201) {
            manageData(res.data.allOptions);
            setstate(res.data.allOptions);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }, 500);
  };
  const getRooms = async () => {
    try {
      const response = await getRoomsApi();
      setAllRooms(response?.data?.allRooms);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (id, name) => {
    setRoomInfoName(name);
    setRoomInfoId(id);
  };

  const handleDelete = async (id) => {
    try {
      if (id) {
        const response = await deleteRoomApi({ id });
        if (response.status === 200 || response.status === 201) {
          toast.success(response?.data?.message);
          modalq.click();
          setRoomInfoId("");
          setRoomInfoName("");
          getRooms();
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getServices = async () => {
    const response = await getServiceApi();
    setAllServices(response?.data?.allServices);
  };






  const handleSearchFilter = async () => {
    if (search.fromDate && search.toDate) {
      try {
        const res = await getAllAppontmentsApi(search.fromDate, search.toDate,"","");
        console.log(res, "response by firlter api  kdfiysdi");
        setAvaliableSlots(res?.data?.appointment);
      } catch (err) {
        toast.error(err);
      }
    } else {
      toast.error("Please choose dates first.",{id:"003"});
    }
  };

  const getAllSotsData = async()=>{
    try{
      const res = await getAllAppontmentsApi();
      if(res.status === 200 || res.status === 201){
        setAvaliableSlots(res.data.appointment);
        console.log(res?.data?.appointment,"SDFADSFAFDASDFSDAFSADF")
      }
    }catch(err){
      console.log(err);
    }
  }

  const getAllOptions = async () => {
    try {
      const res = await getAllOptionsApi();
      if (res.status === 200 || res.status === 201) {
        setAllOptions(res?.data?.allDropDownModel);
        const d = res?.data?.allDropDownModel?.map((v) => {
          return v._id + ")" + v.name;
        });
        setIds(d);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getScheduleDetails = async () => {
    try {
      const res = await getScheduleDetailsApi();
      if (res?.status === 200 || res?.status === 201) {
        console.log(res, "data form schedule");
        setHoliday(res?.data?.schedule?.holidays);
        // getFilteredHoliday(res?.data?.schedule?.holidays);
        setAid(res?.data?.schedule?._id);
      }
    } catch (err) {
      console.log(err);
    }
  };


//   const getFilteredHoliday =(holiday)=>{
//     // const arrayOfDates = holiday.map(obj => obj.date);
//     // console.log(arrayOfDates,"hillloo")
//     const arrayOfFormattedDates = holiday?.map(obj => {
//       const date = new Date(obj.date);
//       const options = {
//           weekday: 'short',
//           month: 'short',
//           day: '2-digit',
//           year: 'numeric',
//           hour: '2-digit',
//           minute: '2-digit',
//           second: '2-digit',
//           timeZoneName: 'short'
//       };
//       const formattedDate = date?.toLocaleString('en-US', options);
//       console.log(date ,"foorr")
//       // setExcludeDate(formattedDate)
//       return formattedDate;
//   });
//   setExcludeDate(arrayOfFormattedDates)
  
// }


  useEffect(() => {
    getScheduleDetails();
  }, []);

  useEffect(() => {
    getAllSotsData();
    getRooms();
    getServices();
    // getAllOptions();
  }, []);


 

  return (
    <>
      <main className="py-6 bg-surface-secondary">
        <div className="container-fluid">
          <ul className="nav nav-tabs overflow-x">
          <li className="nav-item">
              <a
                href="#calendar"
                data-bs-toggle="tab"
                className="nav-link active"
              >
                Calendar
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#consultation"
                data-bs-toggle="tab"
                className="nav-link"
              >
                Consultation
              </a>
            </li>
            <li className="nav-item">
              <a href="#examination" data-bs-toggle="tab" className="nav-link">
                Examination
              </a>
            </li>
            <li className="nav-item">
              <a href="#myschedule" data-bs-toggle="tab" className="nav-link">
                My Schedule
              </a>
            </li>
            <li className="nav-item">
              <a href="#billing" data-bs-toggle="tab" className="nav-link">
                Services
              </a>
            </li>
            {/* <li className="nav-item">
              <a href="#billingss" data-bs-toggle="tab" className="nav-link">
                Billing Information
              </a>
            </li> */}
          </ul>
          <div className="card rounded-top-0">
            <div className="card-header">
              <div className="tab-content">
              <div className="tab-pane active" id="calendar">
            <div className="row">
              <div className="col-md-6">
              <label htmlFor="Track" className="font-w">Track Patient</label>
              <div onClick={() => getSymptomData(dropdownIds.TRACKPATIENT)}>
              <Select
                          value={trackPatient}
                          components={{ Option: CustomOption }}
                          options={options1}
                          onChange={(e) => handleInputChange(e, "trackPatient")}
                        />
                        </div>
              </div>
              <div className="col-md-6"></div>
            </div>
            <div className="mt-5">
            <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseFour"
                          aria-expanded="false"
                          aria-controls="collapseFour"
                        >
                          <h4>Appointments</h4>
                        </button>
                      </h2>
                      <div
                        id="collapseFour"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingFour"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <div>
                            <div className="d-flex align-items-center">
                              <h5 className="pe-3">From</h5>
                              <input
                                type="date"
                                className="form-control"
                                value={search.fromDate}
                                onKeyDown={(e)=>e.preventDefault()}
                                onChange={(e) => {
                                  setSearch({
                                    toDate:"",
                                    fromDate: e.target.value,
                                  });
                                }}
                              />
                              <br />
                              <h5 className="pe-3 ps-3">To</h5>
                              <input
                                type="date"
                                className="form-control"
                                value={search.toDate}
                                onKeyDown={(e)=>e.preventDefault()}
                                min={`${search.fromDate}`}
                                onChange={(e) => {
                                  setSearch({
                                    ...search,
                                    toDate: e.target.value,
                                  });
                                }}
                              />
                            
                              <button
                                className="btn btn-primary border-base  ms-3"
                                onClick={handleSearchFilter}
                              >
                                Search
                              </button>
                              <button
                                className="btn btn-primary border-base  ms-3"
                                onClick={handlePrint}
                              >
                                Print
                              </button>
                            </div>
                            <table className="table print-t" ref={componentRef}>
                              <thead>
                                <tr align="center">
                                  <th scope="col" style={{textAlign:"left"}}>Patients Name</th>
                                  <th scope="col">Date</th>
                                  <th scope="col">Time</th>
                                  <th scope="col">Day</th>
                                  <th scope="col">Rooms</th>
                                  <th scope="col">Service Name</th>
                           
                                  <th scope="col">Booked</th>
                                  <th scope="col">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {availableSlots?.length ? (
                                  availableSlots?.map((v) => {
                                    return (
                                      <tr>
                                        <td scope="row">
                                          <p className="text-right">
                                            {v?.patientId?.firstName
                                              ? v.patientId?.firstName +
                                                " " +
                                                v.patientId?.lastName
                                              : "-"}
                                          </p>
                                        </td>
                                        <td scope="row">
                                          <p className="text-center">
                                            {v.startTime?.split("T")[0]?.split("-").reverse().join("/")}
                                          </p>
                                        </td>
                                        <td scope="row">
                                          <p className="text-center">
                                            {/* {formatDate(
                                              `January 04, 2011 ${v.time}:00`
                                            )} */}
                                            {moment(v?.startTime).format('MMMM Do YYYY, h:mm a')?.split(" ")[3]+ " - "+ moment(v?.endTime).format('MMMM Do YYYY, h:mm a')?.split(" ")[3]}
                                          </p>
                                        </td>
                                        {console.log(v,"ASDFJSDKFDSKFSDKFKDSFK")}
                                        <td scope="row">
                                          <p className="text-center">
                                            {getFormattedDate(
                                              new Date(`${v.startTime?.split("T")[0]}`)
                                            )}
                                          </p>
                                        </td>
                                        <td scope="row">
                                          <p className="text-center">
                                            {v?.roomId?.roomName}
                                          </p>
                                        </td>
                                        <td scope="row">
                                          <p className="text-center">
                                            {v?.serviceId?.serviceName}
                                          </p>
                                        </td>
                                        
                                        <td scope="row">
                                          <p className="text-center">
                                            {"Yes"}
                                          </p>
                                        </td>

                                        <td scope="row">
                                          <p className="text-center">
                                            <span
                                              style={{ cursor: "pointer" }}
                                              data-bs-toggle="dropdown"
                                              aria-expanded="false"
                                            >
                                              :
                                            </span>
                                            <ul className="dropdown-menu">
                                              <li style={{ cursor: "pointer" }}>
                                                <span
                                                  className="dropdown-item"
                                                  data-bs-toggle="modal"
                                                  data-bs-target="#exampleModalj"
                                                  onClick={() =>
                                                    setSelectId(v._id)
                                                  }
                                                >
                                                  Delete
                                                </span>
                                              </li>
                                              <li style={{ cursor: "pointer" }}>
                                              <Link to={`/patients/profile`} state={{
                                                "id": v?._id ,"patientId":v?.patientId?._id
                                              }}>
                                                <span
                                                  className="dropdown-item"
                                                  // onClick={() =>
                                                  //   navigate(
                                                  //     `/patients/visits/${v._id}`
                                                  //   )
                                                  // }
                                                >
                                                  Go to Visit
                                                </span>
                                                </Link>
                                              </li>
                                            </ul>
                                          </p>
                                        </td>
                                      </tr>
                                    );
                                  })
                                ) : (
                                  <tr align="center">
                                    <td colspan="8">
                                      {" "}
                                      <h5> No record found!</h5>
                                    </td>{" "}
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div></div>
            </div>

                <div className="tab-pane" id="consultation">
                 <ConsultationDropDown />
                </div>
                <div className="tab-pane fade" id="examination">
                  <ExaminationDropdown />
                </div>
                <div className="tab-pane fade" id="myschedule">
                  <div className="accordion" id="accordionExample">
                   
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingTwo">
                        <button
                          className="accordion-button "
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                          onClick={() => handleServices("rooms")}
                        >
                          <h4>Rooms</h4>
                          {toggleRooms ? (
                            <button
                              type="button"
                              className="btn btn-sm  btn-primary coll-add-btn"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModaltwow"
                            >
                              Add
                            </button>
                          ) : (
                            ""
                          )}
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <table className="table">
                            {allRooms?.length ? (
                              <thead>
                                <tr>
                                  <th>
                                    <b>Name</b>
                                  </th>
                                  <th></th>
                                  <th></th>
                                  <th></th>
                                </tr>
                                {allRooms?.length &&
                                  allRooms?.map((val) => {
                                    return (
                                      <tr>
                                        <td>{val.roomName}</td>
                                        <td></td>
                                        <td></td>
                                        <td className="text-end">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-neutral"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModaltwow"
                                            onClick={() =>
                                              handleEdit(val._id, val.roomName)
                                            }
                                          >
                                            Edit
                                          </a>
                                          <button
                                            type="button"
                                            data-bs-toggle="modal"
                                            data-bs-target="#confirmPopups"
                                            className="btn btn-sm btn-square btn-neutral text-danger-hover"
                                            onClick={() =>
                                              handleEdit(val._id, val.roomName)
                                            }
                                          >
                                            <i className="bi bi-trash"></i>
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  })}
                              </thead>
                            ) : (
                              "No Rooms Available."
                            )}
                          </table>
                        </div>
                      </div>
                    </div>




                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingFive">
                        <button
                          className="accordion-button "
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseFive"
                          aria-expanded="false"
                          aria-controls="collapseFive"
                        >
                          <h4>Clinic Schedule</h4>
                         
                        </button>
                      </h2>
                      <div
                        id="collapseFive"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingFive"
                        data-bs-parent="#accordionExample"
                      >
                        <ClinicSchedule />
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingSix">
                        <button
                          className="accordion-button "
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseSix"
                          aria-expanded="false"
                          aria-controls="collapseSix"
                          onClick={()=>setToogleHoliday(!toggleHoliday)}
                        >
                          <h4>Holidays</h4>
                          {
                            toggleHoliday ? "":<button
                            type="button"
                            className="btn btn-sm  btn-primary coll-add-btn"
                            data-bs-toggle="modal"
                            data-bs-target="#holiday"
                            
                          >
                            Add
                          </button>
                          }
                          
                        </button>
                      </h2>
                      <div
                        id="collapseSix"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingSix"
                        data-bs-parent="#accordionExample"
                      >
                        <Holidays holiday={hoiday} getScheduleDetails={getScheduleDetails} />
                      </div>
                    </div>

                    


                   
                  </div>
                </div>
                {/* Billing tab code start here...  */}
                <div className="tab-pane fade" id="billing">
                 <Service/>
                 </div>
                {/* Billing Tab code end here...  */}
                <div className="tab-pane fade" id="billingss">
                  {/* <ExaminationDropdown /> */}
                  <BillingTax/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* add option modal start here  */}
      {Boolean(viewModal) && (
        <Addoption
          setFunction={setViewModal}
          setAddData={setAddData}
          addData={addData}
          getAllOptions={getAllOptions}
        />
      )}

      {/* ---- Service Modale code start here--- */}
      

      {/* --- rooms Modale code start here--- */}
      <div
        className="modal fade"
        id="exampleModaltwow"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <RoomModal
          id={roomInfoId}
          name={roomInfoName}
          getData={getRooms}
          setRoomInfoName={setRoomInfoName}
          setFunctions={setRoomInfoId}
          modal={modal}
        />
      </div>

      <div
        className="modal fade"
        id="confirmPopups"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close btn-close-con-form"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-12">
                  <p>
                    Are you sure want to delete <b>{roomInfoName}</b> ?
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer justify-content-end">
              <button
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                className="btn btn-primary"
              >
                No
              </button>
              <button
                type="button"
                onClick={() => handleDelete(roomInfoId)}
                className="btn btn-primary"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* rooms modal code end here */}

      {/* Slots action modal popup code start here */}
      <div
        className="modal fade"
        id="exampleModalj"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close btn-close-con-form"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-12">
                  <p>Are you sure want to delete this slot ?</p>
                </div>
              </div>
            </div>
            <div className="modal-footer justify-content-end">
              <button
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                className="btn btn-primary"
              >
                No
              </button>
              <button
                type="button"
                onClick={() => handleDeleteSlot(selectId)}
                className="btn btn-primary"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Slots action modal popup code end here */}
      <div
          className="modal fade"
          id="holiday"
          tabIndex={-1}
          aria-labelledby="addpatient"
          aria-hidden="true"
        >
          <HolidayModal aId={aId} holiday={hoiday} modals={modals} getScheduleDetails={getScheduleDetails} excludeDate={excludeDate}/>
        </div>
     
{/* Add amount modal popup code start here  */}
{toggle && (
        <div
          className="modal"
          id="exampleModalsym"
          style={{ display: "block" }}
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header pt-3 pe-3">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body pb-3 pt-3">
                <label className="form-label" htmlFor="opt">
                  Add Option
                </label>
                <input
                  type="text"
                  value={addData}
                  onChange={handleAddData}
                  className="form-control"
                />
                <span style={{ color: "red" }}>{errormsg}</span>
              </div>
              <div className="modal-footer justify-content-end">
                <button
                  type="button"
                  onClick={handleSubmitOption}
                  className="btn btn-sm btn-primary"
                  disabled={trackLoader}
                >
                  {trackLoader ? <WhiteLoader /> :"Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {toggleEdit && (
        <div
          className="modal"
          id="exampleModalsym"
          style={{ display: "block" }}
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header pt-3 pe-3">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body pb-3 pt-3">
                <label className="form-label" htmlFor="opt">
                  Edit Option
                </label>
                <input
                  type="text"
                  value={updateData}
                  onChange={handleUpdateData}
                  className="form-control"
                />
                <span style={{ color: "red" }}>{errormsg}</span>
              </div>
              <div className="modal-footer justify-content-end">
                <button
                  type="button"
                  onClick={handleUpdateOption}
                  className="btn btn-sm btn-primary"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

)}
{/* Add amount modal popup code end here  */}

    </>
  );
};

export default SystemSettings;
