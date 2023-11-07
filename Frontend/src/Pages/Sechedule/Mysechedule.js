import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Select, { components } from "react-select";
import DatePicker from "react-datepicker";
import "./mysechedule.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { appointmentValidation } from "../../Components/Schemas";
import { InputErrorMessage } from "../../Components/common/Errors";
import {
  addDataIntoOptionApi,
  deleteOptionApi,
  deleteSlotApiData,
  deleteSlotApiDatas,
  getAllAppontmentsApi,
  getAllPatientsDetails,
  getAppointmentByIdApi,
  getConsultationsApiById,
  getOptionListApiById,
  getRegularPatientApi,
  getRoomsApi,
  getScheduleDetailsApi,
  getServiceApi,
  getServiceByIdApi,
  getSymptomById,
  getVisitByPatintIdApi,
  getWithoutConsultDetails,
  postSlotApiData,
  trackPatientApi,
  updateOptionApi,
  updatePatientProfileById,
  updateSlotApiData,
} from "../../Apis";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import AddPatientModal from "../Patients/AddPatientModal";
import ConsultationModal from "./ConsultationModal";
import { dropdownIds } from "../SystemSettings/data";
import { addMinutes, setHours, setMinutes } from "date-fns";
import { useRef } from "react";
import ConsultationForm from "../Consultation/consultaion-form/ConsultationForm";
import { WhiteLoader } from "../../Components/common/Errors/loader/WhiteLoader";
import Loader from "../../Components/common/Errors/loader/Loader";
const Mysechedule = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    // setIsVisible(!isVisible);
  };
  const modalConsultation = document.getElementById("consultationForm");
  const notShowedModal = document.getElementById("notShowedModal");
  const modal = document.getElementById("exampleModal");
  const modalDel = document.getElementById("deleteModale");
  const modalEdit = document.getElementById("exampleModalEditP");
  const addModalr = document.getElementById("addModal");
  const [currentDate, setCurrentDate] = useState({ from: "", to: "" });
  // const [iView,setIView]=useState("dayGridMonth")
  const [reason, setReason] = useState("");
  const [validTime, setValidTime] = useState([]);
  const [allRooms, setAllRooms] = useState([]);

  const [isNoOptionsMessageVisible, setIsNoOptionsMessageVisible] = useState(false);
  const [state, setstate] = useState([]);
  const [updateData, setUpdateData] = useState();
  const [editData, setEditData] = useState();
  const [toggleEdit, setToggleEdit] = useState(false);
  const [errormsg, setErrorMsg] = useState("");
  const [optionId, setOptionId] = useState();
  const [toggle, setToggle] = useState(false);
  const [clrr, setClrr] = useState("#ffff");
  const [allServices, setAllServices] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const [slotData, setSlotData] = useState([]);
  const [allBookedSlots, setAllBookedSlots] = useState([]);
  const [singlePatientData, setSinglePatientData] = useState();
  const [description, setDescription] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [slotId, setSlotId] = useState();
  const [serviceErr, setServiceErr] = useState("");
  const [roomsName, setRoomsName] = useState([]);
  const [reportData, setReportData] = useState();
  const [reasonToggle, setReasonToggle] = useState(false);
  const [singleAppointmentDetails, setSingleAppointmentDetails] = useState();
  const [pId, setPId] = useState("");
  const [opData, setOpData] = useState();
  const [trackInfo, setTrackInfo] = useState();
  const [addData, setAddData] = useState();
  const [visitReports, setVisitReports] = useState([]);
  const [toggleAppointment, setToggleAppointment] = useState(false);
  const [op, setOp] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [pdata, setPData] = useState(null);
  // const [appointmentId, setApponitmentId] = useState();
  const [loader, setLoader] = useState(false);
  const jumpModal = document.getElementById("jumpdate");
  const [time, setTime] = useState({
    time: "",
    // date: new Date().toLocaleDateString('en-CA'),
    date: "",
  });
  const [trackPatient, setTrackPatient] = useState();
  const [scheduleInfo, setScheduleInfo] = useState();
  const [timeValidation, setTimeValidation] = useState({
    startTime: "",
    endTime: "",
  });
  const [regularP, setRegularP] = useState([]);
  const [accept, setAccept] = useState(true);
  const [jumpDate, setJumpDate] = useState("");
  const [validDuration, setValidDuration] = useState(0);
  const [exTime, setExTime] = useState([]);
  const [copyApp ,setCopyApp]=useState(true);
  const navigate = useNavigate();
  const calendarRef = useRef();
  const deleteModal = document.querySelector("#deleteModal");
  const staticSchedule = [
    {
      day: "Monday",
      schedule: [
        {
          startTime: "",
          endTime: "",
        },
      ],
    },
    {
      day: "Tuesday",
      schedule: [
        {
          startTime: "",
          endTime: "",
        },
      ],
    },
    {
      day: "Wednesday",
      schedule: [
        {
          startTime: "",
          endTime: "",
        },
      ],
    },
    {
      day: "Thursday",
      schedule: [
        {
          startTime: "",
          endTime: "",
        },
      ],
    },
    {
      day: "Friday",
      schedule: [
        {
          startTime: "",
          endTime: "",
        },
      ],
    },
    {
      day: "Saturday",
      schedule: [
        {
          startTime: "",
          endTime: "",
        },
      ],
    },
    {
      day: "Sunday",
      schedule: [
        {
          startTime: "",
          endTime: "",
        },
      ],
    },
  ];

  const avilableEventsInDate = (initialData) => {
    const eventDates = initialData
      ?.map((v) => {
        return v.startTime?.split("T")[0];
      })
      ?.filter((v, i, a) => a.indexOf(v) === i);
    const r = eventDates?.map((v) => {
      return {
        start: v,
        eventData: initialData?.filter(
          (l) => l?.startTime?.split("T")[0] === v
        ),
      };
    });
    return r;
  };

  const handleJumpDate = () => {
    if (jumpDate) {
      let calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(jumpDate);
      calendarApi.changeView("dayGridDay", jumpDate);
      jumpModal.click();
    } else {
      toast.error("Please select date", { id: "004" });
    }
  };

  const {
    values,
    errors,
    touched,
    setValues,
    handleSubmit,
    resetForm,
    setErrors,
    handleChange,
    setFieldError,
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
      reason: "",
    },
    validationSchema: appointmentValidation,
    onSubmit: async (val) => {
      setLoader(true);
      let { value } = val.serviceType;
      if (!value) {
        setServiceErr("Service type is required. ");
      } else {
        let data = {
          patientId: pdata.value,
          serviceId: value,
          roomId: val.room,
          startTime: values.startTime,
          endTime: val.endTime,
          appointmentType: val.appointmentType,
          appointmentFreq: val.repeat,
          reason: val.reason,
          duration: val.duration,
        };
        if (data) {
          const res = isEdit && copyApp
            ? await updateSlotApiData({ ...data, id: values.id })
            : await postSlotApiData(data);
          if (res.status === 200 || res.status === 201) {
            toast.success(res.data.message);
            modal.click();
            setClrr("#ffff");
            setIsEdit(false);
            setCopyApp(true);
            setReasonToggle(false);
            getAllAppointments();
            resetForm();
            setPData("");
            setLoader(false);
            setDescription("");
            setErrors({});
            setTime({ time: "", date: "" });
          }
        }
        setServiceErr("");
      }
    },
  });

  const getColour = (status) => {
    if (status === "notShowed") {
      return "orange";
    } else if (status === "outOfRoom") {
      return "black";
    } else if (status === "cancelled") {
      return "red";
    } else {
      return "white";
    }
  };
  const getStatus = (status) => {
    if (status === "notShowed") {
      return "Not - Showed";
    } else if (status === "outOfRoom") {
      return "Out of Room";
    } else if (status === "cancelled") {
      return "Cancelled";
    } else {
      return "";
    }
  };
  const handleServiceChange = async (e) => {
    setFieldValue("serviceType", e);
    setServiceErr("");
    if (e) {
      const res = await getServiceByIdApi(e?.value);
      if (res.status === 200 || res.status === 201) {
        setDescription(res?.data?.service?.serviceDescp);
      }
    }
  };

  const getAllAppointments = async () => {
    try {
      const res = await getAllAppontmentsApi();
      if (res?.status === 200 || res?.status === 201) {
        if (toggleAppointment == true) {
          setAllBookedSlots(
            res.data?.appointmentPatientType?.newPatientAppointments
          );
        } else {
          setAllBookedSlots(
            res.data?.appointmentPatientType?.regularPatientAppointments
          );
        }
      }
    } catch (Err) {
      console.log(Err);
    }
  };
  const getAllPatients = async (name) => {
    try {
      const res = await getWithoutConsultDetails();
      if (res?.status === 200 || res?.status === 201) {
        managePatients(res?.data?.allPatients);
      }
    } catch (err) {
      toast.error(err);
    }
  };
  const getRegularPatients = async (name) => {
    try {
      const res = await getRegularPatientApi();
      if (res?.status === 200 || res?.status === 201) {
        let d = [];
        res.data?.allPatients?.map((v) => {
          d.push({ label: v.firstName + " " + v.lastName, value: v._id });
        });
        setRegularP(d);
      }
    } catch (err) {
      toast.error(err);
    }
  };
  const getAllPatientsData = async (name) => {
    try {
      const res = await getAllPatientsDetails();
      if (res?.status === 200 || res?.status === 201) {
        setPatientList(res?.data?.allPatients);
      }
    } catch (err) {
      toast.error(err);
    }
  };
  const managePatients = (data) => {
    let d = [];
    data?.map((v) => {
      d.push({ label: v.firstName + " " + v.lastName, value: v._id });
    });
    setOp(d);
  };
  const handleClose = () => {
    setErrorMsg("");
    setPData("");
    setToggleEdit(false);
    setToggle(false);
    setOptionId("");
    setAddData("");
    setReason("");
  };
  const handleAddData = (e) => {
    setAddData(e.target.value);
    if (e.target.value) {
      setErrorMsg("");
    }
  };

  const getCheckPast = (time) => {
    let today = new Date();
    let old = new Date(time);

    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();

    let currentDate = new Date();

    // Set the desired time (01:13)
    currentDate.setHours(hours);
    currentDate.setMinutes(minutes);
    currentDate.setSeconds(seconds);

    if (today > old) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmitOption = async () => {
    if (optionId && addData) {
      try {
        const res = await addDataIntoOptionApi({
          name: addData,
          modelId: optionId,
        });
        if (res.status === 200 || res.status === 201) {
          toast.success(res.data.message);
          setOptionId("");
          setAddData("");
          setToggle(false);
        }
      } catch (err) {
        toast.error(err);
      }
    } else {
      setErrorMsg("Required field.");
    }
  };
  const handleClrrChange = (e) => {
    let val = e.target.value;
    if (val == "Not-showed") {
      setReasonToggle(true);
      setFieldValue("appointmentType", val);
    } else {
      setReasonToggle(false);
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

  const handleDateView = (e) => {
    let d = [];
    setFieldValue("room", "");
    scheduleInfo?.holidays?.map((v) => {
      d?.push(
        (new Date (v?.date)).toLocaleDateString ("fr-CA")
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
      isValidTime(e.target.value);
      setSelectedDate(e.target.value);
    }
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
        }
      });
    });

    let m = p?.filter((v) => {
      if (v?.day == dayNames[day]) {
        return true;
      }
    });
    console.log(m,"moooomm")
    if (m?.length) {
      setTime({ time: "", date: date });
      setFieldValue("endTime", "");
      setFieldValue("startTime", "");
      setFieldValue("duration", "");
      getStartTimes(dayNames[day]);
    } else {
      setTime({ time: "", date: "" });
      setFieldValue("room", "");
      setFieldValue("duration", "");
      setFieldValue("endTime", "");
      toast.error(
        "Clinic schedule has not been updated; please go to modal settings and create the clinic schedule accordingly.",
        { id: "007" }
      );
    }
  };

  function getTenMinuteIntervals(startTime, endTime) {
    const intervals = [];
    const intervalInMs = 10 * 60 * 1000; // 10 minutes in milliseconds

    // Convert start and end times to milliseconds
    const startMs = new Date(startTime).getTime();
    const endMs = new Date(endTime).getTime();

    // Round up start time to the next 10-minute interval
    const roundedStartMs = Math.ceil(startMs / intervalInMs) * intervalInMs;

    // Generate intervals
    for (let time = roundedStartMs; time <= endMs; time += intervalInMs) {
      intervals.push({ startTime: new Date(time) });
    }
    return intervals?.slice(0, intervals?.length - 1);
  }

  const getStartTimes = (day) => {
    let t = scheduleInfo.scheduleDetails?.filter((v) => {
      if (v.day == day) {
        return v;
      }
    });
    if (t?.[0]?.schedule?.length >= 2) {
      let i = t?.[0]?.schedule
      ?.map((v, i) => {
        return {
          st: v?.endTime,
          et: t?.[0]?.schedule?.[i + 1]?.startTime,
        };
      })
      ?.slice(0, t?.[0]?.schedule?.length - 1);
      let op = i?.map((v) => {
        let intervals = getTenMinuteIntervals(v.st, v.et);
        return intervals;
      });
      // console.log(op,"day data")
      setValidTime([...validTime, op.flat()]);
    }
    setTimeValidation({
      startTime: t?.[0]?.schedule?.[0]?.startTime,
      endTime: t?.[0]?.schedule?.[t?.[0]?.schedule?.length - 1]?.endTime,
    });
  };
 
  const handleNewP = () => {
    setToggleAppointment(true);
    setIsVisible(false);
  };
  const handleRegP = () => {
    setToggleAppointment(false);
    setIsVisible(false);
  };
  const handleEndDate = (date) => {
    setFieldValue("endTime", date);
  };

  const checkPastTime = (time) => {
    const date1 = new Date(time);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    if (date1 < currentDate) {
      return false;
    } else if (date1 > currentDate) {
      return true;
    } else {
      return true;
    }
  };




  const handleStartTime = (date) => {
    setTime({ ...time, time: date });
    let d = new Date(date);
    d.setDate(time?.date?.split("-")[2]);
    d.setMonth(time?.date?.split("-")[1] - 1);
    d.setFullYear(time?.date?.split("-")[0]);
    setFieldValue("startTime", d);
    setFieldValue("endTime", "");
    setFieldValue("duration", "");
    checkDuration(date);
  };

  const handlePChange = (e) => {
    setPData(e);
    setFieldValue("patientName", e.value);
  };
  const checkDuration = (date) => {
    const durations = exTime
      ?.sort((a, b) => a.startTime - b.startTime)
      ?.map((item) => {
        var startTime = moment(
          new Date(item.startTime).toLocaleTimeString(),
          "HH:mm:ss a"
        );
        var endTime = moment(new Date(date).toLocaleTimeString(), "HH:mm:ss a");

        // calculate total duration
        var duration = moment.duration(startTime.diff(endTime));
        var minutes = Math.round(duration._milliseconds / 60000);
        if (minutes > 60 && minutes < -60) {
          return minutes / 60;
        } else {
          return minutes;
        }
      });
    durations?.map((v) => {
      if (v == 0) {
        setTime({ ...time, time: "" });
        toast.error("Already booked !", { id: "003" });
      } else {
        const firstPositive = durations.find((element) => element > 0);
        setValidDuration(firstPositive);

        let lastNegative = null;

        for (let i = durations?.length - 1; i >= 0; i--) {
          if (durations[i] < 0) {
            lastNegative = durations[i] + ":" + i;
            break;
          }
        }

        if (lastNegative) {
          let lastEndTime = exTime[lastNegative?.split(":")[1]];
        }
      }
    });
  };
  const handleDuration = (e) => {
    if (e.target.value > validDuration && validDuration !== 0) {
      toast.error(`Appoinment eligible only for ${validDuration} minutes.`, {
        id: "77",
      });
      return;
    } else {
      if (e.target.value > 120) {
        setFieldValue("duration", 120);
        getEndTime(120);
      } else if (e.target.value <= 0) {
        setFieldValue("duration", "");
        getEndTime(e.target.value);
      } else {
        setFieldValue("duration", e.target.value);
        getEndTime(e.target.value);
      }
    }
  };


  const filterOptions = (inputValue) => {
    const filteredOptions = options1.filter(option =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    setIsNoOptionsMessageVisible(filteredOptions.length === 0);
    return filteredOptions;
  };



  const handleRoomChange = (e) => {
    setFieldValue("room", e.target.value);
    checkAvailableAppointment(selectedDate, e.target.value);
  };
  const checkAvailableAppointment = async (date, roomId) => {
    let availableSlotTime = [];
    let valid = [];
    try {
      const res = await getAllAppontmentsApi(date, "", "", "");
      if (res.status === 200 || res.status === 201) {
        console.log(res?.data?.appointment,"OIIDODDO")
        const p = (res?.data?.appointment)?.filter(v => v?.roomId?._id == roomId || v?.startTime?.split("T")[0] == date);
          
        p?.filter((a) => {
          availableSlotTime?.push({
            startTime: new Date(a?.startTime),
            endTime: new Date(a?.endTime),
          });
          
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
            t.push({ startTime: result2 });
            // exTime.push({startTime:result2})
          }
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
    setValidTime([...validTime, combinedArray]);
    setExTime(availableSlotTime);
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
  const handleCloseEditModal = () => {
    setClrr("#ffff");
    setErrors({});
    setTime({time: "",
    date: ""})
    setPData("");
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
      reason: "",
    });
    setIsEdit(false);
    setCopyApp(true)
  };

  const isValidDate = () => {
    return (new Date ()).toLocaleDateString ("fr-CA")
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

  const getClinicSchedule = async () => {
    try {
      const res = await getScheduleDetailsApi();
      if (res.status === 200 || res.status === 201) {
        if (res.data.schedule?.scheduleDetails?.length) {
          setScheduleInfo(res.data.schedule);
        } else {
          setScheduleInfo(staticSchedule);
        }
      }
    } catch (err) {
      setScheduleInfo(staticSchedule);
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

  const handleEditAppointment = async (id) => {
    setIsEdit(true);
    setCopyApp(true)
    setSlotId(id);
    try {
      const res = await getAppointmentByIdApi(id);
      setSingleAppointmentDetails(res?.data?.appointment);
      if (res?.status === 200 || res?.status === 201) {
        let info = res.data.appointment;
        let d = patientList?.filter((v) => v._id === info?.patientId);
        setPData({
          label: d?.[0]?.firstName + " " + d?.[0]?.lastName,
          value: d?.[0]?._id,
        });
        setFieldValue("patientName", d?.[0]?._id);
        setFieldValue("appointmentType", "Reschedule");
        setFieldValue("room", info?.roomId);
        setFieldValue("id", id);
        switch ("Reschedule") {
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
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hanldeSSlot = (id) => {
    setSlotId(id);
    handleSlotDelete(`oRoom/${id}`);
  };

  const handleSlotDelete = async (type) => {
    let t = type?.split("/");
    let data;
    if (t[0] == "oRoom") {
      data = {
        appointmentId: t[1],
        reason: reason,
        actionType: "outOfRoom",
      };
    } else {
      data = {
        appointmentId: slotId,
        reason: reason,
        actionType: type,
      };
    }
    try {
      const res = await deleteSlotApiData(data);
      if (res?.status === 200 || res?.status === 201) {
        toast.success(res.data.message);
        getAllAppointments();
        modalEdit.click();
        deleteModal.click();
        document.getElementById("notShowedModal").click();
        trackPInfo(pId);
        setReason("");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleSlotDeletes = async () => {
    if (!slotId) return;
    try {
      const res = await deleteSlotApiDatas({ id: slotId });
      if (res.status === 200 || res.status === 201) {
        toast.success(res.data.message);
        getAllAppointments();
        modalDel.click();
        deleteModal.click();
        setIsVisible(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getAllBookedRooms = () => {
    let roomData = [];
    allBookedSlots?.map((v) => {
      roomData.push({
        name: v?.serviceId?.roomId?.roomName,
        id: v.serviceId?.roomId?._id,
        appointment: v,
      });
    });
    setRoomsName(roomData);
  };

  const getAppointmentsByRoomName = (r) => {
    const rooms = r?.sort(
      (a, b) => new Date(a.roomId.createdAt) - new Date(b.roomId.createdAt)
      ).map((e) => e.roomId?._id)
      ?.filter((v, i, a) => a.indexOf(v) === i);
    const roomWiseData = rooms.map((l) => ({
      room: r.find((h) => h.roomId._id === l)?.roomId?.roomName,
      appointments: r.filter((h) => h.roomId._id === l),
    }));
    return roomWiseData;
  };
  const handleEditDayClick = (e) => {
    const data = allBookedSlots?.filter((v) => {
      return v._id === e;
    });
    setSinglePatientData(
      allBookedSlots?.filter((v) => {
        return v._id === e;
      })
    );
  };
  const handleExamination = (id, consultationId) => {
    navigate("/examinationpReports", {
      state: {
        id: id,
        consultationId: consultationId,
        patientId: pId,
        redirect: false,
        home: true,
      },
    });
  };

  const trackPInfo = async (id) => {
    try {
      const res = await trackPatientApi(id);
      if (res?.status === 200 || res?.status === 201) {
        setTrackInfo(res?.data);
        setTrackPatient(res?.data?.patient?.trackPatient);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleEventDataInfo = async (id, pateintId) => {
    setPId(pateintId);
    setIsVisible(!isVisible);
    try {
      const res = await trackPatientApi(pateintId);
      if (res?.status === 200 || res?.status === 201) {
        setTrackInfo(res?.data);
        setTrackPatient(res?.data?.patient?.trackPatient);
      }
    } catch (err) {
      console.log(err);
    }
    getVisitDetails(pateintId);
  };

  const getVisitDetails = async (id) => {
    try {
      const res = await getVisitByPatintIdApi(id);
      if (res.status === 200 || res.status === 201) {
        setVisitReports(res.data.visitDetails);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleReportView = async (id) => {
    try {
      const res = await getConsultationsApiById(id);
      if (res?.status === 200 || res?.status === 201) {
        setReportData(res.data?.symptomsArr[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCopyAppointment = async (id) => {
    // setApponitmentId(id)
    setIsEdit(true);
    setCopyApp(false);
    if (!id) return;
    try {
      const res = await getAppointmentByIdApi(id);
      if (res.status === 200 || res.status === 201) {
        let d = patientList?.filter(
          (v) => v._id === res.data.appointment?.patientId
        );
        setPData({
          label: d?.[0]?.firstName + " " + d?.[0]?.lastName,
          value: d?.[0]?._id,
        });
        setFieldValue("patientName", d?.[0]?._id);
        setFieldValue("appointmentType", res.data.appointment.appointmentType);
        setFieldValue("room", res.data.appointment.roomId);
        switch (res.data.appointment.appointmentType) {
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
        // setValues({
        //   patientName: res.data.appointment.patientId,
        //   serviceType: res.data.appointment.serviceId,
        //   startTime: "",
        //   endTime: "",
        //   appointmentType: res.data.appointment.appointmentType,
        //   room: res.data.appointment.roomId,
        //   repeat: "",
        //   id: "",
        // });
      }
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
            // manageData(res.data.allOptions);
            if(res.data.allOptions?.length){

              setstate(res.data.allOptions);
            }else{
              setstate([{name:"No Data Found", _id:"notFound"}])
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }, 500);
  };

  const manageData = (data) => {
    let dd = data;
    let mm = dd.push({ name: "Add other", id: "" });
    setstate(mm);
  };
  const handleInputChange = async (e, name) => {
    if (e.value === "Loading ..." || e.value === "No Data Found") return;
    if (e.value === "Add other") {
      setToggle(true);
      e.preventDefault();
    } else {
      setTrackPatient(e);
      try {
        const res = await updatePatientProfileById({
          id: pId,
          trackPatient: e,
        });
        if (res.status === 200 || res.status === 201) {
          toast.success(res.data.message, { id: "002" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const CustomOption = (props) => {
    // const deleteoption = async (d) => {
    //   try {
    //     const res = await deleteOptionApi({ id: data.id });
    //     if (res.status === 200 || res.status === 201) {
    //       toast.success(res.data.message,{id:"003"});
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // console.log(trackPatient, "tsfskjfgpsiysfd");
    // const editOption = (data) => {
    //   setToggleEdit(true);
    //   setEditData(data);
    //   setUpdateData(data?.value)
    //   console.log(data, "dataafdfdastdsafd");
    // };

    const { data, innerRef, innerProps, selectProps, selectOption } = props;
    const { optionAdd, optionEdit, optionDelete } = selectProps;
    const onClick = {
      option: () => {},
      label: () => selectOption(data),
      // add: () => optionAdd(data),
      // edit: () => editOption(data),
      // delete: () => deleteoption(data),
    };
    return data.custom ? (
      <div style={{ cursor: "pointer" }} ref={innerRef} {...innerProps}></div>
    ) : (
      <components.Option {...props}>
        <span onClick={onClick.label}>{data?.label}</span>
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
    } catch (err) {
      console.log(err);
    }
  };
  function renderEventContent(eventInfo) {
    console.log(eventInfo,"eveneneteinnoof")
    return eventInfo.view.type === "dayGridDay" ? (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr align="center">
              {getAppointmentsByRoomName(
                eventInfo.event._def.extendedProps.eventData
              )?.map((v, i) => {
                return (
                  <th key={i} scope="col" style={{ width: "305px" }}>
                    {v.room}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              {getAppointmentsByRoomName(
                eventInfo.event._def.extendedProps.eventData
              )?.map((v,i) => {
                return (
                  <td key={i} scope="col">
                    {v.appointments.map((o) => (
                      <div
                        className="d-flex flex-column"
                        style={{ maxWidth: "305px", padding: "2px" }}
                      >
                        <div className="mysche-room mb-2">
                          <table className="table table-borderless day-slot">
                            <tbody>
                              <tr>
                                <th
                                  style={{
                                    textAlign: "right",
                                    paddingRight: "10px",
                                  }}
                                >
                                  <span
                                    className="font-weight-bold"
                                    style={{
                                      color: "#ff3366",
                                      fontSize: "1rem",
                                    }}
                                  >
                                    Time Slot :
                                  </span>
                                </th>
                                <td
                                  style={{
                                    verticalAlign: "middle",
                                  }}
                                  className="ps-2 font-weight-bold position-relative"
                                >
                                  {
                                    moment(o?.startTime)
                                      .format("MMMM Do YYYY, h:mm a")
                                      ?.split(" ")[3]
                                  }
                                  -
                                  {
                                    moment(o?.endTime)
                                      .format("MMMM Do YYYY, h:mm a")
                                      ?.split(" ")[3]
                                  }
                                  <span
                                    className="text-left"
                                    style={{
                                      marginLeft: "9px",
                                      border: "1px solid #bbb",
                                      borderRadius: "25%",
                                      position: "absolute",
                                      right: "8px",
                                      top: "1px",
                                    }}
                                  >
                                    <span
                                      title="more"
                                      style={{ cursor: "pointer" }}
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <i className="bi bi-three-dots-vertical"></i>
                                    </span>
                                    <ul className="dropdown-menu">
                                      {
                                        checkPastTime(o.startTime) && <Link
                                        to={`/dailyNotes`}
                                        state={{
                                          id: o?._id,
                                          patientId: o?.patientId?._id,
                                        }}
                                      >
                                        <li style={{ cursor: "pointer" }}>
                                          <span className="dropdown-item">
                                            Start Visit
                                          </span>
                                        </li>
                                      </Link>
                                      }
                                      
                                      <li
                                        onClick={() =>
                                          handleCopyAppointment(o?._id)
                                        }
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        style={{ cursor: "pointer" }}
                                      >
                                        <span className="dropdown-item">
                                          Copy appointment
                                        </span>
                                      </li>

                                      {checkPastTime(o.startTime) && (
                                        <span>
                                          {o?.status === "cancelled" ? (
                                            " "
                                          ) : (
                                            <li
                                              data-bs-toggle="modal"
                                              onClick={() =>
                                                handleEditAppointment(o?._id)
                                              }
                                              data-bs-target="#exampleModal"
                                              style={{ cursor: "pointer" }}
                                            >
                                              <span className="dropdown-item">
                                                Edit Appointment
                                              </span>
                                            </li>
                                          )}
                                          {o?.status === "cancelled" ? (
                                            " "
                                          ) : (
                                            <li
                                              data-bs-toggle="modal"
                                              // onClick={() =>
                                              //   handleEditAppointment(o?._id)
                                              // }
                                              onClick={() =>
                                                hanldeSSlot(o?._id)
                                              }
                                              // onClick={()=> setSlotId(o?._id) && handleSlotDelete("outOfRoom")}
                                              // data-bs-target="#outModal"
                                              style={{ cursor: "pointer" }}
                                            >
                                              <span className="dropdown-item">
                                                Out of Room
                                              </span>
                                            </li>
                                          )}
                                          {o?.status === "cancelled" ? (
                                            " "
                                          ) : (
                                            <li
                                              data-bs-toggle="modal"
                                              onClick={() =>
                                                handleEditAppointment(o?._id)
                                              }
                                              data-bs-target="#exampleModal"
                                              style={{ cursor: "pointer" }}
                                            >
                                              <span className="dropdown-item">
                                                Reschedule
                                              </span>
                                            </li>
                                          )}
                                          {o?.status !== "cancelled" && (
                                            <li
                                              data-bs-toggle="modal"
                                              onClick={() =>
                                                handleEditAppointment(o?._id)
                                              }
                                              data-bs-target="#notShowedModal"
                                              style={{ cursor: "pointer" }}
                                            >
                                              <span className="dropdown-item">
                                                Not-Showed
                                              </span>
                                            </li>
                                          )}

                                          {o?.status !== "cancelled" && (
                                            <li
                                              data-bs-toggle="modal"
                                              data-bs-target="#deleteModal"
                                              onClick={() => setSlotId(o?._id)}
                                              style={{ cursor: "pointer" }}
                                            >
                                              <span className="dropdown-item">
                                                Cancel
                                              </span>
                                            </li>
                                          )}
                                        </span>
                                      )}
                                      <li
                                        data-bs-toggle="modal"
                                        data-bs-target="#deleteModale"
                                        onClick={() => setSlotId(o?._id)}
                                        style={{ cursor: "pointer" }}
                                      >
                                        <span className="dropdown-item">
                                          Delete
                                        </span>
                                      </li>
                                    </ul>
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <th
                                  style={{
                                    textAlign: "right",
                                    paddingRight: "10px",
                                  }}
                                >
                                  <span className="font-weight-bold">
                                    Patient Name:
                                  </span>
                                </th>
                                <td className="ps-2">
                                  <span>
                                    {o?.patientId?.salutation +
                                      " " +
                                      o?.patientId?.firstName +
                                      " " +
                                      o?.patientId?.lastName}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <th
                                  style={{
                                    textAlign: "right",
                                    paddingRight: "10px",
                                  }}
                                >
                                  <span className="font-weight-bold">
                                    Service Type:
                                  </span>
                                </th>
                                <td className="ps-2">
                                  {o?.serviceId?.serviceName}
                                </td>
                              </tr>
                              <tr>
                                <th
                                  style={{
                                    textAlign: "right",
                                    paddingRight: "10px",
                                  }}
                                >
                                  <span className="font-weight-bold">
                                    Date :
                                  </span>
                                </th>
                                <td className="ps-2">
                                  <span>
                                    {o?.startTime
                                      ?.split("T")[0]
                                      ?.split("-")
                                      .reverse()
                                      .join("/")}
                                  </span>
                                </td>
                              </tr>

                              <tr>
                                <th
                                  style={{
                                    textAlign: "right",
                                    paddingRight: "10px",
                                  }}
                                >
                                  <span className="font-weight-bold">
                                    Room :
                                  </span>
                                </th>
                                <td className="ps-2">
                                  <span>{o?.roomId?.roomName}</span>
                                </td>
                              </tr>

                              <tr>
                                <th
                                  style={{
                                    textAlign: "right",
                                    paddingRight: "10px",
                                  }}
                                >
                                  <span className="font-weight-bold">
                                    Appointment Type :{" "}
                                  </span>
                                </th>
                                <td className="ps-2">
                                  {o?.status === "cancelled" ? (
                                    <select
                                      disabled
                                      style={{
                                        color: "white",
                                        backgroundColor: "#c5401d",
                                      }}
                                      className="status-select form-control w-auto  pt-0 pb-0"
                                    >
                                      <option>Cancelled</option>
                                    </select>
                                  ) : (
                                    <select
                                      disabled
                                      style={{
                                        color: "white",
                                        backgroundColor:
                                          o?.appointmentType === "Reschedule"
                                            ? "#aac4e9"
                                            : o?.appointmentType === "New"
                                            ? "#e71ae1"
                                            : o?.appointmentType === "Cancelled"
                                            ? "#c5401d"
                                            : o?.appointmentType ===
                                              "Consultation"
                                            ? "#68b04c"
                                            : o?.appointmentType === "Regular"
                                            ? "#d7bb58"
                                            : "#ffff",
                                      }}
                                      className="status-select form-control w-auto  pt-0 pb-0"
                                    >
                                      <option>{o?.appointmentType}</option>
                                    </select>
                                  )}
                                </td>
                              </tr>

                              <tr>
                                <th
                                  style={{
                                    textAlign: "right",
                                    paddingRight: "10px",
                                  }}
                                ></th>
                                <td className="ps-2"></td>
                              </tr>
                            </tbody>
                          </table>
                          {
                            <div className="d-flex justify-content-between align-items-center mt-2">
                              <p
                                style={{
                                  fontSize: ".9rem",
                                  fontWeight: "bold",
                                  borderRadius: "10px",
                                  backgroundColor: `${getColour(o?.status)}`,
                                  color: "white",
                                }}
                                type="button"
                                className="pe-2 ps-2"
                              >
                                {getStatus(o?.status)}
                              </p>
                            </div>
                          }
                          <p
                            className="ms-2"
                            style={{ color: "red", fontSize: ".8rem" }}
                          >
                            {o?.reason}
                          </p>
                        </div>
                      </div>
                    ))}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    ) : (
      <div className="table-responsive-md p-2">
        <div className="d-flex flex-row flex-wrap">
          {eventInfo?.event?._def?.extendedProps?.eventData?.map((v,i) => {
            return (
              // <button
              //   onClick={() => handleEditDayClick(v?._id)}
              //   data-bs-toggle="modal"
              //   data-bs-target="#exampleModalEditP"
              // >

              <tr key={i}
                onClick={() => handleEventDataInfo(v?._id, v?.patientId?._id)}
              >
                <td className="schd-details" onClick={toggleVisibility}>
                  <div
                    style={{ cursor: "pointer" }}
                    className="mysche-room week-bg"
                  >
                    <p align="left">
                      <b>
                        {
                          moment(v?.startTime)
                            .format("MMMM Do YYYY, h:mm a")
                            ?.split(" ")[3]
                        }
                        -
                        {
                          moment(v?.endTime)
                            .format("MMMM Do YYYY, h:mm a")
                            ?.split(" ")[3]
                        }
                      </b>
                    </p>
                    <p align="left">
                      <span>
                        {v?.patientId?.salutation +
                          " " +
                          v?.patientId?.firstName +
                          " " +
                          v?.patientId?.lastName}
                      </span>
                    </p>
                  </div>
                </td>
              </tr>
              // </button>
            );
          })}
        </div>
      </div>
    );
  }

  const getDurations = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);

    // Calculate the difference in milliseconds
    const differenceMs = endTime.getTime() - startTime.getTime();

    // Convert milliseconds to minutes
    const differenceMinutes = Math.round(differenceMs / 60000);
    return differenceMinutes + " " + "min";
  };

  const handleNewModal = () => {
    modal.click();
  };
  const handleDateSelect = (selectInfo) => {
    if (selectInfo?.start) {
      setIsVisible(false);
      let calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(selectInfo?.start);
      calendarApi.changeView("dayGridDay", selectInfo?.start);
    }
  };
  const handleEventClick = (clickInfo) => {
    // console.log(clickInfo);
  };
  const handleEvents = (events) => {
    // console.log(events, "EVEVEGVEVEVE");
  };

  const handleViewSide =()=>{
    setIsVisible(false)
    setTrackInfo()
  }
  useEffect(() => {
    getRooms();
    getServices();
    getAllPatients();
    getClinicSchedule();
    getAllPatientsData();
    getRegularPatients();
  }, []);

  useEffect(() => {
    if (allBookedSlots?.length) {
      getAllBookedRooms();
    }
  }, [allBookedSlots]);
  useEffect(() => {
    getAllAppointments();
  }, [toggleAppointment]);

  useEffect(() => {
    if (isVisible == false) {
      setTrackPatient("");
      setTrackInfo()
    }
  }, [isVisible]);
  return (
    <>
      <div className="container-fluid">
        {isVisible && (
          <div className="right-side-content">
            <div className="d-flex justify-content-end">
              <div>
                <button
                  type="button"
                  title="close"
                  className="btn-close text-reset"
                  onClick={handleViewSide}
                ></button>
              </div>
            </div>

            <div className="right-side-patient-dts mt-3">
              <h5>Patient Details</h5>
              <hr className="mt-1 mb-2" />
              <table>
                {
                  trackInfo ?  <thead>
                  <tr>
                    <th width="30%">Patient Name.</th>
                    <td>
                      {trackInfo?.patient?.salutation
                        ? trackInfo?.patient?.salutation +
                          " " +
                          trackInfo?.patient?.firstName +
                          " " +
                          trackInfo?.patient?.lastName
                        : "-"}
                    </td>
                  </tr>
                  <tr>
                    <th>Patient Id. :</th>
                    <td>{trackInfo?.patient?.fileNo}</td>
                  </tr>
                  <tr>
                    <th>D.O.B. :</th>
                    <td>{moment(trackInfo?.patient?.dob).format("DD/MM/YYYY")}</td>
                  </tr>
                  <tr>
                    <th>Email :</th>
                    <td>{trackInfo?.patient?.email}</td>
                  </tr>
                  <tr>
                    <th>Phone No. :</th>
                    <td>{trackInfo?.patient?.contactNo}</td>
                  </tr>
                  <tr>
                    <th>Reference</th>
                    <td>
                      {trackInfo?.patient?.reference
                        ? trackInfo?.patient?.reference
                        : "-"}
                    </td>
                  </tr>
                  {toggleAppointment && (
                    <tr>
                      <th>Track Patient :</th>
                      <td
                        onClick={() => getSymptomData(dropdownIds.TRACKPATIENT)}
                      >
                        <Select
                          className="track-select"
                          value={trackPatient}
                          components={{ Option: CustomOption }}
                          options={options1}
                          onChange={(e) => handleInputChange(e, "trackPatient")}
                          noOptionsMessage={"No option found"}
                        />
                    
                      </td>
                    </tr>
                  )}
                </thead>:<Loader/>
                }
               
              </table>
            </div>

            <div className="right-side-patient-dts mt-5 position-relative">
              <h5>Today's Appointment</h5>
              { trackInfo ?   Boolean(trackInfo?.todaysAppointment?.length) ? (
                trackInfo?.todaysAppointment?.map((v,i) => {
                  return (
                    <>
                      <hr key={i} className="mt-1 mb-2" />
                      <div className="">
                        <div className="d-flex justify-content-end">
                          <p
                            onClick={() => handleCopyAppointment(v._id)}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            // className="position-absolute top-2"
                            style={{
                              fontSize: ".9rem",
                              textDecoration: "underline",
                              right: "40px",
                              cursor: "pointer",
                            }}
                          >
                            <i
                              title="copy appointment"
                              style={{ color: "lightslategray" }}
                              className="fa-solid fa-copy ms-1"
                              // onClick={() =>
                              //   copy(val?.fileNo) &&
                              //   toast.success("Copied", { id: "0001" })
                              // }
                            ></i>
                          </p>
                          <span
                            className="text-left"
                            style={{
                              marginLeft: "9px",
                              border: "1px solid #bbb",
                              borderRadius: "25%",
                              // position: "absolute",
                              top: "1px",
                            }}
                          >
                            <span
                              // className=" position-absolute top-2"
                              title="more"
                              style={{ cursor: "pointer", right: "10px" }}
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="bi bi-three-dots-vertical"></i>
                            </span>
                            <ul className="dropdown-menu">
                              {/* <Link to={`/patients/visits/${singlePatientData?.[0]?._id}`}> */}
                              {/* <Link
                                to={`/patients/profile`}
                                state={{
                                  id: singlePatientData?.[0]?._id,
                                  patientId:
                                    singlePatientData?.[0]?.patientId?._id,
                                }}
                              >
                                <li
                                  onClick={() => modalEdit.click()}
                                  style={{ cursor: "pointer" }}
                                >
                                  <span className="dropdown-item">
                                    Go to Visit
                                  </span>
                                </li>
                              </Link> */}
                              {v?.status === "cancelled" ? (
                                " "
                              ) : (
                                <li
                                  data-bs-toggle="modal"
                                  onClick={() => handleEditAppointment(v?._id)}
                                  data-bs-target="#exampleModal"
                                  style={{ cursor: "pointer" }}
                                >
                                  <span className="dropdown-item">
                                    Edit Appointment
                                  </span>
                                </li>
                              )}
                              {v?.status === "cancelled" ? (
                                " "
                              ) : (
                                <li
                                  // data-bs-toggle="modal"
                                  // onClick={() => handleEditAppointment(v?._id)}
                                  onClick={() => hanldeSSlot(v?._id)}
                                  // data-bs-target="#outModal"
                                  style={{ cursor: "pointer" }}
                                >
                                  <span className="dropdown-item">
                                    Out of Room
                                  </span>
                                </li>
                              )}
                              {v?.status === "cancelled" ? (
                                " "
                              ) : (
                                <li
                                  data-bs-toggle="modal"
                                  onClick={() => handleEditAppointment(v?._id)}
                                  data-bs-target="#exampleModal"
                                  style={{ cursor: "pointer" }}
                                >
                                  <span className="dropdown-item">
                                    Reschedule
                                  </span>
                                </li>
                              )}
                              {v?.status === "cancelled" ? (
                                ""
                              ) : (
                                <li
                                  data-bs-toggle="modal"
                                  onClick={() => handleEditAppointment(v?._id)}
                                  data-bs-target="#notShowedModal"
                                  style={{ cursor: "pointer" }}
                                >
                                  <span className="dropdown-item">
                                    Not-Showed
                                  </span>
                                </li>
                              )}

                              {v?.status === "cancelled" ? (
                                ""
                              ) : (
                                <li
                                  data-bs-toggle="modal"
                                  data-bs-target="#deleteModal"
                                  onClick={() => setSlotId(v?._id)}
                                  style={{ cursor: "pointer" }}
                                >
                                  <span className="dropdown-item">Cancel</span>
                                </li>
                              )}

                              <li
                                data-bs-toggle="modal"
                                data-bs-target="#deleteModale"
                                onClick={() => setSlotId(v?._id)}
                                style={{ cursor: "pointer" }}
                              >
                                <span className="dropdown-item">Delete</span>
                              </li>
                            </ul>
                          </span>
                        </div>
                        <div className="d-flex">
                          <div className="me-4">
                            <b>Time slot : </b>
                          </div>
                          <div>
                            {moment(v?.startTime)
                              .format("MMMM Do YYYY, h:mm a")
                              ?.split(" ")[3] +
                              " - " +
                              moment(v?.endTime)
                                .format("MMMM Do YYYY, h:mm a")
                                ?.split(" ")[3]}
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="me-4">
                            <b>Duration : </b>
                          </div>
                          {/* <div> 20 min</div> */}
                          <div> {v?.duration ? v?.duration + " min" : "-"}</div>
                        </div>
                      </div>
                      <table>
                        <tbody>
                          <tr>
                            <th width="100px">Room :</th>
                            <td>{v?.roomId?.roomName}</td>
                          </tr>
                          <tr>
                            <th style={{ verticalAlign: "baseline" }}>
                              Services :
                            </th>
                            <td
                              style={{
                                wordBreak: "break-word",
                                width: "250px",
                              }}
                            >
                              {v?.serviceId?.serviceName}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      {
                        toggleAppointment &&
                          v.status !== "cancelled" &&
                          v.status !== "notShowed" &&
                          v.status !== "outOfRoom" && (
                            // <div className="right-side-patient-dts mt-5">
                            <div className="d-flex justify-content-between align-items-center mt-2">
                              <Link
                                data-bs-toggle="modal"
                                data-bs-target="#consultationForm"
                                style={{ width: "160px" }}
                                type="button"
                                className="btn btn-primary btn-sm"
                              >
                                Start Consultation
                              </Link>

                              {/* <Link
                              to="/examination"
                              state={{ id: pId, warningsId: "" }}
                              style={{ width: "160px" }}
                              type="button"
                              className="btn btn-primary btn-sm"
                            >
                              Start Examination
                            </Link> */}
                            </div>
                          )
                        // </div>
                      }
                      {
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          <p
                            style={{
                              fontSize: ".9rem",
                              fontWeight: "bold",
                              borderRadius: "10px",
                              backgroundColor: `${getColour(v?.status)}`,
                              color: "white",
                            }}
                            type="button"
                            className="pe-2 ps-2"
                          >
                            {getStatus(v?.status)}
                          </p>
                        </div>
                      }
                      {
                        console.log(v,"SUTRUURURYSU")
                        // console.log(checkPastTime(v.startTime),"SUTRUURURYSU")
                      }
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        {/* {!toggleAppointment && ( */}
                        {v.status !== "cancelled" &&
                          v.status !== "outOfRoom" &&
                          v.status !== "notShowed" &&
                          !toggleAppointment &&
                          checkPastTime(v.startTime) &&
                          v.isVisited === false && (
                            <Link
                              to={`/dailyNotes`}
                              state={{
                                id: v?._id,
                                patientId: pId,
                              }}
                              style={{ width: "160px" }}
                              type="button"
                              className="btn btn-primary btn-sm"
                            >
                              Start Visit
                            </Link>
                          )}

                        {/* )} */}
                        <p style={{ fontSize: ".8rem", color: "red" }}>
                          {v.reason}
                        </p>
                      </div>
                    </>
                  );
                })
              ) : (
                <>
                  {" "}
                  <hr className="mt-1 mb-2" />
                  <p>No Appointment found!</p>
                </>
              ):<Loader/>}
            </div>

            <div className="right-side-patient-dts mt-5">
              <h5>Next Appointment</h5>
              <hr className="mt-1 mb-2" />
              <div className="table-responsive">
                <table className="next-app-table pb-2">
                  {trackInfo ?  Boolean(trackInfo?.nextAppointment?.length) ? (
                    trackInfo?.nextAppointment?.map((v,i) => {
                      return (
                        <tbody key={i}
                          className="right-next-app"
                          onClick={() => handleEditDayClick(v?._id)}
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalEditP"
                        >
                          <tr>
                            <th width="100px">
                              <b>Date :</b>
                            </th>
                            <td>
                              {moment(v?.startTime?.split("T")[0]).format(
                                "DD/MM/YYYY"
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th>
                              <b>Time slot :</b>
                            </th>
                            <td>
                              {moment(v?.startTime)
                                .format("MMMM Do YYYY, h:mm a")
                                ?.split(" ")[3] +
                                " - " +
                                moment(v?.endTime)
                                  .format("MMMM Do YYYY, h:mm a")
                                  ?.split(" ")[3]}
                            </td>
                          </tr>
                        </tbody>
                      );
                    })
                  ) : (
                    <>
                      {" "}
                      <hr className="mt-1 mb-2" />
                      <p>No Appointment found!</p>
                    </>
                  ):<Loader/>}

                  {/* <tbody className="right-next-app">
                    <tr>
                      <th width="100px">
                        <b>Date :</b>
                      </th>
                      <td>21/05/2022</td>
                    </tr>
                    <tr>
                      <th>
                        <b>Time slot :</b>
                      </th>
                      <td>10:20 am</td>
                    </tr>
                  </tbody>
                  <tbody className="right-next-app">
                    <tr>
                      <th width="100px">
                        <b>Date :</b>
                      </th>
                      <td>21/05/2022</td>
                    </tr>
                    <tr>
                      <th>
                        <b>Time slot :</b>
                      </th>
                      <td>10:20 am</td>
                    </tr>
                  </tbody> */}
                </table>
              </div>
            </div>
            <div className="right-side-patient-dts mt-5">
              <h5>Reports</h5>
              <hr className="mt-1 mb-2" />

              { trackInfo ?  Boolean(trackInfo?.reports?.allConsultation?.length)
                ? trackInfo?.reports?.allConsultation?.map((v,i) => {
                    return (
                      <div key={i} className="d-flex justify-content-between flex-wrap">
                        <div>Consultation Report</div>
                        <div>
                          <a
                            onClick={() => handleReportView(v._id)}
                            href=""
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalreport"
                          >
                            View
                          </a>
                        </div>
                        {/* <br /> */}
                      </div>
                    );
                  })
                : "-" : <Loader/>}

              { trackInfo ?  Boolean(trackInfo?.reports?.allExamination?.length)
                ? trackInfo?.reports?.allExamination?.map((v,i) => {
                    return (
                      <div key={i} className="d-flex justify-content-between">
                        <div>Examination Report</div>
                        <div>
                          <a
                            href=""
                            onClick={() =>
                              handleExamination(v._id, v?.consultationId)
                            }
                          >
                            View
                          </a>
                        </div>
                      </div>
                    );
                  })
                : "-":""}
              <div className="d-flex justify-content-between"></div>
            </div>

            {!toggleAppointment && (
              <div className="right-side-patient-dts mt-5">
                <h5>Visit Details</h5>
                <hr className="mt-1 mb-2" />

                {Boolean(visitReports?.length)
                  ? visitReports?.map((v,i) => {
                      return (
                        <div key={i} className="d-flex justify-content-between flex-wrap">
                          <div>Visit Report</div>
                          <div>
                            {/* <a onClick={()=>navigate("/VisitDetailsView" , {state:{patientId: pId, visitId: v?._id }})} href="#">View</a> */}
                            <a
                              onClick={() =>
                                navigate("/VisitDetailsView", {
                                  state: { patientId: pId, visitId: v?._id },
                                })
                              }
                              href="#"
                            >
                              {" "}
                              View{" "}
                            </a>
                          </div>
                          {/* <br /> */}
                        </div>
                      );
                    })
                  : "-"}
              </div>
            )}
          </div>
        )}

        <div className="col-12 mb-5 d-flex justify-content-between align-items-center">
          <div>
            <Link
              style={{
                color: `${toggleAppointment ? "black" : ""}`,
                textDecoration: `${toggleAppointment ? "underline" : ""}`,
              }}
              // onClick={() => setToggleAppointment(true) && setIsVisible(false)}
              onClick={handleNewP}
              href=""
            >
              New
            </Link>{" "}
            | &nbsp;
            <Link
              style={{
                color: `${toggleAppointment ? "" : "black"}`,
                textDecoration: `${toggleAppointment ? "" : "underline"}`,
              }}
              // onClick={() => setToggleAppointment(false) && setIsVisible(false)}
              onClick={handleRegP}
              href=""
            >
              Regular
            </Link>
          </div>
          <div>
            <button
              className="btn btn-link mt-4 me-4 text-underline"
              data-bs-toggle="modal"
              data-bs-target="#jumpdate"
            >
              Jump to date
            </button>
            <button
              type="button"
              className="btn btn-primary border-base mt-4"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={handleCloseEditModal}
            >
              New Appointment
            </button>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <FullCalendar
              // editable={true}
              selectable={true}
              // selectMirror={true}
              ref={calendarRef}
              dayMaxEvents={true}
              defaultView="timeGridWeek"
              nowIndicator={true}
              allDayText="All Day"
              timeZone="UTC"
              allDaySlot={true}
              select={handleDateSelect}
              // select={console.log("select")} //NOT WORKING HERE
              // dateClick={console.log("dateclick")}
              headerToolbar={{
                start: "today prev next",
                center: "title",
                end: "dayGridMonth dayGridWeek dayGridDay",
              }}
              eventClick={handleEventClick}
              datesSet={(dateInfo) => {
                setCurrentDate({
                  from: moment(dateInfo.start).format("YYYY-MM-DD"),
                  to: moment(dateInfo.end).format("YYYY-MM-DD"),
                });
              }}
              eventsSet={handleEvents}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
              events={avilableEventsInDate(allBookedSlots)}
              // eventClick={(e) => {
              //   handleEventClicks(e);
              // }}
              eventLimit={true}
              scrollTime={0}
              // dayHeaderFormat={(param) => {
              //   return param.date.day.toString();
              // }}
              eventContent={renderEventContent}
            />
          </div>
        </div>
      </div>
      <div
        style={{ zIndex: "9999" }}
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
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
                      isDisabled={isEdit}
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
                        {allRooms?.map((v,i) => {
                          return <option key={i} value={v._id}>{v?.roomName}</option>;
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
                        excludeTimes={validTime?.flat()?.map((v) => {
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
                      <InputErrorMessage
                        error={touched?.startTime && errors?.startTime}
                        marginBottom={-15}
                      />
                    </div>
                  </div>
{
  console.log(validTime ,"validtime")
}
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
{
  console.log(toggleAppointment , "apoododo")
}
                    <div className="col-lg-6 mt-3">
                      <label htmlFor="repeat" className="font-w">
                        Appointment Type
                      </label>
                      <select
                        // disabled={isEdit}
                        name="appointmentType"
                        // value={values?.appointmentType}
                        value={toggleAppointment ? "New" :"Regular"}
                        onChange={handleClrrChange}
                        id="repeat"
                        disabled
                        // style={{ backgroundColor: `${clrr}` }}
                        style={{ backgroundColor: `${toggleAppointment ? "#e71ae1":"#d7bb58"}` }}
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
                    <button
                      type="submit"
                      disabled={loader}
                      className="btn btn-primary mt-3"
                    >
                      {loader ? <WhiteLoader /> : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalEditP"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header pt-2 pe-2 ps-2">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-0">
              <div className="d-flex flex-column">
                <div className="mysche-room month-date-popup mb-2">
                  <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <th
                          style={{ textAlign: "right", paddingRight: "10px" }}
                        >
                          <span
                            className="font-weight-bold"
                            style={{ color: "#ff3366", fontSize: "1rem" }}
                          >
                            Time Slot :
                          </span>
                        </th>
                        <td className="ps-2 font-weight-bold position-relative">
                          {
                            moment(singlePatientData?.[0]?.startTime)
                              .format("MMMM Do YYYY, h:mm a")
                              ?.split(" ")[3]
                          }
                          -
                          {
                            moment(singlePatientData?.[0]?.endTime)
                              .format("MMMM Do YYYY, h:mm a")
                              ?.split(" ")[3]
                          }
                          <span
                            className="text-left"
                            style={{
                              marginLeft: "9px",
                              border: "1px solid #bbb",
                              borderRadius: "25%",
                              position: "absolute",
                              top: "1px",
                            }}
                          >
                            <span
                              title="more"
                              style={{ cursor: "pointer" }}
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="bi bi-three-dots-vertical"></i>
                            </span>
                            <ul className="dropdown-menu">
                              {/* <Link to={`/patients/visits/${singlePatientData?.[0]?._id}`}> */}
                              {/* <Link
                                to={`/patients/profile`}
                                state={{
                                  id: singlePatientData?.[0]?._id,
                                  patientId:
                                    singlePatientData?.[0]?.patientId?._id,
                                }}
                              >
                                <li
                                  onClick={() => modalEdit.click()}
                                  style={{ cursor: "pointer" }}
                                >
                                  <span className="dropdown-item">
                                    Go to Visit
                                  </span>
                                </li>
                              </Link> */}
                              <li
                                onClick={() =>
                                  handleCopyAppointment(
                                    singlePatientData?.[0]?._id
                                  )
                                }
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                style={{ cursor: "pointer" }}
                              >
                                <span className="dropdown-item">
                                  Copy appointment
                                </span>
                              </li>
                              {singlePatientData?.[0]?.status ===
                              "cancelled" ? (
                                " "
                              ) : (
                                <li
                                  data-bs-toggle="modal"
                                  // onClick={() =>
                                  //   handleEditAppointment(
                                  //     singlePatientData?.[0]?._id
                                  //   )
                                  // }
                                  onClick={() =>
                                    hanldeSSlot(singlePatientData?.[0]?._id)
                                  }
                                  // data-bs-target="#outModal"
                                  style={{ cursor: "pointer" }}
                                >
                                  <span className="dropdown-item">
                                    Out of Room
                                  </span>
                                </li>
                              )}
                              {singlePatientData?.[0]?.status ===
                              "cancelled" ? (
                                " "
                              ) : (
                                <li
                                  data-bs-toggle="modal"
                                  onClick={() =>
                                    handleEditAppointment(
                                      singlePatientData?.[0]?._id
                                    )
                                  }
                                  data-bs-target="#exampleModal"
                                  style={{ cursor: "pointer" }}
                                >
                                  <span className="dropdown-item">
                                    Reschedule
                                  </span>
                                </li>
                              )}
                              {singlePatientData?.[0]?.status !==
                                "cancelled" && (
                                <li
                                  data-bs-toggle="modal"
                                  onClick={() =>
                                    handleEditAppointment(
                                      singlePatientData?.[0]?._id
                                    )
                                  }
                                  data-bs-target="#notShowedModal"
                                  style={{ cursor: "pointer" }}
                                >
                                  <span className="dropdown-item">
                                    Not-Showed
                                  </span>
                                </li>
                              )}

                              {singlePatientData?.[0]?.status !==
                                "cancelled" && (
                                <li
                                  data-bs-toggle="modal"
                                  data-bs-target="#deleteModal"
                                  onClick={() =>
                                    setSlotId(singlePatientData?.[0]?._id)
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  <span className="dropdown-item">Cancel</span>
                                </li>
                              )}

                              <li
                                data-bs-toggle="modal"
                                data-bs-target="#deleteModale"
                                onClick={() =>
                                  setSlotId(singlePatientData?.[0]?._id)
                                }
                                style={{ cursor: "pointer" }}
                              >
                                <span className="dropdown-item">Delete</span>
                              </li>
                            </ul>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th
                          style={{ textAlign: "right", paddingRight: "10px" }}
                        >
                          <span className="font-weight-bold">
                            Patient Name :
                          </span>
                        </th>
                        <td className="ps-2">
                          <span>
                            {singlePatientData?.[0]?.patientId?.salutation +
                              " " +
                              singlePatientData?.[0]?.patientId?.firstName +
                              " " +
                              singlePatientData?.[0]?.patientId?.lastName}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th
                          style={{ textAlign: "right", paddingRight: "10px" }}
                        >
                          <span className="font-weight-bold">
                            Service Type:
                          </span>
                        </th>
                        <td className="ps-2">
                          {singlePatientData?.[0]?.serviceId?.serviceName}
                        </td>
                      </tr>
                      <tr>
                        <th
                          style={{ textAlign: "right", paddingRight: "10px" }}
                        >
                          <span className="font-weight-bold">Date :</span>
                        </th>
                        <td className="ps-2">
                          <span>
                            {singlePatientData?.[0]?.startTime
                              ?.split("T")[0]
                              ?.split("-")
                              .reverse()
                              .join("/")}
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <th
                          style={{ textAlign: "right", paddingRight: "10px" }}
                        >
                          <span className="font-weight-bold">Room :</span>
                        </th>
                        <td className="ps-2">
                          <span>
                            {singlePatientData?.[0]?.roomId?.roomName}
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <th
                          style={{ textAlign: "right", paddingRight: "10px" }}
                        >
                          <span className="font-weight-bold">
                            Appointment Type :{" "}
                          </span>
                        </th>
                        <td className="ps-2">
                          {singlePatientData?.[0]?.status === "cancelled" ? (
                            <select
                              disabled
                              style={{
                                color: "white",
                                backgroundColor: "#c5401d",
                              }}
                              className="status-select form-control w-auto pt-0 pb-0"
                            >
                              {/* {o?.appointmentType  ? getappointmentType: " -"} */}
                              <option>Cancelled</option>
                            </select>
                          ) : (
                            <select
                              disabled
                              style={{
                                color: "white",
                                backgroundColor:
                                  singlePatientData?.[0]?.appointmentType ===
                                  "Reschedule"
                                    ? "#aac4e9"
                                    : singlePatientData?.[0]
                                        ?.appointmentType === "New"
                                    ? "#e71ae1"
                                    : singlePatientData?.[0]
                                        ?.appointmentType === "Cancelled"
                                    ? "#c5401d"
                                    : singlePatientData?.[0]
                                        ?.appointmentType === "Consultation"
                                    ? "#68b04c"
                                    : singlePatientData?.[0]
                                        ?.appointmentType === "Regular"
                                    ? "#d7bb58"
                                    : "#ffff",
                              }}
                              className="status-select form-control w-auto pt-0 pb-0"
                            >
                              {/* {o?.appointmentType  ? getappointmentType: " -"} */}
                              <option>
                                {singlePatientData?.[0]?.appointmentType}
                              </option>
                            </select>
                          )}
                        </td>
                      </tr>

                      <tr>
                        <th
                          style={{ textAlign: "right", paddingRight: "10px" }}
                        ></th>
                        <td className="ps-2"></td>
                      </tr>
                    </tbody>
                  </table>
                  <p
                    style={{ color: "red", fontSize: ".8rem" }}
                    className="ms-2"
                  >
                    {singlePatientData?.[0]?.reason}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header pt-2 pe-2 ps-2">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setReason("")}
              ></button>
            </div>
            <div className="modal-body p-0">
              <div className="d-flex flex-column">
                <div className="mysche-room month-date-popup mb-2">
                  <div className="m-5">
                    <h5 className="">Reason</h5>
                  </div>
                  <div className="m-5">
                    <input
                      type="text"
                      className="form-control"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Enter Reason"
                    />
                  </div>
                  <div
                    style={{ justifyContent: "end", flexWrap: "wrap" }}
                    className="d-flex"
                  >
                    <button
                      className="btn-sm btn-primary"
                      onClick={() => handleSlotDelete("cancel")}
                      disabled={!reason}
                    >
                      {" "}
                      Submit
                    </button>
                    {/* <button
                      className="btn-sm btn-primary"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      No
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="outModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header pt-2 pe-2 ps-2">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setReason("")}
              ></button>
            </div>
            <div className="modal-body p-0">
              <div className="d-flex flex-column">
                <div className="mysche-room month-date-popup mb-2">
                  <div className="m-5">
                    <h5 className="">Are you want </h5>
                  </div>
                  <div className="m-5">
                    <input
                      type="text"
                      className="form-control"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Enter Reason"
                    />
                  </div>
                  <div
                    style={{ justifyContent: "end", flexWrap: "wrap" }}
                    className="d-flex"
                  >
                    <button
                      className="btn-sm btn-primary"
                      onClick={() => handleSlotDelete("outOfRoom")}
                      // disabled={!reason}
                    >
                      {" "}
                      Submit
                    </button>
                    {/* <button
                      className="btn-sm btn-primary"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      No
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="notShowedModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header pt-2 pe-2 ps-2">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setReason("")}
              ></button>
            </div>
            <div className="modal-body p-0">
              <div className="d-flex flex-column">
                <div className="mysche-room month-date-popup mb-2">
                  <div className="m-5">
                    <h5 className="">Reason</h5>
                  </div>
                  <div className="m-5">
                    <input
                      type="text"
                      className="form-control"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Enter Reason"
                    />
                  </div>
                  <div
                    style={{ justifyContent: "end", flexWrap: "wrap" }}
                    className="d-flex"
                  >
                    <button
                      className="btn-sm btn-primary"
                      onClick={() => handleSlotDelete("notShowed")}
                      disabled={!reason}
                    >
                      {" "}
                      Submit
                    </button>
                    {/* <button
                      className="btn-sm btn-primary"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      No
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="deleteModale"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header pt-2 pe-2 ps-2">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-0">
              <div className="d-flex flex-column">
                <div className="mysche-room month-date-popup mb-2">
                  <div className="m-5">
                    <h5 className="ms-5">
                      Are you sure to delete this appointment ?{" "}
                    </h5>
                  </div>
                  <div style={{ justifyContent: "end" }} className="d-flex">
                    <button
                      className="btn-sm btn-primary"
                      onClick={handleSlotDeletes}
                    >
                      {" "}
                      Yes
                    </button>
                    <button
                      className="btn-sm btn-primary"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="addModal"
        tabIndex={-1}
        aria-labelledby="addModal"
        aria-hidden="true"
      >
        <AddPatientModal
          // getPatientsData={getPatientsData}
          // getRecentPatientsData={getRecentPatientsData}
          modal={addModalr}
          schedule={true}
          getAllPatients={getAllPatients}
          // searchVal={searchVal}
          // currentPage={currentPage}
          // limit={limit}
          // limitRecent={limitRecent}
          // currentPageRecent={currentPageRecent}
        />
      </div>
      <div
        className="modal fade"
        id="exampleModalreport"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <ConsultationModal reportData={reportData} />
      </div>
      {toggle && (
        <div
          className="modal"
          id="exampleModalsym"
          style={{ display: "block" }}
          tabIndex="-1"
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
                >
                  Save
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
          tabIndex="-1"
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
      {/* // Jump date modal popup code start here... */}
      <div
        className="modal fade"
        id="jumpdate"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <p className="modal-title fs-5" id="exampleModalLabel">
                Go To Date
              </p>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <hr />
            <div className="modal-body pt-1 pb-1">
              <input
                type="date"
                name=""
                className="form-control"
                id=""
                value={jumpDate}
                onChange={(e) => setJumpDate(e.target.value)}
              />
            </div>
            <div className="modal-footer text-end">
              <button
                type="button"
                className="btn btn-sm  btn-light border-base"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-sm  btn-primary border-base"
                onClick={handleJumpDate}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="consultationForm"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <ConsultationForm
          modal={modalConsultation}
          data={pId}
          // value={getRecentConsultaionData}
        />
      </div>
    </>
  );
};

export default Mysechedule;
