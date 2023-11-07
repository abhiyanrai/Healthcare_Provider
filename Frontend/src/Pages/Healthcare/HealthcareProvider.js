import toast from "react-hot-toast";
import ReactPaginate from "react-paginate";
import { SERVER_ENDPOINT } from "../../utils/baseUrl";
import img from "../../Assets/img/img-profile.jpg";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import {
  deleteProviderApi,
  getCurrentPlanApi,
  getProviderByIdApi,
  getProvidersDetails,
  imageProfileApi,
  updateProviderDataById,
  updateProviderProfileById,
} from "../../Apis";

import { useEffect } from "react";
import { healthcareEditSchema } from "../../Components/Schemas";
import { InputErrorMessage } from "../../Components/common/Errors";
import moment from "moment/moment";
import AddModal from "./AddModal";
import AuthContext from "../../Components/context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/common/Errors/loader/Loader";

const HealthcareProvider = () => {
  const appContext = useContext(AuthContext);
  const moddl = document.getElementById("deleteModal");
  const _id = appContext?.state?.loggedInOwner?._id;
  const [providerDatas, setProviderDatas] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [classes, setClasses] = useState("text-success");
  const [healthId, setHealthId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(null);
  const [limit, setLimit] = useState(10);
  const [all, setAll] = useState(0);
  const [subscriptionDetails, setSubscriptionDetails] = useState();
  const [messagePanel, setMessagePanel] = useState("");
  const modal = document.getElementById("modalholder");
  const modala = document.querySelector("#addpatient");
  const modalRestrict = document.querySelector("#restrict");
  const navigate = useNavigate();
  const {
    values,
    touched,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      salutation: "",
      email: "",
      number: "",
      specialization: "",
      // experience: "",
      address: "",
      profilePic: "",
      userId: "",
    },
    validationSchema: healthcareEditSchema,
    onSubmit: async (val) => {
      console.log(val, "SAFDSFASETRERGFHY");
      const data = {
        salutation: val.salutation,
        firstName: val.firstName,
        lastName: val.lastName,
        email: val.email,
        contactNo: val.number,
        id: val.userId,
        profilePic: val.profilePic,
      };
      const data1 = {
        specialization: val.specialization,
        address: val.address,
        // experience: val.experience,
        id: healthId,
      };
      try {
        const response1 = await updateProviderProfileById(data);
        const response = await updateProviderDataById(data1);
        if (response?.status === 200 && response1?.status === 200) {
          modal.click();
          fetchAllProvidersDetails(currentPage, limit);
          const message = response?.data?.message || response.statusText;
          setDisabled(true);
          toast.success(message);
          console.log(message);
        }
      } catch (err) {
        console.log(err);
      }
    },
  });
  console.log(subscriptionDetails, "ADSFEFADSAHFDFDS");
  const fetchAllProvidersDetails = async (page, limit) => {
    try {
      const response = await getProvidersDetails(page, limit);
      if (response?.status === 200 || response?.status === 201) {
        setProviderDatas(response?.data?.allProviders);
        setAll(response?.data?.totalCount);
        setPageCount(Math.ceil(response?.data?.totalCount / limit));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handlePageClick = (data) => {
    const selectedPage = data?.selected + 1;
    setCurrentPage(selectedPage);
    fetchAllProvidersDetails(selectedPage, limit);
  };

  const handleSelectChange = (e) => {
    if (e.target.value == 1) {
      setClasses("text-warning");
    } else if (e.target.value == 2) {
      setClasses("text-danger");
    } else {
      setClasses("text-success");
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    try {
      const res = await deleteProviderApi({ id });
      if (res.status === 200 || res.status === 201) {
        toast.success(res.data.message, { id: "003" });
        fetchAllProvidersDetails(currentPage, limit);
        moddl.click();
      }
      console.log(res, "rsponsess");
    } catch (err) {
      console.log(err);
    }
  };
  const handleEditProfile = async (e) => {
    const formdata = new FormData();
    formdata.append("file", e.target.files[0]);
    const res = await imageProfileApi(formdata);
    setFieldValue("profilePic", res?.data?.filePath);
    toast.success(res?.data?.message);
  };

  const getHealthCareProviderDetails = async (id) => {
    try {
      const res = await getProviderByIdApi(id);
      if (res?.status === 200 || res?.status === 201) {
        const data = res?.data?.provider?.userId;
        const cData = res?.data?.provider;
        setValues({
          firstName: data?.firstName,
          salutation: data?.salutation,
          lastName: data?.lastName,
          email: data?.email,
          number: data?.contactNo,
          specialization: cData?.specialization,
          experience: cData?.experience,
          address: cData?.address,
          profilePic: data?.profilePic,
          userId: data?._id,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    document.getElementById("modalholder").click();
    setTimeout(() => {
      setValues({
        firstName: "",
        salutation: "",
        lastName: "",
        email: "",
        number: "",
        specialization: "",
        experience: "",
        address: "",
        profilePic: "",
        userId: "",
      });
      setErrors({});
    }, 500);
  };
  const getUserSubscriptionDetails = async (id) => {
    try {
      const res = await getCurrentPlanApi(id);
      if (res?.status === 200 || res?.status === 201) {
        setSubscriptionDetails(res?.data?.userSubscriptions);
        getMessage(res?.data?.userSubscriptions);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const getMessage = (data) => {
    if (data?.[0]?.noOfHealthCareProvider == 1 && providerDatas?.length == 1) {
      setMessagePanel(
        "We see you've already purchased a healthcare provider but haven't invited yet. Let them informed by clicking and filling out their information ."
      );
    } else if (data?.[0]?.noOfHealthCareProvider == 1) {
      setMessagePanel(
        "You can invite a healthcare provider as our base plan consist 1 account owner and 1 healthcare provider."
      );
    } else {
      // setMessagePanel(`We see you have already purchase healthcare providers but yet not invited them, invite them know by clicking and filling their details. `)
      setMessagePanel(
        `We see you've already purchased ${
          parseInt(data?.[0]?.noOfHealthCareProvider) - parseInt(1)
        }  healthcare providers but haven't invited them yet. Let them informed by clicking and filling out their information. `
      );
    }
  };
  // const checkProvider = () => {
  //   if (
  //     subscriptionDetails?.[0]?.noOfHealthCareProvider >=
  //     parseInt(providerDatas?.length + 1)
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  const handleBuy = () => {
    modalRestrict.click();
    navigate("/subscriptionPayment");
  };

  console.log(subscriptionDetails, "JEIDDETATIDISFA");
  useEffect(() => {
    if (_id !== null) {
      getUserSubscriptionDetails(_id);
    }
  }, [_id]);

  useEffect(() => {
    if (healthId) {
      getHealthCareProviderDetails(healthId);
    }
  }, [healthId]);

  useEffect(() => {
    fetchAllProvidersDetails(currentPage, limit);
  }, []);
  return (
    <>
      <main className="py-6 bg-surface-secondary">
        <header>
          <div className="container-fluid">
            <div className="mb-5 ps-3">
              <div className="row d-flex align-items-center justify-content-end">
                <div className="col-auto ">
                  <a
                    href={
                      Boolean(
                        subscriptionDetails?.[0]?.noOfHealthCareProvider >=
                          parseInt(providerDatas?.length + 1)
                      )
                        ? "#addpatient"
                        : "#restrict"
                    }
                    className="btn btn-primary w-100 d-flex"
                    data-bs-toggle="modal"
                  >
                    <span>
                      <i className="bi bi-plus-square-dotted pe-sm-2 p-auto" />{" "}
                    </span>
                    <span className="d-none d-sm-block">
                      Add Healthcare Provider
                    </span>
                  </a>
                </div>
              </div>
              <p
                className="m-5"
                style={{
                  float: "right",
                  fontSize: ".9rem",
                  fontStyle: "italic",
                }}
              >
                {messagePanel}
              </p>
            </div>
          </div>
        </header>

        {/* <!-- Container --> */}
        <div className="container-fluid vstack gap-5">
          <div className="card ">
            <div className="d-flex card-header border-bottom">
              <h5 className="mb-0 font-bolder h3">All Healthcare Providers</h5>
              <div className="ms-auto text-end"></div>
            </div>
            <div className="card">
              <div className="col-xl-12">
                <div className="table-responsive">
                  <table className="table table-hover table-nowrap">
                    <thead className="table-light">
                      <tr>
                        <th className="col-1">S.No</th>
                        <th className="col-2">Name</th>
                        <th className="col-2">Specialization</th>
                        <th className="col-2">Created Date</th>
                        <th className="col-2">Status</th>
                        <th className="col-2">Phone No.</th>
                        <th className="col-2"></th>
                        <th className="col-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {Boolean(providerDatas?.length) ? (
                        providerDatas?.map((item, index) => {
                          return (
                            <>
                              <tr>
                                <td>
                                  <span>
                                    {(currentPage - 1) * limit + (index + 1)}
                                  </span>
                                </td>
                                <td>
                                  <a>
                                    {item?.userId?.salutation +
                                      " " +
                                      item?.userId?.firstName +
                                      " " +
                                      item?.userId?.lastName}
                                  </a>
                                </td>
                                <td>
                                  <span>{item?.specialization}</span>
                                </td>
                                <td>
                                  {moment(
                                    item?.createdAt?.split("T")[0]
                                  ).format("DD/MM/YYYY")}
                                </td>
                                <td>
                                  <span className="badge badge-lg badge-dot">
                                    <i className="bg-success"></i>Active
                                  </span>
                                </td>
                                <td>
                                  <span>
                                    {item?.userId?.contactNo ? (
                                      item?.userId?.contactNo
                                    ) : (
                                      <span className="text-center">-</span>
                                    )}
                                  </span>
                                </td>
                                <td className="text-end">
                                  <a
                                    href="#modalholder"
                                    className="btn btn-sm  btn-primary border-base"
                                    data-bs-toggle="modal"
                                    title="View"
                                    onClick={() => setHealthId(item._id)}
                                  >
                                    <span>View</span>
                                  </a>
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    class="btn btn-sm btn-square btn-neutral text-danger-hover me-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#deleteModal"
                                    onClick={() => setHealthId(item._id)}
                                  >
                                    <i class="bi bi-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            </>
                          );
                        })
                      ) : (
                        <tr align="center">
                          <td colspan="8">
                            <h5> No record found!</h5>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div
                  className="modal fade dsfdsfdsf"
                  id="modalholder"
                  tabIndex={-1}
                  aria-labelledby="modalholder"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-lg modal-dialog-centered border-0">
                    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                      <div className="modal-content shadow-3 w-11/10">
                        <div className="modal-header ">
                          <button
                            className="btn-close"
                            // data-bs-dismiss="modal"
                            // aria-label="Close"
                            onClick={handleClose}
                          ></button>
                        </div>
                        <div className="d-flex px-10 justify-content-between mt-5 align-items-center">
                          <div className="h4 text-center">
                            Healthcare Providers Info
                          </div>

                          <div className="d-flex justify-content-end">
                            <div className="text-end">
                              <select
                                disabled={disabled}
                                className={`form-select  ${classes}  form-select-sm`}
                                aria-label=".form-select-sm example"
                                onChange={handleSelectChange}
                              >
                                <option className="text-success" value="0">
                                  Active
                                </option>
                                <option className="text-warning" value="1">
                                  Inactive
                                </option>
                                <option className="text-danger" value="2">
                                  Disabled
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="modal-body">
                          <from onSubmit={handleSubmit}>
                            {/* Text */}
                            {values?.firstName ? (
                              <div className="container-fluid ">
                                <div className="row align-items-start">
                                  <div className="col-sm-2">
                                    <div className="text-start">
                                      <a className="avatar w-32 h-32 border  rounded-circle ">
                                        <img
                                          alt="..."
                                          src={
                                            SERVER_ENDPOINT +
                                            "/" +
                                            values?.profilePic
                                          }
                                          className="rounded-circle"
                                          onError={(event) => {
                                            event.target.src = img;
                                            event.onerror = null;
                                          }}
                                        />
                                      </a>
                                      <input
                                        type="file"
                                        style={{
                                          width: "100px",
                                          marginTop: "20px",
                                          marginLeft: "15px",
                                        }}
                                        disabled={disabled}
                                        onChange={handleEditProfile}
                                      />
                                    </div>
                                  </div>

                                  <div className="col-sm-10 mx-auto ">
                                    <div className="row pb-4 d-flex justify-content-between align-items-center">
                                      <div className="col-4 font-bold text-end pe-5">
                                        <label>Salutation</label>
                                      </div>
                                      <div className="col-8 py-2">
                                        <select
                                          type="string"
                                          name="salutation"
                                          disabled={disabled}
                                          style={{ backgroundColor: "#f8feff" }}
                                          // style={{width:"300px"}}
                                          className="form-control"
                                          onChange={handleChange}
                                          // onBlur={handleBlur}
                                          value={values.salutation}
                                        >
                                          <option hidden>Select</option>
                                          {/* <option>Dr.</option> */}
                                          <option value="Dr">Dr</option>
                                          <option value="Mr">Mr</option>
                                          <option value="Ms">Ms</option>
                                        </select>
                                      </div>
                                      <InputErrorMessage
                                        error={
                                          touched.salutation &&
                                          errors.salutation
                                        }
                                        marginBottom={-15}
                                      />
                                    </div>
                                    <div className="row pb-4">
                                      <div className="col-4 font-bold text-end pe-5">
                                        <label className="label-control">
                                          First Name
                                        </label>
                                      </div>
                                      <div className="col-8">
                                        <input
                                          className="form-control"
                                          disabled={disabled}
                                          style={{ backgroundColor: "#f8feff" }}
                                          value={values?.firstName}
                                          onChange={handleChange}
                                          name="firstName"
                                        ></input>
                                      </div>
                                      <InputErrorMessage
                                        error={
                                          touched.firstName && errors.firstName
                                        }
                                        marginBottom={-15}
                                      />
                                    </div>
                                    <div className="row pb-4">
                                      <div className="col-4 font-bold text-end pe-5">
                                        <label className="label-control">
                                          Last Name
                                        </label>
                                      </div>
                                      <div className="col-8">
                                        <input
                                          className="form-control"
                                          disabled={disabled}
                                          style={{ backgroundColor: "#f8feff" }}
                                          value={values?.lastName}
                                          onChange={handleChange}
                                          name="lastName"
                                        ></input>
                                      </div>
                                      <InputErrorMessage
                                        error={
                                          touched.lastName && errors.lastName
                                        }
                                        marginBottom={-15}
                                      />
                                    </div>

                                    <div className="row pb-4">
                                      <div className="col-4 font-bold text-end pe-5">
                                        <label className="label-control">
                                          Email
                                        </label>
                                      </div>
                                      <div className="col-8">
                                        <input
                                          className="form-control"
                                          style={{ backgroundColor: "#f8feff" }}
                                          disabled
                                          name="email"
                                          value={values?.email}
                                          onChange={handleChange}
                                        ></input>
                                      </div>
                                      <InputErrorMessage
                                        error={touched.email && errors.email}
                                        marginBottom={-15}
                                      />
                                    </div>

                                    <div className="row pb-4">
                                      <div className="col-4 font-bold text-end pe-5">
                                        <label className="label-control">
                                          Phone Number
                                        </label>
                                      </div>
                                      <div className="col-8">
                                        <input
                                          className="form-control"
                                          style={{ backgroundColor: "#f8feff" }}
                                          name="number"
                                          disabled={disabled}
                                          value={values?.number}
                                          onChange={handleChange}
                                        ></input>
                                      </div>
                                      <InputErrorMessage
                                        error={touched.number && errors.number}
                                        marginBottom={-15}
                                      />
                                    </div>
                                    <div className="row pb-4">
                                      <div className="col-4 font-bold text-end pe-5">
                                        <label className="label-control">
                                          Specialization
                                        </label>
                                      </div>
                                      <div className="col-8">
                                        <input
                                          className="form-control"
                                          style={{ backgroundColor: "#f8feff" }}
                                          name="specialization"
                                          disabled={disabled}
                                          value={values?.specialization}
                                          onChange={handleChange}
                                        ></input>
                                      </div>
                                    </div>
                                    {/* <div className="row pb-4">
                                    <div className="col-4 font-bold text-end pe-5">
                                      <label className="label-control">Experience in Industry</label>
                                    </div>
                                    <div className="col-8">
                                    <input
                                      className="form-control"
                                      style={{ backgroundColor: "#f8feff" }}
                                      value={values?.experience}
                                      disabled={disabled}
                                      name="experience"
                                      onChange={handleChange}
                                    ></input>
                                    </div>
                                  </div> */}
                                    <div className="row pb-4">
                                      <div className="col-4 font-bold text-end pe-5 pt-2">
                                        <label className="label-control">
                                          Address
                                        </label>
                                      </div>
                                      <div className="col-8">
                                        <input
                                          className="form-control"
                                          style={{
                                            backgroundColor: "#f8feff",
                                            // height: "5em",
                                          }}
                                          name="address"
                                          disabled={disabled}
                                          value={values?.address}
                                          onChange={handleChange}
                                        ></input>
                                      </div>
                                    </div>

                                    <div
                                      onClick={() => setDisabled(false)}
                                      className="d-flex justify-content-end"
                                    >
                                      {disabled ? (
                                        <a className="btn btn-primary ">
                                          <span className="">Edit</span>
                                        </a>
                                      ) : (
                                        ""
                                      )}

                                      {disabled ? (
                                        ""
                                      ) : (
                                        <button
                                          className="btn btn-primary ms-2"
                                          type="submit"
                                          // onClick={() => handlePopup(healthId)}
                                        >
                                          Save
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="row d-flex" style={{justifyContent:"center"}}>
                                <div style={{width:"100px"}}>
                                  <Loader />
                                  </div>
                              </div>
                            )}
                          </from>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="mt-5 me-5 mb-2 ms-3 ">
                  {all >= 11 && (
                    <ReactPaginate
                      pageCount={pageCount}
                      onPageChange={handlePageClick}
                      previousLabel={"<Previous"}
                      nextLabel={"Next>"}
                      breakLabel={"..."}
                      pageRangeDisplayed={3}
                      marginPagesDisplayed={2}
                      containerClassName={"pagination"}
                      pageClassName={"page-item"}
                      pageLinkClassName={"page-link"}
                      activeClassName={"active"}
                      previousClassName={"page-item"}
                      previousLinkClassName={"page-link"}
                      nextClassName={"page-item"}
                      nextLinkClassName={"page-link"}
                      breakClassName={"page-item"}
                      breakLinkClassName={"page-link"}
                    />
                  )}
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </main>

      <div
        className="modal fade"
        id="deleteModal"
        tabindex="-1"
        aria-labelledby="deleteModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close btn-close-con-form"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-12">
                  <h4>Are you sure want to delete ?</h4>
                </div>
              </div>
            </div>
            <div className="modal-footer justify-content-end">
              <button
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                className="btn btn-primary btn-sm"
              >
                No
              </button>
              <button
                type="button"
                onClick={() => handleDelete(healthId)}
                className="btn btn-primary btn-sm"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Subscribe Now For Plan popup code start here.. */}
      <div
        className="modal fade"
        id="addpatient"
        tabIndex={-1}
        aria-labelledby="addpatient"
        aria-hidden="true"
      >
        <AddModal
          fetchAllProvidersDetails={fetchAllProvidersDetails}
          currentPage={currentPage}
          limit={limit}
          modala={modala}
        />
      </div>
      <div
        className="modal fade"
        id="restrict"
        tabIndex={-1}
        aria-labelledby="restrict"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md modal-dialog-centered">
          <div className="modal-content shadow-3">
            <div className="modal-header">
              {/* <div className="h4 text-start">Subscribe Now For Plan</div> */}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <hr />
            <div className="modal-body pt-0">
              <table>
                <tbody>
                  {/* <tr>
                    <td className="pe-2">Plan Name - </td>
                    <th>Plan Name</th>
                  </tr> */}
                  <tr>
                    {/* <td className="pe-2">Details - </td> */}
                    <td>
                      {" "}
                      <h4>
                        {" "}
                        To add more healthcare providers, you have to purchase
                        them first.
                      </h4>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="text-center mt-5">
                <span onClick={handleBuy} className="btn btn-sm  btn-primary ">
                  Buy Now
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* add more resource popup code start here... */}
      <div
        className="modal fade"
        id="addpatient"
        tabIndex={-1}
        aria-labelledby="addpatient"
        aria-hidden="true"
      >
        <AddModal
          fetchAllProvidersDetails={fetchAllProvidersDetails}
          currentPage={currentPage}
          limit={limit}
          modala={modala}
        />
      </div>
      <div
        className="modal fade"
        id="restrict"
        tabIndex={-1}
        aria-labelledby="restrict"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md modal-dialog-centered">
          <div className="modal-content shadow-3">
            <div className="modal-header">
              <div className="h4 text-start">Add Resources</div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <hr />
            <div className="modal-body pt-0">
              To add more healthcare procider to the platform you need to
              purchase for more healthcare procider.
              <div class="text-center mt-5">
                <span className="btn btn-sm  btn-primary ">Buy now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* add more resource popup code end here... */}
    </>
  );
};

export default HealthcareProvider;
