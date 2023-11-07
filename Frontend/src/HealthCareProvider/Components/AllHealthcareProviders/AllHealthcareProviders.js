import { useFormik } from "formik";
import React,{useState} from "react";
// import { imageProfileApi, updateProviderDataById, updateProviderProfileById } from "../../Apis";
import { imageProfileApi ,updateProviderDataById, updateProviderProfileById  } from "../../../Apis/healthcareProvider";
import ProviderItemData from "./ProviderItemData";
import toast from 'react-hot-toast';
// import { SERVER_ENDPOINT } from "../../utils/baseUrl";
import { SERVER_ENDPOINT } from "../../../utils/baseUrl";
// import img from "../../Assets/img/img-profile.jpg";
import img from "../../../Assets/img/img-profile.jpg"
const AllHealthcareProviders = (props) => {
  const providerDatas = props?.providerDatas;
  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover table-nowrap">
          <thead className="table-light">
            <tr>
              <th className="col-1">S.No</th>
              <th className="col-2">Name</th>
              <th className="col-2">Service</th>
              <th className="col-2">Room</th>
              <th className="col-2">Time Slot</th>
              <th className="col-2">Type</th>
              <th className="col-2"></th>
            </tr>
          </thead>
          <tbody>
            {console.log(providerDatas,"jpsoirfmxvhgunvur")}
            {Boolean(providerDatas?.length) ? (
              providerDatas?.map((item, index) => {
                return (
                  <>
                    <ProviderItemData
                    loading={props.loading}
                      index={index}
                      item={item}
                      setRunUseEffect={props.setRunUseEffect}
                      runUseEffec={props.runUseEffec}
                    />
                  </>
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
 
    </>
  );
};

export default AllHealthcareProviders;
