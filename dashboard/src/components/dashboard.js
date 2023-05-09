import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "./common/breadcrumb";
import {
  Navigation,
  Box,
  MessageSquare,
  Users,
  Briefcase,
  CreditCard,
  ShoppingCart,
  Calendar,
  Eye,
  Loader,
} from "react-feather";
import CountUp from "react-countup";
import { Chart } from "react-google-charts";

import { Bar, Line } from "react-chartjs-2";
import {
  lineOptions,
  buyOption,
  employeeData,
  employeeOptions,
} from "../constants/chartData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  BarElement,
  ArcElement,
  Filler,
  RadialLinearScale,
} from "chart.js";

// image impoer
import user2 from "../assets/images/dashboard/user2.jpg";
import user1 from "../assets/images/dashboard/user1.jpg";
import man from "../assets/images/dashboard/man.png";
import user from "../assets/images/dashboard/user.png";
import designer from "../assets/images/dashboard/designer.jpg";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Media,
  Row,
  Table,
} from "reactstrap";
import { useStateValue } from "../StateProvider";
import { NavLink } from "react-router-dom";
import { fetchCoursesAndUsers, fetchUserData } from "./Endpoints";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  BarElement,
  ArcElement,
  Filler,
  RadialLinearScale
);

const Dashboard = () => {
  const [streamFilter, setStreamFilter] = useState("Monthly");
  const lineData = {
    labels:
      streamFilter === "Yearly"
        ? ["2023"]
        : streamFilter === "Half Yearly"
        ? ["Jan - June", "July - Dec"]
        : streamFilter === "Quaterly"
        ? ["Jan - Mar", "Apr - June", "July - Sep", "Oct - Dec"]
        : [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
    datasets: [
      {
        data:
          streamFilter === "Yearly"
            ? [21]
            : streamFilter === "Half Yearly"
            ? [12, 9]
            : streamFilter === "Quaterly"
            ? [6, 6, 4, 5]
            : [3, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 1],
        borderColor: "gold",
        backgroundColor: "gold",
        borderWidth: 0,
        barPercentage: 0.5,
        borderRadius: 5,
        categoryPercentage: 0.4,
        label: "Pending",
      },
      {
        data:
          streamFilter === "Yearly"
            ? [19]
            : streamFilter === "Half Yearly"
            ? [10, 9]
            : streamFilter === "Quaterly"
            ? [5, 5, 4, 5]
            : [2, 3, 0, 1, 3, 1, 1, 3, 0, 1, 3, 1],

        borderColor: "lightblue",
        backgroundColor: "lightblue",
        borderWidth: 0,
        barPercentage: 0.5,
        borderRadius: 5,
        categoryPercentage: 0.4,
        label: "Ongoing",
      },
      {
        data:
          streamFilter === "Yearly"
            ? [39]
            : streamFilter === "Half Yearly"
            ? [22, 17]
            : streamFilter === "Quaterly"
            ? [11, 11, 5, 12]
            : [3, 5, 3, 1, 3, 7, 2, 2, 1, 3, 7, 2],

        borderColor: "#040b5b",
        backgroundColor: "#040b5b",
        borderWidth: 0,
        barPercentage: 0.5,
        borderRadius: 5,
        categoryPercentage: 0.4,
        label: "Completed",
      },
    ],
  };

  const buyData = {
    labels: ["", "10", "20", "30", "40", "50"],
    datasets: [
      {
        backgroundColor: "transparent",
        borderColor: "#13c9ca",
        data: [20, 5, 80, 10, 100, 15],
        lineTension: 0.4,
      },
      {
        backgroundColor: "transparent",
        borderColor: "#a5a5a5",
        data: [0, 50, 20, 70, 30, 27],
        lineTension: 0.4,
      },
      {
        backgroundColor: "transparent",
        borderColor: "#ff8084",
        data: [0, 30, 40, 10, 86, 40],
        lineTension: 0.4,
      },
    ],
  };

  const doughnutOptions = {
    title: "",
    pieHole: 0.35,
    pieSliceBorderColor: "none",
    colors: ["#ff8084", "#13c9ca", "#a5a5a5"],
    legend: {
      position: "none",
    },
    pieSliceText: "none",
    tooltip: {
      trigger: "none",
    },
    animation: {
      startup: true,
      easing: "linear",
      duration: 1500,
    },
    chartArea: { left: 0, top: 10, width: "360px", height: "100%" },
    enableInteractivity: false,
  };
  const pieOptions = {
    title: "",
    pieHole: 1,
    slices: [
      {
        color: "#ff8084",
      },
      {
        color: "#13c9ca",
      },
      {
        color: "#f0b54d",
      },
    ],
    tooltip: {
      showColorCode: false,
    },
    chartArea: { left: 0, top: 10, width: "360px", height: "100%" },
    legend: "none",
  };
  const LineOptions = {
    hAxis: {
      textPosition: "none",
      baselineColor: "transparent",
      gridlineColor: "transparent",
    },
    vAxis: {
      textPosition: "none",
      baselineColor: "transparent",
      gridlineColor: "transparent",
    },
    colors: ["#ff8084"],
    legend: "none",
  };
  const LineOptions1 = {
    hAxis: {
      textPosition: "none",
      baselineColor: "transparent",
      gridlineColor: "transparent",
    },
    vAxis: {
      textPosition: "none",
      baselineColor: "transparent",
      gridlineColor: "transparent",
    },
    colors: ["#13c9ca"],
    chartArea: { left: 0, top: 0, width: "100%", height: "100%" },
    legend: "none",
  };
  const LineOptions2 = {
    hAxis: {
      textPosition: "none",
      baselineColor: "transparent",
      gridlineColor: "transparent",
    },
    vAxis: {
      textPosition: "none",
      baselineColor: "transparent",
      gridlineColor: "transparent",
    },
    colors: ["#f5ce8a"],
    chartArea: { left: 0, top: 0, width: "100%", height: "100%" },
    legend: "none",
  };
  const LineOptions3 = {
    hAxis: {
      textPosition: "none",
      baselineColor: "transparent",
      gridlineColor: "transparent",
    },
    vAxis: {
      textPosition: "none",
      baselineColor: "transparent",
      gridlineColor: "transparent",
    },
    colors: ["#a5a5a5"],
    chartArea: { left: 0, top: 0, width: "100%", height: "100%" },
    legend: "none",
  };
  const [{ user, userData, usersandcourses }, dispatch] = useStateValue();
  useEffect(() => {
    if (user.role === "Head_of_Department") fetchCoursesAndUsers(dispatch);
    fetchUserData(user.id, dispatch);
  }, []);

  let faculty = 0;
  let observer = 0;
  let hod = 0;
  let campusD = 0;
  {
    usersandcourses?.users.map((item) => {
      if (item.role === "Faculty") faculty += 1;
      if (item.role === "Observer") observer += 1;
      if (item.role === "Head_of_Department") hod += 1;
      if (item.role === "Campus_Director") campusD += 1;
      return null;
    });
  }

  return (
    <Fragment>
      <Breadcrumb title="Dashboard" parent="Dashboard" />

      <Container fluid={true}>
        <Row>
          {/* {user.role === "Admin" || user.role === "Campus_Director" ? (
            <>
              <Col xl="3 xl-25" md="6">
                <Card className=" o-hidden widget-cards">
                  <CardBody className="bg-warning">
                    <Media className="static-top-widget row">
                      <div className="icons-widgets col-4">
                        <div className="align-self-center text-center">
                          <Users className="font-warning" />
                        </div>
                      </div>
                      <Media body className="col-8">
                        <span className="m-0">Campus Directors</span>
                        <h3 className="mb-0">
                          <CountUp className="counter" end={5} />
                          <small> Currently</small>
                        </h3>
                      </Media>
                    </Media>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="3 xl-25" md="6">
                <Card className=" o-hidden  widget-cards">
                  <CardBody className="bg-secondary ">
                    <Media className="static-top-widget row">
                      <div className="-widgets col-4">
                        <div className="align-self-center text-center">
                          <Users className="font-secondary" />
                        </div>
                      </div>
                      <Media body className="col-8">
                        <span className="m-0">Head of Departments</span>
                        <h3 className="mb-0">
                          <CountUp className="counter" end={18} />
                          <small> Currently</small>
                        </h3>
                      </Media>
                    </Media>
                  </CardBody>
                </Card>
              </Col>
            </>
          ) : (
            <></>
          )} */}
          {/* <Col
            xl={`3 ${
              user.role === "Campus_Director" || user.role === "Admin"
                ? "xl-25"
                : "xl-50"
            }`}
            md="6"
          >
            <Card className="o-hidden widget-cards">
              <CardBody className="bg-primary">
                <Media className="static-top-widget row">
                  <div className="icons-widgets col-4">
                    <div className="align-self-center text-center">
                      <Users className="font-primary" />
                    </div>
                  </div>
                  <Media body className="col-8">
                    <span className="m-0">Faculty Observers</span>
                    <h3 className="mb-0">
                      <CountUp className="counter" end={20} />
                      <small> Currently</small>
                    </h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col
            xl={`3 ${
              user.role === "Campus_Director" || user.role === "Admin"
                ? "xl-25"
                : "xl-50"
            }`}
            md="6"
          >
            <Card className=" o-hidden widget-cards">
              <CardBody className="bg-danger ">
                <Media className="static-top-widget row">
                  <div className="icons-widgets col-4">
                    <div className="align-self-center text-center">
                      <Users className="font-danger" />
                    </div>
                  </div>
                  <Media body className="col-8">
                    <span className="m-0">Faculty Members</span>
                    <h3 className="mb-0">
                      <CountUp className="counter" end={40} />
                      <small> Currently</small>
                    </h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col> */}

          {user.role === "Head_of_Department" && (
            <>
              <Col xl="3 xl-25" md="6">
                <Card className="o-hidden widget-cards">
                  <CardBody className="bg-primary">
                    <Media className="static-top-widget row">
                      <div className="icons-widgets col-4">
                        <div className="align-self-center text-center">
                          <Users className="font-primary" />
                        </div>
                      </div>
                      <Media body className="col-8">
                        <span className="m-0">Observer(s)</span>
                        <h3 className="mb-0">
                          <CountUp className="counter" end={observer} />
                          <small> Currenlty</small>
                        </h3>
                      </Media>
                    </Media>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="3 xl-25" md="6">
                <Card className="o-hidden widget-cards">
                  <CardBody className="bg-primary">
                    <Media className="static-top-widget row">
                      <div className="icons-widgets col-4">
                        <div className="align-self-center text-center">
                          <Users className="font-primary" />
                        </div>
                      </div>
                      <Media body className="col-8">
                        <span className="m-0">Faculty(s)</span>
                        <h3 className="mb-0">
                          <CountUp className="counter" end={faculty} />
                          <small> Currenlty</small>
                        </h3>
                      </Media>
                    </Media>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="3 xl-50" md="6">
                <Card className="o-hidden widget-cards">
                  <CardBody className="bg-primary">
                    <Media className="static-top-widget row">
                      <div className="icons-widgets col-4">
                        <div className="align-self-center text-center">
                          <Calendar className="font-primary" />
                        </div>
                      </div>
                      <Media body className="col-8">
                        <span className="m-0">Observation(s)</span>
                        <h3 className="mb-0">
                          <CountUp
                            className="counter"
                            end={userData?.observations.length}
                          />
                          <small> All Time</small>
                        </h3>
                      </Media>
                    </Media>
                  </CardBody>
                </Card>
              </Col>
            </>
          )}

          {user.role === "Faculty" && (
            <>
              <Col xl="6 xl-50" md="6" sm="3">
                <Card className="o-hidden widget-cards">
                  <CardBody className="bg-primary">
                    <Media className="static-top-widget row">
                      <div className="icons-widgets col-4">
                        <div className="align-self-center text-center">
                          <Users className="font-primary" />
                        </div>
                      </div>
                      <Media body className="col-8">
                        <span className="m-0">Observations</span>

                        <h3 className="mb-0">
                          <CountUp
                            className="counter"
                            end={userData?.observations?.length}
                          />
                          <small> All Time</small>
                        </h3>
                      </Media>
                    </Media>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="6 xl-50" md="6" sm="3">
                <Card className="o-hidden widget-cards">
                  <CardBody className="bg-primary">
                    <Media className="static-top-widget row">
                      <div className="icons-widgets col-4">
                        <div className="align-self-center text-center">
                          <Users className="font-primary" />
                        </div>
                      </div>
                      <Media body className="col-8">
                        <span className="m-0">Courses</span>
                        {/* {userData && ( */}
                        <h3 className="mb-0">
                          <CountUp
                            className="counter"
                            end={userData?.slots?.length}
                          />
                          <small> Assinged</small>
                        </h3>
                        {/* )} */}
                        {/* {!userData && <Loader />} */}
                      </Media>
                    </Media>
                  </CardBody>
                </Card>
              </Col>
              {/* <Col xl="3 xl-50" md="6">
                <Card className="o-hidden widget-cards">
                  <CardBody className="bg-primary">
                    <Media className="static-top-widget row">
                      <div className="icons-widgets col-4">
                        <div className="align-self-center text-center">
                          <Users className="font-primary" />
                        </div>
                      </div>
                      <Media body className="col-8">
                        <span className="m-0">Current Meeting</span>
                        <h3 className="mb-0">
                          {userData && (
                            <span className="counter">
                              {userData.observations[0]?.meetings
                                ?.informedObservation?.status === "Ongoing" &&
                                "Informed"}
                              {userData.observations[0]?.meetings
                                ?.postObservation?.status === "Ongoing" &&
                                "Post Informed"}
                              {userData.observations[0]?.meetings
                                ?.uninformedObservation?.status === "Ongoing" &&
                                "Uniformed"}
                              {userData.observations[0]?.meetings
                                ?.professionalDPlan?.status === "Ongoing" &&
                                "Professional Development"}
                              {userData.observations.length === 0 && "--"}
                              {!userData.observations[0].meetings && "--"}
                            </span>
                          )}
                          {!userData && <Loader size={22} />}
                        </h3>
                      </Media>
                    </Media>
                  </CardBody>
                </Card>
              </Col> */}
            </>
          )}

          {user.role !== "Faculty" ? (
            <Col xl="6 xl-100">
              <Card>
                <CardHeader className="d-flex align-items-center justify-content-between">
                  <h5>Observations Stream</h5>
                  <div>
                    <ObservationStreamFilter
                      streamFilter={streamFilter}
                      setStreamFilter={setStreamFilter}
                      text="Monthly"
                    />
                    <ObservationStreamFilter
                      streamFilter={streamFilter}
                      setStreamFilter={setStreamFilter}
                      text="Quaterly"
                    />
                    <ObservationStreamFilter
                      streamFilter={streamFilter}
                      setStreamFilter={setStreamFilter}
                      text="Half Yearly"
                    />
                    <ObservationStreamFilter
                      streamFilter={streamFilter}
                      setStreamFilter={setStreamFilter}
                      text="Yearly"
                    />
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="market-chart">
                    <Bar
                      data={lineData}
                      options={lineOptions}
                      width={778}
                      height={308}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          ) : (
            <></>
          )}

          <Col xl="6 xl-100">
            <Card>
              <CardHeader>
                <h5>Your Observations</h5>
              </CardHeader>
              {userData && (
                <CardBody>
                  <div className="user-status table-responsive latest-order-table">
                    <Table borderless>
                      <thead>
                        <tr>
                          <th scope="col">Id</th>
                          <th scope="col">Course</th>
                          <th scope="col">Semester</th>
                          <th scope="col">Faculty</th>
                          <th scope="col">Observer</th>
                          <th scope="col">Head of department</th>
                          <th scope="col">Starting Date</th>
                          <th scope="col">Ending Date</th>
                          <th scope="col">Progress</th>
                          <th scope="col">Status</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {userData?.observations.map((item) => (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td className="digits">{item.course.name}</td>
                            <td className="digits">{item.semester}</td>
                            <td className="digits">{item.faculty.name}</td>
                            <td className="digits">{item.observer.name}</td>
                            <td className="digits">{item.hod.name}</td>
                            <td className="digits">
                              {item.starting ? item.starting : "--"}
                            </td>
                            <td className="digits">
                              {item.ending ? item.ending : "--"}
                            </td>
                            <td className="digits">
                              {item.observationProgress}%
                            </td>
                            <td
                              className={`digits ${
                                item.observationStatus === "Ongoing"
                                  ? "text-primary"
                                  : item.observationStatus === "Completed"
                                  ? "text-success"
                                  : "text-danger"
                              }`}
                            >
                              {item.observationStatus}
                            </td>
                            <td className="digits font-primary">
                              <NavLink
                                className="d-flex align-items-center"
                                to={`${process.env.PUBLIC_URL}/observations/detail-observation/${item.id}`}
                              >
                                <Eye size={20} />
                              </NavLink>
                            </td>
                          </tr>
                        ))}
                        {userData?.observations.length === 0 && (
                          <tr>
                            <td className="text-center" colSpan={10}>
                              No Observations!
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                    {userData?.observations.length > 0 && (
                      <NavLink
                        to="/observations/list-observation"
                        className="btn btn-primary"
                      >
                        View All Observerions
                      </NavLink>
                    )}
                  </div>
                </CardBody>
              )}

              {!userData && (
                <Loader style={{ display: "block", margin: "0.5rem auto" }} />
              )}
            </Card>
          </Col>
          {user.role === "Faculty" ? (
            <Col xl="6 xl-100">
              <Card>
                <CardHeader>
                  <h5>Your Courses</h5>
                </CardHeader>
                {userData && (
                  <CardBody>
                    <div className="user-status table-responsive latest-order-table">
                      <Table borderless>
                        <thead>
                          <tr>
                            <th scope="col">Course Code</th>
                            <th scope="col">Section Code</th>
                            <th scope="col">Course</th>
                            <th scope="col">Time slot</th>
                            <th scope="col">Location</th>
                            <th scope="col">Campus</th>
                            <th scope="col">Department</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userData?.slots.map((item) => (
                            <tr key={item.id}>
                              <td className="digits">{item.course.id}</td>
                              <td className="digits">{item.id}</td>
                              <td className="digits">{item.course.name}</td>
                              <td className="digits">
                                {item.day} {item.time}
                              </td>
                              <td className="digits">{item.location}</td>
                              <td className="digits">
                                {item.course.campus?.replaceAll("_", " ")}
                              </td>
                              <td className="digits">
                                {item.course.department}
                              </td>
                            </tr>
                          ))}
                          {userData?.slots.length === 0 && (
                            <tr>
                              <td className="text-center" colSpan={6}>
                                No Courses Slots!
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                      {userData?.slots.length > 0 && (
                        <a href="#javaScript" className="btn btn-primary">
                          View All Courses
                        </a>
                      )}
                    </div>
                  </CardBody>
                )}
                {!userData && (
                  <Loader style={{ display: "block", margin: "0.5rem auto" }} />
                )}
              </Card>
            </Col>
          ) : (
            <></>
          )}
          {/* <Col xl="3 xl-50" md="6">
            <Card className=" order-graph sales-carousel">
              <CardHeader>
                <h6>Total Sales</h6>
                <Row>
                  <Col className="col-6">
                    <div className="small-chartjs">
                      <div
                        className="flot-chart-placeholder"
                        id="simple-line-chart-sparkline-3"
                      >
                        <Chart
                          height={"60px"}
                          chartType="LineChart"
                          loader={<div>Loading Chart</div>}
                          data={[
                            ["x", "time"],
                            [0, 20],
                            [1, 5],
                            [2, 120],
                            [3, 10],
                            [4, 140],
                            [5, 15],
                          ]}
                          options={LineOptions}
                          legend_toggle
                        />
                      </div>
                    </div>
                  </Col>
                  <Col className="col-6">
                    <div className="value-graph">
                      <h3>
                        42%{" "}
                        <span>
                          <i className="fa fa-angle-up font-primary"></i>
                        </span>
                      </h3>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Media>
                  <Media body>
                    <span>Sales Last Month</span>
                    <h2 className="mb-0">9054</h2>
                    <p>
                      0.25%{" "}
                      <span>
                        <i className="fa fa-angle-up"></i>
                      </span>
                    </p>
                    <h5 className="f-w-600 f-16">Gross sales of August</h5>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting
                    </p>
                  </Media>
                  <div className="bg-primary b-r-8">
                    <div className="small-box">
                      <Briefcase />
                    </div>
                  </div>
                </Media>
              </CardBody>
            </Card>
          </Col> */}
          {/* <Col xl="3 xl-50" md="6">
            <Card className=" order-graph sales-carousel">
              <CardHeader>
                <h6>Total purchase</h6>
                <Row>
                  <Col className="col-6">
                    <div className="small-chartjs">
                      <div
                        className="flot-chart-placeholder"
                        id="simple-line-chart-sparkline"
                      >
                        <Chart
                          height={"60px"}
                          chartType="LineChart"
                          loader={<div>Loading Chart</div>}
                          data={[
                            ["x", "time"],
                            [0, 85],
                            [1, 83],
                            [2, 90],
                            [3, 70],
                            [4, 85],
                            [5, 60],
                            [6, 65],
                            [7, 63],
                            [8, 68],
                            [9, 68],
                            [10, 65],
                            [11, 40],
                            [12, 60],
                            [13, 75],
                            [14, 70],
                            [15, 90],
                          ]}
                          options={LineOptions1}
                          legend_toggle
                        />
                      </div>
                    </div>
                  </Col>
                  <Col className="col-6">
                    <div className="value-graph">
                      <h3>
                        20%{" "}
                        <span>
                          <i className="fa fa-angle-up font-secondary"></i>
                        </span>
                      </h3>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Media>
                  <Media body>
                    <span>Monthly Purchase</span>
                    <h2 className="mb-0">2154</h2>
                    <p>
                      0.13%{" "}
                      <span>
                        <i className="fa fa-angle-up"></i>
                      </span>
                    </p>
                    <h5 className="f-w-600 f-16">Avg Gross purchase</h5>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting
                    </p>
                  </Media>
                  <div className="bg-secondary b-r-8">
                    <div className="small-box">
                      <CreditCard />
                    </div>
                  </div>
                </Media>
              </CardBody>
            </Card>
          </Col> */}
          {/* <Col xl="3 xl-50" md="6">
            <Card className="order-graph sales-carousel">
              <CardHeader>
                <h6>Total cash transaction</h6>
                <Row>
                  <Col className="col-6">
                    <div className="small-chartjs">
                      <div
                        className="flot-chart-placeholder"
                        id="simple-line-chart-sparkline-2"
                      >
                        <Chart
                          height={"60px"}
                          chartType="LineChart"
                          loader={<div>Loading Chart</div>}
                          data={[
                            ["x", "time"],
                            [0, 85],
                            [1, 83],
                            [2, 90],
                            [3, 70],
                            [4, 85],
                            [5, 60],
                            [6, 65],
                            [7, 63],
                            [8, 68],
                            [9, 68],
                            [10, 65],
                            [11, 40],
                            [12, 60],
                            [13, 75],
                            [14, 70],
                            [15, 90],
                          ]}
                          options={LineOptions2}
                          legend_toggle
                        />
                      </div>
                    </div>
                  </Col>
                  <Col className="col-6">
                    <div className="value-graph">
                      <h3>
                        28%{" "}
                        <span>
                          <i className="fa fa-angle-up font-warning"></i>
                        </span>
                      </h3>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Media>
                  <Media body>
                    <span>Cash on hand</span>
                    <h2 className="mb-0">4672</h2>
                    <p>
                      0.8%{" "}
                      <span>
                        <i className="fa fa-angle-up"></i>
                      </span>
                    </p>
                    <h5 className="f-w-600 f-16">Details about cash</h5>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting
                    </p>
                  </Media>
                  <div className="bg-warning b-r-8">
                    <div className="small-box">
                      <ShoppingCart />
                    </div>
                  </div>
                </Media>
              </CardBody>
            </Card>
          </Col> */}
          {/* <Col xl="3 xl-50" md="6">
            <Card className="order-graph sales-carousel">
              <CardHeader>
                <h6>Daily Deposits</h6>
                <Row>
                  <Col className="col-6">
                    <div className="small-chartjs">
                      <div
                        className="flot-chart-placeholder"
                        id="simple-line-chart-sparkline-1"
                      >
                        <Chart
                          height={"60px"}
                          chartType="LineChart"
                          loader={<div>Loading Chart</div>}
                          data={[
                            ["x", "time"],
                            [0, 85],
                            [1, 83],
                            [2, 90],
                            [3, 70],
                            [4, 85],
                            [5, 60],
                            [6, 65],
                            [7, 63],
                            [8, 68],
                            [9, 68],
                            [10, 65],
                            [11, 40],
                            [12, 60],
                            [13, 75],
                            [14, 70],
                            [15, 90],
                          ]}
                          options={LineOptions3}
                          legend_toggle
                        />
                      </div>
                    </div>
                  </Col>
                  <Col className="col-6">
                    <div className="value-graph">
                      <h3>
                        75%{" "}
                        <span>
                          <i className="fa fa-angle-up font-danger"></i>
                        </span>
                      </h3>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Media>
                  <Media body>
                    <span>Security Deposits</span>
                    <h2 className="mb-0">5782</h2>
                    <p>
                      0.25%{" "}
                      <span>
                        <i className="fa fa-angle-up"></i>
                      </span>
                    </p>
                    <h5 className="f-w-600 f-16">Gross sales of June</h5>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting
                    </p>
                  </Media>
                  <div className="bg-danger b-r-8">
                    <div className="small-box">
                      <Calendar />
                    </div>
                  </div>
                </Media>
              </CardBody>
            </Card>
          </Col> */}
          {/* <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Buy / Sell</h5>
              </CardHeader>
              <CardBody className="sell-graph">
                <Line
                  data={buyData}
                  options={buyOption}
                  width={700}
                  height={350}
                />
              </CardBody>
            </Card>
          </Col> */}
          {/* <Col xl="6 xl-100">
            <Card className="height-equal">
              <CardHeader>
                <h5>Products Cart</h5>
              </CardHeader>
              <CardBody>
                <div className="user-status table-responsive products-table">
                  <table className="table table-bordernone mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Details</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Status</th>
                        <th scope="col">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Simply dummy text of the printing</td>
                        <td className="digits">1</td>
                        <td className="font-primary">Pending</td>
                        <td className="digits">$6523</td>
                      </tr>
                      <tr>
                        <td>Long established</td>
                        <td className="digits">5</td>
                        <td className="font-secondary">Cancle</td>
                        <td className="digits">$6523</td>
                      </tr>
                      <tr>
                        <td>sometimes by accident</td>
                        <td className="digits">10</td>
                        <td className="font-secondary">Cancle</td>
                        <td className="digits">$6523</td>
                      </tr>
                      <tr>
                        <td>classical Latin literature</td>
                        <td className="digits">9</td>
                        <td className="font-primary">Return</td>
                        <td className="digits">$6523</td>
                      </tr>
                      <tr>
                        <td>keep the site on the Internet</td>
                        <td className="digits">8</td>
                        <td className="font-primary">Pending</td>
                        <td className="digits">$6523</td>
                      </tr>
                      <tr>
                        <td>Molestiae consequatur</td>
                        <td className="digits">3</td>
                        <td className="font-secondary">Cancle</td>
                        <td className="digits">$6523</td>
                      </tr>
                      <tr>
                        <td>Pain can procure</td>
                        <td className="digits">8</td>
                        <td className="font-primary">Return</td>
                        <td className="digits">$6523</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </Col> */}
          {/* <Col xl="6 xl-100">
            <Card className="height-equal">
              <CardHeader>
                <h5>Empolyee Status</h5>
              </CardHeader>
              <CardBody>
                <div className="user-status table-responsive products-table">
                  <Table className=" table-bordernone mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Designation</th>
                        <th scope="col">Skill Level</th>
                        <th scope="col">Experience</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="bd-t-none u-s-tb">
                          <div className="align-middle image-sm-size">
                            <img
                              className="img-radius align-top m-r-15 rounded-circle blur-up lazyloaded"
                              src={user2}
                              alt=""
                              data-original-title=""
                              title=""
                            />
                            <div className="d-inline-block">
                              <h6>
                                John Deo{" "}
                                <span className="text-muted digits">
                                  (14+ Online)
                                </span>
                              </h6>
                            </div>
                          </div>
                        </td>
                        <td>Designer</td>
                        <td>
                          <div className="progress-showcase">
                            <div className="progress" style={{ height: 8 }}>
                              <div
                                className="progress-bar bg-primary"
                                style={{ width: 30 }}
                                role="progressbar"
                                aria-valuenow="50"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="digits">2 Year</td>
                      </tr>
                      <tr>
                        <td className="bd-t-none u-s-tb">
                          <div className="align-middle image-sm-size">
                            <img
                              className="img-radius align-top m-r-15 rounded-circle blur-up lazyloaded"
                              src={user1}
                              alt=""
                              data-original-title=""
                              title=""
                            />
                            <div className="d-inline-block">
                              <h6>
                                Holio Mako{" "}
                                <span className="text-muted digits">
                                  (250+ Online)
                                </span>
                              </h6>
                            </div>
                          </div>
                        </td>
                        <td>Developer</td>
                        <td>
                          <div className="progress-showcase">
                            <div className="progress" style={{ height: 8 }}>
                              <div
                                className="progress-bar bg-secondary"
                                style={{ width: 70 }}
                                role="progressbar"
                                aria-valuenow="50"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="digits">3 Year</td>
                      </tr>
                      <tr>
                        <td className="bd-t-none u-s-tb">
                          <div className="align-middle image-sm-size">
                            <img
                              className="img-radius align-top m-r-15 rounded-circle blur-up lazyloaded"
                              src={man}
                              alt=""
                              data-original-title=""
                              title=""
                            />
                            <div className="d-inline-block">
                              <h6>
                                Mohsib lara
                                <span className="text-muted digits">
                                  (99+ Online)
                                </span>
                              </h6>
                            </div>
                          </div>
                        </td>
                        <td>Tester</td>
                        <td>
                          <div className="progress-showcase">
                            <div className="progress" style={{ height: 8 }}>
                              <div
                                className="progress-bar bg-primary"
                                style={{ width: 60 }}
                                role="progressbar"
                                aria-valuenow="50"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="digits">5 Month</td>
                      </tr>
                      <tr>
                        <td className="bd-t-none u-s-tb">
                          <div className="align-middle image-sm-size">
                            <img
                              className="img-radius align-top m-r-15 rounded-circle blur-up lazyloaded"
                              src={user}
                              alt=""
                              data-original-title=""
                              title=""
                            />
                            <div className="d-inline-block">
                              <h6>
                                Hileri Soli{" "}
                                <span className="text-muted digits">
                                  (150+ Online)
                                </span>
                              </h6>
                            </div>
                          </div>
                        </td>
                        <td>Designer</td>
                        <td>
                          <div className="progress-showcase">
                            <div className="progress" style={{ height: 8 }}>
                              <div
                                className="progress-bar bg-secondary"
                                style={{ width: 30 }}
                                role="progressbar"
                                aria-valuenow="50"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="digits">3 Month</td>
                      </tr>
                      <tr>
                        <td className="bd-t-none u-s-tb">
                          <div className="align-middle image-sm-size">
                            <img
                              className="img-radius align-top m-r-15 rounded-circle blur-up lazyloaded"
                              src={designer}
                              alt=""
                              data-original-title=""
                              title=""
                            />
                            <div className="d-inline-block">
                              <h6>
                                Pusiz bia{" "}
                                <span className="text-muted digits">
                                  (14+ Online)
                                </span>
                              </h6>
                            </div>
                          </div>
                        </td>
                        <td>Designer</td>
                        <td>
                          <div className="progress-showcase">
                            <div className="progress" style={{ height: 8 }}>
                              <div
                                className="progress-bar bg-primary"
                                role="progressbar"
                                style={{ width: 90 }}
                                aria-valuenow="50"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="digits">5 Year</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col> */}
          {/* <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Sales Status</h5>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xl="3 xl-50" sm="6">
                    <div className="order-graph">
                      <h6>Orders By Location</h6>
                      <div className="chart-block chart-vertical-center">
                        <Chart
                          width={"100%"}
                          height={"180px"}
                          chartType="PieChart"
                          loader={<div>Loading Chart</div>}
                          data={[
                            ["Task", "Hours per Day"],
                            ["Saint Lucia", 300],
                            ["Kenya", 50],
                            ["Liberia", 100],
                          ]}
                          options={doughnutOptions}
                          legend_toggle
                        />
                      </div>
                      <div className="order-graph-bottom">
                        <Media>
                          <div className="order-color-primary"></div>
                          <Media body>
                            <h6 className="mb-0">
                              Saint Lucia{" "}
                              <span className="pull-right">$157</span>
                            </h6>
                          </Media>
                        </Media>
                        <Media>
                          <div className="order-color-secondary"></div>
                          <Media body>
                            <h6 className="mb-0">
                              Kenya <span className="pull-right">$347</span>
                            </h6>
                          </Media>
                        </Media>
                        <Media>
                          <div className="order-color-danger"></div>
                          <Media body>
                            <h6 className="mb-0">
                              Liberia<span className="pull-right">$468</span>
                            </h6>
                          </Media>
                        </Media>
                        <Media>
                          <div className="order-color-warning"></div>
                          <Media body>
                            <h6 className="mb-0">
                              Christmas Island
                              <span className="pull-right">$742</span>
                            </h6>
                          </Media>
                        </Media>
                        <Media>
                          <div className="order-color-success"></div>
                          <Media body>
                            <h6 className="mb-0">
                              Saint Helena{" "}
                              <span className="pull-right">$647</span>
                            </h6>
                          </Media>
                        </Media>
                      </div>
                    </div>
                  </Col>
                  <Col xl="3 xl-50" sm="6">
                    <div className="order-graph sm-order-space">
                      <h6>Sales By Location</h6>
                      <div className="peity-chart-dashboard text-center">
                        <Chart
                          chartType="PieChart"
                          data={[
                            ["Task", "Hours per Day"],
                            ["Saint Lucia", 300],
                            ["Kenya", 50],
                            ["Liberia", 100],
                          ]}
                          options={pieOptions}
                          graph_id="PieChart"
                          width={"100%"}
                          height={"180px"}
                          legend_toggle
                        />
                      </div>
                      <div className="order-graph-bottom sales-location">
                        <Media>
                          <div className="order-shape-primary"></div>
                          <Media body>
                            <h6 className="mb-0 me-0">
                              Germany <span className="pull-right">25%</span>
                            </h6>
                          </Media>
                        </Media>
                        <Media>
                          <div className="order-shape-secondary"></div>
                          <Media body>
                            <h6 className="mb-0 me-0">
                              Brasil <span className="pull-right">10%</span>
                            </h6>
                          </Media>
                        </Media>
                        <Media>
                          <div className="order-shape-danger"></div>
                          <Media body>
                            <h6 className="mb-0 me-0">
                              United Kingdom
                              <span className="pull-right">34%</span>
                            </h6>
                          </Media>
                        </Media>
                        <Media>
                          <div className="order-shape-warning"></div>
                          <Media body>
                            <h6 className="mb-0 me-0">
                              Australia<span className="pull-right">5%</span>
                            </h6>
                          </Media>
                        </Media>
                        <Media>
                          <div className="order-shape-success"></div>
                          <Media body>
                            <h6 className="mb-0 me-0">
                              Canada <span className="pull-right">25%</span>
                            </h6>
                          </Media>
                        </Media>
                      </div>
                    </div>
                  </Col>
                  <Col xl="6 xl-100">
                    <div className="order-graph xl-space">
                      <h6>Revenue for last month</h6>
                      <div className="ct-4 flot-chart-container">
                        <Line
                          type="area"
                          data={employeeData}
                          options={employeeOptions}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col> */}
        </Row>
      </Container>
    </Fragment>
  );
};

const ObservationStreamFilter = ({ streamFilter, setStreamFilter, text }) => {
  return (
    <span
      style={{
        border: "1px solid #040b5b",
        borderRadius: "15px",
        color: streamFilter === text ? "#fff" : "#040b5b",
        padding: "0.2rem 0.6rem",
        marginLeft: "0.5rem",
        cursor: "pointer",
        backgroundColor: streamFilter === text && "#040b5b",
      }}
      onClick={() => setStreamFilter(text)}
    >
      {text}
    </span>
  );
};

export default Dashboard;
