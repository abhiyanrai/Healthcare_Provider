import { useFormik } from "formik";
import React, { useState, useEffect } from "react";


const OrthoPadicExamination = (props) => {
  const { setFunction, step, formik2 } = props;
  console.log(formik2,"ssssssssssss")
  const [render, setRender] = useState(true);
  const[disble,setdisble]=useState(false)
  const[disbleSide,setdisbleSide]=useState(false)


  const handleLumborOrtho = (e, name) => {
    console.log(formik2?.values, "2222222");
    formik2.setFieldValue(`${name}`, e.target.value);
    if (render) {
      setRender(false);
    } else {
      setRender(true);
    }
  };


  const handleLumborOrthoCheck = (e, name) => {
    if(name=="lumbarPos"){
      // console.log(formik2?.values?.lumbarPos,"ffffff",formik2?.values?.lumborOrtho?.EYl?.left)
      if(formik2?.values?.lumbarPos==true){
        formik2.setFieldValue(`${name}`, false);
        setdisble(false)

// EYl
formik2.setFieldValue("lumborOrtho.EYl.left", false);
formik2.setFieldValue("lumborOrtho.EYl.right", false);
formik2.setFieldValue("lumborOrtho.EYl.leftOption.HIP", false);
formik2.setFieldValue("lumborOrtho.EYl.leftOption.LB", false);
formik2.setFieldValue("lumborOrtho.EYl.leftOption.SI", false);
formik2.setFieldValue("lumborOrtho.EYl.rightOption.HIP", false);
formik2.setFieldValue("lumborOrtho.EYl.rightOption.LB", false);
formik2.setFieldValue("lumborOrtho.EYl.rightOption.SI", false);

// Nachlas
formik2.setFieldValue("lumborOrtho.Nachlas.left", false);
formik2.setFieldValue("lumborOrtho.Nachlas.right", false);
formik2.setFieldValue("lumborOrtho.Nachlas.leftOption.HIP", false);
formik2.setFieldValue("lumborOrtho.Nachlas.leftOption.LB", false);
formik2.setFieldValue("lumborOrtho.Nachlas.leftOption.SI", false);
formik2.setFieldValue("lumborOrtho.Nachlas.rightOption.HIP", false);
formik2.setFieldValue("lumborOrtho.Nachlas.rightOption.LB", false);
formik2.setFieldValue("lumborOrtho.Nachlas.rightOption.SI", false);
// Yeoman
formik2.setFieldValue("lumborOrtho.Yeoman.left", false);
formik2.setFieldValue("lumborOrtho.Yeoman.right", false);
formik2.setFieldValue("lumborOrtho.Yeoman.leftOption.HIP", false);
formik2.setFieldValue("lumborOrtho.Yeoman.leftOption.LB", false);
formik2.setFieldValue("lumborOrtho.Yeoman.leftOption.SI", false);
formik2.setFieldValue("lumborOrtho.Yeoman.rightOption.HIP", false);
formik2.setFieldValue("lumborOrtho.Yeoman.rightOption.LB", false);
formik2.setFieldValue("lumborOrtho.Yeoman.rightOption.SI", false);
// LaSeague
formik2.setFieldValue("lumborOrtho.LaSeague.left", false);
formik2.setFieldValue("lumborOrtho.LaSeague.right", false);

//Braggard
formik2.setFieldValue("lumborOrtho.Braggard.left", false);
formik2.setFieldValue("lumborOrtho.Braggard.right", false);

// FABERE
formik2.setFieldValue("lumborOrtho.FABERE.left", false);
formik2.setFieldValue("lumborOrtho.FABERE.right", false);
formik2.setFieldValue("lumborOrtho.FABERE.leftOption.HIP", false);
formik2.setFieldValue("lumborOrtho.FABERE.leftOption.LB", false);
formik2.setFieldValue("lumborOrtho.FABERE.leftOption.SI", false);
formik2.setFieldValue("lumborOrtho.FABERE.rightOption.HIP", false);
formik2.setFieldValue("lumborOrtho.FABERE.rightOption.LB", false);
formik2.setFieldValue("lumborOrtho.FABERE.rightOption.SI", false);
//Milgram
formik2.setFieldValue("lumborOrtho.Milgram.left", false);
formik2.setFieldValue("lumborOrtho.Milgram.right", false);
formik2.setFieldValue("lumborOrtho.Milgram.leftOption.HIP", false);
formik2.setFieldValue("lumborOrtho.Milgram.leftOption.LB", false);
formik2.setFieldValue("lumborOrtho.Milgram.leftOption.SI", false);
formik2.setFieldValue("lumborOrtho.Milgram.rightOption.HIP", false);
formik2.setFieldValue("lumborOrtho.Milgram.rightOption.LB", false);
formik2.setFieldValue("lumborOrtho.Milgram.rightOption.SI", false);
// SOTO HALL
formik2.setFieldValue("sottoHall.lumbar.left", false);
formik2.setFieldValue("sottoHall.lumbar.right", false);
// thoracic
formik2.setFieldValue("sottoHall.thoracic.left", false);
formik2.setFieldValue("sottoHall.thoracic.right", false);


      }else{
        setdisble(true)
        formik2.setFieldValue("lunbarNag", false);
        formik2.setFieldValue(`${name}`, e.target.checked);

// EYl
        formik2.setFieldValue("lumborOrtho.EYl.left", "Pos");
        formik2.setFieldValue("lumborOrtho.EYl.right", "Pos");
        // formik2.setFieldValue("lumborOrtho.EYl.leftOption.HIP", true);
        // formik2.setFieldValue("lumborOrtho.EYl.leftOption.LB", true);
        // formik2.setFieldValue("lumborOrtho.EYl.leftOption.SI", true);
        // formik2.setFieldValue("lumborOrtho.EYl.rightOption.HIP", true);
        // formik2.setFieldValue("lumborOrtho.EYl.rightOption.LB", true);
        // formik2.setFieldValue("lumborOrtho.EYl.rightOption.SI", true);

// Nachlas
        formik2.setFieldValue("lumborOrtho.Nachlas.left", "Pos");
        formik2.setFieldValue("lumborOrtho.Nachlas.right", "Pos");
        // formik2.setFieldValue("lumborOrtho.Nachlas.leftOption.HIP", true);
        // formik2.setFieldValue("lumborOrtho.Nachlas.leftOption.LB", true);
        // formik2.setFieldValue("lumborOrtho.Nachlas.leftOption.SI", true);
        // formik2.setFieldValue("lumborOrtho.Nachlas.rightOption.HIP", true);
        // formik2.setFieldValue("lumborOrtho.Nachlas.rightOption.LB", true);
        // formik2.setFieldValue("lumborOrtho.Nachlas.rightOption.SI", true);
// Yeoman
        formik2.setFieldValue("lumborOrtho.Yeoman.left", "Pos");
        formik2.setFieldValue("lumborOrtho.Yeoman.right", "Pos");
        // formik2.setFieldValue("lumborOrtho.Yeoman.leftOption.HIP", true);
        // formik2.setFieldValue("lumborOrtho.Yeoman.leftOption.LB", true);
        // formik2.setFieldValue("lumborOrtho.Yeoman.leftOption.SI", true);
        // formik2.setFieldValue("lumborOrtho.Yeoman.rightOption.HIP", true);
        // formik2.setFieldValue("lumborOrtho.Yeoman.rightOption.LB", true);
        // formik2.setFieldValue("lumborOrtho.Yeoman.rightOption.SI", true);
// LaSeague
formik2.setFieldValue("lumborOrtho.LaSeague.left", "Pos");
formik2.setFieldValue("lumborOrtho.LaSeague.right", "Pos");

//Braggard
formik2.setFieldValue("lumborOrtho.Braggard.left", "Pos");
formik2.setFieldValue("lumborOrtho.Braggard.right", "Pos");

// FABERE
        formik2.setFieldValue("lumborOrtho.FABERE.left", "Pos");
        formik2.setFieldValue("lumborOrtho.FABERE.right", "Pos");
        // formik2.setFieldValue("lumborOrtho.FABERE.leftOption.HIP", true);
        // formik2.setFieldValue("lumborOrtho.FABERE.leftOption.LB", true);
        // formik2.setFieldValue("lumborOrtho.FABERE.leftOption.SI", true);
        // formik2.setFieldValue("lumborOrtho.FABERE.rightOption.HIP", true);
        // formik2.setFieldValue("lumborOrtho.FABERE.rightOption.LB", true);
        // formik2.setFieldValue("lumborOrtho.FABERE.rightOption.SI", true);
//Milgram
        formik2.setFieldValue("lumborOrtho.Milgram.left", "Pos");
        formik2.setFieldValue("lumborOrtho.Milgram.right", "Pos");
        // formik2.setFieldValue("lumborOrtho.Milgram.leftOption.HIP", true);
        // formik2.setFieldValue("lumborOrtho.Milgram.leftOption.LB", true);
        // formik2.setFieldValue("lumborOrtho.Milgram.leftOption.SI", true);
        // formik2.setFieldValue("lumborOrtho.Milgram.rightOption.HIP", true);
        // formik2.setFieldValue("lumborOrtho.Milgram.rightOption.LB", true);
        // formik2.setFieldValue("lumborOrtho.Milgram.rightOption.SI", true);
// SOTO HALL
        formik2.setFieldValue("sottoHall.lumbar.left", "Pos");
        formik2.setFieldValue("sottoHall.lumbar.right", "Pos");
// thoracic
        formik2.setFieldValue("sottoHall.thoracic.left", "Pos");
        formik2.setFieldValue("sottoHall.thoracic.right", "Pos");

      }

    }else if(name=="lunbarNag"){
      if(formik2?.values?.lunbarNag==true){
        formik2.setFieldValue(`${name}`, false);
        setdisble(false)
// EYl
formik2.setFieldValue("lumborOrtho.EYl.left", false);
formik2.setFieldValue("lumborOrtho.EYl.right", false);

// Nachlas
formik2.setFieldValue("lumborOrtho.Nachlas.left", false);
formik2.setFieldValue("lumborOrtho.Nachlas.right", false);
// Yeoman
formik2.setFieldValue("lumborOrtho.Yeoman.left", false);
formik2.setFieldValue("lumborOrtho.Yeoman.right", false);
// LaSeague
formik2.setFieldValue("lumborOrtho.LaSeague.left", false);
formik2.setFieldValue("lumborOrtho.LaSeague.right", false);

//Braggard
formik2.setFieldValue("lumborOrtho.Braggard.left", false);
formik2.setFieldValue("lumborOrtho.Braggard.right", false);

// FABERE
formik2.setFieldValue("lumborOrtho.FABERE.left", false);
formik2.setFieldValue("lumborOrtho.FABERE.right", false);
//Milgram
formik2.setFieldValue("lumborOrtho.Milgram.left", false);
formik2.setFieldValue("lumborOrtho.Milgram.right", false);
// SOTO HALL
formik2.setFieldValue("sottoHall.lumbar.left", false);
formik2.setFieldValue("sottoHall.lumbar.right", false);
// thoracic
formik2.setFieldValue("sottoHall.thoracic.left", false);
formik2.setFieldValue("sottoHall.thoracic.right", false);

      }else{
        setdisble(true)

// EYl
        formik2.setFieldValue("lumborOrtho.EYl.left", "Neg");
        formik2.setFieldValue("lumborOrtho.EYl.right", "Neg");

// Nachlas
        formik2.setFieldValue("lumborOrtho.Nachlas.left", "Neg");
        formik2.setFieldValue("lumborOrtho.Nachlas.right", "Neg");
// Yeoman
        formik2.setFieldValue("lumborOrtho.Yeoman.left", "Neg");
        formik2.setFieldValue("lumborOrtho.Yeoman.right", "Neg");
// LaSeague
formik2.setFieldValue("lumborOrtho.LaSeague.left", "Neg");
formik2.setFieldValue("lumborOrtho.LaSeague.right", "Neg");

//Braggard
formik2.setFieldValue("lumborOrtho.Braggard.left", "Neg");
formik2.setFieldValue("lumborOrtho.Braggard.right", "Neg");

// FABERE
        formik2.setFieldValue("lumborOrtho.FABERE.left", "Neg");
        formik2.setFieldValue("lumborOrtho.FABERE.right", "Neg");
//Milgram
        formik2.setFieldValue("lumborOrtho.Milgram.left", "Neg");
        formik2.setFieldValue("lumborOrtho.Milgram.right", "Neg");
// SOTO HALL
        formik2.setFieldValue("sottoHall.lumbar.left", "Neg");
        formik2.setFieldValue("sottoHall.lumbar.right", "Neg");
// thoracic
        formik2.setFieldValue("sottoHall.thoracic.left", "Neg");
        formik2.setFieldValue("sottoHall.thoracic.right", "Neg");


        formik2.setFieldValue("lumbarPos", false);
        formik2.setFieldValue(`${name}`, e.target.checked);
      }
    }
    else if(name=="cervicalNag"){
      if(formik2?.values?.cervicalNag==true){
        formik2.setFieldValue(`${name}`, false);
        setdisbleSide(false)
         //jackson
         formik2.setFieldValue("cervical.jackson", false);
         formik2.setFieldValue("cervical.dist", false);
         //MFC
         formik2.setFieldValue("cervical.MFC.left", false);
         formik2.setFieldValue("cervical.MFC.right", false);
         // DIST
         formik2.setFieldValue("cervical.DIST.left", false);
         formik2.setFieldValue("cervical.DIST.right", false);
         // ShldrDep
         formik2.setFieldValue("cervical.ShldrDep.left", false);
         formik2.setFieldValue("cervical.ShldrDep.right", false);
         // Wrights
         formik2.setFieldValue("cervical.Wrights.left", false);
         formik2.setFieldValue("cervical.Wrights.right", false);
         // Scalene
         formik2.setFieldValue("cervical.Scalene.left", false);
         formik2.setFieldValue("cervical.Scalene.right", false);
         // George
         formik2.setFieldValue("cervical.George.left", false);
         formik2.setFieldValue("cervical.George.right", false);
      }else{
        setdisbleSide(true)

               //jackson
               formik2.setFieldValue("cervical.jackson", "Neg");
               formik2.setFieldValue("cervical.dist", "Neg");
               //MFC
               formik2.setFieldValue("cervical.MFC.left", "Neg");
               formik2.setFieldValue("cervical.MFC.right", "Neg");
               // DIST
               formik2.setFieldValue("cervical.DIST.left", "Neg");
               formik2.setFieldValue("cervical.DIST.right", "Neg");
               // ShldrDep
               formik2.setFieldValue("cervical.ShldrDep.left", "Neg");
               formik2.setFieldValue("cervical.ShldrDep.right", "Neg");
               // Wrights
               formik2.setFieldValue("cervical.Wrights.left", "Neg");
               formik2.setFieldValue("cervical.Wrights.right", "Neg");
               // Scalene
               formik2.setFieldValue("cervical.Scalene.left", "Neg");
               formik2.setFieldValue("cervical.Scalene.right", "Neg");
               // George
               formik2.setFieldValue("cervical.George.left", "Neg");
               formik2.setFieldValue("cervical.George.right", "Neg");
               

        formik2.setFieldValue("cervicalPos", false);
        formik2.setFieldValue(`${name}`, e.target.checked);
      }
    }
    else if(name=="cervicalPos"){
      if(formik2?.values?.cervicalPos==true){
        formik2.setFieldValue(`${name}`, false);
        setdisbleSide(false)

               //jackson
               formik2.setFieldValue("cervical.jackson", false);
               formik2.setFieldValue("cervical.dist", false);
               //MFC
               formik2.setFieldValue("cervical.MFC.left", false);
               formik2.setFieldValue("cervical.MFC.right", false);
               // DIST
               formik2.setFieldValue("cervical.DIST.left", false);
               formik2.setFieldValue("cervical.DIST.right", false);
               // ShldrDep
               formik2.setFieldValue("cervical.ShldrDep.left", false);
               formik2.setFieldValue("cervical.ShldrDep.right", false);
               // Wrights
               formik2.setFieldValue("cervical.Wrights.left", false);
               formik2.setFieldValue("cervical.Wrights.right", false);
               // Scalene
               formik2.setFieldValue("cervical.Scalene.left", false);
               formik2.setFieldValue("cervical.Scalene.right", false);
               // George
               formik2.setFieldValue("cervical.George.left", false);
               formik2.setFieldValue("cervical.George.right", false);
               
      }else{
        setdisbleSide(true)

        //jackson
        formik2.setFieldValue("cervical.jackson", "Pos");
        formik2.setFieldValue("cervical.dist", "Pos");
        //MFC
        formik2.setFieldValue("cervical.MFC.left", "Pos");
        formik2.setFieldValue("cervical.MFC.right", "Pos");
        // DIST
        formik2.setFieldValue("cervical.DIST.left", "Pos");
        formik2.setFieldValue("cervical.DIST.right", "Pos");
        // ShldrDep
        formik2.setFieldValue("cervical.ShldrDep.left", "Pos");
        formik2.setFieldValue("cervical.ShldrDep.right", "Pos");
        // Wrights
        formik2.setFieldValue("cervical.Wrights.left", "Pos");
        formik2.setFieldValue("cervical.Wrights.right", "Pos");
        // Scalene
        formik2.setFieldValue("cervical.Scalene.left", "Pos");
        formik2.setFieldValue("cervical.Scalene.right", "Pos");
        // George
        formik2.setFieldValue("cervical.George.left", "Pos");
        formik2.setFieldValue("cervical.George.right", "Pos");

        formik2.setFieldValue("cervicalNag", false);
        formik2.setFieldValue(`${name}`, e.target.checked);
      }
    }else{
      formik2.setFieldValue(`${name}`, e.target.checked);
    }
    if (render) {
      setRender(false);
    } else {
      setRender(true);
    }
  };

  const handleDeepTendon = () => {
    formik2.values.deepTendon.push({ name: "", left: "", right: "" });
    formik2.setFieldValue("deepTendon", formik2.values.deepTendon);
  };

  const handleCervicalChage = (e, name) => {
    formik2.setFieldValue(`${name}`, e.target.value);
    if (render) {
      setRender(false);
    } else {
      setRender(true);
    }
  };




  const handleEventList = (e) => {
    if (e.target.checked) {
      formik2.setFieldValue("deepTendon.patellar.left.value",2)
      formik2.setFieldValue("deepTendon.patellar.right.value",2)
      formik2.setFieldValue("deepTendon.achills.left.value",2)
      formik2.setFieldValue("deepTendon.achills.right.value",2)
    }else{
      formik2.setFieldValue("deepTendon.patellar.left.value","")
      formik2.setFieldValue("deepTendon.patellar.right.value","")
      formik2.setFieldValue("deepTendon.achills.left.value","")
      formik2.setFieldValue("deepTendon.achills.right.value","")
    }
  };


  const handleEventListREFLEXES=(e)=>{
    if (e.target.checked) {
      formik2.setFieldValue("deepTendonReflexes.biceps.left",2)
      formik2.setFieldValue("deepTendonReflexes.biceps.right",2)
      formik2.setFieldValue("deepTendonReflexes.triceps.left",2)
      formik2.setFieldValue("deepTendonReflexes.triceps.right",2)
      formik2.setFieldValue("deepTendonReflexes.brachiorad.left",2)
      formik2.setFieldValue("deepTendonReflexes.brachiorad.right",2)

    }else{
      formik2.setFieldValue("deepTendonReflexes.biceps.left","")
      formik2.setFieldValue("deepTendonReflexes.biceps.right","")
      formik2.setFieldValue("deepTendonReflexes.triceps.left","")
      formik2.setFieldValue("deepTendonReflexes.triceps.right","")
      formik2.setFieldValue("deepTendonReflexes.brachiorad.left","")
      formik2.setFieldValue("deepTendonReflexes.brachiorad.right","")
    }
  }


  console.log(formik2.values,"0000");
  return (
    <>
      <div className="form-ttle">Orthopedic Examination</div>
      <div className="row card-header pt-0">
        <div className="col-xl-7">
          <div className="table-responsive">
            <table className="table table-borderless tb_td tb_td_lumbar">
              <tbody>
                <tr>
                  <th colspan="7" className="text-dark font-weight-bold">
                    <u>LUMBAR ORTHOPEDIC</u>
                  </th>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="bilat" className="me-1 text-dark">
                      All Pos Bilat
                    </label>
                    {console.log(formik2?.values?.lumbarPos,"ddddddd")}
                    <input className="i-mb-0" type="checkbox" name="lumbarPos" id="bilat" value={formik2?.values?.lumbarPos}  
                    checked={formik2?.values?.lumbarPos}  onClick={(e) =>handleLumborOrthoCheck(e, "lumbarPos")}  />
                  </td>
                  <td colspan="6">
                    <label htmlFor="negb" className="me-1 text-dark">
                      All Neg Bilat
                    </label>
                    <input className="i-mb-0" type="checkbox" name="lunbarNag" id="negb" value={formik2?.values?.lunbarNag}  
                    checked={formik2?.values?.lunbarNag} onClick={(e) =>handleLumborOrthoCheck(e, "lunbarNag")}/>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td colspan="3" className="font-weight-bold">
                    <u>LEFT</u>
                  </td>
                  <td colspan="3" className="font-weight-bold">
                    <u>RIGHT</u>
                  </td>
                </tr>
                <tr>
                  <td>
                    {/* <select name="" id="">
                      <option value="">EYl's</option>
                      <option value="">EYl's</option>
                      <option value="">EYl's</option>
                    </select> */}
                    <h6>EYl's</h6>
                  </td>
                  <td colspan="3">
                    <select
                      name="lumborOrtho.EYl.left"
                      value={formik2.values.lumborOrtho.EYl.left}
                      disabled={disble?true:false}
                      onChange={(e) =>
                        handleLumborOrtho(e, "lumborOrtho.EYl.left")
                      }
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="Neg" label="Neg">Neg</option>
                      <option value="Pos" label="Pos">Pos</option>
                    </select>
                  </td>
                  <td colspan="3">
                    <select
                      name="lumborOrtho.EYl.right"
                      value={formik2.values.lumborOrtho.EYl.right}
                      disabled={disble?true:false}
                      onChange={(e) =>
                        handleLumborOrtho(e, "lumborOrtho.EYl.right")
                      }
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="Neg">Neg</option>
                      <option value="Pos">Pos</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  {!formik2?.values?.lumbarPos&&formik2.values.lumborOrtho.EYl.left === "Pos" ? (
                    <>
                      <td>
                        <span className="me-2">
                          <b>SI</b>
                        </span>
                        <input
                          name="lumborOrtho.EYl.leftOption.SI"
                          value={formik2?.values?.lumborOrtho?.EYl?.leftOption?.SI}
                          checked={formik2?.values?.lumborOrtho?.EYl?.leftOption?.SI}
                          onChange={(e) =>
                            handleLumborOrthoCheck(
                              e,
                              "lumborOrtho.EYl.leftOption.SI"
                            )
                          }
                          className="i-mb-0"
                          type="checkbox"
                          id=""
                        />
                      </td>
                      <td>
                        <span className="me-2">
                          <b>LB</b>
                        </span>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="lumborOrtho.EYl.leftOption.LB"
                          value={formik2.values.lumborOrtho.EYl.leftOption.LB}
                          checked={formik2.values.lumborOrtho.EYl.leftOption.LB}
                          onChange={(e) =>
                            handleLumborOrthoCheck(
                              e,
                              "lumborOrtho.EYl.leftOption.LB"
                            )
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <span className="me-2">
                          <b>HIP</b>
                        </span>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="lumborOrtho.EYl.leftOption.HIP"
                          value={formik2.values.lumborOrtho.EYl.leftOption.HIP}
                          checked={formik2.values.lumborOrtho.EYl.leftOption.HIP}
                          onChange={(e) =>
                            handleLumborOrthoCheck(
                              e,
                              "lumborOrtho.EYl.leftOption.HIP"
                            )
                          }
                          id=""
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td style={{ width: "14.2%" }}></td>
                      <td style={{ width: "14.2%" }}></td>
                      <td style={{ width: "14.2%" }}></td>
                    </>
                  )}
                  {!formik2?.values?.lumbarPos&&formik2.values.lumborOrtho.EYl.right === "Pos" ? (
                    <>
                      <td>
                        <span className="me-2">
                          <b>SI</b>
                        </span>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="lumborOrtho.EYl.rightOption.SI"
                          value={formik2.values.lumborOrtho.EYl.rightOption.SI}
                          checked={formik2.values.lumborOrtho.EYl.rightOption.SI}
                          onChange={(e) =>
                            handleLumborOrthoCheck(
                              e,
                              "lumborOrtho.EYl.rightOption.SI"
                            )
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <span className="me-2">
                          <b>LB</b>
                        </span>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="lumborOrtho.EYl.rightOption.LB"
                          value={formik2.values.lumborOrtho.EYl.rightOption.LB}
                          checked={formik2.values.lumborOrtho.EYl.rightOption.LB}
                          onChange={(e) =>
                            handleLumborOrthoCheck(
                              e,
                              "lumborOrtho.EYl.rightOption.LB"
                            )
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <span className="me-2">
                          <b>HIP</b>
                        </span>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="lumborOrtho.EYl.rightOption.HIP"
                          value={formik2.values.lumborOrtho.EYl.rightOption.HIP}
                          checked={formik2.values.lumborOrtho.EYl.rightOption.HIP}
                          onChange={(e) =>
                            handleLumborOrthoCheck(
                              e,
                              "lumborOrtho.EYl.rightOption.HIP"
                            )
                          }
                          id=""
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td style={{ width: "14.2%" }}></td>
                      <td style={{ width: "14.2%" }}></td>
                      <td style={{ width: "14.2%" }}></td>
                    </>
                  )}
                </tr>
                <tr>
                  <td>
                    <h6>Nachlas'</h6>
                  </td>
                  <td colspan="3">
                    <select
                      name="lumborOrtho.Nachlas.left"
                      value={formik2.values.lumborOrtho.Nachlas.left}
                      disabled={disble?true:false}
                      onChange={(e) =>
                        handleLumborOrtho(e, "lumborOrtho.Nachlas.left")
                      }
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="Neg">Neg</option>
                      <option value="Pos">Pos</option>
                    </select>
                  </td>
                  <td colspan="3">
                    <select
                      name="lumborOrtho.Nachlas.right"
                      value={formik2.values.lumborOrtho.Nachlas.right}
                      disabled={disble?true:false}
                      onChange={(e) =>
                        handleLumborOrtho(e, "lumborOrtho.Nachlas.right")
                      }
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="Neg">Neg</option>
                      <option value="Pos">Pos</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  {!formik2?.values?.lumbarPos&&formik2.values.lumborOrtho.Nachlas.left === "Pos" ? (
                    <>
                      <td>
                        <span className="me-2">
                          <b>SI</b>
                        </span>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="lumborOrtho.Nachlas.leftOption.SI"
                          value={
                            formik2.values.lumborOrtho.Nachlas.leftOption.SI
                          }
                          checked={
                            formik2.values.lumborOrtho.Nachlas.leftOption.SI
                          }
                          onChange={(e) =>
                            handleLumborOrthoCheck(
                              e,
                              "lumborOrtho.Nachlas.leftOption.SI"
                            )
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <span className="me-2">
                          <b>LB</b>
                        </span>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="lumborOrtho.Nachlas.leftOption.LB"
                          value={
                            formik2.values.lumborOrtho.Nachlas.leftOption.LB
                          }
                          checked={
                            formik2.values.lumborOrtho.Nachlas.leftOption.LB
                          }
                          onChange={(e) =>
                            handleLumborOrthoCheck(
                              e,
                              "lumborOrtho.Nachlas.leftOption.LB"
                            )
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <span className="me-2">
                          <b>HIP</b>
                        </span>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="lumborOrtho.Nachlas.leftOption.HIP"
                          value={
                            formik2.values.lumborOrtho.Nachlas.leftOption.HIP
                          }
                          checked={
                            formik2.values.lumborOrtho.Nachlas.leftOption.HIP
                          }
                          onChange={(e) =>
                            handleLumborOrthoCheck(
                              e,
                              "lumborOrtho.Nachlas.leftOption.HIP"
                            )
                          }
                          id=""
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td></td>
                      <td></td>
                      <td></td>
                    </>
                  )}
                  {!formik2?.values?.lumbarPos&&formik2.values.lumborOrtho.Nachlas.right === "Pos" ? (
                    <>
                      <td>
                        <span className="me-2">
                          <b>SI</b>
                        </span>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="lumborOrtho.Nachlas.rightOption.SI"
                          value={
                            formik2.values.lumborOrtho.Nachlas.rightOption.SI
                          }
                          checked={
                            formik2.values.lumborOrtho.Nachlas.rightOption.SI
                          }
                          onChange={(e) =>
                            handleLumborOrthoCheck(
                              e,
                              "lumborOrtho.Nachlas.rightOption.SI"
                            )
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <span className="me-2">
                          <b>LB</b>
                        </span>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="lumborOrtho.Nachlas.rightOption.LB"
                          value={
                            formik2.values.lumborOrtho.Nachlas.rightOption.LB
                          }
                          checked={
                            formik2.values.lumborOrtho.Nachlas.rightOption.LB
                          }
                          onChange={(e) =>
                            handleLumborOrthoCheck(
                              e,
                              "lumborOrtho.Nachlas.rightOption.LB"
                            )
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <span className="me-2">
                          <b>HIP</b>
                        </span>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="lumborOrtho.Nachlas.rightOption.HIP"
                          value={
                            formik2.values.lumborOrtho.Nachlas.rightOption.HIP
                          }
                          checked={
                            formik2.values.lumborOrtho.Nachlas.rightOption.HIP
                          }
                          onChange={(e) =>
                            handleLumborOrthoCheck(
                              e,
                              "lumborOrtho.Nachlas.rightOption.HIP"
                            )
                          }
                          id=""
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td></td>
                      <td></td>
                      <td></td>
                    </>
                  )}

                  <td></td>
                </tr>
                <tr>
                  <td>
                    <h6>Yeoman's</h6>
                  </td>
                  <td colspan="3">
                    <select
                      name="lumborOrtho.Yeoman.left"
                      value={formik2.values.lumborOrtho.Yeoman.left}
                      disabled={disble?true:false}
                      onChange={(e) =>
                        handleLumborOrtho(e, "lumborOrtho.Yeoman.left")
                      }
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="Neg">Neg</option>
                      <option value="Pos">Pos</option>
                    </select>
                  </td>
                  <td colspan="3">
                    <select
                      name="lumborOrtho.Yeoman.right"
                      value={formik2.values.lumborOrtho.Yeoman.right}
                      disabled={disble?true:false}
                      onChange={(e) =>
                        handleLumborOrtho(e, "lumborOrtho.Yeoman.right")
                      }
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="Neg">Neg</option>
                      <option value="Pos">Pos</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  {!formik2?.values?.lumbarPos&&formik2.values.lumborOrtho.Yeoman.left === "Pos" ? (
                    <>
                      <td>
                        <span className="me-2">
                          <b>SI</b>
                        </span>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="lumborOrtho.Yeoman.leftOption.SI"
                          value={
                            formik2.values.lumborOrtho.Yeoman.leftOption.SI
                          }
                          checked={
                            formik2.values.lumborOrtho.Yeoman.leftOption.SI
                          }
                          onChange={(e) =>
                            handleLumborOrthoCheck(
                              e,
                              "lumborOrtho.Yeoman.leftOption.SI"
                            )
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <span className="me-2">
                          <b>LB</b>
                        </span>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="lumborOrtho.Yeoman.leftOption.LB"
                          value={
                            formik2.values.lumborOrtho.Yeoman.leftOption.LB
                          }
                          checked={
                            formik2.values.lumborOrtho.Yeoman.leftOption.LB
                          }
                          onChange={(e) =>
                            handleLumborOrthoCheck(
                              e,
                              "lumborOrtho.Yeoman.leftOption.LB"
                            )
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <span className="me-2">
                          <b>HIP</b>
                        </span>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="lumborOrtho.Yeoman.leftOption.HIP"
                          value={
                            formik2.values.lumborOrtho.Yeoman.leftOption.HIP
                          }
                          checked={
                            formik2.values.lumborOrtho.Yeoman.leftOption.HIP
                          }
                          onChange={(e) =>
                            handleLumborOrthoCheck(
                              e,
                              "lumborOrtho.Yeoman.leftOption.HIP"
                            )
                          }
                          id=""
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td></td>
                      <td></td>
                      <td></td>
                    </>
                  )}
                  {!formik2?.values?.lumbarPos&&formik2.values.lumborOrtho.Yeoman.right === "Pos" ? (
                    <>
                      <td>
                        <span className="me-2">
                          <b>SI</b>
                        </span>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="lumborOrtho.Yeoman.rightOption.SI"
                          value={
                            formik2.values.lumborOrtho.Yeoman.rightOption.SI
                          }
                          checked={
                            formik2.values.lumborOrtho.Yeoman.rightOption.SI
                          }
                          onChange={(e) =>
                            handleLumborOrthoCheck(
                              e,
                              "lumborOrtho.Yeoman.rightOption.SI"
                            )
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <span className="me-2">
                          <b>LB</b>
                        </span>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="lumborOrtho.Yeoman.rightOption.LB"
                          value={
                            formik2.values.lumborOrtho.Yeoman.rightOption.LB
                          }
                          checked={
                            formik2.values.lumborOrtho.Yeoman.rightOption.LB
                          }
                          onChange={(e) =>
                            handleLumborOrthoCheck(
                              e,
                              "lumborOrtho.Yeoman.rightOption.LB"
                            )
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <span className="me-2">
                          <b>HIP</b>
                        </span>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="lumborOrtho.Yeoman.rightOption.HIP"
                          value={
                            formik2.values.lumborOrtho.Yeoman.rightOption.HIP
                          }
                          checked={
                            formik2.values.lumborOrtho.Yeoman.rightOption.HIP
                          }
                          onChange={(e) =>
                            handleLumborOrthoCheck(
                              e,
                              "lumborOrtho.Yeoman.rightOption.HIP"
                            )
                          }
                          id=""
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td></td>
                      <td></td>
                      <td></td>
                    </>
                  )}

                  <td></td>
                </tr>
                <tr>
                  <td>
                    <h6>LaSeague</h6>
                  </td>
                  <td colspan="3">
                    <select
                      name="lumborOrtho.LaSeague.left"
                      value={formik2.values.lumborOrtho.LaSeague.left}
                      disabled={disble?true:false}
                      onChange={(e) =>
                        handleLumborOrtho(e, "lumborOrtho.LaSeague.left")
                      }
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="Neg">Neg</option>
                      <option value="Pos">Pos</option>
                    </select>
                  </td>
                  <td colspan="3">
                    <select
                      name="lumborOrtho.LaSeague.right"
                      value={formik2.values.lumborOrtho.LaSeague.right}
                      disabled={disble?true:false}
                      onChange={(e) =>
                        handleLumborOrtho(e, "lumborOrtho.LaSeague.right")
                      }
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="Neg">Neg</option>
                      <option value="Pos">Pos</option>
                    </select>
                  </td>
                </tr>
               
                <tr>
                  <td>
                    <h6>Braggard</h6>
                  </td>
                  <td colspan="3">
                    <select
                      name="lumborOrtho.Braggard.left"
                      value={formik2.values.lumborOrtho.Braggard.left}
                      disabled={disble?true:false}
                      onChange={(e) =>
                        handleLumborOrtho(e, "lumborOrtho.Braggard.left")
                      }
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="Neg">Neg</option>
                      <option value="Pos">Pos</option>
                    </select>
                  </td>
                  <td colspan="3">
                    <select
                      name="lumborOrtho.Braggard.right"
                      value={formik2.values.lumborOrtho.Braggard.right}
                      disabled={disble?true:false}
                      onChange={(e) =>
                        handleLumborOrtho(e, "lumborOrtho.Braggard.right")
                      }
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="Neg">Neg</option>
                      <option value="Pos">Pos</option>
                    </select>
                  </td>
                </tr>
                
                <tr>
                  <td>
                    <h6>FABERE</h6>
                  </td>
                  <td colspan="3">
                    <select
                      name="lumborOrtho.FABERE.left"
                      value={formik2.values.lumborOrtho.FABERE.left}
                      disabled={disble?true:false}
                      onChange={(e) =>
                        handleLumborOrtho(e, "lumborOrtho.FABERE.left")
                      }
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="Neg">Neg</option>
                      <option value="Pos">Pos</option>
                    </select>
                  </td>
                  <td colspan="3">
                    <select
                      name="lumborOrtho.FABERE.right"
                      value={formik2.values.lumborOrtho.FABERE.right}
                      disabled={disble?true:false}
                      onChange={(e) =>
                        handleLumborOrtho(e, "lumborOrtho.FABERE.right")
                      }
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="Neg">Neg</option>
                      <option value="Pos">Pos</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  {!formik2?.values?.lumbarPos&&formik2.values.lumborOrtho.FABERE.left === "Pos" ? (
                    <>
                      <td>
                        <span className="me-2">
                          <b>SI</b>
                        </span>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="lumborOrtho.FABERE.leftOption.SI"
                          value={
                            formik2.values.lumborOrtho.FABERE.leftOption.SI
                          }
                          checked={
                            formik2.values.lumborOrtho.FABERE.leftOption.SI
                          }
                          onChange={(e) =>
                            handleLumborOrthoCheck(
                              e,
                              "lumborOrtho.FABERE.leftOption.SI"
                            )
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <span className="me-2">
                          <b>LB</b>
                        </span>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="lumborOrtho.FABERE.leftOption.LB"
                          value={
                            formik2.values.lumborOrtho.FABERE.leftOption.LB
                          }
                          checked={
                            formik2.values.lumborOrtho.FABERE.leftOption.LB
                          }
                          onChange={(e) =>
                            handleLumborOrthoCheck(
                              e,
                              "lumborOrtho.FABERE.leftOption.LB"
                            )
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <span className="me-2">
                          <b>HIP</b>
                        </span>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="lumborOrtho.FABERE.leftOption.HIP"
                          value={
                            formik2.values.lumborOrtho.FABERE.leftOption.HIP
                          }
                          checked={
                            formik2.values.lumborOrtho.FABERE.leftOption.HIP
                          }
                          onChange={(e) =>
                            handleLumborOrthoCheck(
                              e,
                              "lumborOrtho.FABERE.leftOption.HIP"
                            )
                          }
                          id=""
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td></td>
                      <td></td>
                      <td></td>
                    </>
                  )}
                  {!formik2?.values?.lumbarPos&&formik2.values.lumborOrtho.FABERE.right === "Pos" ? (
                    <>
                      <td>
                        <span className="me-2">
                          <b>SI</b>
                        </span>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="lumborOrtho.FABERE.rightOption.SI"
                          value={
                            formik2.values.lumborOrtho.FABERE.rightOption.SI
                          }
                          checked={
                            formik2.values.lumborOrtho.FABERE.rightOption.SI
                          }
                          onChange={(e) =>
                            handleLumborOrthoCheck(
                              e,
                              "lumborOrtho.FABERE.rightOption.SI"
                            )
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <span className="me-2">
                          <b>LB</b>
                        </span>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="lumborOrtho.FABERE.rightOption.LB"
                          value={
                            formik2.values.lumborOrtho.FABERE.rightOption.LB
                          }
                          checked={
                            formik2.values.lumborOrtho.FABERE.rightOption.LB
                          }
                          onChange={(e) =>
                            handleLumborOrthoCheck(
                              e,
                              "lumborOrtho.FABERE.rightOption.LB"
                            )
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <span className="me-2">
                          <b>HIP</b>
                        </span>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="lumborOrtho.FABERE.rightOption.HIP"
                          value={
                            formik2.values.lumborOrtho.FABERE.rightOption.HIP
                          }
                          checked={
                            formik2.values.lumborOrtho.FABERE.rightOption.HIP
                          }
                          onChange={(e) =>
                            handleLumborOrthoCheck(
                              e,
                              "lumborOrtho.FABERE.rightOption.HIP"
                            )
                          }
                          id=""
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td></td>
                      <td></td>
                      <td></td>
                    </>
                  )}

                  <td></td>
                </tr>
                <tr>
                  <td>
                    <h6>Milgram's</h6>
                  </td>
                  <td colspan="3">
                    <select
                      name="lumborOrtho.Milgram.left"
                      value={formik2.values.lumborOrtho.Milgram.left}
                      disabled={disble?true:false}
                      onChange={(e) =>
                        handleLumborOrtho(e, "lumborOrtho.Milgram.left")
                      }
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="Neg">Neg</option>
                      <option value="Pos">Pos</option>
                    </select>
                  </td>
                  <td colspan="3">
                    <select
                      name="lumborOrtho.Milgram.right"
                      value={formik2.values.lumborOrtho.Milgram.right}
                      disabled={disble?true:false}
                      onChange={(e) =>
                        handleLumborOrtho(e, "lumborOrtho.Milgram.right")
                      }
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="Neg">Neg</option>
                      <option value="Pos">Pos</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  {!formik2?.values?.lumbarPos&&formik2.values.lumborOrtho.Milgram.left === "Pos" ? (
                    <>
                      <td>
                        <span className="me-2">
                          <b>SI</b>
                        </span>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="lumborOrtho.Milgram.leftOption.SI"
                          value={
                            formik2.values.lumborOrtho.Milgram.leftOption.SI
                          }
                          checked={
                            formik2.values.lumborOrtho.Milgram.leftOption.SI
                          }
                          onChange={(e) =>
                            handleLumborOrthoCheck(
                              e,
                              "lumborOrtho.Milgram.leftOption.SI"
                            )
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <span className="me-2">
                          <b>LB</b>
                        </span>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="lumborOrtho.Milgram.leftOption.LB"
                          value={
                            formik2.values.lumborOrtho.Milgram.leftOption.LB
                          }
                          checked={
                            formik2.values.lumborOrtho.Milgram.leftOption.LB
                          }
                          onChange={(e) =>
                            handleLumborOrthoCheck(
                              e,
                              "lumborOrtho.Milgram.leftOption.LB"
                            )
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <span className="me-2">
                          <b>HIP</b>
                        </span>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="lumborOrtho.Milgram.leftOption.HIP"
                          value={
                            formik2.values.lumborOrtho.Milgram.leftOption.HIP
                          }
                          checked={
                            formik2.values.lumborOrtho.Milgram.leftOption.HIP
                          }
                          onChange={(e) =>
                            handleLumborOrthoCheck(
                              e,
                              "lumborOrtho.Milgram.leftOption.HIP"
                            )
                          }
                          id=""
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td></td>
                      <td></td>
                      <td></td>
                    </>
                  )}
                  {!formik2?.values?.lumbarPos&&formik2.values.lumborOrtho.Milgram.right === "Pos" ? (
                    <>
                      <td>
                        <span className="me-2">
                          <b>SI</b>
                        </span>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="lumborOrtho.Milgram.rightOption.SI"
                          value={
                            formik2.values.lumborOrtho.Milgram.rightOption.SI
                          }
                          checked={
                            formik2.values.lumborOrtho.Milgram.rightOption.SI
                          }
                          onChange={(e) =>
                            handleLumborOrthoCheck(
                              e,
                              "lumborOrtho.Milgram.rightOption.SI"
                            )
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <span className="me-2">
                          <b>LB</b>
                        </span>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="lumborOrtho.Milgram.rightOption.LB"
                          value={
                            formik2.values.lumborOrtho.Milgram.rightOption.LB
                          }
                          checked={
                            formik2.values.lumborOrtho.Milgram.rightOption.LB
                          }
                          onChange={(e) =>
                            handleLumborOrthoCheck(
                              e,
                              "lumborOrtho.Milgram.rightOption.LB"
                            )
                          }
                          id=""
                        />
                      </td>
                      <td>
                        <span className="me-2">
                          <b>HIP</b>
                        </span>
                        <input
                          className="i-mb-0"
                          type="checkbox"
                          name="lumborOrtho.Milgram.rightOption.HIP"
                          value={
                            formik2.values.lumborOrtho.Milgram.rightOption.HIP
                          }
                          checked={
                            formik2.values.lumborOrtho.Milgram.rightOption.HIP
                          }
                          onChange={(e) =>
                            handleLumborOrthoCheck(
                              e,
                              "lumborOrtho.Milgram.rightOption.HIP"
                            )
                          }
                          id=""
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td></td>
                      <td></td>
                      <td></td>
                    </>
                  )}

                  <td></td>
                </tr>
                <tr>
                  <th colspan="7" className="text-dark font-weight-bold">
                    <u>SOTO HALL</u>
                  </th>
                </tr>
                <tr>
                  <td colspan="1">
                    <h6>Thoracic</h6>
                  </td>
                  <td colspan="3">
                    <select
                      name="sottoHall.thoracic.left"
                      value={formik2?.values?.sottoHall?.thoracic?.left}
                      disabled={disble?true:false}
                      onChange={formik2.handleChange}
                      id=""
                    >
                      <option value="" >select</option>
                     <option value="Neg">Neg</option>
                      <option value="Pos">Pos</option>
                    </select>
                  </td>
                  {/* <td colspan="3">
                    <select
                      name="sottoHall.thoracic.right"
                      value={formik2?.values?.sottoHall?.thoracic?.right}
                      disabled={disble?true:false}
                      onChange={formik2.handleChange}
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="Neg">Neg</option>
                      <option value="Pos">Pos</option>
                    </select>
                  </td> */}
                </tr>
                <tr>
                  <td colspan="1">
                    <h6>Lumbar</h6>
                  </td>
                  <td colspan="3">
                    <select
                      name="sottoHall.lumbar.left"
                      value={formik2.values.sottoHall.lumbar.left}
                      disabled={disble?true:false}
                      onChange={formik2.handleChange}
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="Neg">Neg</option>
                      <option value="Pos">Pos</option>
                    </select>
                  </td>
                  {/* <td colspan="3">
                    <select
                      name="sottoHall.lumbar.right"
                      value={formik2.values.sottoHall.lumbar.right}
                      disabled={disble?true:false}
                      onChange={formik2.handleChange}
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="Neg">Neg</option>
                      <option value="Pos">Pos</option>
                    </select>
                  </td> */}
                </tr>
                <tr>
                  <th colspan="7" className="text-dark font-weight-bold">
                    <u>DEEP TENDON REFLEXES</u>
                  </th>
                </tr>
                <td className="d-flex align-items-center">
                        <span className="text-dark ps-0 pt-0 pb-0">
                          Alle +2 bilateral
                        </span>
                        <input
                          className="w-auto i-mb-0"
                          type="checkbox"
                          name=""
                          id=""
                          onChange={(e) => handleEventList(e)}
                        />
                      </td>
                <tr>
                  <td></td>
                  <td colspan="3">
                    <b>
                      <u>LEFT</u>
                    </b>
                  </td>
                  <td colspan="3">
                    <b>
                      <u>RIGHT</u>
                    </b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h6>Patellar</h6>
                  </td>
                 
                  <td  colspan="3">
                    <select
                      style={{ width: "inherit" }}
                      name="deepTendon.patellar.left.value"
                      value={formik2.values?.deepTendon?.patellar?.left?.value}
                      onChange={formik2.handleChange}
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </td>
                  <td colspan="3">
                    <select
                      style={{ width: "inherit" }}
                      name="deepTendon.patellar.right.value"
                      value={formik2.values?.deepTendon?.patellar?.right?.value}
                      onChange={formik2.handleChange}
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h6>Achilles</h6>
                  </td>
                  
                  <td colspan="3">
                    <select
                      style={{ width: "inherit" }}
                      name="deepTendon.achills.left.value"
                      value={formik2.values?.deepTendon?.achills?.left?.value}
                      onChange={formik2.handleChange}
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </td>
                  <td colspan="3">
                    <select
                      style={{ width: "inherit" }}
                      name="deepTendon.achills.right.value"
                      value={formik2.values?.deepTendon?.achills?.right?.value}
                      onChange={formik2.handleChange}
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <div className="table-responsive">
            <table className="table table-borderless tb_td">
              <tbody>
                <tr>
                  <th colspan="7" className="text-dark font-weight-bold">
                    <u>SOTO HALL</u>
                  </th>
                </tr>
</tbody>
</table>
</div> */}
{/* <div className="table-responsive">
<table className="table table-borderless tb_td">
              <tbody> */}
                {/* <tr>
                  <td colspan="1">
                    <h6>Thoracic</h6>
                  </td>
                  <td colspan="3">
                    <select
                      name="sottoHall.thoracic.left"
                      value={formik2?.values?.sottoHall?.thoracic?.left}
                      disabled={disble?true:false}
                      onChange={formik2.handleChange}
                      id=""
                    >
                      <option value="" >select</option>
                     <option value="Neg">Neg</option>
                      <option value="Pos">Pos</option>
                    </select>
                  </td>
                  <td colspan="3">
                    <select
                      name="sottoHall.thoracic.right"
                      value={formik2?.values?.sottoHall?.thoracic?.right}
                      disabled={disble?true:false}
                      onChange={formik2.handleChange}
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="Neg">Neg</option>
                      <option value="Pos">Pos</option>
                    </select>
                  </td>
                </tr> */}
                {/* <tr>
                  <td colspan="1">
                    <h6>Lumbar</h6>
                  </td>
                  <td colspan="3">
                    <select
                      name="sottoHall.lumbar.left"
                      value={formik2.values.sottoHall.lumbar.left}
                      disabled={disble?true:false}
                      onChange={formik2.handleChange}
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="Neg">Neg</option>
                      <option value="Pos">Pos</option>
                    </select>
                  </td>
                  <td colspan="3">
                    <select
                      name="sottoHall.lumbar.right"
                      value={formik2.values.sottoHall.lumbar.right}
                      disabled={disble?true:false}
                      onChange={formik2.handleChange}
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="Neg">Neg</option>
                      <option value="Pos">Pos</option>
                    </select>
                  </td>
                </tr> */}
              {/* </tbody>
            </table>
          </div> */}
          {/* <div className="table-responsive">
            <table className="table table-borderless tb_td">
              <tbody> */}
                {/* <tr>
                  <th colspan="7" className="text-dark font-weight-bold">
                    <u>DEEP TENDON REFLEXES</u>
                  </th>
                </tr>
                <tr>
                  <td></td>
                  <td colspan="3">
                    <b>
                      <u>LEFT</u>
                    </b>
                  </td>
                  <td colspan="3">
                    <b>
                      <u>RIGHT</u>
                    </b>
                  </td>
                </tr> */}

                {/* <tr>
                  <td>
                    <h6>Patellar</h6>
                  </td>
                 
                  <td  colspan="3">
                    <select
                      style={{ width: "inherit" }}
                      name="deepTendon.patellar.left.value"
                      value={formik2.values?.deepTendon?.patellar?.left?.value}
                      onChange={formik2.handleChange}
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </td>
                  <td colspan="3">
                    <select
                      style={{ width: "inherit" }}
                      name="deepTendon.patellar.right.value"
                      value={formik2.values?.deepTendon?.patellar?.right?.value}
                      onChange={formik2.handleChange}
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h6>Achilles</h6>
                  </td>
                  
                  <td colspan="3">
                    <select
                      style={{ width: "inherit" }}
                      name="deepTendon.achills.left.value"
                      value={formik2.values?.deepTendon?.achills?.left?.value}
                      onChange={formik2.handleChange}
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </td>
                  <td colspan="3">
                    <select
                      style={{ width: "inherit" }}
                      name="deepTendon.achills.right.value"
                      value={formik2.values?.deepTendon?.achills?.right?.value}
                      onChange={formik2.handleChange}
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </td>
                </tr> */}
              {/* </tbody>
            </table>
          </div> */}
        </div>
        <div className="col-xl-5">
          <div className="table-responsive">
            <table className="table table-borderless tb_td tb_td_lumbar">
              <tbody>
              <tr>
                  <th colspan="7" className="text-dark font-weight-bold">
                    <u>CERVICAL ORTHOPEDIC</u>
                  </th>
                </tr>
                <tr>
                  <td width="160">
                    <label htmlFor="bilat1" className="me-1 text-dark">
                      All Pos Bilat
                    </label>
                    <input className="i-mb-0" type="checkbox" name="cervicalPos" id="bilat1"
                    value={formik2?.values?.cervicalPos}  
                    checked={formik2?.values?.cervicalPos}  onClick={(e) =>handleLumborOrthoCheck(e, "cervicalPos")}
                     />
                  </td>
                  <td colspan="7">
                    <label htmlFor="negb1" className="me-1 text-dark">
                      All Neg Bilat
                    </label>
                    <input className="i-mb-0" type="checkbox" name="cervicalNag" id="negb1" 
                    value={formik2?.values?.cervicalNag}  
                    checked={formik2?.values?.cervicalNag}  onClick={(e) =>handleLumborOrthoCheck(e, "cervicalNag")}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Jackson' s</td>
                  <td colspan="3">
                    <select
                      name="cervical.jackson"
                      value={formik2.values?.cervical?.jackson}
                      disabled={disbleSide?true:false}
                      onChange={(e) =>
                        handleCervicalChage(e, "cervical.jackson")
                      }
                      id=""
                    >
                      <option value="">select</option>
                      <option value="Neg">Neg</option>
                      <option value="Pos">Pos</option>
                    </select>
                  </td>
                  {!formik2?.values?.cervicalPos&&formik2.values.cervical.jackson === "Pos" ? (
                    <>
                      <td style={{ textAlign: "center" }}>DIST</td>
                      <td colspan="3">
                        <select
                          name="cervical.dist"
                          value={formik2.values?.cervical?.dist}
                          disabled={disbleSide?true:false}
                          onChange={formik2.handleChange}
                          id=""
                        >
                      <option value="" >select</option>
                          <option value="Neg">Neg</option>
                          <option value="Pos">Pos</option>
                        </select>
                      </td>
                    </>
                  ) : (
                    <>
                      <td></td> <td></td>
                    </>
                  )}
                </tr>
                <tr>
                  <td></td>
                  <td colspan="3">
                    <b>
                      <u>LEFT</u>
                    </b>
                  </td>
                  <td></td>
                  <td colspan="3">
                    <b>
                      <u>RIGHT</u>
                    </b>
                  </td>
                </tr>
                <tr>
                  <td>MFC</td>
                  <td colspan="3">
                    <select
                      name="cervical.MFC.left"
                      value={formik2.values?.cervical?.MFC?.left}
                      disabled={disbleSide?true:false}
                      onChange={(e) =>
                        handleCervicalChage(e, "cervical.MFC.left")
                      }
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="Neg">Neg</option>
                      <option value="Pos">Pos</option>
                    </select>
                  </td>
                  <td></td>
                  <td colspan="3">
                    <select
                      name="cervical.MFC.right"
                      value={formik2.values?.cervical?.MFC?.right}
                      disabled={disbleSide?true:false}
                      onChange={(e) =>
                        handleCervicalChage(e, "cervical.MFC.right")
                      }
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="Neg">Neg</option>
                      <option value="Pos">Pos</option>
                    </select>
                  </td>
                </tr>

                <tr >
                  {!formik2?.values?.cervicalPos&&formik2.values.cervical.MFC.left === "Pos" ?<td>DIST</td>:!formik2?.values?.cervicalPos&&formik2.values.cervical.MFC.right === "Pos"?<td>DIST</td>:<td></td>}
                  {!formik2?.values?.cervicalPos&&formik2.values.cervical.MFC.left === "Pos" ? (
                    <>
                      <td colspan="3">
                        <select
                          name="cervical.DIST.left"
                          value={formik2.values?.cervical?.DIST?.left}
                          disabled={disbleSide?true:false}
                          onChange={formik2.handleChange}
                          id=""
                        >
                      <option value="" >select</option>
                          <option value="Neg">Neg</option>
                          <option value="Pos">Pos</option>
                        </select>
                      </td>
                    </>
                  ) : (
                    <>
                      <td colspan="3"></td>
                    </>
                  )}

                  <td></td>
                  {!formik2?.values?.cervicalPos&&formik2.values.cervical.MFC.right === "Pos" ? (
                    <>
                      <td colspan="3">
                        <select
                          name="cervical.DIST.right"
                          value={formik2.values?.cervical?.DIST?.right}
                          disabled={disbleSide?true:false}
                          onChange={formik2.handleChange}
                          id=""
                        >
                      <option value="" >select</option>
                          <option value="Neg">Neg</option>
                          <option value="Pos">Pos</option>
                        </select>
                      </td>{" "}
                      
                    </>
                  ) : (
                    <>
                      <td></td>
                    </>
                  )}
                </tr>

                <tr>
                  <td>Shldr Dep</td>
                  <td colspan="3">
                    <select
                      name="cervical.ShldrDep.left"
                      value={formik2.values?.cervical?.ShldrDep?.left}
                      disabled={disbleSide?true:false}
                      onChange={formik2.handleChange}
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="Neg">Neg</option>
                      <option value="Pos">Pos</option>
                    </select>
                  </td>
                  <td></td>
                  <td colspan="3">
                    <select
                      name="cervical.ShldrDep.right"
                      value={formik2.values?.cervical?.ShldrDep?.right}
                      onChange={formik2.handleChange}
                      disabled={disbleSide?true:false}
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="Neg">Neg</option>
                      <option value="Pos">Pos</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Wrights</td>
                  <td colspan="3">
                    <select
                      name="cervical.Wrights.left"
                      value={formik2.values?.cervical?.Wrights?.left}
                      onChange={formik2.handleChange}
                      disabled={disbleSide?true:false}
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="Neg">Neg</option>
                      <option value="Pos">Pos</option>
                    </select>
                  </td>
                  <td></td>
                  <td colspan="3">
                    <select
                      name="cervical.Wrights.right"
                      value={formik2.values?.cervical?.Wrights?.right}
                      disabled={disbleSide?true:false}
                      onChange={formik2.handleChange}
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="Neg">Neg</option>
                      <option value="Pos">Pos</option>
                    </select>
                  </td>
                </tr>
                <tr>
                {!formik2?.values?.cervicalPos&&formik2.values?.cervical?.Wrights?.left === "Pos"?<td>Scalene</td>:!formik2?.values?.cervicalPos&&formik2.values?.cervical?.Wrights?.right === "Pos"?<td>Scalene</td>:<td></td>}
                  {!formik2?.values?.cervicalPos&&formik2.values?.cervical?.Wrights?.left=== "Pos" ? (
                    <>
                      <td colspan="3">
                        <select
                          name="cervical.Scalene.left"
                          value={formik2.values?.cervical?.Scalene?.left}
                          onChange={formik2.handleChange}
                          id=""
                        >
                      <option value="" >select</option>
                          <option value="A">A</option>
                          <option value="M">M</option>
                          <option value="P">P</option>
                          <option value="AMP">AMP</option>
                          <option value="MP">MP</option>
                          <option value="AM">AM</option>
                          <option value="AP">AP</option>
                        </select>
                      </td>
                    </>
                  ) : (
                    <>
                      <td colspan="3"></td>
                    </>
                  )}

                  <td></td>
                  {!formik2?.values?.cervicalPos&&formik2.values?.cervical?.Wrights?.right === "Pos" ? (
                    <>
                      <td colspan="3">
                        <select
                          name="cervical.Scalene.right"
                          value={formik2.values?.cervical?.Scalene?.right}
                          onChange={formik2.handleChange}
                          id=""
                        >
                      <option value="" >select</option>
                      <option value="A">A</option>
                          <option value="M">M</option>
                          <option value="P">P</option>
                          <option value="AMP">AMP</option>
                          <option value="MP">MP</option>
                          <option value="AM">AM</option>
                          <option value="AP">AP</option>
                        </select>
                      </td>
                      
                    </>
                  ) : (
                    <>
                      <td></td>
                    </>
                  )}

                 
                </tr>
                <tr>
                  <td>George's</td>
                  <td colspan="3">
                    <select
                      name="cervical.George.left"
                      value={formik2.values?.cervical?.George?.left}
                      disabled={disbleSide?true:false}
                      onChange={formik2.handleChange}
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="Neg">Neg</option>
                      <option value="Pos">Pos</option>
                    </select>
                  </td>
                  <td></td>
                  <td colspan="3">
                    <select
                      name="cervical.George.right"
                      value={formik2.values?.cervical?.George?.right}
                      disabled={disbleSide?true:false}
                      onChange={formik2.handleChange}
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="Neg">Neg</option>
                      <option value="Pos">Pos</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td colspan="8" className="font-weight-bold text-dark">
                    <u>DEEP TENDON REFLEXESs</u>
                  </td>                 
                </tr>
                <td className="d-flex align-items-center">
                        <span className="text-dark text-dark ps-0 pt-0 pb-0">
                          Alle +2 bilateral
                        </span>
                        <input
                          className="w-auto i-mb-0"
                          type="checkbox"
                          name=""
                          id=""
                          onChange={(e) => handleEventListREFLEXES(e)}
                        />
                      </td>
                <tr>
                  <td></td>
                   <td colspan="3" className="font-weight-bold text-dark">
                    <u>Left </u>
                  </td>
                  <td></td>
                  <td colspan="3" className="font-weight-bold text-dark">
                    <u>Right </u>
                  </td>
                </tr>
                
                
                <tr>
                  <td>Biceps</td>
                  {/* <td></td> */}
                  <td colspan="3">
                    <select
                      name="deepTendonReflexes.biceps.left"
                      value={formik2.values?.deepTendonReflexes?.biceps?.left}
                      onChange={formik2.handleChange}
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>

                    </select>
                  </td>
                  <td></td>
                  <td colspan="3">
                    <select
                      name="deepTendonReflexes.biceps.right"
                      value={formik2.values?.deepTendonReflexes?.biceps?.right}
                      onChange={formik2.handleChange}
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </td>
                  {/* <td></td> */}
                </tr>
                <tr>
                  <td>Triceps</td>
                  {/* <td></td> */}
                  <td colspan="3">
                    <select
                      name="deepTendonReflexes.triceps.left"
                      value={formik2.values?.deepTendonReflexes?.triceps?.left}
                      onChange={formik2.handleChange}
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </td>
                  <td></td>
                  <td colspan="3">
                    <select
                      name="deepTendonReflexes.triceps.right"
                      value={formik2.values?.deepTendonReflexes?.triceps?.right}
                      onChange={formik2.handleChange}
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </td>
                  {/* <td></td> */}
                  <td></td>
                </tr>
                <tr>
                  <td>Brachiorad</td>
                  {/* <td></td> */}
                  <td colspan="3">
                    <select
                      name="deepTendonReflexes.brachiorad.left"
                      value={
                        formik2.values?.deepTendonReflexes?.brachiorad?.left
                      }
                      onChange={formik2.handleChange}
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </td>
                  <td></td>
                  <td colspan="3">
                    <select
                      name="deepTendonReflexes.brachiorad.right"
                      value={
                        formik2.values?.deepTendonReflexes?.brachiorad?.right
                      }
                      onChange={formik2.handleChange}
                      id=""
                    >
                      <option value="" >select</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </td>
                  {/* <td></td> */}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <input
        type="button"
        name="next"
        onClick={() => setFunction(step + 1)}
        className="next action-button ms-5 me-5"
        value="Save & Next"
      />
      <input
        type="button"
        name="previous"
        onClick={() => setFunction(step - 1)}
        className="previous action-button-previous"
        value="Previous"
      /> */}
    </>
  );
};

export default OrthoPadicExamination;
