import moment from 'moment/moment';
import React from 'react'
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { deleteHolidayApi } from '../../../Apis';

const Holidays = ({holiday,getScheduleDetails}) => {
  const [holidayId,setHolidayId]=useState();
  const modll = document.getElementById("deleteModal")
  const handleDelete = async(id)=>{
    if(!id) return ;
    try{
      const res = await deleteHolidayApi(id);
      if(res.status === 200 || res.status === 201){
        toast.success(res?.data?.message , {id:"003"});
        modll.click();
        getScheduleDetails();
      }
    }catch(err){
      console.log(err)
    }
  }
  return (
    <>
     <div className="accordion-body">
              <table className="table">
                {holiday?.length ? (
                  <thead>
                    <tr>
                      <th>
                        <b>Date</b>
                      </th>
                      <th></th>
                      <th>Description</th>
                      <th></th>
                    </tr>
                    {holiday?.length &&
                      holiday?.map((val) => {
                        return (
                          <tr>
                            <td>{moment(val.date).format("DD/MM/YYYY")}</td>
                            <td></td>
                            <td>{val.name}</td>
                            <td> <button
                                    type="button"
                                    class="btn btn-sm btn-square btn-neutral text-danger-hover me-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#deleteModal"
                                    onClick={() => setHolidayId(val._id)}
                                  >
                                    <i class="bi bi-trash"></i>
                                  </button></td>
                          </tr>
                        );
                      })}
                  </thead>
                ) : (
                  "No Holiday Available."
                )}
              </table>
            </div>

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
                  <h4>
                    Are you sure want to delete ?
                  </h4>
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
                onClick={() => handleDelete(holidayId)}
                className="btn btn-primary btn-sm"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Holidays