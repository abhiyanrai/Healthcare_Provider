import { postApiWithoutToken, patchApi ,postApi ,getApi, getListApi, postImgApi, deleteApi, putApi, getPlanApi, patchApiWithoutToken, deletedApi, deletedApi2} from "./api-interface";
    

// Account owner api's 

/* Register APIs */
export const RegisterApi = (payload) => {
    return postApiWithoutToken("/user/auth/register", payload)
}

/* Register Verify Otp APIs */
export const verifyRegisterOtpApi = (payload) => {
    return postApiWithoutToken("/user/auth/verifyOtp", payload)
}

export const forgotPasswordApi=(payload)=>{
    return patchApiWithoutToken(`/user/forgotPassword`,payload);
}

/* Register Re-Send Otp APIs */
export const sendRegisterOtpApi = (payload) => {
    return postApiWithoutToken("/user/auth/sendOtp", payload) 
}

/* Login Send Otp APIs */
export const sendLoginOtpApi = (payload) => {
    return postApiWithoutToken("/user/auth/sendOtp", payload)
}


/* Login Verify Otp APIs */
export const verifyLoginOtpApi = (payload) => {
    return postApiWithoutToken("/user/auth/verifyOtp", payload)
}


/* Login Re-Send Otp APIs */
export const ResendLoginOtpApi = (payload) => {
    return postApiWithoutToken("/user/auth/sendOtp", payload) 
}


/* Fetch Current Owner Profile Api */
export const currentAccountOwnerProfileApi = () => {
    return getApi("/user/byAuth")
}

/* Change Password APIs */
export const changePasswordApi = (payload) => {
    return patchApi("/user/changePassword", payload)
  }

  /* Update Account Owner Profile APIs */
  export const updateAccountOwnerProfileApi = (payload) => {
    return patchApi("/user/update", payload)
  }


  export const imageProfileApi = (payload) => {
    return postImgApi("/common/uploads/file", payload)
  } 

export const postCsvApi =(payload)=>{
    return postImgApi("/common/uploads/csv-file",payload);
}

//   login with password api 

export const loginApi=(payload)=>{
    return postApiWithoutToken("/user/auth/loginOwner", payload);
}

// register owner api 

export const registerOwnerApi =(payload)=>{
    return postApiWithoutToken(`/user/auth/registerOwner`,payload);
}


export const loginHealthCareApi = (payload)=>{
    return postApiWithoutToken("/user/auth/loginProvider",payload);
}
/* Account Creation API for HealthCare Provider Save&SendPasswordGenerator */
export const saveandSendUserApiCreatedByOwner = (payload) => {
    return postApi("/user/auth/saveAndSendProvider", payload)
}

export const postVisitesdaetails = (payload) => {
    return postApi("/user/visitDetail/create", payload)
}
/* Account Creation API for HealthCare Provider Save Only */
export const saveUserApiCreatedByOwner = (payload) => {
    return postApi("/user/auth/registerProvider", payload)
}


export const getVisitByPatintIdApi =(id)=>{
    if(!id) return ;
    return getApi(`/user/visitDetail/all/byPatientId?id=${id}`);
}

/* Get Providers Account Details API's */
export const getProvidersDetails = (page="",limit="")  => {
    return getApi(`/user/provider/allProvider?page=${page}&limit=${limit}`)
}
// Get provider details by id 

export const getProviderByIdApi=(id)=>{
    if(!id) return ;
    return getApi(`/user/provider/byId?id=${id}`);
}

/* Update Provider Form Data API's by Id */
export const updateProviderDataById = (payload) => {
   return patchApi(`/user/provider/update`, payload)
}

/* Send Link Provder APi's */
export const sendLinkProviderApi = (payload) => {
    return postApi(`/user/auth/sendProvider`, payload)
 }


 /* Update Provider Profile APi's By ID */
 export const updateProviderProfileById = (payload) => {
    return patchApi(`/user/updateById`, payload)
 }



/* Create Patients Form Data Apis */
export const createPatientsByAccountOwner = (payload) => {
    return postApi("/user/patient/create", payload)
}

// Get dashboard details 

export const getDashboardDetailsApi = ()=>{
    return getApi(`/user/dashboard/all`);
}
/* Get All Patients Details API's Map Content */
export const getAllPatientsDetails = (data="",page="",limit="")  => {
    return getApi(`/user/patient/all?search=${data}&page=${page}&limit=${limit}`)
}

// export const getWithoutConsultDetails= (data="",page="",limit="")  => {
//     return getApi(`/user/patient/withoutConsultation?search=${data}&page=${page}&limit=${limit}`)
// }

export const getWithoutConsultDetails= (data="",page="",limit="")  => {
        return getApi(`/user/patient/newPatients?search=${data}&page=${page}&limit=${limit}`)
    }
/* get patient without consultation  */

export const getPatientWithoutConsult = (data="",page="",limit="")  => {
    return getApi(`/user/patient/withoutConsultation?search=${data}&page=${page}&limit=${limit}`)
}
/*get recent consultation API */

export const getRecentConsultaion = (data="",page="",limit="")  => {
    return getApi(`/user/consultation/recent?search=${data}&page=${page}&limit=${limit}`)
}

export const getRegularPatientApi =(data="",page="",limit="")=>{
    return getApi(`/user/patient/regularPatients?search=${data}&page=${page}&limit=${limit}`);
}
/* Get Patient Details By Id */
export const getSinglePatientDetailsById = (id) => {
    if(!id) return;
    return getApi(`/user/patient/byId?id=${id}`)
}

export const getListingApi=(id)=>{
    if(!id) return;
    return getApi(`/user/patient/allPatientData?id=${id}`);
}


 /* Update Single Patient Profile APi's By ID */
 export const updatePatientProfileById = (payload) => {
    return patchApi(`/user/patient/update`, payload)
 }

 
 export const updateFunctionalApi = (payload) => {
    return patchApi(`/user/examination/updateById`, payload)
 }


 export const getAllPatientsDetailsWithExamination = ()=>{
    return getApi(`/user/patient/withExamination`);
 }
/*create cosultation api */ 
export const createConsultationApi = (payload)=>{
    return postApi(`/user/consultation/create`,payload)
}
/*add symptom api */

export const addSymptomApi = (payload)=>{
    return postApi(`/user/consultation/addSymptoms`,payload)
}

/* get consultation api  */

export const getConsultationsApi = ()=>{
    return getApi(`/user/consultation/all`)
}

export const getConsultationById = (id)=>{
    if(!id) return ;
    return getApi(`/user/consultation/byId?id=${id}`)
}

/* get consultation by id api  */

export const getConsultationsApiById=(id)=>{
    if(!id) return;
    return getApi(`/user/consultation/byId?id=${id}`)
}

export const getConsultationsApiByPatientId=(id)=>{
    if(!id) return;
    return getApi(`/user/consultation/byPatientId?id=${id}`)
}
/* get symptom by id api */

export const getSymptomById=(id)=>{
    if(!id) return;
    return getApi(`/user/consultation/symptomById?id=${id}`)
}
/* update symptom api */
export const updateSymptom=(payload)=>{
    return patchApi(`/user/consultation/updateSymptom`,payload)
}


/* to get all dropdown list for consulation form*/

export const getSymptomsApi=()=>{
    return getListApi(`/json/symptoms/symptoms.json`)
} 

export const getHelpApi=()=>{
    return getListApi(`/json/help/help.json`)
}

export const getTherapistApi=()=>{
    return getListApi(`/json/therapist/therapist.json`)
}

export const getWarningsApi=()=>{
    return getListApi(`/json/warnings/warnings.json`)
}

export const getProvocativeApi=()=>{
    return getListApi(`/json/provocative/provocative.json`)
}
export const getPalliativeApi=()=>{
    return getListApi(`/json/palliative/palliative.json`)
}
export const getOnSetApi=()=>{
    return getListApi(`/json/onSet/onSet.json`)
}
export const getDescribeSymptomApi=()=>{
    return getListApi(`/json/describeSymp/describeSymp.json`)
}

export const getRadiatsApi=()=>{
    return getListApi(`/json/radiatesTo/radiatesTo.json`)
}


export const updateCategoryApi = (payload)=>{
    return patchApi(`/user/serviceCategory/update`,payload);
}

export const creatCategoryApi = (payload)=>{
    return postApi(`/user/serviceCategory/create`,payload)
}

export const deleteCategoryApi=(id)=>{
    if(!id) return ;
    return putApi(`/user/serviceCategory/delete`,id)
}

export const getCategoryByIdApi = (id)=>{
    if(!id) return ;
    return getApi(`/user/serviceCategory/byId?id=${id}`) 
}
/* room api's*/
export const createRoomApi=(payload)=>{
    return postApi(`/user/room/create`,payload);
}

export const updateRoomApi=(payload)=>{
    return patchApi(`/user/room/update`,payload);
}

export const getRoomsApi=()=>{
    return getApi(`/user/room/all`); 
}

export const deleteRoomApi=(payload)=>{
    return deleteApi(`/user/room/delete`,payload)
}

export const getRoomByIdApi=(id)=>{
    if(!id) return;
    return getApi(`/user/room//byId?id=${id}`);
}

/* service api's*/
export const createServiceApi=(payload)=>{
    return postApi(`/user/service/create`,payload);
}

export const getServiceApi =()=>{
    return getApi(`/user/service/all`);
}

export const deleteServiceApi=(payload)=>{
    return putApi(`/user/service/delete`,payload)
}

export const updateServiceApi =(payload)=>{
    return patchApi(`/user/service/update`,payload)
}

export const getServiceByIdApi=(id)=>{
    if(!id) return ; 
    return getApi(`/user/service/getById?id=${id}`);
}

export const createSlotApi=(payload)=>{
    return postApi(`/user/daysAvailability/create`,payload);
}

// export const getAllslotApi=()=>{
//     return getApi(`/user/daysAvailability/all`);
// }

export const updateSlotApi=(payload)=>{
    return patchApi(`/user/daysAvailability/update`,payload);
}

export const getDaysSlotApi =()=>{
    return getApi(`/user/availableSlots/all`);
}

export const functionalFromApi = (payload)=>{
    return postApi(`/user/examination/create`,payload);
}

export const getReportByIdApi=(id)=>{
    if(!id) return ; 
    return getApi(`/user/examination/byId?id=${id}`)
}

export const getSlotByDateApi = (payload)=>{
    return postApi(`/user/availableSlots/getSlotByDate`,payload)
}

export const postSlotApiData=(payload)=>{
    return postApi(`/user/appointment/create`,payload);
}

export const updateSlotApiData =(payload)=>{
    return patchApi(`/user/appointment/update`,payload)
}

export const deleteSlotApiData=(payload)=>{
    return patchApi(`/user/appointment/cancel`,payload);
}

export const deleteSlotApiDatas=(payload)=>{
    return patchApi(`/user/appointment/delete`,payload);
}

export const getAllSlotsApiData =()=>{
    return getApi(`/user/availableSlots/all`);
}

export const getAallBookedslotApi=(day,to, from)=>{
    return getApi(`/user/availableSlots/allBooked?day=${day}&dateStart=${to}&dateEnd=${from}`);
}

export const getFilterDataApi =(to ,from)=>{
    return getApi(`/user/availableSlots/all?dateStart=${to}&dateEnd=${from}`);
}

export const deleteSlotApi =(id)=>{
    if(!id) return ;
    return patchApi(`/user/availableSlots/delete`,{id});
}


// get examination list by patient Id

export const getExaminationListById =(id)=>{
    if(!id) return ;
    return getApi(`/user/examination/allByConsultationId?consultationId=${id}`);
}

export const getExamTestApi =(id)=>{
    if(!id) return ; 
    return getApi(`/user/examination/byConsultationId?id=${id}`);
}


export const getAllAppontmentsApi =(startDate="",endDate="",page="",limit="")=>{
    return getApi(`/user/appointment/all?startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}`);
    
}

export const getAppointmentByIdApi=(id)=>{
    if(!id) return ;
    return getApi(`/user/appointment/byId?id=${id}`);
}

export const getAllOptionsApi = ()=>{
    return getApi(`/user/dropdown/model/all`)
}

export const addDataIntoOptionApi = (payload)=>{
    return postApi(`/user/dropdown/option/create`,payload);
}

export const getOptionListApiById =(id)=>{
    if(!id) return ;
    return getApi(`/user/dropdown/option/all/bymodelId?id=${id}`)
}

export const getVisitDetailsApiById = (id)=>{
    if(!id) return ;
    return getApi(`/user/visitDetail/allByExaminationId?id=${id}`);
}

export const getAppointmentByPatientIdApi=(id)=>{
    if(!id) return ;
    return getApi(`/user/appointment/allByPatientId?id=${id}`);
}

export const getTodayAppointmentApi =(date)=>{
    return getApi(`/user/appointment/all?startDate=${date}`)
}

export const getCategoriesApi =()=>{
    return getApi(`/user/serviceCategory/all`);
}

export const trackPatientApi=(id)=>{
    if(!id) return ;
    return getApi(`/user/appointment/trackPatient?id=${id}`);
}

// Billing api's

export const createBillApi = (payload)=>{
    return postApi(`/user/patient/billing/create`,payload);
}

export const getBillingListApi =(id)=>{
    if(!id) return;
    return getApi(`/user/patient/billing/all/byPatientId?id=${id}`);
}

export const getBillInfoByIdApi =(id)=>{
    if(!id) return ;
    return getApi(`/user/patient/billing/byId?id=${id}`);
}


export const getSingleVisitApi=(id)=>{
    if(!id) return ;
    return getApi(`/user/visitDetail/byId?id=${id}`);
}

// plan api start here 

export const getCurrentPlanApi =(id)=>{
    if(!id) return ;
    return getApi(`/admin/userSubscription/byUserId/${id}`);
}

export const getProductDetailApi =()=>{
    return getApi(`/common/plan/all`);
}


// payment api 

export const paymentApi = (payload)=>{
    return postApi(`/common/stripe/subscription`,payload);
}

export const getTransctionApi = ()=>{
    return getApi(`/user/transaction/all`);
}


export const checkBillingApi =(id)=>{
    if(!id) return ;
    return getApi(`/user/patient/billing/checkBilling?id=${id}`);
}
//pdf download api

export const getPdfDownloadApi =(id)=>{
    if(!id) return ; 
    return getApi(`/common/pdf/patient/billing?id=${id}`);
}

export const sendEmailApi=(id,email)=>{
    return getApi(`/common/pdf/patient/billing?id=${id}&email=${email}`)
}

export const getFormatApi=()=>{
    return getApi(`/common/download/csv-format`);
}

export const createScheduleApi =(payload)=>{
    return postApi(`/user/clinicSchedule/createAndUpdate`,payload);
}

export const getScheduleDetailsApi =()=>{
    return getApi(`/user/clinicSchedule/getByAccountOwner`);
}


export const deleteOptionApi =(payload)=>{
    return putApi(`/user/dropdown/option/delete`,payload)
}

export const updateOptionApi =(payload)=>{
    return patchApi(`/user/dropdown/option/update`,payload);
}

export const deleteProviderApi =(payload)=>{
    return patchApi(`/user/provider/deleteProvider`,payload);
}

export const deleteHolidayApi =(id)=>{
    return deletedApi(`/user/clinicSchedule/holidays/${id}`);
}

export const addWalletAmountApi =(payload)=>{
    return postApi(`/user/wallet/createAndUpdate`,payload);
}

export const getWalletDetailsByIdApi = (id)=>{
    if(!id) return ; 
    return getApi(`/user/wallet/getWalletByPatientId?id=${id}`)
}

export const getDiscountedDataApi  =(payload)=>{
    return postApi(`/user/patient/billing/payableAmount`,payload);
}

export const generateInvoiceNumberApi =(payload)=>{
    return postApi(`/user/set-invoice-number`,payload);
}

export const addClinicDetailsApi  =(payload)=>{
    return postApi(`/user/createAndUpdateClinicProfile`,payload);
}
export const getClnicDetailsApi =()=>{
    return getApi(`/user/getClinicDetailsById`);
}

export const getBankDetailsApi =()=>{
    return getApi(`/user/getBankDetailsById`);
}

export const addBankDetailsApi =(payload)=>{
    return postApi(`/user/createAndUpdateBankDetails`,payload);
}