import moment from "moment";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getConsultationsApiByPatientId,
  getExaminationListById,
} from "../../Apis";

const ExaminationList = (props) => {
  const { patientId, examList } = props;
  const [examinationList, setExaminationList] = useState(examList);
  const [consultationData, setConsultationData] = useState([]);
  const [consulationId, setConsultationId] = useState("");
  const navigate = useNavigate();
  const getExaminations = async (id) => {
    try {
      const res = await getExaminationListById(id);
      if (res.status === 200 || res.status === 201) {
        setExaminationList(res.data.allExamination);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleReportId = (id) => {
    navigate("/examinationpReports", {
      state: {
        id: id,
        consultationId: consulationId,
        patientId: patientId,
        redirect: false,
      },
    });
  };

  const getConsultationDetails = async (id) => {
    try {
      const res = await getConsultationsApiByPatientId(id);
      if (res.status === 200 || res.status === 201) {
        setConsultationData(res.data.consultationArr);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleConsultaion = (e) => {
    if (e.target.value) {
      getExaminations(e.target.value);
      setConsultationId(e.target.value);
    }
  };
  useEffect(() => {
    if (patientId) {
      getExaminations(patientId);
      getConsultationDetails(patientId);
    }
  }, []);
  useEffect(() => {
    if (props.examList) {
      setExaminationList(examList);
    }
  }, [props]);
  return (
    <div className="card rounded-top-0">
      <div className="card-header border-bottom d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Examination</h5>
        <div className="">
          <select
            onChange={handleConsultaion}
            value={consulationId}
            className="form-select"
            id=""
          >
            <option hidden>Select consultation</option>
            {consultationData?.length &&
              consultationData?.map((v) => {
                return (
                  <option value={v._id}>
                    {" "}
                    {v?.createdAt?.split("T")[0].split("-").reverse().join("/")}
                  </option>
                );
              })}
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-nowrap">
          <thead className="table-light">
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Examination Date</th>
              <th scope="col">BMC</th>
              <th scope="col">SI</th>
              <th scope="col">CERVICAL</th>
              <th scope="col">Progress</th>
              <th scope="col">View</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {examinationList?.length ? (
              examinationList?.map((v, i) => {
                return (
                  <tr>
                    <td>{i + 1} </td>
                    <td>
                      {moment(v?.[0]?.createdAt?.split("T")[0]).format(
                        "DD/MM/YYYY"
                      )}
                    </td>
                    <td>Left Lower</td>
                    <td>
                      {v?.[0]?.functional?.SI?.position?.left
                        ? "Left"
                        : "Right"}
                    </td>
                    <td>cervical</td>
                    <td>-</td>
                    <td>
                      {console.log(v._id, "idddididididididid")}
                      <button
                        onClick={() => {
                          handleReportId(v?._id);
                        }}
                        className="btn btn-sm btn-primary"
                      >
                        View
                      </button>
                    </td>
                    <td></td>
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
    </div>
  );
};

export default ExaminationList;
