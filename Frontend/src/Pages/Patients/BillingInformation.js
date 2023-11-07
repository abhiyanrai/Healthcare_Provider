import React, { useRef, useState } from "react";
import { useEffect } from "react";
import {
  getBillInfoByIdApi,
  getBillingListApi,
  getSinglePatientDetailsById,
  sendEmailApi,
} from "../../Apis";
import moment from "moment";
import { API_BASE_URL } from "../../utils/baseUrl";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-hot-toast";
const BillingInformation = ({ patientId }) => {
  const [billingList, setBillingList] = useState([]);
  const [billId, setBillId] = useState();
  const [serviceData, setServiceData] = useState([]);
  const [patinetData, setPatientData] = useState();
  const [singleBillData, setSingleBillData] = useState("");
  // const [discount, setDiscount] = useState("");
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [num, setNum] = useState(1);
  const mystyle = {
    padding: ".1rem 1.5rem",
  };
  const handleSendEmail = async () => {
    if (singleBillData && patinetData) {
      const res = await sendEmailApi(singleBillData._id, patinetData.email);
      if (res.status === 200 || res.status === 201) {
        toast.success(res.data.message);
      }
    }
  };
  const getTotalAmount = () => {
    let sum = 0;
    // serviceData?.filter((v)=>v.)
    console.log(serviceData,"sevidata")
    // let totalamount= getServiceAmount(serviceData)
    for (let i = 0; i < serviceData?.length; i++) {
      sum = parseFloat(sum) + parseFloat(getServiceAmount(serviceData[i].data.text,serviceData[i].amount));
    }
    // console.log(sum,"SUMMMMMMMMMMM")
    return sum.toFixed(2);
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
  const getServiceAmount =(tax,amount)=>{
    console.log(tax,amount,"SDFASRTDGFHFSDFSFDFGFDG")
    let percent = tax?.reduce((sum, person) => parseInt(sum) + parseInt(person.value), 0);
    console.log(percent,"percentttt")
    let total = amount * percent /100 ;
    return parseInt(total) + parseInt(amount) 
  }
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
              <a
                className="btn btn-sm btn-neutral"
                style={{ position: "absolute", right: "60px" }}
                title="Download"
                href={`${API_BASE_URL}/common/pdf/patient/billing?id=${singleBillData?._id}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-download"
                  viewBox="0 0 16 16"
                >
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                </svg>
              </a>
              <p
                className="btn btn-sm btn-neutral"
                style={{
                  position: "absolute",
                  right: "120px",
                  cursor: "pointer",
                }}
                onClick={handlePrint}
              >
                Print
              </p>

              <p
                onClick={handleSendEmail}
                // href={`${API_BASE_URL}/common/pdf/patient/billing?id=${singleBillData?._id}&email=${patinetData?.email}`}
                className="btn btn-sm btn-neutral"
                style={{
                  position: "absolute",
                  right: "198px",
                  cursor: "pointer",
                }}
              >
                Send to Emails
              </p>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setServiceData([])}
              ></button>
            </div>
            <hr />
            <div className="modal-body pt-0 print-t" ref={componentRef}>
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
                    <th scope="col"><i class="bi bi-currency-euro"></i>Price</th>
                    <th scope="col">Tax %</th>
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
                            <td>{v?.amount}</td>
                            <td>{v?.data?.text?.map((v)=>{
                              return (
                                <><p style={{paddingTop:"20px"}}>{v.name} - {v.value}</p><br/></>
                              )
                            })}</td>
                            <td style={{ textAlign: "end" }}>{getServiceAmount(v?.data?.text , v.amount)}</td>
                          </tr>
                        );
                      })
                    : serviceData?.map((v, i) => {
                        return (
                          <tr>
                            <th scope="row">{i + 1}</th>
                            <td>{v.serviceName}</td>
                            <td>{v?.amount}</td>
                            <td>{v?.data?.text?.map((v)=>{
                              return (
                                <><p style={{paddingTop:"20px"}}>{v.name} - {v.value}</p><br/></>
                              )
                            })}</td>
                            <td style={{ textAlign: "end" }}>{getServiceAmount(v?.data?.text , v.amount)}</td>
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
                    {singleBillData?.totalAmount
                        ? singleBillData?.totalAmount
                        : getTotalAmount()}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "end", ...mystyle }}></td>
                    <th style={{ textAlign: "end", ...mystyle }}>Discount:</th>
                    <td style={{ textAlign: "end", ...mystyle }}>
                    {singleBillData?.discountApplied
                        ? singleBillData?.discountApplied + "%"
                        : "-"}
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
