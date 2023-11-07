import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
// import { getSingleVisitApi, getVisitDetailsApiById } from "../../Apis";
import { getSingleVisitApi, getVisitDetailsApiById } from "../../../Apis/healthcareProvider";
import { useEffect } from "react";
import moment from "moment";
import { getExaminationListById } from "../../../Apis";

const VisitDetailsView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dataReports, setDataReports] = useState();
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
  const [diagnosedata, setdiagnosedata] = useState([]);
  const [inc, setinc] = useState([]);
  const handleBill = () => {
    navigate("/PatientsBilling/PatientsBilling", {
      state: { id: location?.state?.patientId },
    });
  };
  console.log(location, "locationkdi");
  const getDecValue = (data) => {
    let d = data?.map((v) => {
      switch (v) {
        case "FLX":
          return " Flexion";
        case "EXT":
          return "Extension";
        case "RLB":
          return "Right lateral flexion";
        case "LLB":
          return "Left lateral flexion";
        case "PROT":
          return "Right rotation";
        case "LROT":
          return "Left rotation";
        default:
          return "";
      }
    });
    return d + " ";
    console.log(d, "reduced value");
  };
  const getExaminations = async (id) => {
    try {
      const res = await getExaminationListById(id);
      if (res.status === 200 || res.status === 201) {
        console.log(res, "EXMAJGADJ");
        DiagnoseManage(res?.data?.allExamination);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const DiagnoseManage = (DataBundle) => {
    setdiagnosedata([]);
    console.log(DataBundle[0].diagnoses, "databunderle", diagnosedata);
    let p = [];
    Boolean(DataBundle[0].diagnoses?.additionalDxs?.length) &&
      DataBundle[0].diagnoses?.additionalDxs?.map((v) => p.push(v));
    Boolean(DataBundle[0].diagnoses?.bone?.length) &&
      DataBundle[0].diagnoses?.bone?.map((v) => p.push(v));
    Boolean(DataBundle[0].diagnoses?.diagnose?.length) &&
      DataBundle[0].diagnoses?.diagnose?.map((v) => p.push(v));
    Boolean(DataBundle[0].diagnoses?.osteopathic?.length) &&
      DataBundle[0].diagnoses?.osteopathic?.map((v) => p.push(v));
    console.log(p, "diadgiaosndgosfd");
    setdiagnosedata(p);
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
      return true;
    } else {
      return null;
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
  const getOthopediccervical = (dataReports) => {
    if (dataReports?.orthopadic?.cervicalNag) {
      return "All Cervical orthopedic tests performed were Positive bilaterally";
    } else if (dataReports?.orthopadic?.cervicalPos) {
      return "All Cervical orthopedic tests performed were Positive bilaterally";
    } else {
      return null;
    }
  };
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
  const getdatareports = () => {
    if (dataReports?.orthopadic?.lumbarPos) {
      return `All lumbar orthopedic tests performed were Positive bilaterally.`;
    } else if (dataReports?.orthopadic?.lunbarNag) {
      return `All lumbar orthopedic tests performed were Negative bilaterally.`;
    } else {
      return null;
    }
  };
  const functionThor = () => {
    if (dataReports?.functional?.Adams?.Thor?.Neg) {
      return "Adam's test was negative for scoliosis in the Thoracic spinal";
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
  const functionLumar = () => {
    // dataReports?.functional?.Adams?.Lumb?.Neg||dataReports?.functional?.Adams?.Lumb?.position?.right||dataReports?.functional?.Adams?.Lumb?.position?.left
    if (dataReports?.functional?.Adams?.Lumb?.Neg) {
      return "Adam's test was negative for scoliosis in the lumbar spinal";
    } else if (dataReports?.functional?.Adams?.Lumb?.position?.right) {
      return `Adam's forward bending test was positive on the right side of the lumbar spine, ${
        dataReports?.functional?.Adams?.Lumb?.Deg &&
        `and the lateral lumbar curvature was measured and is approximately ${dataReports?.functional?.Adams?.Lumb?.Deg} degrees.`
      }`;
    } else if (dataReports?.functional?.Adams?.Lumb?.position?.left) {
      return `Adam's forward bending test was positive on the left side of the lumbar spine, ${
        dataReports?.functional?.Adams?.Lumb?.Deg &&
        `and the lateral lumbar curvature was measured and is approximately ${dataReports?.functional?.Adams?.Lumb?.Deg} degrees.`
      }`;
    } else {
      return "no contents";
    }
  };
  const getCervical = (data) => {
    if (
      data?.Crom?.EXT?.Dec ||
      data?.Crom?.EXT?.Inc ||
      data?.Crom?.EXT?.Normal
    ) {
      return "T2 Ribs";
    }
  };
  const getSi =(data)=>{
    if(data?.SI?.position?.left&&data?.Adams?.FixedSI?.position?.left){
      return " Open Left"
    }else if(data?.SI?.position?.right&&data?.Adams?.FixedSI?.position?.right){
      return " Open Right"
    }else if(data?.SI?.position?.right&&data?.Adams?.FixedSI?.position?.left){
      return " Closed Left"
    }else if(data?.SI?.position?.left&&data?.Adams?.FixedSI?.position?.right){
      return " Closed Right"
    }
    else if(data?.SI?.position?.left&&data?.Adams?.FixedSI?.position?.BLT){
      return " Open Left / Closed Right"
    }else if(data?.SI?.position?.right&&data?.Adams?.FixedSI?.BLT){
      return " Open Right / Closed Left"
    }
    else if(data?.Adams?.FixedSI?.BLT){
      return "Open Left and Close Right"
    }else if(data?.Adams?.FixedSI?.position?.left){
      return "Open Left "
    }else if(data?.Adams?.FixedSI?.position?.right){
      return " Close Right"//new addition functionsright BLT
    }else
    {
      return false;
    }
  }
  const getCervicals = (data) => {
    if (data?.Crom?.LLB?.Dec && data?.Crom?.RLB?.Dec) {
      if (data?.Crom?.LLB?.Deg?.length || data?.Crom?.RLB?.Deg?.length) {
        if (Number(data?.Crom?.LLB?.Deg) < Number(data?.Crom?.RLB?.Deg)) {
          return "RLAT";
        } else {
          return "LLAT";
        }
      }
    }

    if (data?.Crom?.LLB?.Inc && data?.Crom?.RLB?.Inc) {
      if (data?.Crom?.LLB?.Deg?.length || data?.Crom?.RLB?.Deg?.length) {
        if (Number(data?.Crom?.LLB?.Deg) > Number(data?.Crom?.RLB?.Deg)) {
          return "RLAT";
        } else {
          return "LLAT";
        }
      }
    }

    if (data?.Crom?.LLB?.Inc && data?.Crom?.RLB?.Dec) {
      if (data?.Crom?.LLB?.Deg?.length || data?.Crom?.RLB?.Deg?.length) {
        if (Number(data?.Crom?.LLB?.Deg) > Number(data?.Crom?.RLB?.Deg)) {
          return "LLAT";
        } else {
          return "RLAT";
        }
      }
    }

    if (data?.Crom?.LLB?.Dec && data?.Crom?.RLB?.Inc) {
      if (data?.Crom?.LLB?.Deg?.length || data?.Crom?.RLB?.Deg?.length) {
        if (Number(data?.Crom?.LLB?.Deg) > Number(data?.Crom?.RLB?.Deg)) {
          return "LLAT";
        } else {
          return "RLAT";
        }
      }
    }
  };
  const getCervicalss = (data) => {
    if (data?.Crom?.LROT?.Inc && data?.Crom?.PROT?.Inc) {
      if (data?.Crom?.LROT?.Deg == data?.Crom?.PROT?.Deg) {
        return "";
      } else {
        if (data?.Crom?.LROT?.Deg?.length || data?.Crom?.PROT?.Deg?.length) {
          if (Number(data?.Crom?.LROT?.Deg) > Number(data?.Crom?.PROT?.Deg)) {
            return "RROT";
          } else {
            return "LROT";
          }
        }
      }
    }

    if (data?.Crom?.LROT?.Dec && data?.Crom?.PROT?.Dec) {
      if (data?.Crom?.LROT?.Deg == data?.Crom?.PROT?.Deg) {
        return "";
      } else {
        if (data?.Crom?.LROT?.Deg?.length || data?.Crom?.PROT?.Deg?.length) {
          if (Number(data?.Crom?.LROT?.Deg) > Number(data?.Crom?.PROT?.Deg)) {
            return "LROT";
          } else {
            return "RROT";
          }
        }
      }
    }

    if (data?.Crom?.LROT?.Dec && data?.Crom?.PROT?.Inc) {
      if (data?.Crom?.LROT?.Deg?.length || data?.Crom?.PROT?.Deg?.length) {
        if (Number(data?.Crom?.LROT?.Deg) > Number(data?.Crom?.PROT?.Deg)) {
          return "LROT";
        } else {
          return "RROT";
        }
      }
    }

    if (data?.Crom?.LROT?.Inc && data?.Crom?.PROT?.Dec) {
      if (data?.Crom?.LROT?.Deg?.length || data?.Crom?.PROT?.Deg?.length) {
        if (Number(data?.Crom?.LROT?.Deg) > Number(data?.Crom?.PROT?.Deg)) {
          return "LROT";
        } else {
          return "RROT";
        }
      }
    }
  };
  const getBmc = (data) => {
    if (
      data?.SI?.position?.left &&
      // formik1?.values?.SI?.low &&
      data?.ProneCrest?.position?.right
      // formik1?.values?.ProneCrest?.hieght
    ) {
      return "Left Lower Right Upper";
    } else if (
      !data?.SI?.position?.left &&
      !data?.SI?.position?.right &&
      !data?.ProneCrest?.position?.right &&
      !data?.ProneCrest?.position?.left
    ) {
      return "";
    } else if (
      data?.SI?.position?.left &&
      // formik1?.values?.SI?.low &&
      data?.ProneCrest?.position?.left
      // formik1?.values?.ProneCrest?.hieght
    ) {
      return "Left Lower Left Upper";
    } else if (
      data?.SI?.position?.right &&
      // formik1?.values?.SI?.low &&
      data?.ProneCrest?.position?.right
      // formik1?.values?.ProneCrest?.hieght
    ) {
      return "Right Lower Right Upper";
    } else if (
      data?.SI?.position?.right &&
      // formik1?.values?.SI?.low &&
      data?.ProneCrest?.position?.left
      // formik1?.values?.ProneCrest?.hieght
    ) {
      return "Right Lower Left Upper";
    } else if (
      data?.SI?.position?.left
      // formik1?.values?.SI?.low
    ) {
      return "Left Lower";
    } else if (data?.SI?.position?.right && data?.SI?.low) {
      return "Right Lower";
    } else {
      console.log("not active condition");
    }
  };
  const getfixedDetails = () => {
    // dataReports?.functional?.Adams?.FixedSI?.BLT||
    // dataReports?.functional?.Adams?.FixedSI?.position?.left
    // ||dataReports?.functional?.Adams?.FixedSI?.position?.right

    if (
      dataReports?.functional?.Adams?.FixedSI?.BLT &&
      dataReports?.functional?.Adams?.FixedSI?.position?.left
    ) {
      return "Left&Bilaterat";
    } else if (
      dataReports?.functional?.Adams?.FixedSI?.BLT &&
      dataReports?.functional?.Adams?.FixedSI?.position?.right
    ) {
      return "right&Bilaterat";
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
  const getvisitDetails = async (id) => {
    try {
      const res = await getSingleVisitApi(id);
      if (res.status === 200 || res.status === 201) {
        setDataReports(res?.data?.visit);
        getExaminations(res?.data?.visit?.consultationId);
        console.log(res?.data?.visit?.examinationId, "URIRUURUR");
        manageShoulderRepo(res?.data?.visit?.treatments?.shoulderOption);
        manageTreatment(res?.data?.visit?.treatments);
        manageKinesiotaping(
          res?.data?.visit?.treatments?.Kinesiotaping?.kinesiotapingPosition
        );
      }
    } catch (err) {
      toast.error("Data not found!");
    }
  };
  console.log(diagnosedata, "DATETEREPOIRU");
  const manageTreatment = (data) => {
    console.log(data, "tydateyata");
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
    console.log(man, imp, "filteddadf");
    // let man = data.DC
  };
  const manageKinesiotaping = (data) => {
    console.log(data, "dataataaddfa");
    let leftKine = [];
    let rightKine = [];
    data?.map((v) => {
      if (!v.left) return;
      leftKine.push(v.left);
    });
    data?.filter((v) => {
      if (!v.right) return;
      rightKine.push(v.right);
    });
    setKineLeft(leftKine);
    setKineRight(rightKine);
    console.log(leftKine, rightKine, "leftKkine");
  };
  const manageShoulderRepo = (data) => {
    console.log(data, "datatatat");
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
  console.log(dataReports, "DATADFDST");
  useEffect(() => {
    if (location?.state?.visitId) {
      getvisitDetails(location?.state?.visitId);
    }
  }, [location?.state?.visitId]);
  return (
    <>
      <div className="container-fluid mt-6">
        <div className="card mt-5">
          <div className=" card-header">
            <div className="row">
              <div className="col-lg-12">
                <div className="table-responsive">
                <div>
                            <Link
                              className="btn btn-sm btn-neutral ms-auto"
                              to={`/patients/profile?${location?.state?.patientId}`}
                              state={{ name: "visitdetailsActive" }}
                            >
                              <i className="bi bi-arrow-left-circle"></i> Back{" "}
                            </Link>
                          </div>
                  {/* <table className="table table-borderless jainult">
                    <thead>

                      <tr>
                        <th>
                          <Link className="btn btn-sm btn-neutral ms-auto" to={`/patients/profile?${location?.state?.patientId}`} state={{name:"visitdetailsActive"}}>
                          <i className="bi bi-arrow-left-circle"></i> Back  </Link>
                             </th>
                        <th
                          className="position-relative"
                          colspan="20"
                        >
                          <h5>Functional Examination</h5>
                          <div className="d-flex">
                          </div>
                        </th>
                      </tr>


                      <tr>
                        <td className="text-end">
                          <b>BMC</b>
                        </td>
                        <td colspan="6">
                          {dataReports?.functional?.SI?.low ? "Lower" : ""}
                          {dataReports?.functional?.SI?.position?.left
                            ? "Left"
                            : ""}
                          {dataReports?.functional?.SI?.position?.right
                            ? "Right"
                            : ""}{" "}
                          {dataReports?.functional?.ProneCrest?.height
                            ? "Higher"
                            : ""}
                          {dataReports?.functional?.ProneCrest?.position?.left
                            ? "Left"
                            : ""}
                          {dataReports?.functional?.ProneCrest?.position?.right
                            ? "Right"
                            : ""}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-end">
                          <b>Listing</b>
                        </td>
                        <td width="5%">
                          {dataReports?.functional?.Listings.L1 ? "L1-5" : ""}
                          {dataReports?.functional?.Listings.L2 ? "L2-5" : ""}
                          {dataReports?.functional?.Listings.L3 ? "L3-5" : ""}
                        </td>
                        <td>
                          {dataReports?.functional?.Listings?.L1}
                          {dataReports?.functional?.Listings?.L2}
                          {dataReports?.functional?.Listings?.L3}PRS
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className="text-end">
                          <b>Note. </b>
                        </td>
                        <td colspan="6" style={{ whiteSpace: "pre-wrap" }}>
                          <p>
                            {dataReports?.functional?.Notes
                              ? dataReports?.functional?.Notes
                              : "-"}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-end">
                          <b>SI</b>
                        </td>
                        <td colspan="6">{ }Open Right</td>
                      </tr>
                      <tr>
                        <td className="text-end">
                          <b>TMJ</b>
                        </td>
                        <td className="text-left" width="10%">
                          {dataReports?.functional?.TMJ?.step1
                            ? dataReports?.functional?.TMJ?.step1
                            : "-"}
                        </td>
                        <td className="text-left" width="10%">
                          {dataReports?.functional?.TMJ?.step2
                            ? dataReports?.functional?.TMJ?.step2
                            : "-"}
                        </td>
                        <td className="text-left">
                          {dataReports?.functional?.TMJ?.step3
                            ? dataReports?.functional?.TMJ?.step3
                            : "-"}
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className="text-end">
                          <b>SHOULDER MUSCLE TESTS</b>
                        </td>
                        {dataReports?.functional?.shoulderForm?.map((v) => {
                          return (
                            <>
                              <td style={{ whiteSpace: "pre-wrap" }}>
                                {v.testName ? v.testName : "-"}
                              </td>
                              <td>{v.test ? "Left" : "-"}</td>
                              <td width="5%">2</td>
                              <td>Pn</td>

                            </>
                          );
                        })}
                      </tr>
                      <tr>
                        <th className="text-center" colspan="10">
                          <h5>Treatments
                          </h5>
                        </th>
                      </tr>
                      <tr>
                        <td className="text-end">
                          <b>
                            <u>Shoulder Muscle Treatment</u>
                          </b>
                        </td>
                        <td className="text-start">
                          <b>
                            <u>Left</u>
                          </b>
                        </td>
                        <td className="text-start">
                          <b>
                            <u>Right</u>
                          </b>
                        </td>

                      </tr>
                      <tr className="text-end">
                        {
                          dataReports?.treatments?.shoulderOption.map(d => {
                            return (
                              <>
                                <td className="d-flex justify-content-center">
                                  <tr>
                                    <td className="text-end">
                                    </td>
                                    <td>{d?.left}</td>
                                    <td>{d?.leftValue}</td>
                                  </tr>
                                  <tr>
                                    <td className="text-end">
                                    </td>
                                    <td>{d?.right}</td>
                                    <td>{d?.rightValue}</td>
                                  </tr>
                                </td>
                              </>
                            )
                          }
                          )
                        }
                      </tr>
                      <tr>
                        <td className="text-end">
                          <b>{dataReports?.treatments?.DC?.name}</b>
                        </td>
                        <td>
                          Cervical &nbsp;
                          <span>
                            <b>{dataReports?.treatments?.DC?.cervical}</b>
                          </span>
                        </td>
                        <td>
                          Lumbar &nbsp;
                          <span>
                            <b>{dataReports?.treatments?.DC?.lumber}</b>
                          </span>
                        </td>
                        <td>
                          Thoracic &nbsp;
                          <span>
                            <b>{dataReports?.treatments?.DC?.thoracic}</b>
                          </span>
                        </td>
                        <td>
                          Extremity &nbsp;
                          <span>
                            <b>{dataReports?.treatments?.DC?.extermity}</b>
                          </span>
                        </td>
                        <td></td>
                        <td></td>
                      </tr>

                      <tr>
                        <td className="text-end">
                          <b>{dataReports?.treatments?.HP?.name}</b>
                        </td>
                        <td>
                          Cervical &nbsp;
                          <span>
                            <b>{dataReports?.treatments?.HP?.cervical}</b>
                          </span>
                        </td>
                        <td>
                          Lumbar &nbsp;
                          <span>
                            <b>{dataReports?.treatments?.HP?.lumber}</b>
                          </span>
                        </td>
                        <td>
                          Thoracic &nbsp;
                          <span>
                            <b>{dataReports?.treatments?.HP?.thoracic}</b>
                          </span>
                        </td>
                        <td>
                          Extremity &nbsp;
                          <span>
                            <b>{dataReports?.treatments?.HP?.extermity}</b>
                          </span>
                        </td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>
                          <input type="checkbox" checked={dataReports?.treatments?.Scoliosis} name="" id=" " />
                          <span className="ms-2">Scoliosis</span>
                        </td>
                        <td>
                          <input type="checkbox" checked={dataReports?.treatments?.exam} name="" id=" " />
                          <span className="ms-2">Exam</span>
                        </td>
                        <td>
                          <input type="checkbox" checked={dataReports?.treatments?.Distraction} name="" id=" " />
                          <span className="ms-2">Distraction</span>
                        </td>
                        <td>
                          <input type="checkbox" checked={dataReports?.treatments?.adjacent} name="" id=" " />
                          <span className="ms-2">Adj. Only</span>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className="text-end">
                          <b>
                            <u>Kinesiotaping Areas</u>
                          </b>
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className="text-end">L-spine <input type="checkbox" checked={dataReports?.treatments?.Kinesiotaping?.name?.lspine} /></td>
                        <td className="text-end">T-spine <input type="checkbox" checked={dataReports?.treatments?.Kinesiotaping?.name?.tspine} /></td>
                        <td className="text-end">Both <input type="checkbox" checked={dataReports?.treatments?.Kinesiotaping?.name?.both} /></td>
                      </tr>
                      <tr>
                        <td className="text-end">TREATMENT PLAN</td>
                        <td colspan="6">
                          <b>{dataReports?.treatments?.Kinesiotaping?.treatmentPlan?.asNeed}</b>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-end">Treatment Frequency</td>
                        <td colspan="">
                          <b>{dataReports?.treatments?.Kinesiotaping?.treatmentFrequency?.duration ? dataReports?.treatments?.Kinesiotaping?.treatmentFrequency?.duration : "-"}</b>
                        </td>
                        <td colspan="2">
                          <b>{dataReports?.treatments?.Kinesiotaping?.treatmentFrequency?.frequency ? dataReports?.treatments?.Kinesiotaping?.treatmentFrequency?.frequency : "-"}</b>
                        </td><td colspan="2">
                          <b>{dataReports?.treatments?.Kinesiotaping?.treatmentFrequency?.treatmentLeft ? dataReports?.treatments?.Kinesiotaping?.treatmentFrequency?.treatmentLeft : "-"}</b>
                        </td>
                        <td colspan="2">
                          <b>{dataReports?.treatments?.Kinesiotaping?.treatmentFrequency?.treatmentRight ? dataReports?.treatments?.Kinesiotaping?.treatmentFrequency?.treatmentRight : "-"}</b>
                        </td>
                      </tr>

                      <tr>
                        <td className="text-end">Next Appointments</td>
                        <td colspan="">
                          <b>{dataReports?.treatments?.Kinesiotaping?.nextAppointments?.first ? dataReports?.treatments?.Kinesiotaping?.nextAppointments?.first : "-"}</b>
                        </td>
                        <td colspan="2">
                          <b>{dataReports?.treatments?.Kinesiotaping?.nextAppointments?.second ? dataReports?.treatments?.Kinesiotaping?.nextAppointments?.second : "-"}</b>
                        </td><td colspan="2">
                          <b>{dataReports?.treatments?.Kinesiotaping?.nextAppointments?.third ? dataReports?.treatments?.Kinesiotaping?.nextAppointments?.third : "-"}</b>
                        </td>
                      </tr>
                      <td className="text-end">KINESIOTAPING left -right</td>
                      {
                        dataReports?.treatments?.Kinesiotaping?.kinesiotapingPosition.map((d) => {
                          return (
                            <>
                              <tr key={d}>
                                <td className="text-end"></td>
                                <tr>
                                  <td colspan="6">
                                    <b>{d?.left}</b>
                                  </td>
                                  <td colspan="6">
                                    <b>{d?.right}</b>
                                  </td>
                                </tr>
                              </tr>
                            </>
                          )
                        })
                      }

                    </thead>
                  </table> */}
                  <div className="WordSection1">
                    <h2 style={{ textAlign: "center" }}>
                      Daily Progress Report
                    </h2>
                    <table
                      width={720}
                      border={0}
                      cellPadding={0}
                      cellSpacing={0}
                      align="center"
                      className="fullTable"
                      bgcolor="#ffffff"
                      style={{ borderRadius: "10px 10px 0 0" }}
                    >
                      <tbody>
                        <tr>
                          
                          {/* <th
                          className="position-relative"
                          colspan="20"
                        >
                          <h5>Functional Examination</h5>
                          <div className="d-flex">
                          </div>
                        </th> */}
                        </tr>
                        <tr>
                          <td>
                            {/* <table
                              width={720}
                              border={0}
                              cellPadding={0}
                              cellSpacing={0}
                              align="center"
                              className="fullPadding"
                            >
                              <tbody>
                                <tr>
                                  <td>
                                    <table
                                      width={280}
                                      border={0}
                                      cellPadding={0}
                                      cellSpacing={0}
                                      align="left"
                                      className="col"
                                    >
                                      <tbody>
                                        <tr>
                                          <td align="left">
                                            {" "}
                                            <img
                                              src="https://stage-admin.myintellispine.com/OwnerKit/img/logos/logo.png"
                                              width={100}
                                              height={40}
                                              alt="logo"
                                              border={0}
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td
                                            style={{
                                              fontSize: "12px",
                                              color: "#5b5b5b",
                                              fontFamily:
                                                '"Open Sans", sans-serif',
                                              lineHeight: "18px",
                                              verticalAlign: "top",
                                              textAlign: "left",
                                            }}
                                          >
                                            Intellispine am Neumarkt, UG
                                            (haftungsbeschränkt) <br />
                                            Doctors of Chiropractic (USA) <br />
                                            Chiropraktiker in Köln
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table
                                      width={280}
                                      border={0}
                                      cellPadding={0}
                                      cellSpacing={0}
                                      align="right"
                                      className="col"
                                    >
                                      <tbody>
                                        <tr>
                                          <td height={20} />
                                        </tr>
                                        <tr className="visibleMobile">
                                          <td height={20} />
                                        </tr>
                                        <tr>
                                          <td
                                            style={{
                                              fontSize: "12px",
                                              color: "#5b5b5b",
                                              fontFamily:
                                                '"Open Sans", sans-serif',
                                              lineHeight: "18px",
                                              verticalAlign: "top",
                                              textAlign: "right",
                                            }}
                                          >
                                            <strong>Name:</strong>
                                          </td>
                                          <td
                                            style={{
                                              fontSize: "12px",
                                              color: "#5b5b5b",
                                              fontFamily:
                                                '"Open Sans", sans-serif',
                                              lineHeight: "18px",
                                              verticalAlign: "top",
                                              textAlign: "left",
                                              paddingLeft: "10px",
                                            }}
                                          >
                                            Mr. Gagan Raj
                                          </td>
                                        </tr>
                                        <tr>
                                          <td
                                            style={{
                                              fontSize: "12px",
                                              color: "#5b5b5b",
                                              fontFamily:
                                                '"Open Sans", sans-serif',
                                              lineHeight: "18px",
                                              verticalAlign: "top",
                                              textAlign: "right",
                                            }}
                                          >
                                            <strong>Patient Id:</strong>
                                          </td>
                                          <td
                                            style={{
                                              fontSize: "12px",
                                              color: "#5b5b5b",
                                              fontFamily:
                                                '"Open Sans", sans-serif',
                                              lineHeight: "18px",
                                              verticalAlign: "top",
                                              textAlign: "left",
                                              paddingLeft: "10px",
                                            }}
                                          >
                                            raj38385
                                          </td>
                                        </tr>
                                        <tr>
                                          <td
                                            style={{
                                              fontSize: "12px",
                                              color: "#5b5b5b",
                                              fontFamily:
                                                '"Open Sans", sans-serif',
                                              lineHeight: "18px",
                                              verticalAlign: "top",
                                              textAlign: "right",
                                            }}
                                          >
                                            <strong>Date of bill:</strong>
                                          </td>
                                          <td
                                            style={{
                                              fontSize: "12px",
                                              color: "#5b5b5b",
                                              fontFamily:
                                                '"Open Sans", sans-serif',
                                              lineHeight: "18px",
                                              verticalAlign: "top",
                                              textAlign: "left",
                                              paddingLeft: "10px",
                                            }}
                                          >
                                            10/03/2023
                                          </td>
                                        </tr>
                                        <tr>
                                          <td
                                            style={{
                                              fontSize: "12px",
                                              color: "#5b5b5b",
                                              fontFamily:
                                                '"Open Sans", sans-serif',
                                              lineHeight: "18px",
                                              verticalAlign: "top",
                                              textAlign: "right",
                                            }}
                                          >
                                            <strong>Gender:</strong>
                                          </td>
                                          <td
                                            style={{
                                              fontSize: "12px",
                                              color: "#5b5b5b",
                                              fontFamily:
                                                '"Open Sans", sans-serif',
                                              lineHeight: "18px",
                                              verticalAlign: "top",
                                              textAlign: "left",
                                              paddingLeft: "10px",
                                            }}
                                          >
                                            Male
                                          </td>
                                        </tr>
                                        <tr>
                                          <td
                                            style={{
                                              fontSize: "12px",
                                              color: "#5b5b5b",
                                              fontFamily:
                                                '"Open Sans", sans-serif',
                                              lineHeight: "18px",
                                              verticalAlign: "top",
                                              textAlign: "right",
                                            }}
                                          >
                                            <strong>Email:</strong>
                                          </td>
                                          <td
                                            style={{
                                              fontSize: "12px",
                                              color: "#5b5b5b",
                                              fontFamily:
                                                '"Open Sans", sans-serif',
                                              lineHeight: "18px",
                                              verticalAlign: "top",
                                              textAlign: "left",
                                              paddingLeft: "10px",
                                            }}
                                          >
                                            ashkr@gmail.com
                                          </td>
                                        </tr>
                                        <tr>
                                          <td
                                            style={{
                                              fontSize: "12px",
                                              color: "#5b5b5b",
                                              fontFamily:
                                                '"Open Sans", sans-serif',
                                              lineHeight: "18px",
                                              verticalAlign: "top",
                                              textAlign: "right",
                                            }}
                                          >
                                            <strong>Phone:</strong>
                                          </td>
                                          <td
                                            style={{
                                              fontSize: "12px",
                                              color: "#5b5b5b",
                                              fontFamily:
                                                '"Open Sans", sans-serif',
                                              lineHeight: "18px",
                                              verticalAlign: "top",
                                              textAlign: "left",
                                              paddingLeft: "10px",
                                            }}
                                          >
                                            9798070070
                                          </td>
                                        </tr>
                                        <tr>
                                          <td
                                            style={{
                                              fontSize: "12px",
                                              color: "#5b5b5b",
                                              fontFamily:
                                                '"Open Sans", sans-serif',
                                              lineHeight: "18px",
                                              verticalAlign: "top",
                                              textAlign: "right",
                                            }}
                                          >
                                            <strong>Address:</strong>
                                          </td>
                                          <td
                                            style={{
                                              fontSize: "12px",
                                              color: "#5b5b5b",
                                              fontFamily:
                                                '"Open Sans", sans-serif',
                                              lineHeight: "18px",
                                              verticalAlign: "top",
                                              textAlign: "left",
                                              paddingLeft: "10px",
                                            }}
                                          >
                                            Noida c block 46
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table> */}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <hr />
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
                        Date of service:
                        <b>
                          {moment(dataReports?.createdAt.split("T")[0]).format(
                            "DD/MM/YYYY"
                          )}
                        </b>
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
                          &nbsp;
                        </span>
                      </b>
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
                          Subjective Complaints:
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
                        {dataReports?.dailyNote ? dataReports?.dailyNote : "-"}
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
                          &nbsp;
                        </span>
                      </b>
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
                          Objective functional findings:
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
                        {dataReports?.functional?.ProneCrest?.position?.left ||
                        dataReports?.functional?.ProneCrest?.position?.right ? (
                          `the prone evaluation showed
                      a high ${
                        (dataReports?.functional?.ProneCrest?.position?.left &&
                          "left") ||
                        (dataReports?.functional?.ProneCrest?.position?.right &&
                          "right")
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
                        dataReports?.functional?.Adams?.Lumb?.position?.right ||
                        dataReports?.functional?.Adams?.Lumb?.position?.left ? (
                          `${functionLumar()} `
                        ) : (
                          <></>
                        )}
                        <br />
                        {dataReports?.functional?.Adams?.Thor?.Neg ||
                        dataReports?.functional?.Adams?.Thor.position?.right ||
                        dataReports?.functional?.Adams?.Thor?.position?.left ? (
                          `${functionThor()} `
                        ) : (
                          <></>
                        )}
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
                      <br />
                      
                      {gt?.length ?`normal${gt.join(",")}` : ""},
                      {dec?.length ?` Reduce${dec.join(", ")}` : ""},
                      {inc?.length ? `Increase${inc.join(", ")}` : ""} 
                    </span>
                  </p> */}
                    <p className="MsoNormal">
                      <span
                        lang="EN"
                        style={{
                          fontSize: "10.0pt",
                          lineHeight: "115%",
                          background: "white",
                        }}
                      >
                        {dec?.length
                          ? getDecValue(dec) + " were reduced, and"
                          : ""}{" "}
                        {inc?.length ? getDecValue(inc) + "was increased," : ""}{" "}
                        {gt?.length
                          ? "while the rest were within normal limits."
                          : ""}
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
                          {dataReports?.functional?.shoulderForm[0]?.testName
                            ? "The pain was illicited by resistance and localized to the following shoulder muscles: "
                            : ""}
                          <br />
                          {dataReports?.functional?.shoulderForm.map((e) => {
                            return (
                              <>
                                <p>
                                  {e?.left ? "left " : ""}
                                  {e?.right ? "&  right " : ""}
                                  {e?.testName}
                                </p>
                              </>
                            );
                          })}
                        </p>
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
                        {console.log(
                          dataReports?.orthopadic?.deepTendon,
                          "77777777777777777777777",
                          getdatareports(dataReports)
                        )}

                        {/* {getdatareports(dataReports)} */}

                        {/* {dataReports?.orthopadic?.lumbarPos ? `All lumbar orthopedic tests performed were Positive bilaterally.` : ""}
                      {dataReports?.orthopadic?.lunbarNag ? `All lumbar orthopedic tests performed were lunbarNag bilaterally.` : ""} */}

                        {(!getdatareports(dataReports) &&
                          dataReports?.orthopadic?.lumborOrtho?.EYl?.left ==
                            "Pos") ||
                        dataReports?.orthopadic?.lumborOrtho?.FABERE?.left ==
                          "Pos" ||
                        dataReports?.orthopadic?.lumborOrtho?.LaSeague?.left ==
                          "Pos" ||
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
                        dataReports?.orthopadic?.lumborOrtho?.EYl?.left == "Pos"
                          ? `   EYl tests for ${
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
                        dataReports?.orthopadic?.lumborOrtho?.LaSeague?.left ==
                          "Pos"
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
                        dataReports?.orthopadic?.sottoHall?.lumbar.left == "Pos"
                          ? ` sottoHall    lumbar tests  ,`
                          : ""}
                        {!getdatareports(dataReports) &&
                        dataReports?.orthopadic?.sottoHall?.thoracic.left ==
                          "Pos"
                          ? `sottoHall   thoracic tests  .`
                          : ""}
                        {/* {!getdatareports(dataReports)
                        ? `A lumbar-prone orthopedic examination revealed positive Rright ,` : ""} */}
                        {!getdatareports(dataReports) &&
                        dataReports?.orthopadic?.lumborOrtho?.EYl?.right ==
                          "Pos"
                          ? `  EYl tests for ${
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
                        dataReports?.orthopadic?.lumborOrtho?.LaSeague?.right ==
                          "Pos"
                          ? `  LaSeague tests ,`
                          : ""}
                        {!getdatareports(dataReports) &&
                        dataReports?.orthopadic?.lumborOrtho?.Milgram?.right ==
                          "Pos"
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
                        dataReports?.orthopadic?.lumborOrtho?.Nachlas?.right ==
                          "Pos"
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
                          : "."}
                        {/* negative */}
                        <br />

                        {/* {
                          dataReports?.orthopadic?.lumborOrtho?.EYl?.left == "Neg"||
                          dataReports?.orthopadic?.lumborOrtho?.FABERE?.left == "Neg"||
                          dataReports?.orthopadic?.lumborOrtho?.LaSeague?.left == "Neg"||
                          dataReports?.orthopadic?.lumborOrtho?.Milgram?.left == "Neg"||
                          dataReports?.orthopadic?.lumborOrtho?.Nachlas?.left == "Neg"||
                          dataReports?.orthopadic?.lumborOrtho?.Yeoman?.left == "Neg"||
                          dataReports?.orthopadic?.sottoHall?.lumbar.left == "Neg"||
                          dataReports?.orthopadic?.sottoHall?.thoracic.left == "Neg"?
                          `A lumbar orthopedic examination revealed Negative Left `:""
                        }

                     {
                          dataReports?.orthopadic?.lumborOrtho?.EYl?.right == "Neg"||
                          dataReports?.orthopadic?.lumborOrtho?.FABERE?.right == "Neg"||
                          dataReports?.orthopadic?.lumborOrtho?.LaSeague?.right == "Neg"||
                          dataReports?.orthopadic?.lumborOrtho?.Milgram?.right == "Neg"||
                          dataReports?.orthopadic?.lumborOrtho?.Nachlas?.right == "Neg"||
                          dataReports?.orthopadic?.lumborOrtho?.Yeoman?.right == "Neg"||
                          dataReports?.orthopadic?.sottoHall?.lumbar.right == "Neg"||
                          dataReports?.orthopadic?.sottoHall?.thoracic.right == "Neg"?
                          `A lumbar orthopedic examination revealed Negative right `:""
                        } */}

                        {gataReportSotto(dataReports)}
                        {!gataReportSotto(dataReports) &&
                        dataReports?.orthopadic?.lumborOrtho?.EYl?.left == "Neg"
                          ? `   EYl tests  ,`
                          : ""}
                        {!gataReportSotto(dataReports) &&
                        dataReports?.orthopadic?.lumborOrtho?.FABERE?.left ==
                          "Neg"
                          ? `   FABERE tests   ,`
                          : ""}
                        {!gataReportSotto(dataReports) &&
                        dataReports?.orthopadic?.lumborOrtho?.LaSeague?.left ==
                          "Neg"
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
                        dataReports?.orthopadic?.sottoHall?.lumbar.left == "Neg"
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
                        dataReports?.orthopadic?.lumborOrtho?.LaSeague?.right ==
                          "Neg"
                          ? `  LaSeague tests, ,`
                          : ""}
                        {!gataReportSotto(dataReports) &&
                        dataReports?.orthopadic?.lumborOrtho?.Milgram?.right ==
                          "Neg"
                          ? `  Milgram tests ,`
                          : ""}
                        {!gataReportSotto(dataReports) &&
                        dataReports?.orthopadic?.lumborOrtho?.Nachlas?.right ==
                          "Neg"
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
                          : "."}
                        <br />
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
                      &nbsp;
                    </span>
                  </p> */}

                    {/* <p className="MsoNormal">
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
                  </p> */}

                    {/* <p className="MsoNormal">
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
                  </p> */}

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
                        {getdeepTendon(dataReports)}
                        {dataReports?.orthopadic?.deepTendon?.patellar?.left
                          ?.value ||
                        dataReports?.orthopadic?.deepTendon?.patellar?.right
                          ?.value ||
                        dataReports?.orthopadic?.deepTendon?.achills?.left
                          ?.value ||
                        dataReports?.orthopadic?.deepTendon?.achills?.right
                          ?.value
                          ? `Deep tendon reflexes in.`
                          : ""}
                        {!getdeepTendon(dataReports) &&
                        dataReports?.orthopadic?.deepTendon?.patellar?.left
                          ?.value &&
                        !dataReports?.orthopadic?.deepTendon?.patellar?.right
                          ?.value
                          ? ` the left Patellar were ${dataReports?.orthopadic?.deepTendon?.patellar?.left?.value} .`
                          : ""}
                        {!getdeepTendon(dataReports) &&
                        dataReports?.orthopadic?.deepTendon?.patellar?.right
                          ?.value &&
                        !dataReports?.orthopadic?.deepTendon?.patellar?.left
                          ?.value
                          ? ` the right Patellar were ${dataReports?.orthopadic?.deepTendon?.patellar?.right?.value} .`
                          : ""}
                        {!getdeepTendon(dataReports) &&
                        dataReports?.orthopadic?.deepTendon?.patellar?.left
                          ?.value &&
                        dataReports?.orthopadic?.deepTendon?.patellar?.right
                          ?.value
                          ? ` the left Patellar were ${dataReports?.orthopadic?.deepTendon?.patellar?.left?.value} and on the right were ${dataReports?.orthopadic?.deepTendon?.patellar?.right?.value}`
                          : ""}
                        {!getdeepTendon(dataReports) &&
                        dataReports?.orthopadic?.deepTendon?.achills?.left
                          ?.value &&
                        !dataReports?.orthopadic?.deepTendon?.achills?.right
                          ?.value
                          ? ` the left  Achilles were ${dataReports?.orthopadic?.deepTendon?.achills?.left?.value} .`
                          : ""}
                        {!getdeepTendon(dataReports) &&
                        dataReports?.orthopadic?.deepTendon?.achills?.right
                          ?.value &&
                        !dataReports?.orthopadic?.deepTendon?.achills?.left
                          ?.value
                          ? ` the right  Achilles were ${dataReports?.orthopadic?.deepTendon?.achills?.right?.value} .`
                          : ""}
                        {!getdeepTendon(dataReports) &&
                        dataReports?.orthopadic?.deepTendon?.achills?.right
                          ?.value &&
                        dataReports?.orthopadic?.deepTendon?.achills?.left
                          ?.value
                          ? ` the left  Achilles were ${dataReports?.orthopadic?.deepTendon?.achills?.left?.value} and on the right were ${dataReports?.orthopadic?.deepTendon?.achills?.right?.value}.`
                          : ""}

                        {/* {dataReports?.orthopadic?.deepTendon?.patellar?.right?.value && !dataReports?.orthopadic?.deepTendon?.patellar?.left?.value ? ` the right Patellar were ${dataReports?.orthopadic?.deepTendon?.patellar?.right?.value} .` : ""}
                      {dataReports?.orthopadic?.deepTendon?.achills?.left?.value && !dataReports?.orthopadic?.deepTendon?.achills?.right?.value ? ` the left  Achilles were ${dataReports?.orthopadic?.deepTendon?.achills?.left?.value} .` : ""}
                      {dataReports?.orthopadic?.deepTendon?.achills?.right?.value && !dataReports?.orthopadic?.deepTendon?.achills?.left?.value ? ` the right  Achilles were ${dataReports?.orthopadic?.deepTendon?.achills?.right?.value} .` : ""} */}
                        {/* compb */}
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
                        {getOthopediccervical(dataReports)}
                        {!getOthopediccervical(dataReports) &&
                        dataReports?.orthopadic?.cervical?.jackson
                          ? dataReports?.orthopadic?.cervical?.jackson == "Pos"
                            ? dataReports?.orthopadic?.cervical?.dist == "Pos"
                              ? "Jackson’s test was positive, and distraction was postive."
                              : ""
                            : ""
                          : ""}
                        {!getOthopediccervical(dataReports) &&
                        dataReports?.orthopadic?.cervical?.jackson
                          ? dataReports?.orthopadic?.cervical?.jackson == "Pos"
                            ? dataReports?.orthopadic?.cervical?.dist == "Neg"
                              ? "Jackson’s test was positive, and distraction was nagitive."
                              : ""
                            : ""
                          : ""}
                        {!getOthopediccervical(dataReports) &&
                        dataReports?.orthopadic?.cervical?.jackson
                          ? dataReports?.orthopadic?.cervical?.jackson == "Neg"
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
                          dataReports?.orthopadic?.cervical?.MFC?.left == "Neg"
                            ? "Maximum foraminal compression is negative on the left"
                            : ""}
                        </p>
                        <p>
                          {!getOthopediccervical(dataReports) &&
                          dataReports?.orthopadic?.cervical?.MFC?.right == "Neg"
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
                          dataReports?.orthopadic?.cervical?.DIST?.left == "Pos"
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
                          dataReports?.orthopadic?.cervical?.DIST?.left == "Neg"
                            ? `Maximum foraminal compression is positive, and distraction was negative on the left cervical orthopedic examination.`
                            : ""}
                        </p>

                        <br />
                        <p>
                          {!getOthopediccervical(dataReports) &&
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
                            : ""}
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
                        {getOthopedic(dataReports)}
                        {!getOthopedic(dataReports)
                          ? `Deep tendon reflexes in.`
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
                        !dataReports?.orthopadic?.deepTendonReflexes?.biceps
                          ?.left
                          ? ` the right triceps were ${dataReports?.orthopadic?.deepTendonReflexes?.triceps?.right} .`
                          : ""}

                        {!getOthopedic(dataReports) &&
                        dataReports?.orthopadic?.deepTendonReflexes?.biceps
                          ?.left &&
                        dataReports?.orthopadic?.deepTendonReflexes?.biceps
                          ?.right
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
                    </p>

                    {console.log(dataReports, "datareports")}
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
                        {dataReports?.functional?.Listings.L1 &&
                          ` L1-5 was in the ${dataReports?.functional?.Listings.L1} position,`}
                        {dataReports?.functional?.Listings.L2 &&
                          ` L1-3 was in the ${dataReports?.functional?.Listings.L2} position,`}
                        {dataReports?.functional?.Listings.L3 &&
                          ` L7/5 was in the ${dataReports?.functional?.Listings.L3} position,`}
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
                        BMC : {getBmc(dataReports?.functional)}
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
                        Cervical :{" "}
                        {getCervical(dataReports?.functional) +
                          " " +
                          // getCervicals(dataReports?.functional) +
                          " " +
                          getCervicalss(dataReports?.functional)}
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
                        TMJ :{" "}
                        {dataReports?.functional?.TMJ?.step1 +
                          " " +
                          dataReports?.functional?.TMJ?.step2 +
                          " " +
                          dataReports?.functional?.TMJ?.step3}
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
                        SI : {getSi(dataReports?.functional)}
                      </span>
                    </p>
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
                        {Boolean(diagnosedata?.length) &&
                          diagnosedata?.map((v) => {
                            return <p>{v.name}</p>;
                          })}
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
                    {/* <p className="MsoNormal">
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
                          fontSize: "9.0pt",
                          lineHeight: "115%",
                          color: "#1F1F1F",
                          background: "white",
                        }}
                      >
                        HWS-BWS-LWS_Syndrom
                      </span>
                    </p>
                    <p className="MsoNormal">
                      <span
                        lang="EN"
                        style={{
                          fontSize: "10.0pt",
                          lineHeight: "115%",
                          color: "#1F1F1F",
                          background: "white",
                        }}
                      >
                        Arthrose{" "}
                      </span>
                    </p> */}
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
                          &nbsp;
                        </span>
                      </b>
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
                          Plan:
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
                        {Boolean(leftAkMk?.length) || Boolean(rightAkMk?.length)
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
                        {console.log(kineLeft, "kneleftter")}
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
                    <p className="MsoNormal">
                      <b>
                        <span
                          lang="EN"
                          style={{
                            fontSize: "15.0pt",
                            lineHeight: "115%",
                            background: "white",
                          }}
                        >
                          &nbsp;
                        </span>
                      </b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisitDetailsView;