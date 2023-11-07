import React from 'react'
import { Link } from 'react-router-dom'

export default function
    () {
    return (
        <div className="row">
            <div className="col-md-9 col-lg-7 col-xl-6 py-20 mx-auto">
                <div className="card">
                    <div className="card-body p-10">
                        <div className="text-center mb-12">
                            <h1><i class="bi bi-dash-circle-fill" style={{ color: "#dd595e" }}></i></h1>
                            <h1 className="ls-tight font-bolder mt-6" style={{ color: "#dd595e" }}>
                                Payment failed
                            </h1>
                            <p className='text-center'>
                                Unfortunately payment was rejected.</p>
                            <br />
                            <div className='text-center'>
                                <Link to="/subscriptionPayment" className="btn btn-sm btn-primary rounded-pill">TRY AGAIN</Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
