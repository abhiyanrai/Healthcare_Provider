import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { getAllPatientsDetails } from "../../Apis";
import { getAllPatientsDetails } from "../../../Apis/healthcareProvider";
import copy from "copy-to-clipboard";
import { debounce } from 'lodash'; 
import Loader from "../../../Components/common/Errors/loader/Loader";
import { toast } from "react-hot-toast";
import ReactPaginate from "react-paginate";
const AllAddedPatients = ({
  currentPage,
  setAll,
  allPatients,
  all,
  loading,
  setLoading,
  limit,
  pageCount,
  setAllPatients,
  getPatientsData,
  setcurrentPage,
  setpageCount,
}) => {
  const [searchVal, setSearchVal] = useState();
  const handlePageClick = (e) => {
    setLoading(true);
    const selectedPage = e.selected + 1;
    setcurrentPage(selectedPage);
    getPatientsData(searchVal, selectedPage, limit);
  };
  const getDatee = (dates, callback) => {
    const reversedDate = dates.split("-").reverse().join("/");
    const arr = reversedDate.split("/");
    let temp = arr[0];
    arr[0] = arr[1];
    arr[1] = temp;
    return callback(arr.join("/"));
  };
  const getAge = (date) => {
    var dob = new Date(date);
    var month_diff = Date.now() - dob.getTime();
    var age_dt = new Date(month_diff);
    var year = age_dt.getUTCFullYear();
    var age = Math.abs(year - 1970);
    if (age <= 0) {
      let days = Math.floor(month_diff / 86400000);
      if (days >= 30) {
        let month = Math.floor(days / 30);
        return month + " " + "Months";
      } else {
        return days + " " + "Days";
      }
    } else {
      return age + " " + "Years";
    }
  };

  const onChange = async (search) => {
    setSearchVal(search);

    try {
      const response = await getAllPatientsDetails(
        search,
        currentPage,
        limit
      );
      if (response.status === 200) {
        setAllPatients(response?.data?.allPatients);
        setAll(response?.data?.allCount);
        setpageCount(Math.ceil(response?.data?.allCount / limit));
      }
    } catch (err) {
      console.log(err);
    }
  }

  const debouncedOnChange = debounce(onChange, 500);

  const handleSearch = async (e) => {

    debouncedOnChange(e.target.value);
   
  };

  return (
    <>
      <div className="card rounded-top-0">
        <div className="d-flex card-header border-bottom">
          <h5 className="mb-0 font-bolder h3">All Patients<span className="ms-1" style={{fontSize:".9rem",color:"grey"}}>({all})</span></h5>
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
                  onChange={(e) => handleSearch(e)}
                />
              </div>
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
                    <th className="col-2">Created Date </th>
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
                  ) : allPatients?.length ? (
                    allPatients?.map((val, index) => {
                      return (
                        <tr className="text-start">
                          <td>
                            <span>
                              {(currentPage - 1) * limit + (index + 1)}
                            </span>
                          </td>
                          <td>
                            <span>{val?.fileNo ? val.fileNo : "-"}</span>
                            {val?.fileNo && (
                              <i
                                title="copy"
                                style={{ color: "lightslategray" }}
                                className="fa-solid fa-copy ms-1"
                                onClick={() =>
                                  copy(val?.fileNo) &&
                                  toast.success("Copied", { id: "0001" })
                                }
                              ></i>
                            )}
                          </td>
                          <td>
                            <a className="text-heading" href="#">
                              {val?.salutation +
                                " " +
                                val?.firstName +
                                " " +
                                val?.lastName}
                            </a>
                          </td>
                          <td>
                            <span>
                              {val?.registrationDate
                                ?.split("-")
                                .reverse()
                                .join("/")}
                            </span>
                          </td>
                          <td>
                            <span>
                              {val?.dob?.split("-").reverse().join("/")}
                            </span>
                          </td>

                          <td>
                            <span>{getDatee(val?.dob, getAge)}</span>
                          </td>
                          <td>
                            <span>{val?.gender}</span>
                          </td>
                          <td className="text-center">
                            <Link
                              //   to="/patients/profile/:patientId"
                              to={`/patients/profile?${val?._id}`}
                              className="btn btn-sm btn-primary border-base text-end"
                              title="View"
                            >
                              <span>
                                View
                                {/* <i className="fa-solid fa-eye"></i> */}
                              </span>
                            </Link>
                          </td>
                        </tr>
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
        <div className="col mt-5 mb-5 d-flex ms-5">
          {all >= 11 ? (
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
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};



export default AllAddedPatients;
