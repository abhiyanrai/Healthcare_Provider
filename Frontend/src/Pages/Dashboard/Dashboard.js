import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllAppontmentsApi,
  getDashboardDetailsApi,
  getTodayAppointmentApi,
} from "../../Apis";
import AllHealthcareProviders from "../../Components/AllHealthcareProviders/AllHealthcareProviders";
import AllRecentActivity from "../../Components/AllRecentActivity/AllRecentActivity";
import Loader from "../../Components/common/Errors/loader/Loader";
import AuthContext from "../../Components/context/AuthProvider";

const Dashboard = () => {
  const [providerDatas, setProviderDatas] = useState([]);
  const [runUseEffect, setRunUseEffect] = useState(false);
  const [dashboardData, setDasboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [all, setAll] = useState(0);
  const appContext = useContext(AuthContext);
  const { loggedInOwner } = appContext.state;
  const fetchAllProvidersDetails = async (date, page, limit) => {
    try {
      const response = await getAllAppontmentsApi(date,"", page, limit);
      if (response.status === 200 || response.status === 201) {
        setProviderDatas(response?.data?.appointment);
        setAll(response?.data?.allCount);
        setPageCount(Math.ceil(response?.data?.allCount / limit));
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getDashBoardDetails = async () => {
    try {
      const res = await getDashboardDetailsApi();
      if (res.status === 200 || res.status === 201) {
        setDasboardData(res.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllProvidersDetails(moment().format("YYYY-MM-DD"), currentPage, limit);
  }, []);

  useEffect(() => {
    getDashBoardDetails();
  }, []);

  return (
    <>
      <main className="py-6 bg-surface-secondary">
        {/* <!-- Container --> */}
        <div className="container-fluid">
          {/* <!-- Card stats --> */}
          <div className="row g-6 mb-6">
            <div className="col-xl-4 col-sm-6 col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <span className="h6 font-semibold text-muted text-lg d-block mb-2">
                        Total Patients
                      </span>
                      <span className="h3 font-bold mb-0">
                        {loading ? (
                          <Loader />
                        ) : dashboardData?.totalPatients ? (
                          dashboardData?.totalPatients
                        ) : (
                          "0"
                        )}
                      </span>
                    </div>
                    <div className="col-auto">
                      <div className="icon icon-shape bg-info text-white text-lg rounded-circle">
                        <i className="bi bi-people"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {loggedInOwner?.role !== "Health care provider" ? (
              <div className="col-xl-4 col-sm-6 col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <span className="h6 font-semibold text-muted text-lg d-block mb-2">
                          Total Healthcare Providers
                        </span>
                        <span className="h3 font-bold mb-0">
                          {loading ? (
                            <Loader />
                          ) : dashboardData?.totalProviders ? (
                            dashboardData?.totalProviders
                          ) : (
                            "0"
                          )}
                        </span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape bg-primary text-white text-lg rounded-circle">
                          <i className="bi bi-hospital"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="col-xl-4 col-sm-6 col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <span className="h6 font-semibold text-muted text-lg d-block mb-2">
                        Total Billing
                      </span>
                      <span className="h3 font-bold mb-0">
                        {loading ? (
                          <Loader />
                        ) : dashboardData?.totalBilling ? (
                          dashboardData?.totalBilling
                        ) : (
                          "0"
                        )}
                      </span>
                    </div>
                    <div className="col-auto">
                      <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                        <i className="bi bi-currency-euro"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-6 mb-6">
            <div className="col-lg-12">
              <div className="card">
                <div className="d-flex card-header border-bottom">
                  <h5 className="mb-0">Today's Appointments</h5>
                  <div className="ms-auto text-end">
                    <Link
                      to="sechedule/mysechedule"
                      className="text-sm font-semibold text-primary"
                    >
                      See all
                    </Link>
                  </div>
                </div>
                <AllHealthcareProviders
                  providerDatas={providerDatas}
                  loading={loading}
                  setLoading={setLoading}
                  setRunUseEffect={setRunUseEffect}
                  runUseEffec={runUseEffect}
                  pageCount={pageCount}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  limit={limit}
                  all={all}
                  setAll={setAll}
                  fetchAllProvidersDetails={fetchAllProvidersDetails}
                />
              </div>
            </div>
            <AllRecentActivity />
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
