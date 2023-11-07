import React from 'react'
import { Link } from 'react-router-dom';
const PaymentSuccess = () => {
    return (
        <>

            <div className="row">
                <div className="col-md-9 col-lg-7 col-xl-6 py-20 mx-auto">
                    <div className="card">
                        <div className="card-body p-10">
                            <div className="text-center mb-12">
                                <h1><i class="bi bi-check2-square" style={{ color: "darkgreen" }}></i></h1>
                                <h1 className="ls-tight font-bolder mt-6" style={{ color: "seagreen" }}>
                                    Payment successful
                                </h1>
                                <br />
                                <br />
                                <div className="text-start text-center">
                                    <p>Click <Link  to="/transactionHistory" style={{ color: "#0967ae", fontWeight: "700" }}>here</Link> for more information . </p>
                                    <br />
                                    <hr />
                                    <br />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentSuccess;
