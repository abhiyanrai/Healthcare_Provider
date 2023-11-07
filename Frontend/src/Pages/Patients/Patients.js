import React, { useState, useEffect } from "react";
import AddPatientModal from "./AddPatientModal";
import RecentlyAddedPatients from "./RecentlyAddedPatients";
import AllAddedPatients from "./AllAddedPatients";
import {
  getAllPatientsDetails,
  getFormatApi,
  getRegularPatientApi,
  getWithoutConsultDetails,
  postCsvApi,
} from "../../Apis";
import toast from "react-hot-toast";
import RegularPatient from "./RegularPatients";
import { saveAs } from "file-saver";
import { API_BASE_URL } from "../../utils/baseUrl";
import Loader from "../../Components/common/Errors/loader/Loader";
import { WhiteLoader } from "../../Components/common/Errors/loader/WhiteLoader";
const Patients = () => {
  const [allPatients, setAllPatients] = useState();
  const [allLoading,setAllLoading]=useState(false)
  const [searchVal, setSearchVal] = useState();
  const [pageCount, setpageCount] = useState(null);
  const [currentPage, setcurrentPage] = useState(1);
  const [regularCount, setRegularCount] = useState(null);
  const [limit, setLimit] = useState(10);
  const [limitRecent, setLimitRecent] = useState(10);
  const [recentPatient, setRecentPatient] = useState([]);
  const [recentLoading,setRecentLoading]=useState(false);
  const [regularPatient, setRegularPatient] = useState([]);
  const [pageCountRegular, setpageCountRegular] = useState(null);
  const [pageCountRecent, setpageCountRecent] = useState(null);
  const [currentPageRecent, setcurrentPageRecent] = useState(1);
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(true);
  const [all, setAll] = useState(0);
  const [recent, setRecent] = useState(0);
  const [csvData, setCsvData] = useState([]);
  const modal = document.querySelector("#addpatient");
  const [loader,setLoader]=useState(false)
  const handleFileUpload = async (event) => {
    setLoader(true)
    const file = event.target.files[0];
    console.log(file, "ADSFSDAFDSFDSA");
    const formData = new FormData();
    formData.append("file", file);
    try{
      const res = await postCsvApi(formData);
      if (res.status === 200 || res.status === 201) {
        toast.success(res.data.message);
        getRecentPatientsData("", currentPageRecent, limitRecent);
        getPatientsData(searchVal, currentPage, limit);
        setLoader(false)
      }
    }catch(err){
      toast.error("Servor Error")
      setLoader(false)
    }
   
  };

  const handleClick = event => {
    const { target = {} } = event || {};
    target.value = "";
  };

  console.log(csvData, "DFASDFAWETAGDDS");
  const getPatientsData = async (searchVal, currentPage, num) => {
    setAllLoading(true)
    try {
      const response = await getAllPatientsDetails(searchVal, currentPage, num);
      if (response.status === 200) {
        setAllPatients(response?.data?.allPatients);
        setAll(response?.data?.allCount);
        setpageCount(Math.ceil(response?.data?.allCount / limit));
        setAllLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const downloadFormat = async () => {
    // const res = await getFormatApi();
    // console.log(res,"tyeytuiehfksjf")
    fetch(`${API_BASE_URL}/common/download/csv-format`)
      .then((response) => response.blob())
      .then((blob) => {
        // Save the blob as a file using FileSaver
        saveAs(blob, "data.csv");
      })
      .catch((error) => {
        console.error("Error downloading the CSV file:", error);
      });
  };

  console.log(allPatients, "all pateitnaiad");

  const getRecentPatientsData = async (value, page, limitRecent) => {
    setRecentLoading(true);
    try {
      const response = await getWithoutConsultDetails(value, page, limitRecent);
      if (response?.status === 200 || response?.status === 201) {
        console.log(response, "TESHFDAHDSFA");
        // setRecentPatient(response?.data?.allPatients);
        setRecentPatient(response?.data?.allPatients);
        setRecent(response?.data?.allCount);
        setpageCountRecent(Math.ceil(response?.data?.allCount / limitRecent));
        setRecentLoading(false);
      }
    } catch (err) {
      console.log(err);
      setRecentLoading(false)
    }
  };

  const getRegularPatient = async (search,page,limit) => {
    try {
      const res = await getRegularPatientApi(search,page,limit);
      if (res.status === 200 || res.status === 201) {
        setRegularPatient(res?.data?.allPatients);
        setRegularCount(res.data?.allCount);
        setpageCountRegular(Math.ceil(res.data?.allCount / limitRecent));
        setLoading(false);
      }
      console.log(res, "regularpateitn");  
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getRecentPatientsData("", currentPageRecent, limitRecent);
    getRegularPatient("", currentPageRecent, limitRecent);
  }, []);

  useEffect(() => {
    getPatientsData(searchVal, currentPage, limit);
  }, []);

  return (
    <>
      <main className="py-5 bg-surface-secondary">
        <header>
          <div className="container-fluid">
            <div className="d-flex justify-content-end align-items-end">
              <label class="file-input btn btn-primary me-4" for="file-input" >
                <input
                  type="file"
                  accept=".csv"
                  disabled={loader}
                  onInput={handleFileUpload}
                  onClick={handleClick}
                  data-bs-toggle="modal"
                  name="file-input"
                  id="file-input"
                  class="file-input__input"
                />
                {
                  loader ? <WhiteLoader/> :    <label class="" for="file-input">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-upload me-2"
                    viewBox="0 0 16 16"
                    style={{cursor:"pointer"}}
                  >
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                  </svg>
                  <span style={{cursor:"pointer"}}> Import</span>
                </label>
                }
             
              </label>
              <a
                href="#addpatient"
                className="btn btn-primary"
                data-bs-toggle="modal"
              >
                <span>
                  <i className="bi bi-plus-square-dotted me-2"></i>
                </span>
                <span>Add Patient</span>
              </a>
            </div>
            <div
              style={{ float: "right", fontSize: ".7rem", marginTop: "5px" }}
            >
              <p
                onClick={downloadFormat}
                style={{
                  fontWeight: "500",
                  cursor: "pointer",
                  textDecoration: "underline",
                  marginRight: "180px",
                  fontStyle: "italic",
                }}
              >
                Download csv format{" "}
              </p>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <ul className="nav nav-tabs" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active pb-2"
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-home"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                  >
                    New Patients
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link  pb-2"
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-regular"
                    type="button"
                    role="tab"
                    aria-controls="pills-regular"
                    aria-selected="true"
                  >
                    Regular Patients
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link pb-2"
                    id="pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                  >
                    All Patients
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </header>
        {/* Modal */}
        <div
          className="modal fade"
          id="addpatient"
          tabIndex={-1}
          aria-labelledby="addpatient"
          aria-hidden="true"
        >
          <AddPatientModal
            getPatientsData={getPatientsData}
            getRecentPatientsData={getRecentPatientsData}
            modal={modal}
            schedule={false}
            searchVal={searchVal}
            currentPage={currentPage}
            limit={limit}
            limitRecent={limitRecent}
            currentPageRecent={currentPageRecent}
          />
        </div>
        <div className="container-fluid ">
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <RecentlyAddedPatients
                limitRecent={limitRecent}
                recentPatient={recentPatient}
                setRecentPatient={setRecentPatient}
                setRecent={setRecent}
                recent={recent}
                pageCountRecent={pageCountRecent}
                setpageCountRecent={setpageCountRecent}
                currentPageRecent={currentPageRecent}
                setcurrentPageRecent={setcurrentPageRecent}
                loading={recentLoading}
                render={render}
                setLoading={setRecentLoading}
                setRender={setRender}
                getRecentPatientsData={getRecentPatientsData}
              />
            </div>
            <div
              className="tab-pane fade"
              id="pills-regular"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <RegularPatient
                getPatientsData={getRegularPatient}
                setAllPatients={setRegularPatient}
                allPatients={regularPatient}
                pageCount={pageCountRegular}
                loading={allLoading}
                setAll={setAll}
                all={all}
                regularCount={regularCount}
                setLoading={setAllLoading}
                currentPage={currentPage}
                limit={limit}
                setcurrentPage={setcurrentPage}
                setpageCount={setRegularCount}
              />
            </div>
            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <AllAddedPatients
                getPatientsData={getPatientsData}
                setAllPatients={setAllPatients}
                allPatients={allPatients}
                pageCount={pageCount}
                loading={loading}
                setAll={setAll}
                all={all}
                setLoading={setLoading}
                currentPage={currentPage}
                limit={limit}
                setcurrentPage={setcurrentPage}
                setpageCount={setpageCount}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Patients;
