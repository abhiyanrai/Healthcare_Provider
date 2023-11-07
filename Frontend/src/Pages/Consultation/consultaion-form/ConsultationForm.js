import React, { useState } from "react";
import { useFormik } from "formik";
import { consultationFormSchema } from "../../../Components/Schemas";
import CreatableSelect from "react-select/creatable";
import { InputErrorMessage } from "../../../Components/common/Errors";
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import {
  createConsultationApi,
  getOptionListApiById,
  imageProfileApi,
} from "../../../Apis";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { dropdownIds } from "../../SystemSettings/data";
import moment from "moment";
import { WhiteLoader } from "../../../Components/common/Errors/loader/WhiteLoader";
const ConsultationForm = (props) => {
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  const [multi, setMulti] = useState(false);
  const [clickDis, setclickDis] = useState(false);
  const [multip, setMultip] = useState(false);
  const [toggle, setToggle] = useState({
    symptom: true,
    radiates: true,
    describeSymptoms: true,
    onSet: true,
    palliative: true,
    provocative: true,
    therapist: true,
    help: true,
  });
  const [state, setState] = useState([]);
  const [statewar, setStatewar] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [disabled1, setDisabled1] = useState(false);
  const [inputVal, setInputVal] = useState();
  const [imageData, setImageData] = useState([]);
  const [position, setPosition] = useState("");
  const [fileLoader, setFileLoader] = useState(false);
  const [render, setRender] = useState(false);
  const [freq, setFreq] = useState("");
  const options = [
    { value: "No Cervical Manual!", label: "No Cervical Manual!" },
    { value: "Osteoporosis", label: "Osteoporosis" },
    {
      value: "Disc Herniation - Use Disc Protocols",
      label: "Disc Herniation - Use Disc Protocols",
    },
    { value: "Scoliosis", label: "Scoliosis" },
  ];

  const {
    values,
    handleChange,
    resetForm,
    setErrors,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      symptom: "",
      radiates: "",
      describeSymptoms: "",
      begin: "",
      ago: "",
      blt: "false",
      attachment: [],
      date: moment().format("YYYY-MM-DD"),
      duration: "",
      position: "",
      describeInjury: "",
      palliative: "",
      provocative: "",
      frequency: "",
      warnings: "",
      onSet: "",
      additionalNote: "",
      therapist: "",
      help: "",
      linkReports: [],
      goal: "",
      patientId: props.data || props.patientId,
    },
    validationSchema: consultationFormSchema,
    onSubmit: async (val) => {
      let value = {
        symptomsArr: [val],
        date: val.date,
        patientId: props.data,
      };
      setclickDis(true);
      // console.log(value,"valuesssss")
      try {
        const res = await createConsultationApi(value);
        if (res.status === 200 || res.status === 201) {
          toast.success(res.data.message, { toastId: "succ01" });
          document
            .getElementsByClassName("btn-close btn-close-con-form")[0]
            .click();
          navigate(
            `/Consultation/ConsultationView/${res.data.consultation._id}`
          );
          props.value();
          setclickDis(false);
          resetForm();
        } else {
          toast.error("Something went wrong.", { toastId: "err01" });
        }
      } catch (error) {
        const message =
          error.response?.data?.message || error.response.statusText;
        toast.error(message, { toastId: "err01" });
      }
    },
  });

  const handlerr = (id) => {
    values?.linkReports.splice(id, 1);
    setRender(!render);
  };

  const handleImgDelete = (id) => {
    imageData?.splice(id, 1);
    values?.attachment?.splice(id, 1);
    setRender(!render);
  };
  // console.log(imageData, "ASDFADEEFDVREDFDEREFDSDFASDF", values.linkReports)
  const handleReset = () => {
    setInputVal("");
    setFieldValue("blt", "");
    setCheck(false);
    setFieldValue("position", "");
    setFieldValue("describeSymptoms", "");
    setFieldValue("onSet", "");
    setFieldValue("palliative", "");
    setFieldValue("provocative", "");
    setFieldValue("therapist", "");
    setFieldValue("help", "");
    setImageData([]);
    resetForm();
    setErrors({});
  };
  const handleRadio = (e) => {
    if (e.target.value === "on") return;
    setFieldValue("position", e.target.value);
  };
  const handleConstChange = (e) => {
    if (e.target.value === "Constant" || e.target.value === "Intermittent") {
      setDisabled(true);
      setFieldValue("ago", e.target.value);
      setFieldValue("begin", "");
    } else {
      setDisabled(false);
      setFieldValue("ago", e.target.value);
    }
  };
  const handleConstChangeRepeat = (e, name) => {
    if (e.target.value === "Constant" || e.target.value === "Intermittent") {
      setDisabled1(true);
      setFieldValue("duration", e.target.value);
      setFieldValue("frequency", "");
    } else {
      setDisabled1(false);
      setFieldValue("duration", e.target.value);
    }
  };

  const handleBeginChange = (e) => {
    setFieldValue("begin", e.target.value);
    if (e.target.value <= 1) {
      setMulti(true);
    } else {
      setMulti(false);
    }
  };

  const handleFrequencyChange = (e) => {
    setFieldValue("frequency", e.target.value);
    if (e.target.value <= 1) {
      setMultip(true);
    } else {
      setMultip(false);
    }
  };

  const handleBLtChange = (e) => {
    // setPosition(values.position);
    if (check) {
      setCheck(false);
      setFieldValue("blt", false);
    } else {
      setCheck(true);
      setFieldValue("blt", true);
    }
  };

  const handleFreq = (e) => {
    setFreq(e.target.value);
  };
  const handleLinkReports = () => {
    if (inputVal) {
      setFieldValue("linkReports", [...values.linkReports, inputVal]);
      setInputVal("");
    }
  };

  const handleAttachChange = async (e) => {
    if (!e.target.files[0]) return;
    setFileLoader(true);
    setFieldValue("attachment", e.target.files[0]);
    const formdata = new FormData();
    formdata.append("file", e.target.files[0]);
    try {
      const res = await imageProfileApi(formdata);
      if (res.status === 200 || res.status === 201) {
        setImageData([...imageData, res.data.filePath]);
        setFieldValue("attachment", [
          ...values.attachment,
          res?.data?.filePath,
        ]);
        setFileLoader(false);
        toast.success(res?.data?.message);
      }
    } catch (err) {
      toast.error("Server Error");
      setFileLoader(false);
    }
  };

  const handleInputChange = (e, name) => {
    if (e.value === "Loading ....") return;
    setFieldValue(`${name}`, e.value);
  };
  const options1 =
    state &&
    state?.map((el, i) => {
      let container = {};
      container["value"] = el?.name;
      container["label"] = el?.name;
      return container;
    });

  const getSymptomData = async (id) => {
    setState([
      {
        name: "Loading ....",
        _id: "",
      },
    ]);
    if (id) {
      try {
        const res = await getOptionListApiById(id);
        setState(res.data.allOptions);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleValueWarning = (value) => {
    let d = value?.filter((v) => v.value);
    setFieldValue("warnings", d);
  };
  return (
    <div className="modal-dialog  modal-xl">
      <div className="modal-content">
        <div
          className="modal-header"
          style={{ padding: "0.5rem 0.5rem 0rem 0.5rem" }}
        >
          <button
            type="button"
            className="btn-close btn-close-con-form"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={handleReset}
          ></button>
        </div>
        <div className="modal-body pt-0">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div
                className="col-lg-10"
                onClick={() => getSymptomData(dropdownIds.symptoms)}
              >
                <span className="font-w">
                  <h4>Symptom:</h4>{" "}
                </span>
                <CreatableSelect
                  name="symptom"
                  value={{ label: values?.symptom, value: values?.symptom }}
                  options={options1}
                  onChange={(e) => handleInputChange(e, "symptom")}
                  noOptionsMessage={() => "No Data Found"}
                />
                <InputErrorMessage
                  error={touched.symptom && errors.symptom}
                  marginBottom={-15}
                />
              </div>
              <div className="col-lg-2">
                <span className="font-w"> Date:</span>
                <input
                  className="css-13cymwt-control px-2"
                  style={{ width: "100%" }}
                  type="date"
                  name="date"
                  // disabled
                  value={values.date}
                  onChange={handleChange}
                  id=""
                />
              </div>
              <div className="col-lg-4 mt-lg-5 mt-0">
                <div className="row mt-4" onChange={handleRadio}>
                  <div className="col">
                    <input
                      id="sym-lt"
                      type="radio"
                      value="LEFT"
                      name="position"
                    />
                    <label for="sym-lt" className="sy-lf-rt-bt">
                      LEFT
                    </label>
                  </div>
                  <div className="col">
                    <input
                      id="sym-rt"
                      type="radio"
                      value="RIGHT"
                      name="position"
                    />
                    <label for="sym-rt" className="sy-lf-rt-bt">
                      RIGHT
                    </label>
                  </div>
                  <div className="col">
                    <input
                      id="sym-bit"
                      type="radio"
                      checked={check}
                      name="blt"
                      onClick={handleBLtChange}
                    />
                    <label for="sym-bit" className="sy-lf-rt-bt">
                      BLT
                    </label>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-4 mt-2"
                onClick={() => getSymptomData(dropdownIds.radiatesTo)}
              >
                <span className="font-w">Radiate To: </span>
                <Select
                  name="radiates"
                  options={options1}
                  onChange={(e) => handleInputChange(e, "radiates")}
                  value={
                    Boolean(values?.radiates)
                      ? { label: values?.radiates, value: values?.radiates }
                      : null
                  }
                />
              </div>
              <div
                className="col-lg-4 mt-2"
                onClick={() => getSymptomData(dropdownIds.describeSymptom)}
              >
                <span className="font-w">Describe Symptom: </span>
                <Select
                  name="describeSymptoms"
                  value={{
                    label: values?.describeSymptoms,
                    value: values?.describeSymptoms,
                  }}
                  options={options1}
                  onChange={(e) => handleInputChange(e, "describeSymptoms")}
                  noOptionsMessage={() => "No Data Found"}
                />
              </div>
              <div className="col-lg-2 mt-2">
                <span className="font-w">Began: </span>
                <input
                  className="css-13cymwt-control mt-1"
                  disabled={disabled}
                  type="number"
                  placeholder="Type here..."
                  value={values.begin}
                  min="0"
                  name="begin"
                  onChange={handleBeginChange}
                  style={{ width: "100%" }}
                />
              </div>
              <div className="col-lg-2 col-md-6 mt-2">
                <span className="font-w">Ago: </span>
                <select
                  className="css-13cymwt-control jnl mt-1 me-2"
                  aria-label="Default select example"
                  value={values.ago}
                  name="ago"
                  onChange={handleConstChange}
                  style={{ width: "100%" }}
                >
                  <option selected hidden>
                    Select
                  </option>
                  <option value="Year">Year{multi ? "" : "s"}</option>
                  <option value="Month">Month{multi ? "" : "s"}</option>
                  <option value="Week">Week{multi ? "" : "s"}</option>
                  <option value="Day">Day{multi ? "" : "s"}</option>
                  <option value="Intermittent">Intermittent</option>
                  <option value="Constant">Constant</option>
                </select>
              </div>

              <div className="col-lg-2 col-md-6 mt-2">
                <span className="font-w"> {freq !== "other" && "Frequency:"} </span>

                <select
                  className="form-select"
                  name=""
                  value={freq}
                  onChange={handleFreq}
                  id=""
                >
                  <option value="" hidden>
                    Select
                  </option>
                  <option value="Intermittent">Intermittent</option>
                  <option value="Constant">Constant</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="col-lg-2 col-md-6 mt-2">
              <span className="font-w">{freq == "other" && "Frequency :"}</span>
              <input
                  disabled={freq !== "other"}
                  className="css-13cymwt-control mt-1"
                  type="number"
                  name="frequency"
                  style={{ width: "100%" }}
                  min="0"
                  value={freq == "other" ? values.frequency:""}
                  onChange={handleFrequencyChange}
                  placeholder="Type here..."
                />
                </div>
              {freq == "other" && (
                <div className="col-lg-1 col-md-1 mt-10 ">
                  {values.frequency > 1 ? "times" : "time"} per
                </div>
              )}
              <div className="col-lg-2 col-md-6 mt-2">
                <span className="font-w">Y,M,W,D: </span>
                <select
                  className="css-13cymwt-control mt-1 jnl"
                  aria-label="Default select example"
                  style={{ width: "100%" }}
                  disabled={freq !== "other"}
                  value={values.duration}
                  name="duration"
                  onChange={(e) => handleConstChangeRepeat(e, "duration")}
                >
                  <option selected hidden>
                    Select
                  </option>
                  {/* <option value="Year">Year{multip ? "" : "s"}</option>
                  <option value="Month">Month{multip ? "" : "s"}</option>
                  <option value="Week">Week{multip ? "" : "s"}</option>
                  <option value="Day">Day{multip ? "" : "s"}</option>
                  <option value="Intermittent">Intermittent</option>
                  <option value="Constant">Constant </option> */}
                  <option value="Year">Year</option>
                  <option value="Month">Month</option>
                  <option value="Week">Week</option>
                  <option value="Day">Day</option>
                </select>
              </div>
              <div
                className="col-lg-2 col-md-4 mt-2"
                onClick={() => getSymptomData(dropdownIds.onSet)}
              >
                <span className="font-w">Onset: </span>
                <Select
                  name="onSet"
                  className="mt-1"
                  value={{ label: values?.onSet, value: values?.onSet }}
                  options={options1}
                  onChange={(e) => handleInputChange(e, "onSet")}
                  noOptionsMessage={() => "No Data Found"}
                />
              </div>
              <div className="col-md-12 mt-2">
                <span className="font-w">Description of Injury: </span>
                <textarea
                  style={{ resize: "none" }}
                  className="form-control mt-1"
                  rows="1"
                  type="textarea"
                  value={values.describeInjury}
                  name="describeInjury"
                  onChange={handleChange}
                  placeholder="Type here..."
                />
              </div>

              <div
                className="col-md-6 mt-2"
                onClick={() => getSymptomData(dropdownIds.palliative)}
              >
                <span className="font-w">Palliative: </span>
                <CreatableSelect
                  name="palliative"
                  value={{
                    label: values?.palliative,
                    value: values?.palliative,
                  }}
                  options={options1}
                  onChange={(e) => handleInputChange(e, "palliative")}
                  noOptionsMessage={() => "No Data Found"}
                />
              </div>
              <div
                className="col-md-6 mt-2"
                onClick={() => getSymptomData(dropdownIds.provocative)}
              >
                <span className="font-w">Provocative: </span>
                <CreatableSelect
                  name="provocative"
                  value={{
                    label: values?.provocative,
                    value: values?.provocative,
                  }}
                  options={options1}
                  onChange={(e) => handleInputChange(e, "provocative")}
                  noOptionsMessage={() => "No Data Found"}
                />
              </div>
              <div
                className="col-md-12 mt-2"
                onClick={() => getSymptomData(dropdownIds.warning)}
              >
                <span className="font-w">Warning: </span>
                <CreatableSelect
                  value={values?.warnings}
                  options={options1}
                  // onChange={(e) => handleInputChange(e, "warnings")}
                  isMulti
                  // onCreateOption={(e)=>e.preventDefault()}
                  // options={options}
                  // value={values?.warnings}
                  name="warnings"
                  onChange={(value) => handleValueWarning(value)}
                  // onInputChange={(newValue) => setFieldValue("warnings",newValue)}
                />
              </div>
              <div className="col-md-12 mt-2">
                <span className="font-w">Additional Note: </span>
                <textarea
                  style={{ resize: "none" }}
                  className="form-control jnl mt-1"
                  rows="1"
                  type="textarea"
                  placeholder="Type here..."
                  name="additionalNote"
                  value={values.additionalNote}
                  onChange={handleChange}
                />
              </div>
              <div
                className="col-lg-6 col-md-12 mt-2"
                onClick={() => getSymptomData(dropdownIds.therapist)}
              >
                <span className="font-w">Other Therapist:</span>
                <CreatableSelect
                  name="therapist"
                  value={{ label: values?.therapist, value: values?.therapist }}
                  options={options1}
                  onChange={(e) => handleInputChange(e, "therapist")}
                  noOptionsMessage={() => "No Data Found"}
                />
              </div>
              <div
                className="col-lg-6 col-md-12 mt-2"
                onClick={() => getSymptomData(dropdownIds.help)}
              >
                <span className="font-w">Did it Help?</span>
                <CreatableSelect
                  name="help"
                  options={options1}
                  value={{ label: values?.help, value: values?.help }}
                  onChange={(e) => handleInputChange(e, "help")}
                  noOptionsMessage={() => "No Data Found"}
                />
              </div>
              <div className="col-lg-6 mt-2">
                <span className="font-w">Add Link for Report: </span>
                <div className="input-group mb-3 mt-1">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add link here..."
                    aria-label="paste link here"
                    aria-describedby="button-addon2"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                  />
                  <button
                    className="px-4"
                    type="button"
                    id="button-addon2"
                    onClick={handleLinkReports}
                  >
                    <i className="fa fa-plus" aria-hidden="true"></i>
                  </button>
                </div>
                {values?.linkReports && (
                  <span className="d-flex flex-wrap items-center">
                    {values?.linkReports?.map((val, i) => {
                      return (
                        <>
                          {" "}
                          <a
                            style={{
                              marginLeft: "10px",
                              whitespace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              maxWidth: "180px",
                            }}
                            href={
                              val?.split("")[0] == "h" ? val : `https://${val}`
                            }
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            {val}
                          </a>{" "}
                          <span style={{ cursor: "pointer" }} className="ms-2">
                            <i
                              onClick={() => handlerr(i)}
                              className="bi bi-x-circle"
                            ></i>
                          </span>
                        </>
                      );
                    })}
                  </span>
                )}
              </div>
              <div className="col-lg-6 mt-2">
                <span className="font-w">Add File: </span>
                <div className="input-group mb-3 mt-1">
                  <input
                    type="file"
                    className="form-control"
                    id="inputGroupFile02"
                    name="attachment"
                    accept="image/png, image/jpeg , image/jpg , image/svg ,image/pdf"
                    onChange={handleAttachChange}
                  />
                  <label className="input-group-text" for="inputGroupFile02">
                    {fileLoader ? (
                      <WhiteLoader color="black" />
                    ) : (
                      <i className="fa fa-paperclip" aria-hidden="true"></i>
                    )}
                  </label>
                </div>
                {Boolean(imageData?.length) &&
                  imageData?.map((v, i) => {
                    return (
                      <p>
                        {v?.split("/")[2]}{" "}
                        <span style={{ cursor: "pointer" }} className="ms-2">
                          <i
                            onClick={() => handleImgDelete(i)}
                            className="bi bi-x-circle"
                          ></i>
                        </span>
                      </p>
                    );
                  })}
              </div>

              <div className="col-md-12 mt-2">
                <span className="font-w">Patient Treatment Goal: </span>
                <textarea
                  style={{ resize: "none" }}
                  className="form-control mt-1"
                  rows="1"
                  type="textarea"
                  placeholder="Type here..."
                  name="goal"
                  value={values.goal}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 mt-5 d-flex justify-content-end">
                <button
                  type="reset"
                  onClick={handleReset}
                  className="btn btn-md btn-neutral me-5"
                >
                  Clear
                </button>
                <button
                  className="btn btn-md btn-primary mat-button-wrapper"
                  type="submit"
                  disabled={clickDis}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConsultationForm;
