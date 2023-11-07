import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
// import { getBillInfoByIdApi, getBillingListApi, getSinglePatientDetailsById } from "../../Apis";
import { getBillInfoByIdApi, getBillingListApi, getSinglePatientDetailsById } from "../../../Apis/healthcareProvider";

const BillingInformation = ({ patientId }) => {
  const [billingList, setBillingList] = useState([]);
  const [billId, setBillId] = useState();
  const [serviceData, setServiceData] = useState([]);
  const [patinetData, setPatientData] = useState();
  const [singleBillData, setSingleBillData] = useState("");
  const [num, setNum] = useState(1);
  const mystyle = {
    padding: ".1rem 1.5rem",
  };

  const getPatientDetails = async (id) => {
    try {
      const res = await getSinglePatientDetailsById(id);
      if (res.status === 200 || res.status === 201) {
        setPatientData(res?.data?.patient);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getAllBillingDetails = async (id) => {
    const res = await getBillingListApi(id);
    if (res.status === 200 || res.status === 201) {
      setBillingList(res?.data?.allBillingData);
    }
    console.log(res, "responseposne");
  };
  const getBillInfo = async (id) => {
    try {
      const res = await getBillInfoByIdApi(id);
      if (res.status === 200 || res.status === 201) {
        setSingleBillData(res?.data?.patientBilling);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleViewClick = () => {
    if (num === 1) {
      setNum(billingList?.length);
    } else {
      setNum(1);
    }
  };

  useEffect(() => {
    getBillInfo(billId);
  }, [billId]);
  useEffect(() => {
    if (patientId) {
      getPatientDetails(patientId);
      getAllBillingDetails(patientId);
    }
  }, [patientId]);
  return (
    <div>
      <div className="card rounded-top-0">
        <div className="card-header border-bottom d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Billing Information</h5>
        </div>
        <div className="table-responsive">
          <table className="table table-nowrap">
            <tbody className="position-relative">
              <tr className="table-light">
                <th>S.No</th>
                <th>Date</th>
                <th>Services</th>
                {/* <th>Status</th> */}
                <th>Amount</th>
                <th></th>
              </tr>
              {Boolean(billingList?.length) ? (
                billingList?.slice(0, num)?.map((v, i) => {
                  return (
                    <>
                      <tr>
                        <td>{i + 1} </td>
                        <td>
                          {moment(v.createdAt?.split("T")[0]).format(
                            "DD/MM/YYYY"
                          )}
                        </td>
                        <td>
                          {v?.orderJson?.map((v) => {
                            return v.serviceName + " ";
                          })}
                        </td>
                        <td>{v.billAmount}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalInvoice"
                            onClick={() => setBillId(v._id)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                      <span
                        className="position-absolute right-0"
                        style={{ top: "75px", right: "0", cursor: "pointer" }}
                      >
                        {num == 1 ? (
                          <i
                            className="bi bi-plus-square-dotted"
                            onClick={handleViewClick}
                            style={{ border: "none " }}
                            title="More"
                          ></i>
                        ) : (
                          <i
                            className="bi bi-dash-square-dotted"
                            onClick={handleViewClick}
                            style={{ border: "none " }}
                            title="More"
                          ></i>
                        )}
                      </span>
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
      </div>

      {/* Invoice popup modal code start here  */}
      <div
        className="modal fade"
        id="exampleModalInvoice"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header pt-2 pe-4 ps-4">
              <h3 className="modal-title fs-5" id="exampleModalLabel">
                INVOICE
              </h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setServiceData([])}
              ></button>
            </div>
            <hr />
            <div className="modal-body pt-0">
              <div className="d-flex justify-content-between">
                <h5>
                  Patient Id: <span>{patinetData?.fileNo}</span>
                </h5>
                <h5>
                  Date of bill:{" "}
                  <span>
                    {patinetData?.createdAt
                      ?.split("T")[0]
                      ?.split("-")
                      ?.reverse()
                      .join("/")}
                  </span>
                </h5>
              </div>

              <table className="table table-borderless border border-light-subtle mt-3">
                <tbody>
                  <tr>
                    <th
                      style={{
                        textDecoration: "underline",
                        width: "20%",
                        paddingBottom: "0.2rem",
                      }}
                    >
                      <h6>Patient Details: </h6>
                    </th>
                    <td></td>
                  </tr>
                  <tr>
                    <th style={mystyle}>Name: </th>
                    <td style={mystyle}>
                      {patinetData?.salutation +
                        " " +
                        patinetData?.firstName +
                        " " +
                        patinetData?.lastName}
                    </td>
                  </tr>
                  <tr>
                    <th style={mystyle}>Date of Birth:</th>
                    <td style={mystyle}>
                      {patinetData?.dob?.split("-").reverse().join("/")}
                    </td>
                  </tr>
                  <tr>
                    <th style={mystyle}>gender:</th>
                    <td style={mystyle}>{patinetData?.gender}</td>
                  </tr>
                  <tr>
                    <th style={mystyle}>Email:</th>
                    <td style={mystyle}>{patinetData?.email}</td>
                  </tr>
                  <tr>
                    <th style={mystyle}>Phone:</th>
                    <td style={mystyle}>{patinetData?.contactNo}</td>
                  </tr>
                  <tr>
                    <th className="pb-4" style={mystyle}>
                      Address:
                    </th>
                    <td className="white-space pb-4" style={mystyle}>
                      {patinetData?.address +
                        " " +
                        patinetData?.city +
                        " " +
                        patinetData?.zipCode}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="table mt-4">
                <thead className="table-light">
                  <tr>
                    <th scope="col">S.No.</th>
                    <th scope="col">Service Rendered</th>
                    <th scope="col" style={{ textAlign: "end" }}>
                      Service Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Boolean(singleBillData?.orderJson?.length)
                    ? singleBillData?.orderJson?.map((v, i) => {
                        return (
                          <tr>
                            <th scope="row">{i + 1}</th>
                            <td>{v.serviceName}</td>
                            <td style={{ textAlign: "end" }}>{v.amount}</td>
                          </tr>
                        );
                      })
                    : serviceData?.map((v, i) => {
                        return (
                          <tr>
                            <th scope="row">{i + 1}</th>
                            <td>{v.serviceName}</td>
                            <td style={{ textAlign: "end" }}>{v.amount}</td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
              {/* <hr /> */}

              <table className="table table-borderless mt-4">
                <tbody>
                  <tr>
                    <td style={{ textAlign: "end", ...mystyle }}></td>
                    <th style={{ textAlign: "end", ...mystyle }}>
                      Total Amount:
                    </th>
                    <td style={{ textAlign: "end", ...mystyle }}>
                      {singleBillData?.totalAmount}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "end", ...mystyle }}></td>
                    <th style={{ textAlign: "end", ...mystyle }}>Discount:</th>
                    <td style={{ textAlign: "end", ...mystyle }}>
                      {singleBillData?.discountApplied + "%"}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "end", ...mystyle }}></td>
                    <th style={{ textAlign: "end", ...mystyle }}>
                      <h5>Grand Total: </h5>
                    </th>
                    <td style={{ textAlign: "end", ...mystyle }}>
                      {singleBillData?.billAmount}
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <table className="table table-borderless mt-4">
                <tbody>
                  <tr>
                    <td style={{ width: "37%" }}></td>
                    <th
                      style={{
                        textAlign: "end",
                        ...mystyle,
                        backgroundColor: " #00000026",
                      }}
                    >
                      <h4>TOTAL PAYMENT</h4>
                    </th>
                    <td
                      style={{
                        textAlign: "end",
                        ...mystyle,
                        backgroundColor: " #00000026",
                      }}
                    >
                      <h4>{singleBillData?.billAmount + ".00"}</h4>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Invoice popup modal code end here  */}
    </div>
  );
};
export default BillingInformation;
