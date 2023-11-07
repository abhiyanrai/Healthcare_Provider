import React, { useRef, useState } from "react";
import "./consultation.css";
import ConsultationForm from "./consultaion-form/ConsultationForm";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import toast from 'react-hot-toast';
import moment from "moment/moment";
import "react-toastify/dist/ReactToastify.css";
import { dataList } from "./consultaion-form/list";
import CreatableSelect from "react-select/creatable";
// import {
//   getConsultationsApiById,
//   getOptionListApiById,
//   getSinglePatientDetailsById,
//   getSymptomById,
//   imageProfileApi,
//   updateSymptom,
// } from "../../Apis";

import {
  getConsultationsApiById,
  getOptionListApiById,
  getSinglePatientDetailsById,
  getSymptomById,
  imageProfileApi,
  updateSymptom,
} from "../../../Apis/healthcareProvider";
import { useFormik } from "formik";
import AddSymptomForm from "./consultaion-form/AddSymptomForm";
import img from "../../../Assets/img/img-profile.jpg";
import { dropdownIds } from "../../../Pages/SystemSettings/data";
import Select from "react-select";
import Loader from "../../Components/common/Errors/loader/Loader";
import { SERVER_ENDPOINT } from "../../../utils/baseUrl";
import copy from "copy-to-clipboard";
import { useReactToPrint } from "react-to-print";
import { getExamTestApi } from "../../../Apis";
import { WhiteLoader } from "../../../Components/common/Errors/loader/WhiteLoader";
const ConsultationView = () => {
  const [check, setCheck] = useState(false);
  const [disableds, setDisableds] = useState(true);
  const [consultaionData, setConsultationData] = useState();
  const [warningsq, setWarningsq] = useState([]);
  const [patientData, setPatientData] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [disabled1, setDisabled1] = useState(true);
  const [loading, setLoading] = useState(true);
  const [imageData, setImageData] = useState([]);
  const [inputVal, setInputVal] = useState();
  const [state, setState] = useState([]);
  const [multi, setMulti] = useState(false);
  const [fileLoader,setFileLoader] = useState(false);
  const [multip, setMultip] = useState(false);
  const [toggles, setToggles] = useState(true);
  const [render,setRender]=useState(false);
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
  const { patientId } = useParams();
  console.log(patientId, "ASDFDSAFKDSAFADFASD");
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const modal = document.querySelector("#exampleModals");
  const viewModal = document.querySelector("#exampleModalr");
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const options = [
    { label: "No Cervical Manual!", value: "No Cervical Manual!" },
    { label: "Osteoporosis", value: "Osteoporosis" },
    {
      label: "Disc Herniation - Use Disc Protocols",
      value: "Disc Herniation - Use Disc Protocols",
    },
    { label: "Scoliosis", value: "Scoliosis" },
  ];

  const { values, handleSubmit, handleChange, setFieldValue, setValues } =
    useFormik({
      initialValues: {
        symptom: "",
        position: "",
        radiates: "",
        describeSymptoms: "",
        begin: "",
        ago: "",
        frequency: "",
        duration: "",
        onSet: "",
        describeInjury: "",
        palliative: "",
        provocative: "",
        warnings: "",
        attachment: [],
        additionalNote: "",
        therapist: "",
        help: "",
        linkReports: [],
        goal: "",
        id: "",
        date: "",
      },
      onSubmit: async (value) => {
        try {
          const res = await updateSymptom(value);
          if (res.status === 200 || res.status === 201) {
            viewModal.click();
            getConsultationDetails();
            setDisableds(true);
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
const handleCloseForm =()=>{
  setDisabled(true);
  setDisabled1(true)
  setDisableds(true)
}
const handleImgDelete = (id) => {
  imageData?.splice(id, 1);
  values?.attachment?.splice(id, 1);
  setRender(!render);
  setFieldValue("attachment", null);
};

  const getTime = (createdAt) => {
    let now = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    var ms = now - new Date(createdAt);
    console.log(ms, oneDay, "ondedayaa");
    return ms > oneDay;
  };

  const getCheckExam = async (id) => {
    const res = await getExamTestApi(id);
    if (res.status === 200 || res.status === 201) {
      setToggles(res.data.findExam);
    } else {
      return true;
    }
  };

  const handleLinkReports = () => {
    if (!disableds) {
      setFieldValue("linkReports", [...values.linkReports, inputVal]);
      setInputVal("");
    }
  };
  const handleAttachChanged = async (e) => {
    if(!e.target.files[0]) return ;
    setFileLoader(true)
    if (!disableds) {
      setFieldValue("attachment", e.target.files[0]);
      const formdata = new FormData();
      formdata.append("file", e.target.files[0]);
      try{
        const res = await imageProfileApi(formdata);
        if (res.status === 200 || res.status === 201) {
          setImageData([...imageData, res.data.filePath]);
          setFieldValue("attachment", [...values.attachment, res?.data?.filePath])
          toast.success(res?.data?.message);
          setFileLoader(false)
        }
      }catch(err){
        toast.error("File not supported");
        setFileLoader(false)
      }
     
    }
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
    // console.log(check);

    if (check) {
      setCheck(false);
      setFieldValue("blt", false);
    } else {
      setCheck(true);
      setFieldValue("blt", true);
    }
  };

  const handleEdit = () => {
    if (disableds) {
      setDisableds(false);
      setDisabled(false);
      setDisabled1(false);
    } else {
      setDisableds(true);
      setDisabled(true);
      setDisabled1(true);
    }
  };

  const handleView = async (id) => {
    setFieldValue("id", id);
    try {
      const res = await getSymptomById(id);
      if (res.status === 200 || res.status === 201) {
        setSelectedSymptom(res.data.symptom);
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      const message =
        error.response?.data?.message || error.response.statusText;
      toast.error(message);
    }
  };
  const getConsultationDetails = async () => {
    if (patientId) {
      try {
        const res = await getConsultationsApiById(patientId);
        if (res.status === 200 || res.status === 201) {
          setWarningsq(res?.data?.symptomsArr);
          setConsultationData(res.data.symptomsArr);
          if (res?.data?.consultation?.patientId) {
            const response = await getSinglePatientDetailsById(
              res?.data?.consultation?.patientId
            );
            setPatientData(response.data.patient);
            setLoading(false);
          }
        } else {
          toast.error("Something went wrong.");
        }
      } catch (error) {
        const message =
          error.response?.data?.message || error.response.statusText;
        toast.error(message);
      }
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
        _id: "64058fa31fe094975ddf6d5e",
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

  const handleWarningChange =(e)=>{
    setFieldValue('warnings', e)
  }
  const getWarnings = () => {
    let arr = [];
    let d = warningsq?.map((v) => {
      v?.warnings?.map((f) => {
        if(!f.value) return;
        arr.push(f.value+" ");
      });
    });
    d = arr?.filter((v) => v);
    return d;
  };
  useEffect(() => {
    getCheckExam(patientId);
  }, [patientId]);
  useEffect(() => {
    getConsultationDetails();
  }, []);
  useEffect(() => {
    if (selectedSymptom?.symptom) {
      setValues({
        date: selectedSymptom?.date,
        symptom: selectedSymptom?.symptom,
        position: selectedSymptom?.position,
        radiates: selectedSymptom?.radiates,
        describeSymptoms: selectedSymptom?.describeSymptoms,
        begin: selectedSymptom?.begin,
        ago: selectedSymptom?.ago,
        frequency: selectedSymptom?.frequency,
        duration: selectedSymptom?.duration,
        onSet: selectedSymptom?.onSet,
        describeInjury: selectedSymptom?.describeInjury,
        palliative: selectedSymptom?.palliative,
        provocative: selectedSymptom?.provocative,
        warnings: selectedSymptom?.warnings?.length ? selectedSymptom?.warnings : "",
        additionalNote: selectedSymptom?.additionalNote,
        therapist: selectedSymptom?.therapist,
        help: selectedSymptom?.help,
        linkReports: selectedSymptom?.linkReports,
        attachment: selectedSymptom?.attachment,
        goal: selectedSymptom?.goal,
        id: values.id,
        blt:selectedSymptom?.blt
      });
      setImageData(selectedSymptom?.attachment);
    }
  }, [selectedSymptom]);
  return (
    <>
      <div className="container-fluid mt-5">
        <div className="card">
          <div className="row card-header align-items-center">
            <div className="col-sm-3 d-flex">
              <div className="avatar avatar-sm bg-warning rounded-circle text-white me-3">
                <img alt="..." src={img} />
              </div>
              <span>
                {loading ? (
                  <Loader />
                ) : patientData.salutation ? (
                  patientData.salutation +
                  " " +
                  patientData.firstName +
                  " " +
                  patientData.lastName
                ) : (
                  ""
                )}
              </span>
            </div>
            <div className="col-sm-3">
              <p>
                Patient Id:&nbsp;
                <span className="copy-text">
                  {patientData?.fileNo ? patientData?.fileNo : "-"}
                  {patientData?.fileNo && (
                    <i
                      title="copy"
                      style={{
                        color: "lightslategray",
                        cursor: "pointer",
                      }}
                      className="fa-solid fa-copy ms-1"
                      onClick={() =>
                        copy(patientData?.fileNo) &&
                        toast.success("Copied", { id: "0003" })
                      }
                    ></i>
                  )}
                </span>
              </p>
            </div>
            <div className="col-sm-3">
              <p>
                D.O.B.:{" "}
                <span> {moment(patientData.dob).format("DD/MM/YYYY")}</span>
              </p>
            </div>
            <div className="col-sm-3">
              <p>
                Date:{" "}
                <span>
                  {" "}
                  {moment(patientData.registrationDate).format("DD/MM/YYYY")}
                </span>
              </p>
            </div>
          </div>
        </div>
        {!toggles && (
          <div className="d-flex justify-content-end mt-5">
            <button
              type="submit"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModals"
            >
              Add Symptoms
            </button>
          </div>
        )}

        {Boolean(getWarnings()?.length) && (
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
        )}
        <div className="card mt-5">
          <div className="card-header d-flex align-items-center flex-wrap">
            <div className="table-responsive" style={{ width: "100%" }}>
              <table className="table">
                <thead className="thead-font">
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Date</th>
                    <th scope="col">Symptoms</th>
                    <th scope="col">Selected</th>
                    <th scope="col">Radiates To</th>
                    <th scope="col">Describe Symptoms</th>
                    <th scope="col">Began-ago</th>
                    <th scope="col"> Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr align="center">
                      <td colspan="8">
                        {" "}
                        <Loader />
                      </td>{" "}
                    </tr>
                  ) : (
                    consultaionData?.map((val, index) => {
                      return (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <th>
                            {val?.date
                              ? moment(val?.date).format("DD/MM/YYYY")
                              : "-"}
                          </th>
                          <td>{val?.symptom}</td>
                          <td>{val?.position}</td>
                          <td>{val?.radiates}</td>
                          <td>{val?.describeSymptoms}</td>
                          <td>
                            {val?.begin}{" "}
                            {val?.begin > 1 ? val?.ago + "s" : val?.ago}
                          </td>
                          <td>{val?.frequency}</td>
                          <td></td>
                          {/* <td>
                            {console.log(
                              getTime(val?.createdAt, "cateatasdfjlakdjfodisf")
                            )}
                            {!getTime(val?.createdAt) && (
                              <button
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModalr"
                                // type="submit"
                                onClick={() => handleView(val?._id)}
                                className="btn btn-sm btn-neutral me-2"
                              >
                                Edit
                              </button>
                            )}
                          </td> */}
                          <td>
                            <button
                              className="btn btn-warning btn-sm"
                              onClick={() => handleView(val?._id)}
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModalr"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {!toggles && (
          <div className="text-end">
            <Link
              to="/examination"
              state={{ id: patientData?._id, warningsId: patientId }}
              className="btn btn-primary mt-5"
            >
              Start Examination
            </Link>
          </div>
        )}

        <div
          className="modal fade"
          id="exampleModals"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <AddSymptomForm
            modal={modal}
            data={patientId}
            value={getConsultationDetails}
          />
        </div>

        <div
          className="modal fade"
          id="exampleModalr"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div
                className="modal-header"
                style={{
                  padding: ".5rem",
                  fontSize: ".8rem",
                  position: "inherit",
                  right: "3px",
                }}
              >
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCloseForm}
                ></button>
              </div>
              <div className="modal-body pt-0">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div
                      className="col-md-12"
                      onClick={() => getSymptomData(dropdownIds.symptoms)}
                    >
                      <h4>
                        <span className="font-w">Symptoms:</span>
                      </h4>

                      <CreatableSelect
                        isDisabled={disableds}
                        name="symptom"
                        value={{ label: values.symptom, value: values.symptom }}
                        options={options1}
                        onChange={(e) => handleInputChange(e, "symptom")}
                        noOptionsMessage={() => "No Data Found"}
                      />
                    </div>
                    <div className="col-lg-2 mt-2">
                <span className="font-w"> Date:</span>
                <input
                  className="form-control"
                  type="date"
                  name="date"
                  disabled={disableds}
                  value={values.date}
                  onChange={handleChange}
                  id=""
                />
              </div>
                    <div className="col-md-4 mt-5">
                      <div className="row mt-4">
                        <div className="col">
                          <input
                            id="sym-lt"
                            type="radio"
                            checked={values?.position === "LEFT" ? true : false}
                            name="position"
                            value="LEFT"
                            onChange={handleChange}
                            disabled={disableds}
                          />
                          <label for="sym-lt" className="sy-lf-rt-bt">
                            LEFT
                          </label>
                        </div>
                        <div className="col">
                          <input
                            id="sym-lt"
                            type="radio"
                            checked={
                              values?.position === "RIGHT" ? true : false
                            }
                            name="position"
                            value="RIGHT"
                            onChange={handleChange}
                            disabled={disableds}
                          />
                          <label for="sym-lt" className="sy-lf-rt-bt">
                            RIGHT
                          </label>
                        </div>
                        <div className="col">
                          <input
                            id="sym-lt"
                            type="radio"
                            checked={values?.blt == "true" ? true : false}
                            name="blt"
                            value={values?.blt}
                            onChange={handleChange}
                            disabled={disableds}
                          />
                          <label for="sym-lt" className="sy-lf-rt-bt">
                            BLT
                          </label>
                        </div>
                      </div>
                    </div>

                    <div
                      className="col-md-4 mt-2"
                      onClick={() => getSymptomData(dropdownIds.radiatesTo)}
                    >
                      <span className="font-w">Radiates To: </span>
                      <Select
                        isDisabled={disableds}
                        name="radiates"
                        value={{
                          label: values.radiates,
                          value: values.radiates,
                        }}
                        options={options1}
                        onChange={(e) => handleInputChange(e, "radiates")}
                        noOptionsMessage={() => "No Data Found"}
                      />
                    </div>
                    <div
                      className="col-md-4 mt-2"
                      onClick={() =>
                        getSymptomData(dropdownIds.describeSymptom)
                      }
                    >
                      <span className="font-w">Describe Symptoms: </span>
                      <Select
                        isDisabled={disableds}
                        name="describeSymptoms"
                        value={{
                          label: values.describeSymptoms,
                          value: values.describeSymptoms,
                        }}
                        options={options1}
                        onChange={(e) =>
                          handleInputChange(e, "describeSymptoms")
                        }
                        noOptionsMessage={() => "No Data Found"}
                      />
                    </div>
                    <div className="col-lg-2 mt-2">
                      <span className="font-w">Began: </span>
                      <input
                        className="form-control mt-1"
                        type="number"
                        placeholder="Type..."
                        disabled={disabled}
                        value={values.begin}
                        min="0"
                        name="begin"
                        onChange={handleBeginChange}
                      />
                    </div>
                    <div className="col-lg-2 col-md-6 mt-2">
                      <span className="font-w">Ago</span>
                      <select
                        className="form-select jnl mt-1 me-2"
                        aria-label="Default select example"
                        value={values.ago}
                        disabled={disableds}
                        name="ago"
                        onChange={handleConstChange}
                        style={{ padding: "0.75rem 2rem 0.75rem 0.5rem" }}
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
                        placeholder="Type..."
                      />
                    </div>
                    <div className="col-lg-2 col-md-6 mt-3">
                      <span className="font-w">Y,M,W,D </span>
                      <select
                        className="form-select jnl"
                        aria-label="Default select example"
                        value={values.duration}
                        disabled={disableds}
                        name="duration"
                        onChange={(e) => handleConstChangeRepeat(e, "duration")}
                        style={{ padding: "0.75rem 2rem 0.75rem 0.5rem" }}
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
                      className="col-md-4 mt-2"
                      onClick={() => getSymptomData(dropdownIds.onSet)}
                    >
                      <span className="font-w">Onset: </span>
                      <Select
                        isDisabled={disableds}
                        name="onSet"
                        value={{ label: values.onSet, value: values.onSet }}
                        options={options1}
                        onChange={(e) => handleInputChange(e, "onSet")}
                        noOptionsMessage={() => "No Data Found"}
                      />
                    </div>
                    <div className="col-md-12 mt-2">
                      <span className="font-w">Description of injury: </span>
                      <textarea
                        style={{ resize: "none" }}
                        className="form-control mt-1"
                        rows="1"
                        type="textarea"
                        placeholder="Type here..."
                        disabled={disableds}
                        value={values.describeInjury}
                        name="describeInjury"
                        onChange={handleChange}
                      />
                    </div>

                    <div
                      className="col-md-6 mt-2"
                      onClick={() => getSymptomData(dropdownIds.palliative)}
                    >
                      <span className="font-w">Palliative: </span>
                      <CreatableSelect
                        isDisabled={disableds}
                        name="palliative"
                        value={{
                          label: values.palliative,
                          value: values.palliative,
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
                        isDisabled={disableds}
                        name="provocative"
                        value={{
                          label: values.provocative,
                          value: values.provocative,
                        }}
                        options={options1}
                        onChange={(e) => handleInputChange(e, "provocative")}
                        noOptionsMessage={() => "No Data Found"}
                      />
                    </div>
                    <div className="col-md-12 mt-2"  onClick={() => getSymptomData(dropdownIds.warning)}>
                      <span className="font-w">Warnings: </span>
                      <CreatableSelect
                        isDisabled={disableds}
                        className="form-select jnl mt-1 p-0"
                        style={{ width: "100%" }}
                        isMulti
                        // onCreateOption={(e) => e.preventDefault()}
                        options={options1}
                        value={values?.warnings}
                        name="warnings"
                        // onChange={(value) =>
                        //   setFieldValue("warnings", value?.value)
                        // }
                        onChange={handleWarningChange}
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
                        disabled={disableds}
                        value={values.additionalNote}
                        name="additionalNote"
                        onChange={handleChange}
                      />
                    </div>
                    <div
                      className="col-lg-6 col-md-12 mt-2"
                      onClick={() => getSymptomData(dropdownIds.therapist)}
                    >
                      <span className="font-w">Other therapist</span>
                      <CreatableSelect
                        isDisabled={disableds}
                        name="therapist"
                        value={{
                          label: values.therapist,
                          value: values.therapist,
                        }}
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
                        isDisabled={disableds}
                        name="help"
                        value={{ label: values.help, value: values.help }}
                        options={options1}
                        onChange={(e) => handleInputChange(e, "help")}
                        noOptionsMessage={() => "No Data Found"}
                      />
                    </div>
                    <div className="col-lg-6 mt-2">
                      <span className="font-w">Add link for reports: </span>
                      <div className="input-group mb-3 mt-1">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Add link here..."
                          aria-label="paste link here"
                          aria-describedby="button-addon2"
                          disabled={disableds}
                          value={inputVal}
                          onChange={(e) => setInputVal(e.target.value)}
                        />
                        <button
                          className="btn btn-outline-secondary sec-hover"
                          type="button"
                          id="button-addon2"
                          onClick={handleLinkReports}
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                      </div>
                      {values?.linkReports && (
                        <span className="d-flex flex-wrap">
                          {values?.linkReports?.map((val) => {
                            return (
                              <a
                                style={{ marginLeft: "10px" }}
                                href={
                                  val?.split("")[0] == "h"
                                    ? val
                                    : `https://${val}`
                                }
                                target="_blank"
                                rel="noreferrer noopener"
                              >
                                {val}
                              </a>
                            );
                          })}
                        </span>
                      )}
                    </div>

                    <div className="col-lg-6 mt-2">
                      <span className="font-w">Add file: </span>
                      <div className="input-group mb-3 mt-1">
                        <input
                          type="file"
                          disabled={disableds}
                          className="form-control"
                          id="inputGroupFile02"
                          name="attachment"
                          accept="image/png, image/jpeg , image/jpg , image/svg ,image/pdf"
                          onChange={handleAttachChanged}
                        />
                        <label
                          className="input-group-text"
                          for={disableds ? "" : "inputGroupFile02"}
                        >
                        {fileLoader ? <WhiteLoader color="black" />: <i className="fa fa-paperclip" aria-hidden="true"></i>}  
                        </label>
                      </div>
                      {Boolean(imageData?.length) &&
                        imageData?.map((v,i) => {
                          return <p>{v?.split("/")[2]} <span style={{ cursor: "pointer" }} className="ms-2">
                          <i
                            onClick={() => handleImgDelete(i)}
                            className="bi bi-x-circle"
                          ></i>
                        </span></p>;
                        })}
                    </div>

                    <div className="col-lg-12 mt-2">
                      <span className="font-w">Patients treatment goal: </span>
                      <textarea
                        style={{ resize: "none" }}
                        className="form-control mt-1"
                        rows="1"
                        type="textarea"
                        placeholder="Type here..."
                        disabled={disableds}
                        name="goal"
                        value={values.goal}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-12 mt-5 d-flex justify-content-end">
                      <a onClick={handleEdit} className="btn btn-neutral me-5">
                        {disableds ? "Edit" : <> &#10003;</>}
                      </a>
                      <button className="btn btn-primary" type="submit">
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Report modal code popup start here..  */}
      <div
        className="modal fade"
        id="exampleModalreport"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-xl">
          <div className="modal-content">
            <div className="modal-header" style={{ padding: ".5rem 1rem" }}>
              <h3 className="modal-title fs-5" id="staticBackdropLabel">
                Consultation Report
              </h3>

              <button
                className="btn btn-sm btn-primary top-2 position-absolute end-0"
                style={{ marginRight: "50px" }}
                onClick={handlePrint}
              >
                Print
              </button>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <hr style={{ marginTop: "0.5rem" }} />
            <div className="modal-body pt-0" ref={componentRef}>
              <div className=" jainul-print">
                <div className="row p-3">
                  <div className="col-6">
                    <div className="table-responsive">
                      <table className="table table-borderless jainult">
                        <thead>
                          <tr>
                            <td>
                              <img
                                src="/OwnerKit/img/logos/logo.png"
                                alt="logo"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              Intellispine am Neumarkt,
                              <br /> UG (haftungsbeschränkt) <br />
                              Doctors of Chiropractic (USA) <br />
                              Chiropraktiker in Köln
                            </td>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="table-responsive">
                      <table className="table table-borderless tb_td ">
                        <thead>
                          <tr className="d-flex">
                            <td
                              style={{ fontSize: "24px", color: "red" }}
                              className="pt-0 pb-1"
                            >
                              Examination Reports
                            </td>
                          </tr>
                          <tr className="d-flex">
                            <td className="pt-0 pb-0 min-w-100">
                              <strong>Patient Id:</strong>
                            </td>
                            <td className="pt-0 pb-0">{patientData?.fileNo}</td>
                          </tr>
                          <tr className="d-flex">
                            <td className="pt-0 pb-0 min-w-100">
                              <strong>Name:</strong>
                            </td>
                            <td className="pt-0 pb-0">
                              {patientData?.salutation +
                                " " +
                                patientData?.firstName +
                                " " +
                                patientData?.lastName}
                            </td>
                          </tr>
                          <tr className="d-flex">
                            <td className="pt-0 pb-0 min-w-100">
                              <strong>D.O.B:</strong>
                            </td>
                            <td className="pt-0 pb-0">
                              {moment(patientData?.dob).format("DD/MM/YYYY")}
                            </td>
                          </tr>
                          <tr className="d-flex">
                            <td className="pt-0 pb-0 min-w-100">
                              <strong>Gender:</strong>
                            </td>
                            <td className="pt-0 pb-0">{patientData?.gender}</td>
                          </tr>
                          <tr className="d-flex">
                            <td className="pt-0 pb-0 min-w-100">
                              <strong>Email:</strong>
                            </td>
                            <td className="pt-0 pb-0">{patientData?.email}</td>
                          </tr>
                          <tr className="d-flex">
                            <td className="pt-0 pb-0 min-w-100">
                              <strong>Phone:</strong>
                            </td>
                            <td className="pt-0 pb-0">
                              {patientData?.contactNo}
                            </td>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-borderless tb_td">
                  <tbody className="d-block">
                    <tr>
                      <th className="float-end">Symptoms:</th>
                      <td>{values?.symptom ? values.symptom : "-"}</td>
                    </tr>
                    <tr>
                      <th className="float-end">Date:</th>
                      <td>{values?.date ? moment(values.date).format("DD/MM/YYYY") : "-"}</td>
                    </tr>
                    <tr>
                      <th className="float-end">Radiates To:</th>
                      <td>{values?.radiates ? values.radiates : "-"}</td>
                    </tr>
                    <tr>
                      <th className="float-end">Describe Symptom:</th>
                      <td>
                        {values?.describeSymptoms
                          ? values.describeSymptoms
                          : "-"}
                      </td>
                    </tr>
                    <tr>
                      <th className="float-end">Began:</th>
                      <td>{values?.begin ? values.begin  : "-"}</td>
                    </tr>
                    <tr>
                      <th className="float-end">Ago:</th>
                      {
                        values.begin >1 ? <td>{values?.ago ? values.ago+"s" : "-"}</td>:<td>{values?.ago ? values.ago : "-"}</td>
                      }
                   
                    </tr>
                    <tr>
                      <th className="float-end">Frequency:</th>
                     
                      <td>{values?.frequency ? values.frequency : "-"}</td>
                    </tr>
                    <tr>
                      <th className="float-end">Y,M,W,D:</th>
                      {
                        values.frequency > 1 ? <td>{values?.duration ? values.duration+"s" : "-"}</td>:<td>{values?.duration ? values.duration : "-"}</td>
                      }
                    </tr>
                    <tr>
                      <th className="float-end">Onset:</th>
                      <td>{values?.onSet ? values.onSet : "-"}</td>
                    </tr>
                    <tr>
                      <th className="float-end">Description of injury:</th>
                      <td>
                        {values?.describeInjury ? values.describeInjury : "-"}
                      </td>
                    </tr>
                    <tr>
                      <th className="float-end">Palliative:</th>
                      <td>{values?.palliative ? values?.palliative : "-"}</td>
                    </tr>
                    <tr>
                      <th className="float-end">Provocative:</th>
                      <td>{values?.provocative ? values.provocative : "-"}</td>
                    </tr>
                    <tr>
                      <th className="float-end">Warning:</th>
                      <td>{getWarnings()}</td>
                    </tr>
                    <tr>
                      <th className="float-end">Additional Note:</th>
                      <td>
                        {values?.additionalNote ? values.additionalNote : "-"}
                      </td>
                    </tr>
                    <tr>
                      <th className="float-end">Other therapist:</th>
                      <td>{values?.therapist ? values.therapist : "-"}</td>
                    </tr>
                    <tr>
                      <th className="float-end">Did it help?</th>
                      <td>{values?.help ? values.help : "-"}</td>
                    </tr>
                    <tr>
                      <th className="float-end">Add link for report: </th>
                      <td>
                        {/* {values?.linkReports ? values.linkReports :"-"} */}
                        {Boolean(values?.linkReports?.length) &&
                          values?.linkReports?.map((v, i) => {
                            return (
                              <a
                                style={{ color: "#5C60F5 !important" }}
                                className=" font-semibold"
                                href={
                                  v?.split("")[0] === "h" ? v : `https://${v}`
                                }
                                target="_blank"
                                rel="noreferrer noopener"
                              >
                                {v ? v + "," : "-"}
                              </a>
                            );
                          })}
                      </td>
                    </tr>
                    <tr>
                      <th className="float-end">Add file:</th>
                      <td>
                        {Boolean(values?.attachment?.length) &&
                          values?.attachment?.map((v, i) => {
                            return (
                              <a
                                target="_blank"
                                rel="noreferrer noopener"
                                href={SERVER_ENDPOINT + "/" + v}
                              >
                                {v ? v + " ," : "-"}{" "}
                              </a>
                            );
                          })}
                      </td>
                    </tr>
                    <tr>
                      <th className="float-end">Patient treatment goal:</th>
                      <td>{values?.goal ? values.goal : "-"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Report modal code popup end here..  */}
    </>
  );
};
export default ConsultationView;
