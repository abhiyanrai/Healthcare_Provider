const clinicSchedule = require("../model/clinicSchedule");

module.exports = {

  user: {
    existed: "User already registered",
    notExisted: "User does not exists",
    hcpRole: "User must be a Healthcare provider!",
    ownerRole: "User must be a Account Owner!",
    adminRole: "User must be a Super Admin!",
    clinicId: "clinicId not found",
    invoiceStartingNumber: "invoiceNumber not found",
  },

  clinicDetails: {
   create: "Clinic registered successfully",
   update: "Clinic updated successfully",
   notFound: "Clinic not found",
   getById: "Clinic details get successfully"
  },

  bankDetails: {
    create: "Bank registered successfully",
    update: "bank updated successfully",
    notFound: "Bank not found",
    getById: "Bank details get successfully"
  },

  owner: {
    byId: "Owner byId get successfully!"
  },

  otp: {
    invalid: "Invalid Otp",
  },

  password: {
    invalid: "Invalid password",
  },

  provider: {
    notFound: "User does not exists",
    delete: "Provider deleted successfully"
  },

  patient: {
    registered: "Patient registered successfully",
    notExisted: "Patient does not exists",
    all: "all Patients",
    byId: "Patient by Id",
    update: "Patient updated successfully",
    without: "Without Consultation",
    allData: "Patient all data get successfully!",
    notFound: "Patient not found!",
    withExamination: "Patients with Examination",
    newPatients: "All new patients get successfully",
    regularPatients: "All regular patients get successfully"
  },

  consultation: {
    registered: "Consultation registered successfully",
    notExisted: "Consultation does not exists",
    all: "all Consultations",
    recent: "Recent Consultations",
    byId: "Consultation by Id",
    update: "Consultation updated successfully"
  },

  symptom: {
    registered: "Symptom registered successfully",
    notExisted: "Symptom does not exists",
    all: "all Symptoms",
    byId: "Symptom by Id",
    update: "Symptom updated successfully",
    added: "Symptom added successfully",
    symptomById: "Symptom get By Id Succesfully"
  },

  plan: {
    registered: "Plan registered successfully",
    notExisted: "Plan does not exists",
    all: "all Plans",
    byId: "Plan by Id",
    update: "Plan updated successfully",
    updatePrice: "Plan's price updated successfully"
  },
  wallet:{
    notExisted: "Wallet not existed",
    existed: "Wallet already created",
    create: "Wallet created successfully",
    update: "Wallet updated successfully",
    notFound: "Wallet not found",
    byId: "Wallet get sucessfully",
    insufficientFunds: "Insufficient funds"
  },

  room: {
    created: "Room created successfully",
    accountOwner: "Only account owner can create rooms",
    all: "all Rooms",
    update: "Room update successfully",
    delete: "Room deleted successfully",
    byId: "Room by Id"
  },

  service: {
    registered: "Service registered successfully",
    accountOwner: "Only account owner can create service",
    all: "all Services",
    categoryId: "CategoryId is required",
    notFound: "Category not found",
    update: "Service updated sucessfully",
    delete: "Services deleted sucessfully",
    getById: "Service by Id"
  },

  slot: {
    registered: "Schedule created successfully",
    accountOwner: "Only account owner can create slots",
    alreadyExist: "This document is already exists",
    delete: "Day Slot deleted successfully",
    update: "Slot updated sucessfully",
    dataNotFound: "No Slots Found",
    notMatched: "Slot By Id not found",
    byDate: "Date not found!",
    all: "all Slots"
  },

  availableSlot: {
    slotCreated: "Slots created Successfully",
    allSlots: "All Slots",
    delete: "Slot deleted sucessfully",
    slotByDate: "Get slot by date",
    booked: "Slot booked successfully",
  },

  examination: {
    allExamination: "All Examination by Patiend Id",
    notFound: "Examination not found",
    created: "Examination Created Successfully",
    update: "Examination by Id updated Successfully",
    byId: "Examination by Id",
    badRequestError: "Consultation Id doesn't exist",
    examinationExist: "Oops Examination already exist with this consultation!"
  },

  visitDetail: {
    create: "Visit Detail created successfully",
    update: "Visit by Id updated successfully",
    all: "all visit by patient Id",
    byId: "Visit get by Id successfully",
    badRequestError: "Examination doesn't exist!",
    improved: "Improved",
    worse: "Worse",
    noChange: "No Change",
    notFound: {
      appointment: "Oops! appointment not found",
      exam: "Oops! examination not found",
      patient: "Oops! patient not found"
    }
  },

  appointment: {
    create: "Appointment created successfully",
    update: "Appointment updated successfully",
    all: "all appointment get successfully",
    byId: "Appointment get by Id successfully",
    delete: "Appointment deleted successfully",
    byPatientId: "Appointment all by Patient Id"
  },

  dropdownModel: {
    create: "Drop-down key created successfully",
    all: "All drop-down model"
  },

  dropdownOptions: {
    create: "Drop-down option created successfully",
    all: "All options model by Id",
    update: "option updated successfully",
    delete: "option deleted successfully",
  },

  userSubscription: {
    create: "User Subscription created successfully",
    byId: "User Subscription by Id",
    byUserId: "User Subscription by userId",
    currentByUserId: "User's current Subscription by userId",
    all: "All User's Subscription"
  },

  notFoundError: {
    user: "User does not exist",
  },
  serviceCategory: {
    accountOwner: "Only account owner can create service",
    registered: "Category registered successfully",
    all: "All category get successfully",
    update: "Category updated successfully",
    delete: "Category deleted sucessfully",
    byId: "Category get by Id successfully",
  },

  patientBilling: {
    created: "Billing created successfully!",
    update: "Billing updated succesfully!",
    delete: "Billing deleted successfully!",
    all: "All Billing get succesfully",
    byId: "Billing data byId get successfully",
    notFound: "Patient not found",
    billNotFound: "Bill not found"
  },

  exportsPdf: {
    notFound: "Oops no billing data found with this id!"
  },

  clinicSchedule: {
    owner: "Only account owner can create schedule",
    create: "Schedule created successfully",
    all: "All Schedule get successfully",
    get: "Schedule by Account Owner",
    exist: "You can create your schedule at once",
    notExisted: "Schedule with this Account Owner doesn't exist",
    update: "Schedule updated successfully",
    existed: "Schedule already created!",
  },

  uploadsFile: {
    format: "Please upload correct format"
  },

  
  invoiceNumber: {
    wrongInput: 'Invalid input data',
    notFound: 'User not found',
    restrict: 'Only account owners can set invoice number',
    wrongFormat: 'Invalid invoice number format',
    exceeds: 'Invoice number exceeds six digits',
    sucess: 'Invoice number added successfully'
  }

}
