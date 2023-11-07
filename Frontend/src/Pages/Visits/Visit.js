import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import FunctionalExamination from "../Examination/FunctionalExamination";
import Treatments from "../Examination/Treatments";
import {
  postVisitesdaetails,
  getSinglePatientDetailsById,
  getConsultationsApiByPatientId,
  getConsultationsApiById,
  getAllPatientsDetails,
  getAllAppontmentsApi,
  getServiceByIdApi,
  getRoomsApi,
  getServiceApi,
  getScheduleDetailsApi,
} from "../../Apis/index";
import toast from "react-hot-toast";
import Select from "react-select";
import { addMinutes, setHours, setMinutes } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";
import { appointmentValidation } from "../../Components/Schemas";
import {
  postSlotApiData,
  updateSlotApiData,
} from "../../Apis/healthcareProvider";
import { InputErrorMessage } from "../../Components/common/Errors";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
const Visit = ({ patientId, examId, appointmentId }) => {
  const [NewpatientId, setNewpatientId] = useState(patientId);
  const [singlePatientData, setSinglePatientData] = useState([]);
  const [serviceErr, setServiceErr] = useState("");
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
  const [note, setNote] = useState("");
  const [validDuration, setValidDuration] = useState(0);
  const [pdata, setPData] = useState(null);
  const [toggleAppointment, setToggleAppointment] = useState(true);
  const [op, setOp] = useState([]);
  const [regularP, setRegularP] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [validTime, setValidTime] = useState([]);
  const [timeValidation, setTimeValidation] = useState({
    startTime: "",
    endTime: "",
  });
  const [visitDate, setVisitDate] = useState(
    new Date().toLocaleDateString()?.split("/")?.reverse()?.join("-")
  );
  const [exTime, setExTime] = useState([]);
  const [scheduleInfo, setScheduleInfo] = useState();
  const [time, setTime] = useState({
    time: "",
    date: "",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const modal = document.getElementById("appointment");
  console.log(location, patientId, "SFEFSFDSERESF");
  console.log(note, "patijnfaiutseiufjnf");
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
        startTime: values.startTime,
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

  console.log( patientId, examId, appointmentId ,"payloaaddata")
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
  const checkAvailableAppointment = async (date, roomId) => {
    let availableSlotTime = [];
    let valid = [];
    try {
      const res = await getAllAppontmentsApi(date, "", "", "");
      if (res.status === 200 || res.status === 201) {
        console.log(res.data.appointment, "apointment");
        let p = res?.data?.appointment?.filter((v) => v.roomId._id === roomId);
        p?.filter((a) => {
          availableSlotTime?.push({
            startTime: new Date(a?.startTime),
            endTime: new Date(a?.endTime),
          });
          // setExTime([...exTime , {startTime: new Date(a?.startTime) , endTime:a?.endTime}])
          let dur = Math.round(
            (new Date(a?.endTime).getTime() -
              new Date(a?.startTime).getTime()) /
              60000
          );
          let o = Math.round(dur / 10);
          let t = [{ startTime: new Date(a.startTime) }];
          const date = new Date(a?.startTime);
          for (let i = 1; i < o; i++) {
            let result2 = addMinutes(date, 10 * i);
            console.log(result2, "resulte");
            t.push({ startTime: result2 });
            // exTime.push({startTime:result2})
          }
          // setExTime([...exTime , t])
          // setValidTime(t)
          console.log(t, "validatime");
          valid.push(t);
        });
      }
    } catch (err) {
      console.log(err);
    }

    let combinedArray = valid.reduce(
      (result, subarray) => result.concat(subarray),
      []
    );
    console.log(combinedArray, "VALID");
    setValidTime(combinedArray);
    // let r = [];
    // availableSlotTime?.map((v) => {
    //   console.log(new Date(v.startTime).toLocaleTimeString(), "slottime");
    //   r.push(
    //     `setHours(setMinutes(${new Date()}, ${
    //       new Date(v.startTime).toLocaleTimeString().split(":")[1]
    //     }), ${new Date(v.startTime).toLocaleTimeString().split(":")[0]})`
    //   );
    // });
    setExTime(availableSlotTime);

    // let availableSlotTime=[] ;
    // let d = allBookedSlots?.filter((a)=>{
    // if(a.startTime?.split("T")[0] == date){
    // return a
    // availableSlotTime?.push({startTime:moment(a?.startTime).format('MMMM Do YYYY, h:mm a')?.split(" ")[3] ,endTime:a?.endTime?.split("T")[1]})
    // availableSlotTime?.push({startTime:new Date(a?.startTime) ,endTime:a?.endTime})
    // setExTime([...exTime,{startTime:moment(a?.startTime).format('MMMM Do YYYY, h:mm a')?.split(" ")[3] ,endTime:a?.endTime?.split("T")[1]}])

    // }
    // console.log(exTime,"dateadfkajdksf",availableSlotTime)
    // setExTime(availableSlotTime);
    // })
  };
  const handlePChange = (e) => {
    setPData(e);
    setFieldValue("patientName", e.value);
  };
  const handleNewModal = () => {
    modal.click();
  };
  const handleRoomChange = (e) => {
    setFieldValue("room", e.target.value);
    checkAvailableAppointment(selectedDate, e.target.value);
  };
  const managePatients = (data) => {
    console.log(data, "data");
    let d = [];
    data?.map((v) => {
      d.push({ label: v.firstName + " " + v.lastName, value: v._id });
    });
    setOp(d);
  };
  const getStartTimes = (day) => {
    let t = scheduleInfo.scheduleDetails?.filter((v) => {
      if (v.day == day) {
        return v;
      }
    });
    console.log(t, "timemdamagter");
    // setTimeValidation({startTime:new Date(t?.[0]?.schedule?.[0]?.startTime).toLocaleTimeString() , endTime:new Date(t?.[0]?.schedule?.[0]?.endTime).toLocaleTimeString()})
    // setTimeValidation({
    //   // startTime: moment(t?.[0]?.schedule?.[0]?.startTime)
    //   //   .format("MMMM Do YYYY, h:mm a")
    //   //   ?.split(" ")[3],
    //   startTime:new Date(t?.[0]?.schedule?.[0]?.startTime).toLocaleTimeString(),
    //   endTime: new Date(t?.[0]?.schedule?.[0]?.endTime).toLocaleTimeString(),
    // });
    setTimeValidation({
      startTime: t?.[0]?.schedule?.[0]?.startTime,
      endTime: t?.[0]?.schedule?.[0]?.endTime,
    });
  };
  const getClinicSchedule = async () => {
    try {
      const res = await getScheduleDetailsApi();
      console.log(res, "respoindshdfaysdufd");
      if (res.status === 200 || res.status === 201) {
        setScheduleInfo(res.data.schedule);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleDateView = (e) => {
    let d = [];
    scheduleInfo?.holidays?.map((v) => {
      d?.push(
        new Date(v?.date).toLocaleDateString().split("/").reverse().join("-")
      );
    });
    let fir = d?.filter((v) => {
      if (v == e.target.value) {
        return true;
      }
    });
    if (fir?.length) {
      toast.error("Holiday! Please select another date.", { id: "0008" });
      setTime({ time: "", date: "" });
    } else {
      // setTime({ time: "", date: e.target.value });
      // setFieldValue("endTime", "");
      // setFieldValue("startTime", "");
      // setFieldValue("duration", "");
      isValidTime(e.target.value);
      setSelectedDate(e.target.value);
      // checkAvailableAppointment(e.target.value);
    }
    // console.log(fir, "sdkfljdaslkfjlasjdflksjadfjdkslajfas");
  };
  const isValidTime = (date) => {
    const val = new Date(date);
    const day = val.getDay();
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let p = [];
    scheduleInfo?.scheduleDetails?.map((v) => {
      v?.schedule?.filter((m) => {
        if (m?.startTime != "") {
          p?.push(v);
          // return m?.startTime
        }
      });
    });

    console.log(p, "POIOPI", dayNames[day]);
    let m = p?.filter((v) => {
      if (v?.day == dayNames[day]) {
        return true;
      }
    });
    if (m?.length) {
      setTime({ time: "", date: date });
      setFieldValue("endTime", "");
      setFieldValue("startTime", "");
      setFieldValue("duration", "");
      getStartTimes(dayNames[day]);
    } else {
      setTime({ time: "", date: "" });
      toast.error("Schedule not found", { id: "007" });
    }
    console.log(dayNames[day], "daycheck", p, "DSFDS", m);
  };
  const visitID = location?.state?.id || appointmentId;
  const pId = location?.state?.patientId || patientId;

 
  const isValidDate = () => {
    return (new Date ()).toLocaleDateString ("fr-CA")
  };
  const handleStartTime = (date) => {
    setTime({ ...time, time: date });
    let d = new Date(date);
    d.setDate(time?.date?.split("-")[2]);
    d.setMonth(time?.date?.split("-")[1] - 1);
    d.setFullYear(time?.date?.split("-")[0]);
    setFieldValue("startTime", d);
    setFieldValue("endTime", "");
    checkDuration(date);
  };
  const handleDuration = (e) => {
    if (e.target.value > validDuration && validDuration !== 0) {
      toast.error(`Appoinment eligible only for ${validDuration} minutes.`, {
        id: "77",
      });
      // setFieldValue("duration", validDuration);
      // getEndTime(120);
      return;
    } else {
      setFieldValue("duration", e.target.value);
      getEndTime(e.target.value);
    }
  };
  const getEndTime = (value) => {
    const startTime = new Date(time?.time).toLocaleTimeString();
    const durationInMinutes = value;
    const endTime = moment(startTime, "HH:mm:ss")
      .add(durationInMinutes, "minutes")
      .format("HH:mm");
    const d = new Date(time?.date);
    d.setHours(endTime?.split(":")[0]);
    d.setMinutes(endTime?.split(":")[1]);
    setFieldValue("endTime", d);
  };
  const handleServiceChange = async (e) => {
    setFieldValue("serviceType", e);
    if (e) {
      const res = await getServiceByIdApi(e?.value);
      if (res.status === 200 || res.status === 201) {
        // setFieldValue("duration", res?.data?.service?.duration);
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

  console.log(visitID, "FDDFDFDFDFDFDF");
  const handleSelectChange = async (e) => {
    console.log(e, "EERERERERERERERE");
    if (e?.target?.value || e) {
      let GetId = e?.target?.value ? e?.target?.value : e;
      const res = await getSinglePatientDetailsById(GetId);
      if (res.status === 200 || res.status === 201) {
        setNewpatientId(res?.data?.patient?._id);
        setFieldValue("patientName", res?.data?.patient?._id);
        setSinglePatientData(res?.data?.patient);
      }
      if (res?.data?.patient?._id) {
        const responseConsulting = await getConsultationsApiByPatientId(
          res?.data?.patient?._id
        );
        if (responseConsulting?.data?.consultationArr[0]?._id) {
          const getsingleconsulting = await getConsultationsApiById(
            responseConsulting?.data?.consultationArr[0]?._id
          );
          setWarnings(getsingleconsulting?.data?.symptomsArr);
        }
      }
    }
  };
  const checkDuration = (date) => {
    // let l = new Date(date)
    // l.setDate(l.getDate() + 1)
    console.log(new Date(date), "abkaljdffiaosdfaksdfisa", exTime, "updaets");

    const durations = exTime
      ?.sort((a, b) => a.startTime - b.startTime)
      ?.map((item) => {
        const startTime = new Date(item.startTime);
        const target = new Date(date);
        const duration = startTime.getTime() - target.getTime(); // Duration in seconds
        return parseInt((duration % (1000 * 60 * 60)) / (1000 * 60));
      });

    console.log(durations, "dutationadfas", exTime);

    let lastNegative = null;

    for (let i = durations.length - 1; i >= 0; i--) {
      if (durations[i] < 0) {
        lastNegative = durations[i] + ":" + i;
        break;
      }
    }
    durations?.map((v) => {
      if (v == 0) {
        setTime({ ...time, time: "" });
        toast.error("Already booked !", { id: "003" });
      } else {
        const firstPositive = durations.find((element) => element > 0);
        setValidDuration(firstPositive);
        console.log(firstPositive, "fisttPosi");

        if (lastNegative) {
          let lastEndTime = exTime[lastNegative?.split(":")[1]];
          console.log(new Date(lastEndTime?.endTime), "lastEnd");
        }
        console.log(lastNegative, "lastrnasdfkja");
      }
    });
    // let newArray  = exTime?.map((v)=>{
    //   console.log(moment(v.startTime) , moment(date),"DATEREREREW")
    //    return {duration:  moment.duration(moment(date).diff(moment(v.startTime))).hours()}
    // })
    // console.log(newArray,"newArray")

    // console.log(exTime,"jdfjdjfjkjf",new Date(date) )

    // let greaterTime =   exTime?.filter((v)=>{
    //   console.log((v.startTime).getTime() , new Date(date).getTime(),"fdl;afk;lf")
    //   if(new Date(v.startTime).getTime() > new Date(date).getTime()){
    //     return v.startTime
    //     // console.log(v,'akdsfl;oiwe')
    //   }
    //   }).sort((a,b)=>a.startTime-b.startTime)
    //   console.log(greaterTime,"greatereTime" , new Date(date))

    //   let smallerTime = exTime?.filter((v)=>{
    //     if(new Date(v.startTime).getTime() < new Date(date).getTime()){
    //       return v.startTime
    //     }
    //   }).sort((a,b)=>a.startTime-b.startTime)

    // let eqaulTime = exTime?.filter(v=>new Date(v.startTime).getTime() == new Date(date).getTime())
    // console.log(greaterTime,"methosdf",smallerTime , "dmflgjkdkfljkajfkls", new Date(date) )

    // for (const timestamp of exTime) {
    //   if (timestamp.startTime === l ) {
    //     console.log("The target time is equal to either the start or end time of a timestamp.",timestamp.startTime);
    //   } else if (timestamp.startTime < l ) {
    //     console.log("The target time falls within the range of a timestamp.",timestamp.startTime);
    //   } else {
    //     console.log("The target time is outside the range of a timestamp.",timestamp.startTime);
    //   }
    // }
    // setTimeout((l)=>{
    //   let p = exTime?.filter((f)=>{
    //     if(f.startTime == l){
    //       return f
    //     }
    //    })
    //    console.log(p,"dlkfjklsdajfkl")
    // },2000)

    //  console.log(moment(date).format('MMMM Do YYYY, h:mm a')?.split(" ")[3],"OPOPOPO",exTime)

    // let d =[]
    // let p= []
    // for(let i = 0 ;i<exTime?.length;i++){
    //   if(exTime[i]?.startTime == l){
    //     console.log(exTime[i],"IORUDJFD")
    //     d.push(exTime[i]);
    //   }
    // else if(exTime[i]?.startTime <= moment(date).format('MMMM Do YYYY, h:mm a')?.split(" ")[3]){
    //   p.push(exTime[i])
    // }
    // }
    // console.log(d,"main",l,exTime)
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
      // setPatientList(res.data.allPatients);
      managePatients(res.data.allPatients);
    }
  };
  const filterServices = (data) => {
    console.log(data, "SASTRDHFFATYADAAFD");
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
    handleSelectChange(pId);
  }, [pId]);

  useEffect(() => {
    getAllPatient();
  }, []);
  useEffect(() => {
    getRooms();
    getServices();
    getClinicSchedule();
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
      title: "SHOULDER MUSCLE TESTS",
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
    onchange: async (val) => {},
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
      let visitdata = {
        treatments: val,
        date: visitDate,
        functional: formik1?.values,
        appointmentId: visitID,
        examinationId: examId,
        patientId: pId,
        dailyNote: note,
      };

      try {
        const visitres = await postVisitesdaetails(visitdata);
        if (visitres?.status == 201 || visitres?.status === 200) {
          toast.success(visitres?.data?.message);
          navigate("/VisitDetailsView", {
            state: {
              patientId: pId,
              visitId: visitres?.data?.visitDetail?._id,
            },
          });
        }
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      }
    },
  });
  return (
    <>
      <div className="card my-3">
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
                      {isEdit ? (
                        ""
                      ) : (
                        <a
                          style={{
                            right: "10px",
                            float: "right",
                            textDecoration: "underline",
                            fontWeight: "500",
                            fontSize: "1rem",
                          }}
                          onClick={handleNewModal}
                          href="#addModal"
                          data-bs-toggle="modal"
                        >
                          Add new patient
                        </a>
                      )}

                      <Select
                        // name="patientName"
                        value={pdata}
                        selected={pdata}
                        onChange={handlePChange}
                        isSearchable={true}
                        // className="form-select"
                        options={toggleAppointment ? op : regularP}
                      />
                      {/* <select
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
                    </select> */}
                      <InputErrorMessage
                        error={touched.patientName && errors.patientName}
                        marginBottom={-15}
                      />
                    </div>
                    <div className="row">
                      <div className="col-lg-6 mt-3">
                        <label htmlFor="date" className="font-w">
                          Date
                        </label>
                        <input
                          className="form-control"
                          type="date"
                          name="date"
                          value={time?.date}
                          onChange={handleDateView}
                          onKeyDown={(e) => e.preventDefault()}
                          min={isValidDate()}
                          max="9999-01-01"
                          id="date"
                        />
                      </div>
                      <div className="col-lg-6 mt-3">
                        <label htmlFor="patient" className="font-w">
                          Select Room
                        </label>
                        <select
                          className="form-select"
                          name="room"
                          disabled={!selectedDate}
                          value={values.room}
                          onChange={handleRoomChange}
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
                    </div>
                    {/* <div className="col-lg-3 mt-3">
                    <label htmlFor="date" className="font-w">
                      Date
                    </label>
                    <input
                      className="form-control"
                      type="date"
                      name="date"
                      value={time?.date}
                      onChange={handleDateView}
                      onKeyDown={(e) => e.preventDefault()}
                      min={isValidDate()}
                      max="9999-01-01"
                      id="date"
                    />
                  </div> */}
                    <div className="col-lg-4 mt-3">
                      {console.log(exTime, "extime")}
                      <div className="form-group">
                        <label className="font-w" htmlFor="time-select">
                          Start Time
                        </label>

                        <DatePicker
                          disabled={Boolean(!values.room)}
                          // selected={values?.startTime}
                          selected={time?.time}
                          // showTime = {{ user12hours: true }}
                          // showTime={{ use12Hours: true, format: "HH:mm " }}

                          onChange={handleStartTime}
                          showTimeSelect
                          className="form-control"
                          showTimeSelectOnly
                          placeholderText="select time"
                          timeIntervals={10}
                          timeCaption="Time"
                          dateFormat="hh:mm a"
                          // excludeTimes={[
                          //   setHours(setMinutes(new Date(), 10), 8),
                          //   // setHours(setMinutes(new Date(), 30), 18),
                          //   // setHours(setMinutes(new Date(), 30), 19),
                          //   // setHours(setMinutes(new Date(), 30), 17),
                          // ]}
                          // excludeTimes={ds}
                          excludeTimes={validTime?.map((v) => {
                            return setHours(
                              setMinutes(
                                new Date(),
                                new Date(v.startTime)
                                  .toLocaleTimeString()
                                  .split(":")[1]
                              ),
                              new Date(v.startTime)
                                .toLocaleTimeString()
                                .split(":")[0]
                            );
                          })}
                          // format="HH:mm"
                          // minTime={setHours(
                          //   setMinutes(
                          //     new Date(),
                          //     timeValidation?.startTime?.split(":")[1]
                          //   ),
                          //   timeValidation?.startTime?.split(":")[0]
                          // )}
                          // maxTime={setHours(
                          //   setMinutes(
                          //     new Date(),
                          //     timeValidation?.endTime?.split(":")[1]
                          //   ),
                          //   timeValidation?.endTime?.split(":")[0]
                          // )}

                          // minTime={
                          //   new Date(
                          //     0,
                          //     0,
                          //     0,
                          //     timeValidation?.startTime?.split(":")[1],
                          //     timeValidation?.startTime?.split(":")[0]
                          //   )
                          // }
                          // maxTime={
                          //   new Date(
                          //     0,
                          //     0,
                          //     0,
                          //     timeValidation?.endTime?.split(":")[0],
                          //     timeValidation?.endTime?.split(":")[1]
                          //   )
                          // }
                          minTime={new Date(timeValidation?.startTime)}
                          maxTime={new Date(timeValidation?.endTime)}
                        />
                        {console.log(timeValidation, "timevalidaton")}
                        <InputErrorMessage
                          error={touched?.startTime && errors?.startTime}
                          marginBottom={-15}
                        />
                      </div>
                    </div>

                    <div className="col-lg-4 mt-3">
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
                        // max="60"
                        type="text"
                        placeholder="Enter Duration"
                        onChange={handleDuration}
                        // value={getDuration(values?.startTime, values?.endTime) + ":00"}
                      />
                      <InputErrorMessage
                        error={touched.duration && errors.duration}
                        marginBottom={-15}
                      />
                    </div>
                    <div className="col-lg-4 mt-3">
                      <div className="form-group">
                        <label className="font-w">End Time </label>
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
                        />
                        <InputErrorMessage
                          error={touched?.endTime && errors?.endTime}
                          marginBottom={-15}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 mt-3">
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
                          error={serviceErr}
                          marginBottom={-15}
                        />
                      </div>
                      {/* <div className="col-lg-6 mt-3">
                    <label htmlFor="patient" className="font-w">
                      Select Room
                    </label>
                    <select
                      className="form-select"
                      name="room"
                      // disabled={isEdit}
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
                  </div> */}

                      <div className="col-lg-6 mt-3">
                        <label htmlFor="repeat" className="font-w">
                          Appointment Type
                        </label>
                        <select
                          disabled={isEdit}
                          name="appointmentType"
                          value={values?.appointmentType}
                          onChange={handleClrrChange}
                          id="repeat"
                          style={{ backgroundColor: `${clrr}` }}
                          className="form-select"
                        >
                          <option hidden>Select</option>
                          <option
                            value="New"
                            style={{ backgroundColor: "#ffff" }}
                          >
                            New
                          </option>
                          {isEdit && (
                            <option
                              value="Reschedule"
                              style={{ backgroundColor: "#ffff" }}
                            >
                              Reschedule
                            </option>
                          )}
                          {/* <option
                        value="Reschedule"
                        style={{ backgroundColor: "#ffff" }}
                      >
                        Reschedule
                      </option> */}
                          {/* <option
                        value="Cancelled"
                        style={{ backgroundColor: "#ffff" }}
                      >
                        Cancelled
                      </option> */}
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
                          {/* <option
                          value="Not-showed"
                          style={{ backgroundColor: "#ffff" }}
                        >
                          Not-showed
                        </option> */}
                        </select>
                        <InputErrorMessage
                          error={
                            touched.appointmentType && errors.appointmentType
                          }
                        />
                      </div>
                    </div>
                    {/* <div className="row">
                    <div className="col-lg-12 mt-1">
                      {reasonToggle && (
                        <input
                          name="reason"
                          value={values.reason}
                          onChange={handleChange}
                          placeholder="Enter Reason Here"
                          className="form-control"
                          type="text"
                        />
                      )}
                    </div>
                  </div> */}
                    <div className="col-lg-12 mt-3">
                      <label>
                        {description ? (
                          <>
                            {" "}
                            <span
                              className="font-w"
                              style={{ color: "#ff3366" }}
                            >
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
        <div className="row mt-2 px-3 pb-3">
          <div className="col-lg-8">
            <label htmlFor="note" className="sy-lf-rt-bt">Add Notes</label>
          <textarea
              name=""
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="form-control"
              cols="60"
              rows="1"
              placeholder="Please add daily note here ..."
            ></textarea>
          </div>
          <div className="col-lg-4">
            <label className="sy-lf-rt-bt" htmlFor="date">
              Select Visit Date
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
        </div>
        <FunctionalExamination formik1={formik1} />
        <Treatments visit="true" formik4={formik4} formik1={formik1} />
      </div>
    </>
  );
};

export default Visit;
