import moment from "moment";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import toast from "react-hot-toast";
import {
  getCurrentPlanApi,
  getProductDetailApi,
  getTransctionApi,
} from "../../Apis";
import AuthContext from "../../Components/context/AuthProvider";
import PaymentModal from "./PaymentModal";
import ResourceModal from "./ResourceModal";
import { WhiteLoader } from "../../Components/common/Errors/loader/WhiteLoader";
import Loader from "../../Components/common/Errors/loader/Loader";
const SubscriptionPayment = () => {
  const appContext = useContext(AuthContext);
  const _id = appContext?.state?.loggedInOwner?._id;
  const [subscriptionDetails, setSubscriptionDetails] = useState();
  const [resourceView,setResourceView]=useState(false);
  const [productsDetail, setProuductsDetail] = useState();
  const [transactionDetails, setTransactionDetails] = useState([]);
  const [totalAmount, setTotalAmount] = useState();
  const getProductDetails = async () => {
    try {
      const res = await getProductDetailApi();
      if (res?.status === 200 || res?.status === 201) {
        setProuductsDetail(res?.data?.allPlans);
        setTotalAmount(
          parseInt(res?.data?.allPlans?.[0]?.planPriceId?.price) +
          parseInt(res?.data?.allPlans?.[1]?.planPriceId?.price)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getTotalAmount = (count) => {
    const amount =
      parseInt(productsDetail?.[1]?.planPriceId?.price) +
      parseInt(productsDetail?.[0]?.planPriceId?.price * count);
    setTotalAmount(amount);
  };
  const getCurrentPlanDetails = async (id) => {
    try {
      const res = await getCurrentPlanApi(id);
      if (res?.status === 200 || res?.status === 201) {
        setSubscriptionDetails(res?.data?.userSubscriptions);
        getTotalAmount(res?.data?.userSubscriptions?.noOfHealthCareProvider);
      }
    } catch (err) {
      toast.error(err);
    }
  };


  const getAllTransactionDetails = async () => {
    try {
      const res = await getTransctionApi();
      if (res?.status === 200 || res?.status === 201) {
        setTransactionDetails(res?.data?.allTransactions);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllTransactionDetails();
  }, []);

  useEffect(() => {
    if (_id !== null) {
      getCurrentPlanDetails(_id);
    }
  }, [_id]);
  useEffect(() => {
    getProductDetails();
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="card mt-6">
        {
                subscriptionDetails ? <div className="card-body">
                <div className="text-end m-0"></div>
                <div className="d-flex justify-content-between">
                  <div className="">
                    <div className="mb-4 font-bolder h3">Subscription</div>
                    {/* <h6 className="mb-2">Plan Name : <span className="sub-plan-name">Healthcare Provider</span></h6> */}
                    <h6 className="mb-2 base-plan-name" >
                      Base Plan =  1 Account Owner +
                      {/* {subscriptionDetails?.[0]?.noOfHealthCareProvider} Healthcare Provider */}
                       1 Healthcare Provider
                    </h6>
                    <h5 className="mb-2">
                      <span className="me-1"> Added Resources :</span>
                      {subscriptionDetails?.[0]?.noOfHealthCareProvider?parseInt(subscriptionDetails?.[0]?.noOfHealthCareProvider) - parseInt(1):"-" }
                    </h5>
                    <h5 className="mb-2">
                      <span className="me-1"> Subscription Status :</span>
                      {subscriptionDetails?.[0]?.subscriptionStatus == "complete" ? "Paid" : "Trial"}
                    </h5>
                    <p>
                      Start Date :{" "}
                      <span style={{ fontWeight: "600" }}>{moment(
                        subscriptionDetails?.[0]?.startDate?.split("T")[0]
                      ).format("DD/MM/YYYY")}</span>
                    </p>
                    <p className="mb-2">
                      End Date :{" "}
                      <span style={{ fontWeight: "600" }}>{moment(
                        subscriptionDetails?.[0]?.endDate?.split("T")[0]
                      ).format("DD/MM/YYYY")}</span>
                    </p>
                  </div>
                  <div className="d-flex align-items-end flex-column">
                    {console.log(subscriptionDetails?.[0],"subscriptionde")}
                    <p>
                    {subscriptionDetails?.[0]?.subscriptionStatus == "complete" ? <span style={{
                      fontSize:"2.5rem"
                    }} className="sub-active">Active</span>:<span style={{
                      fontSize:"2.5rem"
                    }} className="sub-active">Trial</span>}
                    </p>
                    <br />
                    <br />
                    <p
                      className="d-flex align-items-center "
                      style={{ color: "#5C60F5", fontWeight: "500" }}
                    >
                      <span style={{ fontSize: "1.1rem" }}>{Boolean(transactionDetails?.length) ? <i class="bi bi-currency-euro"></i> : isNaN(!totalAmount) ? <i class="bi bi-currency-euro"></i> : ""}</span>
                      <span style={{ fontSize: "2.2rem" }}>{Boolean(transactionDetails?.length) ? (transactionDetails[0]?.responseJSON?.amount_total / 100) : isNaN(!totalAmount) ? totalAmount : ""}</span>
                    </p>
                    <br />
                  </div>
                </div>
    
                <hr />
                <div className="d-flex justify-content-between align-items-end">
                  <div>
                <h6>Description</h6>
                  <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Reprehenderit, earum.
                </p></div>
                <div className="">
                  {subscriptionDetails?.[0]?.subscriptionStatus == "complete" ? (
                    <button disabled className="btn btn-success">
                      Subscribed
                    </button>
                  ) : (
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#modalExport"
                      className="btn btn-primary"
                      // onClick={()=>setResourceView(false)}
                    >
                      Subscribe Now
                    </button>
                  )}
                </div>
                </div>
              </div>: <div style={{display:"flex",justifyContent:"center",padding:"10px"}}> <Loader/></div>
              }
          
        </div>
        {
          subscriptionDetails?.[0]?.subscriptionStatus == "complete" && <div className="card mt-6">
            <div className="card-body">
              <div className="text-end m-0"></div>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6>Resources:</h6>
                  <p>Add more healthcare provider</p>
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    data-bs-toggle="modal"
                    // onClick={()=>setResourceView(true)}
                    data-bs-target="#modalResource"
                  >
                    Add Resource
                  </button>
                </div>
              </div>
            </div>
          </div>
        }

      </div>

      <div
        className="modal fade"
        id="modalExport"
        tabIndex={-1}
        aria-labelledby="modalExport"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md modal-dialog-centered">
          <div className="modal-content shadow-3">
            <div className="modal-header">
              <div className="h3 font-bolder">Plan Details:</div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <hr />
            <PaymentModal resourceView={resourceView} subscriptionDetails={subscriptionDetails} />
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="modalResource"
        tabIndex={-1}
        aria-labelledby="modalResource"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md modal-dialog-centered">
          <div className="modal-content shadow-3">
            <div className="modal-header">
              <div className="h3 font-bolder">Plan Details:</div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <hr />
            <ResourceModal resourceView={resourceView} subscriptionDetails={subscriptionDetails} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPayment;
