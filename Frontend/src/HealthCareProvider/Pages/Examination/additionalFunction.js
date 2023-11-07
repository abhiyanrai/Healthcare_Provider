export const generateName=(formik1)=>{

  if(formik1?.values?.SI?.position?.left&&formik1?.values?.Adams?.FixedSI?.position?.left){
    return " Open Left"
  }else if(formik1?.values?.SI?.position?.right&&formik1?.values?.Adams?.FixedSI?.position?.right){
    return " Open Right"
  }else if(formik1?.values?.SI?.position?.right&&formik1?.values?.Adams?.FixedSI?.position?.left){
    return " Closed Left"
  }else if(formik1?.values?.SI?.position?.left&&formik1?.values?.Adams?.FixedSI?.position?.right){
    return " Closed Right"
  }
  else if(formik1?.values?.SI?.position?.left&&formik1?.values?.Adams?.FixedSI?.position?.BLT){
    return " Open Left / Closed Right"
  }else if(formik1?.values?.SI?.position?.right&&formik1?.values?.Adams?.FixedSI?.BLT){
    return " Open Right / Closed Left"
  }
  else if(formik1?.values?.Adams?.FixedSI?.BLT){
    return "Open Left and Close Right"
  }else if(formik1?.values?.Adams?.FixedSI?.position?.left){
    return "Open Left "
  }else if(formik1?.values?.Adams?.FixedSI?.position?.right){
    return " Close Right"//new addition functionsright BLT
  }else
  {
    return false;
  }
}

export const CromNameBooleanFlx=(formik1)=>{

if(formik1?.values?.Crom?.EXT?.Dec||formik1?.values?.Crom?.EXT?.Inc||formik1?.values?.Crom?.EXT?.Normal){
  return "T2 Ribs"
}

  
}

export const CromNameBooleanLlb=(formik1)=>{
  if(formik1?.values?.Crom?.LLB?.Dec&&formik1?.values?.Crom?.RLB?.Dec){
    if(formik1?.values?.Crom?.LLB?.Deg?.length||formik1?.values?.Crom?.RLB?.Deg?.length){
  if(Number(formik1?.values?.Crom?.LLB?.Deg)<Number(formik1?.values?.Crom?.RLB?.Deg)){
    return "RLAT"
  }else{
    return "LLAT"
  }
}
}

if(formik1?.values?.Crom?.LLB?.Inc&&formik1?.values?.Crom?.RLB?.Inc){
if(formik1?.values?.Crom?.LLB?.Deg?.length||formik1?.values?.Crom?.RLB?.Deg?.length){
  if(Number(formik1?.values?.Crom?.LLB?.Deg)>Number(formik1?.values?.Crom?.RLB?.Deg)){
    return "RLAT"
  }else{
    return "LLAT"
  }
}
}

if(formik1?.values?.Crom?.LLB?.Inc&&formik1?.values?.Crom?.RLB?.Dec){
if(formik1?.values?.Crom?.LLB?.Deg?.length||formik1?.values?.Crom?.RLB?.Deg?.length){
  if(Number(formik1?.values?.Crom?.LLB?.Deg)>Number(formik1?.values?.Crom?.RLB?.Deg)){
    return "LLAT"
  }else{
    return "RLAT"
  }
}
}

if(formik1?.values?.Crom?.LLB?.Dec&&formik1?.values?.Crom?.RLB?.Inc){
if(formik1?.values?.Crom?.LLB?.Deg?.length||formik1?.values?.Crom?.RLB?.Deg?.length){
  if(Number(formik1?.values?.Crom?.LLB?.Deg)>Number(formik1?.values?.Crom?.RLB?.Deg)){
    return "LLAT"
  }else{
    return "RLAT"
  }
}
}

  // if(formik1?.values?.Crom?.EXT?.Dec||formik1?.values?.Crom?.EXT?.Inc||formik1?.values?.Crom?.EXT?.Normal
  //     ||formik1?.values?.Crom?.FLX?.Dec||formik1?.values?.Crom?.FLX?.Inc||formik1?.values?.Crom?.FLX?.Normal
  //     ||formik1?.values?.Crom?.LLB?.Dec||formik1?.values?.Crom?.LLB?.Inc||formik1?.values?.Crom?.LLB?.Normal
  //     ||formik1?.values?.Crom?.LROT?.Dec||formik1?.values?.Crom?.LROT?.Inc||formik1?.values?.Crom?.LROT?.Normal
  //     ||formik1?.values?.Crom?.PROT?.Dec||formik1?.values?.Crom?.PROT?.Inc||formik1?.values?.Crom?.PROT?.Normal
  //     ||formik1?.values?.Crom?.RLB?.Dec||formik1?.values?.Crom?.RLB?.Inc||formik1?.values?.Crom?.RLB?.Normal
  //     ){

  //         let extDec=formik1?.values?.Crom?.EXT?.Dec?"EXT":""
  //         let extInc=formik1?.values?.Crom?.EXT?.Inc?"EXT":""
  //         let extNormal=formik1?.values?.Crom?.EXT?.Normal?"EXT":""
  //           let flxDec=(formik1?.values?.Crom?.FLX?.Dec?"FLX":"")
  //           let flxInc=(formik1?.values?.Crom?.FLX?.Inc?"FLX":"")
  //           let flxNormal=(formik1?.values?.Crom?.FLX?.Normal?"FLX":"")

  //           let llbDec=(formik1?.values?.Crom?.LLB?.Dec?"LLB":"")
  //           let llbInc=(formik1?.values?.Crom?.LLB?.Inc?"LLB":"")
  //            let llbNormal=(formik1?.values?.Crom?.LLB?.Normal?"LLB":"")
  //            let rlbDec=formik1?.values?.Crom?.RLB?.Dec?"RLB":""
  //            let rlbInc=formik1?.values?.Crom?.RLB?.Inc?"RLB":""
  //            let rlvNormal=formik1?.values?.Crom?.RLB?.Normal?"RLB":""

  //           let lrotDec=formik1?.values?.Crom?.LROT?.Dec?"LROT":""
  //           let lrotInc=formik1?.values?.Crom?.LROT?.Inc?"LROT":""
  //           let lrotNormal=formik1?.values?.Crom?.LROT?.Normal?"LROT":""
  //           let protDec=formik1?.values?.Crom?.PROT?.Dec?"PROT":""
  //           let protInc=formik1?.values?.Crom?.PROT?.Inc?"PROT":""
  //           let protNormal=formik1?.values?.Crom?.PROT?.Normal?"PROT":""

  //           let data=extDec.concat(extInc," ",extNormal," ",flxDec," ",flxInc," ",flxNormal)
  //           let dataOne=llbDec.concat(llbInc," ",llbNormal," ",rlbDec," ",rlbInc," ",rlvNormal)
  //           let dataTwo=lrotDec.concat(lrotInc,"",lrotNormal," ",protNormal," ",protInc," ",protDec)
  //           // " ",llbDec," ",llbInc," ",llbNormal," ",lrotDec," ",lrotInc," ",
  //           // lrotNormal," ",protDec," ",protNormal," ",protInc," ",rlbInc," ",rlbDec," ",rlvNormal)
  //           return [data,dataOne,dataTwo];

  // //   return true
  // }else{
  //   return false;
  // }
}

export const CromNameBooleanProt=(formik1)=>{
  
  
  if(formik1?.values?.Crom?.LROT?.Inc&&formik1?.values?.Crom?.PROT?.Inc){
    if(formik1?.values?.Crom?.LROT?.Deg==formik1?.values?.Crom?.PROT?.Deg){
      return ""
    }else{
      if(formik1?.values?.Crom?.LROT?.Deg?.length||formik1?.values?.Crom?.PROT?.Deg?.length){
        if(Number(formik1?.values?.Crom?.LROT?.Deg)>Number(formik1?.values?.Crom?.PROT?.Deg)){
          return "RROT"
        }else{
          return "LROT"
        }
      }
    }
  }

  if(formik1?.values?.Crom?.LROT?.Dec&&formik1?.values?.Crom?.PROT?.Dec){
    if(formik1?.values?.Crom?.LROT?.Deg==formik1?.values?.Crom?.PROT?.Deg){
      return ""
    }else{
      if(formik1?.values?.Crom?.LROT?.Deg?.length||formik1?.values?.Crom?.PROT?.Deg?.length){
        if(Number(formik1?.values?.Crom?.LROT?.Deg)>Number(formik1?.values?.Crom?.PROT?.Deg)){
          return "LROT"
        }else{
          return "RROT"
        }
      }
    }
  }

  if(formik1?.values?.Crom?.LROT?.Dec&&formik1?.values?.Crom?.PROT?.Inc){
    if(formik1?.values?.Crom?.LROT?.Deg?.length||formik1?.values?.Crom?.PROT?.Deg?.length){
      if(Number(formik1?.values?.Crom?.LROT?.Deg)>Number(formik1?.values?.Crom?.PROT?.Deg)){
        return "LROT"
      }else{
        return "RROT"
      }
    }
  }


  if(formik1?.values?.Crom?.LROT?.Inc&&formik1?.values?.Crom?.PROT?.Dec){
    if(formik1?.values?.Crom?.LROT?.Deg?.length||formik1?.values?.Crom?.PROT?.Deg?.length){
      if(Number(formik1?.values?.Crom?.LROT?.Deg)>Number(formik1?.values?.Crom?.PROT?.Deg)){
        return "LROT"
      }else{
        return "RROT"
      }
    }
  }

  // if(formik1?.values?.Crom?.EXT?.Dec||formik1?.values?.Crom?.EXT?.Inc||formik1?.values?.Crom?.EXT?.Normal
  //     ||formik1?.values?.Crom?.FLX?.Dec||formik1?.values?.Crom?.FLX?.Inc||formik1?.values?.Crom?.FLX?.Normal
  //     ||formik1?.values?.Crom?.LLB?.Dec||formik1?.values?.Crom?.LLB?.Inc||formik1?.values?.Crom?.LLB?.Normal
  //     ||formik1?.values?.Crom?.LROT?.Dec||formik1?.values?.Crom?.LROT?.Inc||formik1?.values?.Crom?.LROT?.Normal
  //     ||formik1?.values?.Crom?.PROT?.Dec||formik1?.values?.Crom?.PROT?.Inc||formik1?.values?.Crom?.PROT?.Normal
  //     ||formik1?.values?.Crom?.RLB?.Dec||formik1?.values?.Crom?.RLB?.Inc||formik1?.values?.Crom?.RLB?.Normal
  //     ){

  //         let extDec=formik1?.values?.Crom?.EXT?.Dec?"EXT":""
  //         let extInc=formik1?.values?.Crom?.EXT?.Inc?"EXT":""
  //         let extNormal=formik1?.values?.Crom?.EXT?.Normal?"EXT":""
  //           let flxDec=(formik1?.values?.Crom?.FLX?.Dec?"FLX":"")
  //           let flxInc=(formik1?.values?.Crom?.FLX?.Inc?"FLX":"")
  //           let flxNormal=(formik1?.values?.Crom?.FLX?.Normal?"FLX":"")

  //           let llbDec=(formik1?.values?.Crom?.LLB?.Dec?"LLB":"")
  //           let llbInc=(formik1?.values?.Crom?.LLB?.Inc?"LLB":"")
  //            let llbNormal=(formik1?.values?.Crom?.LLB?.Normal?"LLB":"")
  //            let rlbDec=formik1?.values?.Crom?.RLB?.Dec?"RLB":""
  //            let rlbInc=formik1?.values?.Crom?.RLB?.Inc?"RLB":""
  //            let rlvNormal=formik1?.values?.Crom?.RLB?.Normal?"RLB":""

  //           let lrotDec=formik1?.values?.Crom?.LROT?.Dec?"LROT":""
  //           let lrotInc=formik1?.values?.Crom?.LROT?.Inc?"LROT":""
  //           let lrotNormal=formik1?.values?.Crom?.LROT?.Normal?"LROT":""
  //           let protDec=formik1?.values?.Crom?.PROT?.Dec?"PROT":""
  //           let protInc=formik1?.values?.Crom?.PROT?.Inc?"PROT":""
  //           let protNormal=formik1?.values?.Crom?.PROT?.Normal?"PROT":""

  //           let data=extDec.concat(extInc," ",extNormal," ",flxDec," ",flxInc," ",flxNormal)
  //           let dataOne=llbDec.concat(llbInc," ",llbNormal," ",rlbDec," ",rlbInc," ",rlvNormal)
  //           let dataTwo=lrotDec.concat(lrotInc,"",lrotNormal," ",protNormal," ",protInc," ",protDec)
  //           // " ",llbDec," ",llbInc," ",llbNormal," ",lrotDec," ",lrotInc," ",
  //           // lrotNormal," ",protDec," ",protNormal," ",protInc," ",rlbInc," ",rlbDec," ",rlvNormal)
  //           return [data,dataOne,dataTwo];

  // //   return true
  // }else{
  //   return false;
  // }
}

export const cromName=(formik1)=>{
    
}