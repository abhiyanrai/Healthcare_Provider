import React, { useState } from "react";

const BillingTax = () => {
  const [toggle, setToggle] = useState(true);
  const [toggleDiscount, setToggleDiscount] = useState(true);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  const handleToggleDiscount = () => {
    setToggleDiscount(!toggleDiscount);
  };
  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingTwo">
          <button
            className="accordion-button "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
            onClick={handleToggle}
          >
            <h4>Tax</h4>
            {toggle ? (
              ""
            ) : (
              <button
                type="button"
                className="btn btn-sm  btn-primary coll-add-btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModaltwoer"
              >
                Add
              </button>
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
            <table className="table"></table>
          </div>
        </div>
      </div>
     
     
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingThree">
          <button
            className="accordion-button "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
            onClick={handleToggleDiscount}
          >
            <h4>Discount</h4>
            {toggleDiscount ? (
              ""
            ) : (
              <button
                type="button"
                className="btn btn-sm  btn-primary coll-add-btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModaltwoer"
              >
                Add
              </button>
            )}
          </button>
        </h2>
        <div
          id="collapseThree"
          className="accordion-collapse collapse"
          aria-labelledby="headingThree"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <table className="table"></table>
          </div>
        </div>
      </div>
     
     
     
      <div
        className="modal fade"
        id="exampleModaltwoer"
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
                  {/* {console.log(singleServiceData, "singleServiceData ")} */}
                  <p>
                    Add tax here
                    {/* <b>{singleServiceData?.serviceName}</b> ? */}
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
                // onClick={() => handleServiceDelete(singleServiceData._id)}
                className="btn btn-primary"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingTax;
