import moment from "moment";
import * as yup from "yup";

yup.addMethod(
  yup.string,
  "checkIsTimeValid",
  function (refValue, errorMessage) {
    return this.test(`checkIsTimeValid`, errorMessage, function (value, o) {
      const { path, createError } = this;
      const startTime = moment(o.parent["startTime"], "HH:mm");
      const endTime = moment(o.parent["endTime"], "HH:mm");
      return (
        startTime < endTime || createError({ path, message: errorMessage })
      );
    });
  }
);

yup.addMethod(
  yup.string,
  "checkIsConflictWithDuration",
  function (refValue, errorMessage) {
    return this.test(
      `checkIsConflictWithDuration`,
      errorMessage,
      function (value, o) {
        const { path, createError } = this;
        const startTime = moment(o.parent["startTime"], "HH:mm");
        const endTime = moment(o.parent["endTime"], "HH:mm");
        const isValid =
          endTime.diff(startTime, "minutes") >= o.parent.duration?.value;
        return (
          Boolean(isValid) ||
          createError({
            path,
            message: errorMessage,
          })
        );
      }
    );
  }
);

yup.addMethod(
  yup.string,
  "checkConflictionWithAnotherTiming",
  function (errorMessage) {
    return this.test(
      `checkConflictionWithAnotherTiming`,
      errorMessage,
      function (value, o) { 
        const { path, createError } = this;
        const startTime = moment(o.parent["startTime"], "HH:mm");
        const endTime = moment(o.parent["endTime"], "HH:mm");
        const isValid =
          endTime.diff(startTime, "minutes") >= o.parent.duration?.value;
        return (
          Boolean(isValid) ||
          createError({
            path,
            message: errorMessage,
          })
        );
      }
    );
  }
);
export const scheduleValidation = yup.object().shape({
  scheduleDetails : yup
    .array()
    .of(
      yup.object().shape({
        day: "",
        schedule: yup.array().of(
          yup.object().shape({
            startTime: yup
              .string()
              .nullable()
              .required("Select start time"),
              // .checkIsTimeValid("endTime", "Must be less than end time")
              // .checkIsConflictWithDuration(
              //   "endTime",
              //   "Cannot create slot in this time range"
              // )
              // .checkConflictionWithAnotherTiming("Conflict in time range"),
            endTime: yup
              .string()
              .nullable()
              .required("Select end time"),
              // .checkIsTimeValid("startTime", "Must be greater than start")
              // .checkIsConflictWithDuration(
              //   "startTime",
              //   "Cannot create slot in this time range"
              // )
              // .checkConflictionWithAnotherTiming("Conflict in time range"),
            // duration: yup.object().required("Select duration"),
            serviceId: yup.string().required("Select service"),
          })
        ),
      })
    )
    .required("Must have one schedule in list")
    .min(1, "You have to fill at least one detail"),
});
