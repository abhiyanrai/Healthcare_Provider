import { useFormik } from "formik";
import React from "react";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-hot-toast";
import {
  createHolidayApi,
  createScheduleApi,
  getScheduleDetailsApi,
} from "../../../Apis";

const HolidayModal = ({ holiday, aId, modals, getScheduleDetails }) => {
  const [holidays, setHolidays] = useState([]);
  const [loading,setLoadig]=useState(false);
  console.log(holiday, "HOlidddyaay");
  const { values, setFieldValue,setValues, handleChange, handleSubmit } = useFormik({
    initialValues: {
      date: "",
      name: "",
    },
    onSubmit: async (value) => {
      console.log(value, "valuesss");
      if (value.date &&  value.name){
        setLoadig(true)
        holidays.push(value);
  
        try {
          setTimeout(async () => {
            const res = await createScheduleApi({ id: aId, holidays: holidays });
            if (res.status === 200 || res.status === 201) {
              toast.success("Holiday added successfully",{id:"002"});
              modals.click();
              getScheduleDetails();
              setValues({
                date: "",
                name: "",
              });
              setLoadig(false);
            }
            console.log(res, "responseeee");
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      }else{
        toast.error('Please fill the details',{id:"009"})
      }
     
    },
  });
  const handleHolidayDate = (e) => {
    console.log(
      new Date(e).toLocaleDateString(),
      "evenrere",
      new Date(holiday[0]?.date).toLocaleDateString()
    );

    let d = holiday?.filter(
      (f) =>
        new Date(f.date)?.toLocaleDateString() ===
        new Date(e)?.toLocaleDateString()
    );
    console.log(d, "fukterersdf");
    if (d?.length) {
      toast.error("Holiday already added!",{id:"001"});
      setFieldValue("date", "");
    } else {
      setFieldValue("date", e);
    }
  };
  console.log(holidays, "holidayssss");
  useEffect(() => {
    setHolidays(holiday);
  }, [holiday]);
  return (
    <div className="modal-dialog modal-lg modal-dialog-centered">
      <div className="modal-content shadow-3">
        <div className="modal-header">
          <div className="h3 text-start">Holidays</div>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        {/* className="form-control form-control-solid pe-4" */}
        <div className="modal-body">
          <div className="mb-3 ">
            <div className="row ">
              <div className="col-sm-6">
                <label className="form-label" htmlFor="name">
                  Date
                </label>
                <DatePicker
                  selected={values.date}
                  minDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                  onChange={handleHolidayDate}
                  className="form-control"
                  placeholderText="DD/MM/YYYY"
                  timeCaption="Time"
                />
              </div>
              <div className="col-sm-6">
                <label className="form-label" htmlFor="name">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="Enter Description"
                  className="form-control form-control-solid pe-4"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mt-5" style={{ float: "right" }}>
              <button
                type="button"
                className="btn btn-primary me-3"
                style={{ width: "150px" }}
                onClick={handleSubmit}
                disabled={loading}
              >
                Add holiday
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayModal;
