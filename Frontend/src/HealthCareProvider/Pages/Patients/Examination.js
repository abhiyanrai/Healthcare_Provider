import React from 'react';
import DatePicker from "react-date-picker";
import { Link } from "react-router-dom";
const Examination = () => {
  
  return (
<>
    {/* Main */}
    <main className="py-6 bg-surface-secondary">
        <div className="container-fluid">
           <div className="row align-items-center">
              <div className="card-header px-4">
                  <span className="btn btn-sm btn-neutral ms-auto">Patient : #12345</span>
              </div>
            </div>
          </div>
      <div className='container-fluid vstack gap-5 '>
      <ul className="nav nav-tabs justify-content-start" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            data-bs-toggle="tab"
            href="#fullExamination"
          >
            Full Examination
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="tab"
            href="#dailyExamination"
          >
            Daily Examination
          </a>
        </li>
      </ul>
      {/* Container  1 */}
      <div className="tab-content">
        <div
          className="tab-pane active"
          id="fullExamination"
        >
          <div className="card">
            <div className="card-header">
              <h4 className="mb-1">Functional Examination</h4>
              {/* <p className="text-sm text-muted">By filling your data you get a much better experience using our website.</p> */}
            </div>
            <ul className="list-group list-group-flush">
              {/* Rows */}
              <li className="list-group-item px-6 d-flex align-items-center border-top">
                <div className="col-4">
                  <h6 className="font-semibold">Standing Crest/ SI</h6>
                </div>
                <div className="col-8">
                  <div className="row  px-6 justify-content-around">
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="SI"
                          defaultChecked=""
                        />
                        <label className="form-check-label" htmlFor="left">
                          Left
                        </label>
                      </div>
                    </div>
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="SI"
                        />
                        <label className="form-check-label" htmlFor="right">
                          Right
                        </label>
                      </div>
                    </div>
                    <div className="col-2 text-lg invisible">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="SI"
                        />
                        <label className="form-check-label" htmlFor="right">
                          Right
                        </label>
                      </div>
                    </div>
                    <div className="col-2 d-flex align-items-center">
                      <select className="form-select form-select-sm  me-3 ">
                        <option />
                        <option>Webpixels</option>
                        <option>Apple</option>
                        <option>Elrond</option>
                      </select>
                      <label className="form-label">CM</label>
                    </div>
                  </div>
                  <div className="row  px-6 justify-content-around">
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="SI"
                          defaultChecked=""
                        />
                        <label className="form-check-label" htmlFor="left">
                          Low Level
                        </label>
                      </div>
                    </div>
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="SI"
                        />
                        <label className="form-check-label" htmlFor="right">
                          High Level
                        </label>
                      </div>
                    </div>
                    <div className="col-2 d-flex align-items-center invisible">
                      <select className="form-select form-select-sm  me-3 ">
                        <option />
                        <option>Webpixels</option>
                        <option>Apple</option>
                        <option>Elrond</option>
                      </select>
                      <label className="form-label">CM</label>
                    </div>
                    <div className="col-2 d-flex align-items-center invisible">
                      <select className="form-select form-select-sm  me-3 ">
                        <option />
                        <option>Webpixels</option>
                        <option>Apple</option>
                        <option>Elrond</option>
                      </select>
                      <label className="form-label">CM</label>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-group-item px-6 d-flex align-items-center ">
                <div className="col-4">
                  <h6 className="font-semibold">Fixed SI</h6>
                </div>
                <div className="col-8">
                  <div className="row  px-6 justify-content-around">
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="FSI"
                          defaultChecked=""
                        />
                        <label className="form-check-label" htmlFor="left">
                          Left
                        </label>
                      </div>
                    </div>
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="FSI"
                        />
                        <label className="form-check-label" htmlFor="right">
                          Right
                        </label>
                      </div>
                    </div>
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="FSI"
                        />
                        <label className="form-check-label" htmlFor="biat">
                          Biat
                        </label>
                      </div>
                    </div>
                    <div className="col-2 d-flex align-items-center invisible">
                      <select className="form-select form-select-sm  me-3 ">
                        <option />
                        <option>Webpixels</option>
                        <option>Apple</option>
                        <option>Elrond</option>
                      </select>
                      <label className="form-label">CM</label>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-group-item px-6 d-flex align-items-center ">
                <div className="col-4">
                  <h6 className="font-semibold">Free SI</h6>
                </div>
                <div className="col-8">
                  <div className="row  px-6 justify-content-around">
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="FRSI"
                          defaultChecked=""
                        />
                        <label className="form-check-label" htmlFor="left">
                          Left
                        </label>
                      </div>
                    </div>
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="FRSI"
                        />
                        <label className="form-check-label" htmlFor="right">
                          Right
                        </label>
                      </div>
                    </div>
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="FRSI"
                        />
                        <label className="form-check-label" htmlFor="biat">
                          Biat
                        </label>
                      </div>
                    </div>
                    <div className="col-2 text-lg invisible">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="FSI"
                        />
                        <label className="form-check-label" htmlFor="biat">
                          Biat
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="card mt-5">
            <ul className="list-group list-group-flush">
              {/* Rows */}
              <li className="list-group-item px-6 d-flex align-items-center border-top">
                <div className="col-4">
                  <h6 className="font-semibold">Prone Crest</h6>
                </div>
                <div className="col-8">
                  <div className="row  px-6 justify-content-around">
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="SI"
                          defaultChecked=""
                        />
                        <label className="form-check-label" htmlFor="left">
                          Left
                        </label>
                      </div>
                    </div>
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="SI"
                        />
                        <label className="form-check-label" htmlFor="right">
                          Right
                        </label>
                      </div>
                    </div>
                    <div className="col-2 text-lg invisible">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="SI"
                        />
                        <label className="form-check-label" htmlFor="right">
                          Right
                        </label>
                      </div>
                    </div>
                    <div className="col-2 d-flex align-items-center">
                      <select className="form-select form-select-sm  me-3 ">
                        <option />
                        <option>Webpixels</option>
                        <option>Apple</option>
                        <option>Elrond</option>
                      </select>
                      <label className="form-label">CM</label>
                    </div>
                  </div>
                  <div className="row  px-6 justify-content-around">
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="SI"
                          defaultChecked=""
                        />
                        <label className="form-check-label" htmlFor="left">
                          Low Level
                        </label>
                      </div>
                    </div>
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="SI"
                        />
                        <label className="form-check-label" htmlFor="right">
                          High Level
                        </label>
                      </div>
                    </div>
                    <div className="col-2 d-flex align-items-center invisible">
                      <select className="form-select form-select-sm  me-3 ">
                        <option />
                        <option>Webpixels</option>
                        <option>Apple</option>
                        <option>Elrond</option>
                      </select>
                      <label className="form-label">CM</label>
                    </div>
                    <div className="col-2 d-flex align-items-center invisible">
                      <select className="form-select form-select-sm  me-3 ">
                        <option />
                        <option>Webpixels</option>
                        <option>Apple</option>
                        <option>Elrond</option>
                      </select>
                      <label className="form-label">CM</label>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-group-item px-6 d-flex align-items-center ">
                <div className="col-4">
                  <h6 className="font-semibold">Adam Lumb</h6>
                </div>
                <div className="col-8">
                  <div className="row  px-6 justify-content-around">
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="FSI"
                          defaultChecked=""
                        />
                        <label className="form-check-label" htmlFor="left">
                          Left
                        </label>
                      </div>
                    </div>
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="FSI"
                        />
                        <label className="form-check-label" htmlFor="right">
                          Right
                        </label>
                      </div>
                    </div>
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="FSI"
                        />
                        <label className="form-check-label" htmlFor="biat">
                          Negative
                        </label>
                      </div>
                    </div>
                    <div className="col-2 d-flex align-items-center ">
                      <select className="form-select form-select-sm  me-3 ">
                        <option />
                        <option>Webpixels</option>
                        <option>Apple</option>
                        <option>Elrond</option>
                      </select>
                      <label className="form-label">Degree</label>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-group-item px-6 d-flex align-items-center ">
                <div className="col-4">
                  <h6 className="font-semibold">Thori</h6>
                </div>
                <div className="col-8">
                  <div className="row  px-6 justify-content-around">
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="FRSI"
                          defaultChecked=""
                        />
                        <label className="form-check-label" htmlFor="left">
                          Left
                        </label>
                      </div>
                    </div>
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="FRSI"
                        />
                        <label className="form-check-label" htmlFor="right">
                          Right
                        </label>
                      </div>
                    </div>
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="FSI"
                        />
                        <label className="form-check-label" htmlFor="biat">
                          Negative
                        </label>
                      </div>
                    </div>
                    <div className="col-2 d-flex align-items-center ">
                      <select className="form-select form-select-sm  me-3 ">
                        <option />
                        <option>Webpixels</option>
                        <option>Apple</option>
                        <option>Elrond</option>
                      </select>
                      <label className="form-label">Degree</label>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* Container  2 */}
        <div
          className="tab-pane fade"
          id="dailyExamination"
        >
          <div className="card">
            <div className="card-header">
              <h4 className="mb-1">Functional Examination</h4>
              {/* <p className="text-sm text-muted">By filling your data you get a much better experience using our website.</p> */}
            </div>
            <ul className="list-group list-group-flush">
              {/* Rows */}
              <li className="list-group-item px-6 d-flex align-items-center border-top">
                <div className="col-4">
                  <h6 className="font-semibold">Standing Crest/ SI</h6>
                </div>
                <div className="col-8">
                  <div className="row  px-6 justify-content-around">
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="SI"
                          defaultChecked=""
                        />
                        <label className="form-check-label" htmlFor="left">
                          Left
                        </label>
                      </div>
                    </div>
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="SI"
                        />
                        <label className="form-check-label" htmlFor="right">
                          Right
                        </label>
                      </div>
                    </div>
                    <div className="col-2 text-lg invisible">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="SI"
                        />
                        <label className="form-check-label" htmlFor="right">
                          Right
                        </label>
                      </div>
                    </div>
                    <div className="col-2 d-flex align-items-center">
                      <select className="form-select form-select-sm  me-3 ">
                        <option />
                        <option>Webpixels</option>
                        <option>Apple</option>
                        <option>Elrond</option>
                      </select>
                      <label className="form-label">CM</label>
                    </div>
                  </div>
                  <div className="row  px-6 justify-content-around">
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="SI"
                          defaultChecked=""
                        />
                        <label className="form-check-label" htmlFor="left">
                          Low Level
                        </label>
                      </div>
                    </div>
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="SI"
                        />
                        <label className="form-check-label" htmlFor="right">
                          High Level
                        </label>
                      </div>
                    </div>
                    <div className="col-2 d-flex align-items-center invisible">
                      <select className="form-select form-select-sm  me-3 ">
                        <option />
                        <option>Webpixels</option>
                        <option>Apple</option>
                        <option>Elrond</option>
                      </select>
                      <label className="form-label">CM</label>
                    </div>
                    <div className="col-2 d-flex align-items-center invisible">
                      <select className="form-select form-select-sm  me-3 ">
                        <option />
                        <option>Webpixels</option>
                        <option>Apple</option>
                        <option>Elrond</option>
                      </select>
                      <label className="form-label">CM</label>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-group-item px-6 d-flex align-items-center ">
                <div className="col-4">
                  <h6 className="font-semibold">Fixed SI</h6>
                </div>
                <div className="col-8">
                  <div className="row  px-6 justify-content-around">
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="FSI"
                          defaultChecked=""
                        />
                        <label className="form-check-label" htmlFor="left">
                          Left
                        </label>
                      </div>
                    </div>
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="FSI"
                        />
                        <label className="form-check-label" htmlFor="right">
                          Right
                        </label>
                      </div>
                    </div>
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="FSI"
                        />
                        <label className="form-check-label" htmlFor="biat">
                          Biat
                        </label>
                      </div>
                    </div>
                    <div className="col-2 d-flex align-items-center invisible">
                      <select className="form-select form-select-sm  me-3 ">
                        <option />
                        <option>Webpixels</option>
                        <option>Apple</option>
                        <option>Elrond</option>
                      </select>
                      <label className="form-label">CM</label>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-group-item px-6 d-flex align-items-center ">
                <div className="col-4">
                  <h6 className="font-semibold">Free SI</h6>
                </div>
                <div className="col-8">
                  <div className="row  px-6 justify-content-around">
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="FRSI"
                          defaultChecked=""
                        />
                        <label className="form-check-label" htmlFor="left">
                          Left
                        </label>
                      </div>
                    </div>
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="FRSI"
                        />
                        <label className="form-check-label" htmlFor="right">
                          Right
                        </label>
                      </div>
                    </div>
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="FRSI"
                        />
                        <label className="form-check-label" htmlFor="biat">
                          Biat
                        </label>
                      </div>
                    </div>
                    <div className="col-2 text-lg invisible">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="FSI"
                        />
                        <label className="form-check-label" htmlFor="biat">
                          Biat
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="card mt-5">
            <ul className="list-group list-group-flush">
              {/* Rows */}
              <li className="list-group-item px-6 d-flex align-items-center border-top">
                <div className="col-4">
                  <h6 className="font-semibold">Prone Crest</h6>
                </div>
                <div className="col-8">
                  <div className="row  px-6 justify-content-around">
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="SI"
                          defaultChecked=""
                        />
                        <label className="form-check-label" htmlFor="left">
                          Left
                        </label>
                      </div>
                    </div>
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="SI"
                        />
                        <label className="form-check-label" htmlFor="right">
                          Right
                        </label>
                      </div>
                    </div>
                    <div className="col-2 text-lg invisible">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="SI"
                        />
                        <label className="form-check-label" htmlFor="right">
                          Right
                        </label>
                      </div>
                    </div>
                    <div className="col-2 d-flex align-items-center">
                      <select className="form-select form-select-sm  me-3 ">
                        <option />
                        <option>Webpixels</option>
                        <option>Apple</option>
                        <option>Elrond</option>
                      </select>
                      <label className="form-label">CM</label>
                    </div>
                  </div>
                  <div className="row  px-6 justify-content-around">
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="SI"
                          defaultChecked=""
                        />
                        <label className="form-check-label" htmlFor="left">
                          Low Level
                        </label>
                      </div>
                    </div>
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="SI"
                        />
                        <label className="form-check-label" htmlFor="right">
                          High Level
                        </label>
                      </div>
                    </div>
                    <div className="col-2 d-flex align-items-center invisible">
                      <select className="form-select form-select-sm  me-3 ">
                        <option />
                        <option>Webpixels</option>
                        <option>Apple</option>
                        <option>Elrond</option>
                      </select>
                      <label className="form-label">CM</label>
                    </div>
                    <div className="col-2 d-flex align-items-center invisible">
                      <select className="form-select form-select-sm  me-3 ">
                        <option />
                        <option>Webpixels</option>
                        <option>Apple</option>
                        <option>Elrond</option>
                      </select>
                      <label className="form-label">CM</label>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-group-item px-6 d-flex align-items-center ">
                <div className="col-4">
                  <h6 className="font-semibold">Adam Lumb</h6>
                </div>
                <div className="col-8">
                  <div className="row  px-6 justify-content-around">
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="FSI"
                          defaultChecked=""
                        />
                        <label className="form-check-label" htmlFor="left">
                          Left
                        </label>
                      </div>
                    </div>
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="FSI"
                        />
                        <label className="form-check-label" htmlFor="right">
                          Right
                        </label>
                      </div>
                    </div>
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="FSI"
                        />
                        <label className="form-check-label" htmlFor="biat">
                          Negative
                        </label>
                      </div>
                    </div>
                    <div className="col-2 d-flex align-items-center ">
                      <select className="form-select form-select-sm  me-3 ">
                        <option />
                        <option>Webpixels</option>
                        <option>Apple</option>
                        <option>Elrond</option>
                      </select>
                      <label className="form-label">Degree</label>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-group-item px-6 d-flex align-items-center ">
                <div className="col-4">
                  <h6 className="font-semibold">Thori</h6>
                </div>
                <div className="col-8">
                  <div className="row  px-6 justify-content-around">
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="FRSI"
                          defaultChecked=""
                        />
                        <label className="form-check-label" htmlFor="left">
                          Left
                        </label>
                      </div>
                    </div>
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="FRSI"
                        />
                        <label className="form-check-label" htmlFor="right">
                          Right
                        </label>
                      </div>
                    </div>
                    <div className="col-2 text-lg">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="FSI"
                        />
                        <label className="form-check-label" htmlFor="biat">
                          Negative
                        </label>
                      </div>
                    </div>
                    <div className="col-2 d-flex align-items-center ">
                      <select className="form-select form-select-sm  me-3 ">
                        <option />
                        <option>Webpixels</option>
                        <option>Apple</option>
                        <option>Elrond</option>
                      </select>
                      <label className="form-label">Degree</label>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    </main>
</>
)
}

export default Examination
