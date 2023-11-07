import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import { addDataIntoOptionApi, deleteOptionApi, getOptionListApiById, updateOptionApi } from "../../../Apis";
import { dropdownIds } from "../data";
import toast from "react-hot-toast";
import { WhiteLoader } from "../../../Components/common/Errors/loader/WhiteLoader";
import { postDiagnoseOption } from "../../../Apis/healthcareProvider";
import { API_BASE_URL } from "../../../utils/baseUrl";
import { saveAs } from "file-saver";
const ExaminationDropdown = () => {
  const [state, setstate] = useState([]);
  const [addData, setAddData] = useState();
  const [updateData, setUpdateData] = useState();
  const [editData,setEditData]=useState();
  const [optionId, setOptionId] = useState();
  const [toggle, setToggle] = useState(false);
  const [toggleEdit,setToggleEdit]=useState(false);
  const [loader,setLoader] =useState(false)
  const [errormsg, setErrorMsg] = useState("");
  const CustomOption = (props) => {
    const deleteoption = async(d)=>{
      try{
        const res = await deleteOptionApi({id:data.id})
        if(res.status === 200 || res.status === 201){
          toast.success(res.data.message);
        }
      }catch(err){
        console.log(err)
      }
    }


   
    const editOption =(data)=>{
      setToggleEdit(true);
      setEditData(data);
      setUpdateData(data?.value)
      console.log(data,"dataafdfdastdsafd")
    }
    const { data, innerRef, innerProps ,selectProps,selectOption } = props;
    const { optionAdd, optionEdit, optionDelete } = selectProps;
    const onClick ={
      option: () => {},
      label: () => selectOption(data),
      add: () => optionAdd(data),
      edit: ()=> editOption(data),
      delete: () => deleteoption(data)
    };
    return data.custom ? (
      <div style={{ cursor: "pointer" }} ref={innerRef} {...innerProps}></div>
    ) : (
      <components.Option {...props} >
      <span onClick={onClick.label}>{data?.label}</span>
      {console.log(props,"inernenrdjfpajdsfsdjf")}
      {!!data?.id &&  (
      <span style={{float : "right"}}>
        <button style={{margin:"0 10px"}} onClick={onClick.edit}><i class="bi bi-pencil-square"></i></button>
        <button onClick={onClick.delete}><i class="bi bi-trash"></i></button>
      </span>
    )}
      </components.Option>
    );
  };

  const handleClick = event => {
    const { target = {} } = event || {};
    target.value = "";
  };
  const options1 =
    state?.length > 0
      ? state?.map((el, i) => {
          let container = {};
          container["value"] = el?.name;
          container["label"] = el?.name;
          container["id"] = el?._id;
          return container;
        })
      : [{ custom: true }];

  const getSymptomData = async (id) => {
    setstate([
      {
        name: "Loading ....",
        visible:false,
        _id: "",
      },
    ]);
    setTimeout(async () => {
      if (id) {
        setOptionId(id);
        try {
          const res = await getOptionListApiById(id);
          if (res.status === 200 || res.status === 201) {
            manageData(res.data.allOptions);
            setstate(res.data.allOptions);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }, 500);
  };

  const handleFileUpload = async (event) => {
    setLoader(true)
    const file = event.target.files[0];
    console.log(file, "ADSFSDAFDSFDSA");
    const formData = new FormData();
    formData.append("file", file);
    try{
      const res = await postDiagnoseOption(formData);
      if (res.status === 200 || res.status === 201) {
        toast.success(res.data.message);
        // getRecentPatientsData("", currentPageRecent, limitRecent);
        // getPatientsData(searchVal, currentPage, limit);
        setLoader(false)
      }else{
        setLoader(false);
        toast.error("Something went wrong")
      }
    }catch(err){
      setLoader(false);
      toast.error("Something went wrong")
    }
    
  };
  const downloadFormat = async () => {
    // const res = await getFormatApi();
    // console.log(res,"tyeytuiehfksjf")
    fetch(`${API_BASE_URL}/common/download/diagnoses-format`)
      .then((response) => response.blob())
      .then((blob) => {
        // Save the blob as a file using FileSaver
        saveAs(blob, "data.csv");
      })
      .catch((error) => {
        console.error("Error downloading the CSV file:", error);
      });
  };
  const manageData = (data) => {
    let dd = data;
    let mm = dd.push({ name: "Add other", id: "" ,visible:false});
    setstate(mm);
  };
  const handleInputChange = (e, name) => {
    if (e.value === "Add other") {
      setToggle(true);
      e.preventDefault();
    }
    e.preventDefault();
  };

  const handleAddData = (e) => {
    setAddData(e.target.value);
    if (e.target.value) {
      setErrorMsg("");
    }
  };
  const handleUpdateData =(e)=>{
    setUpdateData(e.target.value)
  }
  const handleUpdateOption=async()=>{
    try{
      const res = await updateOptionApi({id:editData.id , name:updateData});
      if(res.status=== 200 || res.status === 201){
        toast.success(res.data.message);
        setToggleEdit(false)
        getSymptomData(editData.id)
      }
      console.log(res,"fdajsdjfkadsjflkjdas")
    }catch(err){
      console.log(err)
    }
}
  const handleSubmitOption = async () => {
    if (optionId && addData) {
      try {
        const res = await addDataIntoOptionApi({
          name: addData,
          modelId: optionId,
        });
        if (res.status === 200 || res.status === 201) {
          toast.success(res.data.message);
          setOptionId("");
          setAddData("");
          setToggle(false);
        }
      } catch (err) {
        toast.error(err);
      }
    } else {
      setErrorMsg("Required field.");
    }
  };
  const handleClose = () => {
    setErrorMsg("");
    setToggleEdit(false)
    setToggle(false);
    setOptionId("");
    setAddData("");
  };
  return (
    <div>
      <div className="row">
        <div className="col-lg-6">
          <table className="table table-borderless tb_td">
            <tbody>
              <tr>
                <th colspan="6" className="text-dark font-weight-bold">
                  <u>Listings</u>
                </th>
              </tr>
              <tr className="text-dark">
                <td
                  colspan="6"
                  onClick={() => getSymptomData(dropdownIds.Listings)}
                >
                  {/* <span>L1-5</span> */}
                  <Select
                    components={{ Option: CustomOption }}
                    options={options1}
                    onChange={(e) => handleInputChange(e, "symptomList")}
                  />
                </td>
              </tr>
              <tr>
                <th colspan="6" className="text-dark font-weight-bold">
                  <u>SHOULDER MUSCLE TESTS</u>
                </th>
              </tr>
              <tr>
                <td
                  colspan="4"
                  onClick={() =>
                    getSymptomData(dropdownIds.SHOULDERMUSCLETESTS)
                  }
                >
                  <Select
                    components={{ Option: CustomOption }}
                    options={options1}
                    onChange={(e) => handleInputChange(e, "symptomList")}
                  />
                </td>
                {/* <td
                  onClick={() =>
                    getSymptomData(dropdownIds.SHOULDERMUSCLETESTS)
                  }
                >
                  <Select
                    components={{ Option: CustomOption }}
                    options={options1}
                    onChange={(e) => handleInputChange(e, "symptomList")}
                  />
                </td> */}
              </tr>

              <tr>
                <th colspan="6" className="text-dark font-weight-bold">
                  <u>TMJ</u>
                </th>
              </tr>
              <tr>
                <td colspan="6" onClick={() => getSymptomData(dropdownIds.TMJ)}>
                  <Select
                    components={{ Option: CustomOption }}
                    options={options1}
                    onChange={(e) => handleInputChange(e, "symptomList")}
                  />
                </td>
              </tr>

              <tr>
                <th colspan="6" className="text-dark font-weight-bold">
                  <u>TREATMENT PLAN</u>
                </th>
              </tr>
              <tr colspan="6">
                {/* <th colspan="6" className="text-dark font-weight-bold">
                  <u>As Need</u>
                </th> */}
              </tr>
              <tr>
                <td
                  colspan="6"
                  onClick={() => getSymptomData(dropdownIds.TREATMENTPLAN)}
                >
                  <Select
                    components={{ Option: CustomOption }}
                    options={options1}
                    onChange={(e) => handleInputChange(e, "symptomList")}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-lg-6">
          <table className="table table-borderless tb_td">
            <tbody>
              <tr>
                <th colspan="6" className="text-dark font-weight-bold">
                  <u>DIAGNOSES: 1</u>
                  <div style={{float:"right"}} class="file-input btn btn-primary btn-sm me-4">
                <input
                  type="file"
                  accept=".csv"
                  disabled={loader}
                  onInput={handleFileUpload}
                  onClick={handleClick}
                  data-bs-toggle="modal"
                  name="file-input"
                  id="file-input"
                  class="file-input__input"
                />
                {
                  loader ? <WhiteLoader/> :    <label class="" for="file-input">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-upload me-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                  </svg>
                  Import
                </label>

                }
              </div> 
              <div
              style={{ float: "right", fontSize: ".7rem", marginTop: "5px" }}
            >
              <p
                onClick={downloadFormat}
                style={{
                  fontWeight: "500",
                  cursor: "pointer",
                  textDecoration: "underline",
                  marginRight: "10px",
                  fontStyle: "italic",
                }}
              >
                Download csv format{" "}
              </p>
            </div>
                  {/* <button className="btn-primary" >Import</button> */}
                </th>

                {/* <div class="file-input btn btn-primary me-4">
                <input
                  type="file"
                  accept=".csv"
                  // disabled={loader}
                  // onChange={handleFileUpload}
                  data-bs-toggle="modal"
                  name="file-input"
                  id="file-input"
                  class="file-input__input"
                />
                {
                  loader ? <WhiteLoader/> :    <label class="" for="file-input">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-upload me-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                  </svg>
                  Import
                </label>
                }
             
              </div> */}

              </tr>
              <tr>
                <td
                  colspan="6"
                  onClick={() => getSymptomData(dropdownIds.DIAGNOSES)}
                >
                  <Select
                    components={{ Option: CustomOption }}
                    options={options1}
                    onChange={(e) => handleInputChange(e, "symptomList")}
                  />
                </td>
              </tr>

              {/* <tr>
                <th colspan="6" className="text-dark font-weight-bold">
                  <u>BONE / JOINT</u>
                </th>
              </tr> */}
              {/* <tr>
                <td
                  colspan="6"
                  onClick={() => getSymptomData(dropdownIds.BONEJOINT)}
                >
                  <Select
                    components={{ Option: CustomOption }}
                    options={options1}
                    onChange={(e) => handleInputChange(e, "symptomList")}
                  />
                </td>
              </tr> */}

              {/* <tr>
                <th colspan="6" className="text-dark font-weight-bold">
                  <u>OSTEOPATHIC DXS:</u>
                </th>
              </tr>
              <tr>
                <td
                  colspan="6"
                  onClick={() => getSymptomData(dropdownIds.OSTEOPATHICDXS)}
                >
                  <Select
                    components={{ Option: CustomOption }}
                    options={options1}
                    onChange={(e) => handleInputChange(e, "symptomList")}
                  />
                </td>
              </tr> */}

              <tr>
                <th colspan="6" className="text-dark font-weight-bold">
                  <u>KINESIOTAPING AREA</u>
                </th>
              </tr>
              <tr>
                <td
                  colspan="3"
                  onClick={() => getSymptomData(dropdownIds.KINESIOTAPINGAREA)}
                >
                  <Select
                    components={{ Option: CustomOption }}
                    options={options1}
                    onChange={(e) => handleInputChange(e, "symptomList")}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="col-lg-12 mt-5 text-end"></div>
      {toggle && (
        <div
          className="modal"
          id="exampleModalsym"
          style={{ display: "block" }}
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header pt-3 pe-3">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body pb-3 pt-3">
                <label className="form-label" htmlFor="opt">
                  Add Option
                </label>
                <input
                  type="text"
                  value={addData}
                  onChange={handleAddData}
                  className="form-control"
                />
                <span style={{ color: "red" }}>{errormsg}</span>
              </div>
              <div className="modal-footer justify-content-end">
                <button
                  type="button"
                  onClick={handleSubmitOption}
                  className="btn btn-sm btn-primary"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {toggleEdit && (
        <div
          className="modal"
          id="exampleModalsym"
          style={{ display: "block" }}
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header pt-3 pe-3">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body pb-3 pt-3">
                <label className="form-label" htmlFor="opt">
                  Edit Option
                </label>
                <input
                  type="text"
                  value={updateData}
                  onChange={handleUpdateData}
                  className="form-control"
                />
                 <span style={{color:"red"}}>{errormsg}</span>
              </div>
              <div className="modal-footer justify-content-end">
                <button
                  type="button"
                  onClick={handleUpdateOption}
                  className="btn btn-sm btn-primary"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExaminationDropdown;
