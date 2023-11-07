import React, { useEffect, useState } from "react";
import { creatCategoryApi, createRoomApi, getCategoryByIdApi, getRoomByIdApi, updateCategoryApi, updateRoomApi } from '../../../Apis/index'
import { useFormik } from "formik";
import toast from 'react-hot-toast';
import { InputErrorMessage } from "../../../Components/common/Errors";
import { categorySchema } from "../../../Components/Schemas";
import { WhiteLoader } from "../../../Components/common/Errors/loader/WhiteLoader";
const CategoryModal = (props) => {
  const { id, getData, modal, setFunctions ,setRoomInfoName} = props;
  const [loader,setLoader]=useState(false);
  const { values, setValues, setFieldValue, handleSubmit, resetForm,handleChange,errors,touched } = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema:categorySchema,
    onSubmit: async (val) => {
      setLoader(true)
      try {
        if (id) {
          let data = {
            id: id,
            name: val.name,
          };
          const response1 = await updateCategoryApi(data);
          if (response1?.status === 200 || response1?.status === 201) {
            toast.success(response1?.data?.message);
            modal.click();
            resetForm()
            setLoader(false)
            getData();
            setFunctions("");
            setRoomInfoName("")
          }
        } else {
          const response = await creatCategoryApi(val);
          if (response?.status === 201) {
            modal.click();
            resetForm()
            toast.success(response?.data?.message);
            getData();
            setLoader(false)
            setRoomInfoName("")
            setFunctions("");
          }
        }
      } catch (error) {
        toast.error("Server error");
        setLoader(false)
      }
    },
  });

  const handleClose = () => {
    setFunctions("");
    resetForm()
    setRoomInfoName("")
  };
  const getDetailsById = async (id) => {
    try {
      const response = await getCategoryByIdApi(id);
      if (response?.status === 200 || response?.status === 201) {
        setFieldValue("name", response?.data?.category?.name);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  useEffect(() => {
    if (id) {
      getDetailsById(id);
    }
  }, [id]);

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
          <div className="modal-body  pb-1">
            <div className="row">
              <div className="col-lg-12">
                <label htmlFor="service" className="form-label">Category Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  id="service"
                  onChange={handleChange}
                  value={values?.name}
                  placeholder=""
                />
                  <InputErrorMessage error={touched.name && errors.name} marginBottom={-15} />
              </div>
            </div>
          </div>
          <div className="modal-footer justify-content-end">
            <button disabled={loader} type="submit" className="btn btn-sm btn-primary">
              {loader ? <WhiteLoader/>:"Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
