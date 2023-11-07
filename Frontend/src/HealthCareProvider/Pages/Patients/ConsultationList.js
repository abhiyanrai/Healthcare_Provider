import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
// import {
//   getConsultationsApiById,
//   getConsultationsApiByPatientId,
//   getSymptomById,
// } from "../../Apis";
import {   getConsultationsApiById,
  getConsultationsApiByPatientId,
  getSymptomById, } from "../../../Apis/healthcareProvider";
import ConsultationForm from "../Consultation/consultaion-form/ConsultationForm";
const ConsultationList = (props) => {
  const { patientId } = props;
  console.log(patientId, "patientIdpatientId");
  const [symptopmId, setSymptomId] = useState("");
  const [symptom, setSymptom] = useState();
  const [consultationData, setConsultationData] = useState(props.consultList);
  const getConsultationDetails = async (id) => {
    try {
      const res = await getConsultationsApiByPatientId(id);
      if (res.status === 200 || res.status === 201) {
        console.log(res);
        setConsultationData(res.data.consultationArr);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getSymptomsDetails = async (id) => {
    try {
      const res = await getSymptomById(id);
      if (res.status === 200 || res.status === 201) {
        setSymptom(res.data.symptom);
      }
      console.log(res, "sympotpm by id");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (symptopmId) {
      getSymptomsDetails(symptopmId);
    }
  }, [symptopmId]);

  useEffect(() => {
    if (patientId) {
      getConsultationDetails(patientId);
    }
  }, [patientId]);
  return (
    <>
      <div className="card rounded-top-0">
        <div className="card-header border-bottom d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Consultation</h5>
          <button
            type="submit"
            className="btn btn-sm btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            New Consultation
          </button>
        </div>
        <div className="card">
          {/* <div className="card-header d-flex align-items-center flex-wrap"> */}
          <div className="table-responsive" style={{ width: "100%" }}>
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th scope="col">S.no.</th>
                  <th scope="col">Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {consultationData?.length ? (
                  consultationData?.map((val, index) => {
                    return (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <th>{val?.date?.split("-").reverse().join("/")}</th>
                        {/* <td>{val?.symptom}</td> */}
                        {console.log(val,"asdklfjdsla")}
                        <td>
                          <Link
                            className="btn btn-sm btn-neutral me-5"
                            to={`/Consultation/ConsultationView/${val?._id}`}
                          >
                            View
                          </Link>
                          {/* </button> */}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr align="center">
                    <td colspan="8">
                      <h5> No record found!</h5>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* </div> */}
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalr"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{
                padding: ".5rem",
                fontSize: ".8rem",
                position: "inherit",
                right: "3px",
              }}
            >
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body pt-0">
              <form>
                <div className="row">
                  <div className="col-md-12">
                    <h4>
                      <span className="font-w">Symptoms:</span>
                    </h4>

                    <select
                      className="form-select jnl mt-1"
                      aria-label="Default select example"
                      name="symptom"
                      disabled
                    >
                      <option value={symptom?.symptom}>
                        {symptom?.symptom}
                      </option>
                    </select>
                  </div>
                  <div className="col-md-2 mt-5">
                    <div className="row mt-4">
                      <div className="col">
                        <input
                          id="sym-lt"
                          type="checkbox"
                          checked
                          disabled
                          name="position"
                          value={symptom?.position}
                        />
                        <label for="sym-lt" className="sy-lf-rt-bt">
                          LEFT
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-5 mt-2">
                    <span className="font-w">Radiates To: </span>

                    <select
                      className="form-select jnl mt-1"
                      aria-label="Default select example"
                      name="radiates"
                      disabled
                    >
                      <option value="other">{symptom?.radiates}</option>
                    </select>
                  </div>
                  <div className="col-md-5 mt-2">
                    <span className="font-w">Describe Symptoms: </span>

                    <select
                      className="form-select jnl mt-1"
                      aria-label="Default select example"
                      // value={values.describeSymptoms}
                      disabled
                      name="describeSymptoms"
                    >
                      <option value="">{symptom?.describeSymptoms}</option>
                    </select>
                  </div>
                  <div className="col-lg-2 mt-2">
                    <span className="font-w">Began: </span>
                    <input
                      className="form-control mt-1"
                      type="number"
                      placeholder="Type..."
                      // disabled={disabled}
                      value={symptom?.begin}
                      min="0"
                      name="begin"
                      disabled
                      // onChange={handleBeginChange}
                    />
                  </div>
                  <div className="col-lg-2 col-md-6 mt-2">
                    <span className="font-w">Ago</span>
                    <select
                      className="form-select jnl mt-1 me-2"
                      aria-label="Default select example"
                      name="ago"
                      disabled
                      style={{ padding: "0.75rem 2rem 0.75rem 0.5rem" }}
                    >
                      <option>{symptom?.ago}</option>
                    </select>
                  </div>

                  <div className="col-lg-2 col-md-6 mt-2">
                    <span className="font-w">Frequency:</span>
                    <input
                      // disabled={disabled1}
                      disabled
                      className="form-control mt-1"
                      type="number"
                      name="frequency"
                      min="0"
                      value={symptom?.frequency}
                      // onChange={handleFrequencyChange}
                      placeholder="Type..."
                    />
                  </div>
                  <div className="col-lg-2 col-md-6 mt-3">
                    <span className="font-w">Y,M,W,D </span>
                    <select
                      className="form-select jnl mt-1"
                      aria-label="Default select example"
                      disabled
                      name="duration"
                      style={{ padding: "0.75rem 2rem 0.75rem 0.5rem" }}
                    >
                      <option>{symptom?.duration}</option>
                    </select>
                  </div>
                  <div className="col-md-4 mt-2">
                    <span className="font-w">Onset: </span>

                    <select
                      className="form-select jnl mt-1"
                      aria-label="Default select example"
                      // value={values.onSet}
                      // disabled={disableds}
                      disabled
                      name="onSet"
                      // onChange={(e) => handleSelectChange(e, "onSet")}
                    >
                      <option>{symptom?.onSet}</option>
                    </select>
                  </div>
                  <div className="col-md-12 mt-2">
                    <span className="font-w">Description of injury: </span>
                    <textarea
                      style={{ resize: "none" }}
                      className="form-control mt-1"
                      rows="1"
                      type="textarea"
                      placeholder="Type here..."
                      // disabled={disableds}
                      disabled
                      value={symptom?.describeInjury}
                      // name="describeInjury"
                      // onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mt-2">
                    <span className="font-w">Palliative: </span>

                    <select
                      className="form-select jnl mt-1"
                      aria-label="Default select example"
                      // value={values.palliative}
                      // disabled={disableds}
                      disabled
                      name="palliative"
                      // onChange={(e) => handleSelectChange(e, "palliative")}
                    >
                      <option value="">{symptom?.palliative}</option>
                    </select>
                  </div>
                  <div className="col-md-6 mt-2">
                    <span className="font-w">Provocative: </span>

                    <select
                      className="form-select jnl mt-1"
                      aria-label="Default select example"
                      name="provocative"
                      disabled
                    >
                      <option value="">{symptom?.provocative}</option>
                    </select>
                  </div>
                  <div className="col-md-12 mt-2">
                    <span className="font-w">Warnings: </span>

                    <CreatableSelect
                      isDisabled
                      className="form-select jnl mt-1 p-0"
                      style={{ width: "100%" }}
                      isMulti
                      // options={options}
                      value={symptom?.warnings}
                      name="warnings"
                      // onChange={(value) => setFieldValue("warnings", value)}
                      // onChange={handleCreatable}
                    />
                  </div>

                  <div className="col-md-12 mt-2">
                    <span className="font-w">Additional Note: </span>
                    <textarea
                      style={{ resize: "none" }}
                      className="form-control jnl mt-1"
                      rows="1"
                      disabled
                      type="textarea"
                      placeholder="Type here..."
                      // disabled={disableds}
                      value={symptom?.additionalNote}
                      name="additionalNote"
                      // onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-6 col-md-12 mt-2">
                    <span className="font-w">Other therapist</span>
                    <select
                      className="form-select jnl mt-1"
                      aria-label="Default select example"
                      // value={values.therapist}
                      // disabled={disableds}
                      disabled
                      name="therapist"
                      // onChange={(e) => handleSelectChange(e, "therapist")}
                    >
                      {/* {dataList?.therapistList?.map((val) => {
                            return <option value={val.name}>{val.name}</option>;
                          })} */}
                      <option value="">{symptom?.therapist}</option>
                    </select>
                  </div>
                  <div className="col-lg-6 col-md-12 mt-2">
                    <span className="font-w">Did it help?</span>

                    <select
                      className="form-select jnl mt-1"
                      aria-label="Default select example"
                      name="help"
                      disabled
                      // value={values.help}
                      // disabled={disableds}
                      // onChange={(e) => handleSelectChange(e, "help")}
                    >
                      <option value="">{symptom?.help}</option>
                    </select>
                  </div>
                  <div className="col-lg-6 mt-2">
                    <span className="font-w">Add link for reports: </span>
                    <textarea
                      style={{ resize: "none" }}
                      className="form-control mt-1"
                      rows="1"
                      type="textarea"
                      placeholder="Link here..."
                      // disabled={disableds}
                      disabled
                      name="linkReports"
                      value={symptom?.linkReports}
                      // onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-6 mt-2">
                    <span className="font-w">Patients treatment goal: </span>
                    <textarea
                      style={{ resize: "none" }}
                      className="form-control mt-1"
                      rows="1"
                      type="textarea"
                      disabled
                      placeholder="Type here..."
                      // disabled={disableds}
                      name="goal"
                      value={symptom?.goal}
                      // onChange={handleChange}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        {" "}
        <ConsultationForm data={patientId} />{" "}
      </div>
    </>
  );
};


export default ConsultationList;
