import React from "react";
import { useEffect, useState } from "react";
import { getProductDetailApi, paymentApi } from "../../Apis";
import { getStripeClient } from "./Stripe";
import moment from "moment/moment";
import { API_BASE_URL, SITE_URL } from "../../utils/baseUrl";
import { WhiteLoader } from "../../Components/common/Errors/loader/WhiteLoader";
const PaymentModal = ({ subscriptionDetails }) => {
  const [productsDetail, setProuductsDetail] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
  const [count, setCount] = useState(0);
  const [loader,setLoader]=useState(false);
  const getTotalAmount = (val) => {
    const amount =
      parseInt(productsDetail?.[1]?.planPriceId?.price) + ( val ?  
      parseInt(productsDetail?.[0]?.planPriceId?.price * val):parseInt(0));
    setTotalAmount(amount);
    return amount;
  };
  const getProductDetails = async () => {
    console.log("DAFDSDSFDSF")
    try {
      const res = await getProductDetailApi();
      if (res?.status === 200 || res?.status === 201) {
        setProuductsDetail(res?.data?.allPlans);
        setTotalAmount(
          parseInt(res?.data?.allPlans?.[1]?.planPriceId?.price)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCount = (e) => {
    setCount(e.target.value);
    getTotalAmount(parseInt(e.target.value));
  };

  const handlePayment = async () => {
    if(!totalAmount) return ;
    setLoader(true)
    if ( totalAmount) {
      try {

        const res = count > 0 ? await paymentApi({
          line_items: [
            { price: productsDetail?.[1]?.stripePriceId, quantity: 1 },
            {
              price: productsDetail?.[0]?.stripePriceId,
              quantity: parseInt(count),
            },
          ],
          cancel_url: `${SITE_URL}/Paymentfailed`,
          success_url: `${SITE_URL}/paymentSuccess`,
          // success_url: `${API_BASE_URL}/paymentSuccess`,
        }): await paymentApi({
          line_items: [
            { price: productsDetail?.[1]?.stripePriceId, quantity: 1 },
          ],
          cancel_url: `${SITE_URL}/Paymentfailed`,
          success_url: `${SITE_URL}/paymentSuccess`,
          // success_url: `${API_BASE_URL}/paymentSuccess`,
        });
        const stripe = await getStripeClient();
        console.log(res.data, "DD")
        stripe?.redirectToCheckout({ sessionId: res.data.session?.id });
        setLoader(false)
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <div className="modal-body pt-0">
      {/* Text */}
      <form>
        <div>
          <h5 className="sub-plan-name">{productsDetail?.[1]?.name}</h5>
          <p>{productsDetail?.[1]?.description}</p>
          <h5 className="base-plan-name mb-2">Your Base plan including 1 Healthcare Provider</h5>
          <h5>Number of Healthcare Provider : {parseInt(count) +parseInt(1)}</h5>
          <h5>Subscription Status : {subscriptionDetails?.[0]?.subscriptionStatus}</h5>
          <p>Start Date : <span style={{ fontWeight: "500" }}>{moment(subscriptionDetails?.[0]?.startDate?.split("T")[0]).format("DD/MM/YYYY")}</span></p>
          <p>End Date : <span style={{ fontWeight: "500" }}>{moment(subscriptionDetails?.[0]?.endDate?.split("T")[0]).format("DD/MM/YYYY")}</span></p>
          <p>Price : <span style={{ fontWeight: "700" }}>{productsDetail?.[1]?.planPriceId?.price}</span> </p>
        </div>
        <div className="col-md-9 mt-4">
          <label className="" htmlFor="health">
            Add more Healthcare Providers (Price: <span style={{ fontWeight: "700" }}> {productsDetail?.[0]?.planPriceId?.price}</span> )
          </label>
          <input
            type="number"
            min="0"
            onKeyDown={(e) => e.preventDefault()}
            value={count}
            onChange={handleCount}
            className="form-control"
            name="health"
            id=""
          />
        </div>

        <div className="mt-5">
          <h5 style={{ color: "#525F7F" }}>Total amount : <span style={{ fontWeight: "700" }}>{" " + totalAmount}<i class="bi bi-currency-euro"></i></span> </h5>
        </div>
        <div className="d-flex justify-content-end mt-5">
          <button
            type="button"
            onClick={handlePayment}
            className="btn btn-primary btn-sm"
            disabled={loader}
          >
           {loader ? <WhiteLoader/>:"Proceed to Pay"} 
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentModal;
