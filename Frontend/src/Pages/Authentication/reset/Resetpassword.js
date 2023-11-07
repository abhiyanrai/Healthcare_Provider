

const Resetpassword = () => {

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
                                                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-lock login-icon" viewBox="0 0 16 16">
                                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                                                </svg>
                                                <h1 className="ls-tight font-bolder h2 mt-5">
                                                    Reset Password
                                                </h1>

                                            </div>
                                            <form>
                                                <label className="form-label mb-0" htmlFor="pass">
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    name=""
                                                    id="pass"
                                                    placeholder="Enter your email id"
                                                    className="form-control"
                                                />
                                                <label className="form-label mt-5" htmlFor="pass">
                                                    Confirm Password
                                                </label>
                                                <input
                                                    type="password"
                                                    name=""
                                                    id="pass"
                                                    placeholder="Enter your email id"
                                                    className="form-control mb-3"
                                                />
                                                <button className="btn btn-primary w-full mt-5" type="submit">
                                                    Reset password
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div >
            </div >

        </>
    );
};

export default Resetpassword;
