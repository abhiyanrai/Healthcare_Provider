import React, { useState } from "react";
import { useEffect } from "react";
import {
  deleteCategoryApi,
  deleteServiceApi,
  getCategoriesApi,
  getServiceApi,
} from "../../../Apis";
import ServiceModal from "../ServiceModal";
import toast from "react-hot-toast";
import CategoryModal from "./CategoryModal";
const Service = () => {
  const [toggleService, setToggleService] = useState(false);
  const [toggleCat, setToggleCat] = useState(false);
  const [allServices, setAllServices] = useState([]);
  const [serviceIdd, setServiceId] = useState();
  const [allCategories, setAllCategories] = useState([]);
  const [roomInfoName, setRoomInfoName] = useState();
  const [roomInfoId, setRoomInfoId] = useState();
  const [singleServiceData, setSingleServiceData] = useState();
  const serviceModal = document.getElementById("exampleModal");
  const modal = document.getElementById("exampleModaltwo");
  const modalq = document.getElementById("confirmPopup");
  const handleServices = (name) => {
    switch (name) {
      case "service":
        setToggleService(!toggleService);
        break;
      case "category":
        setToggleCat(!toggleCat);
        break;
      default:
        return;
    }
  };
  const getCategories = async () => {
    try {
      const response = await getCategoriesApi();
      if (response.status === 200 || response.status === 201) {
        setAllCategories(response?.data?.allCategory);
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleService = (id) => {
    setServiceId(id);
  };
  const handleDelete = async (id) => {
    try {
      if (id) {
        const response = await deleteCategoryApi({ id });
        if (response.status === 200 || response.status === 201) {
          toast.success(response?.data?.message);
          modalq.click();
          setRoomInfoId("");
          setRoomInfoName("");
          getCategories();
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  const handleServiceDeleteData = (v) => {
    setSingleServiceData(v);
  };
  const handleEdit = (id, name) => {
    setRoomInfoName(name);
    setRoomInfoId(id);
  };
  const getServices = async () => {
    const response = await getServiceApi();
    setAllServices(response?.data?.allServices);
  };
  const handleServiceDelete = async (id) => {
    const modal = document.getElementById("exampleModalConfirm");
    try {
      const response = await deleteServiceApi({ id });
      if (response.status === 200 || response.status === 201) {
        toast.success(response?.data?.message);
        modal.click();
        getServices();
      }
    } catch (err) {
      toast.error("Deleted");
    }
  };
  useEffect(() => {
    getServices();
    getCategories();
  }, []);
  return (
    <>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className={`accordion-button ${toggleCat ? "":"collapsed"} `}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
              onClick={() => handleServices("category")}
            >
              <h4>Categories</h4>
              {toggleCat ? (
                <button
                  type="button"
                  className="btn btn-sm  btn-primary coll-add-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModaltwo"
                >
                  Add
                </button>
              ) : (
                ""
              )}
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <table className="table">
                {allCategories?.length ? (
                  <thead>
                    <tr>
                      <th>
                        <b>Name</b>
                      </th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                    {allCategories?.length &&
                      allCategories?.map((val) => {
                        return (
                          <tr>
                            <td>{val.name}</td>
                            <td></td>
                            <td></td>
                            <td className="text-end">
                              <a
                                href="#"
                                className="btn btn-sm btn-neutral"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModaltwo"
                                onClick={() => handleEdit(val._id, val.name)}
                              >
                                Edit
                              </a>
                              <button
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#confirmPopup"
                                className="btn btn-sm btn-square btn-neutral text-danger-hover"
                                onClick={() => handleEdit(val._id, val.name)}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </thead>
                ) : (
                  "No Categories Available."
                )}
              </table>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className={`accordion-button ${toggleService ? "":"collapsed"} `}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
              onClick={() => handleServices("service")}
            >
              <h4>Services</h4>
              {toggleService ? (
                <button
                  type="button"
                  className="btn btn-sm  btn-primary coll-add-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Add
                </button>
              ) : (
                ""
              )}
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse "
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <table className="table" style={{ tableLayout: "fixed" }}>
                {allServices?.length ? (
                  <thead>
                    <tr>
                      <th>
                        <b>Name</b>
                      </th>
                      <th>
                        <b>Description</b>
                      </th>
                      <th>
                        <b>Category</b>
                      </th>
                      <th>
                        <b>Amount</b>
                      </th>
                      <th>Tax</th>
                    </tr>
                    {allServices?.length &&
                      allServices.map((val) => {
                        return (
                          <tr style={{ verticalAlign: "middle" }}>
                            <td style={{whiteSpace: "inherit"}}>{val?.serviceName}</td>
                            <td style={{ whiteSpace: "break-spaces" }}>
                              {val?.serviceDescp ?val?.serviceDescp :"-"}
                            </td>
                            {
                              console.log(val?.text ,"val.dsafkjsdl")
                            }
                            <td>{val?.categoryId?.name}</td>
                            <td>{val?.amount}</td>
                            <td>{val?.text?.map((v)=>{
                              return <span> {v.name + (v.name ? "-":"") +v.value+"%"}<br /> </span> 
                            })}</td>
                            <td className="text-end">
                              <button
                                // href="#"
                                className="btn btn-sm btn-neutral"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => handleService(val._id)}
                              >
                                Edit
                              </button>
                              <a
                                type="button"
                                className="btn btn-sm btn-square btn-neutral text-danger-hover"
                                href="#"
                                // className="btn btn-sm btn-neutral"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModalConfirm"
                                onClick={() => handleServiceDeleteData(val)}
                              >
                                <i className="bi bi-trash"></i>
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                  </thead>
                ) : (
                  "No service found!"
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <ServiceModal
          category={allCategories}
          modal={serviceModal}
          getData={getServices}
          id={serviceIdd}
          setFunctions={setServiceId}
          allService={allServices}
        />
      </div>
      <div
        className="modal fade"
        id="confirmPopup"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
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
                  <p>
                    Are you sure want to delete <b>{roomInfoName}</b> ?
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer justify-content-end">
              <button
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                className="btn btn-primary"
              >
                No
              </button>
              <button
                type="button"
                onClick={() => handleDelete(roomInfoId)}
                className="btn btn-primary"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModaltwo"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <CategoryModal
          id={roomInfoId}
          name={roomInfoName}
          getData={getCategories}
          setRoomInfoName={setRoomInfoName}
          setFunctions={setRoomInfoId}
          modal={modal}
        />
      </div>
      <div
        className="modal fade"
        id="exampleModalConfirm"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
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
                  {console.log(singleServiceData, "singleServiceData ")}
                  <p>
                    Are you sure want to delete{" "}
                    <b>{singleServiceData?.serviceName}</b> ?
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer justify-content-end">
              <button
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                className="btn btn-primary"
              >
                No
              </button>
              <button
                type="button"
                onClick={() => handleServiceDelete(singleServiceData._id)}
                className="btn btn-primary"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
