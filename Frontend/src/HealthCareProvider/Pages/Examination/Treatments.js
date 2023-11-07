import React, { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import { shoulderMussle } from "./data";
import Select from 'react-select';
// import { dropdownIds } from "../SystemSettings/data";
import { dropdownIds } from "../../../Pages/SystemSettings/data";
import toast from 'react-hot-toast';
import CreatableSelect from "react-select/creatable";
import moment from "moment";
import LeftLower from "../../../Assets/img/LeftLower.jpg";
import LeftLowerRightUpper from "../../../Assets/img/LeftLowerRightUpper.jpg";
import LeftLowerUpper from "../../../Assets/img/LeftLowerUpper.jpg";
import LeftUpper from "../../../Assets/img/LeftUpper.jpg";
import RightLower from "../../../Assets/img/RightLower.jpg";
import RightLowerLeftUpper from "../../../Assets/img/RightLowerLeftUpper.jpg";
import RightLowerUpper from "../../../Assets/img/RightLowerUpper.jpg";
import {
  generateName,
  CromNameBooleanFlx,
  CromNameBooleanLlb,
  CromNameBooleanProt,
  cromName,
} from "./additionalFunction";

// import { getAllAppontmentsApi, getOptionListApiById, getServiceByIdApi, postSlotApiData, updateSlotApiData } from "../../Apis";
import { getAllAppontmentsApi, getOptionListApiById, getProvidersDetails, getServiceByIdApi, postSlotApiData, updateSlotApiData } from "../../../Apis/healthcareProvider";
import { useFormik } from "formik";
import { appointmentValidation } from "../../Components/Schemas";
const Treatments = (props) => {
  const modal = document.getElementById("exampleModal");
  const { setFunction, step, formik4 } = props;
  const [render, setRender] = useState(true);
  const [allBookedSlots, setAllBookedSlots] = useState([]);
  const [viewImage, setViewImage] = useState("");
  const [imageName, setImageName] = useState();
  // const [patientList, setPatientList] = useState([]);
  // const [allServices, setAllServices] = useState([]);
  // const [allRooms, setAllRooms] = useState([]);
  const [optionData, setOptionData] = useState([])
  const [isEdit, setIsEdit] = useState(false);
  const [clrr, setClrr] = useState("#ffff");
  const [state, setState] = useState([])
  const handleShoulderMussle = () => {
    formik4?.values?.shoulderOption?.push({
      left: "",
      leftValue: "",
      right: "",
      rightValue: "",
    });
    formik4.setFieldValue("shoulderOption", formik4.values.shoulderOption);
    if (render) {
      setRender(false);
    } else {
      setRender(true);
    }
  };
  const { values, errors, touched, setValues, handleSubmit, handleChange, setFieldValue } =
    useFormik({
      initialValues: {
        patientName: "",
        serviceType: "",
        startTime: "",
        endTime: "",
        appointmentType: "",
        duration: "",
        room: "",
        repeat: "",
        id: ""
      },
      validationSchema: appointmentValidation,
      onSubmit: async (val) => {
        console.log(val, "VVVVLLLLL");
        let data = {
          patientId: val.patientName,
          serviceId: val.serviceType,
          roomId: val.room,
          startTime: val.startTime,
          endTime: val.endTime,
          appointmentType: val.appointmentType,
          appointmentFreq: val.repeat,
        };
        console.log(data, "?SADYFDFYDFYASYFYDAYFASYFASYDFYSYFSDYF");
        if (data) {

          const res = isEdit ? await updateSlotApiData({ ...data, id: values.id }) : await postSlotApiData(data);
          if (res.status === 200 || res.status === 201) {
            toast.success(res.data.message);
            modal.click();
            setClrr("#ffff")
            console.log(res, "response by post api")
            setIsEdit(false);
            getAllAppointments();
          }
        }
      },
    });


  const getAllAppointments = async () => {
    try {
      const res = await getAllAppontmentsApi();
      if (res.status === 200 || res.status === 201) {
        setAllBookedSlots(res.data?.appointment)
        console.log(res, "all apppontments")
      }
    } catch (Err) {
      console.log(Err)
    }
  }


  const getDuration = (a, b) => {
    console.log(a, b, "isididisei")
    if (a && b) {
      var ms = moment(b, "YYYY/MM/DD HH:mm").diff(moment(a, "YYYY/MM/DD HH:mm"));
      var d = moment.duration(ms);
      var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
      let sItem = s?.split(":")
      if (sItem[0].length === 1) {
        return "0" + s + " - " + "HH:MM:SS"
      } else {
        return s + " - " + "HH:MM:SS"
      }
    } else {
      return "00:00";
    }
  };
  const handleClrrChange = (e) => {
    let val;
    if (isEdit) {
      val = e;
    } else {
      val = e.target.value
    }
    setFieldValue("appointmentType", e.target.value);
    switch (val) {
      case "New":
        setClrr("#e71ae1");
        break;
      case "Reschedule":
        setClrr("#aac4e9");
        break;
      case "Cancelled":
        setClrr("#c5401d");
        break;
      case "Consultation":
        setClrr("#68b04c");
        break;
      case "Regular":
        setClrr("#d7bb58");
        break;
      default:
        setClrr("#ffff");
    }
  };
  const handleKinePosition = () => {
    formik4.values?.Kinesiotaping?.kinesiotapingPosition?.push({
      left: "",
      right: "",
    });
    formik4.setFieldValue(
      "kinesiotapingPosition",
      formik4.values.Kinesiotaping.kinesiotapingPosition
    );
    if (render) {
      setRender(false);
    } else {
      setRender(true);
    }
  };

  const handleInputChange = (e, name) => {
    console.log(e.value, "DDDDDDDDD", name);
    if(e.value === "Loading ....") return ; 
    formik4.setFieldValue(`${name}`, e.value);

  };

  const getSymptomData = async (id) => {
    setState([{
      name: "Loading ....",
      _id: ""
    }])
    setTimeout(async () => {
      if (id) {
        // setOptionId(id);
        try {
          const res = await getOptionListApiById(id);
          setState(res.data.allOptions)
        } catch (err) {
          console.log(err);
        }
      }
    }, 500);

  };
  const options1 =
    state
    && state?.map((el, i) => {
      let container = {};

      container["value"] = el?.name;
      container["label"] = el?.name;
      //   container["custom"] = true;

      return container;
    })


  const handleKinePositionSubtract = () => {
    // console.log(formik4,"jjjjj")
    if (formik4?.values?.Kinesiotaping?.kinesiotapingPosition?.length > 1) {
      // formik4?.values?.Kinesiotaping?.kinesiotapingPosition.splice(formik4?.values?.Kinesiotaping?.kinesiotapingPosition - 1, 1)
      formik4?.values?.Kinesiotaping?.kinesiotapingPosition.pop()
    }
    if (render) {
      setRender(false);
    } else {
      setRender(true);
    }
  };
  const handleAddShoulderSubtract = () => {
    console.log(formik4?.values?.shoulderOption, "jjjjj")
    if (formik4?.values?.shoulderOption?.length > 1) {
      // formik4?.values?.shoulderOption.splice(formik4?.values?.shoulderOption - 1, 1)
      formik4?.values?.shoulderOption.pop()
    }
    if (render) {
      setRender(false);
    } else {
      setRender(true);
    }
  };

  const handleFromSubmit = (e) => {
    console.log("gggg")
    e.preventDefault();
    if (setFunction != undefined) {
      setFunction(3)
    }
    formik4.handleSubmit();
  };


  const handleChangeCheckbox = (e, name) => {
    // "Kinesiotaping.name.tspine"
    // "Kinesiotaping.name.lspine"
    // Kinesiotaping.name.both
    console.log(formik4?.values, "666666666")

    if (name == "Kinesiotaping.name.tspine") {
      if (formik4?.values?.Kinesiotaping?.name?.tspine) {
        formik4.setFieldValue(`${name}`, false)
      } else {
        formik4.setFieldValue(`${name}`, e?.target?.checked)
        formik4.setFieldValue("Kinesiotaping.name.lspine", false)
        formik4.setFieldValue("Kinesiotaping.name.both", false)
      }
    } else if (name == "Kinesiotaping.name.lspine") {
      if (formik4?.values?.Kinesiotaping?.name?.lspine) {
        formik4.setFieldValue(`${name}`, false)
      } else {
        formik4.setFieldValue(`${name}`, e?.target?.checked)
        formik4.setFieldValue("Kinesiotaping.name.tspine", false)
        formik4.setFieldValue("Kinesiotaping.name.both", false)
      }
    } else if (name == "Kinesiotaping.name.both") {
      if (formik4?.values?.Kinesiotaping?.name?.both) {
        formik4.setFieldValue(`${name}`, false)
      } else {
        formik4.setFieldValue(`${name}`, e?.target?.checked)
        formik4.setFieldValue("Kinesiotaping.name.tspine", false)
        formik4.setFieldValue("Kinesiotaping.name.lspine", false)
      }
    }



  }


  const getDCData = async () => {
    const res = await getProvidersDetails();
    if (res.status === 200 || res.status === 201) {
      setOptionData(res?.data)
    }
    console.log(res, "responseeedfsdagfasdgsdf")
  }

  useEffect(() => {
    getDCData()
  }, [])


  useEffect(() => {
    if (
      props.formik1?.values?.SI?.position?.left &&
      // props.formik1?.values?.SI?.low &&
      props.formik1?.values?.ProneCrest?.position?.right
      // props.formik1?.values?.ProneCrest?.hieght
    ) {
      setViewImage(LeftLowerRightUpper);
      setImageName("Left Lower Right Upper");
    } else if (
      !props.formik1?.values?.SI?.position?.left &&
      !props.formik1?.values?.SI?.position?.right &&
      !props.formik1?.values?.ProneCrest?.position?.right &&
      !props.formik1?.values?.ProneCrest?.position?.left
    ){
      setImageName("");
      setViewImage("")

    }
    else if (
      props.formik1?.values?.SI?.position?.left &&
      // props.formik1?.values?.SI?.low &&
      props.formik1?.values?.ProneCrest?.position?.left 
      // props.formik1?.values?.ProneCrest?.hieght
    ) {
      setViewImage(LeftLowerUpper);
      setImageName("Left Lower Left Upper");
    } else if (
      props.formik1?.values?.SI?.position?.right &&
      // props.formik1?.values?.SI?.low &&
      props.formik1?.values?.ProneCrest?.position?.right 
      // props.formik1?.values?.ProneCrest?.hieght
    ) {
      setViewImage(RightLowerUpper);
      setImageName("Right Lower Right Upper");
    } else if (
      props.formik1?.values?.SI?.position?.right &&
      // props.formik1?.values?.SI?.low &&
      props.formik1?.values?.ProneCrest?.position?.left 
      // props.formik1?.values?.ProneCrest?.hieght
    ) {
      setViewImage(RightLowerLeftUpper);
      setImageName("Right Lower Left Upper");
    } else if (
      props.formik1?.values?.SI?.position?.left 
      // props.formik1?.values?.SI?.low
    ) {
      setViewImage(LeftLower);
      setImageName("Left Lower");
    } else if (
      props.formik1?.values?.SI?.position?.right 
      // props.formik1?.values?.SI?.low
    ) {
      setViewImage(RightLower);
      setImageName("Right Lower");
    } else {
      console.log("not active condition");
    }
  }, [props.formik1?.values?.SI?.position?.left,props.formik1?.values?.SI?.position?.right,
    props.formik1?.values?.ProneCrest?.position?.left,props.formik1?.values?.ProneCrest?.position?.right
  ]);
  console.log(props.formik1?.values, "%%%%%%%%%%^");
  return (
    <>
      <form onSubmit={formik4.handlSubmit}>

        <div className="row pb-4 pe-5 ps-5">

          {<div className="col-lg-6">
            <h4 className="mt-2 mb-2 bmc col-md-12 d-flex">
              <div className="d-flex align-items-center col-md-6" style={{fontSize: "20px"}}>BMC:
                <span className="text-danger mx-2">{imageName}</span>
              </div>
              <a href="#img" className="d-flex justify-content-end col-md-6">
               {viewImage? <img className="body-musle" src={viewImage} style={{ width: "18px" }} alt="reload" />:""}
              </a><a href="#" className="lightbox" id="img">
                <span><img src="/static/media/RightLowerUpper.afa34758de06fe4a82d4.jpg" />
                </span>
              </a>
            </h4>
          </div>}

          

          

          

          <div className="col-lg-6">
            <h4 className="mt-2 mb-2 bmc">
              <div className="d-flex align-items-center col-md-12 " style={{fontSize: "20px"}}>
                Cervical:
                <div className="row d-flex flex-row col-md-12">
                  <div className="col-md-4 text-start">
                    <p className="text-danger px-2">{CromNameBooleanFlx(props.formik1)}</p>
                  </div>
                  <div className="col-md-4">
                    <p className="text-danger  px-2">{CromNameBooleanLlb(props.formik1)}</p>
                  </div>
                  <div className="col-md-4">
                    <p className="text-danger px-2">{CromNameBooleanProt(props.formik1)}</p>
                  </div>
                </div>
              </div>
            </h4>
          </div>

          <div className="col-lg-6 ps-3 mt-2">
            <h4 className="bmc" style={{ textAlign: "left" }}>
              <div className="" style={{fontSize: "20px"}}>
                Sl:<span className="text-danger ms-2">{generateName(props.formik1)}</span>
              </div>
            </h4>
          </div>

          <div className="col-lg-6 mt-2">
            <h4 className="bmc">
              <div className="d-flex align-items-center col-md-12 ps-0" style={{fontSize: "20px"}}>
                TMJ:
                <div>
                  <span className="text-danger px-2">{props.formik1?.values?.TMJ.step1}</span>
                  <span className="text-danger px-2">{props.formik1?.values?.TMJ.step2}</span>
                  <span className="text-danger px-2">{props.formik1?.values?.TMJ.step3}</span>
                </div>
              </div>
            </h4>
          </div>

        </div>

        <div className="form-ttle">


          <span>Treatments</span>


        </div>
        <div className="row card-header pt-0">
          <div className="col-xl-6">
            <div className="">
              <table className="table table-borderless tb_td">
                <tbody>
                  <tr>
                    <th colspan="6" className="text-dark font-weight-bold">
                      <u>SHOULDER MUSCLE TREATMENT</u>
                    </th>
                  </tr>

                  <tr>
                    <td colspan="3" className="text-dark">
                      <b>Left</b>
                    </td>
                    <td colspan="3" className="text-dark">
                      <b>Right</b>
                    </td>
                  </tr>

                  {formik4.values?.shoulderOption?.map((val, i) => {
                    return (
                      <tr>
                        <td colspan="2">
                          <span onClick={() => getSymptomData(dropdownIds.SHOULDERMUSCLETESTS)}>
                            <CreatableSelect
                              name={`shoulderOption.${i}.left`}
                              value={{
                                label: formik4?.values?.shoulderOption?.left ? formik4?.values?.shoulderOption?.left : val?.left,
                                value: formik4?.values?.shoulderOption?.left ? formik4?.values?.shoulderOption?.left : val?.left,
                              }}
                              options={options1}
                              onChange={(e) => handleInputChange(e, `shoulderOption.${i}.left`)}
                              noOptionsMessage={() => "No Data Found"}
                            // loadOptions={options1}
                            />
                          </span>
                          {/* <select
                          name={`shoulderOption.${i}.left`}
                          value={formik4?.values?.shoulderOption?.left?formik4?.values?.shoulderOption?.left:val?.left}
                          onChange={formik4.handleChange}
                          id=""
                        >
                          <option value="">select</option>;
                          {shoulderMussle.map((v) => {
                            return <option value={v}>{v}</option>;
                          })}
                        </select> */}
                        </td>
                        <td>
                          <select className="pt-2 pb-2"
                            name={`shoulderOption.${i}.leftValue`}
                            value={formik4?.values?.shoulderOption?.leftValue ? formik4?.values?.shoulderOption?.leftValue : val?.leftValue}
                            onChange={formik4.handleChange}
                            id=""
                          >
                            <option value="">select</option>
                            <option value="AK">AK</option>
                            <option value="MA">MA</option>
                            <option value="AK/MA">AK/MA</option>
                          </select>
                        </td>
                        <td colspan="2">
                          <span onClick={() => getSymptomData(dropdownIds.SHOULDERMUSCLETESTS)}>
                            <CreatableSelect
                              name={`shoulderOption.${i}.right`}
                              value={{
                                label: formik4?.values?.shoulderOption?.right ? formik4?.values?.shoulderOption?.right : val?.right,
                                value: formik4?.values?.shoulderOption?.right ? formik4?.values?.shoulderOption?.right : val?.right,
                              }}
                              options={options1}
                              onChange={(e) => handleInputChange(e, `shoulderOption.${i}.right`)}
                              noOptionsMessage={() => "No Data Found"}
                            // loadOptions={options1}
                            />
                          </span>
                          {/* <select
                          name={`shoulderOption.${i}.right`}
                          value={formik4?.values?.shoulderOption?.right?formik4?.values?.shoulderOption?.right:val?.right}
                          onChange={formik4.handleChange}
                          id=""
                        >
                          <option value="">select</option>;
                          {shoulderMussle.map((v) => {
                            return <option value={v}>{v}</option>;
                          })}
                        </select> */}
                        </td>
                        <td>
                          <select className="pt-2 pb-2"
                            name={`shoulderOption.${i}.rightValue`}
                            value={formik4?.values?.shoulderOption?.rightValue ? formik4?.values?.shoulderOption?.rightValue : val?.rightValue}
                            onChange={formik4.handleChange}
                            id=""
                          >
                            <option value="">select</option>
                            <option value="AK">AK</option>
                            <option value="MA">MA</option>
                            <option value="AK/MA">AK/MA</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="d-flex">
                    <td
                      onClick={handleShoulderMussle}
                      className="text-dark font-weight-bold"
                    >
                      <span className="exam-td-add-btn" title="Add">
                        <i className="fa-solid fa-plus"></i>
                      </span>
                    </td>
                    <td
                      onClick={handleAddShoulderSubtract}
                      className="text-dark font-weight-bold"
                    >
                      <span className="exam-td-remove-btn" title="Remove">
                        <i className="fa-solid fa-xmark"></i>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="table-responsive">
              <table className="table table-borderless tb_td">
                <tbody>
                  <tr style={{ background: "#edf5fb" }}>
                    <td className="text-dark" style={{ width: "25%" }}>
                      <span className="me-2">
                        <b>Adj. Only</b>
                      </span>
                      <input
                        className="i-mb-0"
                        type="checkbox"
                        name="adjacent"
                        value={formik4.values.adjacent}
                        checked={formik4.values.adjacent}
                        onChange={formik4.handleChange}
                        id=""
                      />
                    </td>
                    <td colspan="" className="text-dark" style={{ width: "25%" }}>
                      <span className="me-2">
                        <b>Scoliosis</b>
                      </span>
                      <input
                        className="i-mb-0"
                        type="checkbox"
                        name="Scoliosis"
                        value={formik4.values.Scoliosis}
                        checked={formik4.values.Scoliosis}
                        onChange={formik4.handleChange}
                        id=""
                      />
                    </td>
                    <td colspan="" className="text-dark" style={{ width: "25%" }}>
                      <span className="me-2">
                        <b>Exam</b>
                      </span>
                      <input
                        className="i-mb-0"
                        type="checkbox"
                        name="exam"
                        value={formik4.values.exam}
                        checked={formik4.values.exam}
                        onChange={formik4.handleChange}
                        id=""
                      />
                    </td>
                    <td colspan="" className="text-dark" style={{ width: "25%" }}>
                      <span className="me-2">
                        <b>Distraction</b>
                      </span>
                      <input
                        className="i-mb-0"
                        type="checkbox"
                        name="Distraction"
                        value={formik4.values.Distraction}
                        checked={formik4.values.Distraction}
                        onChange={formik4.handleChange}
                        id=""
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="table-responsive">
              <table className="table table-borderless tb_td">
                <tbody>
                  <tr style={{ background: "#edf5fb" }}>
                    <td colspan="2"></td>
                    <td>
                      <b>Cervical</b>
                    </td>
                    <td>
                      <b>Lumbar</b>
                    </td>
                    <td>
                      <b>Thoracic</b>
                    </td>
                    <td>
                      <b>Extremity</b>
                    </td>
                  </tr>
                  <tr style={{ background: "#edf5fb" }}>
                    <td>
                      <b>DC</b>
                    </td>
                    <td colspan="">
                      <select
                        name="DC.name"
                        value={formik4.values.DC.name}
                        onChange={formik4.handleChange}
                        id=""
                      >
                        <option value="">select</option>
                        <option value={optionData?.filtered?.[0]?.salutation + " " + optionData?.filtered?.[0]?.firstName + " " + optionData?.filtered?.[0]?.lastName}>{optionData?.filtered?.[0]?.salutation + " " + optionData?.filtered?.[0]?.firstName + " " + optionData?.filtered?.[0]?.lastName}</option>
                        {
                          optionData?.allProviders?.map((v) => {
                            return <option value={`${v?.userId?.salutation} ${v?.userId?.firstName} ${v?.userId?.lastName}`}>{v?.userId?.salutation + " " + v?.userId?.firstName + " " + v?.userId?.lastName}</option>
                          })
                        }
                        {/* <option value="Chillson DC">Chillson DC</option>
                        <option value="Thomee HP">Thomee HP</option>
                        <option value="HP">HP</option>
                        <option value="DC">DC</option> */}

                      </select>
                    </td>
                    <td>
                      <select
                        name="DC.cervical"
                        value={formik4.values.DC.cervical}
                        onChange={formik4.handleChange}
                        id=""
                      >
                        <option value="">select</option>
                        <option value="Man"> Man</option>
                        <option value="Imp"> Imp</option>

                      </select>
                    </td>
                    <td>
                      <select
                        name="DC.lumber"
                        value={formik4.values.DC.lumber}
                        onChange={formik4.handleChange}
                        id=""
                      >
                        <option value="">select</option>
                        <option value="Man"> Man</option>
                        <option value="Imp"> Imp</option>
                      </select>
                    </td>
                    <td>
                      <select
                        name="DC.thoracic"
                        value={formik4.values.DC.thoracic}
                        onChange={formik4.handleChange}
                        id=""
                      >
                        <option value="">select</option>
                        <option value="Man"> Man</option>
                        <option value="Imp"> Imp</option>
                      </select>
                    </td>
                    <td>
                      <select
                        name="DC.extermity"
                        value={formik4.values.DC.extermity}
                        onChange={formik4.handleChange}
                        id=""
                      >
                        <option value="">select</option>
                        <option value="Man"> Man</option>
                        <option value="Imp"> Imp</option>
                      </select>
                    </td>
                  </tr>
                  <tr style={{ background: "#edf5fb" }}>
                    <td>
                      <b>HP</b>
                    </td>
                    <td colspan="">
                      <select
                        name="HP.name"
                        value={formik4.values.HP.name}
                        onChange={formik4.handleChange}
                        id=""
                      >
                        <option value="">select</option>
                        <option value={optionData?.filtered?.[0]?.salutation + " " + optionData?.filtered?.[0]?.firstName + " " + optionData?.filtered?.[0]?.lastName}>{optionData?.filtered?.[0]?.salutation + " " + optionData?.filtered?.[0]?.firstName + " " + optionData?.filtered?.[0]?.lastName}</option>
                        {
                          optionData?.allProviders?.map((v) => {
                            return <option value={`${v?.userId?.salutation} ${v?.userId?.firstName} ${v?.userId?.lastName}`}>{v?.userId?.salutation + " " + v?.userId?.firstName + " " + v?.userId?.lastName}</option>
                          })
                        }
                      </select>
                    </td>
                    <td>
                      <select
                        name="HP.cervical"
                        value={formik4.values.HP.cervical}
                        onChange={formik4.handleChange}
                        id=""
                      >
                        <option value="">select</option>
                        <option value="AK"> AK</option>
                        <option value="MA"> MA</option>
                        <option value="AK/MA"> AK/MA</option>
                      </select>
                    </td>
                    <td>
                      <select
                        name="HP.lumber"
                        value={formik4.values.HP.lumber}
                        onChange={formik4.handleChange}
                        id=""
                      >
                        <option value="">select</option>
                        <option value="AK"> AK</option>
                        <option value="MA"> MA</option>
                        <option value="AK/MA"> AK/MA</option>
                      </select>
                    </td>
                    <td>
                      <select
                        name="HP.thoracic"
                        value={formik4.values.HP.thoracic}
                        onChange={formik4.handleChange}
                        id=""
                      >
                        <option value="">select</option>
                        <option value="AK"> AK</option>
                        <option value="MA"> MA</option>
                        <option value="AK/MA"> AK/MA</option>
                      </select>
                    </td>
                    <td>
                      <select
                        name="HP.extermity"
                        value={formik4.values.HP.extermity}
                        onChange={formik4.handleChange}
                        id=""
                      >
                        <option value="">select</option>
                        <option value="AK"> AK</option>
                        <option value="MA"> MA</option>
                        <option value="AK/MA"> AK/MA</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="table-responsive">
              <table className="table table-borderless tb_td">
                <tbody>
                  <tr>
                    <th colspan="4" className="text-dark font-weight-bold">
                      <u>KINESIOTAPING AREA</u>
                    </th>
                  </tr>
                  <tr>
                    <td>
                      <span className="me-2">T spine</span>
                      <input
                        className="i-mb-0"
                        type="radio"
                        name="Kinesiotaping.name.tspine"
                        value={formik4?.values?.Kinesiotaping?.name?.tspine}
                        checked={formik4?.values?.Kinesiotaping?.name?.tspine}
                        // onChange={formik4.handleChange}
                        onClick={(e) => handleChangeCheckbox(e, "Kinesiotaping.name.tspine")}
                        id=""
                      />
                    </td>
                    <td>
                      <span className="me-2">L spine</span>
                      <input
                        className="i-mb-0"
                        type="radio"
                        name="Kinesiotaping.name.lspine"
                        value={formik4?.values?.Kinesiotaping?.name?.lspine}
                        checked={formik4?.values?.Kinesiotaping?.name?.lspine}
                        // onChange={formik4.handleChange}
                        onClick={(e) => handleChangeCheckbox(e, "Kinesiotaping.name.lspine")}

                        id=""
                      />
                    </td>
                    <td>
                      <span className="me-2">Both</span>
                      <input
                        className="i-mb-0"
                        type="radio"
                        name="Kinesiotaping.name.both"
                        value={formik4?.values?.Kinesiotaping?.name?.both}
                        checked={formik4?.values?.Kinesiotaping?.name?.both}
                        // onChange={formik4.handleChange}
                        onClick={(e) => handleChangeCheckbox(e, "Kinesiotaping.name.both")}
                        id=""
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="">
              <table className="table table-borderless tb_td">
                <tbody>
                  <tr>
                    <td
                      style={{ width: "50%" }}
                      colspan="2"
                      className="text-dark"
                    >
                      <b>Left</b>
                    </td>
                    <td colspan="2" className="text-dark">
                      <b>Right</b>
                    </td>
                  </tr>
                  {formik4?.values?.Kinesiotaping?.kinesiotapingPosition?.map(
                    (val, i) => {
                      return (
                        <tr>
                          <td colspan="2">
                            <span onClick={() => getSymptomData(dropdownIds.KINESIOTAPINGAREA)}>
                              <CreatableSelect
                                name={`Kinesiotaping.kinesiotapingPosition.${i}.left`}
                                value={{
                                  label: formik4?.values?.Kinesiotaping?.kinesiotapingPosition?.left ?
                                    formik4?.values?.Kinesiotaping?.kinesiotapingPosition?.left : val?.left,
                                  value: formik4?.values?.Kinesiotaping?.kinesiotapingPosition?.left ?
                                    formik4?.values?.Kinesiotaping?.kinesiotapingPosition?.left : val?.left,
                                }}
                                options={options1}
                                onChange={(e) => handleInputChange(e, `Kinesiotaping.kinesiotapingPosition.${i}.left`)}
                                noOptionsMessage={() => "No Data Found"}
                              // loadOptions={options1}
                              />
                            </span>
                            {/* <select
                            name={`Kinesiotaping.kinesiotapingPosition.${i}.left`}
                            value={
                              formik4?.values?.Kinesiotaping?.kinesiotapingPosition?.left?
                              formik4?.values?.Kinesiotaping?.kinesiotapingPosition?.left:val?.left }
                            onChange={formik4.handleChange}
                            id=""
                          >
                          <option value="">select</option>
                            <option value="Shoulder">Shoulder</option>
                            <option value="Elbow">Elbow</option>
                            <option value="Wrist">Wrist</option>
                            <option value="Neck">Neck</option>
                            <option value="T-Spine">T-Spine</option>
                            <option value="L-Spine">L-Spine</option>
                            <option value="Legs">Legs</option>
                            <option value="Knee">Knee</option>
                            <option value="Ankle">Ankle</option>
                            <option value="Arch of foot">Arch of foot</option>
                          </select> */}
                          </td>
                          <td colspan="2">
                            <span onClick={() => getSymptomData(dropdownIds.KINESIOTAPINGAREA)}>
                              <CreatableSelect
                                name={`Kinesiotaping.kinesiotapingPosition.${i}.right`}
                                value={{
                                  label: formik4?.values?.Kinesiotaping?.kinesiotapingPosition?.right ?
                                    formik4?.values?.Kinesiotaping?.kinesiotapingPosition?.right : val?.right,
                                  value: formik4?.values?.Kinesiotaping?.kinesiotapingPosition?.right ?
                                    formik4?.values?.Kinesiotaping?.kinesiotapingPosition?.right : val?.right,
                                }}
                                options={options1}
                                onChange={(e) => handleInputChange(e, `Kinesiotaping.kinesiotapingPosition.${i}.right`)}
                                noOptionsMessage={() => "No Data Found"}
                              // loadOptions={options1}
                              />
                            </span>
                            {/* <select
                            name={`Kinesiotaping.kinesiotapingPosition.${i}.right`}
                            value={
                              formik4?.values?.Kinesiotaping?.kinesiotapingPosition?.right?
                              formik4?.values?.Kinesiotaping?.kinesiotapingPosition?.right:
                              val?.right
                            }
                            onChange={formik4.handleChange}
                            id=""
                          >
                          <option value="">select</option>
                            <option value="Shoulder">Shoulder</option>
                            <option value="Elbow">Elbow</option>
                            <option value="Wrist">Wrist</option>
                            <option value="Neck">Neck</option>
                            <option value="T-Spine">T-Spine</option>
                            <option value="L-Spine">L-Spine</option>
                            <option value="Legs">Legs</option>
                            <option value="Knee">Knee</option>
                            <option value="Ankle">Ankle</option>
                            <option value="Arch of foot">Arch of foot</option>
                          </select> */}
                          </td>
                        </tr>
                      );
                    }
                  )}

                  <tr className="d-flex">
                    <td
                      onClick={handleKinePosition}
                      className="text-dark font-weight-bold"
                    >
                      <span className="exam-td-add-btn" title="Add">
                        <i className="fa-solid fa-plus"></i>
                      </span>
                    </td>
                    <td onClick={handleKinePositionSubtract} className="text-dark font-weight-bold">
                      <span className="exam-td-remove-btn" title="Remove">
                        <i className="fa-solid fa-xmark"></i>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <table className="table table-borderless tb_td">
              <tbody>
                <tr>
                  <th className="text-dark font-weight-bold">
                    <u>TREATMENT PLAN</u>
                  </th>
                </tr>
                <tr>
                  <td className="text-dark font-weight-bold">
                    Treatment Frequency
                  </td>
                </tr>
                <tr>
                <td width="50%" scope="col">
                    <span onClick={() => getSymptomData(dropdownIds.TREATMENTPLAN)}>
                      <Select
                        name="Kinesiotaping.treatmentPlan.asNeed"
                        value={{
                          label: formik4?.values?.Kinesiotaping?.treatmentPlan?.asNeed,
                          value: formik4?.values?.Kinesiotaping?.treatmentPlan?.asNeed,
                        }}
                        options={options1}
                        onChange={(e) => handleInputChange(e, "Kinesiotaping.treatmentPlan.asNeed")}
                        noOptionsMessage={() => "No Data Found"}
                      // loadOptions={options1}
                      />
                    </span>
                    {/* <select
                      className="i-mb-0"
                      
                      name="Kinesiotaping.treatmentPlan.asNeed"
                      value={
                        formik4?.values?.Kinesiotaping?.treatmentPlan?.asNeed
                      }
                      onChange={formik4.handleChange}
                      
                    >
                      <option value="">select</option>
                      <option value="3X per week">3X per week</option>
                      <option value="Twice per week">Twice per week</option>
                      <option value="Once per week">Once per week</option>
                      <option value="Once per 2 weeks">Once per 2 weeks</option>
                      <option value="Once per 3 Weeks">Once per 3 Weeks</option>
                      <option value="Once per month">Once per month</option>
                      <option value="Once per 2 Months">Once per 2 Months</option>
                      <option value="Once per quarter">Once per quarter</option>
                      <option value="Twice per Year">Twice per Year</option>
                      <option value="As Needed">As Needed</option>
                      <option value="Dismissed">Dismissed</option>
                    </select> */}
                  </td>
                  <td scope="col">
                      <select
                        style={{ width: "auto" }}
                        name="Kinesiotaping.treatmentFrequency.treatmentRight"
                        value={
                          formik4?.values?.Kinesiotaping?.treatmentFrequency
                            ?.treatmentRight
                        }
                        onChange={formik4.handleChange}
                        id=""
                      >
                        <option value="">select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </td>

                    <td scope="col">
                      <span className="font-weight-bold me-2">Per</span>
                      {
                        formik4?.values?.Kinesiotaping?.treatmentFrequency?.treatmentRight==1?
                      <select
                        style={{ width: "auto" }}
                        name="Kinesiotaping.treatmentFrequency.frequency"
                        value={
                          formik4?.values?.Kinesiotaping?.treatmentFrequency
                            ?.frequency
                        }
                        onChange={formik4.handleChange}
                        id=""
                      >
                        <option value="">select</option>
                        <option value="Week">Week</option>
                        <option value="Month">Month</option>
                        <option value="Year">Year</option>
                        </select>:<select
                        style={{ width: "auto" }}
                        name="Kinesiotaping.treatmentFrequency.frequency"
                        value={
                          formik4?.values?.Kinesiotaping?.treatmentFrequency
                            ?.frequency
                        }
                        onChange={formik4.handleChange}
                        id=""
                      >
                        <option value="">select</option>
                        <option value="Weeks">Weeks</option>
                        <option value="Months">Months</option>
                        <option value="Years">Years</option>
                        </select>
                      }
                    </td>
                </tr>                
              </tbody>
            </table>
            <div className="table-responsive">
              <table className="table table-borderless tb_td">
                <tbody>
                  <tr>
                  <td className="text-dark font-weight-bold">
                    Duration
                  </td>
                  </tr>
                 
                  <tr>        
 {/* //treatmentLeft */}
                    <td width="25%">                      
                      <span className="font-weight-bold me-2">For</span>

                      <input style={{border:"1px solid black" , width:"100px"}} type="number" name="Kinesiotaping.treatmentFrequency.treatmentLeft"
                      value={
                        formik4?.values?.Kinesiotaping?.treatmentFrequency
                          ?.treatmentLeft
                      }
                      onChange={formik4.handleChange}  />
                      {/* <select
                      name="Kinesiotaping.treatmentFrequency.treatmentLeft"
                      value={
                        formik4?.values?.Kinesiotaping?.treatmentFrequency
                          ?.treatmentLeft
                      }
                      onChange={formik4.handleChange}
                       style={{ width: "auto" }}>
                        <option value="">select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select> */}
                    </td>
                    <td width="25%">
                        {
                          formik4?.values?.Kinesiotaping?.treatmentFrequency
                          ?.treatmentLeft==1?
                      <select
                        style={{ width: "auto" }}
                        name="Kinesiotaping.treatmentFrequency.duration"
                        value={
                          formik4?.values?.Kinesiotaping?.treatmentFrequency
                            ?.duration
                        }
                        onChange={formik4.handleChange}
                        id=""
                      >
                        <option value="">select</option>
                        <option value="Week">Week</option>
                        <option value="Month">Month</option>
                        <option value="Year">Year</option>
                      </select>:
                       <select
                       style={{ width: "auto" }}
                       name="Kinesiotaping.treatmentFrequency.duration"
                       value={
                         formik4?.values?.Kinesiotaping?.treatmentFrequency
                           ?.duration
                       }
                       onChange={formik4.handleChange}
                       id=""
                     >
                       <option value="">select</option>
                       <option value="Weeks">Weeks</option>
                       <option value="Months">Months</option>
                       <option value="Years">Years</option>
                     </select>
                        }
                    </td>
                    <td width="25%"></td>
                    <td width="25%"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="table-responsive-md">
              <table className="table table-borderless tb_td">
                <tbody>
                  <tr>
                    <th colspan="4" className="text-dark font-weight-bold">
                      Next Appointment
                    </th>
                  </tr>
                  <tr>

                    {/* <td>
                    <input
                      className="p-0"
                      type="date"
                      name="Kinesiotaping.nextAppointments.first"
                      value={
                        formik4?.values?.Kinesiotaping?.nextAppointments?.first
                      }
                      onChange={formik4.handleChange}
                      id=""
                    />
                  </td>
                  <td>
                    <input
                      className="p-0"
                      type="date"
                      name="Kinesiotaping.nextAppointments.second"
                      value={
                        formik4?.values?.Kinesiotaping?.nextAppointments?.second
                      }
                      onChange={formik4.handleChange}
                      id=""
                    />
                  </td>
                  <td>
                    <input
                      className="p-0"
                      type="date"
                      name="Kinesiotaping.nextAppointments.third"
                      value={
                        formik4?.values?.Kinesiotaping?.nextAppointments?.third
                      }
                      onChange={formik4.handleChange}
                      id=""
                    />
                  </td> */}
                  </tr>

                </tbody>
              </table>
              <button type="button" className="btn btn-primary border-base d-flex"
                data-bs-toggle="modal" data-bs-target={props.visit === "true" ? "#appointment" : "#exampleModal"} style={{ cursor: "pointer" }}>
                Add Appointment
              </button>
            </div>
          </div>


        </div>

        <div className="d-flex justify-content-end">
          <button
            type="submit"
            // name="next"
            className="btn btn-primary m-3"
            onClick={handleFromSubmit}
          // value="Submit"
          >
            Submit
          </button>
        </div>


      </form>
      {/* <div
   
   className="modal fade"
   id="exampleModal"
   tabindex="-1"
   aria-labelledby="exampleModalLabel"
   aria-hidden="true"
 >
   <div className="modal-dialog modal-lg modal-dialog-centered">
     <div className="modal-content">
       <div className="modal-header">
         <h4 className="modal-title fs-5" id="exampleModalLabel">
           New Appointment
         </h4>
         <button
           style={{ fontSize: ".7rem" }}
           type="button"
           className="btn-close"
           data-bs-dismiss="modal"
           aria-label="Close"
           // onClick={handleCloseEditModal}
         ></button>
       </div>
       <hr style={{ marginBottom: "0px" }} />
       
     </div>
   </div>
 </div> */}

    </>
  );
};



export default Treatments;
