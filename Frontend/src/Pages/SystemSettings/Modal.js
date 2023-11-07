import React from 'react'
// import { ToastContainer , toast } from 'react-toastify';
import toast from 'react-hot-toast';
import { addDataIntoOptionApi } from '../../Apis';
const Addoption = (props) => {
    const {setFunction,setAddData ,addData,getAllOptions }=props;
    const handleAddOption =async(e)=>{
      e.preventDefault()
      if(addData.name && addData.modelId){
        try{
          const res  =  await addDataIntoOptionApi(addData);
          if(res.status === 200 ||res.status === 201){
            toast.success(res.data.message);
            getAllOptions();
          }
        }catch(err){
          console.log(err)
        }
        setAddData({modelId:"",name:""});
        setFunction(false);
      }
    }
  return (
    <div className="modal-dialog modal-md modal-dialog-centered">
      <div className="modal-content">
        <form >
          <div className="modal-header">
            <button
              type="button"
              className="btn-close btn-close-con-form"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={()=>setFunction(false)}
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-lg-12">
                <label htmlFor="serviceName">Enter Option</label>
                <input
                  className="form-control"
                  type="text"
                  value={addData.name}
                  onChange={(e)=>setAddData({...addData , name:e.target.value})}
                  placeholder=""
                />
              </div>
            </div>
          </div>
          <div className="modal-footer justify-content-end">
            <button type="submit" onClick={handleAddOption} className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
     
    </div>
  )
}

export default Addoption