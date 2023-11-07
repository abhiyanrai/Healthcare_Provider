// import { reactSelectCustomStyle } from "../../../styles/reactSelectStyle";
import { useState } from "react";
import TimePicker from "react-time-picker/dist/entry.nostyle";
import moment from "moment/moment";
import { useFormik } from "formik";
import { scheduleValidation } from "./validation";
import toast from 'react-hot-toast';
import {
  createSlotApi,
  getAllslotApi,
  getDaysSlotApi,
  getServiceApi,
  updateSlotApi,
} from "../../../Apis";
import { useEffect } from "react";
import { tConvert } from "../../../utils/helperFunctions";
import { InputErrorMessage } from "../../../Components/common/Errors";

const CreateMemberSchedule = (props) => {
  const [slotId, setSlotId] = useState();
  const [daysSlot, setDaysSlot] = useState([]);
  const [disabled,setDisabled]=useState(true);
  const [disabledBtn,setDisabledBtn]=useState("true");
  const [selectedServices, setSelectedServices] = useState([]);
  const [render,setRender] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const modall = document.getElementById("exampleModalt");
  // const [services, setServices] = useState({
  //   message: "",
  //   status: 0,
  //   data: null,
  //   loading: false,
  // });

  const [allServices, setAllServices] = useState([]);

  // const [allClinics, setAllClinics] = useState({
  //   message: "",
  //   status: 0,
  //   data: null,
  //   loading: false,
  // });
  const [createScheduleRes, setCreateScheduleRes] = useState({
    message: "",
    status: 0,
    data: null,
    loading: false,
  });
  const isValidTime = document.querySelectorAll(
    "input.react-time-picker__inputGroup__input.react-time-picker__inputGroup__minute"
  );
  const validTime = isValidTime[0]?.value <= 59 && isValidTime[1]?.value <= 59;

  const formikHandleSchedule = useFormik({
    initialValues: {
      scheduleDetails: [
        {
          day: "Monday",
          selected: true,
          schedule: [
            { startTime: "", endTime: "", serviceId: "", schedule: null },
          ],
        },
        {
          day: "Tuesday",
          selected: false,
          schedule: [],
        },
        {
          day: "Wednesday",
          selected: false,
          schedule: [],
        },
        {
          day: "Thursday",
          selected: false,
          schedule: [],
        },
        {
          day: "Friday",
          selected: false,
          schedule: [],
        },
        {
          day: "Saturday",
          selected: false,
          schedule: [],
        },
        {
          day: "Sunday",
          selected: false,
          schedule: [],
        },
      ],
    },
    validationSchema: scheduleValidation,
    onSubmit: async (values) => {
      console.log(values, "???????????????????");

      try {
        if (slotId) {
          let data = {
            id: slotId,
            ...values,
          };
          const response = await updateSlotApi(data);
          if (response.status === 200 || response.status === 201) {
            toast.success(response?.data?.message);
            getAllSlots();
          }
        } else {
          const response = await createSlotApi(values);
          if (response.status === 200 || response.status === 201) {
            toast.success(response?.data?.message);
            getAllSlots();
          }
        }
      } catch (err) {
        toast.error("Something went wrong!");
      }

      if (!createScheduleRes.loading && validTime) {
        if (
          formikHandleSchedule.values.scheduleDetails?.filter(
            (el) => el.selected
          )?.length
        ) {
          setCreateScheduleRes({
            ...createScheduleRes,
            loading: true,
            data: null,
            message: "",
            status: 0,
          });
          try {
            let ms = {};
            for (let i = 0; i < values.scheduleDetails.length; i++) {
              let scheduleObj = values.scheduleDetails[i].schedule;
              scheduleObj = scheduleObj.map((so) => ({
                ...so,
                schedule: createSlot({
                  duration: so.duration.value,
                  startTime: so.startTime,
                  endTime: so.endTime,
                }),
              }));
              ms[values.scheduleDetails[i].value] = scheduleObj;
            }
            // const payload = {
            //   scheduleDetails: {
            //     ...ms,
            //     clinicId: values.clinicId,
            //     memberId: "",
            //     services: selectedServices.length
            //       ? selectedServices.map((l) => l.value)
            //       : [],
            //   },
            // };
            const res = await createSlotApi(values);

            if (res && res.data && res.data.status == 1) {
              setCreateScheduleRes({
                ...createScheduleRes,
                status: 1,
                message: res.data.message,
                data: res.data.data,
              });
              setIsUpdate(false);
              //   router.push(`/member/${getLastElementId()}`);
            } else {
              setCreateScheduleRes({
                ...createScheduleRes,
                status: 0,
                loading: false,
                message: res.data.message,
                data: null,
              });
            }
          } catch (err) {
            const message = err.response?.data?.message;
            setCreateScheduleRes({
              ...createScheduleRes,
              loading: false,
              data: null,
              message,
              status: 0,
            });
          }
        } else {
          setCreateScheduleRes({
            ...createScheduleRes,
            loading: false,
            data: null,
            message: "At least 1 schedule required.",
            status: 0,
          });
        }
      }
    },
  });

  console.log(createScheduleRes, "errorrororororoorororororossssss");
  const generateTimeSlots = (obj) => {
    var startTime = moment(obj.startTime, "HH:mm");
    var endTime = moment(obj.endTime, "HH:mm");

    let slots = [];
    while (
      startTime < endTime &&
      endTime.diff(startTime, "minutes") >= obj.duration
    ) {
      slots.push(startTime.format("HH:mm"));
      startTime = startTime.add(obj.duration, "minutes");
    }
    return slots;
  };

  const loadDuration = async () => {
    try {
      const response = await getServiceApi();
      if (response.status === 200 || response.status === 201) {
        setAllServices(response?.data?.allServices);
      }
    } catch (err) {
      const message = err?.response?.data?.message || err?.response?.statusText;
    }
  };

  console.log(formikHandleSchedule.errors, "KLKLKLKL")

  // const isObjectEmpty = (objectName) => {
  //   return JSON.stringify(objectName) === "{}";
  // };

  // const handleModalClick = (formik) => {
  //   console.log(isObjectEmpty(formik.errors), "()()()")
  //   if(isObjectEmpty(formik.errors)){
  //     modall.click()
  //   }else{
  //     console.log("FFFFFFFFFFFFF")
  //     return;
  //   }
  // };
  // const loadClinicServices = async () => {
  //   if (formikHandleSchedule.values.clinicId) {
  //       try {
  //         const { data } = await getAllClinics();
  //         let s = data.data?.find(
  //           (l) => l.id == formikHandleSchedule.values.clinicId
  //         ).services;
  //         s = s?.map((el) => {
  //           return {
  //             value: el.id,
  //             label: `${el.name}`,
  //           };
  //         });
  //         return s;
  //       } catch (err) {
  //         const message =
  //           err?.response?.data?.message || err?.response?.statusText;
  //       }
  //   }
  // };

  // const loadClinics = async () => {
  //   try {
  //     setAllClinics((c) => ({
  //       ...c,
  //       loading: true,
  //       data: null,
  //       status: 0,
  //       message: "",
  //     }));
  //     //   const memberId = getLastElementId()
  //     // let memberId;
  //     //   const { data } = await getAllClinics(memberId="");
  //     //   if (data) {
  //     //     setAllClinics((c) => ({
  //     //       ...c,
  //     //       loading: false,
  //     //       data: data.data,
  //     //       status: 1,
  //     //       message: data.message,
  //     //     }));
  //     //   }
  //     //   let c = data.data;
  //     //   c = c?.map((el) => {
  //     //     return {
  //     //       value: el.id,
  //     //       label: `${el.name}`,
  //     //     };
  //     //   });
  //     //   return c;
  //   } catch (err) {
  //     const message = err?.response?.data?.message || err?.response?.statusText;
  //     setAllClinics((c) => ({
  //       ...c,
  //       loading: false,
  //       data: null,
  //       status: 0,
  //       message: message,
  //     }));
  //   }
  // };

  // const handleClinicSelect = (e) => {
  //   setIsUpdate(true);
  //   setSelectedClinic(e);
  //   setSelectedServices([]);
  //   formikHandleSchedule.setFieldValue("clinicId", e.value);
  // };

  // const handleServiceSelect = (e) => {
  //   setIsUpdate(true);
  //   setSelectedServices(e);
  //   formikHandleSchedule.setFieldValue("services", e.length ? e : null);
  // };
  console.log(formikHandleSchedule.errors, "erororororororo");

  const getAllSlots = async () => {
    try {
      // const response = await getAllslotApi();
      // if (response.status === 200 || response.status === 201) {
      //   const scheduleDetails =
      //     response?.data?.daysAvailability?.scheduleDetails?.map((l) => ({
      //       ...l,
      //       selected: Boolean(l?.schedule?.length),
      //     }));
      //   if (scheduleDetails?.length) {
      //     formikHandleSchedule.setFieldValue(
      //       "scheduleDetails",
      //       scheduleDetails
      //     );
      //     setSlotId(response?.data?.daysAvailability?._id);
      //   }
      // }
    } catch (err) {
      // toast.error("Not found");
    }
  };
  const handleDaySelect = (selected, index) => {
    if(render){
      setRender(false)
    }else{
      setRender(true)
    }
    setIsUpdate(true);
    formikHandleSchedule.setFieldValue(
      `scheduleDetails.${index}.selected`,
      !selected
    );
    
    if (!selected) {
      formikHandleSchedule.setFieldValue(`scheduleDetails.${index}.schedule`, [
        { startTime: "", endTime: "", serviceId: "", schedule: null },
      ]);
      if(render){
        setRender(false)
      }else{
        setRender(true)
      }
    } else {
      formikHandleSchedule.setFieldValue(
        `scheduleDetails.${index}.schedule`,
        []
      );
      if(render){
        setRender(false)
      }else{
        setRender(true)
      }
    }
  };
console.log(formikHandleSchedule?.values?.scheduleDetails,"valuesdksu ksjflk surs ")

const isValidBtn =()=>{

  // formikHandleSchedule?.values?.scheduleDetails?.filter((v)=> {
  //   return v.selected === true ? true:false ;
  // })
  for (let i = 0 ;i<=formikHandleSchedule?.values?.scheduleDetails?.length;i++){
      console.log( "for loop")
  }
  // formikHandleSchedule?.scheduleDetails?.map((v)=>{
  //   if(v.selected === "true"){
  //     // setDisabledBtn(false);
  //     return false;
  //   }else{
  //     // setDisabledBtn(true)
  //     return true;
  //   }
  // })
}

console.log(disabledBtn ,"disabledBtn")
  const handleCustomSelect = (name, value, Pindex, index) => {
    console.log(name, value, Pindex, index, "name, value, Pindex, index");
    setIsUpdate(true);
    formikHandleSchedule.setFieldValue(
      `scheduleDetails.${Pindex}.schedule.${index}.${name}`,
      value
    );
    console.log(
      formikHandleSchedule?.values?.scheduleDetails?.[Pindex].schedule?.[index]
        ?.startTime,
      "jsdfkljfksdjkfdsjkfsdljfklsd"
    );
    // let slots = generateTimeSlots({
    //   duration:
    //     formikHandleSchedule.values.scheduleDetails[Pindex].schedule[index]
    //       ?.duration?.value,
    //   startTime:
    //     formikHandleSchedule.values.scheduleDetails[Pindex].schedule[index]
    //       ?.startTime,
    //   endTime:
    //     formikHandleSchedule.values.scheduleDetails[Pindex].schedule[index]
    //       ?.endTime,
    // });

    // formikHandleSchedule.setFieldValue(
    //   `scheduleDetails.${Pindex}.schedule.${index}.schedule`,
    //   slots.length ? slots : null
    // );
  };

  const createSlot = ({ serviceId, startTime, endTime }) => {
    let slots = generateTimeSlots({
      serviceId,
      startTime,
      endTime,
    });

    return slots?.length
      ? slots.map((a) => ({ label: tConvert(a), value: a, booked: false }))
      : [];
  };
  const handleAddSchedule = (Pindex) => {
    setIsUpdate(true);
    const val = formikHandleSchedule.values.scheduleDetails[Pindex].schedule;
    val.push({ startTime: "", endTime: "", serviceId: "", schedule: null });
    formikHandleSchedule.setFieldValue(
      `scheduleDetails.${Pindex}.schedule`,
      val
    );
  };

  const handleRmoveSchedule = (Pindex, index) => {
    setIsUpdate(true);
    const val = formikHandleSchedule.values.scheduleDetails[Pindex].schedule;
    val.splice(index, 1);
    formikHandleSchedule.setFieldValue(
      `scheduleDetails.${Pindex}.schedule`,
      val
    );
  };

  const allDays = formikHandleSchedule.values.scheduleDetails;
  // let clinicScheduleExist = allClinics.data
  //   ?.find((l) => l.id == selectedClinic?.value)
  //   ?.schedules?.filter((s) => s.memberId == "")?.length;

  const getDaysSlot = async () => {
    // try {
    //   const res = await getDaysSlotApi();
    //   console.log(res, "response day slotttttt");
    //   if (res.status === 200 || res.status === 201) {
    //     setDaysSlot(res.data.allSlots);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };

  daysSlot?.map((v) => {
    return v?.slot?.map((va) => {
      return va[0]?.slots?.map((ve) => {
        return console.log(ve, "inside map");
      });
    });
  });

  useEffect(()=>{
    if(formikHandleSchedule?.errors?.scheduleDetails){
      setDisabled(true);
    }else{
      setDisabled(false);
    }
  },[formikHandleSchedule?.errors])
  useEffect(() => {
    getDaysSlot();
    getAllSlots();
  }, []);
  useEffect(()=>{
    for (let i = 0 ;i<=formikHandleSchedule?.values?.scheduleDetails?.length;i++){
      console.log( "for loop")
      if(formikHandleSchedule?.values?.scheduleDetails?.[i]?.selected === true){
        setDisabledBtn(false);
        console.log(formikHandleSchedule?.values?.scheduleDetails?.[i]?.selected,"{}{}{}{")
      }else{
        setDisabledBtn(true);
        console.log(formikHandleSchedule?.values?.scheduleDetails?.[i]?.selected,"{}{}{}{")
        return;
      }
    }
  },[render])
useEffect(()=>{
  loadDuration();
  // isValidBtn();
},[])
  return (
    <div headerLayout="adminHeader">
      <div className="account_settings_wrapper edit_member_wrapper">
        <div className="container">
          <form  className="FormSet" onSubmit={formikHandleSchedule.handleSubmit}>
            <div className="row">
              <div className="col-xl-8 offset-xl-2">
                <div className="d-flex align-items-center justify-content-between mb-4"></div>
                {/* line code heere below */}
              </div>
            </div>
       

            <div className="row">
              <div className="col-xl-8 offset-xl-2">
                <h5 className="fs-4 mb-4">Schedule Info</h5>
                <div className="account_parent">
                 
                  <div className="row mb-2 mx-0 ">
                    {formikHandleSchedule.values.scheduleDetails?.map(
                      (el, index) => (
                        <div
                          className="col-6 col-sm-4 col-xl-3 mb-1"
                          key={el.value}
                        >
                          <div
                            className={el.selected ? "days activeday" : "days"}
                            onClick={() => handleDaySelect(el.selected, index)}
                          >
                            {el.day}
                          </div>
                        </div>
                      )
                      )}
                      </div>
                  {allDays?.map((el, Pindex) => (
                    <div
                      className="row mb-4 mx-0 border-bottom border-color-light pb-4"
                      hidden={!el.selected}
                    >
                      <div className="col-sm-12">
                        <div className="mb-2 fs-13 font-weight-500">
                          Schedule for {el.day}
                        </div>
                      </div>

                      {el?.schedule?.map((sd, index, ss) => {
                        return (
                          <div className="row position-relative">
                            <div className="col-md-4">
                              <div
                                className={
                                  formikHandleSchedule.touched
                                    .scheduleDetails &&
                                  formikHandleSchedule.errors.scheduleDetails &&
                                  Boolean(
                                    formikHandleSchedule.errors.scheduleDetails[
                                      Pindex
                                    ]?.schedule[index]?.startTime
                                  ) &&
                                  Boolean(
                                    formikHandleSchedule.touched
                                      .scheduleDetails[Pindex]?.schedule[index]
                                      ?.startTime
                                  )
                                    ? "error time_box"
                                    : "time_box"
                                }
                              >
                                <div>
                                  <label>Start time</label>
                                  <TimePicker
                                    className="form-control"
                                    disableClock={true}
                                    clearIcon=""
                                    format={"hh:mm a"}
                                    amPmAriaLabel="am"
                                    name={`scheduleDetails.${Pindex}.schedule.${index}.startTime`}
                                    value={
                                      formikHandleSchedule?.values
                                        ?.scheduleDetails[Pindex]?.schedule[
                                        index
                                      ]?.startTime
                                    }
                                    onChange={(value) =>
                                      handleCustomSelect(
                                        "startTime",
                                        value,
                                        Pindex,
                                        index
                                      )
                                    }
                                  />
                                  {/* {console.log(formikHandleSchedule.values?.scheduleDetails?.[Pindex]?.schedule?.[index],'formikHandleSchedule?.values[index]?.schedule[Pindex]?.startTime', index, Pindex)} */}
                                </div>
                              </div>
                              <InputErrorMessage
                                error={
                                  formikHandleSchedule?.errors
                                    ?.scheduleDetails?.[Pindex]?.schedule?.[
                                    index
                                  ]?.startTime
                                }
                                marginBottom={-5}
                              />
                            </div>
                            <div className="col-md-4">
                              <div
                                className={
                                  formikHandleSchedule.touched
                                    .scheduleDetails &&
                                  formikHandleSchedule.errors.scheduleDetails &&
                                  Boolean(
                                    formikHandleSchedule.errors.scheduleDetails[
                                      Pindex
                                    ]?.schedule[index]?.endTime
                                  ) &&
                                  Boolean(
                                    formikHandleSchedule.touched
                                      .scheduleDetails[Pindex]?.schedule[index]
                                      ?.endTime
                                  )
                                    ? "error time_box"
                                    : "time_box"
                                }
                              >
                                <div>
                                  <label>End time</label>

                                  <TimePicker
                                    className="form-control"
                                    disableClock={true}
                                    clearIcon=""
                                    format={"hh:mm a"}
                                    amPmAriaLabel="am"
                                    name={`scheduleDetails.${Pindex}.schedule.${index}.endTime`}
                                    value={
                                      formikHandleSchedule?.values
                                        ?.scheduleDetails[Pindex]?.schedule[
                                        index
                                      ]?.endTime
                                    }
                                    onChange={(value) =>
                                      handleCustomSelect(
                                        "endTime",
                                        value,
                                        Pindex,
                                        index
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <InputErrorMessage
                                error={
                                  formikHandleSchedule?.errors
                                    ?.scheduleDetails?.[Pindex]?.schedule?.[
                                    index
                                  ]?.endTime
                                }
                                marginBottom={-5}
                              />
                            </div>
                            <div className="col-md-3">
                              <label>Select Service</label>
                              <br />
                              <select
                                className={
                                  formikHandleSchedule.touched
                                    .scheduleDetails &&
                                  formikHandleSchedule.errors.scheduleDetails &&
                                  Boolean(
                                    formikHandleSchedule.errors.scheduleDetails[
                                      Pindex
                                    ]?.schedule[index]?.serviceId
                                  ) &&
                                  Boolean(
                                    formikHandleSchedule.touched
                                      .scheduleDetails[Pindex]?.schedule[index]
                                      ?.serviceId
                                  )
                                    ? "error"
                                    : "form-select"
                                }
                                name={`scheduleDetails.${Pindex}.schedule.${index}.serviceId`}
                                onChange={formikHandleSchedule.handleChange}
                                value={
                                  formikHandleSchedule.values
                                    ?.scheduleDetails?.[Pindex]?.schedule?.[
                                    index
                                  ]?.serviceId
                                }
                              >
                                <option hidden>Select</option>
                                {allServices?.map((val) => {
                                  return (
                                    <option value={val._id}>
                                      {val?.serviceName}
                                    </option>
                                  );
                                })}
                              </select>
                              <InputErrorMessage
                                error={
                                  formikHandleSchedule?.errors
                                    ?.scheduleDetails?.[Pindex]?.schedule?.[
                                    index
                                  ]?.serviceId
                                }
                                marginBottom={-5}
                              />
                              {/* <AsyncSelect
                                  //   styles={reactSelectCustomStyle}
                                  cacheOptions
                                  defaultOptions
                                  className={
                                    formikHandleSchedule.touched
                                      .memberSchedule &&
                                    formikHandleSchedule.errors
                                      .memberSchedule &&
                                    Boolean(
                                      formikHandleSchedule.errors
                                        .memberSchedule[Pindex]?.schedule[index]
                                        ?.serviceId
                                    ) &&
                                    Boolean(
                                      formikHandleSchedule.touched
                                        .memberSchedule[Pindex]?.schedule[index]
                                        ?.serviceId
                                    )
                                      ? "error"
                                      : ""
                                  }
                                  placeholder="Select service"
                                  loadOptions={loadDuration}
                                  isSearchable={false}
                                  value={sd.serviceId}
                                  onChange={(value) =>
                                    handleCustomSelect(
                                      "duration",
                                      value,
                                      Pindex,
                                      index
                                    )
                                  }
                                /> */}
                            </div>

                            <div className="col-sm-12">
                              <div className="timings d-flex align-items-center flex-wrap ">
                                {generateTimeSlots({
                                  serviceId: sd.duration?.value,
                                  startTime: sd.startTime,
                                  endTime: sd.endTime,
                                })?.map((l) => (
                                  <div className="time mb-2">{tConvert(l)}</div>
                                ))}
                              </div>
                            </div>

                            <div className="col-sm-12 d-flex justify-content-end mb-3 remove_schedule">
                              {index !== 0 || ss.length > 1 ? (
                                <span
                                  className="remove_text fs-12 text-decoration-underline pt-3 text-end cursor-pointer me-3"
                                  onClick={() =>
                                    handleRmoveSchedule(Pindex, index)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-trash3-fill"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                  </svg>
                                </span>
                              ) : null}
                              {ss?.length === index + 1 ? (
                                <span
                                  className="add_schedule_date text-black fs-12 text-decoration-underline pt-3 text-end cursor-pointer"
                                  onClick={() =>
                                    handleAddSchedule(Pindex, index)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    fill="currentColor"
                                    className="bi bi-plus-square me-2"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                  </svg>
                                  Add another schedule for {el.day}
                                </span>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                  {/* {console.log(Boolean(isValidBtn) ,"funciton datat")} */}
                  <div className="col text-center">
                    <button
                      type="button"
                      className="btn btn-md  btn-primary"
                      disabled={disabled && disabledBtn}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModalt"
                      // onClick={()=>handleModalClick(formikHandleSchedule)}/
                    >
                      Save
                    </button>
                  </div>
                  <div
                  
                    className="modal fade"
                    id="exampleModalt"
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
                                Are you sure want to generate new schedule ?
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
                            type="submit"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            Yes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreateMemberSchedule;
