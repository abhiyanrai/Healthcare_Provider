import React, { useState } from "react";
import { useFormik } from "formik";
import { durations } from "./data";
import { InputErrorMessage } from "../../Components/common/Errors";
import { serviceSchema } from "../../Components/Schemas";
import toast from "react-hot-toast";
import {
  createServiceApi,
  getServiceByIdApi,
  updateServiceApi,
} from "../../Apis";
import { useEffect } from "react";
import { Fade, ToastContainer } from "react-bootstrap";
import { WhiteLoader } from "../../Components/common/Errors/loader/WhiteLoader";
const ServiceModal = (props) => {
  const [render, setRender] = useState(true);
  const [isDis, setIsDis] = useState(false);
  const [isValid,setIsValid]=useState(true);
  const [isClicked,setIsClicked] = useState(false);
  const { category, modal, getData, setFunctions, id , allService } = props;
  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleSubmit,
    handleChange,
    resetForm,
    setValues,
  } = useFormik({
    initialValues: {
      serviceName: "",
      serviceDescp: "",
      amount: 0,
      categoryId: "",
      // subService:[{
      //   service:"",
      //   amount:"",
      //   tax:[{name:"",value:0}]
      // }],
      subService:[]
      // text: [{ value: 0, name: "" }],
    },
    validationSchema: serviceSchema,
    onSubmit: async (val) => {
      console.log(val,"valuluueueueu")
      try {
        setIsDis(true);
        if (id) {
          let data = {
            id: id,
            amount:Number(val.amount?.split(".")?.join("")?.split(",")?.join(".")),
            ...val,
            // duration:val.duration
          };
          const response = await updateServiceApi(data);
          if (response.status === 200 || response.status === 201) {
            toast.success(response?.data?.message);
            modal.click();
            getData();
            setFunctions("");
            setIsDis(false);
          }
        } else {
          let newData = {
            // amount: val?.amount?.toString()?.split(",")?.join("")?.split(".")[0],
            amount: Number(val?.amount?.toString()?.split(".")?.join("")?.split(",")?.join(".")),
            serviceName: val?.serviceName,
            serviceDescp: val?.serviceDescp,
            categoryId: val?.categoryId,
            subService: val?.subService,
          };
          console.log(newData , "newDataaaa")
          const response = await createServiceApi(newData);
          if (response.status === 201 || response.status === 200) {
            toast.success(response?.data?.message);
            modal.click();
            setFieldValue("text", [{ value: 0, name: "" }]);
            resetForm();
            getData();
            setIsDis(false);
          }
        }
      } catch (err) {
        console.log(err,"EEKKDD")
        toast.error("Invalid");
        setIsDis(false);
      }
    },
  });

  console.log(allService,"IUEYUEUEYUE")
  const handleTax = (e, i, name,index) => {
    setFieldValue(`subService.${index}.tax.${i}.${name}`, e.target.value);
    // getPercent(values?.subService?.[index])
  };

  const handleTaxCount = (key) => {
    if(key === true){
      setFieldValue("amount",0)
    }
    setIsClicked(true);
    setFieldValue("subService", [...values.subService, { subServiceName: "", amount: 0 , tax:[{name:"",value:0}] }]);
  };
  const handleInnerTaxCount =(index,i)=>{
    setFieldValue(`subService.${index}.tax`,[...values.subService[index].tax,[{name:"",value:0}]])
  }

  // const handleRemoveTax = (index ,i) => {
  //   if (values.subService[index].tax?.length <= 1) {
  //     setFieldValue(`values.subService.${index}.tax`, [{ value: 0, name: "" }]);
  //   }else{
  //     values.subService[index].tax.splice(i, 1);
  //     setRender(!render);
  //   }
   
  // };
  const handleRemoveTax = (index,i)=>{
      values.subService?.splice(index,1)
      setRender(!render)
  }

  const handleSubAmountChange = (e , name)=>{
    setFieldValue(name , e.target.value);
  //  let d = values.amount
    // console.log(values.amount,e.target.value ,"IOIIII")
    // setFieldValue("amount",0)
    // setFieldValue('amount', parseInt(parseInt(d) + parseInt(e.target.value)));
    // console.log(values.)
    // getSortedValue(e.target.value)
    // getTotalAmount();
  }

  // const getSortedValue=(val)=>{
  //   let d = values?.subService?.map((v)=>{
  //     return getPercent(v,val)
  //   })
  // }
  // const getPercent =(v,val)=>{
  //   console.log(v,"dkkkalk")
  //   let a = v?.tax?.map(v=> v.value);
  //   // console.log(a,"ARRURURUUR")
  //   const sum = a?.reduce((accumulator, currentValue) => {
  //     const currentValueAsNumber = parseInt(currentValue); 
  //     if (!isNaN(currentValueAsNumber)) {
  //       return accumulator + currentValueAsNumber;
  //     } else {
  //       return accumulator; 
  //     }
  //   }, 0);

  //   let per = (parseInt(val) * sum ) / 100 ;
  //   console.log(per,"pericceei")

  // }
  const handleAmountChange = (e) => {
    // let val = e.target.value?.split(",")?.join("")
    if (e.target.value < 0) {
      setFieldValue("amount", 0);
    } else {
      setFieldValue("amount", e.target.value);
    }
  };
  const handleClose = () => {
    setFunctions("");
    resetForm();
    setIsValid(true);
    setIsClicked(false)
  };
  const handleSelectChange = (e) => {
    setFieldValue("categoryId", e.target.value);
  };
  const getServiceById = async (id) => {
    try {
      const response = await getServiceByIdApi(id);
      if (response.status === 200 || response.status === 201) {
        setValues({
          serviceName: response?.data?.service?.serviceName,
          serviceDescp: response?.data?.service?.serviceDescp,
          amount: response?.data?.service?.amount,
          categoryId: response?.data?.service?.categoryId,
          text: response?.data?.service?.text,
        });
      }
    } catch (err) {
      toast.error("Not found");
    }
  };

 
  // const getTotalAmountWithTax =(data)=>{
  //   console.log(data ,"dataaaaaaddddf")
  //   // let p = data?.map((v)=>{
  //   //    let m = v.tax?.map((v)=>v.value);
  //   //    return m
  //   // }).flat()?.map(str => parseInt(str, 10))?.reduce((acc, curr) => acc + curr, 0)

  //   let p = data?.map((v)=>{
  //     let m = v.tax?.map((v)=>v.value);
  //     let totalTax = m?.map(str => parseInt(str, 10))?.reduce((acc, curr) => acc + curr, 0)
  //     let am = v?.amount * totalTax / 100
  //     console.log(am,"totollk")
  //     return am
  //     // setFieldValue("amount", parseInt(values?.amount)+ am )
  //  })
  //  let [invalue] = p;
  // //  setFieldValue("amount", invalue)
  //  console.log(invalue,"LLLLLLLLLLLL")
  // }

  const getTotalAmountWithTax = (data)=>{
 
      let totalAmount = 0;
    if(data?.length > 0) {
     for(let i = 0; i < data?.length; i++) {
      console.log(data?.[i]?.amount,"innererr")
         let taxAdded = 0;
         let totalAmountWithTax;
         if(data?.[i]?.tax && data?.[i]?.amount) {
             taxAdded = data?.[i]?.tax?.reduce((acc, taxService) => {
                         return parseInt(parseInt(acc) + parseInt(taxService.value))
                        }, 0)
         const taxPercentage = taxAdded / 100;
         const taxValue = data?.[i]?.amount* taxPercentage;
         totalAmountWithTax = parseInt(parseInt(data?.[i]?.amount) + parseInt(taxValue));
         }
       totalAmount = parseInt(parseInt(totalAmount) + parseInt(totalAmountWithTax));
     }
    } else {
      // totalAmount = amount;
      totalAmount = 0 ;
    }
    return totalAmount
    
    
  }

  // console.log(values.subService,"subserviceformik")
  // let data = getTotalAmountWithTax(values?.subService);
  // console.log(data,"dataaaaa")
  // const getTotalAmount = () =>{
  //   let d = values?.subService?.map(v=>v?.amount)
  //   // console.log(values.subService,"suggu" ,d)
  //   const sum = d?.reduce((accumulator, currentValue) => {
  //     const currentValueAsNumber = parseInt(currentValue); 
  //     if (!isNaN(currentValueAsNumber)) {
  //       return accumulator + currentValueAsNumber;
  //     } else {
  //       return accumulator; 
  //     }
  //   }, "");
  //   setFieldValue("amount",sum)
  //   console.log(sum , "totalsum")
  // }

  // useEffect(()=>{
  //     getTotalAmount();
  // },[])

  useEffect(() => {
    if (id) {
      getServiceById(id);
    }
  }, [id]);
  // useEffect(()=>{
  //   if(!values.subService?.length){
  //     setIsValid(true);
  //     setIsClicked(false)
  //   }
  // },[values?.subService])

  useEffect(()=>{
      if(values.serviceName && values.categoryId){
        setIsValid(false);
      }else{
        setIsValid(true)
      }
  },[values.serviceName , values.categoryId])
  return (
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="modal-header pt-3 pe-3">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
         {
          !values.subService?.length &&  <div className="d-flex mt-3 justify-content-end">
          <button
            className="btn btn-primary btn-sm ms-3"
            type="button" disabled={isValid} onClick={()=>handleTaxCount(true)}
          >
            <span>
              <i className="bi bi-plus-square-dotted me-2"></i>Add Sub service
            </span>
          </button>
        </div>
         }
            <div className="row">
              <div className="col-lg-12">
                <label htmlFor="serviceName" className="form-label">
                  Service Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  disabled={Boolean(values.subService.length)}
                  name="serviceName"
                  id="serviceName"
                  onChange={handleChange}
                  value={values.serviceName}
                  placeholder=""
                />
                <InputErrorMessage
                  error={touched.serviceName && errors.serviceName}
                  marginBottom={5}
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="amount" className="form-label">
                  Amount (<i class="bi bi-currency-euro"></i>)
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="amount"
                  disabled={Boolean(values.subService.length)}
                  id="amount"
                  min="0"
                  // onKeyPress={(event) => {
                  //   if (!/[0-9]/.test(event.key)) {
                  //     event.preventDefault();
                  //   }
                  // }}
                  onChange={handleAmountChange}
                  value={ isClicked ? isNaN(getTotalAmountWithTax(values?.subService))  ? 0 : getTotalAmountWithTax(values?.subService) : values.amount}
                  placeholder="Enter amount"
                />
                {/* <InputErrorMessage
                  error={touched.amount && errors.amount}
                  marginBottom={5}
                /> */}
              </div>
{
  console.log(values.amount ,"amouuuonntt", getTotalAmountWithTax(values.subService))
}
              <div className="col-lg-6">
                <label htmlFor="room" className="form-label">
                  Select Category
                </label>
                <select
                  className="form-select"
                  name="categoryId"
                  value={values.categoryId}
                  disabled={Boolean(values.subService.length)}
                  onChange={handleSelectChange}
                  id="room"
                >
                  <option hidden>Select</option>
                  {console.log(category)}
                  {category?.length &&
                    category?.map((val) => {
                      return <option value={val._id}>{val.name}</option>;
                    })}
                </select>
                <InputErrorMessage
                  error={touched.categoryId && errors.categoryId}
                  marginBottom={5}
                />
              </div>
              {console.log(values, "sdafkjlsdfa")}
             
            
              <div className="col-lg-12 mt-2">
                <label htmlFor="serviceDescp" className="form-label">
                  Description
                </label>

                <textarea
                  className="form-control"
                  name="serviceDescp"
                  id="serviceDescp"
                  disabled={Boolean(values.subService.length)}
                  onChange={handleChange}
                  value={values.serviceDescp}
                  placeholder="Enter description"
                  cols="50"
                  rows="2"
                ></textarea>
              </div>
             
              
             
                {
                  values?.subService?.map((v,index)=>{
                    return(
                      <div className="mt-3 border">
                      <div className="row ">
                      <div className="col-lg-6">
                        <label htmlFor="serviceName" className="form-label">
                          Service Name
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name={`subService.${index}.subServiceName`}
                          id="service"
                          onChange={handleChange}
                          value={values?.subService?.[index]?.subServiceName}
                          placeholder=""
                        />
                        {/* <InputErrorMessage
                          error={touched.serviceName && errors.serviceName}
                          marginBottom={5}
                        /> */}
                      </div>
                      <div className="col-lg-6">
                        <label htmlFor="serviceName" className="form-label">
                          Amount
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name={`subService.${index}.amount`}
                          id="amount"
                          onChange={(e)=>handleSubAmountChange(e,`subService.${index}.amount`)}
                          value={values?.subService?.[index]?.amount}
                          placeholder=""
                        />
                        {/* <InputErrorMessage
                          error={touched.serviceName && errors.serviceName}
                          marginBottom={5}
                        /> */}
                      </div>
                      {v?.tax?.map((v, i) => {
                    return (
                      <>
                        <div className="col-lg-5">
                          <label htmlFor="amount" className="form-label">
                            Tax Name
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name={`${v?.tax?.[i]?.name}`}
                            id="amount"
                            min="0"
                            onChange={(e) => handleTax(e, i, "name",index)}
                            // onChange={handleAmountChange}
                            value={v?.tax?.[i]?.name}
                            placeholder="Enter tax name"
                          />
                        </div>
    
                        <div className="col-lg-5">
                          <label htmlFor="room" className="form-label">
                            In Percentage
                          </label>
                          <input
                            type="text"
                            onKeyPress={(event) => {
                              if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            defaultValue={0}
                            name={`${v?.tax?.[i]?.value}`}
                            value={v?.tax?.[i]?.value}
                            onChange={(e) => handleTax(e, i, "value" , index)}
                            className="form-control"
                            placeholder="Enter percentage"
                          />
                          <InputErrorMessage
                          // error={touched.categoryId && errors.categoryId}
                          // marginBottom={-15}
                          />
                        </div>
                        {/* <div className="col-lg-1 d-flex align-items-center justify-content-center mt-2 p-1">
                          <button
                            title="remove"
                            className=" btn-neutral rounded-1"
                            type="button"
                            onClick={() => handleInnerTaxCount(index,i)}
                          >
                            {" "}
                            <i className="bi bi-plus-circle"></i>
                          </button>
                        </div> */}
                        <div className="col-lg-2 d-flex align-items-center justify-content-center mt-2 p-1">
                          <button
                            title="remove"
                            className=" btn-neutral rounded-1"
                            type="button"
                            onClick={() => handleRemoveTax(index,i)}
                          >
                            {" "}
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </>
                    );
                  })}
                     
                  </div>
                  
              </div>
              
                    )
                  })
                }
                {
                  Boolean(values?.subService?.length) &&  <button className="my-2 mt-3 fw-bold"  title="add" type="button" onClick={()=>handleTaxCount(false)}>
                  <i className="bi bi-plus-square-dotted me-2"></i>Add more 
                    </button>
                }

             
            </div>
          </div>

          <div className="modal-footer justify-content-end">
            <button
              disabled={isDis}
              type="submit"
              className="btn btn-sm btn-primary"
            >
              {isDis ? <WhiteLoader /> : "Save"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ServiceModal;
