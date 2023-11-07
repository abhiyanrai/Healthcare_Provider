import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ConsultationForm from "./consultaion-form/ConsultationForm";
import "./consultation.css";
import { debounce } from 'lodash'; 

import { getRecentConsultaion ,  getPatientWithoutConsult,getConsultationsApi,
  getSinglePatientDetailsById,} from "../../../Apis/healthcareProvider";
import toast from 'react-hot-toast';
import "react-toastify/dist/ReactToastify.css";
import img from "../../../Assets/img/img-profile.jpg";
import copy from "copy-to-clipboard";
import Loader from "../../Components/common/Errors/loader/Loader";
import moment from "moment";
import ReactPaginate from "react-paginate";
const Consultation = () => {
  const [allPatients, setAllPatients] = useState();
  const [recentConsultation, setRecentConsultation] = useState();
  const [patientData, setPatientData] = useState();
  const [patientId, setPatientId] = useState("");
  const [disable, setDisable] = useState(true);
  const [inputVal, setInputVal] = useState();
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [all, setAll] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const modal = document.getElementById("#exampleModal");
  

  const onChange = async (search) => {
    setInputVal(search);
    try {
      const response = await getRecentConsultaion(search,currentPage,limit);
      if (response.status === 200 || response.status === 201) {
        inputVal
          ? setRecentConsultation(response.data?.allConsultation)
          : setRecentConsultation(response.data?.allConsultation);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const debouncedOnChange = debounce(onChange, 500);
  
  const handleSearch = async (e) => {

    debouncedOnChange(e.target.value);
    
  };
  const handlePageClick = (e) => {
    setLoading(true);
    const selectedPage = e.selected + 1;
    setCurrentPage(selectedPage);
    getRecentConsultaionData("", selectedPage, limit);
  };
  const getPatientsData = async () => {
    try {
      const response = await getPatientWithoutConsult();
      if (response.status === 200) {
        setAllPatients(response?.data.allPatients);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getRecentConsultaionData = async (data, currentPage, limit) => {
    try {
      const response = await getRecentConsultaion(data, currentPage, limit);
      if (response.status === 200) {
        setRecentConsultation(response?.data?.allConsultation);
        setAll(response?.data?.allCount);
        setPageCount(Math.ceil(response?.data?.allCount / limit));
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectValue = async (e) => {
    let id = e.target.value;
    setPatientId(e.target.value);
    setDisable(false);
    if (id) {
      const response = await getSinglePatientDetailsById(id);
      if (response.status === 200) {
        setPatientData(response?.data?.patient);
      }
    }
  };

  useEffect(() => {
    getRecentConsultaionData("", currentPage, limit);
    getPatientsData();
    getPatientsData();
  }, []);

  return (
    <>
      <main className="py-6 bg-surface-secondary">
        <div className="container-fluid vstack">
          <div className="card">
            <hr className="mt-0" />
            <div className="row card-header d-flex justify-content-end">
              {patientData ? (
                <>
                  <div className="col-lg-3">
                    <div className="avatar avatar-sm bg-warning rounded-circle text-white me-3">
                      <img alt="..." src={img} />
                    </div>
                    <span>
                      {patientData &&
                        `${patientData.salutation} ${patientData.firstName} ${patientData.lastName}`}
                    </span>
                  </div>
                  <div className="col-lg-3">
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
                  <div className="col-lg-3">
                    <p>
                      D.O.B.:{" "}
                      <span>
                        {" "}
                        {patientData &&
                          moment(patientData.dob).format("DD/MM/YYYY")}
                      </span>
                    </p>
                  </div>
                </>
              ) : (
                ""
              )}

              <div className="col-lg">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={handleSelectValue}
                >
                  <option value="" hidden>
                    {" "}
                    Select Patient
                  </option>
                  {allPatients?.map((val) => {
                    return (
                      <>
                        <option value={val._id}>
                          Patient: {val?.fileNo ? val.fileNo : "-"}{" "}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          <div className="card-header d-flex align-items-center flex-wrap">
            <h5 className="me-auto"></h5>
            <div className="d-flex justify-content-end">
              <button
                type="submit"
                disabled={disable}
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                New Consultation
              </button>
            </div>
          </div>
          <div className="card mt-5 ">
            <div className="card-header border-bottom d-flex align-items-center">
              <h5 className="me-auto">Recent Consultation</h5>
              <div>
                <div className="d-flex gap-3">
                  <div className="input-group input-group-sm input-group-inline">
                    <span className="input-group-text pe-2">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      aria-label="Search"
                      value={inputVal}
                      onChange={(e) => handleSearch(e)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table">
                <thead className="table-light">
                  <tr>
                    <th scope="col">S.NO.</th>
                    <th scope="col">Date</th>
                    <th scope="col">Patients Name</th>
                    <th scope="col">Patients Id</th>
                    <th scope="col">Date of birth</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
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
                  ) : recentConsultation?.length ? (
                    recentConsultation?.map((val, i) => {
                      return (
                        <tr>
                          <th scope="row">
                            {(currentPage - 1) * limit + (i + 1)}
                          </th>
                          <th scope="row">
                            {moment(val?.patientId?.registrationDate).format(
                              "DD/MM/YYYY"
                            )}
                          </th>
                          <td>
                            <div className="avatar avatar-sm bg-warning rounded-circle text-white me-3">
                              <img alt="..." src={img} />
                            </div>
                            <span>
                              {" "}
                              {val?.patientId?.salutation +
                                " " +
                                val?.patientId?.firstName +
                                " " +
                                val?.patientId?.lastName}
                            </span>
                          </td>

                          <td>
                            {val?.patientId?.fileNo
                              ? val?.patientId?.fileNo
                              : "-"}{" "}
                            {val?.patientId?.fileNo && (
                              <i
                                title="copy"
                                style={{
                                  color: "lightslategray",
                                  cursor: "pointer",
                                }}
                                className="fa-solid fa-copy ms-1"
                                onClick={() =>
                                  copy(val?.patientId?.fileNo) &&
                                  toast.success("Copied", { id: "0002" })
                                }
                              ></i>
                            )}
                          </td>
                          <td>
                            {moment(val?.patientId?.dob).format("DD/MM/YYYY")}
                          </td>
                          <td style={{ textAlign: "end" }}>
                            <Link
                              className="btn btn-sm btn-neutral me-5"
                              to={`/Consultation/ConsultationView/${val?._id}`}
                            >
                              View
                            </Link>
                            <Link
                              className="btn btn-sm btn-primary mat-button-wrapper"
                              to="/examination"
                              state={{
                                id: val?.patientId?._id,
                                warningsId: val?._id,
                              }}
                            >
                              Start Examination
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      {" "}
                      <td colspan="6" align="center">
                        {" "}
                        <h5>No record found !</h5>{" "}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="col mt-5 ms-5 mb-5 d-flex ">
              {all >= 11 && (
                <ReactPaginate
                  nextLabel="Next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  pageCount={pageCount}
                  previousLabel="< Previous"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                />
              )}
            </div>
          </div>

          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <ConsultationForm
              modal={modal}
              data={patientId}
              value={getRecentConsultaionData}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Consultation;
