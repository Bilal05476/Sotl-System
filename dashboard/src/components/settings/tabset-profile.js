import React from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { User, Settings } from "react-feather";
import { Button, Col, Input, Label, Row, Table } from "reactstrap";

const TabsetProfile = ({ user, personal, academic }) => {
  return (
    <div>
      <Tabs>
        <TabList className="nav nav-tabs tab-coupon">
          {personal && (
            <Tab className="nav-link">
              <User className="me-2" />
              Personal Details
            </Tab>
          )}
          {academic && (
            <Tab className="nav-link">
              <Settings className="me-2" />
              Education Details
            </Tab>
          )}
        </TabList>

        {personal && (
          <TabPanel>
            <div className="tab-pane fade show active">
              <div className="table-responsive profile-table">
                <Table className="table-responsive">
                  <tbody>
                    <tr>
                      <td>Full Name:</td>
                      <td>{user.name}</td>
                    </tr>

                    <tr>
                      <td>Email:</td>
                      <td>{user.email}</td>
                    </tr>

                    <tr>
                      <td>Mobile Number:</td>
                      <td>{user?.phone ? user.phone : "---"}</td>
                    </tr>
                    <tr>
                      <td>DOB:</td>
                      <td>{user?.dateOfBirth ? user.dateOfBirth : "---"}</td>
                    </tr>
                    <tr>
                      <td>Campus:</td>
                      <td>{user.campus.replaceAll("_", " ")}</td>
                    </tr>
                    <tr>
                      <td>Department:</td>
                      <td>{user.department}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </TabPanel>
        )}
        {academic && (
          <TabPanel>
            <div className="tab-pane fade show active">
              <div className="table-responsive profile-table">
                <Table className="table-responsive">
                  <tbody>
                    <tr>
                      <td>Institute:</td>
                      <td>{user.institute}</td>
                    </tr>
                    <tr>
                      <td>Degree:</td>
                      <td>{user.degree}</td>
                    </tr>
                    <tr>
                      <td>Degree Starting:</td>
                      <td>{user.starting}</td>
                    </tr>
                    <tr>
                      <td>Degree Ending:</td>
                      <td>{user.ending}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </TabPanel>
        )}
      </Tabs>
    </div>
  );
};

export default TabsetProfile;
