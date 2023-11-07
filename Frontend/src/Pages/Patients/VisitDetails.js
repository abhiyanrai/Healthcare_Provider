import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getConsultationsApiByPatientId,
  getConsultationsApiById,
  getExaminationListById,
  getVisitDetailsApiById,
  updateSlotApiData,
  postSlotApiData,
  getAllAppontmentsApi,
  getServiceByIdApi,
  getVisitByPatintIdApi,
  getExamTestApi,
} from "../../Apis/index";
import { appointmentValidation } from "../../Components/Schemas";
import moment from "moment";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setMinutes";
import setMinutes from "date-fns/setMinutes";
import Visit from "../Visits/Visit";
import { InputErrorMessage } from "../../Components/common/Errors";
const VisitDetails = ({ patientId ,appointmentId}) => {
  const location = useLocation();
  const [patientList, setPatientList] = useState([]);
  const [allBookedSlots, setAllBookedSlots] = useState([]);
  const [clrr, setClrr] = useState("#ffff");
  const [consultationData, setConsultationData] = useState([]);
  const [consultaionData, setConstulationData] = useState([]);
  const [examId, setExamId] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [diagnosedata, setdiagnosedata] = useState([]);
  const [allVisits, setAllVisits] = useState([]);
  const [filterVisits, setFilterVisits] = useState([]);
  const [allRooms, setAllRooms] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [selectedData, setSelectedData] = useState({
    consultation: "",
    examinatin: "",
  });
  console.log(appointmentId,"location")
  const modal = document.getElementById("exampleModal");
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
    },
    validationSchema: appointmentValidation,
    onSubmit: async (val) => {
      let data = {
        patientId: val.patientName,
        serviceId: val.serviceType,
        roomId: val.room,
        startTime: val.startTime,
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


  const getCervical = (data) => {
    if (
      data?.Crom?.EXT?.Dec ||
      data?.Crom?.EXT?.Inc ||
      data?.Crom?.EXT?.Normal
    ) {
      return "T2 Ribs";
    }
  };
  const getCervicalss = (data) => {
    if (data?.Crom?.LROT?.Inc && data?.Crom?.PROT?.Inc) {
      if (data?.Crom?.LROT?.Deg == data?.Crom?.PROT?.Deg) {
        return "";
      } else {
        if (data?.Crom?.LROT?.Deg?.length || data?.Crom?.PROT?.Deg?.length) {
          if (Number(data?.Crom?.LROT?.Deg) > Number(data?.Crom?.PROT?.Deg)) {
            return "RROT";
          } else {
            return "LROT";
          }
        }
      }
    }

    if (data?.Crom?.LROT?.Dec && data?.Crom?.PROT?.Dec) {
      if (data?.Crom?.LROT?.Deg == data?.Crom?.PROT?.Deg) {
        return "";
      } else {
        if (data?.Crom?.LROT?.Deg?.length || data?.Crom?.PROT?.Deg?.length) {
          if (Number(data?.Crom?.LROT?.Deg) > Number(data?.Crom?.PROT?.Deg)) {
            return "LROT";
          } else {
            return "RROT";
          }
        }
      }
    }

    if (data?.Crom?.LROT?.Dec && data?.Crom?.PROT?.Inc) {
      if (data?.Crom?.LROT?.Deg?.length || data?.Crom?.PROT?.Deg?.length) {
        if (Number(data?.Crom?.LROT?.Deg) > Number(data?.Crom?.PROT?.Deg)) {
          return "LROT";
        } else {
          return "RROT";
        }
      }
    }

    if (data?.Crom?.LROT?.Inc && data?.Crom?.PROT?.Dec) {
      if (data?.Crom?.LROT?.Deg?.length || data?.Crom?.PROT?.Deg?.length) {
        if (Number(data?.Crom?.LROT?.Deg) > Number(data?.Crom?.PROT?.Deg)) {
          return "LROT";
        } else {
          return "RROT";
        }
      }
    }
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

  const getConsultationDetails = async (id) => {
    try {
      const res = await getConsultationsApiByPatientId(id);
      getSymptoms(res.data.consultationArr[0]._id);
      getExaminations(res?.data?.consultationArr[0]?._id);
    } catch (err) {
      console.log(err);
    }
  };

  const getSymptoms = async (id) => {
    try {
      const res = await getConsultationsApiById(id);
      console.log(res, "555555555555")
      setConstulationData(res.data?.symptomsArr);
      setWarnings(res?.data?.symptomsArr);
    } catch (err) {
      console.log(err);
    }
  };
  const getWarnings = () => {
    let arr = [];
    let d = warnings.map((v) => {
      v?.warnings?.map((f) => {
        arr.push(f.value);
      });
    });
    console.log(arr, "DFGSDGSDFGFDSg");
    d = arr?.filter((v) => v);
    return d;
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

  const DiagnoseManage = (DataBundle) => {
    setdiagnosedata([]);
    console.log(DataBundle[0].diagnoses , "databunderle" ,diagnosedata)
    let p =[];
    Boolean(DataBundle[0].diagnoses?.additionalDxs?.length) && DataBundle[0].diagnoses?.additionalDxs?.map((v)=>p.push(v))
    Boolean(DataBundle[0].diagnoses?.bone?.length) && DataBundle[0].diagnoses?.bone?.map((v)=>p.push(v))
    Boolean(DataBundle[0].diagnoses?.diagnose?.length) && DataBundle[0].diagnoses?.diagnose?.map((v)=>p.push(v))
    Boolean(DataBundle[0].diagnoses?.osteopathic?.length) && DataBundle[0].diagnoses?.osteopathic?.map((v)=>p.push(v))
    console.log(p,"diadgiaosndgosfd")
    setdiagnosedata(p)
    // if (DataBundle) {
    //   const { additionalDxs, bone, diagnose, osteopathic } =
    //     DataBundle[0]?.diagnoses;
    //   if (additionalDxs?.length != 0) {
    //     additionalDxs.map((e) =>
    //       setdiagnosedata([ ...diagnosedata, {name: e.name, value: e.value }])
    //     );
    //   }
    //   if (bone?.length != 0) {
    //     bone.map((e) =>
    //       setdiagnosedata([ ...diagnosedata, {name: e.name, value: e.value }])
    //     );
    //   }
    //   if (diagnose?.length != 0) {
    //     diagnose.map((e) =>
    //       setdiagnosedata([ ...diagnosedata, {name: e.name, value: e.value }])
    //     );
    //   }
    //   if (osteopathic?.length != 0) {
    //     osteopathic.map((e) =>
    //       setdiagnosedata([ ...diagnosedata, {name: e.name, value: e.value }])
    //     );
    //   }
    // } else {
    //   return [];
    // }
  };

  console.log(diagnosedata,"diagnoseDate")
  const getExaminations = async (id) => {
    try {
      console.log(id,"consulsgdiasytoan")
      const res = await getExaminationListById(id);
      if (res.status === 200 || res.status === 201) {
        console.log(res,"examinaiton IDDDD")
        setExamId(res?.data?.allExamination[0]?._id);
        getvisitDetails(res?.data?.allExamination[0]._id);
        setdiagnosedata([])
        DiagnoseManage(res?.data?.allExamination)
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getDuration = (a, b) => {
    if (a && b) {
      var ms = moment(b, "YYYY/MM/DD HH:mm").diff(
        moment(a, "YYYY/MM/DD HH:mm")
      );
      var d = moment.duration(ms);
      var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
      let sItem = s?.split(":");
      if (sItem[0].length === 1) {
        return "0" + s + " - " + "HH:MM:SS";
      } else {
        return s + " - " + "HH:MM:SS";
      }
    } else {
      return "00:00";
    }
  };
  const getvisitDetails = async (id) => {
    try {
      const res = await getVisitDetailsApiById(id);
      if (res.status === 200 || res.status === 201) {
        setAllVisits(res.data.allVisit);
        let data = res.data.allVisit;
        setFilterVisits(data?.slice(1, data.length));
      }
    } catch (err) {}
  };

  const getAllVisitDetailsById = async (id) => {
    try {
      const res = await getVisitByPatintIdApi(id);
      if (res.status === 200 || res.status === 201) {
        setAllVisits(res.data.visitDetails);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(allVisits,"ADJFDJSAFJDASDFJ",filterVisits)
  const getBMCname = (data, d) => {
    if (d?.position?.left && d?.low && data?.position?.right && data?.hieght) {
      return "Left Lower Right Upper";
    } else if (
      d?.position?.left &&
      d?.low &&
      data?.position?.left &&
      data?.hieght
    ) {
      return "Left Lower Left Upper";
    } else if (
      d?.position?.right &&
      d?.low &&
      data?.position?.right &&
      data?.hieght
    ) {
      return "Right Lower Right Upper";
    } else if (
      d?.position?.right &&
      d?.low &&
      data?.position?.left &&
      data?.hieght
    ) {
      return "Right Lower Left Upper";
    } else if (d?.position?.left && d?.low) {
      return "Left Lower";
    } else if (d?.position?.right && d?.low) {
      return "Right Lower";
    } else {
      return "-";
    }
  };

  const getBMC = (data) => {
    if (
      data?.SI?.position?.left &&
      // formik1?.values?.SI?.low &&
      data?.ProneCrest?.position?.right
      // formik1?.values?.ProneCrest?.hieght
    ) {
      return "Left Lower Right Upper";
    } else if (
      !data?.SI?.position?.left &&
      !data?.SI?.position?.right &&
      !data?.ProneCrest?.position?.right &&
      !data?.ProneCrest?.position?.left
    ) {
      return "";
    } else if (
      data?.SI?.position?.left &&
      // formik1?.values?.SI?.low &&
      data?.ProneCrest?.position?.left
      // formik1?.values?.ProneCrest?.hieght
    ) {
      return "Left Lower Left Upper";
    } else if (
      data?.SI?.position?.right &&
      // formik1?.values?.SI?.low &&
      data?.ProneCrest?.position?.right
      // formik1?.values?.ProneCrest?.hieght
    ) {
      return "Right Lower Right Upper";
    } else if (
      data?.SI?.position?.right &&
      // formik1?.values?.SI?.low &&
      data?.ProneCrest?.position?.left
      // formik1?.values?.ProneCrest?.hieght
    ) {
      return "Right Lower Left Upper";
    } else if (
      data?.SI?.position?.left
      // formik1?.values?.SI?.low
    ) {
      return "Left Lower";
    } else if (data?.SI?.position?.right && data?.SI?.low) {
      return "Right Lower";
    } else {
      console.log("not active condition");
    }
  };
  const getSi =(data)=>{
    if(data?.SI?.position?.left&&data?.Adams?.FixedSI?.position?.left){
      return " Open Left"
    }else if(data?.SI?.position?.right&&data?.Adams?.FixedSI?.position?.right){
      return " Open Right"
    }else if(data?.SI?.position?.right&&data?.Adams?.FixedSI?.position?.left){
      return " Closed Left"
    }else if(data?.SI?.position?.left&&data?.Adams?.FixedSI?.position?.right){
      return " Closed Right"
    }
    else if(data?.SI?.position?.left&&data?.Adams?.FixedSI?.position?.BLT){
      return " Open Left / Closed Right"
    }else if(data?.SI?.position?.right&&data?.Adams?.FixedSI?.BLT){
      return " Open Right / Closed Left"
    }
    else if(data?.Adams?.FixedSI?.BLT){
      return "Open Left and Close Right"
    }else if(data?.Adams?.FixedSI?.position?.left){
      return "Open Left "
    }else if(data?.Adams?.FixedSI?.position?.right){
      return " Close Right"//new addition functionsright BLT
    }else
    {
      return false;
    }
  }
  const getConsultationDetail = async (id) => {
    try {
      const res = await getConsultationsApiByPatientId(id);
      if (res.status === 200 || res.status === 201) {
        setConsultationData(res.data.consultationArr);
        console.log(res.data,"asrasdfjk")
        setSelectedData({...selectedData,consultation:res?.data?.consultationArr[0]?._id})
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleConsultaion = (e) => {
    if (e.target.value) {
      setSelectedData({ ...selectedData, consultation: e.target.value });
      isValidConsultaion(e.target.value);
      // setToggle(true);
    }
  };

  const isValidConsultaion = async (id) => {
    try {
      const res = await getExamTestApi(id);
      if (res?.data?.findExam === true && !location?.state?.warningsId) {
        getExaminations(id);
      } else {
        toast.error("Examination not found!", { id: "003" });
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  useEffect(() => {
    if (patientId) {
      getvisitDetails(patientId);
      getConsultationDetail(patientId);
      getAllVisitDetailsById(patientId);
      getConsultationDetails(patientId);
    }
  }, [patientId]);
  console.log(diagnosedata,"staretiID")
  useEffect(() => {
    if (location?.state?.id) {
      getConsultationDetails(location.state.id);
      getExaminations(location.state.id);
    }
  }, [location?.state?.id]);

  useEffect(()=>{
    getWarnings()
  },[selectedData.consultation])
  return (
    <div>
      {Boolean(getWarnings()?.length) && (
      <div className="card mt-5 mb-5">
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
        {Boolean(diagnosedata?.length) && (
      <div className="card mt-5 mb-5">
            <div className="card-header warning-c-view">
              <h2>Diagnose:</h2>
              <ul className="mb-0">
                {diagnosedata?.map((v) => {
                  return <li>{v.name} <span style={{backgroundColor:"white",borderRadius:"50%",color:"black",padding:"1px 4px"}}>{v.value}</span></li>;
                })} 
              </ul>
            </div>
          </div>
        )} 
      <div className="card">
      
        <div className="card-header ">
          <div
            style={{ justifyContent: "space-between" }}
            className="row align-items-center d-flex"
          >
            <div className="col-lg-2">
              <h5 className="mb-0">Visit Details</h5>
            </div>
            <div className="col-lg-5">
              <select
                onChange={handleConsultaion}
                className="form-select"
                value={selectedData.consultation}
                id=""
              >
                <option value="" hidden>
                  Select Consultation
                </option>
                {consultationData?.length &&
                  consultationData?.map((v) => {
                    return (
                      <option value={v._id}>
                        {" "}
                        {v?.createdAt
                          ?.split("T")[0]
                          ?.split("-")
                          .reverse()
                          .join("/")}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </div>

        <table className="table table-hover table-nowrap mt-4">
          <thead className="table-light">
            <tr>
              <th>Date</th>
              <th>BMC</th>
              <th>Si</th>
              <th>Progress</th>
              <th>Cervical</th>
              <th>TMJ</th>
              <th>Cervical Progress</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {Boolean(allVisits?.length) ? (
              <tr>
                <td>
                  {allVisits[0]?.createdAt
                    .split("T")[0]
                    ?.split("-")
                    .reverse()
                    .join("/")}
                </td>
                <td>
                  {getBMC(
                    allVisits[0]?.functional
                  )}
                </td>
                <td>{getSi(allVisits[0]?.functional)}</td>
                <td>{allVisits[0]?.progress}</td>
                <td>{ getCervical(allVisits[0]?.functional) +
                          ", " +
                          // getCervicals(dataReports?.functional) +
                          " " +
                          getCervicalss(allVisits[0]?.functional)}</td>
                <td> {allVisits[0]?.functional?.TMJ?.step1 +
                          " ," +
                          allVisits[0]?.functional?.TMJ?.step2 +
                          " ," +
                          allVisits[0]?.functional?.TMJ?.step3}</td>
                <td>-</td>
                <td>
                  <Link
                    to="/VisitDetailsView"
                    state={{ patientId: patientId, visitId: allVisits[0]?._id }}
                    className="btn btn-sm btn-primary"
                  >
                    View
                  </Link>
                </td>
                <td
                  style={{ cursor: "pointer" }}
                  className="collapsed mt-2"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                  title="View More"
                >
                  <i class="bi bi-plus-circle-dotted"></i>
                </td>
              </tr>
            ) : (
              <tr align="center">
                <td colspan="6">
                  <h5> No record found!</h5>
                </td>
              </tr>
            )}
            {Boolean(filterVisits?.length) &&
              filterVisits?.map((v, i) => {
                return (
                  <tr
                    id="flush-collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <td>
                      {v.createdAt
                        .split("T")[0]
                        ?.split("-")
                        .reverse()
                        .join("/")}
                    </td>
                    <td>
                      {getBMC(v.functional)}
                    </td>
                    <td>{getSi(v.functional)}</td>
                    <td>{v?.progress}</td>
                    <td>{ getCervical(v?.functional) +
                          " " +
                          // getCervicals(dataReports?.functional) +
                          " ," +
                          getCervicalss(v?.functional)}
                          </td>
                    <td>{v?.functional?.TMJ?.step1 +
                          " ," +
                          v?.functional?.TMJ?.step2 +
                          " ," +
                          v?.functional?.TMJ?.step3}</td>
                    <td>-</td>
                    <td>
                      <Link
                        to="/VisitDetailsView"
                        state={{ patientId: patientId, visitId: v?._id }}
                        className="btn btn-sm btn-primary"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
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
                      <select
                        disabled={isEdit}
                        id="patient"
                        name="patientName"
                        value={values.patientName}
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value="" hidden>
                          Patient name
                        </option>
                        {patientList?.length &&
                          patientList?.map((v) => {
                            return (
                              <option value={v?._id}>{v?.serviceName}</option>
                            );
                          })}
                      </select>
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
                      <div className="form-group">
                        <label className="font-w">Starts Date & Time</label>
                        <DatePicker
                          name="startTime"
                          className="form-select"
                          selected={values?.startTime}
                          value={values?.startTime}
                          onChange={(date) => setFieldValue("startTime", date)}
                          showTimeSelect
                          minDate={new Date()}
                          placeholderText="select date"
                          // maxDate={values.endTime}
                          onKeyDown={(e) => {
                            e.preventDefault();
                          }}
                          timeFormat="p"
                          timeIntervals={5}
                          dateFormat="Pp"
                        />
                        <InputErrorMessage
                          error={touched?.startTime && errors?.startTime}
                          marginBottom={-15}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 mt-3">
                      <div className="form-group">
                        <label className="font-w">End Date & Time </label>
                        <DatePicker
                          placeholderText="select date"
                          className="form-select"
                          name="endTime"
                          selected={values?.endTime}
                          value={values?.endTime}
                          onChange={(date) => setFieldValue("endTime", date)}
                          showTimeSelect
                          minDate={
                            values?.startTime ? values?.startTime : new Date()
                          }
                          minTime={
                            values?.startTime ? values?.startTime : new Date()
                          }
                          maxTime={setHours(setMinutes(new Date(), 200), 23)}
                          // maxDate={"02-29-2020"}
                          onKeyDown={(e) => {
                            e.preventDefault();
                          }}
                          timeFormat="p"
                          timeIntervals={5}
                          dateFormat="Pp"
                        />
                        <InputErrorMessage
                          error={touched?.endTime && errors?.endTime}
                          marginBottom={-15}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 mt-3">
                      <label htmlFor="patient" className="font-w">
                        Duration
                      </label>
                      <input
                        className="form-control"
                        disabled
                        name="duration"
                        type="text"
                        value={getDuration(values?.startTime, values?.endTime)}
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
                        <option
                          value="New"
                          style={{ backgroundColor: "#ffff" }}
                        >
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
                        error={
                          touched.appointmentType && errors.appointmentType
                        }
                        marginBottom={-15}
                      />
                    </div>
                    <div className="col-lg-12 mt-7 d-flex justify-content-end">
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
      </div>
      {
        selectedData?.consultation &&  appointmentId && <Visit patientId={patientId} examId={examId} appointmentId={appointmentId} dignoseData={diagnosedata} />
      }
     
      {/* {selectedData.consultation && location?.state?.id && examId ? (
        <Visit patientId={patientId} examId={examId} />
      ) : (
        ""
      )} */}
    </div>
  );
};

export default VisitDetails;
