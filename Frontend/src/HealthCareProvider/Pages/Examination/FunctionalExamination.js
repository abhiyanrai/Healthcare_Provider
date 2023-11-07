import React, { useState, useEffect } from "react";
import { degree, shoulderMussle } from "./data";
import LeftLower from "../../../Assets/img/LeftLower.jpg";
import LeftLowerRightUpper from "../../../Assets/img/LeftLowerRightUpper.jpg";
import LeftLowerUpper from "../../../Assets/img/LeftLowerUpper.jpg";
import LeftUpper from "../../../Assets/img/LeftUpper.jpg";
import RightLower from "../../../Assets/img/RightLower.jpg";
import RightLowerLeftUpper from "../../../Assets/img/RightLowerLeftUpper.jpg";
import RightLowerUpper from "../../../Assets/img/RightLowerUpper.jpg";
import RightUpper from "../../../Assets/img/RightUpper.jpg";
import Select from 'react-select';
import CreatableSelect from "react-select/creatable";
import { useRef } from "react";
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

const FunctionalExamination = (props) => {
  const { setFunction, step, formik1 } = props;
  // console.log(props, "========");
  const [render, setRender] = useState(true);
  const [state, setState] = useState([]);
  const [viewImage, setViewImage] = useState("");
  const [imageName, setImageName] = useState();
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const handleAddShoulderMusle = () => {
    formik1.values.shoulderForm?.push({
      testName: "",
      left: "",
      Pn: false,
      right: "",
      Rn: false,
    });
    if (render) {
      setRender(false);
    } else {
      setRender(true);
    }
  };

  const handleInputChange = (e, name) => {
    console.log(e.value, "DDDDDDDDD", name);
    if(e.value === "Loading ....") return ;
    formik1.setFieldValue(`${name}`, e.value);
  };

  const getSymptomData = async (id) => {
    setState([{
      name : "Loading ....",
      _id : ""}])
      setTimeout(async() => {
        if (id) {
          // setOptionId(id);
          try {
            const res = await getOptionListApiById(id);
            setState(res.data.allOptions);
          } catch (err) {
            console.log(err);
          }
        }
      }, 500);
    
  };
  const openImageViewer =()=>{
    setIsViewerOpen(true);
  }
  const options1 =
    state &&
    state?.map((el, i) => {
      let container = {};

      container["value"] = el?.name;
      container["label"] = el?.name;
      //   container["custom"] = true;

      return container;
    });
  console.log(formik1.values, "DSFDSFDSFSDFSDAFSADF");
  const messagesEndRef = useRef(null);

  // const scrollToBottom = () => {
  //   setTimeout(()=>{
  //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  //   },500)
  
  //   // window.scrollTo(0, document.body.scrollHeight);
  // //   window.scrollTo({
  // //     top: 0,
  // //     behavior: 'smooth',
  // // });
  // };
  const handleAddShoulderSubtract = () => {
    // console.log(formik1?.values?.shoulderForm,"jjjjj")
    if (formik1?.values?.shoulderForm?.length > 1) {
      // formik1?.values?.shoulderForm.splice(
      //   formik1?.values?.shoulderForm - 1,
      //   1
      // );
      formik1?.values?.shoulderForm.pop();
    }

    if (formik1?.values?.shoulderForm?.length == 1) {
      formik1?.values?.shoulderForm.splice(
        0,
        formik1?.values?.shoulderForm?.length
      );
      shoulderMussle.forEach((element, index) => {
        if (formik1.values.shoulderForm?.length < 15) {
          formik1.values.shoulderForm?.push({
            testName: "",
            left: "",
            Pn: false,
            right: "",
            Rn: false,
          });
        }
      });
      formik1?.values?.shoulderForm.splice(
        1,
        formik1?.values?.shoulderForm?.length
      );
    }
    if (render) {
      setRender(false);
    } else {
      setRender(true);
    }
  };
  const handleFromSubmit = (e) => {
    e.preventDefault();
    formik1.handleSubmit();
  };


  const handleSiChagne = (e, name) => {
    if (name == "SI.position.left") {
      if (formik1?.values?.SI?.position?.left) {
        formik1.setFieldValue(`${name}`, false);
      } else {
        formik1.setFieldValue(`${name}`, e.target.checked);
        formik1.setFieldValue("SI.position.right", false);
      }
    } else if (name == "SI.position.right") {
      if (formik1?.values?.SI?.position?.right) {
        formik1.setFieldValue(`${name}`, false);
      } else {
        formik1.setFieldValue(`${name}`, e.target.checked);
        formik1.setFieldValue("SI.position.left", false);
      }
    } else if (name == "ProneCrest.position.left") {
      if (formik1?.values?.ProneCrest?.position?.left) {
        formik1.setFieldValue(`${name}`, false);
      } else {
        formik1.setFieldValue(`${name}`, e.target.checked);
        formik1.setFieldValue("ProneCrest.position.right", false);
      }
    } else if (name == "ProneCrest.position.right") {
      if (formik1?.values?.ProneCrest?.position?.right) {
        formik1.setFieldValue(`${name}`, false);
      } else {
        formik1.setFieldValue(`${name}`, e.target.checked);
        formik1.setFieldValue("ProneCrest.position.left", false);
      }
    } else if (name == "Adams.FixedSI.position.left") {
      if (formik1?.values?.Adams?.FixedSI?.position?.left) {
        formik1.setFieldValue(`${name}`, false);
      } else {
        formik1.setFieldValue(`${name}`, e.target.checked);
        formik1.setFieldValue("Adams.FixedSI.position.right", false);
      }
    } else if (name == "Adams.FixedSI.position.right") {
      if (formik1?.values?.Adams?.FixedSI?.position?.right) {
        formik1.setFieldValue(`${name}`, false);
      } else {
        formik1.setFieldValue(`${name}`, e.target.checked);
        formik1.setFieldValue("Adams.FixedSI.position.left", false);
      }
    } else if (name == "Adams.Free.position.left") {
      if (formik1?.values?.Adams?.Free?.position?.left) {
        formik1.setFieldValue(`${name}`, false);
      } else {
        formik1.setFieldValue(`${name}`, e.target.checked);
        formik1.setFieldValue("Adams.Free.position.right", false);
      }
    } else if (name == "Adams.Free.position.right") {
      if (formik1?.values?.Adams?.Free?.position?.right) {
        formik1.setFieldValue(`${name}`, false);
      } else {
        formik1.setFieldValue(`${name}`, e.target.checked);
        formik1.setFieldValue("Adams.Free.position.left", false);
      }
    } else if (name == "Adams.Lumb.position.left") {
      if (formik1?.values?.Adams?.Lumb?.position?.left) {
        formik1.setFieldValue(`${name}`, false);
      } else {
        formik1.setFieldValue(`${name}`, e.target.checked);
        formik1.setFieldValue("Adams.Lumb.position.right", false);
      }
    } else if (name == "Adams.Lumb.position.right") {
      if (formik1?.values?.Adams?.Lumb?.position?.right) {
        formik1.setFieldValue(`${name}`, false);
      } else {
        formik1.setFieldValue(`${name}`, e.target.checked);
        formik1.setFieldValue("Adams.Lumb.position.left", false);
      }
    } else if (name == "Adams.Thor.position.left") {
      if (formik1?.values?.Adams?.Thor?.position?.left) {
        formik1.setFieldValue(`${name}`, false);
      } else {
        formik1.setFieldValue(`${name}`, e.target.checked);
        formik1.setFieldValue("Adams.Thor.position.right", false);
      }
    } else if (name == "Adams.Thor.position.right") {
      if (formik1?.values?.Adams?.Thor?.position?.right) {
        formik1.setFieldValue(`${name}`, false);
      } else {
        formik1.setFieldValue(`${name}`, e.target.checked);
        formik1.setFieldValue("Adams.Thor.position.left", false);
      }
      // flx and ext
    } else if (name == "Crom.FLX.Dec") {
      if (formik1?.values?.Crom?.FLX?.Dec) {
        formik1.setFieldValue(`${name}`, false);
      } else {
        formik1.setFieldValue(`${name}`, e.target.checked);
        formik1.setFieldValue("Crom.FLX.Normal", false);
        formik1.setFieldValue("Crom.FLX.Inc", false);
        // formik1.setFieldValue("Crom.EXT.Normal", false);
        // formik1.setFieldValue("Crom.EXT.Inc", false);
        // formik1.setFieldValue("Crom.EXT.Dec", false);
      }
    } else if (name == "Crom.FLX.Normal") {
      if (formik1?.values?.Crom?.FLX?.Normal) {
        formik1.setFieldValue(`${name}`, false);
      } else {
        formik1.setFieldValue(`${name}`, e.target.checked);
        formik1.setFieldValue("Crom.FLX.Dec", false);
        formik1.setFieldValue("Crom.FLX.Inc", false);
        // formik1.setFieldValue("Crom.EXT.Normal", false);
        // formik1.setFieldValue("Crom.EXT.Inc", false);
        // formik1.setFieldValue("Crom.EXT.Dec", false);
      }
    } else if (name == "Crom.FLX.Inc") {
      if (formik1?.values?.Crom?.FLX?.Inc) {
        formik1.setFieldValue(`${name}`, false);
      } else {
        formik1.setFieldValue(`${name}`, e.target.checked);
        formik1.setFieldValue("Crom.FLX.Dec", false);
        formik1.setFieldValue("Crom.FLX.Normal", false);
        // formik1.setFieldValue("Crom.EXT.Normal", false);
        // formik1.setFieldValue("Crom.EXT.Inc", false);
        // formik1.setFieldValue("Crom.EXT.Dec", false);
      }
    } else if (name == "Crom.EXT.Dec") {
      if (formik1?.values?.Crom?.EXT?.Dec) {
        formik1.setFieldValue(`${name}`, false);
      } else {
        formik1.setFieldValue(`${name}`, e.target.checked);
        formik1.setFieldValue("Crom.EXT.Normal", false);
        formik1.setFieldValue("Crom.EXT.Inc", false);
        // formik1.setFieldValue("Crom.FLX.Normal", false);
        // formik1.setFieldValue("Crom.FLX.Inc", false);
        // formik1.setFieldValue("Crom.FLX.Dec", false);
      }
    } else if (name == "Crom.EXT.Normal") {
      if (formik1?.values?.Crom?.EXT?.Normal) {
        formik1.setFieldValue(`${name}`, false);
      } else {
        formik1.setFieldValue(`${name}`, e.target.checked);
        formik1.setFieldValue("Crom.EXT.Dec", false);
        formik1.setFieldValue("Crom.EXT.Inc", false);
        // formik1.setFieldValue("Crom.FLX.Normal", false);
        // formik1.setFieldValue("Crom.FLX.Inc", false);
        // formik1.setFieldValue("Crom.FLX.Dec", false);
      }
    } else if (name == "Crom.EXT.Inc") {
      if (formik1?.values?.Crom?.EXT?.Inc) {
        formik1.setFieldValue(`${name}`, false);
      } else {
        formik1.setFieldValue(`${name}`, e.target.checked);
        formik1.setFieldValue("Crom.EXT.Dec", false);
        formik1.setFieldValue("Crom.EXT.Normal", false);
        // formik1.setFieldValue("Crom.FLX.Normal", false);
        // formik1.setFieldValue("Crom.FLX.Inc", false);
        // formik1.setFieldValue("Crom.FLX.Dec", false);
      }
    }
    // rlb and llb
    else if (name == "Crom.RLB.Dec") {
      if (formik1?.values?.Crom?.RLB?.Dec) {
        formik1.setFieldValue(`${name}`, false);
      } else {
        formik1.setFieldValue(`${name}`, e.target.checked);
        formik1.setFieldValue("Crom.RLB.Normal", false);
        formik1.setFieldValue("Crom.RLB.Inc", false);
        // formik1.setFieldValue("Crom.LLB.Normal", false);
        // formik1.setFieldValue("Crom.LLB.Inc", false);
        // formik1.setFieldValue("Crom.LLB.Dec", false);
      }
    } else if (name == "Crom.RLB.Normal") {
      if (formik1?.values?.Crom?.RLB?.Normal) {
        formik1.setFieldValue(`${name}`, false);
      } else {
        formik1.setFieldValue(`${name}`, e.target.checked);
        formik1.setFieldValue("Crom.RLB.Dec", false);
        formik1.setFieldValue("Crom.RLB.Inc", false);
        // formik1.setFieldValue("Crom.LLB.Normal", false);
        // formik1.setFieldValue("Crom.LLB.Inc", false);
        // formik1.setFieldValue("Crom.LLB.Dec", false);
      }
    } else if (name == "Crom.RLB.Inc") {
      if (formik1?.values?.Crom?.RLB?.Inc) {
        formik1.setFieldValue(`${name}`, false);
      } else {
        formik1.setFieldValue(`${name}`, e.target.checked);
        formik1.setFieldValue("Crom.RLB.Dec", false);
        formik1.setFieldValue("Crom.RLB.Normal", false);
        // formik1.setFieldValue("Crom.LLB.Normal", false);
        // formik1.setFieldValue("Crom.LLB.Inc", false);
        // formik1.setFieldValue("Crom.LLB.Dec", false);
      }
    } else if (name == "Crom.LLB.Dec") {
      if (formik1?.values?.Crom?.LLB?.Dec) {
        formik1.setFieldValue(`${name}`, false);
      } else {
        formik1.setFieldValue(`${name}`, e.target.checked);
        formik1.setFieldValue("Crom.LLB.Normal", false);
        formik1.setFieldValue("Crom.LLB.Inc", false);
        // formik1.setFieldValue("Crom.RLB.Normal", false);
        // formik1.setFieldValue("Crom.RLB.Inc", false);
        // formik1.setFieldValue("Crom.RLB.Dec", false);
      }
    } else if (name == "Crom.LLB.Normal") {
      if (formik1?.values?.Crom?.LLB?.Normal) {
        formik1.setFieldValue(`${name}`, false);
      } else {
        formik1.setFieldValue(`${name}`, e.target.checked);
        formik1.setFieldValue("Crom.LLB.Dec", false);
        formik1.setFieldValue("Crom.LLB.Inc", false);
        // formik1.setFieldValue("Crom.RLB.Normal", false);
        // formik1.setFieldValue("Crom.RLB.Inc", false);
        // formik1.setFieldValue("Crom.RLB.Dec", false);
      }
    } else if (name == "Crom.LLB.Inc") {
      if (formik1?.values?.Crom?.LLB?.Inc) {
        formik1.setFieldValue(`${name}`, false);
      } else {
        formik1.setFieldValue(`${name}`, e.target.checked);
        formik1.setFieldValue("Crom.LLB.Dec", false);
        formik1.setFieldValue("Crom.LLB.Normal", false);
        // formik1.setFieldValue("Crom.RLB.Normal", false);
        // formik1.setFieldValue("Crom.RLB.Inc", false);
        // formik1.setFieldValue("Crom.RLB.Dec", false);
      }
    } else if (name == "Crom.PROT.Dec") {
      if (formik1?.values?.Crom?.PROT?.Dec) {
        formik1.setFieldValue(`${name}`, false);
      } else {
        formik1.setFieldValue(`${name}`, e.target.checked);
        formik1.setFieldValue("Crom.PROT.Normal", false);
        formik1.setFieldValue("Crom.PROT.Inc", false);
        // formik1.setFieldValue("Crom.LROT.Normal", false);
        // formik1.setFieldValue("Crom.LROT.Inc", false);
        // formik1.setFieldValue("Crom.LROT.Dec", false);
      }
    } else if (name == "Crom.PROT.Normal") {
      if (formik1?.values?.Crom?.PROT?.Normal) {
        formik1.setFieldValue(`${name}`, false);
      } else {
        formik1.setFieldValue(`${name}`, e.target.checked);
        formik1.setFieldValue("Crom.PROT.Dec", false);
        formik1.setFieldValue("Crom.PROT.Inc", false);
        // formik1.setFieldValue("Crom.LROT.Normal", false);
        // formik1.setFieldValue("Crom.LROT.Inc", false);
        // formik1.setFieldValue("Crom.LROT.Dec", false);
      }
    } else if (name == "Crom.PROT.Inc") {
      if (formik1?.values?.Crom?.PROT?.Inc) {
        formik1.setFieldValue(`${name}`, false);
      } else {
        formik1.setFieldValue(`${name}`, e.target.checked);
        formik1.setFieldValue("Crom.PROT.Dec", false);
        formik1.setFieldValue("Crom.PROT.Normal", false);
        // formik1.setFieldValue("Crom.LROT.Normal", false);
        // formik1.setFieldValue("Crom.LROT.Inc", false);
        // formik1.setFieldValue("Crom.LROT.Dec", false);
      }
    } else if (name == "Crom.LROT.Dec") {
      if (formik1?.values?.Crom?.LROT?.Dec) {
        formik1.setFieldValue(`${name}`, false);
      } else {
        formik1.setFieldValue(`${name}`, e.target.checked);
        formik1.setFieldValue("Crom.LROT.Normal", false);
        formik1.setFieldValue("Crom.LROT.Inc", false);
        // formik1.setFieldValue("Crom.PROT.Normal", false);
        // formik1.setFieldValue("Crom.PROT.Inc", false);
        // formik1.setFieldValue("Crom.PROT.Dec", false);
      }
    } else if (name == "Crom.LROT.Normal") {
      if (formik1?.values?.Crom?.LROT?.Normal) {
        formik1.setFieldValue(`${name}`, false);
      } else {
        formik1.setFieldValue(`${name}`, e.target.checked);
        formik1.setFieldValue("Crom.LROT.Dec", false);
        formik1.setFieldValue("Crom.LROT.Inc", false);
        // formik1.setFieldValue("Crom.PROT.Normal", false);
        // formik1.setFieldValue("Crom.PROT.Inc", false);
        // formik1.setFieldValue("Crom.PROT.Dec", false);
      }
    } else if (name == "Crom.LROT.Inc") {
      if (formik1?.values?.Crom?.LROT?.Inc) {
        formik1.setFieldValue(`${name}`, false);
      } else {
        formik1.setFieldValue(`${name}`, e.target.checked);
        formik1.setFieldValue("Crom.LROT.Dec", false);
        formik1.setFieldValue("Crom.LROT.Normal", false);
        // formik1.setFieldValue("Crom.PROT.Normal", false);
        // formik1.setFieldValue("Crom.PROT.Inc", false);
        // formik1.setFieldValue("Crom.PROT.Dec", false);
      }
    } else {
      formik1.setFieldValue(`${name}`, e.target.checked);
    }
    if (render) {
      setRender(false);
    } else {
      setRender(true);
    }
  };

  useEffect(() => {
    if (
      formik1?.values?.SI?.position?.left &&
      // formik1?.values?.SI?.low &&
      formik1?.values?.ProneCrest?.position?.right 
      // formik1?.values?.ProneCrest?.hieght
    ) {
      setViewImage(LeftLowerRightUpper);
      setImageName("Left Lower Right Upper");
    } else if (
      !formik1?.values?.SI?.position?.left &&
      !formik1?.values?.SI?.position?.right &&
      !formik1?.values?.ProneCrest?.position?.right &&
      !formik1?.values?.ProneCrest?.position?.left
    ){
      setImageName("");
      setViewImage("")

    }
    else if (
      formik1?.values?.SI?.position?.left &&
      // formik1?.values?.SI?.low &&
      formik1?.values?.ProneCrest?.position?.left 
      // formik1?.values?.ProneCrest?.hieght
    ) {
      setViewImage(LeftLowerUpper);
      setImageName("Left Lower Left Upper");
    } else if (
      formik1?.values?.SI?.position?.right &&
      // formik1?.values?.SI?.low &&
      formik1?.values?.ProneCrest?.position?.right
      // formik1?.values?.ProneCrest?.hieght
    ) {
      setViewImage(RightLowerUpper);
      setImageName("Right Lower Right Upper");
    } else if (
      formik1?.values?.SI?.position?.right &&
      // formik1?.values?.SI?.low &&
      formik1?.values?.ProneCrest?.position?.left 
      // formik1?.values?.ProneCrest?.hieght
    ) {
      setViewImage(RightLowerLeftUpper);
      setImageName("Right Lower Left Upper");
    } else if (
      formik1?.values?.SI?.position?.left 
      // formik1?.values?.SI?.low
    ) {
      setViewImage(LeftLower);
      setImageName("Left Lower");
    } else if (
      formik1?.values?.SI?.position?.right &&
      formik1?.values?.SI?.low
    ) {
      setViewImage(RightLower);
      setImageName("Right Lower");
    } else {
      console.log("not active condition");
    }
  }, [render]);

  const handleSelctCm = (e)=>{
    formik1.setFieldValue("SI.cm",e.target.value);
    document.getElementById("defred").removeAttribute("class");
  }
  const handleSelectPCm = (e)=>{
    formik1.setFieldValue("ProneCrest.cm",e.target.value)
    document.getElementById("defreds").removeAttribute("class");
  }
  const handleEventList = (e) => {
    if (e.target.checked) {
      formik1?.values?.shoulderForm.splice(
        0,
        formik1?.values?.shoulderForm?.length
      );
      shoulderMussle.forEach((element, index) => {
        if (formik1.values.shoulderForm?.length < 15) {
          formik1.values.shoulderForm?.push({
            testName: `${element}`,
            left: 5,
            Pn: false,
            right: 5,
            Rn: false,
          });
        }
      });
     
    } else {
      if (formik1?.values?.shoulderForm?.length > 1) {
        formik1?.values?.shoulderForm.splice(
          0,
          formik1?.values?.shoulderForm?.length
        );
        shoulderMussle.forEach((element, index) => {
          if (formik1.values.shoulderForm?.length < 15) {
            formik1.values.shoulderForm?.push({
              testName: "",
              left: "",
              Pn: false,
              right: "",
              Rn: false,
            });
          }
        });
        formik1?.values?.shoulderForm.splice(
          1,
          formik1?.values?.shoulderForm?.length
        );
      }
    }
  setRender(!render);
  // scrollToBottom()
  };

  return (
    <>
      <form onSubmit={formik1.handleSubmit}>
        <div className="form-ttle">Functional Examination</div>
        <div className="form-card card-header pt-0">
          <div className="row">
            <div className="col-xl-7">
              <div className="table-responsive-md">
                <table
                  className="table table-borderless tb_td"
                  style={{ width: "100%" }}
                >
                  <tbody>
                    <tr>
                      <td
                        colspan="5"
                        className="font-weight-bold text-underline text-dark"
                      >
                        STANDINGS CREST / SI
                      </td>
                      <td
                        colspan="4"
                        className="font-weight-bold text-underline text-dark"
                      >
                        PRONE CREST
                      </td>
                    </tr>
                    <tr>
                      <th>Low</th>
                      <th>Left</th>
                      <th>Right</th>
                      <th>Cm</th>
                      <th></th>
                      <th>High</th>
                      <th>Left</th>
                      <th>Right</th>
                      <th>Cm</th>
                    </tr>
                    <tr>
                      {/* si fields  */}
                      <td>
                        <input
                          className="i-mb-0 "
                          style={{display: "none"}}
                          type="checkbox"
                          name="SI.low"
                          value={formik1?.values?.SI?.low}
                          checked={formik1?.values?.SI?.low}
                          onChange={(e) => handleSiChagne(e, "SI.low")}
                          id=""
                        />
                      </td>
                      <td>
                        <input
                          className="i-mb-0 "
                          type="checkbox"
                          name="SI.position.left"
                          value={formik1?.values?.SI?.position?.left}
                          checked={formik1?.values?.SI?.position?.left}
                          onChange={(e) =>
                            handleSiChagne(e, "SI.position.left")
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="SI.position.right"
                          value={formik1?.values?.SI?.position?.right}
                          checked={formik1?.values?.SI?.position?.right}
                          onChange={(e) =>
                            handleSiChagne(e, "SI.position.right")
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <select
                          style={{ width: "inherit"}}
                          name="SI.cm"
                          id="defred"
                          value={formik1?.values?.SI?.cm}
                          onChange={handleSelctCm}
                        >
                          <option value="" ></option>
                          <option value="0.3" label="0.3">
                            0.3
                          </option>
                          <option value="0.5" label="0.5">
                            0.5
                          </option>
                          <option value="0.8" label="0.8">
                            0.8
                          </option>
                          <option value="1" label="1">
                            1
                          </option>
                          <option value="1.3" label="1.3">
                            1.3
                          </option>                          
                          <option value="1.5" label="1.5">
                            1.5
                          </option>
                          <option value="1.8" label="1.8">
                            1.8
                          </option>
                          <option value="2" label="2">
                            2
                          </option>
                          <option value="2.5" label="2.5">
                            2.5
                          </option>
                          <option value="3" label="3">
                            3
                          </option>
                          <option value="4" label="4">
                            4
                          </option>
                          <option value="5" label="5">
                            5
                          </option>
                        </select>
                      </td>
                      <td></td>
                      {/* prone crest fields  */}
                      <td className="align-left">
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          style={{display: "none"}}
                          name="ProneCrest.hieght"
                          value={formik1.values.ProneCrest.hieght}
                          checked={formik1.values.ProneCrest.hieght}
                          onChange={(e) =>
                            handleSiChagne(e, "ProneCrest.hieght")
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="ProneCrest.position.left"
                          value={formik1.values.ProneCrest.position.left}
                          checked={formik1.values.ProneCrest.position.left}
                          onChange={(e) =>
                            handleSiChagne(e, "ProneCrest.position.left")
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="ProneCrest.position.right"
                          value={formik1.values.ProneCrest.position.right}
                          checked={formik1.values.ProneCrest.position.right}
                          onChange={(e) =>
                            handleSiChagne(e, "ProneCrest.position.right")
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <select
                          style={{ width: "inherit" }}
                          name="ProneCrest.cm"
                          value={formik1.values.ProneCrest.cm}
                          onChange={handleSelectPCm}
                          id="defreds"
                        >
                          <option value="" ></option>
                         <option value="0.3" label="0.3">
                            0.3
                          </option>
                          <option value="0.5" label="0.5">
                            0.5
                          </option>
                          <option value="0.8" label="0.8">
                            0.8
                          </option>
                          <option value="1" label="1">
                            1
                          </option>
                          <option value="1.3" label="1.3">
                            1.3
                          </option>                          
                          <option value="1.5" label="1.5">
                            1.5
                          </option>
                          <option value="1.8" label="1.8">
                            1.8
                          </option>
                          <option value="2" label="2">
                            2
                          </option>
                          <option value="2.5" label="2.5">
                            2.5
                          </option>
                          <option value="3" label="3">
                            3
                          </option>
                          <option value="4" label="4">
                            4
                          </option>
                          <option value="5" label="5">
                            5
                          </option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {console.log(imageName,"IMAHFUSUDF")}
              </div>
              {viewImage ? (
                <h4 className="mt-2 mb-2 bmc col-md-12 row">
                  <div className="d-flex align-items-center col-md-6 ">
                    BMC: <span className="text-danger mx-2">{imageName}</span>
                  </div>
                  <a
                    href="#img"
                    className="d-flex justify-content-end col-md-6"
                  >
                    <img className="body-musle" src={viewImage} alt="reload" />
                  </a>
                  <a href="#" className="lightbox" id="img">
                    <span >
                   
                        {/* {console.log(viewImage , "ADSFYREHAFDS")}
                        <img
                          src={viewImage}
                          onClick={() => openImageViewer()}
                          alt="Image"
                        />
                        {isViewerOpen && (
                          <ImageViewer
                            src={viewImage}
                            onClose={() => setIsViewerOpen(false)}
                          />
                        )}
                      */}

                      <img src={viewImage} />{" "}
                    </span>
                  </a>
                </h4>
              ) : (
                ""
              )}

              <div className="table-responsive-md">
                <table className="table table-borderless tb_td">
                  <tbody>
                    <tr>
                      <th></th>
                      <th>Left</th>
                      <th>Right</th>
                      <th>Blat</th>
                      <th className="text-dark font-weight-bold">
                        <u>Adam's</u>
                      </th>
                      <th>Left</th>
                      <th>Right</th>
                      <th>Deg</th>
                      <th>Neg</th>
                      <th></th>
                    </tr>
                    <tr>
                      <td className="text-dark"><b>Fixed SI</b></td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="Adams.FixedSI.position.left"
                          vaule={
                            formik1?.values?.Adams?.FixedSI?.position?.left
                          }
                          checked={
                            formik1?.values?.Adams?.FixedSI?.position?.left
                          }
                          onChange={(e) =>
                            handleSiChagne(e, "Adams.FixedSI.position.left")
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="Adams.FixedSI.position.right"
                          vaule={
                            formik1?.values?.Adams?.FixedSI?.position?.right
                          }
                          checked={
                            formik1?.values?.Adams?.FixedSI?.position?.right
                          }
                          onChange={(e) =>
                            handleSiChagne(e, "Adams.FixedSI.position.right")
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="Adams.FixedSI.BLT"
                          vaule={formik1?.values?.Adams?.FixedSI?.BLT}
                          checked={formik1?.values?.Adams?.FixedSI?.BLT}
                          onChange={(e) =>
                            handleSiChagne(e, "Adams.FixedSI.BLT")
                          }
                          id=""
                        />
                      </td>
                      <td className="text-dark"><b>Lumb</b></td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="Adams.Lumb.position.left"
                          vaule={formik1?.values?.Adams?.Lumb?.position?.left}
                          checked={formik1?.values?.Adams?.Lumb?.position?.left}
                          onChange={(e) =>
                            handleSiChagne(e, "Adams.Lumb.position.left")
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="Adams.Lumb.position.right"
                          vaule={formik1?.values?.Adams?.Lumb?.position?.right}
                          checked={
                            formik1?.values?.Adams?.Lumb?.position?.right
                          }
                          onChange={(e) =>
                            handleSiChagne(e, "Adams.Lumb.position.right")
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <select
                          style={{ width: "inherit" }}
                          name="Adams.Lumb.Deg"
                          vaule={formik1?.values?.Adams?.Lumb?.Deg}
                          onChange={formik1.handleChange}
                          id=""
                        >
                          <option value="">Select</option>

                          {degree.map((v) => {
                            return (
                              <option value={v} label={v}>
                                {v}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="Adams.Lumb.Neg"
                          vaule={formik1?.values?.Adams?.Lumb?.Neg}
                          checked={formik1?.values?.Adams?.Lumb?.Neg}
                          onChange={(e) => handleSiChagne(e, "Adams.Lumb.Neg")}
                          id=""
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-dark"><b>Free</b></td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="Adams.Free.position.left"
                          vaule={formik1?.values?.Adams?.Free?.position?.left}
                          checked={formik1?.values?.Adams?.Free?.position?.left}
                          onChange={(e) =>
                            handleSiChagne(e, "Adams.Free.position.left")
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="Adams.Free.position.right"
                          vaule={formik1?.values?.Adams?.Free?.position?.right}
                          checked={
                            formik1?.values?.Adams?.Free?.position?.right
                          }
                          onChange={(e) =>
                            handleSiChagne(e, "Adams.Free.position.right")
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="Adams.Free.BLT"
                          vaule={formik1?.values?.Adams?.Free?.BLT}
                          checked={formik1?.values?.Adams?.Free?.BLT}
                          onChange={(e) => handleSiChagne(e, "Adams.Free.BLT")}
                          id=""
                        />
                      </td>
                      <td className="text-dark"><b>Thor</b></td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="Adams.Thor.position.left"
                          vaule={formik1?.values?.Adams?.Thor?.position?.left}
                          checked={formik1?.values?.Adams?.Thor?.position?.left}
                          onChange={(e) =>
                            handleSiChagne(e, "Adams.Thor.position.left")
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="Adams.Thor.position.right"
                          vaule={formik1?.values?.Adams?.Thor?.position?.right}
                          checked={
                            formik1?.values?.Adams?.Thor?.position?.right
                          }
                          onChange={(e) =>
                            handleSiChagne(e, "Adams.Thor.position.right")
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <select
                          style={{ width: "inherit" }}
                          name="Adams.Thor.Deg"
                          vaule={formik1?.values?.Adams?.Thor?.Deg}
                          onChange={formik1.handleChange}
                          id=""
                        >
                          <option value="">Select</option>

                          {degree.map((v) => {
                            return (
                              <option value={v} label={v}>
                                {v}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="Adams.Thor.Neg"
                          vaule={formik1?.values?.Adams?.Thor?.Neg}
                          checked={formik1?.values?.Adams?.Thor?.Neg}
                          onChange={(e) => handleSiChagne(e, "Adams.Thor.Neg")}
                          id=""
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {generateName(formik1) ? (
                <h4 className=" py-4 bmc col-md-12">
                  <div className="d-flex align-items-center col-md-12 ps-0">
                    Sl:
                    <span className="text-danger col-md-12 px-2">
                      {generateName(formik1)}
                    </span>
                  </div>
                </h4>
              ) : (
                ""
              )}

              <div className="table-responsive-md">
                <table className="table table-borderless tb_td">
                  <tbody>
                    <tr>
                      <th colspan="3" className="text-dark font-weight-bold">
                        <u>Listings</u>
                      </th>
                      <th colspan="6" className="text-dark font-weight-bold">
                        <u>Notes</u>
                      </th>
                    </tr>
                    <tr>
                      <td width="10%">L1-5</td>
                      <td
                        colspan=""
                        onClick={() => getSymptomData(dropdownIds.Listings)}
                      >
                        <Select
                          name="Listings.L1"
                          value={{
                            label: formik1?.values?.Listings?.L1,
                            value: formik1?.values?.Listings?.L1,
                          }}
                          options={options1}
                          onChange={(e) => handleInputChange(e, "Listings.L1")}
                          noOptionsMessage={() => "No Data Found"}
                          // loadOptions={options1}
                        />
                        {/* <select
                          name="Listings.L1"
                          value={formik1?.values?.Listings?.L1}
                          onChange={formik1.handleChange}
                          id=""
                        >
                          <option value="PLI" label="PLI">PRI</option>
                          <option value="PRI" label="PRI">PRS</option>
                          <option value="PRS" label="PRS">PLI</option>
                          <option value="PRS" label="PRS">PLS</option>
                        </select> */}
                      </td>
                      <td colspan="7" rowspan="3">
                        <textarea
                          style={{ border: "1px solid #ccc", width: "100%" }}
                          className="bg-white p-2 rounded"
                          name="Notes"
                          value={formik1?.values?.Notes}
                          onChange={formik1.handleChange}
                          id=""
                          cols="100"
                          rows="6"
                          placeholder="Type here..."
                        ></textarea>
                      </td>
                    </tr>
                    <tr>
                      <td>L1-3</td>
                      <td
                        colspan="2"
                        onClick={() => getSymptomData(dropdownIds.Listings)}
                      >
                        <Select
                          name="Listings.L2"
                          value={{
                            label: formik1?.values?.Listings?.L2,
                            value: formik1?.values?.Listings?.L2,
                          }}
                          options={options1}
                          onChange={(e) => handleInputChange(e, "Listings.L2")}
                          noOptionsMessage={() => "No Data Found"}
                          // loadOptions={options1}
                        />
                        {/* <select
                          name="Listings.L2"
                          value={formik1?.values?.Listings?.L2}
                          onChange={formik1.handleChange}
                          id=""
                        >
                          <option value="PLI" label="PLI">
                            PRI
                          </option>
                          <option value="PRI" label="PRI">
                            PRS
                          </option>
                          <option value="PRS" label="PRS">
                            PLI
                          </option>
                          <option value="PRS" label="PRS">
                            PLS
                          </option>
                        </select> */}
                      </td>
                    </tr>
                    <tr>
                      <td>L7/5</td>
                      <td
                        colspan="2"
                        onClick={() => getSymptomData(dropdownIds.Listings)}
                      >
                        <Select
                          name="Listings.L3"
                          value={{
                            label: formik1?.values?.Listings?.L3,
                            value: formik1?.values?.Listings?.L3,
                          }}
                          options={options1}
                          onChange={(e) => handleInputChange(e, "Listings.L3")}
                          noOptionsMessage={() => "No Data Found"}
                          // loadOptions={options1}
                        />
                        {/* <select
                          name="Listings.L3"
                          value={formik1?.values?.Listings?.L3}
                          onChange={formik1.handleChange}
                          id=""
                        >
                          <option value="PLI" label="PLI">
                            PRI
                          </option>
                          <option value="PRI" label="PRI">
                            PRS
                          </option>
                          <option value="PRS" label="PRS">
                            PLI
                          </option>
                          <option value="PRS" label="PRS">
                            PLS
                          </option>
                        </select> */}
                      </td>
                    </tr>
                    <tr>
                      <td colspan="8" className="">
                        {
                          console.log(formik1.values,"valudfjdskfsd")
                        }
                        {/* <u>SHOULDER MUSCLE TESTS</u> */}
                       <input className="form-control text-dark font-weight-bold" type="text" value={formik1.values.title} name="title"
                          onChange={formik1.handleChange}></input> 
                      </td>
                    </tr>
                    <tr style={{ backgroundColor: "#edf5fb" }}>
                      <td colspan="3">
                        <span className="me-5 text-dark">
                          Alle +5 und bilateral schmerzlos
                        </span>
                        <input
                          className="w-auto i-mb-0"
                          type="checkbox"
                          name=""
                          id=""
                          onChange={(e) => handleEventList(e)}
                        />
                      </td>
                      <td style={{ textAlign: "center" }}>Left</td>
                      <td>Pn</td>
                      <td>Right</td>
                      <td>Pn</td>
                      <td></td>
                    </tr>
                    {/* <tr style={{ backgroundColor: "#edf5fb" }}>
                  <td colspan="4">
                    <select
                      className="form-select p-2"
                      name=""
                      id=""
                    >
                      <option value="">Select</option>
                     
                      {shoulderMussle.map((v)=>{
                        return  <option value={v}>{v}</option>
                      })}
                    </select>
                  </td>
                  <td>
                    <select
                      style={{ width: "inherit" }}
                      name=""
                      id=""
                    >
                      <option value="">1</option>
                      <option value="">2</option>
                      <option value="">3</option>
                    </select>
                  </td>
                  <td>
                    <input
                      className="i-mb-0"
                      type="checkbox"
                      name=""
                      id=""
                    />
                  </td>
                  <td>
                    <select
                      style={{ width: "inherit" }}
                      name=""
                      id=""
                    >
                      <option value="">1</option>
                      <option value="">2</option>
                      <option value="">3</option>
                    </select>
                  </td>
                  <td>
                    <input
                      className="i-mb-0"
                      type="checkbox"
                      name=""
                      id=""
                    />
                  </td>
                  <td>
                    <button className="btn btn-sm  btn-primary border-base">
                      Add
                    </button>
                  </td>
                </tr> */}

                    {formik1?.values?.shoulderForm?.map((val, i) => {
                      return (
                        <tr style={{ backgroundColor: "#edf5fb" }}>
                          <td colspan="3">
                          <span onClick={() => getSymptomData(dropdownIds.SHOULDERMUSCLETESTS)}>
                            <CreatableSelect
                              name={`shoulderForm.${i}.testName`}
                              value={{
                                label: formik1?.values?.shoulderForm[i]?.testName ,
                                value: formik1?.values?.shoulderForm[i]?.testName
                              }}
                              options={options1}
                              onChange={(e) => handleInputChange(e, `shoulderForm.${i}.testName`)}
                              noOptionsMessage={() => "No Data Found"}
                            // loadOptions={options1}
                            />
                          </span>
                            {/* <select
                              className="form-select p-2"
                              name={`shoulderForm.${i}.testName`}
                              value={formik1?.values?.shoulderForm[i]?.testName}
                              onChange={formik1.handleChange}
                              id=""
                            >
                              <option value="">Select</option>

                              {shoulderMussle?.map((v) => {
                                return (
                                  <option value={v} label={v}>
                                    {v}
                                  </option>
                                );
                              })}
                            </select> */}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <select
                              style={{ width: "inherit" }}
                              name={`shoulderForm.${i}.left`}
                              value={formik1?.values?.shoulderForm[i]?.left}
                              onChange={formik1.handleChange}
                              id=""
                            >
                              <option value="" ></option>
                              <option value="1" lable="1">
                                1
                              </option>
                              <option value="2" lable="2">
                                2
                              </option>
                              <option value="3" lable="3">
                                3
                              </option>
                              <option value="4" lable="4">
                                4
                              </option>
                              <option value="5" lable="5">
                                5
                              </option>
                            </select>
                          </td>
                          <td>
                            <input
                              className="i-mb-0"
                              type="checkbox"
                              name={`shoulderForm.${i}.Pn`}
                              value={formik1?.values?.shoulderForm[i]?.Pn}
                              checked={formik1?.values?.shoulderForm[i]?.Pn}
                              onChange={formik1.handleChange}
                              id=""
                            />
                          </td>
                          <td>
                            <select
                              style={{ width: "inherit" }}
                              name={`shoulderForm.${i}.right`}
                              value={formik1?.values?.shoulderForm[i]?.right}
                              onChange={formik1.handleChange}
                              id=""
                            >
                              <option value="" ></option>
                              <option value="1" lable="1">
                                1
                              </option>
                              <option value="2" lable="2">
                                2
                              </option>
                              <option value="3" lable="3">
                                3
                              </option>
                              <option value="4" lable="4">
                                4
                              </option>
                              <option value="5" lable="5">
                                5
                              </option>
                            </select>
                          </td>
                          <td>
                            <input
                              className="i-mb-0"
                              type="checkbox"
                              name={`shoulderForm.${i}.Rn`}
                              value={formik1?.values?.shoulderForm[i]?.Rn}
                              checked={formik1?.values?.shoulderForm[i]?.Rn}
                              onChange={formik1.handleChange}
                              id=""
                            />
                          </td>
                          <td></td>
                        </tr>
                      );
                    })}

                    <tr className="d-flex">
                      <td
                        onClick={handleAddShoulderMusle}
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

                    {/* <td
                      onClick={handleAddShoulderMusle}
                      colspan="6"
                      className="text-dark font-weight-bold"
                      style={{
                        background: "rgb(9, 103, 174)",
                        borderRadius: "25px",
                        padding: "2px 0px",
                        textAlign: "center",
                        display: "block",
                        cursor: "pointer",
                        marginBottom: "10px",
                        marginTop: "10px",
                        maxWidth: "110px",
                      }}
                    >
                      <span style={{ color: "rgb(255, 255, 255)" }}>
                        Add more
                      </span>
                    </td> */}

                    {/* <tr>
                      <td colspan="4">Supraspinatous</td>
                      <td>
                        <select
                          style={{ width: "inherit" }}
                          name=""
                          id=""
                          disabled
                        >
                          <option value="">1</option>
                          <option value="">2</option>
                          <option value="">3</option>
                        </select>
                      </td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name=""
                          id=""
                          checked
                        />
                      </td>
                      <td>
                        <select
                          style={{ width: "inherit" }}
                          name=""
                          id=""
                          disabled
                        >
                          <option value="">1</option>
                          <option value="">2</option>
                          <option value="">3</option>
                        </select>
                      </td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name=""
                          id=""
                        />
                      </td>
                      <td
                        align="center"
                        className="font-weight-bold"
                        style={{ cursor: "pointer" }}
                      >
                        Remove
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-xl-5">
              <div className="table-responsive-md">
                <table className="table table-borderless tb_td">
                  <tbody>
                    <tr>
                      <td colspan="5">
                        <span className="font-weight-bold text-underline me-4 text-dark">
                          CROM
                        </span>
                        <small
                          style={{ fontSize: "10px" }}
                          className="font-weight-bold"
                        >
                          D=DECREASED, I=INCREASED, N=NORMAL
                        </small>
                      </td>
                    </tr>
                    <tr>
                      <th></th>
                      <th>D</th>
                      <th>I</th>
                      <th>N</th>
                      <th>Deg</th>
                    </tr>

                    <tr>
                      <td><b>FLX</b></td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="Crom.FLX.Dec"
                          value={formik1?.values?.Crom?.FLX?.Dec}
                          checked={formik1?.values?.Crom?.FLX?.Dec}
                          onChange={(e) => handleSiChagne(e, "Crom.FLX.Dec")}
                          id=""
                        />
                      </td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="Crom.FLX.Inc"
                          value={formik1?.values?.Crom?.FLX?.Inc}
                          checked={formik1?.values?.Crom?.FLX?.Inc}
                          onChange={(e) => handleSiChagne(e, "Crom.FLX.Inc")}
                          id=""
                        />
                      </td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="Crom.FLX.Normal"
                          value={formik1?.values?.Crom?.FLX?.Normal}
                          checked={formik1?.values?.Crom?.FLX?.Normal}
                          onChange={(e) => handleSiChagne(e, "Crom.FLX.Normal")}
                          id=""
                        />
                      </td>
                      <td>
                        <select
                          style={{ width: "inherit" }}
                          name="Crom.FLX.Deg"
                          value={formik1?.values?.Crom?.FLX?.Deg}
                          onChange={formik1.handleChange}
                          id=""
                          disabled={
                            formik1?.values?.Crom?.FLX?.Dec ||
                            formik1?.values?.Crom?.FLX?.Normal ||
                            formik1?.values?.Crom?.FLX?.Inc
                              ? false
                              : true
                          }
                        >
                          <option value="">Select</option>

                          {degree.map((v) => {
                            return (
                              <option value={v} label={v}>
                                {v}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td><b>EXT</b></td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="Crom.EXT.Dec"
                          value={formik1?.values?.Crom?.EXT?.Dec}
                          checked={formik1?.values?.Crom?.EXT?.Dec}
                          onChange={(e) => handleSiChagne(e, "Crom.EXT.Dec")}
                          id=""
                        />
                      </td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="Crom.EXT.Inc"
                          value={formik1?.values?.Crom?.EXT?.Inc}
                          checked={formik1?.values?.Crom?.EXT?.Inc}
                          onChange={(e) => handleSiChagne(e, "Crom.EXT.Inc")}
                          id=""
                        />
                      </td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="Crom.EXT.Normal"
                          value={formik1?.values?.Crom?.EXT?.Normal}
                          checked={formik1?.values?.Crom?.EXT?.Normal}
                          onChange={(e) => handleSiChagne(e, "Crom.EXT.Normal")}
                          id=""
                        />
                      </td>
                      <td>
                        <select
                          style={{ width: "inherit" }}
                          name="Crom.EXT.Deg"
                          value={formik1?.values?.Crom?.EXT?.Deg}
                          onChange={formik1.handleChange}
                          id=""
                          disabled={
                            formik1?.values?.Crom?.EXT?.Dec ||
                            formik1?.values?.Crom?.EXT?.Normal ||
                            formik1?.values?.Crom?.EXT?.Inc
                              ? false
                              : true
                          }
                        >
                          <option value="">Select</option>

                          {degree.map((v) => {
                            return <option value={v}>{v}</option>;
                          })}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td><b>RLB</b></td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="Crom.RLB.Dec"
                          value={formik1?.values?.Crom?.RLB?.Dec}
                          checked={formik1?.values?.Crom?.RLB?.Dec}
                          onChange={(e) => handleSiChagne(e, "Crom.RLB.Dec")}
                          id=""
                        />
                      </td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="Crom.RLB.Inc"
                          value={formik1?.values?.Crom?.RLB?.Inc}
                          checked={formik1?.values?.Crom?.RLB?.Inc}
                          onChange={(e) => handleSiChagne(e, "Crom.RLB.Inc")}
                          id=""
                        />
                      </td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="Crom.RLB.Normal"
                          value={formik1?.values?.Crom?.RLB?.Normal}
                          checked={formik1?.values?.Crom?.RLB?.Normal}
                          onChange={(e) => handleSiChagne(e, "Crom.RLB.Normal")}
                          id=""
                        />
                      </td>
                      <td>
                        <select
                          style={{ width: "inherit" }}
                          name="Crom.RLB.Deg"
                          value={formik1?.values?.Crom?.RLB?.Deg}
                          onChange={formik1.handleChange}
                          id=""
                          disabled={
                            formik1?.values?.Crom?.RLB?.Dec ||
                            formik1?.values?.Crom?.RLB?.Normal ||
                            formik1?.values?.Crom?.RLB?.Inc
                              ? false
                              : true
                          }
                        >
                          <option value="">Select</option>

                          {degree.map((v) => {
                            return <option value={v}>{v}</option>;
                          })}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td><b>LLB</b></td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="Crom.LLB.Dec"
                          value={formik1?.values?.Crom?.LLB?.Dec}
                          checked={formik1?.values?.Crom?.LLB?.Dec}
                          onChange={(e) => handleSiChagne(e, "Crom.LLB.Dec")}
                          id=""
                        />
                      </td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="Crom.LLB.Inc"
                          value={formik1?.values?.Crom?.LLB?.Inc}
                          checked={formik1?.values?.Crom?.LLB?.Inc}
                          onChange={(e) => handleSiChagne(e, "Crom.LLB.Inc")}
                          id=""
                        />
                      </td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="Crom.LLB.Normal"
                          value={formik1?.values?.Crom?.LLB?.Normal}
                          checked={formik1?.values?.Crom?.LLB?.Normal}
                          onChange={(e) => handleSiChagne(e, "Crom.LLB.Normal")}
                          id=""
                        />
                      </td>
                      <td>
                        <select
                          style={{ width: "inherit" }}
                          name="Crom.LLB.Deg"
                          value={formik1?.values?.Crom?.LLB?.Deg}
                          onChange={formik1.handleChange}
                          id=""
                          disabled={
                            formik1?.values?.Crom?.LLB?.Dec ||
                            formik1?.values?.Crom?.LLB?.Normal ||
                            formik1?.values?.Crom?.LLB?.Inc
                              ? false
                              : true
                          }
                        >
                          <option value="">Select</option>

                          {degree.map((v) => {
                            return <option value={v}>{v}</option>;
                          })}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td><b>RROT</b></td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="Crom.PROT.Dec"
                          value={formik1?.values?.Crom?.PROT?.Dec}
                          checked={formik1?.values?.Crom?.PROT?.Dec}
                          onChange={(e) => handleSiChagne(e, "Crom.PROT.Dec")}
                          id=""
                        />
                      </td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="Crom.PROT.Inc"
                          value={formik1?.values?.Crom?.PROT?.Inc}
                          checked={formik1?.values?.Crom?.PROT?.Inc}
                          onChange={(e) => handleSiChagne(e, "Crom.PROT.Inc")}
                          id=""
                        />
                      </td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="Crom.PROT.Normal"
                          value={formik1?.values?.Crom?.PROT?.Normal}
                          checked={formik1?.values?.Crom?.PROT?.Normal}
                          onChange={(e) =>
                            handleSiChagne(e, "Crom.PROT.Normal")
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <select
                          style={{ width: "inherit" }}
                          name="Crom.PROT.Deg"
                          value={formik1?.values?.Crom?.PROT?.Deg}
                          onChange={formik1.handleChange}
                          id=""
                          disabled={
                            formik1?.values?.Crom?.PROT?.Dec ||
                            formik1?.values?.Crom?.PROT?.Normal ||
                            formik1?.values?.Crom?.PROT?.Inc
                              ? false
                              : true
                          }
                        >
                          <option value="">Select</option>

                          {degree.map((v) => {
                            return <option value={v}>{v}</option>;
                          })}
                        </select>
                      </td>
                    </tr>

                    <tr>
                      <td><b>LROT</b></td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="Crom.LROT.Dec"
                          value={formik1?.values?.Crom?.LROT?.Dec}
                          checked={formik1?.values?.Crom?.LROT?.Dec}
                          onChange={(e) => handleSiChagne(e, "Crom.LROT.Dec")}
                          id=""
                        />
                      </td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="Crom.LROT.Inc"
                          value={formik1?.values?.Crom?.LROT?.Inc}
                          checked={formik1?.values?.Crom?.LROT?.Inc}
                          onChange={(e) => handleSiChagne(e, "Crom.LROT.Inc")}
                          id=""
                        />
                      </td>
                      <td>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="Crom.LROT.Normal"
                          value={formik1?.values?.Crom?.LROT?.Normal}
                          checked={formik1?.values?.Crom?.LROT?.Normal}
                          onChange={(e) =>
                            handleSiChagne(e, "Crom.LROT.Normal")
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <select
                          style={{ width: "inherit" }}
                          name="Crom.LROT.Deg"
                          value={formik1?.values?.Crom?.LROT?.Deg}
                          onChange={formik1.handleChange}
                          id=""
                          disabled={
                            formik1?.values?.Crom?.LROT?.Dec ||
                            formik1?.values?.Crom?.LROT?.Normal ||
                            formik1?.values?.Crom?.LROT?.Inc
                              ? false
                              : true
                          }
                        >
                          <option value="">Select</option>

                          {degree.map((v) => {
                            return <option value={v}>{v}</option>;
                          })}
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* {CromNameBoolean(formik1) ? ( */}
              <h4 className="mt-2 mb-2 bmc col-md-10">
                <div className="d-flex align-items-center col-md-12 ">
                  Cervical:
                  <div className="row d-flex flex-row col-md-12">
                    <div className="col-md-4">
                      <p className="text-danger py-4 px-2">
                        {CromNameBooleanFlx(formik1)}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p className="text-danger py-4 px-2">
                        {CromNameBooleanLlb(formik1)}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p className="text-danger py-4 px-2">
                        {CromNameBooleanProt(formik1)}
                      </p>
                    </div>
                  </div>
                </div>
              </h4>
              {/* ) : ( */}
              {/* "" */}
              {/* )} */}

              <div className="table-responsive-md">
                <table className="table table-borderless tb_td tb_td_fun_exa">
                  <tbody>
                    <tr>
                      <th colspan="5" className="text-dark font-weight-bold">
                        <u>TMJ</u>
                      </th>
                    </tr>
                    <tr>
                      <td onClick={() => getSymptomData(dropdownIds.TMJ)}>
                        <Select
                          name="TMJ.step1"
                          value={{
                            label: formik1?.values?.TMJ.step1,
                            value: formik1?.values?.TMJ.step1,
                          }}
                          options={options1}
                          onChange={(e) => handleInputChange(e, "TMJ.step1")}
                          noOptionsMessage={() => "No Data Found"}
                          // loadOptions={options1}
                        />
                        {/* <select
                          style={{ width: "inherit" }}
                          name="TMJ.step1"
                          value={formik1?.values?.TMJ?.step1}
                          onChange={formik1.handleChange}
                          id=""
                        >
                          <option value="">select</option>
                          <option value="RSUP">RSUP</option>
                          <option value="RSUP">RLAT</option>
                          <option value="RSUP">RANT</option>
                          <option value="RSUP">LSUP</option>
                          <option value="RSUP">LLAT</option>
                          <option value="RSUP">LANT</option>
                        </select> */}
                      </td>
                      <td onClick={() => getSymptomData(dropdownIds.TMJ)}>
                        <Select
                          name="TMJ.step2"
                          value={{
                            label: formik1?.values?.TMJ.step2,
                            value: formik1?.values?.TMJ.step2,
                          }}
                          options={options1}
                          onChange={(e) => handleInputChange(e, "TMJ.step2")}
                          noOptionsMessage={() => "No Data Found"}
                          // loadOptions={options1}
                        />
                      </td>
                      {/* <td>
                        <select
                          style={{ width: "inherit" }}
                          name="TMJ.step2"
                          value={formik1?.values?.TMJ?.step2}
                          onChange={formik1.handleChange}
                          id=""
                        >
                          <option value="">select</option>
                          <option value="RSUP">RSUP</option>
                          <option value="RSUP">RLAT</option>
                          <option value="RSUP">RANT</option>
                          <option value="RSUP">LSUP</option>
                          <option value="RSUP">LLAT</option>
                          <option value="RSUP">LANT</option>
                        </select>
                      </td> */}
                      <td onClick={() => getSymptomData(dropdownIds.TMJ)}>
                        <Select
                          name="TMJ.step3"
                          value={{
                            label: formik1?.values?.TMJ.step3,
                            value: formik1?.values?.TMJ.step3,
                          }}
                          options={options1}
                          onChange={(e) => handleInputChange(e, "TMJ.step3")}
                          noOptionsMessage={() => "No Data Found"}
                          // loadOptions={options1}
                        />
                      </td>
                      {/* <td>
                        <select
                          style={{ width: "inherit" }}
                          name="TMJ.step3"
                          value={formik1?.values?.TMJ?.step3}
                          onChange={formik1.handleChange}
                          id=""
                        >
                          <option value="">select</option>
                          <option value="RSUP">RSUP</option>
                          <option value="RSUP">RLAT</option>
                          <option value="RSUP">RANT</option>
                          <option value="RSUP">LSUP</option>
                          <option value="RSUP">LLAT</option>
                          <option value="RSUP">LANT</option>
                        </select>
                      </td> */}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* {step != undefined && (
          <button
            type="submit"
            name="next"
            // onClick={() => setFunction(step + 1)}
            onClick={handleFromSubmit}
            className="next action-button btn-primary border-base me-5"
            value="Save & Next"
          >
            Next
          </button>
        )} */}
      </form>
     
      <div >
        {/* <p ref={messagesEndRef} ></p> */}
      </div>
    </>
  );
};


export default FunctionalExamination;