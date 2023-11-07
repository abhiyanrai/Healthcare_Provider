import React, { useState } from "react";
import { changePasswordSchema } from "../../../Components/Schemas";
import { useNavigate } from "react-router-dom";
import { InputErrorMessage } from "../../../Components/common/Errors";
import { changePasswordApi } from "../../../Apis";
import toast from "react-hot-toast";
import { useFormik } from "formik";
const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [hide, setHide] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      validationSchema: changePasswordSchema,
      onSubmit: async (values, action) => {
        try {
          action.resetForm();
          const response = await changePasswordApi(values);
          if (response.status === 200) {
            toast.success(response.data.message);
            navigate("/");
          } else {
            toast.error("Something went wrong.");
          }
        } catch (err) {
          console.log(err);
          const message =
            err.response?.data?.message || err.response.statusText;
          toast.error(message);
          setIsLoading(false);
        }
      },
    });

  const togglePaasword = (data) => {
    switch (data) {
      case "old":
        setHide({ ...hide, old: !hide.old });
        break;
      case "new":
        setHide({ ...hide, new: !hide.new });
        break;
      case "confirm":
        setHide({ ...hide, confirm: !hide.confirm });
    }
  };
  return (
    <>
      <div className="row">
        <div className="col-md-9 col-lg-7 col-xl-6 py-20 mx-auto">
          <div className="card">
            <div className="card-body p-10">
              <div className="text-center mb-12">
                <h1>
                  <i className="bi bi-shield-lock"></i>
                </h1>
                <h1 className="ls-tight font-bolder mt-6">
                  Change Your Password
                </h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label className="form-label" htmlFor="old_password">
                    Old Password
                  </label>
                  <div className="showhide-main">
                    <input
                      type={hide.old ? "text" : "password"}
                      name="oldPassword"
                      id="old_password"
                      placeholder="Old Password"
                      value={values.oldPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-control form-control-solid ${
                        touched.oldPassword && Boolean(errors.oldPassword)
                          ? "border-danger"
                          : ""
                      }`}
                    />
                    <span
                      className="pass-showhide"
                      onClick={() => togglePaasword("old")}
                    >
                      {hide.old ? (
                        <i class="bi bi-eye"></i>
                      ) : (
                        <i class="bi bi-eye-slash"></i>
                      )}
                    </span>
                  </div>
                  <InputErrorMessage
                    error={touched.oldPassword && errors.oldPassword}
                    marginBottom={-15}
                  />
                  {/* {errors.oldPassword && touched.oldPassword ? (
                                       <div className="form-error">{errors.oldPassword}</div>
                                    ) : null } */}
                </div>
                <div className="mb-5">
                  <label className="form-label" htmlFor="new_password">
                    New Password
                  </label>
                  <div className="showhide-main">
                    <input
                      type={hide.new ? "text" : "password"}
                      name="newPassword"
                      id="new_password"
                      placeholder="New Password"
                      value={values.newPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-control form-control-solid ${
                        touched.newPassword && Boolean(errors.newPassword)
                          ? "border-danger"
                          : ""
                      }`}
                    ></input>
                    <span
                      className="pass-showhide"
                      onClick={() => togglePaasword("new")}
                    >
                      {hide.new ? (
                        <i class="bi bi-eye"></i>
                      ) : (
                        <i class="bi bi-eye-slash"></i>
                      )}
                    </span>
                  </div>
                  <InputErrorMessage
                    error={touched.newPassword && errors.newPassword}
                    marginBottom={-15}
                  />
                  {/* {errors.newPassword && touched.newPassword ? (
                                       <div className="form-error">{errors.newPassword}</div>
                                    ) : null } */}
                </div>
                <div className="mb-6">
                  <label className="form-label" htmlFor="re_enter_password">
                    Confirm New Password
                  </label>
                  <div className="showhide-main">
                    <input
                      type={hide.confirm ? "text" : "password"}
                      name="confirmPassword"
                      id="re_enter_password"
                      placeholder="Confirm New Password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-control form-control-solid ${
                        touched.confirmPassword &&
                        Boolean(errors.confirmPassword)
                          ? "border-danger"
                          : ""
                      }`}
                    />
                    <span
                      className="pass-showhide"
                      onClick={() => togglePaasword("confirm")}
                    >
                      {hide.confirm ? (
                        <i class="bi bi-eye"></i>
                      ) : (
                        <i class="bi bi-eye-slash"></i>
                      )}
                    </span>
                  </div>
                  <InputErrorMessage
                    error={touched.confirmPassword && errors.confirmPassword}
                    marginBottom={-15}
                  />
                  {/* {errors.confirmPassword && touched.confirmPassword ? (
                                       <div className="form-error">{errors.confirmPassword}</div>
                                    ) : null } */}
                </div>

                <div className="mt-10">
                  <button type="submit" className="btn btn-primary w-full">
                    Update Password
                  </button>
                </div>
                {/* <ToastContainer autoClose={2000}/> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
