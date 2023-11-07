import { postApiWithoutToken, patchApi ,postApi ,getApi, getListApi, postImgApi, deleteApi, putApi, getPlanApi} from "./api-interface";
    

// Account owner api's 

/* Register APIs */
export const RegisterApi = (payload) => {
    return postApiWithoutToken("/user/auth/register", payload)
}

/* Register Verify Otp APIs */
export const verifyRegisterOtpApi = (payload) => {
    return postApiWithoutToken("/user/auth/verifyOtp", payload)
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
    return postApi("/user/provider/visitDetail/create", payload)
}
/* Account Creation API for HealthCare Provider Save Only */
export const saveUserApiCreatedByOwner = (payload) => {
    return postApi("/user/auth/registerProvider", payload)
}


/* Get Providers Account Details API's */
export const getProvidersDetails = ()  => {
    return getApi("/user/provider/allProvider")
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
    return postApi("/user/provider/createPatient", payload)
}

// Get dashboard details 

export const getDashboardDetailsApi = ()=>{
    return getApi(`/user/dashboard/all`);
}
/* Get All Patients Details API's Map Content */
export const getAllPatientsDetails = (data="",page="",limit="")  => {
    return getApi(`/user/provider/patient/all?search=${data}&page=${page}&limit=${limit}`)
}

export const getWithoutConsultDetails= (data="",page="",limit="")  => {
    return getApi(`/user/provider/patient/withoutConsultation?search=${data}&page=${page}&limit=${limit}`)
}
/* get patient without consultation  */

export const getPatientWithoutConsult = (data="",page="",limit="")  => {
    return getApi(`/user/provider/patient/withoutConsultation?search=${data}&page=${page}&limit=${limit}`)
}
/*get recent consultation API */

export const getRecentConsultaion = (data="")  => {
    return getApi(`/user/consultation/recent?search=${data}`)
}

/* Get Patient Details By Id */
export const getSinglePatientDetailsById = (id) => {
    if(!id) return;
    return getApi(`/user/provider/patient/byId?id=${id}`)
}

export const getListingApi=(id)=>{
    if(!id) return;
    return getApi(`/user/patient/allPatientData?id=${id}`);
}


 /* Update Single Patient Profile APi's By ID */
 export const updatePatientProfileById = (payload) => {
    return patchApi(`/user/provider/patient/update`, payload)
 }

 
 export const updateFunctionalApi = (payload) => {
    return patchApi(`/user/provider/examination/updateById`, payload)
 }

/*create cosultation api */ 
export const createConsultationApi = (payload)=>{
    return postApi(`/user/provider/createConsultation`,payload)
}
/*add symptom api */

export const addSymptomApi = (payload)=>{
    return postApi(`/user/provider/consultation/addSymptoms`,payload)
}

/* get consultation api  */

export const getConsultationsApi = ()=>{
    return getApi(`/user/provider/consultation/all`)
}

/* get consultation by id api  */

export const getConsultationsApiById=(id)=>{
    if(!id) return;
    return getApi(`/user/provider/consultation/byId?id=${id}`)
}

export const getConsultationsApiByPatientId=(id)=>{
    if(!id) return;
    return getApi(`/user/consultation/byPatientId?id=${id}`)
}
/* get symptom by id api */

export const getSymptomById=(id)=>{
    if(!id) return;
    return getApi(`/user/provider/consultation/symptomById?id=${id}`)
}
/* update symptom api */
export const updateSymptom=(payload)=>{
    return patchApi(`/user/provider/consultation/updateSymptom`,payload)
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
    return getApi(`/user/provider/room/all`); 
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
    return getApi(`/user/provider/service/all`);
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
    return postApi(`/user/provider/createExamination`,payload);
}

export const getReportByIdApi=(id)=>{
    if(!id) return ; 
    return getApi(`/user/provider/examination/byId?id=${id}`)
}

export const getSlotByDateApi = (payload)=>{
    return postApi(`/user/availableSlots/getSlotByDate`,payload)
}

export const postSlotApiData=(payload)=>{
    return postApi(`/user/provider/createAppointment`,payload);
}

export const updateSlotApiData =(payload)=>{
    return patchApi(`/user/provider/appointment/update`,payload)
}

export const deleteSlotApiData=(payload)=>{
    return patchApi(`/user/provider/appointment/delete`,payload);
}

export const getAllSlotsApiData =()=>{
    return getApi(`/user/availableSlots/all`)
}

export const getAallBookedslotApi=(day,to, from)=>{
    return getApi(`/user/availableSlots/allBooked?day=${day}&dateStart=${to}&dateEnd=${from}`)
}

export const getFilterDataApi =(to ,from)=>{
    return getApi(`/user/availableSlots/all?dateStart=${to}&dateEnd=${from}`);
}

export const deleteSlotApi =(id)=>{
    if(!id) return ;
    return patchApi(`/user/availableSlots/delete`,{id});
}

export const getRegularPatientApi =(data="",page="",limit="")=>{
    return getApi(`/user/provider/regularPatients?search=${data}&page=${page}&limit=${limit}`);
}
export const trackPatientApi=(id)=>{
    if(!id) return ;
    return getApi(`/user/appointment/trackPatient?id=${id}`);
}
// get examination list by patient Id

export const getExaminationListById =(id)=>{
    if(!id) return ;
    return getApi(`/user/examination/allByConsultationId?consultationId=${id}`);
}


export const getAllAppontmentsApi =(startDate="",endDate="",page="",limit="")=>{
    return getApi(`/user/provider/appointment/all?startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}`);
}

export const getAppointmentByIdApi=(id)=>{
    if(!id) return ;
    return getApi(`/user/provider/appointment/byId?id=${id}`);
}

export const getAllOptionsApi = ()=>{
    return getApi(`/user/dropdown/model/all`)
}

export const addDataIntoOptionApi = (payload)=>{
    return postApi(`/user/dropdown/option/create`,payload);
}

export const getOptionListApiById =(id)=>{
    if(!id) return ;
    return getApi(`/user/provider/options/byModelId?id=${id}`)
}

export const getVisitDetailsApiById = (id)=>{
    if(!id) return ;
    return getApi(`/user/visitDetail/allByExaminationId?id=${id}`);
}

export const getAppointmentByPatientIdApi=(id)=>{
    if(!id) return ;
    return getApi(`/user/provider/appointment/allByPatientId?id=${id}`);
}

export const getTodayAppointmentApi =(date)=>{
    return getApi(`/user/appointment/all?startDate=${date}`)
}

export const getCategoriesApi =()=>{
    return getApi(`/user/serviceCategory/all`);
}

export const getScheduleDetailsApi = ()=>{
    return getApi(`/user/provider/getScheduleDetails`)
}
// Billing api's

export const createBillApi = (payload)=>{
    return postApi(`/user/provider/billing/create`,payload);
}

export const getBillingListApi =(id)=>{
    if(!id) return;
    return getApi(`/user/provider/billing/all/byPatientId?id=${id}`);
}

export const getBillInfoByIdApi =(id)=>{
    if(!id) return ;
    return getApi(`/user/provider/billing/byId?id=${id}`);
}


export const getSingleVisitApi=(id)=>{
    if(!id) return ;
    return getApi(`/user/provider/visitDetail/byId?id=${id}`);
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

// Healthcare provider api's 

export const postDiagnoseOption =(payload)=>{
    return postImgApi("/common/uploads/csv-diagnoses",payload);
}

