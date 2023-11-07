import React, { useEffect } from "react";
import { useState } from "react";
// import {
//   getConsultationsApiById,
//   getConsultationsApiByPatientId,
//   getSymptomById,
// } from "../../Apis";

import { getConsultationsApiById,
  getConsultationsApiByPatientId,
  getSymptomById, } from "../../../Apis/healthcareProvider";
import { SERVER_ENDPOINT } from "../../../utils/baseUrl";

const Preports = ({ patientId }) => {
  const [reportsData, setReportsData] = useState([]);
  const getsymptomDetails = async (id) => {
    if (!id) return;
    try {
      const res = await getConsultationsApiById(id);
      if (res.status === 200 || res.status === 201) {
       let data =  res?.data?.symptomsArr?.filter(v => v.attachment?.length || v.linkReports?.length)
        setReportsData(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getConsultationDetails = async (id) => {
    try {
      const res = await getConsultationsApiByPatientId(id);
      if (res.status === 200 || res.status === 201) {
        getsymptomDetails(res?.data?.consultationArr[0]?._id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (patientId) {
      getConsultationDetails(patientId);
    }
  }, [patientId]);
  return (
    <div className="card rounded-top-0">
      <div className="card-header border-bottom">
        <h5 className="mb-0">History Reports</h5>
      </div>
      <div className="table-responsive">
        <table className="table table-hover table-nowrap">
          <thead className="table-light">
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Attachments</th>
              <th scope="col">Links</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {Boolean(reportsData?.length) ?
              reportsData?.map((v,i) => {
                return (
                  <tr>
                    <td>{i+1}</td>
                    <td style={{flexWrap:"wrap"}} className="d-flex">{ Boolean(v?.attachment?.length) && v?.attachment?.map((v,i)=>{
                      return <a target="_blank" rel="noreferrer noopener" href={SERVER_ENDPOINT+"/"+v}>{v ? v+" , ":"-"}  </a>
                    })}</td>
                    <td style={{flexWrap:"wrap"}} >
                      {
                       Boolean(v?.linkReports?.length) && v?.linkReports?.map((v,i)=>{
                          return <a style={{color:'#4b4bde !important'}} className=" font-semibold" href={v?.split("")[0] === "h" ? v : `https://${v}`} target="_blank" rel="noreferrer noopener">
                          {v?v+" , ":"-"} 
                        </a>
                        })
                      }
                    </td>
                    <td>
                      
                    </td>
                  </tr>
                );
              }):<tr align="center">
              <td colspan="8">
                <h5> No record found!</h5>
              </td>
            </tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Preports;
