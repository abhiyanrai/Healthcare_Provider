import React from 'react';
import { Link, useLocation } from 'react-router-dom';


const PatientCard = (props) => {
 
    const { item } = props

  return (

   <>
       <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                        <div className="card patient-info py-3 py-md-3 mb-4">
                            <div className="d-flex justify-content-between px-3 px-md-4">
                                <div className="icon icon-shape bg-blue-200 text-lg rounded-circle"><i className="bi bi-person text-white h2"></i></div>
                                <div>
                                    <h6 className="text-primary">{item.salutation+" "+item.firstName + " " + item.lastName} </h6>
                                    <p>Patient Id : #1234</p>
                                </div>
                                <div>
                                    <h6>10:00 - 10:30 AM</h6>
                                    <p className="text-muted"> Friday, June 26 </p>
                                </div>
                            </div>
                            <hr className="light-hr" />
                            <div className="d-flex flex-column justify-content-start w-100 px-3 px-md-4">
                                <div><i className="fas fa-map-marker-alt pt-3 psr-3 me-3"></i>{item.address}</div>
                                <div><i className="fas fa-phone pt-3 psr-3 me-3"></i>{item.contactNo}</div>
                            </div>
                            <hr className="light-hr" />
                            <div className="d-flex justify-content-between px-3 px-md-4">
                                <div>
                                    <div className="d-flex">
                                        <p className="pe-2">Gender:</p>
                                        <div className="font-weight-bold">{item.gender}</div>
                                    </div>
                                    <div className="d-flex">
                                        <p className="pe-2">Reports:</p>
                                        <div className="font-weight-bold"><i className="text-danger bi bi-file-pdf"></i></div>
                                    </div>
                                </div>
                            </div>
                            <hr className="light-hr" />
                            <div className="d-flex justify-content-end px-4">
                                <Link className="btn btn-sm btn-primary mat-button-wrapper"
                                 to= {`/patients/profile/${item._id}`}>View Profile</Link>
                                <Link to={`/consultation/${item._id}`} className="btn btn-sm btn-primary mat-button-wrapper">Consultation</Link>
                            </div>
                        </div>
                    </div>
   </>
  )
}

export default PatientCard