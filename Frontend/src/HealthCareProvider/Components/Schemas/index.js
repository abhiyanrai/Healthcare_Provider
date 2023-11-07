import { yupToFormErrors } from "formik";
import * as Yup from "yup";

const digitsOnly = (value) => /^\d+$/.test(value);

export const signUpSchema = Yup.object({
    salutation: Yup.string().required("Select Salutation"),
    firstName: Yup.string().max(15).required("First Name is required").matches(/^[aA-zZ\s]*$/, "Only alphabets are allowed for this field ").trim('This field cannot include leading and trailing spaces'),
    // .trim('First Name cannot include leading and trailing spaces')
    // .strict(true),
    lastName: Yup.string().max(15).required("Last Name is required").matches(/^[aA-zZ\s]*$/, "Only alphabets are allowed for this field ").trim('This field cannot include leading and trailing spaces')
    // .trim('Last Name cannot include leading and trailing spaces')
    .strict(true),
    email: Yup.string().email("Please enter valid email address")
    // .trim('The Email cannot include leading and trailing spaces')
    // .strict(true)
    .required("Please enter your email"),
    password:Yup.string().required("Please enter password"),
    confirmPassword:Yup.string().required("Please enter confirm password"),
})


export const loginSchema = Yup.object({
    email: Yup.string().email("Please enter valid email address")
    .required("Email is required")
    .trim('The Email cannot include leading and trailing spaces')
    .strict(true),
    password:Yup.string().required("Please enter password"),
})

export const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().min(6).required("Old Password is required"),
  newPassword: Yup.string().min(6).required("New Password is required"),
  confirmPassword: Yup.string().required("Confirm New Password is required").when("newPassword", {
    is: val => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("newPassword")],
      "Both password need to be the same"
    )
  })
});


export const editProfileSchema = Yup.object({

    firstName: Yup.string()
    . max(50, "Name should not greater than 50 Characters")
    .matches(/^[aA-zZ\s]*$/, "Only alphabets are allowed for this field ")
    .required("First Name is required").trim('This field cannot include leading and trailing spaces'),

    lastName: Yup.string()
    . max(50, "Name should not greater than 50 Characters")
    .matches(/^[aA-zZ\s]*$/, "Only alphabets are allowed for this field ")
    .required("Last Name is required"),

    salutation: Yup.string().required("Select Salutation"),

    contactNo: Yup.string()
    .required("Contact No. is required")
    .max(13, "Contact No. should not greater than 13 digits")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Invalid phone number"
    )
}) 



export const healthCareProviderSchema = Yup.object({
    
    salutation: Yup.string().required("Select Salutation"),
    firstName: Yup.string()
    . max(50, "Name should not greater than 50 Characters")
    .matches(/^[aA-zZ\s]*$/, "Only alphabets are allowed for this field ")
    .required("First Name is required"),

    lastName: Yup.string()
    . max(50, "Name should not greater than 50 Characters")
    .matches(/^[aA-zZ\s]*$/, "Only alphabets are allowed for this field ")
    .required("Last Name is required"),

    contactNo: Yup.string()
    .required("Phone No. is required")
    .max(13, "Phone No. should not greater than 13 digits")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Invalid phone number"
    ),
    
    specialization: Yup.string().min(5, "Specialization must be atleast 5 characters")
    .max(50, "Specialization should not greater than 50 characters")
    // .matches(/^[aAzZ\s]*$/, "Only alphabets are allowed for this field ")
    .required("Specialization is required"),
    
    address: Yup.string()
    .required("Address is required"),

    email: Yup.string().email("Please enter valid email address")
    .strict(true)
    .required("Please enter your email"),

  experience: Yup.string().min(5, "Experience must be atleast 5 characters")
  .max(50, "Experience should not greater than 50 characters")
  .strict(true).required("Experience is required"),
})

export const patientFormSchema = Yup.object().shape({
    salutation: Yup.string().required("Salutation is required"),
    firstName: Yup.string()
    .required("First Name is required")
    .matches(/^[A-Za-z\s\-@#$%^&!']+$/, 'Please enter a valid name')
    .max(15, "First Name must be less than 16 characters"),
    lastName: Yup.string()
    .required("Last Name is required")
    .matches(/^[A-Za-z\s\-@#$%^&!']+$/, 'Please enter a valid name')
    .max(15, "Last Name must be less than 16 characters"),
    gender: Yup.string().required("Gender is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Please fill a valid email"),
    contactNo: Yup.string()
      .required("Phone Number is required")
      .max(13, "Phone No. should not greater than 13 digits")
      .test("Digits only", "The field should have digits only", digitsOnly),
    zipcode: Yup.string().required("Zip code is required").min(5, "Zip code must be atleast 5 characters")
    . max(10, "Zip code not greater than 10 Characters"),
    city: Yup.string()
    .required("City is required")
    .matches(/^[A-Za-z ]*$/, 'Please enter valid city name'),
    dob: Yup.string().required("Please enter the valid date"),
    registrationDate: Yup.string().required("Please enter the valid date"),
    address: Yup.string().required("Address is required"),
  });



  export const singlePatientFormSchema = Yup.object().shape({
    salutation: Yup.string().required("Salutation is required"),
    firstName: Yup.string()
    .required("First Name is required")
    .matches(/^[A-Za-z\s\-@#$%^&!']+$/, "Only alphabets are allowed for this field ")
    .max(15, "First Name must be less than 16 characters"),
    lastName:  Yup.string()
    .required("Last Name is required")
    .matches(/^[A-Za-z\s\-@#$%^&!']+$/, 'Please enter a valid name')
    .max(15, "Last Name must be less than 16 characters"),
    gender: Yup.string().required("Gender is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Please fill a valid email"),
    contactNo: Yup.string()
      .required("Phone Number is required")
      .test("Digits only", "The field should have digits only", digitsOnly),
    zipcode: Yup.string().required("Zip code is required").test("Digits only", "The field should have digits only", digitsOnly),
    city: Yup.string().required("City is required").matches(/^[A-Za-z ]*$/, 'Please enter valid city name'),
    dob: Yup.string().required("Date of birth is required"),
    address: Yup.string().required("Address is required"),
  });


  export const consultationFormSchema = Yup.object().shape({
    symptom: Yup.string().required("Symptoms is required"),
    // radiates: Yup.string().required(" is required"),
    // describeSymptoms: Yup.string().required("Describe Symptoms is required"),
    // begin: Yup.string().required("Began is required"),
    // ago: Yup.string().required("Ago is required"),
    // frequency: Yup.string().required("Frequency is required"),
    // onSet: Yup.string().required("Onset is required"),
    // describeInjury: Yup.string().required("Injury is required"),
    // palliative: Yup.string().required("Palliative is required"),
    // provocative: Yup.string().required("Provocative is required"),
    // warnings: Yup.string().required("Warnings is required"),
    // additionalNote: Yup.string().required("Additional Note is required"),
    // therapist: Yup.string().required("Therapist is required"),
    // help: Yup.string().required("Symptoms is required"),
    // linkReports: Yup.string().required("Reports is required"),
    // goal: Yup.string().required("Patient Goal is required"),
  })

 export const schema = Yup.object().shape({
    scheduleDetails: Yup.array(
      Yup.object().shape({
        schedule: Yup.array(
          Yup.object().shape({
            startTime: Yup.string().required("*"),
            endTime: Yup.string().required("*"),
            serviceId: Yup.string().required("*"),
          })
        ),
      })
    ),
  });

export const serviceSchema = Yup.object().shape({
  // roomId: Yup.string().required("Room is required"),
  serviceName: Yup.string().required("Service name is required").max(50, "Service must be less than 50 characters"),
  // duration: Yup.string().required("Duration is required"),
})

export const roomSchema = Yup.object().shape({
  roomName:Yup.string().required("Room name is required").matches(/^[a-zA-Z0-9 ]+$/, 'This field cannot contain special character') ,
})
export const categorySchema = Yup.object().shape({
  name:Yup.string().required("Category name is required").matches(/^[a-zA-Z0-9 ]+$/, 'This field cannot contain special character') ,
})

export const appointmentValidation = Yup.object().shape({
  patientName:Yup.string().required("Patient name is required"),
  // serviceType:Yup.object().shape({
  //   label:Yup.string().required("Service type is required"),
  //   value:Yup.string().required("Service type is required"),
  // }),
  // duration:Yup.string().required("Duration is required"),
  // startTime:Yup.string().required("Start date &  time is required"),
  // endTime:Yup.string().required("End date & time is required"),
  appointmentType:Yup.string().required("Appointment type is required"),
  room:Yup.string().required("Room is required"),
  // repeat:Yup.string().required("Repeat is required"),
})