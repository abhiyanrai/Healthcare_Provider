import React from 'react'
import { SERVER_ENDPOINT } from '../../utils/baseUrl'
const ConsultationModal = ({reportData}) => {
    // const reportData=""
  return (
    <div className="modal-dialog  modal-xl">
          <div className="modal-content">
            <div className="modal-header" style={{ padding: ".5rem 1rem" }}>
              <h3 className="modal-title fs-5" id="staticBackdropLabel">
                Consultation Report
              </h3>
              
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <hr style={{ marginTop: "0.5rem" }} />
            <div className="modal-body pt-0">
              <div className="table-responsive">
                <table className="table table-borderless tb_td">
                  <tbody className="d-block">
                    <tr>
                      <th className="float-end">Symptoms:</th>
                      <td>{reportData?.symptom ? reportData.symptom : "-"}</td>
                    </tr>
                    <tr>
                      <th className="float-end">Date:</th>
                      <td>{reportData?.date ? reportData.date : "-"}</td>
                    </tr>
                    <tr>
                      <th className="float-end">Radiates To:</th>
                      <td>{reportData?.radiates ? reportData.radiates : "-"}</td>
                    </tr>
                    <tr>
                      <th className="float-end">Describe Symptom:</th>
                      <td>
                        {reportData?.describeSymptoms
                          ? reportData.describeSymptoms
                          : "-"}
                      </td>
                    </tr>
                    <tr>
                      <th className="float-end">Began:</th>
                      <td>{reportData?.begin ? reportData.begin : "-"}</td>
                    </tr>
                    <tr>
                      <th className="float-end">Ago:</th>
                      <td>{reportData?.ago ? reportData.ago : "-"}</td>
                    </tr>
                    <tr>
                      <th className="float-end">Frequency:</th>
                      <td>{reportData?.frequency ? reportData.frequency : "-"}</td>
                    </tr>
                    <tr>
                      <th className="float-end">Y,M,W,D:</th>
                      <td>{reportData?.duration ? reportData.duration : "-"}</td>
                    </tr>
                    <tr>
                      <th className="float-end">Onset:</th>
                      <td>{reportData?.onSet ? reportData.onSet : "-"}</td>
                    </tr>
                    <tr>
                      <th className="float-end">Description of injury:</th>
                      <td>
                        {reportData?.describeInjury ? reportData.describeInjury : "-"}
                      </td>
                    </tr>
                    <tr>
                      <th className="float-end">Palliative:</th>
                      <td>{reportData?.palliative ? reportData?.palliative : "-"}</td>
                    </tr>
                    <tr>
                      <th className="float-end">Provocative:</th>
                      <td>{reportData?.provocative ? reportData.provocative : "-"}</td>
                    </tr>
                    <tr>
                      <th className="float-end">Warning:</th>{
                        Boolean(reportData?.warnings?.length) && <td>
                          {reportData?.warnings?.map((v , i)=>{
                            return <span>{v.value}{i === reportData?.warnings?.length-1 ? "":" , "}</span>
                          })}
                        </td>
                      }
                      {/* <td>{reportData?.warnings ? reportData.warnings : "-"}</td> */}
                    </tr>
                    <tr>
                      <th className="float-end">Additional Note:</th>
                      <td>
                        {reportData?.additionalNote ? reportData.additionalNote : "-"}
                      </td>
                    </tr>
                    <tr>
                      <th className="float-end">Other therapist:</th>
                      <td>{reportData?.therapist ? reportData.therapist : "-"}</td>
                    </tr>
                    <tr>
                      <th className="float-end">Did it help?</th>
                      <td>{reportData?.help ? reportData.help : "-"}</td>
                    </tr>
                    <tr>
                      <th className="float-end">Add link for report: </th>
                      <td>
                        {/* {reportData?.linkReports ? reportData.linkReports :"-"} */}
                        {Boolean(reportData?.linkReports?.length) &&
                          reportData?.linkReports?.map((v, i) => {
                            return (
                              <a
                                style={{ color: "#5C60F5 !important" }}
                                className=" font-semibold"
                                href={
                                  v?.split("")[0] === "h" ? v : `https://${v}`
                                }
                                target="_blank"
                                rel="noreferrer noopener"
                              >
                                {v ? v + "," : "-"}
                              </a>
                            );
                          })}
                      </td>
                    </tr>
                    <tr>
                      <th className="float-end">Add file:</th>
                      <td>
                        {Boolean(reportData?.attachment?.length) &&
                          reportData?.attachment?.map((v, i) => {
                            return (
                              <a
                                target="_blank"
                                rel="noreferrer noopener"
                                href={SERVER_ENDPOINT + "/" + v}
                              >
                                {v ? v + " ," : "-"}{" "}
                              </a>
                            );
                          })}
                      </td>
                    </tr>
                    <tr>
                      <th className="float-end">Patient treatment goal:</th>
                      <td>{reportData?.goal ? reportData.goal : "-"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
  )
}

export default ConsultationModal