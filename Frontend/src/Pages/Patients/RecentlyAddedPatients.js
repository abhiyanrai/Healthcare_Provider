import React from "react";
import { getWithoutConsultDetails } from "../../Apis";
import { debounce } from 'lodash'; 
import ReactPaginate from "react-paginate";
import Loader from "../../Components/common/Errors/loader/Loader";
import { Link } from "react-router-dom";
import ConsultationForm from "../Consultation/consultaion-form/ConsultationForm";
import copy from "copy-to-clipboard";
import moment from "moment/moment";
import toast from "react-hot-toast";
import { useState } from "react";

const RecentlyAddedPatients = ({
  setcurrentPageRecent,
  getRecentPatientsData,
  setRecentPatient,
  setpageCountRecent,
  limitRecent,
  setRender,
  render,
  loading,
  setRecent,
  recent,
  recentPatient,
  pageCountRecent,
  currentPageRecent,
  setLoading,
}) => {
  const modal = document.querySelector("#exampleModal");
  const [count,setCount]=useState(0)
  const [consultId,setConsultId]=useState()
  const getReversedDate = (item) => {
    const date = new Date(item.createdAt);
    const reversedDate = moment(item.dob).format("DD/MM/YYYY");

    return reversedDate;
  };

  const getAge = (date) => {
    console.log(date, "DFASDTEWG");
    const arr = date.split("/");
    let temp = arr[0];
    arr[0] = arr[1];
    arr[1] = temp;
    const d = arr?.join("/");
    var dob = new Date(d);
    console.log(dob, "DASDFBASDGfsd");
    var month_diff = Date.now() - dob.getTime();
    var age_dt = new Date(month_diff);
    var year = age_dt.getUTCFullYear();
    var age = Math.abs(year - 1970);
    if (age <= 0) {
      let days = Math.floor(month_diff / 86400000);
      if (days >= 30) {
        let month = Math.floor(days / 30);
        if (month >= 2) {
          return month + " " + "Months";
        } else {
          return month + " " + "Month";
        }
      } else {
        if (days >= 2) {
          return days + " " + "Days";
        } else {
          return days + " " + "Day";
        }
      }
    } else {
      if (age >= 2) {
        return age + " " + "Years";
      } else {
        return age + " " + "Year";
      }
    }
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected + 1;
    setLoading(true);
    setcurrentPageRecent(selectedPage);
    getRecentPatientsData("", selectedPage, limitRecent);
  };

  const onChange = async (search ,currentPageRecent,num) => {
    try {
      const response = await getWithoutConsultDetails(
        search,
        currentPageRecent,
        num
      );
      if (response?.status === 200 || response?.status === 201) {
        setRecentPatient(response?.data?.allPatients);
        setRecent(response?.data?.allCount);
        // setTcount({...tcount,recent:response?.data?.allCount})
        setCount(response?.data?.allCount)
        setpageCountRecent(Math.ceil(response?.data?.allCount / limitRecent));
        setRender(!render);
      }
    } catch (err) {
      console.log(err);
    }
  }
  const debouncedOnChange = debounce(onChange, 500);

  const handleSearch = async (e, currentPageRecent, num) => {
    debouncedOnChange(e.target.value, currentPageRecent ,num);
   
  };

  return (
    <>
      <div className="card rounded-top-0">
        <div className="d-flex card-header border-bottom">
          <h5 className="mb-0 font-bolder h3">New Patients <span className="ms-1" style={{fontSize:".9rem",color:"grey"}}>({recent})</span></h5> 
          <div className="ms-auto text-end">
            {/* <SearchFilter startLength={15} filterData={providerDatas} /> */}

            <div className="d-flex ">
              <div className="input-group input-group-sm input-group-inline me-3">
                <span className="input-group-text pe-2">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => handleSearch(e, 1, limitRecent)}
                />
              </div>
              {/* <button
                type="button"
                className="btn btn-sm px-3 btn-neutral d-flex align-items-center"
                // onClick={handleSearch}
              >
                <i className="bi bi-funnel me-2"></i>
                <span>Filters</span>
              </button> */}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="col-xl-12">
            {/* <AllHealthcareProviders providerDatas={providerDatas} /> */}
            <div className="table-responsive">
              <table className="table table-hover table-nowrap ">
                <thead className="table-light text-start">
                  <tr>
                    <th className="col-1">S.No</th>
                    <th className="col-1">Patients Id</th>
                    <th className="col-2">Patients Name</th>
                    <th className="col-2">Created Date</th>
                    <th className="col-2">Date of Birth</th>

                    <th className="col-1">Age</th>
                    <th className="col-1">Gender</th>
                    <th></th>
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
                  ) : recentPatient?.length ? (
                    recentPatient?.map((item, index) => {
                      return (
                        <>
                          <tr className="text-start">
                            <td>
                              {console.log(
                                currentPageRecent,
                                limitRecent,
                                index,
                                "{{{{{{{{{{{"
                              )}
                              <span>
                                {(currentPageRecent - 1) * limitRecent +
                                  (index + 1)}
                              </span>
                            </td>
                            <td>
                              <span>{item.fileNo ? item.fileNo : "-"}</span>
                              {item.fileNo && (
                                <i
                                  title="copy"
                                  style={{
                                    color: "lightslategray",
                                    cursor: "pointer",
                                  }}
                                  className="fa-solid fa-copy ms-1"
                                  onClick={() =>
                                    copy(item.fileNo) &&
                                    toast.success("Copied", { id: "0002" })
                                  }
                                ></i>
                              )}
                            </td>
                            <td>
                              {/* <img
                              alt="..."
                              src="/OwnerKit/img/people/img-profile.jpg"
                              className="avatar avatar-sm rounded-circle me-2"
                            /> */}
                              <a>
                                {item.salutation +
                                  " " +
                                  item.firstName +
                                  " " +
                                  item.lastName}
                              </a>
                            </td>
                            <td>
                              <span>
                                {moment(item.registrationDate)?.format(
                                  "DD/MM/YYYY"
                                )}
                              </span>
                            </td>
                            <td>
                              <span>{getReversedDate(item)}</span>
                            </td>
                            <td>
                              <span>
                                {/* == 0 ? "<1 Years": getAge(arr.join("/")) */}
                                {getAge(getReversedDate(item))}
                              </span>
                            </td>
                            <td>
                              <span>{item.gender}</span>
                            </td>
                            <td>
                              <Link
                                to={`/patients/profile?${item._id}`}
                                className="btn btn-sm btn-primary border-base"
                                // data-bs-toggle="modal"
                                title="View"
                              >
                                <span>
                                  View
                                  {/* <i className="fa-solid fa-eye"></i> */}
                                </span>
                              </Link>
                              <a
                                // href="#exampleModal"
                                className="btn btn-sm btn-primary border-base"
                                title="Edit"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={()=>setConsultId(item._id)}
                              >
                                <span>
                                  Start Consultation
                                  {/* <i className="fa-solid fa-pen-to-square "></i> */}
                                </span>
                              </a>
                            </td>
                          </tr>
                         
                        </>
                      );
                    })
                  ) : (
                    <tr align="center">
                      <td colspan="8">
                        {" "}
                        <h5> No record found!</h5>
                      </td>{" "}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div
                            className="modal fade"
                            id="exampleModal"
                            tabindex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <ConsultationForm data={consultId} modal={modal} />
                          </div>
        <div className="col mt-5 mb-5 d-flex ms-5">
          {recent >= 11 ? (
            <ReactPaginate
              nextLabel="Next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageCountRecent}
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
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default RecentlyAddedPatients;
