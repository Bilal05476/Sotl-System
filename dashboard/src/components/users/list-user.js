import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/listUser";
import Datatable from "../common/datatable";
import { Card, CardBody, CardHeader, Container, Table } from "reactstrap";
import { useStateValue } from "../../StateProvider";
import { Loader } from "react-feather";

const List_user = () => {
  const [{ users, user }] = useStateValue();
  return (
    <Fragment>
      <Breadcrumb title="User List" parent="Users" />
      <Container fluid={true}>
        <Card>
          <CardHeader className="d-flex justify-content-end">
            {user.role === "Head_of_Department" && (
              <Link to="/users/create-user" className="btn btn-primary">
                Create User
              </Link>
            )}
          </CardHeader>
          {users && (
            <CardBody>
              <div className="user-status table-responsive latest-order-table">
                <Table borderless>
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Avatar</th>
                      <th scope="col">Full Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Campus</th>
                      <th scope="col">Department</th>
                      <th scope="col">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td className="digits">{item?.avatar}</td>
                        <td className="digits">{item.name}</td>
                        <td className="digits">{item.email}</td>
                        {/* // font-danger */}
                        <td className="digits">
                          {item.campus.replaceAll("_", " ")}
                        </td>
                        <td className="digits">
                          {item.department.replaceAll("_", " ")}
                        </td>
                        <td className="digits">
                          {item.role.replaceAll("_", " ")}
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr>
                        <td className="text-center" colSpan={10}>
                          No Users!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          )}
          {!users && (
            <Loader style={{ display: "block", margin: "0.5rem auto" }} />
          )}
        </Card>
      </Container>
    </Fragment>
  );
};

export default List_user;
