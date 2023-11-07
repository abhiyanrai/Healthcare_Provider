import React from "react";
import "./view.css";

const View = () => {
  return (
    <>
      <section>
        <div className="container-fluid mt-5 mb-5">
          <div className="div-bg">
            <div className="row table-responsive">
              <div className="col-12" style={{ display: "grid" }}>
                <table className="table">
                  <tbody>
                    <tr className="bg-colorfill">
                      <td>
                        <input
                          className="form-control control2"
                          type="date"
                          name=""
                          id="datepicker"
                        />
                        <p className="text-center">Date of 1st exam</p>
                      </td>
                      <td className="px-2">
                        <input type="checkbox" id="mr" name="" value="" />
                        <label className="mr-ms" for="mr">
                          &nbsp; Mr.
                        </label>{" "}
                        &nbsp;
                        <input type="checkbox" id="ms." name="" value="" />
                        <label className="mr-ms" for="ms.">
                          &nbsp; Ms.
                        </label>
                      </td>
                      <td className="p-0">
                        <input
                          className="form-control control2"
                          style={{ width: "100%" }}
                          type="name"
                          name=""
                        />
                        <p className="text-center">First Name </p>
                      </td>
                      <td className="px-1">
                        <input
                          className="form-control control2"
                          style={{ width: "100%" }}
                          type="name"
                          name=""
                        />
                        <p className="text-center">Last Name </p>
                      </td>
                      <td>
                        <input
                          className="form-control control2"
                          style={{ width: "100%" }}
                          type="date"
                          name=""
                        />
                        <p className="text-center">D.O.B</p>
                      </td>
                      <td>
                        <input
                          className="form-control control2"
                          style={{ width: "100%" }}
                          type="text"
                          name=""
                        />
                        <p className="text-center">File#</p>
                      </td>

                      <td>
                        <img
                          style={{
                            borderRadius: "4px",
                            height: "30px",
                            width: "30px",
                          }}
                          src="../../../OwnerKit/img/logos/australia-flag.jpg"
                        />{" "}
                        &nbsp;
                        <input type="checkbox" id="" name="" value="" checked />
                        <p className="mb-4"></p>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table className="table">
                  <tbody>
                    <tr className="bg-colorfill">
                      <td>
                        <input
                          className="form-control control2 second-table"
                          style={{ width: "100%" }}
                          type="text"
                          name=""
                        />
                        <p className="text-center">Street Address</p>
                      </td>
                      <td>
                        <input
                          className="form-control control2 second-table"
                          style={{ width: "100%" }}
                          type="number"
                          name=""
                        />
                        <p className="text-center">Zip code</p>
                      </td>
                      <td>
                        <input
                          className="form-control control2 second-table"
                          style={{ width: "100%" }}
                          type="text"
                          name=""
                        />
                        <p className="text-center">City</p>
                      </td>
                      <td>
                        <input
                          className="form-control control2 second-table"
                          style={{ width: "100%" }}
                          type="email"
                          name=""
                        />
                        <p className="text-center">e-Mail</p>
                      </td>
                      <td>
                        <input
                          className="form-control control2 second-table"
                          style={{ width: "100%" }}
                          type="number"
                          name=""
                        />
                        <p className="text-center">Mobile Number</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <h5 className="primary-symptom">
                  Primary Symptom Questionnaire
                </h5>

                <table className="table table-bordered">
                  <tbody>
                    <tr className="lt-rt-blt">
                      <td colspan="2" align="center">
                        <h6>Symptoms</h6>
                      </td>
                      <td>
                        <h6>Lt</h6>
                      </td>
                      <td>
                        <h6>Rt</h6>
                      </td>
                      <td>
                        <h6>Blt</h6>
                      </td>
                      <td>
                        <h6>Radiates to:</h6>
                      </td>
                      <td>
                        <h6>Describe Symptoms</h6>
                      </td>
                      <td>
                        <h6>Began</h6>
                      </td>
                      <td>
                        <h6>ago</h6>
                      </td>
                      <td>
                        <h6>Freq x/pro</h6>
                      </td>
                      <td>
                        <h6>Y,M,W,D </h6>
                      </td>
                    </tr>

                    <tr className="prim-sy-tr">
                      <td>1</td>
                      <td>Neck pain / HWS </td>
                      <td>
                        <input type="checkbox" name="" checked />
                      </td>
                      <td>
                        <input type="checkbox" name="" checked />
                      </td>
                      <td>
                        <input type="checkbox" name="" checked />
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>

                    <tr className="prim-sy-tr">
                      <td>2</td>
                      <td>Sciatica / Ischiasschmerzen </td>
                      <td>
                        <input type="checkbox" name="" />
                      </td>
                      <td>
                        <input type="checkbox" name="" />
                      </td>
                      <td>
                        <input type="checkbox" name="" />
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>Year</td>
                      <td></td>
                      <td></td>
                    </tr>

                    <tr className="prim-sy-tr">
                      <td>3</td>
                      <td></td>
                      <td>
                        <input type="checkbox" name="" />
                      </td>
                      <td>
                        <input type="checkbox" name="" />
                      </td>
                      <td>
                        <input type="checkbox" name="" />
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>

                    <tr className="prim-sy-tr">
                      <td>4</td>
                      <td>Headaches / Kopfschmerzen</td>
                      <td>
                        <input type="checkbox" name=""></input>
                      </td>
                      <td>
                        <input type="checkbox" name="" checked />
                      </td>
                      <td>
                        <input type="checkbox" name="" checked />
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>

                    <tr className="prim-sy-tr">
                      <td>5</td>
                      <td></td>
                      <td>
                        <input type="checkbox" name=""></input>
                      </td>
                      <td>
                        <input type="checkbox" name="" />
                      </td>
                      <td>
                        <input type="checkbox" name="" />
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>

                    <tr className="prim-sy-tr">
                      <td>Other:</td>
                      <td></td>
                      <td>
                        <input type="checkbox" name=""></input>
                      </td>
                      <td>
                        <input type="checkbox" name="" />
                      </td>
                      <td>
                        <input type="checkbox" name="" />
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>

                <table className="table table-bordered">
                  <tbody>
                    <tr className="lt-rt-blt blue-30" align="center">
                      <td colspan="2" align="center">
                        <h6>Symptoms</h6>
                      </td>
                      <td>
                        <h6>Onset</h6>
                      </td>
                      <td>
                        <h6>Description of Injury or Accident</h6>
                      </td>
                      <td>
                        <h6>Palliative</h6>
                      </td>
                      <td>
                        <h6>Provocative</h6>
                      </td>
                      <td className="warning">
                        <h6>Warnings</h6>
                      </td>
                    </tr>

                    <tr className="prim-sy-tr">
                      <td>1</td>
                      <td>Neck pain / HWS</td>
                      <td>Accident</td>
                      <td></td>
                      <td>sports</td>
                      <td>running</td>
                      <td>Osteoporosis</td>
                    </tr>

                    <tr className="prim-sy-tr">
                      <td>2</td>
                      <td>Sciatica / Ischiasschmerzen</td>
                      <td>Accident</td>
                      <td></td>
                      <td>sports</td>
                      <td>running</td>
                      <td>Patient has cancer</td>
                    </tr>

                    <tr className="prim-sy-tr">
                      <td>3</td>
                      <td></td>
                      <td>Injury</td>
                      <td></td>
                      <td>running</td>
                      <td>running</td>
                      <td>Disc Herniation - Use Disc Protocols</td>
                    </tr>

                    <tr className="prim-sy-tr">
                      <td>4</td>
                      <td>Headaches / Kopfschmerzen</td>
                      <td>Insidious</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>

                    <tr className="prim-sy-tr">
                      <td>5</td>
                      <td></td>
                      <td>Injury</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>

                    <tr className="prim-sy-tr">
                      <td>Other:</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>

                <h5 className="additional-note">
                  Additional Notes: other treatments, doctors, results, relevant
                  information
                </h5>
                <table className="table table-bordered">
                  <tbody>
                    <tr className="lt-rt-blt blue-30" align="center">
                      <td colspan="2" align="center">
                        <h6>Symptoms</h6>
                      </td>
                      <td>
                        <h6>Other Therapist/ Ärzte? </h6>
                      </td>
                      <td>
                        <h6>Did it help? </h6>
                      </td>
                      <td colspan="3" align="center">
                        <h6 style={{ fontSize: "12px" }}>
                          Use the space below to relate radiological finding or
                          other reports. Add links to uploaded reports.{" "}
                        </h6>
                      </td>
                    </tr>

                    <tr className="prim-sy-tr">
                      <td>1</td>
                      <td>Neck pain / HWS</td>
                      <td>Orthopedist </td>
                      <td>A little</td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>

                    <tr className="prim-sy-tr">
                      <td>2</td>
                      <td>Sciatica / Ischiasschmerzen </td>
                      <td>Heiplraktiker</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>

                    <tr className="prim-sy-tr">
                      <td>3</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>

                    <tr className="prim-sy-tr">
                      <td>4</td>
                      <td>Headaches / Kopfschmerzen</td>
                      <td>Osteopath</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>

                    <tr className="prim-sy-tr">
                      <td>5</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>

                    <tr className="prim-sy-tr">
                      <td>Other:</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>

                <table className="table table-bordered">
                  <tbody>
                    <tr className="lt-rt-blt blue-30" align="center">
                      <td colspan="2" align="center" style={{ width: "25%" }}>
                        <h6>Symptoms</h6>
                      </td>
                      <td align="center">
                        <h6>Patient Treatment Goals </h6>
                      </td>
                    </tr>

                    <tr className="prim-sy-tr">
                      <td>1</td>
                      <td>Neck pain / HWS </td>
                      <td></td>
                    </tr>

                    <tr className="prim-sy-tr">
                      <td>2</td>
                      <td>Sciatica / Ischiasschmerzen </td>
                      <td></td>
                    </tr>

                    <tr className="prim-sy-tr">
                      <td>3</td>
                      <td></td>
                      <td></td>
                    </tr>

                    <tr className="prim-sy-tr">
                      <td>4</td>
                      <td>Headaches / Kopfschmerzen</td>
                      <td></td>
                    </tr>

                    <tr className="prim-sy-tr">
                      <td>5</td>
                      <td></td>
                      <td></td>
                    </tr>

                    <tr className="prim-sy-tr">
                      <td>Other:</td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
                <div className="warngs">
                  <h5>Warnings:</h5>
                  <h5>
                    Osteoporosis Patient has cancer Disc Herniation - Use Disc
                    Protocols{" "}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default View;
