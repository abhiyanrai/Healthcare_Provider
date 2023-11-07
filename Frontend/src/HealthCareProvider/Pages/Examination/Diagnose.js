import { useFormik } from "formik";
import React, { useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
// import { dropdownIds } from "../SystemSettings/data";
import { dropdownIds } from "../../../Pages/SystemSettings/data";

import {
  generateName,
  CromNameBooleanFlx,
  CromNameBooleanLlb,
  CromNameBooleanProt,
  cromName,
} from "./additionalFunction";
// import { getOptionListApiById } from "../../Apis";
import { getOptionListApiById } from "../../../Apis/healthcareProvider";
const Diagnose = (props) => {
  const { setFunction, step, formik3 } = props;
  const [diagnoseData, setDiagnoseData] = useState({ value: "", name: "" });
  const [boneData, setBoneData] = useState({ value: "", name: "" });
  const [othepadicData, setOthepadicData] = useState({ value: "", name: "" });
  const [dsxData, setDsxData] = useState({ value: "", name: "" });
  const [state, setState] = useState([]);

  const getSymptomData = async (id) => {
    setState([
      {
        name: "Loading ....",
        _id: "",
      },
    ]);
    setTimeout(async () => {
      if (id) {
        try {
          const res = await getOptionListApiById(id);
          setState(res.data.allOptions);
        } catch (err) {
          console.log(err);
        }
      }
    }, 500);
  };
  const options1 =
    state &&
    state?.map((el, i) => {
      let container = {};
      container["value"] = el?.name;
      container["label"] = el?.name;
      return container;
    });

  const hanldeDiagVal = (e)=>{
    if(e.value === "Loading ....") return ; 
    setDiagnoseData({ ...diagnoseData, name: e.value })
  }
  const handleBoneVal =(e)=>{
    if(e.value === "Loading ....") return ; 
    setBoneData({ ...boneData, name: e.value });
  }
  const handleOsthoVal =(e)=>{
    if(e.value === "Loading ....") return ; 
    setOthepadicData({ ...othepadicData, name: e.value })
  }
  const handleDsxVal =(e)=>{
    if(e.value === "Loading ....") return ; 
    setDsxData({ ...dsxData, name: e.target.value })
  }
  const handleDiagnose = (e) => {
    if (diagnoseData.name) {
      formik3.setFieldValue("diagnose", [
        ...formik3?.values?.diagnose,
        { name: diagnoseData?.name, value: e.target.value },
      ]);
      setDiagnoseData({ value: "", name: "" });
    }
  };
  const handleBone = (e) => {
    if (boneData.name) {
      formik3.setFieldValue("bone", [
        ...formik3?.values?.bone,
        { name: boneData?.name, value: e.target.value },
      ]);
      setBoneData({ value: "", name: "" });
    }
  };
  const handleOthepadic = (e) => {
    if (othepadicData.name) {
      formik3.setFieldValue("osteopathic", [
        ...formik3?.values?.osteopathic,
        { name: othepadicData?.name, value: e.target.value },
      ]);
      setOthepadicData({ value: "", name: "" });
    }
  };
  const handleDsx = (e) => {
    if (dsxData.name) {
      formik3.setFieldValue("additionalDxs", [
        ...formik3?.values?.additionalDxs,
        { name: dsxData?.name, value: e.target.value },
      ]);
      setDsxData({ value: "", name: "" });
    }
  };
  const handleRemove = (id, name) => {
    switch (name) {
      case "diagnose":
        formik3.values.diagnose?.splice(id, 1);
        formik3.setFieldValue("diagnose", formik3?.values?.diagnose);
        break;
      case "bone":
        formik3.values.bone?.splice(id, 1);
        formik3.setFieldValue("bone", formik3?.values?.bone);
        break;
      case "osteopathic":
        formik3.values.osteopathic?.splice(id, 1);
        formik3.setFieldValue("osteopathic", formik3?.values?.osteopathic);
        break;
      default:
        formik3.values.additionalDxs?.splice(id, 1);
        formik3.setFieldValue("additionalDxs", formik3?.values?.additionalDxs);
        break;
    }
  };
  return (
    <form onSubmit={formik3.handleSubmit}>
      <div className="form-ttle">Diagnose</div>
      <div className="row card-header pt-0">
        <div className="col-lg-12 mt-2">
          <h5 className="font-weight-bold" style={{ textAlign: "start" }}>
            <u>DIAGNOSES: 1</u>
          </h5>
          <div className="row">
            <div
              className="col-lg-8 mt-2"
              onClick={() => getSymptomData(dropdownIds.DIAGNOSES)}
            >
              <CreatableSelect
                name="diagnose.name"
                value={{
                  label: diagnoseData?.name,
                  value: diagnoseData?.name,
                }}
                options={options1}
                onChange={hanldeDiagVal}
                noOptionsMessage={() => "No Data Found"}
              />
            </div>
            <div className="col-lg-3 mt-2">
              <select
                name="diagnose.value"
                value={diagnoseData?.value}
                onChange={handleDiagnose}
                id=""
                className="Diagnose-select "
              >
                <option value="" hidden >
                  Select
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="col-lg-4"></div>
          </div>
          <div className="diagnoses-selected mt-4">
            <ul className="mb-0">
              {formik3?.values?.diagnose?.map((v, i) => {
                return (
                  <li>
                    {v.name}
                    <label className="exam-label-value">{v.value}</label>{" "}
                    <span onClick={() => handleRemove(i, "diagnose")}>x</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {/* <div className="col-lg-6 mt-2">
          <h5 className="font-weight-bold" style={{ textAlign: "start" }}>
            <u>BONE / JOINT</u>
          </h5>
          <div className="row">
            <div
              className="col-lg-5 mt-2"
              onClick={() => getSymptomData(dropdownIds.BONEJOINT)}
            >
              <CreatableSelect
                name="bone.name"
                value={{
                  label: boneData?.name,
                  value: boneData?.name,
                }}
                options={options1}
                onChange={handleBoneVal}
                noOptionsMessage={() => "No Data Found"}
              />
            </div>
            <div className="col-lg-3 mt-2">
              <select
                name="diagnose.value"
                value={boneData?.value}
                onChange={handleBone}
                id=""
                className="Diagnose-select"
              >
                <option value="" hidden>
                  Select
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="col-lg-4"></div>
          </div>
          <div className="diagnoses-selected mt-4">
            <ul className="mb-0">
              {formik3?.values?.bone?.map((v, i) => {
                return (
                  <li>
                    {v.name}
                    <label className="exam-label-value">{v.value}</label>{" "}
                    <span onClick={() => handleRemove(i, "bone")}>x</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div> */}
      </div>

      {/* <div className="row card-header pt-0">
        <div className="col-lg-6">
          <h5 className="font-weight-bold" style={{ textAlign: "start" }}>
            <u>OSTEOPATHIC DXS:</u>
          </h5>
          <div className="row">
            <div
              className="col-lg-5 mt-2"
              onClick={() => getSymptomData(dropdownIds.OSTEOPATHICDXS)}
            >
              <CreatableSelect
                name="othepadicData.name"
                value={{
                  label: othepadicData?.name,
                  value: othepadicData?.name,
                }}
                options={options1}
                onChange={handleOsthoVal}
                noOptionsMessage={() => "No Data Found"}
              />
            </div>
            <div className="col-lg-3 mt-2">
              <select
                name="osteopathic.value"
                value={othepadicData?.value}
                onChange={handleOthepadic}
                id=""
                className="Diagnose-select"
              >
                <option value="" hidden>
                  Select
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="col-lg-4"></div>
          </div>
          <div className="diagnoses-selected mt-4">
            <ul className="mb-0">
              {formik3?.values?.osteopathic?.map((v, i) => {
                return (
                  <li>
                    {v.name}
                    <label className="exam-label-value">{v.value}</label>{" "}
                    <span onClick={() => handleRemove(i, "osteopathic")}>
                      x
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="col-lg-6 mt-2 mt-lg-0">
          <h5 className="font-weight-bold" style={{ textAlign: "start" }}>
            <u>ADDITIONAL DXS:</u>
          </h5>
          <div className="row">
            <div className="col-lg-5 mt-2">
              <input
                className="i-mb-0 pt-0 pb-0"
                type="text"
                value={dsxData?.name}
                onChange={handleDsxVal}
                id=""
                placeholder="Additional Dxs Type here..."
                style={{
                  backgroundColor: "transparent",
                  width: "100%",
                  border: "1px solid #ccc",
                  padding: "0px 15px",
                  height: "39px",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div className="col-lg-3 mt-2">
              <select
                name="additionalDxs.value"
                value={dsxData?.value}
                onChange={handleDsx}
                id=""
                className="Diagnose-select"
              >
                <option value="" hidden>
                  Select
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="col-lg-4"></div>
          </div>
          <div className="diagnoses-selected mt-4">
            <ul className="mb-0">
              {formik3?.values?.additionalDxs?.map((v, i) => {
                return (
                  <li>
                    {v.name}
                    <label className="exam-label-value">{v.value}</label>{" "}
                    <span onClick={() => handleRemove(i, "additionalDxs")}>
                      x
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div> */}
      {/* <input
        type="button"
        name="next"
        className="next action-button ms-5 me-5"
        value="Save & Next"
        onClick={() => setFunction(step + 1)}
      />
      <input
        type="button"
        name="previous"
        className="previous action-button-previous"
        value="Previous"
        onClick={() => setFunction(step - 1)}
      /> */}
    </form>
  );
};


export default Diagnose;
