import React, { useState } from "react";
import { useFormik } from "formik";
import { consultationFormSchema } from "../../../Components/Schemas";
import CreatableSelect from "react-select/creatable";
import { InputErrorMessage } from "../../../Components/common/Errors";
import { addSymptomApi, createConsultationApi, getOptionListApiById ,imageProfileApi  } from "../../../../Apis/healthcareProvider";
import toast from 'react-hot-toast';
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import moment from "moment/moment";
import { useRef } from "react";
import { dropdownIds } from "../../../../Pages/SystemSettings/data";
import { WhiteLoader } from "../../../../Components/common/Errors/loader/WhiteLoader";
const AddSymptomForm = (props) => {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [multi, setMulti] = useState(false);
  const [check, setCheck] = useState(false);
  const [multip, setMultip] = useState(false);
  const [imageData, setImageData] = useState([]);
  const [fileLoader,setFileLoader]=useState(false);
  const [state, setState] = useState([]);
  const [render, setRender] = useState(false);
  const [clickDis,setclickDis]=useState(false)
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
  const [disabled, setDisabled] = useState(false);
  const [disabled1, setDisabled1] = useState(false);
  const [inputVal, setInputVal] = useState();
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
    touched,
    handleSubmit,
    setFieldValue,
    errors,
  } = useFormik({
    initialValues: {
      symptom: "",
      radiates: "",
      describeSymptoms: "",
      begin: "",
      ago: "",
      blt: "",
      attachment: "",
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
      linkReports: "",
      goal: "",
      consultationId: props.data,
    },
    validationSchema: consultationFormSchema,
    onSubmit: async (val) => {
      let value = {
        symptomsArr: [val],
      };
      setclickDis(true)
      try {
        const res = await addSymptomApi(value);
        if (res.status === 200 || res.status === 201) {
          toast.success(res.data.message, { id: "succ01" });
          resetForm();
          props.modal.click();
          setImageData([]);
          setclickDis(false)
          navigate(`/Consultation/ConsultationView/${props.data}`);
          setTimeout(() => {
            props.value();
          }, 1000);
        } else {
          toast.error("Something went wrong.", { id: "err01" });
        }
      } catch (error) {
        const message =
          error.response?.data?.message || error.response.statusText;
        toast.error(message, { id: "err01" });
        setclickDis(false)
      }
    },
  });
  const handleReset = () => {
    setInputVal("");
    setFieldValue("blt", "");
    setCheck(false);
    setFieldValue("position", "");
    setFieldValue("attachment", "");
    setImageData([])
    resetForm();
  };
  const handleRadio = (e) => {
    setFieldValue("position", e.target.value);
  };


  const handleConstChange = (e) => {
    if (e.target.value == "Constant" || e.target.value == "Intermittent") {
      setDisabled(true);
      setFieldValue("ago", e.target.value);
      setFieldValue("begin", "");
    } else {
      setDisabled(false);
      setFieldValue("ago", e.target.value);
    }
  };
  const handleConstChangeRepeat = (e, name) => {
    if (e.target.value == "Constant" || e.target.value == "Intermittent") {
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
  const handlerr = (id) => {
    values?.linkReports.splice(id, 1);
    setRender(!render);
  };
  const handleImgDelete = (id) => {
    imageData?.splice(id, 1);
    values?.attachment?.splice(id, 1);
    setRender(!render);
    setFieldValue("attachment", null);
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
    if (check) {
      setCheck(false);
      setFieldValue("blt", false);
    } else {
      setCheck(true);
      setFieldValue("blt", true);
    }
  };

  const handleInputChange = (e, name) => {
    if(e.value === "Loading ....") return;
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

  const handleAttachChange = async (e) => {
    if (!e.target.files[0]) return;
    setFileLoader(true)
    setFieldValue("attachment", e.target.files[0]);
    const formdata = new FormData();
    formdata.append("file", e.target.files[0]);
    try{
      const res = await imageProfileApi(formdata);
      if (res?.status === 200 || res?.status === 201) {
        setImageData([...imageData, res.data.filePath]);
        setFieldValue("attachment", [...values.attachment, res?.data?.filePath]);
        toast.success(res?.data?.message);
        setFileLoader(false)
      }
    }catch(err){
      toast.error("Server Error")
      setFileLoader(false);
    }
 
  };
  const handleLinkReports = () => {
    if (inputVal) {
      setFieldValue("linkReports", [...values.linkReports, inputVal]);
      setInputVal("");
    }
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
          ></button>
        </div>
        <div className="modal-body pt-0">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div
                className="col-lg-10 mt-2"
                onClick={() => getSymptomData(dropdownIds.symptoms)}
              >
                <h3>
                  <span className="font-w">Symptom: </span>
                </h3>
                <CreatableSelect
                // isClearable
                  name="symptom"
                  value={{ label: values.symptom, value: values.symptom }}
                  options={options1}
                  onChange={(e) => handleInputChange(e, "symptom")}
                  noOptionsMessage={() => "No Data Found"}
                />
                <InputErrorMessage
                  error={touched.symptom && errors.symptom}
                  marginBottom={-15}
                />
              </div>
              <div className="col-lg-2 mt-2">
                <p className="sy-lf-rt-bt mt-1"> Date</p>
                <input
                  className="form-control"
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
                  value={{value:values?.radiates,label:values?.radiates}}
                  onChange={(e) => handleInputChange(e, "radiates")}
                  noOptionsMessage={() => "No Data Found"}
                />
              </div>
              <div
                className="col-lg-4 mt-2"
                onClick={() => getSymptomData(dropdownIds.describeSymptom)}
              >
                <span className="font-w">Describe Symptom: </span>
                <Select
                  name="describeSymptoms"
                  options={options1}
                  value={{label:values?.describeSymptoms,value:values?.describeSymptoms}}
                  onChange={(e) => handleInputChange(e, "describeSymptoms")}
                  noOptionsMessage={() => "No Data Found"}
                />
              </div>
              <div className="col-lg-2 mt-2">
                <span className="font-w">Began: </span>
                <input
                  className="form-control mt-1"
                  disabled={disabled}
                  type="number"
                  placeholder="Type here..."
                  value={values.begin}
                  name="begin"
                  min="0"
                  onChange={handleBeginChange}
                />
              </div>
              <div className="col-lg-2 col-md-6 mt-2">
                <span className="font-w">Ago:</span>
                <select
                  className="form-select jnl mt-1 me-2"
                  aria-label="Default select example"
                  value={values.ago}
                  name="ago"
                  onChange={handleConstChange}
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
                <span className="font-w">Frequency:</span>
                <input
                  disabled={disabled1}
                  className="form-control mt-1"
                  type="number"
                  name="frequency"
                  min="0"
                  value={values.frequency}
                  onChange={handleFrequencyChange}
                  placeholder="Type here..."
                />
              </div>
              <div className="col-lg-2 col-md-6 mt-3">
                <span className="font-w">Y,M,W,D: </span>
                <select
                  className="form-select jnl mt-1"
                  aria-label="Default select example"
                  value={values.duration}
                  name="duration"
                  onChange={(e) => handleConstChangeRepeat(e, "duration")}
                >
                  <option selected hidden>
                    Select
                  </option>
                  <option value="Year">Year{multip ? "" : "s"}</option>
                  <option value="Month">Month{multip ? "" : "s"}</option>
                  <option value="Week">Week{multip ? "" : "s"}</option>
                  <option value="Day">Day{multip ? "" : "s"}</option>
                  <option value="Intermittent">Intermittent</option>
                  <option value="Constant">Constant </option>
                </select>
              </div>
              <div
                className="col-lg-4 col-md-6 mt-2"
                onClick={() => getSymptomData(dropdownIds.onSet)}
              >
                <span className="font-w">Onset: </span>
                <Select
                  name="onSet"
                  value={{value:values?.onSet,label:values?.onSet}}
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
                  value={{value:values?.palliative,label:values?.palliative}}
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
                  value={{value:values?.provocative ,label:values?.provocative}}
                  options={options1}
                  onChange={(e) => handleInputChange(e, "provocative")}
                  noOptionsMessage={() => "No Data Found"}
                />
              </div>
              <div className="col-md-12 mt-2"  onClick={() => getSymptomData(dropdownIds.warning)}>
                <span className="font-w">Warning: </span>
                <CreatableSelect
                  isMulti
                  // onCreateOption={(e) => e.preventDefault()}
                  options={options1}
                  value={values.warnings}
                  name="warnings"
                  onChange={(value) => setFieldValue("warnings", value)}
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
                  value={{value:values?.therapist,label:values?.therapist}}
                  options={options1}
                  onChange={(e) => handleInputChange(e, "therapist")}
                  noOptionsMessage={() => "No Data Found"}
                />
              </div>
              <div
                className="col-lg-6 col-md-12 mt-2"
                onClick={() => getSymptomData(dropdownIds.help)}
              >
                <span className="font-w">Did it help?</span>
                <CreatableSelect
                  name="help"
                  value={{label:values?.help , value:values?.help}}
                  options={options1}
                  onChange={(e) => handleInputChange(e, "help")}
                  noOptionsMessage={() => "No Data Found"}
                />
              </div>
              <div className="col-lg-6 mt-2">
                <span className="font-w">Add Link for Report: </span>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="Add link here..."
                    aria-label="paste link here"
                    aria-describedby="button-addon2"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-secondary mt-1"
                    type="button"
                    id="button-addon2"
                    onClick={handleLinkReports}
                  >
                    <i className="fa fa-plus" aria-hidden="true"></i>
                  </button>
                </div>
                {values?.linkReports && (
                  <span className="d-flex flex-wrap">
                    {values?.linkReports?.map((val, i) => {
                      return (
                        <>
                          {" "}
                          <a
                            style={{ marginLeft: "10px" }}
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
                <div className="input-group mb-3">
                  <input
                    type="file"
                    className="form-control mt-1"
                    id="inputGroupFile02"
                    name="attachment"
                    ref={fileRef}
                    accept="image/png, image/jpeg , image/jpg , image/svg ,image/pdf"
                    onChange={handleAttachChange}
                  />
                  <label
                    className="input-group-text mt-1"
                    for="inputGroupFile02"
                  >
                  {fileLoader ? <WhiteLoader color="black" /> :  <i className="fa fa-paperclip" aria-hidden="true"></i>} 
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
                <span className="font-w">Patients Treatment Goal: </span>
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
                  style={{ width: "15%" }}
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

export default AddSymptomForm;
