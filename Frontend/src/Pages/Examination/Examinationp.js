import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import "./Examination.css";
import copy from "copy-to-clipboard";
import FunctionalExamination from "./FunctionalExamination";
import OrthoPadicExamination from "./OrthoPadicExamination";
import Diagnose from "./Diagnose";
import Treatments from "./Treatments";
import Select from "react-select";
import moment from "moment";
import DatePicker from "react-datepicker";
// import setHours from "date-fns/setMinutes";
// import setMinutes from "date-fns/setMinutes";scsacsa
import {
  functionalFromApi,
  getAllPatientsDetails,
  getReportByIdApi,
  getSinglePatientDetailsById,
  updateFunctionalApi,
  getConsultationsApiById,
  getConsultationsApiByPatientId,
  updateSlotApiData,
  postSlotApiData,
  getAllAppontmentsApi,
  getServiceByIdApi,
  getServiceApi,
  getRoomsApi,
  getExamTestApi,
  getScheduleDetailsApi,
} from "../../Apis";
import { InputErrorMessage } from "../../Components/common/Errors";
import {addMinutes, setHours, setMinutes } from "date-fns";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { appointmentValidation } from "../../Components/Schemas";
import { WhiteLoader } from "../../Components/common/Errors/loader/WhiteLoader";
const Examinationp = () => {
  const location = useLocation();
  // const pId = useParams();
  const navigate = useNavigate();
  const [validDuration, setValidDuration] = useState(0);
  const [timeValidation, setTimeValidation] = useState({
    startTime: "",
    endTime: "",
  });
  const [exTime, setExTime] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [step, setStep] = useState(0);
  const [examLoader ,setExamLoader]=useState(false)
  const [isEdit, setIsEdit] = useState(false);
  const [allServices, setAllServices] = useState([]);
  const [description, setDescription] = useState("");
  const [opData, setOpData] = useState();
  const [allBookedSlots, setAllBookedSlots] = useState([]);
  const [allRooms, setAllRooms] = useState([]);
  const [clrr, setClrr] = useState("#ffff");
  const [patientList, setPatientList] = useState([]);
  const [singlePatientData, setSinglePatientData] = useState([]);
  const [NewpatientId, setNewpatientId] = useState(location?.state?.id);
  const [examId, setExamId] = useState(location.search.slice(1));
  const [warnings, setWarnings] = useState([]);
  const [consulationId, setConsultaitonId] = useState();
  const [consultationList, setConsultationList] = useState([]);
  const [selectedConsulatation, setSelectedConsultation] = useState("");
  const [hide, setHide] = useState(false);
  const [serviceErr, setServiceErr] = useState("");
  const [staticd, setStaticd] = useState(false);
  const [scheduleInfo, setScheduleInfo] = useState();
  const [pdata, setPData] = useState(null);
  const [toggleAppointment, setToggleAppointment] = useState(true);
  const [op, setOp] = useState([]);
  const [regularP, setRegularP] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [validTime, setValidTime] = useState([]);
  const [time, setTime] = useState({
    time: "",
    date: "",
  });
  const [examDate,setExamdate]=useState(new Date().toLocaleDateString()?.split("/")?.reverse()?.join("-"));
  console.log(examDate, "fLLLLLfffff");
  const modal = document.getElementById("exampleModal");
  const {
    values,
    errors,
    touched,
    // setValues,
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
    },
    validationSchema: appointmentValidation,
    onSubmit: async (val) => {
      // console.log(val, "VVVVLLLLL");
      let data = {
        patientId: val.patientName,
        serviceId: val.serviceType?.value,
        roomId: val.room,
        startTime: val.startTime,
        endTime: val.endTime,
        appointmentType: val.appointmentType,
        appointmentFreq: val.repeat,
      };
      // console.log(data, "DATAASTASDFA");
      if (data) {
        const res = isEdit
          ? await updateSlotApiData({ ...data, id: values.id })
          : await postSlotApiData(data);
        if (res.status === 200 || res.status === 201) {
          toast.success(res.data.message, { id: "004" });
          modal.click();
          setFieldValue("serviceType","");
          setFieldValue("startTime","");
          setFieldValue("endTime","");
          setFieldValue("duration","");
          setFieldValue("room","");
          setTime({time:"",date:""})
          setClrr("#ffff");
          setIsEdit(false);
          getAllAppointments();
        }
      }
    },
  });

  console.log(selectedConsulatation,"selectedConsulatioanto")
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
  console.log(errors, values.duration, "valuesssssss");
  const handleStartExam = () => {
    setToggle(!toggle);
    setStaticd(true);
  };
  const handleServiceChange = async (e) => {
    // console.log(e?.value, "ADFADSFDFSDFSDFDSAF");
    setFieldValue("serviceType", e);
    if (e) {
      const res = await getServiceByIdApi(e?.value);
      if (res.status === 200 || res.status === 201) {
        // setFieldValue("duration", res?.data?.service?.duration);
        setDescription(res?.data?.service?.serviceDescp);
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
          console.log(t,"validatime")
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
  const getStartTimes = (day) => {
    let t = scheduleInfo.scheduleDetails?.filter((v) => {
      if (v.day == day) {
        return v;
      }
    });
    console.log(t,"timemdamagter")
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
      endTime:t?.[0]?.schedule?.[0]?.endTime
    })
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

  const isValidDate = () => {
    return (new Date ()).toLocaleDateString ("fr-CA")
  };
  const handleStartTime = (date) => {
    console.log(date, "starttimeee");
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
  const getEndTime=(value)=>{
    const startTime = new Date(time?.time).toLocaleTimeString();
    const durationInMinutes = value;
    const endTime = moment(startTime, "HH:mm:ss")
      .add(durationInMinutes, "minutes")
      .format("HH:mm");
    const d = new Date(time?.date);
    d.setHours(endTime?.split(":")[0]);
    d.setMinutes(endTime?.split(":")[1]);
    setFieldValue("endTime", d);
  }
  const handleEndDate = (date) => {
    setFieldValue("endTime", date);
  };
  // const getDuration = (a, b) => {
  //   if (a && b) {
  //     var ms = moment(b, "YYYY/MM/DD HH:mm").diff(
  //       moment(a, "YYYY/MM/DD HH:mm")
  //     );
  //     var d = moment.duration(ms);
  //     var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
  //     let sItem = s?.split(":");
  //     if (sItem[0].length === 1) {
  //       return "0" + s + " - " + "HH:MM:SS";
  //     } else {
  //       return s + " - " + "HH:MM:SS";
  //     }
  //   } else {
  //     return "00:00";
  //   }
  // };
  const handleClrrChange = (e) => {
    let val;
    if (isEdit) {
      val = e;
    } else {
      val = e.target.value;
    }
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
  const filterServices = (data) => {
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
    setOpData(newArray);
  };
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
  
  const handlePChange = (e) => {
    setPData(e);
    setFieldValue("patientName", e.value);
  };
  const getAllPatient = async () => {
    const res = await getAllPatientsDetails();
    if (res.status === 200 || res.status === 201) {
      setPatientList(res.data.allPatients);
      managePatients(res.data.allPatients)
    }
  };
  const handleSelectChange = async (e,check=true) => {
    if (e?.target?.value || e) {
      setSelectedConsultation("");
      setConsultationList([]);
      setHide(true);
      let GetId = e?.target?.value ? e?.target?.value : e;
      setFieldValue("patientName", GetId);
      getConsultationList(GetId);
      const res = await getSinglePatientDetailsById(GetId);
      if (res.status === 200 || res.status === 201) {
        setNewpatientId(res?.data?.patient?._id);
        setSinglePatientData(res?.data?.patient);
        console.log(res.data.patient,"oatututundd")
        setPData({value:res.data.patient?._id,label:res.data?.patient?.firstName+" "+res.data.patient?.lastName})
      }
      if (res?.data?.patient?._id) {
        const responseConsulting = await getConsultationsApiByPatientId(GetId);
        if (responseConsulting?.data?.consultationArr[0]?._id) {
          const getsingleconsulting = await getConsultationsApiById(
            responseConsulting?.data?.consultationArr[0]?._id
          );
          check && setWarnings(getsingleconsulting?.data?.symptomsArr);
        }
      }
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
  const getConsultationList = async (id) => {
    console.log(id, "funcitoncll");
    if (!id) return;
    try {
      const res = await getConsultationsApiByPatientId(id);
      setConsultationList(res?.data?.consultationArr);
    } catch (err) {
      console.log(err, "ERRERERERER");
      const message =
        err.response?.data?.message || "Consultation does not exists";
      setConsultaitonId("");
      toast.error(message, { id: "003" });
    }
  };

  const handleConsultationChange = async (e) => {
    if (!e.target.value) setConsultaitonId("");
    setSelectedConsultation(e.target.value);
    if (e.target.value) {
      isValidConsultaion(e.target.value);
    }
  };

  const getWarnings = () => {
    console.log(warnings, "DATESAGDFDSFAG");
    let arr = [];
    let d = warnings.map((v) => {
      v?.warnings?.map((f) => {
        console.log(f.value, "JDADUFSASGJ");
        arr.push(f.value);
      });
    });
    console.log(arr, "DFGSDGSDFGFDSg");
    d = arr?.filter((v) => v);
    return d;
    // return d?.value;
  };

  const isValidConsultaion = async (id) => {
    try {
      const res = await getExamTestApi(id);
      if (res?.data?.findExam === true && !location?.state?.warningsId) {
        toast.error("Examination already exists ", { id: "001" });
        setConsultaitonId("");
      } else {
        console.log("YRESDG");
        setConsultaitonId(id);
        // setSelectedConsultation(e.target.value);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  console.log(consulationId, "consultationId");
  const handleCloseEditModal = () => {
    setIsEdit(false);
    setClrr("#ffff");
    setTime({time:"",date:""})
    setFieldValue("serviceType","")
    setFieldValue("startTime","")
    setFieldValue("endTime","")
    setFieldValue("appointmentType","")
    setFieldValue("duration","")
    setFieldValue("room","")
  };
  const formik1 = useFormik({
    initialValues: {
      SI: { low: true, position: { left: false, right: false }, cm: "" },
      ProneCrest: {
        hieght: true,
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
      title:"SHOULDER MUSCLE TESTS",
      shoulderForm: [
        { testName: "", left: "", Pn: false, right: "", Rn: false },
      ],
    },
    onSubmit: async (val) => {
      // console.log(val);
      setStep(1);
    },
  });

  const formik2 = useFormik({
    initialValues: {
      lumborOrtho: {
        EYl: {
          left: "",
          right: "",
          leftOption: { SI: false, LB: false, HIP: false },
          rightOption: { SI: false, LB: false, HIP: false },
        },
        Nachlas: {
          left: "",
          right: "",
          leftOption: { SI: false, LB: false, HIP: false },
          rightOption: { SI: false, LB: false, HIP: false },
        },
        Yeoman: {
          left: "",
          right: "",
          leftOption: { SI: false, LB: false, HIP: false },
          rightOption: { SI: false, LB: false, HIP: false },
        },
        LaSeague: { left: "", right: "" },
        Braggard: { left: "", right: "" },
        FABERE: {
          left: "",
          right: "",
          leftOption: { SI: false, LB: false, HIP: false },
          rightOption: { SI: false, LB: false, HIP: false },
        },
        Milgram: {
          left: "",
          right: "",
          leftOption: { SI: false, LB: false, HIP: false },
          rightOption: { SI: false, LB: false, HIP: false },
        },
      },
      sottoHall: {
        thoracic: { left: "", right: "" },
        lumbar: { left: "", right: "" },
      },
      deepTendon: {
        patellar: { left: { name: "", value: "" }, right: {name:"" ,value: "" } },
        achills: { left: { name: "", value: "" }, right: {name:"", value: "" } },
      },
      deepTendonReflexes: {
        biceps: { left: "", leftNew : "",right: "" , rightNew:"" },
        triceps: { left: "", leftNew : "",right: "" , rightNew:"" },
        brachiorad: { left: "", leftNew : "",right: "" , rightNew:"" },
      },
      cervical: {
        jackson: "",
        dist: "",
        MFC: { left: "", right: "" },
        DIST: { left: "", right: "" },
        ShldrDep: { left: "", right: "" },
        Wrights: { left: "", right: "" },
        Scalene: { left: "", right: "" },
        George: { left: "", right: "" },
      },
      lumbarPos: false,
      lunbarNag: false,
      cervicalPos: false,
      cervicalNag: false,
    },
  });

  const formik3 = useFormik({
    initialValues: {
      diagnose: [],
      bone: [],
      osteopathic: [],
      additionalDxs: [],
    },
    onSubmit: (v) => {
      // console.log(v);
    },
  });
{
  console.log(formik1.values,"ASDGJUDFUFUFJJFJSDJF")
}
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
      // console.log(val,"ggghh")
      var data;
      data = {
        consultationId: consulationId,
        date:examDate,
        functional: formik1.values,
        orthopadic: formik2.values,
        diagnoses: formik3.values,
        treatments: val,
      };
      if(formik1?.values?.SI?.cm && formik1?.values?.ProneCrest?.cm){
        setExamLoader(true);
      try {
        if (!examId) {
          const res = await functionalFromApi(data);
          if (res.status === 200 || res.status === 201) {
            toast.success(res.data.message, { id: "001" });
            navigate("/examinationpReports", {
              state: {
                id: res?.data?.examination?._id,
                consultationId: consulationId,
                patientId: values.patientName,
                redirect: false,
              },
            });
            setExamLoader(false)
          } else {
            toast.error(
              "Oops Examination already exist with this consultation!",
              { id: "002" }
            );
            setExamLoader(false)
          }
        } else if (examId) {
          let updateData = {
            id: examId,
            functional: formik1.values,
            orthopadic: formik2.values,
            diagnoses: formik3.values,
            treatments: val,
          };
          setExamLoader(true);
          const res = await updateFunctionalApi(updateData);
          if (res?.status == 200) {
            // toast.success(res?.data?.message);
            toast.success("Examination updated successfully")
            setStep(0);
            setExamId("");
            navigate("/examinationpReports", {
              state: {
                id: res?.data?.examination?._id,
                consultationId: consulationId,
                patientId: values.patientName,
                redirect: false,
                check: true,
              },
            });
            formik1.resetForm();
            formik2.resetForm();
            formik3.resetForm();
            formik4.resetForm();
setExamLoader(false)
            // formik1.setValues((v) => ({
            //   ...v,
            //   SI: { low: false, position: { left: false, right: false }, cm: "" },
            //   ProneCrest: {
            //     hieght: false,
            //     position: { left: false, right: false },
            //     cm: "",
            //   },
            //   Crom: {
            //     FLX: { Dec: false, Inc: false, Normal: false, Deg: "" },
            //     EXT: { Dec: false, Inc: false, Normal: false, Deg: "" },
            //     RLB: { Dec: false, Inc: false, Normal: false, Deg: "" },
            //     LLB: { Dec: false, Inc: false, Normal: false, Deg: "" },
            //     PROT: { Dec: false, Inc: false, Normal: false, Deg: "" },
            //     LROT: { Dec: false, Inc: false, Normal: false, Deg: "" },
            //   },
            //   TMJ: { step1: "", step2: "", step3: "" },
            //   Notes: "",
            //   Listings: { L1: "", L2: "", L3: "" },
            //   Adams: {
            //     FixedSI: { position: { left: false, right: false }, BLT: false },
            //     Free: { position: { left: false, right: false }, BLT: false },
            //     Lumb: { position: { left: false, right: false }, Deg: "", Neg: false },
            //     Thor: { position: { left: false, right: false }, Deg: "", Neg: false },
            //   },
            //   shoulderForm: [
            //     { testName: "", left: "", Pn: false, right: "", Rn: false },
            //   ],
            // }));

            // formik2.setValues((v) => ({
            //   ...v,
            //   lumborOrtho: {
            //     EYl: {
            //       left: "",
            //       right: "",
            //       leftOption: { SI: false, LB: false, HIP: false },
            //       rightOption: { SI: false, LB: false, HIP: false },
            //     },
            //     Nachlas: {
            //       left: "",
            //       right: "",
            //       leftOption: { SI: false, LB: false, HIP: false },
            //       rightOption: { SI: false, LB: false, HIP: false },
            //     },
            //     Yeoman: {
            //       left: "",
            //       right: "",
            //       leftOption: { SI: false, LB: false, HIP: false },
            //       rightOption: { SI: false, LB: false, HIP: false },
            //     },
            //     LaSeague: { left: "", right: "" },
            //     Braggard: { left: "", right: "" },
            //     FABEPagal
            //     Milgram: {
            //       left: "",
            //       right: "",
            //       leftOption: { SI: false, LB: false, HIP: false },
            //       rightOption: { SI: false, LB: false, HIP: false },
            //     },
            //   },
            //   sottoHall: {
            //     thoracic: { left: "", right: "" },
            //     lumbar: { left: "", right: "" },
            //   },
            //   deepTendon: {
            //     patellar: { left: { name: "", value: "" }, right: { value: "" } },
            //     achills: { left: { name: "", value: "" }, right: { value: "" } },
            //   },
            //   deepTendonReflexes: {
            //     biceps: { left: "", right: "" },
            //     triceps: { left: "", right: "" },
            //     brachiorad: { left: "", right: "" },
            //   },
            //   cervical: {
            //     jackson: "",
            //     dist: "",
            //     MFC: { left: "", right: "" },
            //     DIST: { left: "", right: "" },
            //     ShldrDep: { left: "", right: "" },
            //     Wrights: { left: "", right: "" },
            //     Scalene: { left: "", right: "" },
            //     George: { left: "", right: "" },
            //   },
            //   lumbarPos: false,
            //   lunbarNag: false,
            //   cervicalPos: false,
            //   cervicalNag: false,
            // }))

            // formik3.setValues((v) => ({
            //   ...v,
            //   diagnose: [],
            //   bone: [],
            //   osteopathic: [],
            //   additionalDxs: [],
            // }))

            // formik4.setValues((v) => ({
            //   ...v,
            //   shoulderOption: [{ left: "", leftValue: "", right: "", rightValue: "" }],
            //   adjacent: false,
            //   Scoliosis: false,
            //   Distraction: false,
            //   exam: false,
            //   DC: {
            //     name: "",
            //     cervical: "",
            //     lumber: "",
            //     thoracic: "",
            //     extermity: "",
            //   },
            //   HP: {
            //     name: "",
            //     cervical: "",
            //     lumber: "",
            //     thoracic: "",
            //     extermity: "",
            //   },
            //   Kinesiotaping: {
            //     name: { tspine: false, lspine: false, both: false },
            //     kinesiotapingPosition: [{ left: "", right: "" }],
            //     treatmentPlan: { asNeed: false, time: false },
            //     treatmentFrequency: {
            //       treatmentRight: "",
            //       treatmentLeft: "",
            //       frequency: "",
            //       duration: "",
            //     },
            //     nextAppointments: {
            //       first: "",
            //       second: "",
            //       third: "",
            //     },
            //   },
            // }))
          }
        } else {
          console.log("not found any Id");
          setExamLoader(false)
        }
      } catch (err) {
        console.log(err);
        setExamLoader(false)
      }
    }else{
      toast.error("Please fill required field");
      document.getElementById("defred").setAttribute("class","warn");
      document.getElementById("defreds").setAttribute("class","warn");
      setExamLoader(false)
    }
    },
  });

  const handleWarningChange = async (id) => {
    const res = await getConsultationsApiById(id);
    if (res.status === 200 || res.status === 201) {
      setWarnings(res?.data?.symptomsArr);
    }
  };

  useEffect(() => {
    handleSelectChange(location?.state?.id,false);
  }, [location?.state?.id]);

  useEffect(() => {
    if (location?.state?.warningsId) {
      handleWarningChange(location?.state?.warningsId);
    }
  }, [location?.state?.warningsId]);

  const getReportById = async (id) => {
    const res = await getReportByIdApi(id);
    console.log(res?.data?.examination?.consultationId,"reppposososoossosososo")
    if (res.status === 200 || res.status === 201) {
      setExamdate(res?.data?.examination?.date)
      setSelectedConsultation(res?.data?.examination?.consultationId)
      
      const allData = {
        low: res?.data?.examination?.functional?.SI?.low || false,
        siPosition: res?.data?.examination?.functional?.SI.position || false,
        siCm: res?.data?.examination?.functional?.SI.cm || false,
        CrestHeight:
          res?.data?.examination?.functional?.ProneCrest?.height || false,
        CrestPostion:
          res?.data?.examination?.functional?.ProneCrest?.position || false,
        CrestCm: res?.data?.examination?.functional?.ProneCrest?.cm || "",
        flxCrom: res?.data?.examination?.functional?.Crom?.FLX || false,
        extCrom: res?.data?.examination?.functional?.Crom?.EXT || false,
        rlbCrom: res?.data?.examination?.functional?.Crom?.RLB || false,
        llbCrom: res?.data?.examination?.functional?.Crom?.LLB || false,
        protCrom: res?.data?.examination?.functional?.Crom?.PROT || false,
        lrotCrom: res?.data?.examination?.functional?.Crom?.LROT || false,
        Tmj: res?.data?.examination?.functional?.TMJ,
        Listing: res?.data?.examination?.functional?.Listings,
        //  Adams : res?.data?.examination?.functional?.Adams ,
        FixedSI: res?.data?.examination?.functional?.Adams?.FixedSI || false,
        FreeAdams: res?.data?.examination?.functional?.Adams?.Free || false,
        LumbAdams: res?.data?.examination?.functional?.Adams?.Lumb || false,
        ThorAdams: res?.data?.examination?.functional?.Adams?.Thor || false,
      };

      console.log(allData.LumbAdams,"alldatatataaaaaaatttaaaa")
      // console.log(res?.data?.examination?.orthopadic?.deepTendonReflexes, "::::::::::::::::::::::");

      formik1.setValues((v) => ({
        ...v,
        SI: {
          low: allData?.low,
          position: {
            left: allData?.siPosition?.left,
            right: allData?.siPosition?.right,
          },
          cm: allData?.siCm,
        },
        ProneCrest: {
          hieght: allData?.CrestHeight,
          position: {
            left: allData?.CrestPostion?.left,
            right: allData?.CrestPostion?.right,
          },
          cm: allData?.CrestCm,
        },
        Crom: {
          FLX: {
            Dec: allData.flxCrom.Dec,
            Inc: allData.flxCrom.Inc,
            Normal: allData.flxCrom.Normal,
            Deg: allData.flxCrom.Deg,
          },
          EXT: {
            Dec: allData.extCrom.Dec,
            Inc: allData.extCrom.Inc,
            Normal: allData.extCrom.Normal,
            Deg: allData.extCrom.Deg,
          },
          RLB: {
            Dec: allData.rlbCrom.Dec,
            Inc: allData.rlbCrom.Inc,
            Normal: allData.rlbCrom.Normal,
            Deg: allData.rlbCrom.Deg,
          },
          LLB: {
            Dec: allData.llbCrom.Dec,
            Inc: allData.llbCrom.Inc,
            Normal: allData.llbCrom.Normal,
            Deg: allData.llbCrom.Deg,
          },
          PROT: {
            Dec: allData.protCrom.Dec,
            Inc: allData.protCrom.Inc,
            Normal: allData.protCrom.Normal,
            Deg: allData.protCrom.Deg,
          },
          LROT: {
            Dec: allData.lrotCrom.Dec,
            Inc: allData.lrotCrom.Inc,
            Normal: allData.lrotCrom.Normal,
            Deg: allData.lrotCrom.Deg,
          },
        },
        TMJ: {
          step1: allData.Tmj.step1,
          step2: allData.Tmj.step1,
          step3: allData.Tmj.step3,
        },
        Notes: res?.data?.examination?.functional?.Notes,
        title: res?.data?.examination?.functional?.title ? res?.data?.examination?.functional?.title :"SHOULDER MUSCLE TESTS", 
        Listings: {
          L1: allData.Listing.L1,
          L2: allData.Listing.L2,
          L3: allData.Listing.L3,
        },
     
         
      
        Adams: {
          FixedSI: {
            position: {
              left: allData.FixedSI?.position?.left,
              right: allData.FixedSI?.position?.right,
            },
            BLT: allData.FixedSI.BLT,
          },
          Free: {
            position: {
              left: allData.FreeAdams?.position.left,
              right: allData.FreeAdams?.position?.right,
            },
            BLT: allData.FreeAdams?.position?.BLT,
          },
          Lumb: {
            position: {
              left: allData.LumbAdams?.position.left,
              right: allData.LumbAdams?.position.right,
            },
            Deg: allData?.LumbAdams?.Deg,
            Neg:allData?.LumbAdams?.Neg,
          },
          Thor: {
            position: {
              left: allData.ThorAdams?.position?.left,
              right: allData.ThorAdams?.position?.right,
            },
            Deg: allData.ThorAdams?.Deg,
            Neg: allData.ThorAdams?.Neg,
          },
        },
        shoulderForm: res?.data?.examination?.functional?.shoulderForm
          ? res?.data?.examination?.functional?.shoulderForm
          : [{ testName: "", left: "", Pn: false, right: "", Rn: false }],
      }));

      //formik2
      console.log(formik1.values ,"valuesforumik1")

      formik2.setValues((v) => ({
        ...v,
        lumborOrtho: {
          EYl: {
            left: res?.data?.examination?.orthopadic?.lumborOrtho?.EYl?.left,
            right: res?.data?.examination?.orthopadic?.lumborOrtho?.EYl?.right,
            leftOption: {
              SI: res?.data?.examination?.orthopadic?.lumborOrtho?.EYl
                ?.leftOption?.SI,
              LB: res?.data?.examination?.orthopadic?.lumborOrtho?.EYl
                ?.leftOption?.LB,
              HIP: res?.data?.examination?.orthopadic?.lumborOrtho?.EYl
                ?.leftOption?.HIP,
            },
            rightOption: {
              SI: res?.data?.examination?.orthopadic?.lumborOrtho?.EYl
                ?.rightOption?.SI,
              LB: res?.data?.examination?.orthopadic?.lumborOrtho?.EYl
                ?.leftOption?.LB,
              HIP: res?.data?.examination?.orthopadic?.lumborOrtho?.EYl
                ?.leftOption?.HIP,
            },
          },
          Nachlas: {
            left: res?.data?.examination?.orthopadic?.lumborOrtho?.Nachlas
              ?.left,
            right:
              res?.data?.examination?.orthopadic?.lumborOrtho?.Nachlas?.right,
            leftOption: {
              SI: res?.data?.examination?.orthopadic?.lumborOrtho?.Nachlas
                ?.leftOption?.SI,
              LB: res?.data?.examination?.orthopadic?.lumborOrtho?.Nachlas
                ?.leftOption?.LB,
              HIP: res?.data?.examination?.orthopadic?.lumborOrtho?.Nachlas
                ?.leftOption?.HIP,
            },
            rightOption: {
              SI: res?.data?.examination?.orthopadic?.lumborOrtho?.Nachlas
                ?.rightOption?.SI,
              LB: res?.data?.examination?.orthopadic?.lumborOrtho?.Nachlas
                ?.rightOption?.LB,
              HIP: res?.data?.examination?.orthopadic?.lumborOrtho?.Nachlas
                ?.rightOption?.HIP,
            },
          },
          Yeoman: {
            left: res?.data?.examination?.orthopadic?.lumborOrtho?.Yeoman?.left,
            right:
              res?.data?.examination?.orthopadic?.lumborOrtho?.Yeoman?.right,
            leftOption: {
              SI: res?.data?.examination?.orthopadic?.lumborOrtho?.Yeoman
                ?.leftOption?.SI,
              LB: res?.data?.examination?.orthopadic?.lumborOrtho?.Yeoman
                ?.leftOption?.LB,
              HIP: res?.data?.examination?.orthopadic?.lumborOrtho?.Yeoman
                ?.leftOption?.HIP,
            },
            rightOption: {
              SI: res?.data?.examination?.orthopadic?.lumborOrtho?.Yeoman
                ?.rightOption?.SI,
              LB: res?.data?.examination?.orthopadic?.lumborOrtho?.Yeoman
                ?.rightOption?.LB,
              HIP: res?.data?.examination?.orthopadic?.lumborOrtho?.Yeoman
                ?.rightOption?.HIP,
            },
          },
          LaSeague: {
            left: res?.data?.examination?.orthopadic?.lumborOrtho?.LaSeague
              ?.left,
            right:
              res?.data?.examination?.orthopadic?.lumborOrtho?.LaSeague?.right,
          },
          Braggard: {
            left: res?.data?.examination?.orthopadic?.lumborOrtho?.Braggard
              ?.left,
            right:
              res?.data?.examination?.orthopadic?.lumborOrtho?.Braggard?.left,
          },
          FABERE: {
            left: res?.data?.examination?.orthopadic?.lumborOrtho?.FABERE?.left,
            right:
              res?.data?.examination?.orthopadic?.lumborOrtho?.FABERE?.right,
            leftOption: {
              SI: res?.data?.examination?.orthopadic?.lumborOrtho?.FABERE
                ?.leftOption?.SI,
              LB: res?.data?.examination?.orthopadic?.lumborOrtho?.FABERE
                ?.leftOption?.LB,
              HIP: res?.data?.examination?.orthopadic?.lumborOrtho?.FABERE
                ?.leftOption?.HIP,
            },
            rightOption: {
              SI: res?.data?.examination?.orthopadic?.lumborOrtho?.FABERE
                ?.rightOption?.SI,
              LB: res?.data?.examination?.orthopadic?.lumborOrtho?.FABERE
                ?.rightOption?.LB,
              HIP: res?.data?.examination?.orthopadic?.lumborOrtho?.FABERE
                ?.rightOption?.HIP,
            },
          },
          Milgram: {
            left: res?.data?.examination?.orthopadic?.lumborOrtho?.Milgram
              ?.left,
            right:
              res?.data?.examination?.orthopadic?.lumborOrtho?.Milgram?.right,
            leftOption: {
              SI: res?.data?.examination?.orthopadic?.lumborOrtho?.Milgram
                ?.leftOption?.SI,
              LB: res?.data?.examination?.orthopadic?.lumborOrtho?.Milgram
                ?.leftOption?.LB,
              HIP: res?.data?.examination?.orthopadic?.lumborOrtho?.Milgram
                ?.leftOption?.HIP,
            },
            rightOption: {
              SI: res?.data?.examination?.orthopadic?.lumborOrtho?.Milgram
                ?.rightOption?.SI,
              LB: res?.data?.examination?.orthopadic?.lumborOrtho?.Milgram
                ?.rightOption?.LB,
              HIP: res?.data?.examination?.orthopadic?.lumborOrtho?.Milgram
                ?.rightOption?.HIP,
            },
          },
        },
        sottoHall: {
          thoracic: {
            left: res?.data?.examination?.orthopadic?.lumborOrtho?.sottoHall
              ?.thoracic?.left,
            right:
              res?.data?.examination?.orthopadic?.lumborOrtho?.sottoHall
                ?.thoracic?.right,
          },
          lumbar: {
            left: res?.data?.examination?.orthopadic?.lumborOrtho?.sottoHall
              ?.lumbar?.left,
            right:
              res?.data?.examination?.orthopadic?.lumborOrtho?.sottoHall?.lumbar
                ?.right,
          },
        },
        deepTendon: {
          patellar: {
            left: {
              name: res?.data?.examination?.orthopadic?.deepTendon
                ?.patellar?.left?.name,
              value:
                res?.data?.examination?.orthopadic?.deepTendon
                  ?.patellar?.left?.value,
            },
            right: {
              value:
                res?.data?.examination?.orthopadic?.deepTendon
                  ?.patellar?.right?.value,
              name: res?.data?.examination?.orthopadic?.deepTendon
              ?.patellar?.right?.name,
            },
          },
          achills: {
            left: {
              name: res?.data?.examination?.orthopadic?.deepTendon
                ?.achills?.left?.name,
              value:
                res?.data?.examination?.orthopadic?.deepTendon
                  ?.achills?.left?.value,
            },
            right: {
              value:
                res?.data?.examination?.orthopadic?.deepTendon
                  ?.achills?.right?.value,
               name:res?.data?.examination?.orthopadic?.deepTendon
                  ?.achills?.right?.name,
            },
          },
        },
        deepTendonReflexes: {
          biceps: {
            left: res?.data?.examination?.orthopadic?.deepTendonReflexes?.biceps
              ?.left,
            right:
              res?.data?.examination?.orthopadic?.deepTendonReflexes?.biceps
                ?.right,
            leftNew:res?.data?.examination?.orthopadic?.deepTendonReflexes?.biceps
            ?.leftNew,
            rightNew:res?.data?.examination?.orthopadic?.deepTendonReflexes?.biceps
            ?.rightNew,
          },
          triceps: {
            left: res?.data?.examination?.orthopadic?.deepTendonReflexes
              ?.triceps?.left,
            right:
              res?.data?.examination?.orthopadic?.deepTendonReflexes?.triceps
                ?.right,
           leftNew:res?.data?.examination?.orthopadic?.deepTendonReflexes?.biceps
                ?.leftNew,
           rightNew:res?.data?.examination?.orthopadic?.deepTendonReflexes?.biceps
                ?.rightNew,
          },
          brachiorad: {
            left: res?.data?.examination?.orthopadic?.deepTendonReflexes
              ?.brachiorad?.left,
            right:
              res?.data?.examination?.orthopadic?.deepTendonReflexes?.brachiorad
                ?.right,
            leftNew:res?.data?.examination?.orthopadic?.deepTendonReflexes?.biceps
                ?.leftNew,
            rightNew:res?.data?.examination?.orthopadic?.deepTendonReflexes?.biceps
                ?.rightNew,
          },
        },
        cervical: {
          jackson: res?.data?.examination?.orthopadic?.cervical?.jackson,
          dist: res?.data?.examination?.orthopadic?.cervical?.dist,
          MFC: {
            left: res?.data?.examination?.orthopadic?.cervical?.MFC?.left,
            right: res?.data?.examination?.orthopadic?.cervical?.MFC?.right,
          },
          DIST: {
            left: res?.data?.examination?.orthopadic?.cervical?.DIST?.left,
            right: res?.data?.examination?.orthopadic?.cervical?.DIST?.left,
          },
          ShldrDep: {
            left: res?.data?.examination?.orthopadic?.cervical?.ShldrDep?.left,
            right:
              res?.data?.examination?.orthopadic?.cervical?.ShldrDep?.right,
          },
          Wrights: {
            left: res?.data?.examination?.orthopadic?.cervical?.Wrights?.left,
            right: res?.data?.examination?.orthopadic?.cervical?.Wrights?.right,
          },
          Scalene: {
            left: res?.data?.examination?.orthopadic?.cervical?.Scalene?.left,
            right: res?.data?.examination?.orthopadic?.cervical?.Scalene?.right,
          },
          George: {
            left: res?.data?.examination?.orthopadic?.cervical?.George?.left,
            right: res?.data?.examination?.orthopadic?.cervical?.George?.left,
          },
        },
        lumbarPos: res?.data?.examination?.orthopadic?.lumbarPos,
        lunbarNag: res?.data?.examination?.orthopadic?.lunbarNag,
        cervicalPos: res?.data?.examination?.orthopadic?.cervicalPos,
        cervicalNag: res?.data?.examination?.orthopadic?.cervicalNag,
      }));

      //formik3

      formik3.setValues((v) => ({
        ...v,
        diagnose: res?.data?.examination?.diagnoses?.diagnose,
        bone: res?.data?.examination?.diagnoses?.bone,
        osteopathic: res?.data?.examination?.diagnoses?.osteopathic,
        additionalDxs: res?.data?.examination?.diagnoses?.additionalDxs,
      }));

      //formik4

      formik4.setValues((v) => ({
        ...v,
        shoulderOption: res?.data?.examination?.treatments?.shoulderOption,
        adjacent: res?.data?.examination?.treatments?.adjacent,
        Scoliosis: res?.data?.examination?.treatments?.Scoliosis,
        Distraction: res?.data?.examination?.treatments?.Distraction,
        exam: res?.data?.examination?.treatments?.exam,
        DC: {
          name: res?.data?.examination?.treatments?.DC?.name,
          cervical: res?.data?.examination?.treatments?.DC?.cervical,
          lumber: res?.data?.examination?.treatments?.DC?.lumber,
          thoracic: res?.data?.examination?.treatments?.DC?.thoracic,
          extermity: res?.data?.examination?.treatments?.DC?.extermity,
        },
        HP: {
          name: res?.data?.examination?.treatments?.HP?.name,
          cervical: res?.data?.examination?.treatments?.HP?.cervical,
          lumber: res?.data?.examination?.treatments?.HP?.lumber,
          thoracic: res?.data?.examination?.treatments?.HP?.thoracic,
          extermity: res?.data?.examination?.treatments?.HP?.extermity,
        },
        Kinesiotaping: {
          name: {
            tspine:
              res?.data?.examination?.treatments?.Kinesiotaping?.name?.tspine,
            lspine:
              res?.data?.examination?.treatments?.Kinesiotaping?.name?.lspine,
            both: res?.data?.examination?.treatments?.Kinesiotaping?.name?.both,
          },
          kinesiotapingPosition:
            res?.data?.examination?.treatments?.Kinesiotaping
              ?.kinesiotapingPosition,
          treatmentPlan:
            res?.data?.examination?.treatments?.Kinesiotaping?.treatmentPlan
              ?.asNeed,
          treatmentFrequency: {
            frequency:
              res?.data?.examination?.treatments?.Kinesiotaping
                ?.treatmentFrequency?.frequency,
            duration:
              res?.data?.examination?.treatments?.Kinesiotaping
                ?.treatmentFrequency?.duration,
          },
          nextAppointments: {
            first:
              res?.data?.examination?.treatments?.Kinesiotaping
                ?.nextAppointments?.first,
            second:
              res?.data?.examination?.treatments?.Kinesiotaping
                ?.nextAppointments?.second,
            third:
              res?.data?.examination?.treatments?.Kinesiotaping
                ?.nextAppointments?.third,
          },
        },
      }));
    }
  };

  useEffect(() => {
    if (examId) {
      getReportById(examId);
    }
  }, [examId]);

  useEffect(() => {
    if (location?.state?.warningsId) {
      setStaticd(true);
      setSelectedConsultation(location?.state?.warningsId);
      setConsultaitonId(location?.state?.warningsId);
      isValidConsultaion(location?.state?.warningsId);
    }
  }, [location?.state]);
  useEffect(() => {
    getAllPatient();
    getServices();
    getRooms();
    getClinicSchedule()
  }, []);

  return (
    <>
      <div className="container-fluid mt-6">
        <div className="card">
          <div className="row card-header card-p align-items-center">
            {NewpatientId ? (
              <>
                <div className="col-xl col-lg-6 d-flex mb-1">
                <div className="avatar avatar-sm bg-warning rounded-circle text-white me-3">
                    <img
                      alt="..."
                      src="/static/media/img-profile.00fa072a3afa1895a513.jpg"
                      width="20"
                    />
                  </div> 
                  {
                    singlePatientData?.firstName ?  <span>
                    {singlePatientData?.salutation +
                      " " +
                      singlePatientData?.firstName +
                      " " +
                      singlePatientData?.lastName}
                  </span> : <WhiteLoader color="black"/>
                  }
                 
                </div>
                <div className="col-xl col-lg-6 mb-1">
                  <p style={{whiteSpace: "nowrap"}}>
                    Patient Id:&nbsp;
                    <span>
                      {singlePatientData?.fileNo
                        ? singlePatientData?.fileNo
                        : "-"}
                      {singlePatientData?.fileNo && (
                        <i
                          title="copy"
                          style={{ color: "lightslategray", cursor: "pointer" }}
                          className="fa-solid fa-copy ms-1"
                          onClick={() =>
                            copy(singlePatientData?.fileNo) &&
                            toast.success("Copied", { id: "0001" })
                          }
                        ></i>
                      )}
                    </span>
                  </p>
                </div>
                <div className="col-xl col-lg-6 mb-1">
                  <p>
                    D.O.B.:{" "}
                    <span>
                      {" "}
                      {singlePatientData?.dob?.split("-").reverse().join("/")}
                    </span>
                  </p>
                </div>
                <div className="col-xl col-lg-6 mb-1">
                  <p>
                    Date:{" "}
                    <span>
                      {" "}
                      {singlePatientData?.registrationDate
                        ?.split("-")
                        .reverse()
                        .join("/")}
                    </span>
                  </p>
                </div>
                <div className="col-xl col-lg-6 mb-1">
                  <select
                    onChange={handleSelectChange}
                    className="form-select"
                    disabled={staticd}
                    aria-label="Default select example"
                    value={singlePatientData?._id}
                  >
                    <option value="" hidden>
                     {!patientList?.length ? "No data found!":"Select Patient"} 
                    </option>
                    {patientList?.map((val) => {
                      return (
                        <option value={val._id}>
                          Patient: {val?.fileNo ? val?.fileNo : "-"}{" "}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </>
            ) : (
              <div className="col">
                <select
                  onChange={handleSelectChange}
                  className="form-select"
                  disabled={staticd}
                  aria-label="Default select example"
                >
                  <option value="" hidden>
                  {!patientList?.length ? "No data found!":"Select Patient"} 
                  </option>
                  {patientList?.map((val) => {
                    return (
                      <option value={val._id}>
                        Patient: {val?.fileNo ? val?.fileNo : "-"}{" "}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
          </div>
          {hide && (
            <div className="row card-header card-p align-items-center">
              <div className="col">
                <select
                  onChange={handleConsultationChange}
                  className="form-select"
                  value={selectedConsulatation}
                  aria-label="Default select example"
                  disabled={staticd}
                >
                  <option value="" hidden="">
                    Select Consultation
                  </option>
                  {consultationList?.map((val) => {
                    return (
                      <option value={val._id}>
                        {moment(val?.createdAt?.split("T")[0]).format(
                          "DD/MM/YYYY"
                        )}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          )}
        </div>
        {selectedConsulatation
          ? Boolean(getWarnings()?.length) && (
              <div className="card mt-5">
                <div className="card-header warning-c-view">
                  <h2>Warnings:</h2>
                  <ul className="mb-0">
                    {getWarnings()?.map((v) => {
                      return <li>{v}</li>;
                    })}
                  </ul>
                </div>
              </div>
            )
          : ""}
        <div className="col-lg-12 mt-5 text-end">
          {consulationId && !toggle && !examId && singlePatientData?.firstName && (
            <button className="btn btn-primary" onClick={handleStartExam}>
              <span>
                <i className="bi bi-plus-square-dotted me-2"></i>
              </span>
              <span>Start Examination</span>
            </button>
          )}
        </div>

        {toggle || window.location.search ? (
          <div className="card card-process-tag mt-5">
            <div className="row p-0">
              <div className="col-12 text-center p-0 mt-3 mb-2">
                <div className=" card-header pt-0 ps-3 pe-3">
                  <form id="msform mt-0">
                    <div className="row">
                      <div className="col-xl-6 mb-3">
                      </div>
                      <div className="col-xl-6 mb-3">
                        <div className="d-flex align-items-center">
                      <label htmlFor="date" style={{width:"100%", textAlign: "end"}} className="me-2">	Select Examination Date</label>
                      <input type="date"  value={examDate} onChange={(e)=>setExamdate(e.target.value)} className="form-control" name="" id="" />
                      </div>
                      </div>
                    </div>
                    {/* <ul
                      style={{ paddingLeft: "0", marginBottom: "10px" }}
                      id="progressbar"
                    >
                      <li className="active" id="account">
                        <strong>Functional Examination</strong>
                      </li>
                      <li
                        id="personal"
                        className={
                          step === 1 || step === 2 || step === 3 ? "active" : ""
                        }
                      >
                        <strong>Orthopedic Examination</strong>
                      </li>
                      <li
                        id="payment"
                        className={step === 2 || step === 3 ? "active" : ""}
                      >
                        <strong>Diagnose</strong>
                      </li>
                      <li id="confirm" className={step === 3 ? "active" : ""}>
                        <strong>Treatments</strong>
                      </li>
                    </ul> */}

           
                      <FunctionalExamination
                        setFunction={setStep}
                        formik1={formik1}
                        step={step}
                      />
                    
                      <OrthoPadicExamination
                        setFunction={setStep}
                        formik1={formik1}
                        formik2={formik2}
                        formik3={formik3}
                        formik4={formik4}
                        step={step}
                      />
                    
                      <Diagnose
                        setFunction={setStep}
                        step={step}
                        formik1={formik1}
                        formik2={formik2}
                        formik3={formik3}
                        formik4={formik4}
                      />
                    
                      <Treatments
                        visit="false"
                        setFunction={setStep}
                        step={step}
                        formik1={formik1}
                        formik2={formik2}
                        formik3={formik3}
                        formik4={formik4}
                      />
                    
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
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
                      options={op}
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
                      {
                       
                        console.log(timeValidation,"timevalidaton")
                      }
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
                    <button type="submit" disabled={examLoader} className="btn btn-primary mt-3">
                      {examLoader ? <WhiteLoader /> :"Save"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Examinationp;
