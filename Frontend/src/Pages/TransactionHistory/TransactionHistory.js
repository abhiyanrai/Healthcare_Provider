import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import { getTransctionApi } from "../../Apis";
import Loader from "../../Components/common/Errors/loader/Loader";

const TransactionHistory = () => {
  const [transactionDetails, setTransactionDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const getAllTransactionDetails = async () => {
    try {
      const res = await getTransctionApi();
      console.log(res, "sdfasf");
      if (res?.status === 200 || res?.status === 201) {
        setTransactionDetails(res?.data?.allTransactions);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getPlanName =(data)=>{
   let d = data?.split(" ")
   if(d?.length > 5){
    return d[0]+" "+d[1] +" , "+ d[7]+" "+d[8]+" "+d[9]
   }else{
    return data
   }
  }
  function addOneYear(date) {
    date.setFullYear(date.getFullYear() + 1);
    return date;
  }
  useEffect(() => {
    getAllTransactionDetails();
  }, []);
  return (
    <main className="py-6 bg-surface-secondary">
      <div className="container-fluid">
        <div className="card rounded">
          <div className="d-flex card-header border-bottom">
            <h5 className="mb-0 font-bolder h3">Transaction History</h5>
            <div className="ms-auto text-end"></div>
          </div>
          <div className="card">
            <div className="col-xl-12">
              {/* <AllHealthcareProviders providerDatas={providerDatas} /> */}
              <div className="table-responsive">
                <table className="table table-hover table-nowrap ">
                  <thead className="table-light text-start">
                    <tr>
                      <th className="col-1">S.No</th>
                      <th className="col-2">Transaction Id</th>
                      <th className="col-2">Plan name</th>
                      <th className="col-2">Start Date</th>
                      <th className="col-2">End Date</th>
                      <th className="col-2">Amount</th>
                      <th className="col-2">Status</th>
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
                    ) : transactionDetails?.length ? (
                      transactionDetails?.map((item, index) => {
                        return (
                          <tr className="text-start">
                            <td>
                              <span className="text-heading">
                                {index+1}
                              </span>
                            </td>
                            <td>
                              <span className="text-heading">
                                {item?.responseJSON?.payment_intent}
                              </span>
                            </td>
                            <td>
                              <span className="text-heading">
                                {getPlanName(item?.planName)}
                              </span>
                            </td>
                            <td>
                              <span className="text-heading">
                                {moment(item?.createdAt).format("DD/MM/YYYY")}
                              </span>
                            </td>
                            <td>
                              <span className="text-heading">
                                {(moment(item?.createdAt).add(1, 'Y')).subtract(1,"d").format('DD/MM/YYYY')}
                              </span>
                            </td>
                            <td>
                              <span className=" font-bold">
                              <i class="bi bi-currency-euro"></i> {(item?.responseJSON?.amount_total /100)}
                              </span>
                            </td>
                            <td>
                              <span className=" text-white font-bold p-1 rounded-pill pe-2 ps-2 bg-success">
                                {item?.status == "complete" ? "Paid" : "Trial"}
                              </span>
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
        </div>
      </div>
    </main>
  );
};

export default TransactionHistory;
