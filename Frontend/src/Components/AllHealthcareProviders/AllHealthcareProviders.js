
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import Loader from "../common/Errors/loader/Loader";
const AllHealthcareProviders = ({providerDatas,all,setAll,pageCount,loading,setCurrentPage,limit,fetchAllProvidersDetails,currentPage,setLoading}) => {


  const getcolor = (val) => {
    switch (val) {
      case "New":
        return "#e71ae1";
        break;
      case "Reschedule":
        return "#aac4e9";
        break;
      case "Cancelled":
        return "#c5401d";
        break;
      case "Consultation":
        return "#68b04c";
        break;
      case "Regular":
        return "#d7bb58";
        break;
      default:
        return "#ffff";
    }
  }

  const handlePageClick = (e) => {
    setLoading(true);
    const selectedPage = e.selected + 1;
    setCurrentPage(selectedPage);
    fetchAllProvidersDetails(moment().format("YYYY-MM-DD"), selectedPage, limit);
  };
  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover table-nowrap">
          <thead className="table-light">
            <tr>
              <th className="col-1">S.No</th>
              <th className="col-2">Name</th>
              <th className="col-2">Service</th>
              <th className="col-2">Room</th>
              <th className="col-2">Time Slot</th>
              <th className="col-2">Type</th>
              <th className="col-2"></th>
            </tr>
          </thead>
          <tbody>
            {console.log(providerDatas, "jpsoirfmxvhgunvur")}
            {loading ? <tr align="center">
                      <td colspan="8">
                        {" "}
                        <Loader />
                      </td>{" "}
                    </tr>  :  Boolean(providerDatas?.length) ? (
              providerDatas?.map((item, index) => {
                return (
                  <>
                    <tr>
                      <td>
                        <span className="text-heading=">{(currentPage - 1) * limit + (index + 1)}</span>
                      </td>
                      <td>
                        <a className="text-heading">
                          {item?.patientId?.salutation +
                            " " +
                            item?.patientId?.firstName +
                            " " +
                            item?.patientId?.lastName}
                        </a>
                      </td>
                      <td>
                        <span className="text-heading">
                          {item?.serviceId?.serviceName}
                        </span>
                      </td>
                      <td>{item?.roomId?.roomName}</td>
                      <td>
                        {console.log(moment(item?.startTime).format('MMMM Do YYYY, h:mm a')?.split(" ")[3],"SDFGKFDSKGSKDFG")}
                        {moment(item?.startTime).format('MMMM Do YYYY, h:mm a')?.split(" ")[3]+" - " +moment(item?.endTime).format('MMMM Do YYYY, h:mm a')?.split(" ")[3]}
                      </td>
                      <td>
                        <span
                          className="p-1 rounded text-white"
                          style={{
                            backgroundColor: `${getcolor(
                              item?.appointmentType
                            )}`,
                          }}
                        >
                          {" "}
                          {item?.appointmentType}
                        </span>
                      </td>
                      <td className="text-end">
                        <Link
                          to={`/patients/profile`}
                          state={{
                            id: item?._id,
                            patientId: item?.patientId?._id,
                          }}
                          className="btn btn-sm  btn-primary border-base"
                        >
                          Go to Visit
                        </Link>
                      </td>
                    </tr>
                  </>
                );
              })
            ) : (
              <tr align="center">
                <td colspan="8">
                  <h5> No record found!</h5>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="col mt-5 mb-5 d-flex ms-5">
          {all >=11  ? (
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
    </>
  );
};

export default AllHealthcareProviders;
