import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import FunctionalExamination from "../Examination/FunctionalExamination";
import DatePicker from 'react-date-picker';
import { InputErrorMessage } from '../../Components/common/Errors';
import Treatments from "../Examination/Treatments";
import Select from "react-select";
// import { postVisitesdaetails, getSinglePatientDetailsById, getConsultationsApiByPatientId, getConsultationsApiById, getAllPatientsDetails } from "../../Apis/index"
import { postVisitesdaetails, getSinglePatientDetailsById, getConsultationsApiByPatientId, getConsultationsApiById, getAllPatientsDetails } from '../../../Apis/healthcareProvider';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { appointmentValidation } from '../../Components/Schemas';
import { updateSlotApi,updateSlotApiData,postSlotApiData,getAllAppontmentsApi,getServiceByIdApi,getRoomsApi,getServiceApi } from '../../../Apis/healthcareProvider';
import moment from 'moment/moment';
const Visit = ({patientId,examId}) => {
  const [NewpatientId, setNewpatientId] = useState(patientId)
  const [singlePatientData, setSinglePatientData] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const [description, setDescription] = useState("");
  const [allBookedSlots, setAllBookedSlots] = useState([]);
  const [clrr, setClrr] = useState("#ffff");
  const [isEdit, setIsEdit] = useState(false);
  const [timeview, setimeView] = useState(true);
  const [allRooms, setAllRooms] = useState([]);
  const [opData, setOpData] = useState();
  const [visitDate,setVisitDate]=useState(new Date().toLocaleDateString()?.split("/")?.reverse()?.join("-"))
  const [time, setTime] = useState({
    time: "",
    date: "",
  });
  const [note, setNote] = useState("");
  const location = useLocation();
  const navigate=useNavigate()
  const modal = document.getElementById("appointment");
  console.log(location,patientId, "SFEFSFDSERESF")
  console.log(patientId,"patijnfaiutseiufjnf")
  const {
    values,
    errors,
    touched,
    setValues,
    handleSubmit,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues: {
      patientName: "",
      serviceType: "",
      startTime: "",
      endTime: "",
      appointmentType: "",
      duration: "",
      room: "",
      repeat: "",
      id: "",
      date: "",
    },
    validationSchema: appointmentValidation,
    onSubmit: async (val) => {
      let { value } = val.serviceType;
      let data = {
        patientId: val.patientName,
        serviceId: value,
        roomId: val.room,
        startTime:  values.startTime,
        endTime: val.endTime,
        appointmentType: val.appointmentType,
        appointmentFreq: val.repeat,
      };
      if (data) {
        const res = isEdit
          ? await updateSlotApiData({ ...data, id: values.id })
          : await postSlotApiData(data);
        if (res.status === 200 || res.status === 201) {
          toast.success(res.data.message);
          modal.click();
          setClrr("#ffff");
          setIsEdit(false);
          getAllAppointments();
        }
      }
    },
  });

  const getAllAppointments = async () => {
    try {
      const res = await getAllAppontmentsApi();
      if (res.status === 200 || res.status === 201) {
        setAllBookedSlots(res.data?.appointment);
      }
    } catch (Err) {
      console.log(Err);
    }
  };
  const handleDateView = (e) => {
    setimeView(false);
    // setFieldValue("date", e.target.value)
    setTime({ time:"", date: e.target.value });
    setFieldValue("endTime","");
    setFieldValue("startTime","");
    setFieldValue("duration","");
  };
  const visitID =  location.state.id ; 
  const pId = location.state.patientId; 

  const isValidDate = () => {
    return new Date().toLocaleDateString()?.split("/").reverse().join("-");
  };

  const handleStartTime = (date) => {
    
    setTime({ ...time, time: date });
     let d = new Date(date)
     d.setDate(time?.date?.split("-")[2])
     d.setMonth((time?.date?.split("-")[1]-1))
     d.setFullYear(time?.date?.split('-')[0])
     setFieldValue("startTime", d);
    //  setSendTime(d);
    setFieldValue("endTime", "");
  };
  const handleDuration = (e) => {
    setFieldValue("duration", e.target.value);
    const startTime = new Date(time?.time).toLocaleTimeString();
    const durationInMinutes = e.target.value;
    
    const endTime = moment(startTime, 'HH:mm:ss').add(durationInMinutes, 'minutes').format('HH:mm');

    const d = new Date(time?.date);
    d.setHours(endTime?.split(":")[0])
    d.setMinutes(endTime?.split(":")[1])
    
    setFieldValue("endTime",d)

 
 

  // var hours = Math.floor(e.target.value / 60);
  // var minutes = e.target.value % 60;
  // getEndTime(hours,minutes);
  // console.log(hours + ":" + minutes,"TITTITITITITITTI");
};
const handleServiceChange = async (e) => {
  setFieldValue("serviceType", e);
  if (e) {
    const res = await getServiceByIdApi(e?.value);
    if (res.status === 200 || res.status === 201) {
      setFieldValue("duration", res?.data?.service?.duration);
      setDescription(res?.data?.service?.serviceDescp);
    }
  }
};
const handleEndDate = (date) => {
  setFieldValue("endTime", date);
};
const handleClrrChange = (e) => {
  let val = e.target.value;
  // if (isEdit) {
  //   val = e;
  // } else {
  //   val = e.target.value;
  // }
  setFieldValue("appointmentType", e.target.value);
  switch (val) {
    case "New":
      setClrr("#e71ae1");
      break;
    case "Reschedule":
      setClrr("#aac4e9");
      break;
    case "Cancelled":
      setClrr("#c5401d");
      break;
    case "Consultation":
      setClrr("#68b04c");
      break;
    case "Regular":
      setClrr("#d7bb58");
      break;
    default:
      setClrr("#ffff");
  }
};

  console.log(visitID,"FDDFDFDFDFDFDF")
  const handleSelectChange = async (e) => {
    console.log(e,"EERERERERERERERE")
    if (e?.target?.value || e) {
      let GetId = e?.target?.value ? e?.target?.value : e;
      const res = await getSinglePatientDetailsById(GetId);
      if (res.status === 200 || res.status === 201) {
        setNewpatientId(res?.data?.patient?._id);
        setSinglePatientData(res?.data?.patient);
      }
      if (res?.data?.patient?._id) {
        const responseConsulting = await getConsultationsApiByPatientId(res?.data?.patient?._id);
        if (responseConsulting?.data?.consultationArr[0]?._id) {
          const getsingleconsulting = await getConsultationsApiById(responseConsulting?.data?.consultationArr[0]?._id);
          setWarnings(getsingleconsulting?.data?.symptomsArr)
        }

      }
    }
  };
  
  const getRooms = async () => {
    try {
      const res = await getRoomsApi();
      if (res.status === 200 || res.status === 201) {
        setAllRooms(res?.data?.allRooms);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getServices = async () => {
    try {
      const res = await getServiceApi();
      if (res.status === 200 || res.status === 201) {
        setAllServices(res?.data?.allServices);
        filterServices(res?.data?.allServices);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllPatient = async () => {
    const res = await getAllPatientsDetails();
    if (res.status === 200 || res.status === 201) {
      setPatientList(res.data.allPatients);
    }
  };
  const filterServices = (data) => {
    console.log(data,"SASTRDHFFATYADAAFD")
    const categories = data
      ?.map((v) => v?.categoryId._id)
      .filter((v, i, a) => a.indexOf(v) === i);
    const newArray = categories?.map((c) => ({
      categoryId: c,
      label: data.find((d) => d.categoryId._id === c).categoryId.name,
      options: data
        .filter((d) => d.categoryId._id === c)
        .map((a) => ({
          // ...a,
          label: a.serviceName,
          value: a._id,
        })),
    }));
    
    // const filterData =  newdata?.filter((item,index) => newdata.indexOf(item) === index)
    // const newArray =  filterData?.map(category=>({label:category, options : data.map((v)=>{
    //   if(v.categoryId.name === category){
    //       return { label:v.serviceName,value:v.serviceName}
    //   }
    // }) }))
    setOpData(newArray);
  };

  const handleCloseEditModal = () => {
    setIsEdit(false);
    setClrr("#ffff");
    setValues({
      patientName: "",
      serviceType: "",
      startTime: "",
      endTime: "",
      appointmentType: "",
      duration: "",
      room: "",
      repeat: "",
      id: "",
    });
  };
  useEffect(() => {
    handleSelectChange(pId)
  }, [pId])


  useEffect(() => {
    getAllPatient();
  }, []);
  useEffect(() => {
    getRooms();
    getServices();
  
  }, []);
  // useEffect(() => {
  //   if (Boolean(currentDate?.from) && Boolean(currentDate?.to))
  //     getallBookedSlot("", currentDate.from, currentDate.to);
  // }, [currentDate]);

  
  useEffect(() => {
    getAllAppointments();
  }, []);
  const formik1 = useFormik({
    initialValues: {
      SI: { low: false, position: { left: false, right: false }, cm: "" },
      ProneCrest: {
        hieght: false,
        position: { left: false, right: false },
        cm: "",
      },
      Crom: {
        FLX: { Dec: false, Inc: false, Normal: false, Deg: "" },
        EXT: { Dec: false, Inc: false, Normal: false, Deg: "" },
        RLB: { Dec: false, Inc: false, Normal: false, Deg: "" },
        LLB: { Dec: false, Inc: false, Normal: false, Deg: "" },
        PROT: { Dec: false, Inc: false, Normal: false, Deg: "" },
        LROT: { Dec: false, Inc: false, Normal: false, Deg: "" },
      },
      TMJ: { step1: "", step2: "", step3: "" },
      Notes: "",
      Listings: { L1: "", L2: "", L3: "" },
      Adams: {
        FixedSI: { position: { left: false, right: false }, BLT: false },
        Free: { position: { left: false, right: false }, BLT: false },
        Lumb: { position: { left: false, right: false }, Deg: "", Neg: false },
        Thor: { position: { left: false, right: false }, Deg: "", Neg: false },
      },
      shoulderForm: [
        { testName: "", left: "", Pn: false, right: "", Rn: false },
      ],
    },
    onchange: async (val) => {
    },
  });
  const formik4 = useFormik({
    initialValues: {
      shoulderOption: [{ left: "", leftValue: "", right: "", rightValue: "" }],
      adjacent: false,
      Scoliosis: false,
      Distraction: false,
      exam: false,
      DC: {
        name: "",
        cervical: "",
        lumber: "",
        thoracic: "",
        extermity: "",
      },
      HP: {
        name: "",
        cervical: "",
        lumber: "",
        thoracic: "",
        extermity: "",
      },
      Kinesiotaping: {
        name: { tspine: false, lspine: false, both: false },
        kinesiotapingPosition: [{ left: "", right: "" }],
        treatmentPlan: { asNeed: false, time: false },
        treatmentFrequency: {
          treatmentRight: "",
          treatmentLeft: "",
          frequency: "",
          duration: "",
        },
        nextAppointments: {
          first: "",
          second: "",
          third: "",
        },
      },
    },
    onSubmit: async (val) => {
      let visitdata = {dailyNote: note, treatments: val,date:visitDate , functional: formik1?.values, "appointmentId": visitID , examinationId:examId,patientId:pId}

      try {
        const visitres = await postVisitesdaetails(visitdata)
        if (visitres?.status == 201 || visitres?.status === 200) {
          toast.success(visitres?.data?.message);
          navigate("/VisitDetailsView" ,{state:{patientId:pId , visitId:visitres?.data?.visitDetail?._id}} )
        }

      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message)

      }
    },
  });
  return (
    <>
<div className='card my-3'>
<div
   
   className="modal"
   id="appointment"
   tabindex="-1"
   aria-labelledby="appointment"
   aria-hidden="true"
 >
   <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title fs-5" id="exampleModalLabel">
                New Appointment
              </h4>
              <button
                style={{ fontSize: ".7rem" }}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseEditModal}
              ></button>
            </div>
            <hr style={{ marginBottom: "0px" }} />
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-12">
                    <label htmlFor="patient" className="font-w">
                      Patient Name
                    </label>
                    <select
                      disabled={isEdit}
                      id="patient"
                      name="patientName"
                      value={values?.patientName}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="" hidden>
                        Patient name
                      </option>
                      {patientList?.length &&
                        patientList?.map((v) => {
                          return (
                            <option value={v._id}>
                              {v.firstName + " " + v.lastName}
                            </option>
                          );
                        })}
                    </select>
                    <InputErrorMessage
                      error={touched.patientName && errors.patientName}
                      marginBottom={-15}
                    />
                  </div>
                  <div className="col-lg-3 mt-3">
                    <label htmlFor="date" className="font-w">
                      Date
                    </label>
                    <input
                      className="form-control"
                      type="date"
                      name="date"
                      value={time?.date}
                      onChange={handleDateView}
                      onKeyDown={(e)=>e.preventDefault()}
                      min={isValidDate()}
                      max="9999-01-01"
                      id="date"
                    />
                  </div>
                  <div className="col-lg-3 mt-3">
                    <div className="form-group">
                      <label className="font-w" htmlFor="time-select">
                        Start Time
                      </label>
                      
                      <DatePicker
                        disabled={timeview}
                        selected={time?.time}
                        onChange={handleStartTime}
                        showTimeSelect
                        className="form-control"
                        showTimeSelectOnly
                        placeholderText="select time"
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="hh:mm:ss"
                      />
                 <InputErrorMessage
                      error={touched.startTime && errors.startTime}
                      marginBottom={-15}
                    />
                    </div>
                  </div>

                  <div className="col-lg-3 mt-3">
                    <label htmlFor="" className="font-w">
                      Duration{" "}
                      <span
                        style={{
                          fontSize: "15px",
                          fontWeight: "100 !important",
                        }}
                      >
                        {" "}
                        (in minutes)
                      </span>
                    </label>
                    <input
                      className="form-control"
                      disabled={!Boolean(time.time)}
                      style={{ fontSize: ".95rem" }}
                      value={values?.duration}
                      name="duration"
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      type="text"
                      onChange={handleDuration}
                      // value={getDuration(values?.startTime, values?.endTime) + ":00"}
                    />
                    <InputErrorMessage
                      error={touched.duration && errors.duration}
                      marginBottom={-15}
                    />
                  </div>
                  <div className="col-lg-3 mt-3">
                    <div className="form-group">
                      <label className="font-w">End Time </label>
                      {/* <input className="form-control" type="time" id="time-select" value={selectedTimeend} onChange={handleTimeChangeend} /> */}
                      <DatePicker
                        // disabled={Boolean(!values?.startTime)}
                        disabled
                        selected={values?.endTime}
                        onChange={handleEndDate}
                        showTimeSelect
                        className="form-control"
                        showTimeSelectOnly
                        placeholderText="select time"
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="hh:mm:ss"
                        // minTime={
                        //   values?.startTime ? values?.startTime : new Date()
                        // }
                        // maxTime={setHours(setMinutes(new Date(), 700), 24)}
                      />
                    
                      <InputErrorMessage
                        error={touched?.endTime && errors?.endTime}
                        marginBottom={-15}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 mt-3">
                    <label htmlFor="service" className="font-w">
                      Service Type
                    </label>
                    <Select
                      // isMulti
                      name="serviceType"
                      options={opData}
                      value={values?.serviceType}
                      onChange={handleServiceChange}
                      // isClearable={true}
                      placeholder="select"
                      isOptionDisabled={(option) => option.disabled}
                    />
                   
                    <InputErrorMessage
                      error={touched.serviceType && errors.serviceType}
                      marginBottom={-15}
                    />
                  </div>
                  <div className="col-lg-6 mt-3">
                    <label htmlFor="patient" className="font-w">
                      Select Room
                    </label>
                    <select
                      className="form-select"
                      name="room"
                      disabled={isEdit}
                      value={values.room}
                      onChange={handleChange}
                    >
                      <option value="" hidden>
                        Select Room
                      </option>
                      {allRooms?.map((v) => {
                        return <option value={v._id}>{v?.roomName}</option>;
                      })}
                    </select>

                    <InputErrorMessage
                      error={touched.room && errors.room}
                      marginBottom={-15}
                    />
                  </div>

                  <div className="col-lg-6 mt-3">
                    <label htmlFor="repeat" className="font-w">
                      Appointment Type
                    </label>
                    <select
                      name="appointmentType"
                      value={values.appointmentType}
                      onChange={handleClrrChange}
                      id="repeat"
                      style={{ backgroundColor: `${clrr}` }}
                      className="form-select"
                    >
                      <option hidden>Select</option>
                      <option value="New" style={{ backgroundColor: "#ffff" }}>
                        New
                      </option>
                      <option
                        value="Reschedule"
                        style={{ backgroundColor: "#ffff" }}
                      >
                        Reschedule
                      </option>
                      <option
                        value="Cancelled"
                        style={{ backgroundColor: "#ffff" }}
                      >
                        Cancelled
                      </option>
                      <option
                        value="Consultation"
                        style={{ backgroundColor: "#ffff" }}
                      >
                        Consultation
                      </option>
                      <option
                        value="Regular"
                        style={{ backgroundColor: "#ffff" }}
                      >
                        Regular
                      </option>
                    </select>
                    <InputErrorMessage
                      error={touched.appointmentType && errors.appointmentType}
                    />
                  </div>
                
                  <div className="col-lg-12 mt-3">
                    <label>
                      {description ? (
                        <>
                          {" "}
                          <span className="font-w" style={{ color: "#ff3366" }}>
                            Service Description :
                          </span>{" "}
                          <span style={{ fontSize: "small" }}>
                            {" "}
                            {description}
                          </span>
                        </>
                      ) : (
                        " "
                      )}
                    </label>
                  </div>
                  <div className="col-lg-12 mt-3">
                    <label htmlFor="" className="font-w">
                      {}
                    </label>
                  </div>
                  <div className="col-lg-12 d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary mt-3">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
 </div>
 <div className="row">
          <div className="col-lg-12">
            <label className="sy-lf-rt-bt" htmlFor="date">
              Visit Date
            </label>
            <input
              className="form-control"
              type="date"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              name=""
              id=""
            />
          </div>
          <div className="col-lg-12 mt-5">
            <textarea
              name=""
              id=" "
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="form-control"
              cols="60"
              rows="5"
              placeholder="Please add daily note here ..."
            ></textarea>
          </div>
        </div>
      <FunctionalExamination formik1={formik1} />
      <Treatments visit="true" formik4={formik4} />
</div>


    </>
  )
}
export default Visit