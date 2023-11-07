import React from "react";
import DatePicker from "react-date-picker";
import { Link } from "react-router-dom";
import { setLocale } from "yup";

const Consultation = () => {
  return (
    <main className="py-6 bg-surface-secondary">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header d-flex align-items-center">
                <h4 className="mb-0">Consultation</h4>
                <span className="btn btn-sm btn-neutral ms-auto">
                  Patient : #12345
                </span>
              </div>
              <hr className="dropdown-divider" />
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-3 col-md-6">
                    <label className="form-label">Symptom</label>
                    <select
                      className="form-select form-select-lg mb-3"
                      aria-label=".form-select-lg example"
                    >
                      <option selected>Select Symptom </option>
                      <option value="1">Neck pain</option>
                      <option value="2">Headaches</option>
                      <option value="3">Migraine</option>
                    </select>
                  </div>
                  <div className="col-lg-3 col-md-6 d-flex justify-content-around align-items-center">
                    <div>
                      <label className="form-label">Lt</label>
                      <div>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="SI"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="form-label">Rt</label>
                      <div>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="SI"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="form-label">Bit</label>
                      <div>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="SI"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6">
                    <label className="form-label">Radiates To</label>
                    <select
                      className="form-select form-select-lg mb-3"
                      aria-label=".form-select-lg example"
                    >
                      <option selected>Select Radiates To </option>
                      <option value="1">Head</option>
                      <option value="2">Shoulder</option>
                      <option value="3">Upper arm</option>
                      <option value="3">Lower arm</option>
                    </select>
                  </div>

                  <div className="col-lg-3 col-md-6">
                    <label className="form-label">Describe Symptoms</label>
                    <select
                      className="form-select form-select-lg mb-3"
                      aria-label=".form-select-lg example"
                    >
                      <option selected>Select Describe Symptoms </option>
                      <option value="1">An ache</option>
                      <option value="2">Sharp</option>
                      <option value="3">Dull</option>
                      <option value="3">Shooting</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-3 col-md-6 mb-4">
                    <label className="form-label">Began</label>
                    <select className="form-select">
                      <option>Select Began</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                  </div>
                  <div className="col-lg-3 col-md-6 mb-4">
                    <label className="form-label">Ago</label>
                    <select className="form-select">
                      <option>Select Ago</option>
                      <option>Days</option>
                      <option>Weeks</option>
                      <option>Month</option>
                      <option>Year</option>
                    </select>
                  </div>
                  <div className="col-lg-3 col-md-6 mb-4">
                    <label className="form-label">Frequency</label>
                    <select className="form-select">
                      <option>Select Frequency</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                  </div>
                  <div className="col-lg-3 col-md-6 mb-4">
                    <label className="form-label">Onset</label>
                    <select className="form-select">
                      <option>Select onset</option>
                      <option>Accident</option>
                      <option>Weeks</option>
                      <option>Month</option>
                      <option>Year</option>
                    </select>
                  </div>
                  <div className="col-12 col-sm-12 mb-4">
                    <label className="form-label">Describe of injury</label>
                    <textarea
                      className="form-control"
                      placeholder=""
                      rows="6"
                      style={{ resize: "none" }}
                    ></textarea>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-4">
                    <label className="form-label">Palliative</label>
                    <select className="form-select">
                      <option>Select Palliative</option>
                      <option>Walking</option>
                      <option>Working</option>
                      <option>Running</option>
                      <option>Sports</option>
                    </select>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-4 dropdown">
                    <label className="form-label">Provocative</label>
                    <select className="form-select">
                      <option>Select Provocative</option>
                      <option>Walking</option>
                      <option>Working</option>
                      <option>Running</option>
                      <option>Sports</option>
                    </select>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-4">
                    <label className="form-label">Warnings </label>

                    <select className="form-select">
                      <option>Select Warnings</option>
                      <option>No Cervical Manual</option>
                      <option>Osteoporosis</option>
                      <option>Disc Herniation</option>
                      <option>Scoliosis</option>
                    </select>
                  </div>
                  <div className="col-12 col-sm-12 mb-4">
                    <label className="form-label">Additional Note</label>
                    <textarea
                      className="form-control"
                      placeholder=""
                      rows="6"
                      style={{ resize: "none" }}
                    ></textarea>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <label className="form-label">Other Therapist </label>
                    <select className="form-select">
                      <option>Select Other Therapist</option>
                      <option>Family Doctor</option>
                      <option>Orthopedist</option>
                      <option>Osteopath</option>
                      <option>Chiropractor</option>
                    </select>
                  </div>
                  <div className="col-lg-4 col-md-6 ">
                    <label className="form-label">Did it help?</label>
                    <select className="form-select">
                      <option>Select Feedback</option>
                      <option>Yes</option>
                      <option>No</option>
                      <option>A little</option>
                      <option>A lot</option>
                    </select>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <label className="form-label">Add link for reports</label>
                    <input type="text" className="form-control" placeholder="" />
                  </div>

                  <div className="col-12">
                    <label className="form-label mt-5">
                      Patients treatment goal
                    </label>
                    <textarea
                      className="form-control"
                      placeholder=""
                      rows="6"
                      style={{ resize: "none" }}
                    ></textarea>
                  </div>
                </div>
                <div>
                  {/* <div className="row">
                                    <div className="col-6 col-sm-3 mb-4">
                                        <label className="form-label">Began</label>
                                        <span className="d-flex " >
                                        
                                           <select className="form-control me-2">
                                                
                                               <option>DD</option>
                                               <option>1</option>
                                               <option>2</option>
                                               <option>3</option>
                                           </select>
                                          
                                           <select className="form-control me-2">
                                               <option>MM</option>
                                               <option>1</option>
                                               <option>2</option>
                                               <option>3</option>
                                           </select>
                                          
                                           <select className="form-control">
                                               <option>YYYY</option>
                                               <option>1</option>
                                               <option>2</option>
                                               <option>3</option>
                                           </select>
                                          
                                           
                                       </span>
                                    </div>
                                    <div className="col-6 col-sm-3 mb-4 ">
                                        <label className="form-label">Ago</label>
                                        <span className="d-flex " >
                                        
                                        <select className="form-control me-2">
                                             
                                            <option>DD</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                        </select>
                                       
                                        <select className="form-control me-2">
                                            <option>MM</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                        </select>
                                       
                                        <select className="form-control">
                                            <option>YYYY</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                        </select>
                                       
                                        
                                    </span>
                                    </div>
                                    <div className="col-6 col-sm-3 mb-4">
                                        <label className="form-label">Frequency</label>
                                        <select className="form-select">
                                            <option></option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                        </select>
                                    </div>
                                    <div className="col-6 col-sm-3 mb-4">
                                        <label className="form-label">On set</label>
                                        <select className="form-select">
                                            <option></option>
                                            <option>Accident</option>
                                            <option>Weeks</option>
                                            <option>Month</option>
                                            <option>Year</option>
                                        </select>
                                    </div>
                                    <div className="col-12 col-sm-12 mb-4">
                                        <label className="form-label">Describe of injury</label>
                                        <textarea
                                            className="form-control"
                                            placeholder=""
                                            rows="6"
                                        ></textarea>
                                    </div>
                                    <div className="col-12 col-sm-4 mb-4 dropdown">
                                        <label className="form-label">Palliative</label>
                                        <div
                                            className="btn dropdown-toggle form-select "
                                            style={{ border: "2px solid #F4F4F5" }}
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        ></div>
                                        <ul
                                            className="dropdown-menu dropdown-menu-none w-100 py-5 overflow-auto"
                                            style={{ width: "95%", height: "250px" }}
                                        >
                                            <li>
                                                <input
                                                    className="mx-5 my-3 border border-bottom "
                                                    type="checkbox"
                                                />
                                                Walking{" "}
                                            </li>
                                            <li>
                                                <input
                                                    className="mx-5 my-3 border border-bottom "
                                                    type="checkbox"
                                                />
                                                Working{" "}
                                            </li>
                                            <li>
                                                <input
                                                    className="mx-5 my-3 border border-bottom "
                                                    type="checkbox"
                                                />
                                                Running{" "}
                                            </li>
                                            <li>
                                                <input
                                                    className="mx-5 my-3 border border-bottom "
                                                    type="checkbox"
                                                />
                                                Sports{" "}
                                            </li>
                                            <li>
                                                <input
                                                    className="mx-5 my-3 border border-bottom "
                                                    type="checkbox"
                                                />
                                                Lifting{" "}
                                            </li>
                                            <li>
                                                <input
                                                    className="mx-5 my-3 border border-bottom "
                                                    type="checkbox"
                                                />
                                                Sitting{" "}
                                            </li>
                                            <li>
                                                <input
                                                    className="mx-5 my-3 border border-bottom "
                                                    type="checkbox"
                                                />
                                                Lying down{" "}
                                            </li>
                                            <li>
                                                <input
                                                    className="mx-5 my-3 border border-bottom "
                                                    type="checkbox"
                                                />
                                                Rest{" "}
                                            </li>

                                            <li>
                                                <i className="ms-5 h4 bi bi-plus-circle-fill"></i>
                                                <input
                                                    className="mx-5 my-3 form-label border w-75"
                                                    style={{ width: "75%" }}
                                                />
                                                <br />
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-12 col-sm-4 mb-4 dropdown">
                                        <label className="form-label">Provocative</label>
                                        <div
                                            className="btn dropdown-toggle form-select "
                                            style={{ border: "2px solid #F4F4F5" }}
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        ></div>
                                        <ul
                                            className="dropdown-menu dropdown-menu-none w-100 py-5 overflow-auto"
                                            style={{ width: "95%", height: "250px" }}
                                        >
                                            <li>
                                                <input
                                                    className="mx-5 my-3 border border-bottom "
                                                    type="checkbox"
                                                />
                                                Walking{" "}
                                            </li>
                                            <li>
                                                <input
                                                    className="mx-5 my-3 border border-bottom "
                                                    type="checkbox"
                                                />
                                                Working{" "}
                                            </li>
                                            <li>
                                                <input
                                                    className="mx-5 my-3 border border-bottom "
                                                    type="checkbox"
                                                />
                                                Running{" "}
                                            </li>
                                            <li>
                                                <input
                                                    className="mx-5 my-3 border border-bottom "
                                                    type="checkbox"
                                                />
                                                Sports{" "}
                                            </li>
                                            <li>
                                                <input
                                                    className="mx-5 my-3 border border-bottom "
                                                    type="checkbox"
                                                />
                                                Lifting{" "}
                                            </li>
                                            <li>
                                                <input
                                                    className="mx-5 my-3 border border-bottom "
                                                    type="checkbox"
                                                />
                                                Sitting{" "}
                                            </li>
                                            <li>
                                                <input
                                                    className="mx-5 my-3 border border-bottom "
                                                    type="checkbox"
                                                />
                                                Lying down{" "}
                                            </li>
                                            <li>
                                                <input
                                                    className="mx-5 my-3 border border-bottom "
                                                    type="checkbox"
                                                />
                                                Rest{" "}
                                            </li>
                                            <li>
                                                <i className="ms-5 h4 bi bi-plus-circle-fill"></i>
                                                <input
                                                    className="mx-5 my-3 form-label border w-75"
                                                    style={{ width: "75%" }}
                                                />
                                                <br />
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-12 col-sm-4 mb-4 dropdown">
                                        <label className="form-label">Warnings </label>
                                        <div
                                            className="btn dropdown-toggle form-select "
                                            style={{ border: "2px solid #F4F4F5" }}
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        ></div>
                                        <ul
                                            className="dropdown-menu dropdown-menu-none w-100 py-5 overflow-auto"
                                            style={{ width: "95%", height: "250px" }}
                                        >
                                            <li>
                                                <input
                                                    className="mx-5 my-3 border border-bottom "
                                                    type="checkbox"
                                                />
                                                No Cervical Manual!{" "}
                                            </li>
                                            <li>
                                                <input
                                                    className="mx-5 my-3 border border-bottom "
                                                    type="checkbox"
                                                />
                                                Osteoporosis{" "}
                                            </li>
                                            <li>
                                                <input
                                                    className="mx-5 my-3 border border-bottom "
                                                    type="checkbox"
                                                />
                                                Disc Herniation{" "}
                                            </li>
                                            <li>
                                                <input
                                                    className="mx-5 my-3 border border-bottom "
                                                    type="checkbox"
                                                />
                                                Scoliosis{" "}
                                            </li>
                                            <li>
                                                <i className="ms-5 h4 bi bi-plus-circle-fill"></i>
                                                <input
                                                    className="mx-5 my-3 form-label border w-75"
                                                    style={{ width: "75%" }}
                                                />
                                                <br />
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-12 col-sm-12 mb-4">
                                        <label className="form-label">Additional Note</label>
                                        <textarea
                                            className="form-control"
                                            placeholder=""
                                            rows="6"
                                        ></textarea>
                                    </div>
                                    <div className="col-12 col-sm-6 dropdown">
                                        <label className="form-label">Other Therapist </label>
                                        <div
                                            className="btn dropdown-toggle form-select "
                                            style={{ border: "2px solid #F4F4F5" }}
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        ></div>
                                        <ul
                                            className="dropdown-menu dropdown-menu-none w-100 py-5 overflow-auto"
                                            style={{ width: "95%", height: "250px" }}
                                        >
                                            <li>
                                                <input
                                                    className="mx-5 my-3 border border-bottom "
                                                    type="checkbox"
                                                />
                                                Family Doctor
                                            </li>
                                            <li>
                                                <input
                                                    className="mx-5 my-3 border border-bottom "
                                                    type="checkbox"
                                                />
                                                Orthopedist{" "}
                                            </li>
                                            <li>
                                                <input
                                                    className="mx-5 my-3 border border-bottom "
                                                    type="checkbox"
                                                />
                                                Osteopath
                                            </li>
                                            <li>
                                                <input
                                                    className="mx-5 my-3 border border-bottom "
                                                    type="checkbox"
                                                />
                                                Chiropractor{" "}
                                            </li>
                                            <li>
                                                <input
                                                    className="mx-5 my-3 border border-bottom "
                                                    type="checkbox"
                                                />
                                                Heiplraktiker{" "}
                                            </li>
                                            <li>
                                                <input
                                                    className="mx-5 my-3 border border-bottom "
                                                    type="checkbox"
                                                />
                                                Physiotherapeut{" "}
                                            </li>
                                            <li>
                                                <input
                                                    className="mx-5 my-3 border border-bottom "
                                                    type="checkbox"
                                                />
                                                Massage Therapeut{" "}
                                            </li>
                                            <li>
                                                <input
                                                    className="mx-5 my-3 border border-bottom "
                                                    type="checkbox"
                                                />
                                                Psychologe{" "}
                                            </li>
                                            <li>
                                                <i className="ms-5 h4 bi bi-plus-circle-fill"></i>
                                                <input
                                                    className="mx-5 my-3 form-label border w-75"
                                                    style={{ width: "75%" }}
                                                />
                                                <br />
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <label className="form-label">Did it help?</label>
                                        <select className="form-select">
                                            <option></option>
                                            <option>Yes</option>
                                            <option>No</option>
                                            <option>A little</option>
                                            <option>A lot</option>
                                        </select>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <label className="form-label">Add link for reports</label>
                                        <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <label className="form-label">Patients treatment goal</label>
                                        <input type="text" className="form-control" placeholder="" />
                                    </div>
                                </div> */}
                </div>
                <div className="row mt-5">
                  <div className="col-md-4 mt-2">
                    <div className="col-auto ">
                      <a
                        href="#addsymptoms"
                        className=""
                        data-bs-toggle="modal"
                      >
                        <button type="button" className="btn btn-sm btn-primary">
                          <span>
                            {" "}
                            <i className="bi bi-plus-lg"></i>
                          </span>
                          <span className="d-sm-inline ms-2">Add Symptoms</span>
                        </button>
                      </a>
                    </div>
                  </div>
                  <div className="col-md-8 mt-2 hstack gap-2 justify-content-end">
                    <div className="col-auto ">
                      <button type="button" className="btn btn-sm btn-secondary">
                        <span className="d-sm-inline ms-2">Clear</span>
                      </button>
                    </div>
                    <div className="col-auto ">
                      <button type="button" className="btn btn-sm btn-primary">
                        <span className=" d-sm-inline">
                          <i className="bi bi-save me-2"></i>Save
                        </span>
                      </button>
                    </div>
                    <div className="col-auto ">
                      <a href="/examination" className="btn btn-sm btn-primary">
                        <span className=" d-sm-inline ms-2">Start Examination</span>
                      </a>
                    </div>
                  </div>
                </div>
                {/* Modal */}
                <div
                  className="modal fade"
                  id="addsymptoms"
                  tabIndex={-1}
                  aria-labelledby="addsymptoms"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-sm modal-dialog-centered">
                    <div className="modal-content shadow-3">
                      <div className="modal-header">
                        <div className="h5 text-start">Add Symptoms</div>

                        <button
                          style={{ fontSize: "10px;" }}
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        />
                      </div>
                      <hr />
                      <div
                        className="modal-body"
                        style={{ paddingTop: "10px" }}
                      >
                        {/* Text */}
                        <form>
                          <div className="mb-4">
                            <div className="row">
                              <div className="col-12 col-sm-12 mb-2">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="symptoms"
                                  placeholder="Symptom"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="d-flex justify-content-between">
                            <a href="#" className="btn btn-sm btn-secondary">
                              {" "}
                              cancel{" "}
                            </a>
                            <a href="#" className="btn btn-sm btn-primary">
                              {" "}
                              <i className="bi bi-save"></i> Add{" "}
                            </a>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Consultation;
