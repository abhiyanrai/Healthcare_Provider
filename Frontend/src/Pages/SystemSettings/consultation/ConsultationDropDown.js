import React, { useState, useEffect } from "react";
import { addDataIntoOptionApi, deleteOptionApi, getOptionListApiById, updateOptionApi } from "../../../Apis";
import { dropdownIds } from "../data";
import Select, { components } from "react-select";
import { useFormik } from "formik";
import toast from 'react-hot-toast';
import { useRef } from "react";


const ConsultationDropDown = () => {
  const [state, setstate] = useState([]);
  const [addData, setAddData] = useState();
  const [updateData, setUpdateData] = useState();
  const [editData,setEditData]=useState();
  const [optionId, setOptionId] = useState();
  const [loading,setLoading]=useState(true);
  const [toggle, setToggle] = useState(false);
  const [toggleEdit,setToggleEdit]=useState(false);
  const [errormsg,setErrorMsg]=useState("")
  const selectInputRef = useRef();
  const { values } = useFormik({
    initialValues: {
      symptomList: "",
      radiatesList: "",
      describeSymptomList: "",
      agoList: "",
      onSetList: "",
      palliativeList: "",
      provocativeList: "",
      warningsList: "",
      therapistList: "",
      helpList: "",
    },
  });

  
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
      setUpdateData(data.value)
      console.log(data,"dataafdfdastdsafd")
    }
    const { data, innerRef, innerProps,selectProps,selectOption } = props;
    console.log(props,"DSDFSDFSDFSDFSD")
    const { optionAdd, optionEdit, optionDelete } = selectProps;
    const onClick ={
      option: () => {},
      label: () => selectOption(data),
      add: () => optionAdd(data),
      edit: ()=> editOption(data),
      delete: () => deleteoption(data)
    };
  
    return data.custom ? (
      <div style={{ cursor: "pointer" }} ref={innerRef} {...innerProps}>
      </div>
    ) : (
      <components.Option {...props} >
        {console.log(data,"dauidfklsjatui")}
      <span onClick={onClick.label}>{data?.label}</span>
      {!!data?.id && (
      <span style={{float : "right"}}>
        <button style={{margin:"0 10px"}} onClick={onClick.edit}><i class="bi bi-pencil-square"></i></button>
        <button onClick={onClick.delete}><i class="bi bi-trash"></i></button>
      </span>
    )}
      </components.Option>
    );
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

  console.log(values, "?>?>?>?");

  const handleInputChange = (e, name) => {
    console.log(e, "DDDDDDDDD", name);
    if (e.value === "Add other") {
      setToggle(true);
      e.preventDefault();
    }
    e.preventDefault()
  };

  const handleAddData=(e)=>{
    setAddData(e.target.value);
    if(e.target.value){
      setErrorMsg("")
    }
  }

  const handleUpdateData =(e)=>{
    setUpdateData(e.target.value)
  }

  const getSymptomData = async (id) => {
    setstate([{
      name : "Loading ....",
      _id : ""}])
      setTimeout(async()=>{
        if (id) {
          setOptionId(id);
          try {
            const res = await getOptionListApiById(id);
            if (res.status === 200 || res.status === 201) {
              console.log(res.data.allOptions,"ALLOPTIOM")
              manageData(res.data.allOptions);
              setstate(res.data.allOptions);
              setLoading(false);
            }
          } catch (err) {
            console.log(err);
          }
        }
      },500)
    
  };
  console.log(state,"ATADSDETTADFSD")

  
  const manageData = (data) => {
    let dd = data;
    let mm = dd.push({ name: "Add other", id: "" });
    setstate(mm);
  };

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
    }else{
      setErrorMsg("Required field.")
    }
  };
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
  const handleClose = () => {
    setErrorMsg("");
    setToggleEdit(false)
    setToggle(false);
    setOptionId("");
    setAddData("");
  };
  console.log(selectInputRef);
  return (
    <div className="row">
      <div
        className="col-lg-6"
        onClick={() => getSymptomData(dropdownIds.symptoms)}
      >
        <label htmlFor="sym" className="font-w">
          Symptoms
        </label>

        <Select
          ref={selectInputRef}
          loadingMessage={() => "searching..."}
          // isLoading={loading}
          components={{ Option: CustomOption }}
          options={ loading ? "Loading":options1}
          // onChange={(e)=>e.preventDefualt()}
          onChange={(e) => handleInputChange(e, "symptomList")}
        />
      </div>
      <div
        className="col-lg-6 mt-2 mt-lg-0"
        onClick={() => getSymptomData(dropdownIds.radiatesTo)}
      >
        <label htmlFor="Radiates" className="font-w">
          Radiates To:
        </label>
        <Select
          ref={selectInputRef}
          components={{ Option: CustomOption }}
          options={options1}
          onChange={(e) => handleInputChange(e, "radiatesList")}
        />
      </div>
      <div
        className="col-lg-6 mt-2"
        onClick={() => getSymptomData(dropdownIds.describeSymptom)}
      >
        <label htmlFor="Describe" className="font-w">
          Describe Symptoms:
        </label>
        <Select
          ref={selectInputRef}
          components={{ Option: CustomOption }}
          options={options1}
          onChange={(e) => handleInputChange(e, "describeSymptomList")}
        />
      </div>
      <div
        className="col-lg-6 mt-2"
        onClick={() => getSymptomData(dropdownIds.ago)}
      >
        <label htmlFor="ymd" className="font-w">
          Ago/Y,M,W,D
        </label>
        <Select
          ref={selectInputRef}
          components={{ Option: CustomOption }}
          options={options1}
          onChange={(e) => handleInputChange(e, "agoList")}
        />
      </div>
      <div
        className="col-lg-6 mt-2"
        onClick={() => getSymptomData(dropdownIds.onSet)}
      >
        <label htmlFor="set" className="font-w">
          Onset:
        </label>
        <Select
          ref={selectInputRef}
          components={{ Option: CustomOption }}
          options={options1}
          onChange={(e) => handleInputChange(e, "onSetList")}
        />
      </div>
      <div
        className="col-lg-6 mt-2"
        onClick={() => getSymptomData(dropdownIds.palliative)}
      >
        <label htmlFor="Palliative" className="font-w">
          Palliative:
        </label>
        <Select
          ref={selectInputRef}
          components={{ Option: CustomOption }}
          options={options1}
          onChange={(e) => handleInputChange(e, "palliativeList")}
        />
      </div>
      <div
        className="col-lg-6 mt-2"
        onClick={() => getSymptomData(dropdownIds.provocative)}
      >
        <label htmlFor="Palliative" className="font-w">
          Provocative:
        </label>
        <Select
          ref={selectInputRef}
          components={{ Option: CustomOption }}
          options={options1}
          onChange={(e) => handleInputChange(e, "provocativeList")}
        />
      </div>
      <div
        className="col-lg-6 mt-2"
        onClick={() => getSymptomData(dropdownIds.warning)}
      >
        <label htmlFor="Warnings" className="font-w">
          Warnings:
        </label>
        <Select
          ref={selectInputRef}
          components={{ Option: CustomOption }}
          options={options1}
          onChange={(e) => handleInputChange(e, "warningsList")}
        />
      </div>
      <div
        className="col-lg-6 mt-2"
        onClick={() => getSymptomData(dropdownIds.therapist)}
      >
        <label htmlFor="Other" className="font-w">
          Other therapist:
        </label>
        <Select
          ref={selectInputRef}
          components={{ Option: CustomOption }}
          options={options1}
          onChange={(e) => handleInputChange(e, "therapistList")}
        />
      </div>
      <div
        className="col-lg-6 mt-2"
        onClick={() => getSymptomData(dropdownIds.help)}
      >
        <label htmlFor="did" className="font-w">
          Did it help?
        </label>
        <Select
          ref={selectInputRef}
          components={{ Option: CustomOption }}
          options={options1}
          onChange={(e) => handleInputChange(e, "helpList")}
        />
      </div>

      <div className="col-lg-12 mt-5 text-end">
      </div>
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
                 <span style={{color:"red"}}>{errormsg}</span>
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

export default ConsultationDropDown;
