import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordApi } from "../../../Apis";
import { useState } from "react";
import { toast } from "react-hot-toast";
const Forgotpassword = () => {

    const [email,setEmail]=useState();
    const navigate = useNavigate();
    const handlePassword=async()=>{
        if(email){
            const res = await forgotPasswordApi({email});
            if(res.status === 200 || res.status === 201){
                toast.success(res.data.message , {id:"001"});
                setTimeout(()=>{

                    navigate("/login")
                },2000)
            }
        }
    }

    return (
        <>
            <div>
                <div className="px-5 py-5 p-lg-0 h-screen bg-surface-secondary d-flex flex-column justify-content-center">
                    <div className="d-flex justify-content-center">
                        <div className="col-lg-5 col-xl-4 p-12 p-xl-20 position-fixed start-0 top-0 h-screen overflow-y-hidden bg-primary d-none d-lg-flex flex-column">
                            <a className="d-block" href="#">
                                <img
                                    src="/OwnerKit/img/logos/Logo-White.png"
                                    className="h-24"
                                    alt="..."
                                />
                            </a>

                            <div className="mt-32 mb-20">
                                <h1 className="ls-tight font-bolder display-6 text-white mb-5">
                                    Welcome to Healthcare Provider panel
                                </h1>
                                <p className="text-white text-opacity-80">
                                    Medicine cure diseases but only doctors can cure patients
                                </p>
                            </div>

                            <div className="w-56 h-56 bg-blue-100 rounded-circle position-absolute bottom-0 end-20 transform translate-y-1/3"></div>
                        </div>

                        <div className="col-12 col-md-9 col-lg-7 offset-lg-5 border-left-lg min-h-screen d-flex flex-column justify-content-center position-relative">
                            <div className="py-lg-16 px-lg-20">
                                <form>
                                    <div className="row">
                                        <div className="col-lg-10 col-md-10 col-xl-7 mx-auto ms-xl-0">
                                            <div className="mt-10 mt-lg-5 mb-6 d-lg-block text-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-person-lock login-icon" viewBox="0 0 16 16">
                                                    <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 5.996V14H3s-1 0-1-1 1-4 6-4c.564 0 1.077.038 1.544.107a4.524 4.524 0 0 0-.803.918A10.46 10.46 0 0 0 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h5ZM9 13a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2Zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1Z" />
                                                </svg>

                                                <h1 className="ls-tight font-bolder h2 mt-5">
                                                    Forgot Password
                                                </h1>

                                            </div>
                                            <form>
                                                <label className="form-label mb-0" htmlFor="email">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name=""
                                                    value={email}
                                                    onChange={(e)=>setEmail(e.target.value)}
                                                    id="email"
                                                    placeholder="Enter your email id"
                                                    className="form-control mb-3"
                                                />
                                                <button onClick={handlePassword} className="btn btn-primary w-full mt-5" type="button">
                                                    Send
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </form>
                                <div className="mt-5">
                                
                                <small>Back to</small> <Link to="/login" className="text-warning text-sm font-semibold">Login
                                </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >

        </>
    );
};

export default Forgotpassword;
