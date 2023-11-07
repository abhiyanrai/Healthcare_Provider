import React, { useRef } from "react";
import "./Examination.css";
import {
  Link,
  useParams,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import {
  checkBillingApi,
  getConsultationById,
  getReportByIdApi,
  getSinglePatientDetailsById,
  getSymptomById,
} from "../../Apis";
import moment from "moment/moment";
import Loader from "../../Components/common/Errors/loader/Loader";
import { useReactToPrint } from "react-to-print";
const ExaminationpReports = () => {
  const pId = useParams();
  const Examid = useLocation();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const navigate = useNavigate();
  const [dataReports, setDataReports] = useState("");
  const [consultaionData, setConsultationData] = useState([]);
  const [warnings, setWaringins] = useState([]);
  const [patinetData, setPatientData] = useState("");
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(true);

  const [rightAk, setRightAk] = useState([]);
  const [leftAk, setLeftAk] = useState([]);
  const [rightMk, setRightMk] = useState([]);
  const [leftMk, setLeftMk] = useState([]);
  const [rightAkMk, setRightAkMk] = useState([]);
  const [leftAkMk, setLefttAkMk] = useState([]);
  const [treatMan, setTreatMan] = useState({});
  const [treatImp, setTreatImp] = useState({});
  const [treatAk, setTreatAk] = useState({});
  const [treatMk, setTreatMk] = useState({});
  const [treatAkMk, setTreatAkMk] = useState({});
  const [kineLeft, setKineLeft] = useState([]);
  const [kineRight, setKineRight] = useState([]);
  const [dec, setdec] = useState([]);
  const [gt, setnormal] = useState([]);

  const [inc, setinc] = useState([]);

  const getReportDataById = async (id) => {
    try {
      if (id) {
        const res = await getReportByIdApi(id);
        if (res.status === 200 || res.status === 201) {
          setDataReports(res?.data?.examination);
          getConsultationDetails(res?.data?.examination?.consultationId);
          manageShoulderRepo(
            res?.data?.examination?.treatments?.shoulderOption
          );
          manageTreatment(res?.data?.examination?.treatments);
          manageKinesiotaping(
            res?.data?.examination?.treatments?.Kinesiotaping
              ?.kinesiotapingPosition
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const manageKinesiotaping = (data) => {
    let leftKine = [];
    let rightKine = [];
    data?.map((v) => {
      if (!v?.left) return;
      leftKine.push(v.left);
    });
    data?.filter((v) => {
      if (!v?.right) return;
      rightKine.push(v.right);
    });
    setKineLeft(leftKine);
    setKineRight(rightKine);
  };
  const manageTreatment = (data) => {
    let man = Object.entries(data.DC)
      ?.filter(([key, value]) => value === "Man")
      ?.reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});

    let imp = Object.entries(data.DC)
      ?.filter(([key, value]) => value === "Imp")
      ?.reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});

    let ak = Object.entries(data.HP)
      ?.filter(([key, value]) => value === "AK")
      ?.reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});
    let mk = Object.entries(data.HP)
      ?.filter(([key, value]) => value === "MA")
      ?.reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});

    let akmk = Object.entries(data.HP)
      ?.filter(([key, value]) => value === "AK/MA")
      ?.reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});
    setTreatAk(ak);
    setTreatMk(mk);
    setTreatAkMk(akmk);
    setTreatMan(man);
    setTreatImp(imp);
    // let man = data.DC
  };
  const manageShoulderRepo = (data) => {
    let rightValueAk = [];
    let leftValueAk = [];
    let rightValueMk = [];
    let leftValueMk = [];
    let rightValueAkMk = [];
    let leftValueAkMk = [];
    let d = data?.filter((v) => v.leftValue == "AK");
    let rd = data?.filter((v) => v.rightValue == "AK");
    let e = data?.filter((v) => v.leftValue == "MA");
    let ed = data?.filter((v) => v.rightValue == "MA");
    let f = data?.filter((v) => v.leftValue == "AK/MA");
    let fd = data?.filter((v) => v.rightValue == "AK/MA");

    for (let i = 0; i < rd?.length; i++) {
      rightValueAk.push(rd[i]?.right);
    }
    for (let i = 0; i < d?.length; i++) {
      leftValueAk.push(d[i]?.left);
    }
    for (let j = 0; j < ed?.length; j++) {
      rightValueMk.push(ed[j]?.right);
    }
    for (let j = 0; j < e?.length; j++) {
      leftValueMk.push(e[j]?.left);
    }
    for (let k = 0; k < fd?.length; k++) {
      rightValueAkMk.push(fd[k]?.right);
    }
    for (let k = 0; k < f?.length; k++) {
      leftValueAkMk.push(f[k]?.left);
    }

    setRightAk(rightValueAk);
    setLeftAk(leftValueAk);
    setRightMk(rightValueMk);
    setLeftMk(leftValueMk);
    setRightAkMk(rightValueAkMk);
    setLefttAkMk(leftValueAkMk);
    // console.log('rightValueAk - ' ,rightValueAk , "leftValueAk",leftValueAk ,"rightValueMk",rightValueMk , "leftValueMk",leftValueMk , "rightvalueAKMK",rightValueAkMk , "lefetvalueAKMK", leftValueAkMk);

    // console.log(f ,"AKVAL");
  };
  const handleBill = () => {
    navigate("/PatientsBilling/PatientsBilling", {
      state: { id: Examid?.state?.patientId },
    });
  };

  const getDeepTendonBiceps = (data, name) => {
    let deep = data?.orthopadic?.deepTendonReflexes?.[name];
    if (deep?.leftNew || deep?.rightNew) {
      if (deep?.leftNew === deep?.rightNew) {
        return `The ${name} deep tendon reflexes is bilaterally ${deep?.leftNew} .`;
      } else {
        return `The ${name} deep tendon refelxes ${
          deep?.leftNew ? `in left was ${deep?.leftNew} ` : ""
        } ${
          deep?.rightNew
            ? ` ${deep?.leftNew && deep?.rightNew ? "and" : ""} the right was ${
                deep?.rightNew
              }`
            : ""
        }  .`;
      }
    }
  };

  const getDeepTendonElbow = (data, name) => {
    let deep = data?.orthopadic?.deepTendon?.[name];
    if (deep?.left?.name || deep?.right?.name) {
      if (deep?.left?.name === deep?.right?.name) {
        return `The ${name} deep tendon reflexes is bilaterally ${deep?.left?.name} .`;
      } else {
        return `The ${name} deep tendon refelxes ${
          deep?.left?.name ? `in left was ${deep?.left?.name} ` : ""
        } ${
          deep?.right?.name
            ? ` ${
                deep?.left?.name && deep?.right?.name ? "and" : ""
              } the right was ${deep?.right?.name}`
            : ""
        }  .`;
      }
    }
  };
  //   const getDeepTendonBiceps =(data)=>{
  //     console.log(data?.orthopadic?.deepTendonReflexes?.biceps,"DATATTAATTAadfdsafdsaf")
  //     let deep = data?.orthopadic?.deepTendonReflexes?.biceps ;
  //     let deepLeft = Number(deep?.left) ;
  //     let deepRight = Number(deep?.right) ;
  //     console.log(deepLeft,deepRight ,"depepepeeeee")

  //     if(deepLeft === 0 && deepRight === 0){
  //       return "bilaterally absent"
  //     }else if(deepLeft === 0 && deepRight === 1){
  //       return "left absent right reduced"
  //     }else if(deepLeft === 0 && deepRight === 0){

  //     }else if(deepLeft === 0 && deepRight === 0){

  //     }else if(deepLeft === 0 && deepRight === 0){

  //     }else if(deepLeft === 0 && deepRight === 0){

  //     }else if(deepLeft === 0 && deepRight === 0){

  //     }else if(deepLeft === 0 && deepRight === 0){

  //     }else if(deepLeft === 0 && deepRight === 0){

  //     }

  // }
  // const getDeepTendonBiceps =(data)=>{
  //     console.log(data?.orthopadic?.deepTendonReflexes?.biceps,"DATATTAATTAadfdsafdsaf")
  //     let deep = data?.orthopadic?.deepTendonReflexes?.biceps ;
  //     let deepLeft = Number(deep?.left) ;
  //     let deepRight = Number(deep?.right) ;
  //     if(!deepLeft && !deepRight ) return;
  //     if(deepLeft === 0){
  //       if(deepRight === 0){
  //         return "bilaterally biceps absent"
  //       }else if(deepRight === 1){
  //         return "left absent right reduced"
  //       }else if(deepRight === 2){
  //         return "left absent right normal"
  //       }else{
  //         return "left absent"
  //       }
  //     }else if(deepRight === 0){
  //       if(deepLeft ===0){
  //         return "bilaterally biceps absent"
  //       }else if(deepLeft === 1){
  //         return "right absent left reduced"
  //       }else if(deepLeft === 2){
  //         return "right absent left normal"
  //       }else{
  //         return "right absent"
  //       }
  //     }else if(deepLeft === 1){
  //       if(deepRight === 1){
  //         return "bilaterally reduced "
  //       }else if(deepRight === 0 ){
  //         return "left reduced right absent"
  //       }else if(deepRight === 2){
  //         return "left reduced right normal"
  //       }else{
  //         return "left reduced"
  //       }
  //     }else if(deepRight===1){
  //       if(deepLeft===1){
  //         return "bilaterally reduced"
  //       }else if(deepLeft === 0){
  //         return "right reduced left absent"
  //       }else if(deepLeft === 2){
  //         return "right reduced left normal"
  //       }else{
  //         return "right reduced"
  //       }
  //     }else if(deepLeft === 2){
  //       if(deepRight === 2){
  //         return "bilaterally normal"
  //       }else if(deepRight === 0){
  //         return "left normal right absent"
  //       }else if(deepRight === 1){
  //         return "left normal right reduced"
  //       }else{
  //         return "left normal"
  //       }
  //     }else if(deepRight === 2){
  //       if(deepLeft === 2){
  //         return "bilaterally normal"
  //       }else if(deepLeft === 0){
  //         return "left normal right absent"
  //       }else if(deepLeft === 1){
  //         return "left normal right reduced"
  //       }else{
  //         return "right normal"
  //       }
  //     }else{
  //       return false
  //     }
  // }

  const getConsultationDetails = async (id) => {
    try {
      const res = await getConsultationById(id);
      if (res.status == 200 || res.status === 201) {
        // setConsultationData(res.data.symptomsArr);
        let d = res.data.symptomsArr?.map((v) => {
          return {
            symptom: v.symptom,
            warnings: v.warnings,
            date: v.date,
            blt: v.blt,
            position: v.position,
            radiates: v.radiates,
          };
        });
        setConsultationData(d);
        let arr = [];
        d?.map((v) => {
          v?.warnings?.map((f) => {
            if (f?.value) {
              arr.push(f.value);
            }
          });
        });
        setWaringins(arr);
        // d = arr?.filter((v) => v);

        // console.log(d, "SADFDSAFdsfaf");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getTime = (createdAt) => {
    let now = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    var ms = now - new Date(createdAt);
    console.log(ms, oneDay, "ondedayaa");
    return ms > oneDay;
  };

  const getPatientDetails = async (id) => {
    try {
      const res = await getSinglePatientDetailsById(id);
      if (res.status === 200 || res.status === 201) {
        setPatientData(res?.data?.patient);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkBilling = async (id) => {
    const res = await checkBillingApi(id);
    if (res?.status === 200 || res?.status === 201) {
      setToggle(res?.data?.isBillingFound);
    }
  };

  useEffect(() => {
    checkBilling(Examid?.state?.patientId);
    getReportDataById(Examid?.state?.id);
    getPatientDetails(Examid?.state?.patientId);
  }, [Examid?.state?.id]);

  useEffect(() => {
    getFunction();
  }, [dataReports?.functional?.Crom]);
  const getfixedDetails = () => {
    // dataReports?.functional?.Adams?.FixedSI?.BLT||
    // dataReports?.functional?.Adams?.FixedSI?.position?.left
    // ||dataReports?.functional?.Adams?.FixedSI?.position?.right

    if (
      dataReports?.functional?.Adams?.FixedSI?.BLT &&
      dataReports?.functional?.Adams?.FixedSI?.position?.left
    ) {
      return "Left & Bilaterat";
    } else if (
      dataReports?.functional?.Adams?.FixedSI?.BLT &&
      dataReports?.functional?.Adams?.FixedSI?.position?.right
    ) {
      return "right & Bilaterat";
    } else if (dataReports?.functional?.Adams?.FixedSI?.BLT) {
      return "Bilaterat";
    } else if (dataReports?.functional?.Adams?.FixedSI?.position?.left) {
      return "left";
    } else if (dataReports?.functional?.Adams?.FixedSI?.position?.right) {
      return "right";
    } else {
      return "";
    }
  };

  const functionLumar = () => {
    // dataReports?.functional?.Adams?.Lumb?.Neg||dataReports?.functional?.Adams?.Lumb?.position?.right||dataReports?.functional?.Adams?.Lumb?.position?.left
    if (dataReports?.functional?.Adams?.Lumb?.Neg) {
      return "Adam's test was negative in the lumbar spinal";
    } else if (dataReports?.functional?.Adams?.Lumb?.position?.right) {
      return `Adam's test was positive on the right side of the lumbar spine, ${
        dataReports?.functional?.Adams?.Lumb?.Deg &&
        `and the lateral lumbar curvature was measured and is approximately ${dataReports?.functional?.Adams?.Lumb?.Deg} degrees.`
      }`;
    } else if (dataReports?.functional?.Adams?.Lumb?.position?.left) {
      return `Adam's test was positive on the left side of the lumbar spine, ${
        dataReports?.functional?.Adams?.Lumb?.Deg &&
        `and the lateral lumbar curvature was measured and is approximately ${dataReports?.functional?.Adams?.Lumb?.Deg} degrees.`
      }`;
    } else {
      return "no contents";
    }
  };

  const functionThor = () => {
    if (dataReports?.functional?.Adams?.Thor?.Neg) {
      return "Adam's test was negative in the Thoracic spinal";
    } else if (dataReports?.functional?.Adams?.Thor?.position?.right) {
      return `Adam's forward bending test was positive on the right side of the Thoracic spine, ${
        dataReports?.functional?.Adams?.Thor?.Deg &&
        `and the lateral lumbar curvature was measured and is approximately ${dataReports?.functional?.Adams?.Thor?.Deg} degrees.`
      }`;
    } else if (dataReports?.functional?.Adams?.Thor?.position?.left) {
      return `Adam's forward bending test was positive on the left side of the Thoracic spine, ${
        dataReports?.functional?.Adams?.Thor?.Deg &&
        `and the lateral lumbar curvature was measured and is approximately ${dataReports?.functional?.Adams?.Thor?.Deg} degrees.`
      }`;
    } else {
      return "no content foound !";
    }
  };

  const getdatareports = () => {
    if (dataReports?.orthopadic?.lumbarPos) {
      return `All lumbar orthopedic tests performed were Positive bilaterally.`;
    } else if (dataReports?.orthopadic?.lunbarNag) {
      return `All lumbar orthopedic tests performed were Negative bilaterally.`;
    } else {
      return null;
    }
  };

  const getFunction = () => {
    var Dec = [];
    var Inc = [];
    var Normal = [];

    if (dataReports?.functional?.Crom?.EXT?.Dec) {
      Dec.push("EXT");
    }
    if (dataReports?.functional?.Crom?.EXT?.Inc) {
      Inc.push("EXT");
    }
    if (dataReports?.functional?.Crom?.EXT?.Normal) {
      Normal.push("EXT"); //
    }
    if (dataReports?.functional?.Crom?.FLX?.Dec) {
      Dec.push("FLX");
    }
    if (dataReports?.functional?.Crom?.FLX?.Inc) {
      Inc.push("FLX");
    }
    if (dataReports?.functional?.Crom?.FLX?.Normal) {
      Normal.push("FLX"); //
    }
    if (dataReports?.functional?.Crom?.LLB?.Dec) {
      Dec.push("LLB");
    }
    if (dataReports?.functional?.Crom?.LLB?.Inc) {
      Inc.push("LLB");
    }
    if (dataReports?.functional?.Crom?.LLB?.Normal) {
      Normal.push("LLB"); //
    }
    if (dataReports?.functional?.Crom?.LROT?.Dec) {
      Dec.push("LROT");
    }
    if (dataReports?.functional?.Crom?.LROT?.Inc) {
      Inc.push("LROT");
    }
    if (dataReports?.functional?.Crom?.LROT?.Normal) {
      Normal.push("LROT"); //
    }
    if (dataReports?.functional?.Crom?.PROT?.Dec) {
      Dec.push("PROT");
    }
    if (dataReports?.functional?.Crom?.PROT?.Inc) {
      Inc.push("PROT");
    }
    if (dataReports?.functional?.Crom?.PROT?.Normal) {
      Normal.push("PROT"); //
    }
    if (dataReports?.functional?.Crom?.RLB?.Dec) {
      Dec.push("RLB");
    }
    if (dataReports?.functional?.Crom?.RLB?.Inc) {
      Inc.push("RLB");
    }
    if (dataReports?.functional?.Crom?.RLB?.Normal) {
      Normal.push("RLB"); //
    }
    setdec([...Dec]);
    setnormal([...Normal]);
    setinc([...Inc]);
  };

  const sholderDeepTest = (d) => {
    const left = d?.orthopadic?.cervical?.ShldrDep?.left;
    const right = d?.orthopadic?.cervical?.ShldrDep?.right;
    if (!left && !right) {
      return "";
    } else if (left == "Pos" && right == "Pos") {
      return "ShldrDep test was positive bilaterally.";
    } else if (left == "Neg" && right == "Neg") {
      return "ShldrDep test was negative bilaterally.";
    } else {
      return (
        "ShldrDep test was " +
        (left ? "left " + left : "") +
        (right ? " right " + right : "")
      );
    }
  };

  const sholderGeorge = (d) => {
    const left = d?.orthopadic?.cervical?.George?.left;
    const right = d?.orthopadic?.cervical?.George?.right;

    if (!left && !right) {
      return "";
    } else if (left == "Pos" && right == "Pos") {
      return "George test was positive bilaterally.";
    } else if (left == "Neg" && right == "Neg") {
      return "George test was negative bilaterally.";
    } else {
      return (
        "George test was " +
        (left ? "left " + left : "") +
        (right ? " right " + right : "")
      );
    }
  };

  const getdeepTendon = (dataReports) => {
    if (
      dataReports?.orthopadic?.deepTendon?.achills?.left?.value == "2" &&
      dataReports?.orthopadic?.deepTendon?.achills?.right?.value == "2" &&
      dataReports?.orthopadic?.deepTendon?.patellar?.left?.value == "2" &&
      dataReports?.orthopadic?.deepTendon?.patellar?.right?.value == "2"
    ) {
      return `Deep tendon reflexes were 2+ bilaterally.`;
    }
    //   else if (dataReports?.orthopadic?.deepTendon?.achills?.left?.value !=2  ||
    //   dataReports?.orthopadic?.deepTendon?.achills?.right?.value!=2  ||
    //   dataReports?.orthopadic?.deepTendon?.patellar?.left?.value!=2 ||
    //   dataReports?.orthopadic?.deepTendon?.patellar?.right?.value!=2 ) {
    //   return true;
    // }
    // else if(dataReports?.orthopadic?.deepTendon?.achills?.right?.value && dataReports?.orthopadic?.deepTendon?.achills?.left?.value){
    //   return `Deep tendon reflexes in the left  Achilles were ${dataReports?.orthopadic?.deepTendon?.achills?.left?.value} and on the right were ${dataReports?.orthopadic?.deepTendon?.achills?.right?.value}.`
    // }
    // else if(dataReports?.orthopadic?.deepTendon?.patellar?.left?.value && dataReports?.orthopadic?.deepTendon?.patellar?.right?.value){
    //   return `Deep tendon reflexes in the left Patellar were ${dataReports?.orthopadic?.deepTendon?.patellar?.left?.value} and on the right were ${dataReports?.orthopadic?.deepTendon?.patellar?.right?.value}`
    // }
    // else if(dataReports?.orthopadic?.deepTendon?.patellar?.left?.value ){
    //   return `Deep tendon reflexes in the left Patellar were ${dataReports?.orthopadic?.deepTendon?.patellar?.left?.value} .`
    // }
    // else if(dataReports?.orthopadic?.deepTendon?.patellar?.right?.value){
    //  return `Deep tendon reflexes in the right Patellar were ${dataReports?.orthopadic?.deepTendon?.patellar?.right?.value} .`
    // }
    // else if(dataReports?.orthopadic?.deepTendon?.achills?.left?.value ){
    //  return `Deep tendon reflexes in the left  Achilles were ${dataReports?.orthopadic?.deepTendon?.achills?.left?.value} .`
    // }
    // else if(dataReports?.orthopadic?.deepTendon?.achills?.right?.value ){
    //   return  `Deep tendon reflexes in the right  Achilles were ${dataReports?.orthopadic?.deepTendon?.achills?.right?.value} .`
    // }
    else {
      return null;
    }
  };

  // const getDecValue = (data)=>{
  // let m = data?.filter((l) => l === "RLB");
  // let t = data?.filter((l) => l === "LLB");
  // let lr = data?.filter((l) => l === "LROT");
  // let pr = data?.filter((l) => l === "PROT");
  // // getArray(m,t,lr,pr,data);
  // if(lr && pr){
  //   return "Bilaterally Rotation"
  //  }
  // if(m && t ){
  //   return "Bilaterally lateral flexion"
  //  }

  //   if(data === "FLX"){
  //   return " Cervical Flexion ";
  //  }
  //   if (data="EXT"){
  //   return " Extension ";
  //  }
  //   if(data === "PROT"){
  //   return " Right rotation ";
  //  }
  //   if(data === "LROT"){
  //   return " Left rotation ";
  //  }
  //   if(data === "RLB"){
  //   return " Right lateral flexion ";
  //  }
  //   if (data === "LLB"){
  //   return " Left lateral flexion ";
  //  }else{
  //   return ""
  //  }
  // }

  const getDECValue = (data) => {
    const hasRLB = data?.includes("RLB");
    const hasLLB = data?.includes("LLB");
    const hasPROT = data?.includes("PROT");
    const hasLROT = data?.includes("LROT");
    const bothExist = hasRLB && hasLLB;
    const bothRot = hasLROT && hasPROT;

    if (bothExist) {
      if (bothRot) {
        const newArray = data?.filter(
          (item) => item !== "LROT" && item !== "LLB" && item !== "RLB"
        );
        let d = newArray?.map((v) => {
          switch (v) {
            case "FLX":
              return " Cervical Flexion ";
            case "EXT":
              return " Extension ";
            default:
              return "Bilaterally Flexion and Rotation";
          }
        });
        return d + " ";
      } else {
        const newArray = data?.filter((i) => i !== "RLB");
        let d = newArray?.map((v) => {
          switch (v) {
            case "FLX":
              return " Cervical Flexion ";
            case "EXT":
              return " Extension ";
            case "PROT":
              return " Right rotation ";
            case "LROT":
              return " Left rotation ";
            default:
              return "Bilaterally Flexion";
          }
        });
        return d + " ";
      }
    } else if (bothRot) {
      if (bothExist) {
        const newArray = data?.filter(
          (item) => item !== "LROT" && item !== "LLB" && item !== "RLB"
        );
        let d = newArray?.map((v) => {
          console.log(v, "vjvjvjvjvjvjvjvjvj");
          switch (v) {
            case "FLX":
              return " Cervical Flexion ";
            case "EXT":
              return " Extension ";
            default:
              return "Bilaterally Flexion and Rotation";
          }
        });
        return d + " ";
      } else {
        const newArray = data?.filter((i) => i !== "LROT");
        let d = newArray?.map((v) => {
          switch (v) {
            case "FLX":
              return " Cervical Flexion ";
            case "EXT":
              return " Extension ";
            case "RLB":
              return " Right lateral flexion ";
            case "LLB":
              return " Left lateral flexion ";
            default:
              return "Bilaterally Rotation";
          }
        });
        return d + " ";
      }
    } else {
      let d = data?.map((v) => {
        switch (v) {
          case "FLX":
            return " Cervical Flexion ";
          case "EXT":
            return " Extension ";
          case "RLB":
            return " Right lateral flexion ";
          case "LLB":
            return " Left lateral flexion ";
          case "PROT":
            return " Right rotation ";
          case "LROT":
            return " Left rotation ";
          default:
            return "";
        }
      });
      return d + " ";
    }
  };

  const getDecValue = (data) => {
    let d = data?.map((v) => {
      console.log(v, "vjvjvjvjvjvjvjvjvj");
      switch (v) {
        // case "RLB" && "LLB" :
        //   return " Bilaterally lateral flexion "
        case "FLX":
          return " Cervical Flexion ";
        case "EXT":
          return " Extension ";
        case "RLB":
          return " Right lateral flexion ";
        case "LLB":
          return " Left lateral flexion ";
        case "PROT":
          return " Right rotation ";
        case "LROT":
          return " Left rotation ";
        default:
          return "";
      }
    });
    return d + " ";
  };

  const getOthopedic = (dataReports) => {
    if (
      dataReports?.orthopadic?.deepTendonReflexes?.biceps?.left == "2" &&
      dataReports?.orthopadic?.deepTendonReflexes?.biceps?.right == "2" &&
      dataReports?.orthopadic?.deepTendonReflexes?.brachiorad?.left == "2" &&
      dataReports?.orthopadic?.deepTendonReflexes?.brachiorad?.right == "2" &&
      dataReports?.orthopadic?.deepTendonReflexes?.triceps?.left == "2" &&
      dataReports?.orthopadic?.deepTendonReflexes?.triceps?.right == "2"
    ) {
      return `Deep tendon reflexes were 2+ bilaterally.`;
    } else if (
      dataReports?.orthopadic?.deepTendonReflexes?.biceps?.left != "2" ||
      dataReports?.orthopadic?.deepTendonReflexes?.biceps?.right != "2" ||
      dataReports?.orthopadic?.deepTendonReflexes?.brachiorad?.left != "2" ||
      dataReports?.orthopadic?.deepTendonReflexes?.brachiorad?.right != "2" ||
      dataReports?.orthopadic?.deepTendonReflexes?.triceps?.left != "2" ||
      dataReports?.orthopadic?.deepTendonReflexes?.triceps?.right != "2"
    ) {
      return false;
    } else {
      return null;
    }
  };

  const getOtheo = (data) => {
    console.log(data?.orthopadic?.cervical?.Wrights, "datattaattaattaa");
    let d = data?.orthopadic?.cervical?.Wrights;
    if (d?.left == "Neg" && d?.right == "Neg") {
      return " negative bilaterally";
    } else if (d?.left == "Pos" && d?.right == "Pos") {
      return "positive bilaterally ";
    } else if (d?.left == "Pos") {
      if (d?.right == "Neg") {
        return "left positive and right negative";
      } else {
        return "left positive";
      }
    } else if (d?.left == "Neg") {
      if (d?.right == "Pos") {
        return "left negative and right positive";
      } else {
        return "left negative";
      }
    } else if (d?.right == "Pos") {
      if (d?.left == "Neg") {
        return "right positive and left negative";
      } else {
        return "right positive";
      }
    } else if (d?.right == "Neg") {
      if (d?.left == "Pos") {
        return "right negative and left positive";
      } else {
        return "right negative";
      }
    } else {
      return false;
    }
  };
  const getOthopediccervical = (dataReports) => {
    if (dataReports?.orthopadic?.cervicalNag) {
      return "All Cervical orthopedic tests performed were nagetive bilaterally";
    } else if (dataReports?.orthopadic?.cervicalPos) {
      return "All Cervical orthopedic tests performed were Positive bilaterally";
    } else {
      return null;
    }
  };
  console.log(dataReports, "DAtareport");
  const gataReportSotto = (dataReports) => {
    if (
      dataReports?.orthopadic?.lumborOrtho?.EYl?.left == "Neg" ||
      dataReports?.orthopadic?.lumborOrtho?.FABERE?.left == "Neg" ||
      dataReports?.orthopadic?.lumborOrtho?.LaSeague?.left == "Neg" ||
      dataReports?.orthopadic?.lumborOrtho?.Milgram?.left == "Neg" ||
      dataReports?.orthopadic?.lumborOrtho?.Nachlas?.left == "Neg" ||
      dataReports?.orthopadic?.lumborOrtho?.Yeoman?.left == "Neg" ||
      dataReports?.orthopadic?.sottoHall?.lumbar.left == "Neg" ||
      dataReports?.orthopadic?.sottoHall?.thoracic.left == "Neg"
    ) {
      return "A lumbar orthopedic examination revealed Negative Left";
    } else if (
      dataReports?.orthopadic?.lumborOrtho?.EYl?.right == "Neg" ||
      dataReports?.orthopadic?.lumborOrtho?.FABERE?.right == "Neg" ||
      dataReports?.orthopadic?.lumborOrtho?.LaSeague?.right == "Neg" ||
      dataReports?.orthopadic?.lumborOrtho?.Milgram?.right == "Neg" ||
      dataReports?.orthopadic?.lumborOrtho?.Nachlas?.right == "Neg" ||
      dataReports?.orthopadic?.lumborOrtho?.Yeoman?.right == "Neg" ||
      dataReports?.orthopadic?.sottoHall?.lumbar.right == "Neg" ||
      dataReports?.orthopadic?.sottoHall?.thoracic.right == "Neg"
    ) {
      return `A lumbar orthopedic examination revealed Negative right `;
    } else {
      return false;
    }
  };
  return (
    <>
      <div className="container-fluid mt-6">
        <div className="card">
          <div className="row card-header align-items-center">
            <div className="col-sm-3 d-flex">
              <div className="avatar avatar-sm bg-warning rounded-circle text-white me-3">
                <img
                  alt="..."
                  src="/static/media/img-profile.00fa072a3afa1895a513.jpg"
                />
              </div>
              <span>
                {loading ? (
                  <Loader />
                ) : (
                  patinetData?.salutation +
                  " " +
                  patinetData?.firstName +
                  " " +
                  patinetData?.lastName
                )}
              </span>
            </div>
            <div className="col-sm-3">
              <p>
                Patient Id:&nbsp;
                <span className="copy-text">
                  {patinetData?.fileNo ? patinetData?.fileNo : "-"}
                  {patinetData?.fileNo && (
                    <i
                      title="copy"
                      style={{ color: "lightslategray", cursor: "pointer" }}
                      className="fa-solid fa-copy ms-1"
                      onClick={() =>
                        copy(patinetData?.fileNo) &&
                        toast.success("Copied", { id: "0001" })
                      }
                    ></i>
                  )}
                </span>
              </p>
            </div>
            <div className="col-sm-3">
              <p>
                D.O.B.:{" "}
                <span> {moment(patinetData?.dob)?.format("DD/MM/YYYY")}</span>
              </p>
            </div>
            <div className="col-sm-3">
              <p>
                Date:{" "}
                <span>
                  {moment(patinetData?.registrationDate)?.format("DD/MM/YYYY")}
                  {/* {patinetData?.registrationDate
                    ?.split("-")
                    .reverse()
                    .join("/")} */}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="card mt-5">
          <div className=" card-header">
            <div className="row position-relative">
              <div className="position-absolute">
                <div
                  style={{ zIndex: "1" }}
                  className="top-2 position-absolute start-0"
                >
                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/patients/profile?${Examid?.state?.patientId}`,
                        { state: { name: "examinationActive" } }
                      )
                    }
                    className="btn btn-sm btn-neutral"
                  >
                    <i class="bi bi-arrow-left-circle"></i> Back
                  </button>
                </div>
                <div
                  style={{ zIndex: "1" }}
                  className="position-absolute end-0"
                >
                  {!getTime(dataReports?.createdAt) && (
                    <Link
                      style={{ top: "10px", right: "75px" }}
                      className="btn btn-sm btn-primary position-absolute"
                      to={`/Examination?${dataReports?._id}`}
                      state={{
                        id: Examid?.state?.patientId,
                        warningsId: Examid?.state?.consultationId,
                      }}
                    >
                      Edit
                    </Link>
                  )}
                  {/* {toggle ? (
                    " "
                  ) : (
                    <button
                      className="btn btn-sm btn-primary top-2 position-absolute end-0"
                      onClick={handleBill}
                    >
                      GENERATE BILL
                    </button>
                  )} */}
                  <button
                    className="btn btn-sm btn-primary top-2 position-absolute end-0"
                    style={{ marginRight: "5px", marginTop: "2px" }}
                    onClick={handlePrint}
                  >
                    Print
                  </button>
                </div>
              </div>
              <div className="col-lg-12" ref={componentRef}>
                <div className="WordSection1">
                  <h2 style={{ textAlign: "center" }}>
                    Initial Report of Findings
                  </h2>
                  <div className=" jainul-print">
                    <div className="row p-3">
                      <div className="col-6">
                        <div className="table-responsive">
                          <table className="table table-borderless jainult">
                            <thead>
                              <tr>
                                <td>
                                  <img
                                    src="/OwnerKit/img/logos/logo.png"
                                    alt="logo"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Intellispine am Neumarkt,
                                  <br /> UG (haftungsbeschränkt) <br />
                                  Doctors of Chiropractic (USA) <br />
                                  Chiropraktiker in Köln
                                </td>
                              </tr>
                            </thead>
                          </table>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="table-responsive">
                          <table className="table table-borderless tb_td ">
                            <thead>
                              <tr className="d-flex">
                                <td
                                  style={{ fontSize: "24px", color: "red" }}
                                  className="pt-0 pb-1"
                                >
                                  Examination Reports
                                </td>
                              </tr>
                              <tr className="d-flex">
                                <td className="pt-0 pb-0 min-w-100">
                                  <strong>Patient Id:</strong>
                                </td>
                                <td className="pt-0 pb-0">
                                  {patinetData?.fileNo}
                                </td>
                              </tr>
                              <tr className="d-flex">
                                <td className="pt-0 pb-0 min-w-100">
                                  <strong>Name:</strong>
                                </td>
                                <td className="pt-0 pb-0">
                                  {patinetData?.salutation +
                                    " " +
                                    patinetData?.firstName +
                                    " " +
                                    patinetData?.lastName}
                                </td>
                              </tr>
                              <tr className="d-flex">
                                <td className="pt-0 pb-0 min-w-100">
                                  <strong>D.O.B:</strong>
                                </td>
                                <td className="pt-0 pb-0">
                                  {moment(patinetData?.dob).format(
                                    "DD/MM/YYYY"
                                  )}
                                </td>
                              </tr>
                              <tr className="d-flex">
                                <td className="pt-0 pb-0 min-w-100">
                                  <strong>Gender:</strong>
                                </td>
                                <td className="pt-0 pb-0">
                                  {patinetData?.gender}
                                </td>
                              </tr>
                              <tr className="d-flex">
                                <td className="pt-0 pb-0 min-w-100">
                                  <strong>Email:</strong>
                                </td>
                                <td className="pt-0 pb-0">
                                  {patinetData?.email}
                                </td>
                              </tr>
                              <tr className="d-flex">
                                <td className="pt-0 pb-0 min-w-100">
                                  <strong>Phone:</strong>
                                </td>
                                <td className="pt-0 pb-0">
                                  {patinetData?.contactNo}
                                </td>
                              </tr>
                            </thead>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  {dataReports?.functional?.SI?.cm ? (
                    <>
                      {" "}
                      <p className="MsoNormal">
                        <span
                          lang="EN"
                          style={{
                            fontSize: "10.0pt",
                            lineHeight: "115%",
                            background: "white",
                          }}
                        >
                          &nbsp;
                        </span>
                      </p>
                      <p className="MsoNormal">
                        <span
                          lang="EN"
                          style={{
                            fontSize: "10.0pt",
                            lineHeight: "115%",
                            background: "white",
                          }}
                        >
                          {console.log(consultaionData, "daconcniiddiidnc")}
                          Date of Initial Consultation and Examination:{" "}
                          <b>
                            {moment(consultaionData?.[0]?.date).format(
                              "DD/MM/YYYY"
                            )}
                            <br />
                          </b>
                          <br />
                          <b>List of Initial Complaints</b>
                        </span>
                      </p>
                      {Boolean(consultaionData?.length)
                        ? consultaionData?.map((v) => {
                            return (
                              <p className="MsoNormal">
                                <span
                                  lang="EN"
                                  style={{
                                    fontSize: "10.0pt",
                                    lineHeight: "115%",
                                    background: "white",
                                  }}
                                >
                                  {v?.symptom}
                                </span>
                                <span
                                  style={{
                                    fontSize: "10.0pt",
                                    lineHeight: "115%",
                                    background: "white",
                                  }}
                                >
                                  {v?.position && "-"}{" "}
                                  {v?.position?.toLowerCase()}
                                  &nbsp;
                                  {v?.blt == "true" && "Bilateral"}{" "}
                                  {v?.position && "to"} &nbsp;
                                  {v?.radiates}
                                </span>
                              </p>
                            );
                          })
                        : "-"}
                      <p className="MsoNormal">
                        <span
                          lang="EN"
                          style={{
                            fontSize: "10.0pt",
                            lineHeight: "115%",
                            background: "white",
                          }}
                        >
                          <br />
                          <b>Warrning:</b>
                        </span>
                      </p>
                      {Boolean(warnings?.length)
                        ? warnings?.map((v) => {
                            return <div>{v}</div>;
                          })
                        : "-"}
                      {/* <div>Scoliosis</div>
<div>Osteoporosis</div> */}
                      <p />
                      <p className="MsoNormal">
                        <span
                          lang="EN"
                          style={{
                            fontSize: "10.0pt",
                            lineHeight: "115%",
                            background: "white",
                          }}
                        >
                          <br />
                          <b>Lumbar Examination:</b>
                          <br />
                          {dataReports?.functional?.SI?.position?.left ||
                          dataReports?.functional?.SI?.position?.right ? (
                            `The ${
                              (dataReports?.functional?.SI?.position?.left &&
                                "left") ||
                              (dataReports?.functional?.SI?.position?.right &&
                                "right")
                            } pelvic crest was lower than the ${
                              !dataReports?.functional?.SI?.position?.left
                                ? "left"
                                : " " ||
                                  dataReports?.functional?.SI?.position?.right
                                ? "right"
                                : ""
                            } by ${dataReports?.functional?.SI?.cm} cm on
    the standing evaluation, while`
                          ) : (
                            <></>
                          )}{" "}
                          {dataReports?.functional?.ProneCrest?.position
                            ?.left ||
                          dataReports?.functional?.ProneCrest?.position
                            ?.right ? (
                            `the prone evaluation showed
    a high ${
      (dataReports?.functional?.ProneCrest?.position?.left && "left") ||
      (dataReports?.functional?.ProneCrest?.position?.right && "right")
    } crest ${
                              dataReports?.functional?.ProneCrest?.cm
                            } cm noted on the prone review.`
                          ) : (
                            <></>
                          )}
                          {getfixedDetails() ? (
                            `The net
    translation is ${
      Number(dataReports?.functional?.SI?.cm) +
      Number(dataReports?.functional?.ProneCrest?.cm)
    } due to the fixation of the ${getfixedDetails()}
    sacroiliac joint noted on the standing evaluation.`
                          ) : (
                            <></>
                          )}
                          <br />
                          <br />
                          {dataReports?.functional?.Adams?.Lumb?.Neg ||
                          dataReports?.functional?.Adams?.Lumb?.position
                            ?.right ||
                          dataReports?.functional?.Adams?.Lumb?.position
                            ?.left ? (
                            `${functionLumar()} `
                          ) : (
                            <></>
                          )}
                          <br />
                          {dataReports?.functional?.Adams?.Thor?.Neg ||
                          dataReports?.functional?.Adams?.Thor.position
                            ?.right ||
                          dataReports?.functional?.Adams?.Thor?.position
                            ?.left ? (
                            `${functionThor()} `
                          ) : (
                            <></>
                          )}
                        </span>
                      </p>
                      <p className="MsoNormal">
                        <span
                          lang="EN"
                          style={{
                            fontSize: "10.0pt",
                            lineHeight: "115%",
                            background: "white",
                          }}
                        >
                          {/* {getdatareports(dataReports)} */}

                          {(!getdatareports(dataReports) &&
                            dataReports?.orthopadic?.lumborOrtho?.EYl?.left ==
                              "Pos") ||
                          dataReports?.orthopadic?.lumborOrtho?.FABERE?.left ==
                            "Pos" ||
                          dataReports?.orthopadic?.lumborOrtho?.LaSeague
                            ?.left == "Pos" ||
                          dataReports?.orthopadic?.lumborOrtho?.Milgram?.left ==
                            "Pos" ||
                          dataReports?.orthopadic?.lumborOrtho?.Nachlas?.left ==
                            "Pos" ||
                          dataReports?.orthopadic?.lumborOrtho?.Yeoman?.left ==
                            "Pos" ||
                          dataReports?.orthopadic?.sottoHall?.lumbar.left ==
                            "Pos" ||
                          dataReports?.orthopadic?.sottoHall?.thoracic.left ==
                            "Pos"
                            ? `A lumbar orthopedic examination revealed positive Left ,`
                            : ""}
                          {!getdatareports(dataReports) &&
                          dataReports?.orthopadic?.lumborOrtho?.EYl?.left ==
                            "Pos"
                            ? `   ELY's tests for ${
                                dataReports?.orthopadic?.lumborOrtho?.EYl
                                  ?.leftOption?.SI
                                  ? "sacroiliac pain"
                                  : ""
                              }${
                                dataReports?.orthopadic?.lumborOrtho?.EYl
                                  ?.leftOption?.HIP
                                  ? "Hip involvement"
                                  : ""
                              }${
                                dataReports?.orthopadic?.lumborOrtho?.EYl
                                  ?.leftOption?.LB
                                  ? "low back"
                                  : ""
                              },`
                            : ""}
                          {!getdatareports(dataReports) &&
                          dataReports?.orthopadic?.lumborOrtho?.FABERE?.left ==
                            "Pos"
                            ? `   FABERE tests for ${
                                dataReports?.orthopadic?.lumborOrtho?.FABERE
                                  ?.leftOption?.SI
                                  ? "sacroiliac pain"
                                  : ""
                              }${
                                dataReports?.orthopadic?.lumborOrtho?.FABERE
                                  ?.leftOption?.HIP
                                  ? "Hip involvement"
                                  : ""
                              }${
                                dataReports?.orthopadic?.lumborOrtho?.FABERE
                                  ?.leftOption?.LB
                                  ? "low back"
                                  : ""
                              },`
                            : ""}
                          {!getdatareports(dataReports) &&
                          dataReports?.orthopadic?.lumborOrtho?.LaSeague
                            ?.left == "Pos"
                            ? `   LaSeague tests ,`
                            : ""}
                          {!getdatareports(dataReports) &&
                          dataReports?.orthopadic?.lumborOrtho?.Milgram?.left ==
                            "Pos"
                            ? `   Milgram tests for ${
                                dataReports?.orthopadic?.lumborOrtho?.Milgram
                                  ?.leftOption?.SI
                                  ? "sacroiliac pain"
                                  : ""
                              }${
                                dataReports?.orthopadic?.lumborOrtho?.Milgram
                                  ?.leftOption?.HIP
                                  ? "Hip involvement"
                                  : ""
                              }${
                                dataReports?.orthopadic?.lumborOrtho?.Milgram
                                  ?.leftOption?.LB
                                  ? "low back"
                                  : ""
                              },`
                            : ""}
                          {!getdatareports(dataReports) &&
                          dataReports?.orthopadic?.lumborOrtho?.Nachlas?.left ==
                            "Pos"
                            ? `   Nachlas tests for ${
                                dataReports?.orthopadic?.lumborOrtho?.Milgram
                                  ?.Nachlas?.SI
                                  ? "sacroiliac pain"
                                  : ""
                              }${
                                dataReports?.orthopadic?.lumborOrtho?.Nachlas
                                  ?.leftOption?.HIP
                                  ? "Hip involvement"
                                  : ""
                              }${
                                dataReports?.orthopadic?.lumborOrtho?.Nachlas
                                  ?.leftOption?.LB
                                  ? "low back"
                                  : ""
                              },`
                            : ""}
                          {!getdatareports(dataReports) &&
                          dataReports?.orthopadic?.lumborOrtho?.Yeoman?.left ==
                            "Pos"
                            ? `   Yeoman tests for ${
                                dataReports?.orthopadic?.lumborOrtho?.Yeoman
                                  ?.leftOption?.SI
                                  ? "sacroiliac pain"
                                  : ""
                              }${
                                dataReports?.orthopadic?.lumborOrtho?.Yeoman
                                  ?.leftOption?.HIP
                                  ? "Hip involvement"
                                  : ""
                              }${
                                dataReports?.orthopadic?.lumborOrtho?.Yeoman
                                  ?.leftOption?.LB
                                  ? "low back"
                                  : ""
                              },`
                            : ""}
                          {!getdatareports(dataReports) &&
                          dataReports?.orthopadic?.sottoHall?.lumbar.left ==
                            "Pos"
                            ? ` sottoHall    lumbar tests  ,`
                            : ""}
                          {!getdatareports(dataReports) &&
                          dataReports?.orthopadic?.sottoHall?.thoracic.left ==
                            "Pos"
                            ? `sottoHall   thoracic tests  .`
                            : ""}

                          {!getdatareports(dataReports) &&
                          dataReports?.orthopadic?.lumborOrtho?.EYl?.right ==
                            "Pos"
                            ? `  ELY's tests for ${
                                dataReports?.orthopadic?.lumborOrtho?.EYl
                                  ?.rightOption?.SI
                                  ? "sacroiliac pain"
                                  : ""
                              }${
                                dataReports?.orthopadic?.lumborOrtho?.EYl
                                  ?.rightOption?.HIP
                                  ? "Hip involvement"
                                  : ""
                              }${
                                dataReports?.orthopadic?.lumborOrtho?.EYl
                                  ?.rightOption?.LB
                                  ? "low back"
                                  : ""
                              },`
                            : ""}
                          {!getdatareports(dataReports) &&
                          dataReports?.orthopadic?.lumborOrtho?.FABERE?.right ==
                            "Pos"
                            ? `  FABERE tests for ${
                                dataReports?.orthopadic?.lumborOrtho?.FABERE
                                  ?.rightOption?.SI
                                  ? "sacroiliac pain"
                                  : ""
                              }${
                                dataReports?.orthopadic?.lumborOrtho?.FABERE
                                  ?.rightOption?.HIP
                                  ? "Hip involvement"
                                  : ""
                              }${
                                dataReports?.orthopadic?.lumborOrtho?.FABERE
                                  ?.rightOption?.LB
                                  ? "low back"
                                  : ""
                              },`
                            : ""}
                          {!getdatareports(dataReports) &&
                          dataReports?.orthopadic?.lumborOrtho?.LaSeague
                            ?.right == "Pos"
                            ? `  LaSeague tests ,`
                            : ""}
                          {!getdatareports(dataReports) &&
                          dataReports?.orthopadic?.lumborOrtho?.Milgram
                            ?.right == "Pos"
                            ? `  Milgram tests for ${
                                dataReports?.orthopadic?.lumborOrtho?.Milgram
                                  ?.rightOption?.SI
                                  ? "sacroiliac pain"
                                  : ""
                              }${
                                dataReports?.orthopadic?.lumborOrtho?.Milgram
                                  ?.rightOption?.HIP
                                  ? "Hip involvement"
                                  : ""
                              }${
                                dataReports?.orthopadic?.lumborOrtho?.Milgram
                                  ?.rightOption?.LB
                                  ? "low back"
                                  : ""
                              },`
                            : ""}
                          {!getdatareports(dataReports) &&
                          dataReports?.orthopadic?.lumborOrtho?.Nachlas
                            ?.right == "Pos"
                            ? `  Nachlas tests for ${
                                dataReports?.orthopadic?.lumborOrtho?.Milgram
                                  ?.Nachlas?.SI
                                  ? "sacroiliac pain"
                                  : ""
                              }${
                                dataReports?.orthopadic?.lumborOrtho?.Nachlas
                                  ?.rightOption?.HIP
                                  ? "Hip involvement"
                                  : ""
                              }${
                                dataReports?.orthopadic?.lumborOrtho?.Nachlas
                                  ?.rightOption?.LB
                                  ? "low back"
                                  : ""
                              },`
                            : ""}
                          {!getdatareports(dataReports) &&
                          dataReports?.orthopadic?.lumborOrtho?.Yeoman?.right ==
                            "Pos"
                            ? `  Yeoman tests for ${
                                dataReports?.orthopadic?.lumborOrtho?.Yeoman
                                  ?.rightOption?.SI
                                  ? "sacroiliac pain"
                                  : ""
                              }${
                                dataReports?.orthopadic?.lumborOrtho?.Yeoman
                                  ?.rightOption?.HIP
                                  ? "Hip involvement"
                                  : ""
                              }${
                                dataReports?.orthopadic?.lumborOrtho?.Yeoman
                                  ?.rightOption?.LB
                                  ? "low back"
                                  : ""
                              },`
                            : ""}
                          {!getdatareports(dataReports) &&
                          dataReports?.orthopadic?.sottoHall?.lumbar.right ==
                            "Pos"
                            ? `  sottoHall lumbar tests  ,`
                            : ""}
                          {!getdatareports(dataReports) &&
                          dataReports?.orthopadic?.sottoHall?.thoracic.right ==
                            "Pos"
                            ? ` sottoHall thoracic tests  .`
                            : ""}
                          {/* negative */}
                          <br />

                          {dataReports?.orthopadic?.lumborOrtho?.EYl?.right ==
                            "Neg" ||
                          dataReports?.orthopadic?.lumborOrtho?.FABERE?.right ==
                            "Neg" ||
                          dataReports?.orthopadic?.lumborOrtho?.LaSeague
                            ?.right == "Neg" ||
                          dataReports?.orthopadic?.lumborOrtho?.Milgram
                            ?.right == "Neg" ||
                          dataReports?.orthopadic?.lumborOrtho?.Nachlas
                            ?.right == "Neg" ||
                          dataReports?.orthopadic?.lumborOrtho?.Yeoman?.right ==
                            "Neg" ||
                          dataReports?.orthopadic?.sottoHall?.lumbar.right ==
                            "Neg" ||
                          dataReports?.orthopadic?.sottoHall?.thoracic.right ==
                            "Neg"
                            ? `A lumbar orthopedic examination revealed Negative right `
                            : ""}

                          {gataReportSotto(dataReports)}
                          {!gataReportSotto(dataReports) &&
                          dataReports?.orthopadic?.lumborOrtho?.EYl?.left ==
                            "Neg"
                            ? `   EYl tests  ,`
                            : ""}
                          {!gataReportSotto(dataReports) &&
                          dataReports?.orthopadic?.lumborOrtho?.FABERE?.left ==
                            "Neg"
                            ? `   FABERE tests   ,`
                            : ""}
                          {!gataReportSotto(dataReports) &&
                          dataReports?.orthopadic?.lumborOrtho?.LaSeague
                            ?.left == "Neg"
                            ? `   LaSeague tests  ,`
                            : ""}
                          {!gataReportSotto(dataReports) &&
                          dataReports?.orthopadic?.lumborOrtho?.Milgram?.left ==
                            "Neg"
                            ? `   Milgram tests  ,`
                            : ""}
                          {!gataReportSotto(dataReports) &&
                          dataReports?.orthopadic?.lumborOrtho?.Nachlas?.left ==
                            "Neg"
                            ? `   Nachlas tests ,`
                            : ""}
                          {!gataReportSotto(dataReports) &&
                          dataReports?.orthopadic?.lumborOrtho?.Yeoman?.left ==
                            "Neg"
                            ? `   Yeoman tests ,`
                            : ""}
                          {!gataReportSotto(dataReports) &&
                          dataReports?.orthopadic?.sottoHall?.lumbar.left ==
                            "Neg"
                            ? ` sottoHall  lumbar tests  , ,`
                            : ""}
                          {!gataReportSotto(dataReports) &&
                          dataReports?.orthopadic?.sottoHall?.thoracic.left ==
                            "Neg"
                            ? `sottoHall thoracic tests ,  .`
                            : ""}

                          {!gataReportSotto(dataReports) &&
                          dataReports?.orthopadic?.lumborOrtho?.EYl?.right ==
                            "Neg"
                            ? `  EYl tests ,`
                            : ""}
                          {!gataReportSotto(dataReports) &&
                          dataReports?.orthopadic?.lumborOrtho?.FABERE?.right ==
                            "Neg"
                            ? `  FABERE tests ,`
                            : ""}
                          {!gataReportSotto(dataReports) &&
                          dataReports?.orthopadic?.lumborOrtho?.LaSeague
                            ?.right == "Neg"
                            ? `  LaSeague tests, ,`
                            : ""}
                          {!gataReportSotto(dataReports) &&
                          dataReports?.orthopadic?.lumborOrtho?.Milgram
                            ?.right == "Neg"
                            ? `  Milgram tests ,`
                            : ""}
                          {!gataReportSotto(dataReports) &&
                          dataReports?.orthopadic?.lumborOrtho?.Nachlas
                            ?.right == "Neg"
                            ? `  Nachlas tests ,`
                            : ""}
                          {!gataReportSotto(dataReports) &&
                          dataReports?.orthopadic?.lumborOrtho?.Yeoman?.right ==
                            "Neg"
                            ? `  Yeoman tests ,`
                            : ""}
                          {!gataReportSotto(dataReports) &&
                          dataReports?.orthopadic?.sottoHall?.lumbar.right ==
                            "Neg"
                            ? `  sottoHall lumbar tests , ,`
                            : ""}
                          {!gataReportSotto(dataReports) &&
                          dataReports?.orthopadic?.sottoHall?.thoracic.right ==
                            "Neg"
                            ? ` sottoHall thoracic tests,  .`
                            : ""}
                          <br />
                        </span>
                      </p>
                      {dataReports?.functional?.shoulderForm?.length === 15 ? (
                        <p className="MsoNormal">
                          <span
                            lang="EN"
                            style={{
                              fontSize: "10.0pt",
                              lineHeight: "115%",
                              background: "white",
                            }}
                          >
                            All shoulder muscles resistance test were 5+ and
                            painless.
                          </span>
                        </p>
                      ) : (
                        <p className="MsoNormal mt-2">
                          <span
                            lang="EN"
                            style={{
                              fontSize: "10.0pt",
                              lineHeight: "115%",
                              background: "white",
                            }}
                          >
                            {/* The pain was elicited by resistance and localized to the
following shoulder muscles: */}
                            {/* the left supra- and
infraspinatus, levator scapula, rhomboid, and teres
muscles. */}
                            <p
                              style={{
                                fontSize: "10.0pt",
                                lineHeight: "115%",
                                background: "white",
                              }}
                            >
                              {dataReports?.functional?.shoulderForm[0]
                                ?.testName
                                ? "Active resistance resulted in pain of the following shoulder muscles: "
                                : ""}
                              <br />
                              {dataReports?.functional?.shoulderForm.map(
                                (e) => {
                                  return (
                                    <>
                                      <p>
                                        {e?.left ? "left " : ""}
                                        {e?.right ? "&  right " : ""}
                                        {e?.testName}
                                      </p>
                                    </>
                                  );
                                }
                              )}
                            </p>
                          </span>
                        </p>
                      )}
                      <p className="MsoNormal">
                        <span
                          lang="EN"
                          style={{
                            fontSize: "10.0pt",
                            lineHeight: "115%",
                            background: "white",
                          }}
                        >
                          {getDeepTendonElbow(dataReports, "achills")} <br />
                          {getDeepTendonElbow(dataReports, "patellar")}
                        </span>
                      </p>
                      <span
                        lang="EN"
                        style={{
                          fontSize: "10.0pt",
                          lineHeight: "115%",
                          background: "white",
                        }}
                      >
                        <br />
                        <b>Cervical Examination :</b>
                        <br />
                      </span>
                      <p className="MsoNormal">
                        <span
                          lang="EN"
                          style={{
                            fontSize: "10.0pt",
                            lineHeight: "115%",
                            background: "white",
                          }}
                        >
                          {console.log(dec?.length, "lenfnfjfjfj")}
                          {dec?.length
                            ? "Evaluation of the cervical ranges of motion  on " +
                              getDECValue(dec) +
                              ` ${
                                dec?.length > 1 ? "were" : "was"
                              } reduced , and Increased on ` +
                              getDECValue(inc)
                            : ""}{" "}
                          {/* {inc?.length ? getDecValue(inc) + `${inc?.length > 1 ? "were":"was"} increased,` : ""}{" "} */}
                          {gt?.length
                            ? "while the rest were within normal limits."
                            : ""}
                          {/* {
"Evaluation of the cervical ranges of motion were " + getDecValue(dec) + " reduced bilateraly"  
      } */}
                        </span>
                      </p>
                      {/* <br /> */}
                      <p className="MsoNormal">
                        <span
                          lang="EN"
                          style={{
                            fontSize: "10.0pt",
                            lineHeight: "115%",
                            background: "white",
                          }}
                        >
                          {getOthopediccervical(dataReports)}
                          {!getOthopediccervical(dataReports) &&
                          dataReports?.orthopadic?.cervical?.jackson
                            ? dataReports?.orthopadic?.cervical?.jackson ==
                              "Pos"
                              ? dataReports?.orthopadic?.cervical?.dist == "Pos"
                                ? "Jackson’s test was positive, and distraction was postive."
                                : ""
                              : ""
                            : ""}
                          {!getOthopediccervical(dataReports) &&
                          dataReports?.orthopadic?.cervical?.jackson
                            ? dataReports?.orthopadic?.cervical?.jackson ==
                              "Pos"
                              ? dataReports?.orthopadic?.cervical?.dist == "Neg"
                                ? "Jackson’s test was positive, and distraction was nagitive."
                                : ""
                              : ""
                            : ""}
                          {!getOthopediccervical(dataReports) &&
                          dataReports?.orthopadic?.cervical?.jackson
                            ? dataReports?.orthopadic?.cervical?.jackson ==
                              "Neg"
                              ? "Jackson’s test was positive, and distraction was nagitive."
                              : ""
                            : ""}
                          {/* {dataReports?.orthopadic?.cervicalNag ? "All Cervical orthopedic tests performed were Positive bilaterally" : ""} */}
                          {/* {dataReports?.orthopadic?.cervicalPos ? "All Cervical orthopedic tests performed were Positive bilaterally" : ""} */}
                          <br />

                          {/* {dataReports?.orthopadic?.cervical?.ShldrDep?.left?dataReports?.orthopadic?.cervical?.ShldrDep?.left=="Pos"&&!dataReports?.orthopadic?.cervical?.ShldrDep?.right=="Pos"?"ShldrDep's test was positive on the left ":"":""}
    {dataReports?.orthopadic?.cervical?.ShldrDep?.left?dataReports?.orthopadic?.cervical?.ShldrDep?.left=="Neg" &&!dataReports?.orthopadic?.cervical?.ShldrDep?.right=="Neg"?"ShldrDep's test was Negative on the left ":"":""}
    {dataReports?.orthopadic?.cervical?.ShldrDep?.left?dataReports?.orthopadic?.cervical?.ShldrDep?.left=="Neg"&&dataReports?.orthopadic?.cervical?.ShldrDep?.right=="Neg"?"ShldrDep's test was Negative bilateral on the left ":"":""}
    {dataReports?.orthopadic?.cervical?.ShldrDep?.left?dataReports?.orthopadic?.cervical?.ShldrDep?.left=="Pos"&&dataReports?.orthopadic?.cervical?.ShldrDep?.right=="Pos"?"ShldrDep's test was positive bilateral on the left ":"":""}
    


    {dataReports?.orthopadic?.cervical?.ShldrDep?.right?dataReports?.orthopadic?.cervical?.ShldrDep?.right=="Pos"&&dataReports?.orthopadic?.cervical?.ShldrDep?.left=="Pos"?"ShldrDep's test was positive on the right":"":""}
    {dataReports?.orthopadic?.cervical?.ShldrDep?.right?dataReports?.orthopadic?.cervical?.ShldrDep?.right=="Neg"&&dataReports?.orthopadic?.cervical?.ShldrDep?.left=="Neg"?"ShldrDep's test was negative on the right":"":""} */}
                        </span>
                      </p>
                      <p className="MsoNormal">
                        <span
                          lang="EN"
                          style={{
                            fontSize: "10.0pt",
                            lineHeight: "115%",
                            background: "white",
                          }}
                        >
                          <p>
                            {!getOthopediccervical(dataReports) &&
                            dataReports?.orthopadic?.cervical?.MFC?.left ==
                              "Neg"
                              ? "Maximum foraminal compression is negative on the left"
                              : ""}
                          </p>
                          <p>
                            {!getOthopediccervical(dataReports) &&
                            dataReports?.orthopadic?.cervical?.MFC?.right ==
                              "Neg"
                              ? "Maximum foraminal compression is negative on the right"
                              : ""}
                          </p>
                          <p>
                            {!getOthopediccervical(dataReports) &&
                            dataReports?.orthopadic?.cervical?.MFC?.right ==
                              "Pos" &&
                            dataReports?.orthopadic?.cervical?.DIST?.right ==
                              "Pos"
                              ? `Maximum foraminal compression and distraction were positive on the right cervical orthopedic examination. `
                              : ""}
                          </p>
                          <p>
                            {!getOthopediccervical(dataReports) &&
                            dataReports?.orthopadic?.cervical?.MFC?.left ==
                              "Pos" &&
                            dataReports?.orthopadic?.cervical?.DIST?.left ==
                              "Pos"
                              ? `Maximum foraminal compression and distraction were positive on the left cervical orthopedic examination. `
                              : ""}
                          </p>
                          <p>
                            {!getOthopediccervical(dataReports) &&
                            dataReports?.orthopadic?.cervical?.MFC?.right ==
                              "Pos" &&
                            dataReports?.orthopadic?.cervical?.DIST?.right ==
                              "Neg"
                              ? `Maximum foraminal compression is positive, and distraction was negative on the right cervical orthopedic examination.`
                              : ""}
                          </p>
                          <p>
                            {!getOthopediccervical(dataReports) &&
                            dataReports?.orthopadic?.cervical?.MFC?.left ==
                              "Pos" &&
                            dataReports?.orthopadic?.cervical?.DIST?.left ==
                              "Neg"
                              ? `Maximum foraminal compression is positive, and distraction was negative on the left cervical orthopedic examination.`
                              : ""}
                          </p>

                          <br />
                          {console.log(
                            getOtheo(dataReports, "tiosoijfdifuduas")
                          )}
                          <p>
                            {getOtheo(dataReports)
                              ? `Wright's test was ` + getOtheo(dataReports)
                              : ""}
                            {/* {!getOthopediccervical(dataReports) &&
      dataReports?.orthopadic?.cervical?.Wrights?.left ==
        "Neg"
        ? "Wright's test is negative on the left"
        : ""}
    </p>
    <p>
      {!getOthopediccervical(dataReports) &&
      dataReports?.orthopadic?.cervical?.Wrights?.right ==
        "Neg"
        ? "Wright's test is negative on the right"
        : ""}
    </p>
    <p>
      {!getOthopediccervical(dataReports) &&
      dataReports?.orthopadic?.cervical?.Wrights?.right ==
        "Pos" &&
      dataReports?.orthopadic?.cervical?.Scalene?.right
        ? `Wright's test is positive on the right cervical orthopedic examination and Scalene is ${dataReports?.orthopadic?.cervical?.Scalene?.right}`
        : ""} */}
                          </p>
                          <p>
                            {!getOthopediccervical(dataReports) &&
                            dataReports?.orthopadic?.cervical?.Wrights?.left ==
                              "Pos" &&
                            dataReports?.orthopadic?.cervical?.Scalene?.left
                              ? `Wright's test is positive on the left cervical orthopedic examination and Scalene is  ${dataReports?.orthopadic?.cervical?.Scalene?.left} `
                              : ""}
                          </p>
                        </span>
                      </p>
                      {/* <br /> */}
                      <p className="MsoNormal">
                        <span
                          lang="EN"
                          style={{
                            fontSize: "10.0pt",
                            lineHeight: "115%",
                            background: "white",
                          }}
                        >
                          <br />
                          {!getOthopediccervical(dataReports) &&
                            sholderDeepTest(dataReports)}
                          {/* {dataReports?.orthopadic?.cervical?.ShldrDep?.left?dataReports?.orthopadic?.cervical?.ShldrDep?.left=="Pos"&&!dataReports?.orthopadic?.cervical?.ShldrDep?.right=="Pos"?"ShldrDep's test was positive on the left ":"":""}
    {dataReports?.orthopadic?.cervical?.ShldrDep?.left?dataReports?.orthopadic?.cervical?.ShldrDep?.left=="Neg" &&!dataReports?.orthopadic?.cervical?.ShldrDep?.right=="Neg"?"ShldrDep's test was Negative on the left ":"":""}
    {dataReports?.orthopadic?.cervical?.ShldrDep?.left?dataReports?.orthopadic?.cervical?.ShldrDep?.left=="Neg"&&dataReports?.orthopadic?.cervical?.ShldrDep?.right=="Neg"?"ShldrDep's test was Negative bilateral on the left ":"":""}
    {dataReports?.orthopadic?.cervical?.ShldrDep?.left?dataReports?.orthopadic?.cervical?.ShldrDep?.left=="Pos"&&dataReports?.orthopadic?.cervical?.ShldrDep?.right=="Pos"?"ShldrDep's test was positive bilateral on the left ":"":""}
    


    {dataReports?.orthopadic?.cervical?.ShldrDep?.right?dataReports?.orthopadic?.cervical?.ShldrDep?.right=="Pos"&&dataReports?.orthopadic?.cervical?.ShldrDep?.left=="Pos"?"ShldrDep's test was positive on the right":"":""}
    {dataReports?.orthopadic?.cervical?.ShldrDep?.right?dataReports?.orthopadic?.cervical?.ShldrDep?.right=="Neg"&&dataReports?.orthopadic?.cervical?.ShldrDep?.left=="Neg"?"ShldrDep's test was negative on the right":"":""} */}
                        </span>
                      </p>
                      <p className="MsoNormal">
                        <span
                          lang="EN"
                          style={{
                            fontSize: "10.0pt",
                            lineHeight: "115%",
                            background: "white",
                          }}
                        >
                          {!getOthopediccervical(dataReports) &&
                            sholderGeorge(dataReports)}
                        </span>
                      </p>
                      <p className="MsoNormal">
                        <span
                          lang="EN"
                          style={{
                            fontSize: "10.0pt",
                            lineHeight: "115%",
                            background: "white",
                          }}
                        >
                          {getDeepTendonBiceps(dataReports, "biceps")} <br />{" "}
                          {getDeepTendonBiceps(dataReports, "triceps")} <br />{" "}
                          {getDeepTendonBiceps(dataReports, "brachiorad")}
                        </span>
                      </p>
                      {/* <p className="MsoNormal">
  <span
    lang="EN"
    style={{
      fontSize: "10.0pt",
      lineHeight: "115%",
      background: "white",
    }}
  >
    {getOthopedic(dataReports)}
    {dataReports?.orthopadic?.deepTendonReflexes?.biceps
      ?.left ||
    dataReports?.orthopadic?.deepTendonReflexes?.biceps
      ?.right ||
    dataReports?.orthopadic?.deepTendonReflexes?.brachiorad
      ?.left ||
    dataReports?.orthopadic?.deepTendonReflexes?.brachiorad
      ?.right ||
    dataReports?.orthopadic?.deepTendonReflexes?.triceps
      ?.left ||
    dataReports?.orthopadic?.deepTendonReflexes?.triceps
      ?.right
      ? `Deep tendon reflexes in `
      : ""}

    {!getOthopedic(dataReports) &&
    dataReports?.orthopadic?.deepTendonReflexes?.biceps
      ?.left &&
    !dataReports?.orthopadic?.deepTendonReflexes?.biceps
      ?.right &&
    !dataReports?.orthopadic?.deepTendonReflexes?.brachiorad
      ?.left &&
    !dataReports?.orthopadic?.deepTendonReflexes?.brachiorad
      ?.right &&
    !dataReports?.orthopadic?.deepTendonReflexes?.triceps
      ?.left &&
    !dataReports?.orthopadic?.deepTendonReflexes?.triceps
      ?.right
      ? ` the left biceps were ${dataReports?.orthopadic?.deepTendonReflexes?.biceps?.left} .`
      : ""}

    {!getOthopedic(dataReports) &&
    dataReports?.orthopadic?.deepTendonReflexes?.biceps
      ?.right &&
    !dataReports?.orthopadic?.deepTendonReflexes?.biceps
      ?.left &&
    !dataReports?.orthopadic?.deepTendonReflexes?.brachiorad
      ?.left &&
    !dataReports?.orthopadic?.deepTendonReflexes?.brachiorad
      ?.right &&
    !dataReports?.orthopadic?.deepTendonReflexes?.triceps
      ?.left &&
    !dataReports?.orthopadic?.deepTendonReflexes?.triceps
      ?.right
      ? ` the right biceps were ${dataReports?.orthopadic?.deepTendonReflexes?.biceps?.right} .`
      : ""}

    {!getOthopedic(dataReports) &&
    dataReports?.orthopadic?.deepTendonReflexes?.brachiorad
      ?.left &&
    !dataReports?.orthopadic?.deepTendonReflexes?.biceps
      ?.right &&
    !dataReports?.orthopadic?.deepTendonReflexes?.biceps
      ?.left &&
    !dataReports?.orthopadic?.deepTendonReflexes?.brachiorad
      ?.right &&
    !dataReports?.orthopadic?.deepTendonReflexes?.triceps
      ?.left &&
    !dataReports?.orthopadic?.deepTendonReflexes?.triceps
      ?.right
      ? ` the left brachiorad were ${dataReports?.orthopadic?.deepTendonReflexes?.brachiorad?.left} .`
      : ""}
    {!getOthopedic(dataReports) &&
    dataReports?.orthopadic?.deepTendonReflexes?.brachiorad
      ?.right &&
    !dataReports?.orthopadic?.deepTendonReflexes?.brachiorad
      ?.left &&
    !dataReports?.orthopadic?.deepTendonReflexes?.biceps
      ?.right &&
    !dataReports?.orthopadic?.deepTendonReflexes?.biceps
      ?.left &&
    !dataReports?.orthopadic?.deepTendonReflexes?.triceps
      ?.left &&
    !dataReports?.orthopadic?.deepTendonReflexes?.triceps
      ?.right
      ? ` the right brachiorad were ${dataReports?.orthopadic?.deepTendonReflexes?.brachiorad?.right} .`
      : ""}

    {!getOthopedic(dataReports) &&
    dataReports?.orthopadic?.deepTendonReflexes?.triceps
      ?.left &&
    !dataReports?.orthopadic?.deepTendonReflexes?.brachiorad
      ?.right &&
    !dataReports?.orthopadic?.deepTendonReflexes?.brachiorad
      ?.left &&
    !dataReports?.orthopadic?.deepTendonReflexes?.biceps
      ?.right &&
    !dataReports?.orthopadic?.deepTendonReflexes?.biceps
      ?.left &&
    !dataReports?.orthopadic?.deepTendonReflexes?.triceps
      ?.right
      ? ` the left triceps were ${dataReports?.orthopadic?.deepTendonReflexes?.triceps?.left} .`
      : ""}
    {!getOthopedic(dataReports) &&
    dataReports?.orthopadic?.deepTendonReflexes?.triceps
      ?.right &&
    !dataReports?.orthopadic?.deepTendonReflexes?.triceps
      ?.left &&
    !dataReports?.orthopadic?.deepTendonReflexes?.brachiorad
      ?.right &&
    !dataReports?.orthopadic?.deepTendonReflexes?.brachiorad
      ?.left &&
    !dataReports?.orthopadic?.deepTendonReflexes?.biceps
      ?.right &&
    !dataReports?.orthopadic?.deepTendonReflexes?.biceps?.left
      ? ` the right triceps were ${dataReports?.orthopadic?.deepTendonReflexes?.triceps?.right} .`
      : ""}

    {!getOthopedic(dataReports) &&
    dataReports?.orthopadic?.deepTendonReflexes?.biceps
      ?.left &&
    dataReports?.orthopadic?.deepTendonReflexes?.biceps?.right
      ? ` the left biceps were ${dataReports?.orthopadic?.deepTendonReflexes?.biceps?.left} and on the right were ${dataReports?.orthopadic?.deepTendonReflexes?.biceps?.right}`
      : ""}
    {!getOthopedic(dataReports) &&
    dataReports?.orthopadic?.deepTendonReflexes?.brachiorad
      ?.left &&
    dataReports?.orthopadic?.deepTendonReflexes?.brachiorad
      ?.right
      ? ` the left  brachiorad were ${dataReports?.orthopadic?.deepTendonReflexes?.brachiorad?.left} and on the right were ${dataReports?.orthopadic?.deepTendonReflexes?.brachiorad?.right}.`
      : ""}
    {!getOthopedic(dataReports) &&
    dataReports?.orthopadic?.deepTendonReflexes?.triceps
      ?.left &&
    dataReports?.orthopadic?.deepTendonReflexes?.triceps
      ?.right
      ? ` the left  triceps were ${dataReports?.orthopadic?.deepTendonReflexes?.triceps?.left} and on the right were ${dataReports?.orthopadic?.deepTendonReflexes?.triceps?.right}.`
      : ""}
  </span>
</p> */}
                      <br />
                      <p className="MsoNormal">
                        <b>
                          <span
                            lang="EN"
                            style={{
                              fontSize: "10.0pt",
                              lineHeight: "115%",
                              background: "white",
                            }}
                          >
                            Assessment / Diagnosis:
                          </span>
                        </b>
                      </p>
                      <p className="MsoNormal">
                        <span
                          lang="EN"
                          style={{
                            fontSize: "10.0pt",
                            lineHeight: "115%",
                            background: "white",
                          }}
                        >
                          {/* {getFunction()} */}
                          {dataReports?.diagnoses?.additionalDxs?.length ? (
                            ` ${dataReports?.diagnoses?.additionalDxs?.map(
                              (v) => {
                                return v.name;
                              }
                            )}`
                          ) : (
                            <></>
                          )}
                          <br />
                          {dataReports?.diagnoses?.bone?.length ? (
                            ` ${dataReports?.diagnoses?.bone?.map((v) => {
                              return v.name;
                            })}`
                          ) : (
                            <></>
                          )}
                          <br />
                          {dataReports?.diagnoses?.diagnose?.length ? (
                            ` ${dataReports?.diagnoses?.diagnose?.map((v) => {
                              return v.name;
                            })}`
                          ) : (
                            <></>
                          )}
                          <br />
                          {dataReports?.diagnoses?.osteopathic?.length ? (
                            ` ${dataReports?.diagnoses?.osteopathic?.map(
                              (v) => {
                                return v.name;
                              }
                            )}`
                          ) : (
                            <></>
                          )}
                        </span>
                      </p>
                      <p className="MsoNormal">
                        <span
                          lang="EN"
                          style={{
                            fontSize: "10.0pt",
                            lineHeight: "115%",
                            background: "white",
                          }}
                        >
                          {/* {functionhelp()} */}
                        </span>
                      </p>
                      <p className="MsoNormal">
                        <span
                          lang="EN"
                          style={{
                            fontSize: "10.0pt",
                            lineHeight: "115%",
                            background: "white",
                          }}
                        >
                          &nbsp;
                        </span>
                      </p>
                      <p className="MsoNormal">
                        <b>
                          <span
                            lang="EN"
                            style={{
                              fontSize: "10.0pt",
                              lineHeight: "115%",
                              color: "#1F1F1F",
                              background: "white",
                            }}
                          >
                            Treatment Plan:
                          </span>
                        </b>
                      </p>
                      <br />
                      <p className="MsoNormal">
                        <span
                          lang="EN"
                          style={{
                            fontSize: "10.0pt",
                            lineHeight: "115%",
                            background: "white",
                          }}
                        >
                          {Boolean(leftAk?.length) || Boolean(rightAk?.length)
                            ? `The ${leftAk?.map(
                                (v) => "Left " + v + ","
                              )}${rightAk?.map(
                                (v) => "Right " + v + ","
                              )} muscles will be treated using acupuncture techniques as needed.`
                            : ""}
                          {Boolean(leftMk?.length) || Boolean(rightMk?.length)
                            ? `The ${leftMk?.map(
                                (v) => "Left " + v + ","
                              )}${rightMk?.map(
                                (v) => "Right " + v + ","
                              )} muscles will be treated using manual muscles techniques as needed.`
                            : ""}
                          {Boolean(leftAkMk?.length) ||
                          Boolean(rightAkMk?.length)
                            ? `The ${leftAkMk?.map(
                                (v) => "Left " + v + ","
                              )}${rightAkMk?.map(
                                (v) => "Right " + v + ","
                              )} muscles will be treated using both acupuncture and manual muscle techniques as needed.`
                            : ""}
                          <br />
                          {/* The
    right Supraspinatous, Infraspinatous, and Rhomboid muscles
    will be treated with intramuscular acupuncture and
    kinesiotaping as needed. */}
                        </span>
                      </p>
                      <p className="MsoNormal">
                        <span
                          lang="EN"
                          style={{
                            fontSize: "10.0pt",
                            lineHeight: "115%",
                            background: "white",
                          }}
                        >
                          &nbsp;
                        </span>
                      </p>
                      <p className="MsoNormal">
                        <span
                          lang="EN"
                          style={{
                            fontSize: "10.0pt",
                            lineHeight: "115%",
                            background: "white",
                          }}
                        >
                          {console.log(treatMan, "treatman")}
                          {Boolean(Object?.keys(treatMan)?.length) && (
                            <span>
                              It is recommended that the patient receive manual
                              muscle manipulation within the regions and of the
                              muscles affecting the
                              {treatMan &&
                                Object?.keys(treatMan)?.map((key) => (
                                  <span key={key}> {key}, </span>
                                ))}
                              followed by{" "}
                              {dataReports?.treatments?.DC?.name + " "} of those
                              areas as needed.
                            </span>
                          )}
                          {Boolean(Object?.keys(treatImp)?.length) && (
                            <span>
                              {" "}
                              {Object?.keys(treatMan)?.length !== 0
                                ? "And "
                                : "It is recommended that the patient receive "}{" "}
                              Imp muscle manipulation within the regions and of
                              the muscles affecting the
                              {treatMan &&
                                Object?.keys(treatImp)?.map((key) => (
                                  <span key={key}> {key}, </span>
                                ))}
                              followed by{" "}
                              {dataReports?.treatments?.HP?.name + " "} of those
                              areas as needed.
                            </span>
                          )}
                        </span>
                      </p>
                      <p className="MsoNormal">
                        <span
                          lang="EN"
                          style={{
                            fontSize: "10.0pt",
                            lineHeight: "115%",
                            background: "white",
                          }}
                        >
                          {Boolean(Object?.keys(treatMk)?.length) && (
                            <span>
                              {" "}
                              The patient should receive Manual{" "}
                              {treatMk &&
                                Object?.keys(treatMk)?.map((key) => (
                                  <span key={key}>{key}, </span>
                                ))}{" "}
                              treatment.
                            </span>
                          )}{" "}
                          {Boolean(Object?.keys(treatAk)?.length) && (
                            <span>
                              {Object?.keys(treatMk)?.length !== 0
                                ? "And "
                                : "It is recommended that the patient receive "}
                              {treatAk &&
                                Object?.keys(treatAk)?.map((key) => (
                                  <span key={key}>{key}, </span>
                                ))}{" "}
                              treatment by using the acupuncture technique.{" "}
                            </span>
                          )}
                          <br />
                          <br />
                          {Boolean(Object?.keys(treatAkMk)?.length) && (
                            <span>
                              The patient should receive{" "}
                              {treatAkMk &&
                                Object?.keys(treatAkMk)?.map((key) => (
                                  <span key={key}>{key}, </span>
                                ))}{" "}
                              treatment by using both manual and acupuncture
                              techniques.
                            </span>
                          )}
                        </span>
                      </p>
                      <br />
                      <p className="MsoNormal">
                        <span
                          lang="EN"
                          style={{
                            fontSize: "10.0pt",
                            lineHeight: "115%",
                            background: "white",
                          }}
                        >
                          {Boolean(kineLeft?.length) ? (
                            <span>
                              {" "}
                              Patients should get kinesiotaping on the left{" "}
                              {kineLeft?.map((v) => {
                                return v + ", ";
                              })}{" "}
                              and right{" "}
                              {kineRight?.map((v) => {
                                return v + ", ";
                              })}
                              .
                            </span>
                          ) : (
                            " "
                          )}
                        </span>
                      </p>
                      <br />
                      {dataReports?.treatments?.Kinesiotaping
                        ?.treatmentFrequency?.treatmentLeft &&
                        dataReports?.treatments?.Kinesiotaping
                          ?.treatmentFrequency?.duration && (
                          <p className="MsoNormal">
                            <span
                              lang="EN"
                              style={{
                                fontSize: "10.0pt",
                                lineHeight: "115%",
                                background: "white",
                              }}
                            >
                              {console.log(dataReports, "dateareposert")}
                              The patient should be seen at a frequency of{" "}
                              {dataReports?.treatments?.Kinesiotaping
                                ?.treatmentPlan?.asNeed + " "}
                              for a duration of{" "}
                              {dataReports?.treatments?.Kinesiotaping
                                ?.treatmentFrequency?.treatmentLeft +
                                " " +
                                dataReports?.treatments?.Kinesiotaping
                                  ?.treatmentFrequency?.duration +
                                " "}{" "}
                              , at which time continued care will be determined.
                            </span>
                          </p>
                        )}
                      <p className="MsoNormal">
                        <span
                          lang="EN"
                          style={{
                            fontSize: "10.0pt",
                            lineHeight: "115%",
                            background: "white",
                          }}
                        >
                          &nbsp;
                        </span>
                      </p>
                      <p className="MsoNormal">
                        <b>
                          <span
                            lang="EN"
                            style={{
                              fontSize: "10.0pt",
                              lineHeight: "115%",
                              background: "white",
                            }}
                          >
                            Attending Chiropracto
                          </span>
                        </b>
                        <span
                          lang="EN"
                          style={{
                            fontSize: "10.0pt",
                            lineHeight: "115%",
                            background: "white",
                          }}
                        >
                          r: {dataReports?.treatments?.DC?.name}
                        </span>
                      </p>
                      <p className="MsoNormal">
                        <b>
                          <span
                            lang="EN"
                            style={{
                              fontSize: "10.0pt",
                              lineHeight: "115%",
                              background: "white",
                            }}
                          >
                            Attending HP
                          </span>
                        </b>
                        <span
                          lang="EN"
                          style={{
                            fontSize: "10.0pt",
                            lineHeight: "115%",
                            background: "white",
                          }}
                        >
                          : {dataReports?.treatments?.HP?.name}
                        </span>
                      </p>
                    </>
                  ) : (
                    <div
                      className="row d-flex"
                      style={{ justifyContent: "center" }}
                    >
                      <div style={{ width: "100px" }}>
                        <Loader />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExaminationpReports;
