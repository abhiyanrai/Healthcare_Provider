import { reach } from "react";
import RightLower from "../../Assets/img/RightLower.jpg"

import "../Examination/Examination.css"

const Visit_view = () => {

    return (
        <>
            <div className="row  m-5 d-flex flex-row">
                <div className="col-md-6 mx-2 card">
                    <h1 className="h6 my-3">STANDINGS CREST / SI&#38;PRONE CREST</h1>
                    <div className="d-flex flex-row justify-content-between my-4 border rounded-3">
                        <div className="d-flex align-items-center">
                            <h5 className="card-title text-danger">BMC:</h5>
                            <h5 className="card-title">LEFT&LOw</h5>
                        </div>
                        <div className="d-flex justify-content-end align-content-end">
                            <img className="h-25 m-1" src={RightLower} alt="img" style={{ maxWidth: "12%", Height: "auto" }} />
                        </div>
                    </div>

                    <div className=" my-3 d-flex flex-row justify-content-between">
                        <div className="">
                            <table className="table card border">
                                <thead style={{ backgroundColor: "#95b4c9" }} className="rounded-1">
                                    <tr className="">
                                        <th scope="col">#</th>
                                        <th scope="col ">Left</th>
                                        <th scope="col">Right</th>
                                        <th scope="col">Blat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Fixed SI</th>
                                        <td className="">
                                            <input className="form-check-input mt-0" type="checkbox" value="" />
                                        </td>
                                        <td className="">
                                            <input className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" />
                                        </td>
                                        <td className="">
                                            <input className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Free</th>
                                        <td className="">
                                            <input className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" />
                                        </td>
                                        <td className="">
                                            <input className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" />
                                        </td>
                                        <td className="">
                                            <input className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" />
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        <div className="">
                        <table className="table card border">
                                <thead style={{ backgroundColor: "#95b4c9" }} className="rounded-1">
                                    <tr className="">
                                        <th scope="col">Adam's</th>
                                        <th scope="col ">Left</th>
                                        <th scope="col">Right</th>
                                        <th scope="col">Neg</th>
                                        <th scope="col">Deg</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Lumb</th>
                                        <td className="">
                                            <input className="form-check-input mt-0" type="checkbox" value="" />
                                        </td>
                                        <td className="">
                                            <input className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" />
                                        </td>
                                        <td className="">
                                            <input className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" />
                                        </td>
                                        <td className="">
                                            <input className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Thor</th>
                                        <td className="">
                                            <input className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" />
                                        </td>
                                        <td className="">
                                            <input className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" />
                                        </td>
                                        <td className="">
                                            <input className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" />
                                        </td>
                                        <td className="">
                                            <input className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" />
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-md-5 card">
                    <h1 className="h6">STANDINGS CREST / SI&#38;PRONE CREST</h1>
                </div>
            </div>
        </>
    )
}

export default Visit_view;