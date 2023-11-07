import React,{useState,useEffect} from 'react';
import toast from 'react-hot-toast';
import moment from 'moment/moment';
import Select, { components } from "react-select";
import copy from 'copy-to-clipboard';
import { getAllPatientsDetails, getAllPatientsDetailsWithExamination, getAppointmentByPatientIdApi, getRegularPatientApi, getSinglePatientDetailsById } from '../../Apis';
import VisitDetails from '../Patients/VisitDetails';
import { useLocation } from 'react-router-dom';
const DailyNotes = () => {
  const [patientList, setPatientList] = useState([]);
  const [patinetData, setPatientData] = useState();
  const [loading, setLoading] = useState(true);
  const [appointmentId,setAppointmentId]=useState();
  const [pdata,setPData]=useState();
  const [op, setOp] = useState([]);
  const [appointmentList,setAppointmentList]=useState([]);
  const [patientId,setPatientId]=useState("")
  const [selectedPatient, setSelectedPatient] = useState();
  const location = useLocation();
  const getAllPatientDetails = async () => {
      try {
        const res = await getRegularPatientApi();
        if (res.status === 200 || res.status === 201) {
          setPatientList(res?.data?.allPatients);
          managePatients(res?.data?.allPatients)
        }
      } catch (err) {
        console.log(err);
      }
    };
    const getAppointmentDetailsById =async(id)=>{
      try{
        const res = await getAppointmentByPatientIdApi(id);
        if(res.status === 200 || res.status === 201 ){
          setAppointmentList(res?.data?.appointment)
        }
        console.log(res,"apointn by id")
      }catch(err){
        console.log(err)
      }
    }
    const handleAppointmentChange = (e)=>{
      console.log("")
      setAppointmentId(e.target.value);
    }
    const getPatientDetails = async (id) => {
      try {
        const res = await getSinglePatientDetailsById(id);
        if (res.status === 200 || res.status === 201) {
          setPatientData(res?.data?.patient);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const handlePChange =(e)=>{
      setPData(e);
      setSelectedPatient(e.value);
      getAppointmentDetailsById(e.value)
      getPatientDetails(e.value);
      setPatientId(e.value)
    }
    const managePatients = (data) => {
      console.log(data, "data");
      let d = [];
      data?.map((v) => {
        d.push({ label: v.firstName + " " + v.lastName, value: v._id });
      });
      setOp(d);
    };
    const handleSelectChange = (e) => {
      setSelectedPatient(e.target.value);
      getAppointmentDetailsById(e.target.value)
      getPatientDetails(e.target.value);
      setPatientId(e.target.value)
    };

   
    useEffect(() => {
      getAllPatientDetails();
    }, []);

    useEffect(()=>{
      if(location?.state?.patientId){
        setSelectedPatient(location?.state?.patientId);
        getAppointmentDetailsById(location?.state?.patientId)
      getPatientDetails(location?.state?.patientId);
      setPatientId(location?.state?.patientId);
      setAppointmentId(location?.state?.id);
      
      }
    },[])

return (
  <main className="py-6 bg-surface-secondary">
  <div className="container-fluid mt-6">
  <div className="card">
    <div className="row card-header card-p align-items-center">
      {patinetData ? (
        <>
          {" "}
          <div className="col-md-3">
            <div
              className="avatar avatar-sm rounded-circle text-white me-3"
              style={{ width: "20px", height: "20px" }}
            >
              <img
                alt="..."
                src="/static/media/img-profile.00fa072a3afa1895a513.jpg"
                width="20"
              />
            </div>
            <span>
              {patinetData?.salutation +
                " " +
                patinetData?.firstName +
                " " +
                patinetData?.lastName}
            </span>
          </div>
          <div className="col-md-3">
            <p>
              Patient Id:&nbsp;
              <span className="copy-text">
                {patinetData?.fileNo}{" "}
                <i
                  title="copy"
                  className="fa-solid fa-copy ms-1"
                  style={{ color: "lightslategray", cursor: "pointer" }}
                  onClick={() => copy(patinetData?.fileNo) && toast.success("Copied" ,{id:"0001"})}
                ></i>
              </span>
            </p>
          </div>
          <div className="col-md-3">
            <p>
              D.O.B.:{" "}
              <span>
                {" "}
                {moment(patinetData?.dob).format("DD/MM/YYYY")}
              </span>
            </p>
          </div>
          <div className="col-md-3" >
            <select
              className="form-select"
              value={selectedPatient || patinetData?._id}
              onChange={handleSelectChange}
             
              aria-label="Default select example"
            >
              <option value="" hidden>
                Select Patient
              </option>
              {patientList?.length &&
                patientList?.map((v) => {
                  return (
                    <option value={v._id}>Patient: {v?.fileNo}</option>
                  );
                })}
            </select>
          </div>
          {/* <div className="col-md-2" >
            <select
              className="form-select"
              value={appointmentId}
              onChange={handleAppointmentChange}
             
              aria-label="Default select example"
            >
              <option value="" hidden>
                Select Appointment
              </option>
              {appointmentList?.length &&
                appointmentList?.map((v) => {
                  return (
                    <option value={v?._id}>{moment(v?.startTime).format('MMMM Do YYYY, h:mm a')?.split(" ")[3] +"-"+ moment(v?.endTime).format('MMMM Do YYYY, h:mm a')?.split(" ")[3]}</option>
                  );
                })}
            </select>
          </div> */}
        </>
      ) : (
        <div className="col-md-12">
            <Select 
            value={pdata}
            selected={pdata}
            onChange={handlePChange}
            isSearchable={true}
            // className="form-select"
            options={op}
            
            />
          {/* <select
            className="form-select"
            value={selectedPatient}
            
            onChange={handleSelectChange}
            aria-label="Default select example"
          >
            <option value="" hidden>
              Select Patient
            </option>
            {patientList?.length &&
              patientList?.map((v) => {
                return (
                  <option value={v._id}>Patient: {v?.fileNo}</option>
                );
              })}
          </select> */}
        </div>
      )}
    </div>
    {console.log(location?.state?.patientId,"patinetiIIDd")}
  </div>
  <div className='mt-5'>
  {
    patientId  && <VisitDetails patientId={patientId} appointmentId={appointmentId} />
  }
  </div>
</div>
</main>
)
}

export default DailyNotes