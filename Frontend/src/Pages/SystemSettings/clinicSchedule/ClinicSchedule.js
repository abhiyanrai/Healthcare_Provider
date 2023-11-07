import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-hot-toast";
import { createScheduleApi, getScheduleDetailsApi } from "../../../Apis";
import HolidayModal from "./HolidayModal";
import { setHours, setMinutes } from "date-fns";
const ClinicSchedule = () => {
  const [sId, setSId] = useState("");
  const [render, setRender] = useState(true);
  const { values, handleSubmit, setValues, setFieldValue } = useFormik({
    initialValues: {
      scheduleDetails: [
        {
          day: "Monday",
          schedule: [{ startTime: "", endTime: "" }],
          // _id:""
        },
        {
          day: "Tuesday",
          schedule: [{ startTime: "", endTime: "" }],
          // _id:""
        },
        {
          day: "Wednesday",
          schedule: [{ startTime: "", endTime: "" }],
          // _id:""
        },
        {
          day: "Thursday",
          schedule: [{ startTime: "", endTime: "" }],
          // _id:""
        },
        {
          day: "Friday",
          schedule: [{ startTime: "", endTime: "" }],
          // _id:""
        },
        {
          day: "Saturday",
          schedule: [{ startTime: "", endTime: "" }],
          // _id:""
        },
        {
          day: "Sunday",
          schedule: [{ startTime: "", endTime: "" }],
          // _id:""
        },
      ],
    },
    onSubmit: async (value) => {
      console.log(value, "formik value");
      let data;
      if (sId != "") {
        data = {
          id: sId,
          ...values,
        };
      } else {
        data = { ...values };
      }
      try {
        const res = await createScheduleApi(data);
        if (res.status === 200 || res.status === 201) {
          toast.success(res.data.message, { id: "004" });
          getScheduleDetails();
        }
        console.log(res, "createdd");
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message, { id: "003" });
      }
    },
  });

  const getScheduleDetails = async () => {
    try {
      const res = await getScheduleDetailsApi();

      if (res?.status === 200 || res?.status === 201) {
        if(res?.data?.schedule?.scheduleDetails?.length){
          setFieldValue("scheduleDetails", res?.data?.schedule?.scheduleDetails);
          setSId(res.data.schedule._id);
        }else{
          setFieldValue("scheduleDetails", values?.scheduleDetails);
          setSId(res?.data?.schedule?._id);
        }
      }
    } catch (err) {
      console.log(err);
      setFieldValue("scheduleDetails", values?.scheduleDetails);
    }
  };

  const hanldleMultipleSchedule = (day) => {
    setFieldValue(`scheduleDetails.${day}.schedule`, [
      ...values.scheduleDetails[day].schedule,
      { startTime: "", endTime: "" },
    ]);
  };

  const hanldleResetSchedule = (day, id) => {
    console.log(values?.scheduleDetails, "SDFCXVDAGDFGSFD", id, day);
    if (values.scheduleDetails?.[day]?.schedule?.length > 1) {
      values.scheduleDetails?.[day]?.schedule.splice(id, 1);
      setRender(!render);
    } else {
      setFieldValue(`scheduleDetails.${day}.schedule.${id}.endTime`, "");
      setFieldValue(`scheduleDetails.${day}.schedule.${id}.startTime`, "");
    }
  };

  const handleStartTime = (e, i, ci, name) => {
    setFieldValue(`scheduleDetails.${i}.schedule.${ci}.${name}`, e);
    setFieldValue(`scheduleDetails.${i}.schedule.${ci}.endTime`, "");
  };
  const handleEndTime = (e, i, ci, name) => {
    if (values?.scheduleDetails?.[i]?.schedule?.[ci]?.startTime > e) {
      toast.error("End time should be greater . ", { id: "001" });
      setFieldValue(`scheduleDetails.${i}.schedule.${ci}.${name}`, "");
    } else {
      setFieldValue(`scheduleDetails.${i}.schedule.${ci}.${name}`, e);
    }
  };

  useEffect(() => {
    getScheduleDetails();
  }, []);

  return (
    <div className="accordion-body">
      <table className="table">
        <thead>
          <tr>
            <th>Day</th>
            <th><span>Start Time</span>  <span style={{marginLeft: '460px'}} >End Time</span></th>
            
            {/* <th>End Time</th> */}
           
            <th>Action</th>
            
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>Monday</td>
            <td>Monday</td>
            <td>Monday</td>
            <td>
              <button
                type="button"
                class="btn btn-sm btn-square btn-neutral text-danger-hover me-2"
              >
                <i class="bi bi-trash"></i>
              </button>
              <button className="btn btn-sm btn-neutral">
                <i class="bi bi-plus"></i>
              </button>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>asdf asdfklj </td>
            <td></td>
          </tr> */}

          {Boolean(values?.scheduleDetails?.length) &&
            values?.scheduleDetails?.map((v, i) => {
              return (
                <tr>
                  <td>{v?.day}</td>
                  {v?.schedule?.map((t, ci) => {
                    return (
                      <tr style={{display: 'flex', justifyContent: 'space-between'}}>
                        <td>
                          <DatePicker
                            selected={
                              values?.scheduleDetails?.[i]?.schedule?.[ci]
                                ?.startTime
                                ? new Date(
                                    values?.scheduleDetails?.[i]?.schedule?.[
                                      ci
                                    ]?.startTime
                                  )
                                : values?.scheduleDetails?.[i]?.schedule?.[ci]
                                    ?.startTime
                            }
                            onChange={(e) =>
                              handleStartTime(e, i, ci, "startTime")
                            }
                            inputReadOnly={true}
                            showTimeSelect
                            onPaste={(e)=>e.preventDefault()}
                            onKeyDown={(e)=>e.preventDefault()}
                            className="form-control"
                            showTimeSelectOnly
                            placeholderText="select time"
                            timeIntervals={10}
                            // minTime={values?.scheduleDetails[0]?.schedule?.length ? values?.scheduleDetails[0]?.schedule?.[0]?.endTime:""}
                            // maxTime=""
                            // minTime={ values?.scheduleDetails?.[0]?.schedule?.length ?  new Date(values?.scheduleDetails?.[0]?.schedule?.[0]?.endTime):""}
                            minTime={ values?.scheduleDetails?.[i]?.schedule?.length > 1 ? setHours(setMinutes(new Date(),new Date(values?.scheduleDetails[i]?.schedule?.[ci-1]?.endTime).toLocaleTimeString()?.split(":")[1]),new Date(values?.scheduleDetails[i]?.schedule?.[ci-1]?.endTime).toLocaleTimeString()?.split(":")[0]):setHours(setMinutes(new Date(),0),0)}
                            maxTime={setHours(setMinutes(new Date(),59),23)}
                          
                            timeCaption="Time"
                            dateFormat="hh:mm:ss a"
                          />
                          {console.log(new Date(values?.scheduleDetails[0]?.schedule?.[0]?.endTime).toLocaleTimeString()?.split(":")[0],"UTIREOJJFDA")}
                        </td>
                        <td>
                          <DatePicker
                            selected={
                              values?.scheduleDetails?.[i]?.schedule?.[ci]
                                ?.endTime
                                ? new Date(
                                    values?.scheduleDetails?.[i]?.schedule?.[
                                      ci
                                    ]?.endTime
                                  )
                                : values?.scheduleDetails?.[i]?.schedule?.[ci]
                                    ?.endTime
                            }
                            onChange={(e) => handleEndTime(e, i, ci, "endTime")}
                            showTimeSelect
                            className="form-control"
                            onPaste={(e)=>e.preventDefault()}
                            onKeyDown={(e)=>e.preventDefault()}
                            showTimeSelectOnly
                            placeholderText="select time"
                            timeIntervals={10}
                            timeCaption="Time"
                            dateFormat="hh:mm:ss a"
                          />
                        </td>
                  
                        <td>
                          <button
                            type="button"
                            class="btn btn-sm btn-square btn-neutral text-danger-hover me-2"
                            onClick={()=>hanldleResetSchedule(i,ci)}
                          >
                            {ci <=0 && v?.schedule?.length <=1  ? <i class="bi bi-arrow-counterclockwise"></i> :<i class="bi bi-trash" ></i>}
                            
                          </button>
                          {/* <button className="btn btn-sm btn-neutral" 
                          onClick={()=>hanldleMultipleSchedule(i,ci)}
                          >
                            <i class="bi bi-plus"></i>
                          </button> */}
                        </td>
                      </tr>
                    );
                  })}
                  <td>
                  <button className="btn btn-sm btn-neutral" 
                          onClick={()=>hanldleMultipleSchedule(i)}     
                          >
                            <i class="bi bi-plus"></i>
                          </button>
                  </td>
                </tr>

              );
            })}
        </tbody>
      </table>
      <button
        className="btn btn-primary btn-sm mt-5"
        type="submit"
        onClick={handleSubmit}
      >
        Save
      </button>

      {/* <a
        href="#holiday"
        // className="btn btn-primary"
        data-bs-toggle="modal"
        style={{ textDecoration: "underline" }}
      >
        {" "}
        Holiday List{" "}
      </a> */}
    </div>
  );
};

export default ClinicSchedule;
