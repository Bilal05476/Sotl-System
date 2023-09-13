import React, { Fragment, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import App from "../components/app";

import Dashboard from "../components/dashboard";

import Profile from "../components/settings/profile";
import Createuser from "../components/users/create-user";
import Listuser from "../components/users/list-user";
import Roleuser from "../components/users/role-user";
import Listobservation from "../components/observations/list-observation";
import Createobservation from "../components/observations/create-observation";
import Detailobservation from "../components/observations/detail-observation";
import Observationrubric from "../components/observations/observation-rubric";
import Observationrubric2 from "../components/observations/observation-rubric2";
import SchedulingPage from "../components/observations/scheuling-page";
import EditProfile from "../components/settings/edit-profile";
import Createcourses from "../components/courses/create-courses";
import Listcourses from "../components/courses/list-courses";
import Assigncourses from "../components/courses/assign-courses";
import Teaching from "../components/Templates/Teaching";
import Reflection from "../components/Templates/Reflection";
import Postobservation from "../components/observations/post-observation";
import ResetPassword from "../components/settings/reset-password";
import EmailTemplate from "../components/Email/EmailTemplate";
import PromptObservation from "../components/observations/prompt-observation";

import { useStateValue } from "../StateProvider";
import { fetchHodData, fetchUserData } from "../components/Endpoints";

const URL = process.env.PUBLIC_URL;
const LayoutRoutes = () => {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (user.role === "Head_of_Department")
      fetchHodData(dispatch, user?.department.id, user?.role, user?.id);
    fetchUserData(user?.id, dispatch);
  }, []);

  return (
    <Fragment>
      <Routes>
        <Route element={<App />}>
          <Route path={`${URL}/`} element={<Dashboard />} />
          {/* <Route
            path={`${URL}/`}
            element={
              <>
                <ParentComponent />
                <ChildComponent />
              </>
            }
          /> */}
          <Route path={`${URL}/dashboard`} element={<Dashboard />} />
          {/* <Route path={`${URL}/hello`} element={<Hello />} /> */}
          {/* <Route
            path={`${URL}/products/physical/category`}
            element={<Category />}
          />
          <Route
            path={`${URL}/products/physical/sub-category`}
            element={<Subcategory />}
          />
          <Route
            path={`${URL}/products/physical/product-list`}
            element={<Productlist />}
          />
          <Route
            path={`${URL}/products/physical/product-detail`}
            element={<Productdetail />}
          />
          <Route
            path={`${URL}/products/physical/add-product`}
            element={<Addproduct />}
          /> */}
          {/* <Route
            path={`${URL}/products/digital/digital-category`}
            element={<Digitalcategory />}
          />
          <Route
            path={`${URL}/products/digital/digital-sub-category`}
            element={<Digitalsubcategory />}
          />
          <Route
            path={`${URL}/products/digital/digital-product-list`}
            element={<Digitalprolist />}
          />
          <Route
            path={`${URL}/products/digital/digital-add-product`}
            element={<Digitaladdpro />}
          /> */}
          {/* <Route
            path={`${URL}/sales/orders`}
            element={<Orders />}
          />
          <Route
            path={`${URL}/sales/transactions`}
            element={<Transactionsales />}
          />

          <Route
            path={`${URL}/coupons/list-coupons`}
            element={<ListCoupons />}
          />
          <Route
            path={`${URL}/coupons/create-coupons`}
            element={<Createcoupons />}
          /> */}
          {/* <Route
            path={`${URL}/pages/list-page`}
            element={<ListPages />}
          />
          <Route
            path={`${URL}/pages/create-page`}
            element={<Createpage />}
          />

          <Route path={`${URL}/media`} element={<Media />} />

          <Route
            path={`${URL}/menus/list-menu`}
            element={<Listmenu />}
          />
          <Route
            path={`${URL}/menus/create-menu`}
            element={<Createmenu />}
          /> */}

          <Route path={`${URL}/users/list-user`} element={<Listuser />} />
          <Route path={`${URL}/user/:slug`} element={<Roleuser />} />
          <Route path={`${URL}/users/create-user`} element={<Createuser />} />
          <Route
            path={`${URL}/courses/list-courses`}
            element={<Listcourses />}
          />
          <Route
            path={`${URL}/courses/create-courses`}
            element={<Createcourses />}
          />
          <Route
            path={`${URL}/courses/assign-courses`}
            element={<Assigncourses />}
          />
          <Route path={`${URL}/plan/teaching-plan`} element={<Teaching />} />
          <Route
            path={`${URL}/plan/reflection-plan`}
            element={<Reflection />}
          />
          <Route path={`${URL}/email/:slug`} element={<EmailTemplate />} />
          <Route
            path={`${URL}/observations/list-observation`}
            element={<Listobservation />}
          />
          <Route
            path={`${URL}/observations/detail-observation/:id`}
            element={<Detailobservation />}
          />
          <Route
            path={`${URL}/observations/observation-rubric/:id`}
            element={<Observationrubric />}
          />
          <Route
            path={`${URL}/observations/uninformed-observation-rubric/:id`}
            element={<Observationrubric2 />}
          />
          <Route
            path={`${URL}/observations/create-observation`}
            element={<Createobservation />}
          />
          <Route
            path={`${URL}/observations/observation-scheduling/:id`}
            element={<SchedulingPage />}
          />
          <Route
            path={`${URL}/observations/post-observation-meeting/:id`}
            element={<Postobservation />}
          />

          <Route
            path={`${URL}/observations/prompt-observation`}
            element={<PromptObservation />}
          />
          {/* <Route
            path={`${URL}/vendors/list_vendors`}
            element={<Listvendors />}
          />
          <Route
            path={`${URL}/vendors/create-vendors`}
            element={<Createvendors />}
          />

          <Route
            path={`${URL}/localization/transactions`}
            element={<Translations />}
          />
          <Route
            path={`${URL}/localization/currency-rates`}
            element={<Rates />}
          /> */}
          {/* <Route
            path={`${URL}/localization/taxes`}
            element={<Taxes />}
          />

          <Route
            path={`${URL}/reports/report`}
            element={<Reports />}
          /> */}
          <Route path={`${URL}/settings/profile`} element={<Profile />} />
          <Route
            path={`${URL}/settings/edit-profile`}
            element={<EditProfile />}
          />
          <Route
            path={`${URL}/settings/reset-password`}
            element={<ResetPassword />}
          />
          {/* <Route
            path={`${URL}/invoice`}
            element={<Invoice />}
          /> */}
          {/* <Route
            path={`${URL}/data-table`}
            element={<Datatable />}
          /> */}
        </Route>
      </Routes>
    </Fragment>
  );
};

export default LayoutRoutes;
