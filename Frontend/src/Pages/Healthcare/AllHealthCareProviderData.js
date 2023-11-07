import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { healthcareEditSchema } from "../../Components/Schemas";
import {
  getProviderByIdApi,
  getProvidersDetails,
  imageProfileApi,
  updateProviderDataById,
  updateProviderProfileById,
} from "../../Apis";
import toast from "react-hot-toast";
import moment from "moment/moment";
import { SERVER_ENDPOINT } from "../../utils/baseUrl";
import img from "../../Assets/img/img-profile.jpg";
import { InputErrorMessage } from "../../Components/common/Errors";
import ReactPaginate from "react-paginate";
const AllHealthcareProviderData = () => {
  const [providerDatas, setProviderDatas] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [classes, setClasses] = useState("text-success");
  const [healthId, setHealthId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(null);
  const [limit, setLimit] = useState(10);
  const modal = document.getElementById("modalholder");

  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
  } = useFormik({
    initialValues: {
      salutation: "",
      firstName: "",
      lastName: "",
      email: "",
      number: "",
      specialization: "",
      experience: "",
      address: "",
      profilePic: "",
      userId: "",
    },
    validationSchema: healthcareEditSchema,
    onSubmit: async (val) => {
      console.log(val, "SAFDSFASETRERGFHY");
      const data = {
        salutation: val.name.split(" ")[0],
        firstName: val.name.split(" ")[1],
        lastName: val.name.split(" ")[2],
        email: val.email,
        contactNo: val.number,
        id: val.userId,
        profilePic: val.profilePic,
      };
      const data1 = {
        specialization: val.specialization,
        address: val.address,
        experience: val.experience,
        id: healthId,
      };
      console.log(data, data1, "ADSFEFADSAHFDFDS");
      try {
        const response1 = await updateProviderProfileById(data);
        const response = await updateProviderDataById(data1);
        if (response.status === 200 && response1.status === 200) {
          modal.click();
          fetchAllProvidersDetails(currentPage, limit);
          const message = response?.data?.message || response.statusText;
          toast.success(message);
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  const fetchAllProvidersDetails = async (page, limit) => {
    try {
      const response = await getProvidersDetails(page, limit);
      if (response.status === 200 || response.status === 201) {
        setProviderDatas(response?.data?.allProviders);
        setPageCount(Math.ceil(response?.data?.totalCount / limit));
      }
    } catch (err) {
      console.log(err);
    }
  };


  const handleClose = ()=>{
    // document.getElementById("modalholder").click();
    setValues({
          name: "",
          email: "",
          number: "",
          specialization: "",
          experience: "",
          address:"",
          profilePic: "",
          userId: "",
        });
  }

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    setCurrentPage(selectedPage);
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
      if (res.status === 200 || res.status === 201) {
        const data = res?.data?.provider?.userId;
        const cData = res?.data?.provider;
        setValues({
          name: data.salutation + " " + data.firstName + " " + data.lastName,
          email: data.email,
          number: data.contactNo,
          specialization: cData.specialization,
          experience: cData.experience,
          address: cData.address,
          profilePic: data?.profilePic,
          userId: data._id,
        });
      }
      console.log(res, "respnsod");
    } catch (err) {
      console.log(err);
    }
  };
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
            </tr>
          </thead>
          <tbody>
            {Boolean(providerDatas?.length) ? (
              providerDatas?.map((item, index) => {
                return (
                  <>
                    <tr>
                      <td>
                        <span className="text-heading font-bold">
                          {(currentPage - 1) * limit + (index + 1)}
                        </span>
                      </td>
                      <td>
                        {/* <img
            alt="..."
            src="/OwnerKit/img/people/img-profile.jpg" 
            className="avatar avatar-sm rounded-circle me-2"
          /> */}
                        <a className="text-heading font-semibold">
                          {/* { el.userId.firstName + " " + el.userId.lastName}  */}
                          {item?.userId?.salutation +
                            " " +
                            item?.userId?.firstName +
                            " " +
                            item?.userId?.lastName}
                        </a>
                      </td>
                      <td>
                        <span className="text-heading font-bold">
                          {item?.specialization}
                        </span>
                      </td>
                      <td>
                        {moment(item?.createdAt?.split("T")[0]).format(
                          "DD/MM/YYYY"
                        )}
                      </td>
                      <td>
                        <span className="badge badge-lg badge-dot">
                          <i className="bg-success"></i>Active
                        </span>
                      </td>
                      <td>
                        <span className="text-heading font-bold ">
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
                          // href="#modalll"
                          className="btn btn-sm  btn-primary border-base"
                          data-bs-toggle="modal"
                          title="View"
                          onClick={() => setHealthId(item._id)}
                          // onClick={() => setEditForm(true)}
                        >
                          <span>
                            View
                            {/* <i className="fa-solid fa-eye"></i> */}
                          </span>
                        </a>
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
        // id="modalll"
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
                <div className="h4 text-center">Healthcare Providers Info</div>

                <div className="d-flex justify-content-end">
                  <div className="text-end">
                    <select
                      disabled={disabled}
                      className={`form-select  ${classes}  border-none shadow-none form-select-sm`}
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
                  <div className="container-fluid ">
                    <div className="row align-items-start">
                      <div className="col-sm-2">
                        <div className="text-start">
                          <a className="avatar w-32 h-32 border  rounded-circle ">
                            <img
                              alt="..."
                              src={SERVER_ENDPOINT + "/" + values?.profilePic}
                              className="rounded-circle"
                              onError={(event) => {
                                event.target.src = img;
                                event.onerror = null;
                              }}
                            />
                          </a>
                          <input
                            type="file"
                            style={{ width: "100px", marginTop: "20px" }}
                            disabled={disabled}
                            onChange={handleEditProfile}
                          />
                        </div>
                      </div>

                      <div className="col-sm-10 mx-auto ">
                        <div className="row pb-4 d-flex justify-content-between align-items-center">
                          <div className="col-4 font-bold text-end pe-5">
                            <label>First Name</label>
                          </div>
                          <input
                            className="col-8 py-2"
                            disabled={disabled}
                            style={{ backgroundColor: "#f8feff" }}
                            value={values.firstName}
                            onChange={handleChange}
                            name="firstName"
                          ></input>
                          <InputErrorMessage
                            error={touched.firstName && errors.firstName}
                            marginBottom={-15}
                          />
                        </div>
                        <div className="row pb-4 d-flex justify-content-between align-items-center">
                          <div className="col-4 font-bold text-end pe-5">
                            <label>Last Name</label>
                          </div>
                          <input
                            className="col-8 py-2"
                            disabled={disabled}
                            style={{ backgroundColor: "#f8feff" }}
                            value={values.lastName}
                            onChange={handleChange}
                            name="lastName"
                          ></input>
                          <InputErrorMessage
                            error={touched.lastName && errors.lastName}
                            marginBottom={-15}
                          />
                        </div>
                        <div className="row pb-4 d-flex justify-content-between align-items-center">
                          <div className="col-4 font-bold text-end pe-5">
                            <label>Email</label>
                          </div>

                          <input
                            className="col-8 py-2"
                            style={{ backgroundColor: "#f8feff" }}
                            disabled={disabled}
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                          ></input>
                          <InputErrorMessage
                            error={touched.email && errors.email}
                            marginBottom={-15}
                          />
                        </div>

                        <div className="row pb-4 d-flex justify-content-between align-items-center">
                          <div className="col-4 font-bold text-end pe-5">
                            <label>Phone Number</label>
                          </div>

                          <input
                            className="col-8 py-2"
                            style={{ backgroundColor: "#f8feff" }}
                            name="number"
                            disabled={disabled}
                            value={values.number}
                            onChange={handleChange}
                          ></input>
                          <InputErrorMessage
                            error={touched.number && errors.number}
                            marginBottom={-15}
                          />
                        </div>
                        <div className="row pb-4 d-flex justify-content-between align-items-center">
                          <div className="col-4 font-bold text-end pe-5">
                            <label>Specialization</label>
                          </div>

                          <input
                            className="col-8 py-2"
                            style={{ backgroundColor: "#f8feff" }}
                            name="specialization"
                            disabled={disabled}
                            value={values.specialization}
                            onChange={handleChange}
                          ></input>
                        </div>
                        <div className="row pb-4 d-flex justify-content-between align-items-center">
                          <div className="col-4 font-bold text-end pe-5">
                            <label>Experience in Industry</label>
                          </div>

                          <input
                            className="col-8 py-2"
                            style={{ backgroundColor: "#f8feff" }}
                            value={values.experience}
                            disabled={disabled}
                            name="experience"
                            onChange={handleChange}
                          ></input>
                        </div>
                        <div className="row pb-4 d-flex justify-content-between align-items-start  ">
                          <div className="col-4 font-bold text-end pe-5 pt-2">
                            <label>Address</label>
                          </div>

                          <input
                            className="col-8 py-2"
                            style={{
                              backgroundColor: "#f8feff",
                              // height: "5em",
                            }}
                            name="address"
                            disabled={disabled}
                            value={values.address}
                            onChange={handleChange}
                          ></input>
                        </div>

                        <div
                          onClick={() => setDisabled(false)}
                          className="d-flex justify-content-end"
                        >
                          <a
                            // href={"#modalholder" + item.userId._id}
                            className="btn btn-primary "
                            // data-bs-toggle="modal"
                            // title="Edit"

                            // onClick={() => setEditForm(false)}
                          >
                            <span className="">Edit</span>
                          </a>
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
                </from>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="ms-5 mt-5">
        {Boolean(providerDatas?.length) && (
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
        )}{" "}
      </div>
    </>
  );
};

export default AllHealthcareProviderData;
