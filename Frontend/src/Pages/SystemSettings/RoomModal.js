import React, { useEffect, useState } from "react";
import { createRoomApi, getRoomByIdApi, updateRoomApi } from "../../Apis";
import { useFormik } from "formik";
import toast from 'react-hot-toast';
import { InputErrorMessage } from "../../Components/common/Errors";
import { roomSchema } from "../../Components/Schemas";
import { WhiteLoader } from "../../Components/common/Errors/loader/WhiteLoader";
const RoomModal = (props) => {
  const { id, getData, modal, setFunctions ,setRoomInfoName} = props;
  const [loading,setLoading]=useState(false);
  const { values, setValues, setFieldValue, handleSubmit, handleChange,errors,touched ,resetForm,setErrors} = useFormik({
    initialValues: {
      roomName: "",
    },
    validationSchema:roomSchema,
    onSubmit: async (val) => {
      setLoading(true)
      try {
        if (id) {
          let data = {
            id: id,
            roomName: val.roomName,
          };
          const response1 = await updateRoomApi(data);
          if (response1?.status === 200 || response1?.status === 201) {
            toast.success(response1?.data?.message);
            modal.click();
            getData();
            setFunctions("");
            setRoomInfoName("")
            setErrors({})
           resetForm()
           setLoading(false)
          }
        } else {
          const response = await createRoomApi(val);
          if (response?.status === 201) {
            modal.click();
            toast.success(response?.data?.message);
            getData();
            setRoomInfoName("")
            setFunctions("");
            setErrors({});
            resetForm()
            setLoading(false);
          }
        }
      } catch (error) {
        toast.error("Server error");
        setLoading(false);
      }
    },
  });

  const handleClose = (e) => {
    e.preventDefault();
    setFunctions("");
    setValues({roomName:""})
    setRoomInfoName("")
    setErrors({})
  };
  console.log(errors,"EOORRROORRROSSSSSS")
  const getDetailsById = async (id) => {
    try {
      const response = await getRoomByIdApi(id);
      if (response?.status === 200 || response?.status === 201) {
        setFieldValue("roomName", response?.data?.room?.roomName);
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
                <label htmlFor="service" className="form-label">Room Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="roomName"
                  id="service"
                  onChange={handleChange}
                  value={values?.roomName}
                  placeholder=""
                />
                  <InputErrorMessage error={touched.roomName && errors.roomName} marginBottom={-15} />
              </div>
            </div>
          </div>
          <div className="modal-footer justify-content-end">
            <button disabled={loading} type="submit" className="btn btn-sm btn-primary">
             {loading ? <WhiteLoader/> :"Save"} 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomModal;
