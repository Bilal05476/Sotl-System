import React, { Fragment, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import App from "../components/app";
import Datatable from "../components/common/datatable";
import Createcoupons from "../components/coupons/create-coupons";
import ListCoupons from "../components/coupons/list-coupons";
import Dashboard from "../components/dashboard";
import Invoice from "../components/invoice";
import Rates from "../components/localization/rates";
import Taxes from "../components/localization/taxes";
import Translations from "../components/localization/translations";
import Media from "../components/media/media";
import Createmenu from "../components/menus/create-menu";
import Listmenu from "../components/menus/list-menu";
import Createpage from "../components/pages/create-page";
import ListPages from "../components/pages/list-page";
import Digitaladdpro from "../components/products/digital/digital-add-pro";
import Digitalcategory from "../components/products/digital/digital-category";
import Digitalprolist from "../components/products/digital/digital-pro-list";
import Digitalsubcategory from "../components/products/digital/digital-sub-category";
import Addproduct from "../components/products/physical/add-product";
import Category from "../components/products/physical/category";
import Productdetail from "../components/products/physical/product-detail";
import Productlist from "../components/products/physical/product-list";
import Subcategory from "../components/products/physical/sub-category";
import Reports from "../components/reports/report";
import Orders from "../components/sales/orders";
import Transactionsales from "../components/sales/transactions-sales";
import Profile from "../components/settings/profile";
import Createuser from "../components/users/create-user";
import Listuser from "../components/users/list-user";
import Createvendors from "../components/vendors/create.vendors";
import Listvendors from "../components/vendors/list-vendors";
import Listobservation from "../components/observations/list-observation";
import Createobservation from "../components/observations/create-observation";
import Detailobservation from "../components/observations/detail-observation";
import Observationrubric from "../components/observations/observation-rubric";
import ScheulingPage from "../components/observations/scheuling-page";
import { useStateValue } from "../StateProvider";
import Edituser from "../components/users/edit-user";

const LayoutRoutes = () => {
  const [{ user }, dispatch] = useStateValue();
  async function fetchData() {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/${user.id}`,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await res.json();
      const specificData = {
        observations: data.observations,
        courses: data.courses,
      };
      dispatch({
        type: "SET_USER_DATA",
        payload: specificData,
      });
      console.log(specificData);
    } catch (error) {
      console.log(error.message);
    }
  }
  async function fetchCoursesAndUsers() {
    try {
      const usersres = await fetch(`${process.env.REACT_APP_BASE_URL}/users/`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const coursesres = await fetch(
        `${process.env.REACT_APP_BASE_URL}/courses/`,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const cdata = await coursesres.json();
      const udata = await usersres.json();

      dispatch({
        type: "SET_COURSES",
        payload: cdata,
      });
      dispatch({
        type: "SET_USERS",
        payload: udata,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchData();
    if (user.role === "Head_of_Department") fetchCoursesAndUsers();
  }, []);
  return (
    <Fragment>
      <Routes>
        <Route element={<App />}>
          <Route path={`${process.env.PUBLIC_URL}/`} element={<Dashboard />} />
          <Route
            path={`${process.env.PUBLIC_URL}/dashboard`}
            element={<Dashboard />}
          />

          {/* <Route
            path={`${process.env.PUBLIC_URL}/products/physical/category`}
            element={<Category />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/products/physical/sub-category`}
            element={<Subcategory />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/products/physical/product-list`}
            element={<Productlist />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/products/physical/product-detail`}
            element={<Productdetail />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/products/physical/add-product`}
            element={<Addproduct />}
          /> */}

          {/* <Route
            path={`${process.env.PUBLIC_URL}/products/digital/digital-category`}
            element={<Digitalcategory />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/products/digital/digital-sub-category`}
            element={<Digitalsubcategory />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/products/digital/digital-product-list`}
            element={<Digitalprolist />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/products/digital/digital-add-product`}
            element={<Digitaladdpro />}
          /> */}

          {/* <Route
            path={`${process.env.PUBLIC_URL}/sales/orders`}
            element={<Orders />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/sales/transactions`}
            element={<Transactionsales />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/coupons/list-coupons`}
            element={<ListCoupons />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/coupons/create-coupons`}
            element={<Createcoupons />}
          /> */}

          {/* <Route
            path={`${process.env.PUBLIC_URL}/pages/list-page`}
            element={<ListPages />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/pages/create-page`}
            element={<Createpage />}
          />

          <Route path={`${process.env.PUBLIC_URL}/media`} element={<Media />} />

          <Route
            path={`${process.env.PUBLIC_URL}/menus/list-menu`}
            element={<Listmenu />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/menus/create-menu`}
            element={<Createmenu />}
          /> */}

          <Route
            path={`${process.env.PUBLIC_URL}/users/list-user`}
            element={<Listuser />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/users/create-user`}
            element={<Createuser />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/edit-profile`}
            element={<Edituser />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/observations/list-observation`}
            element={<Listobservation />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/observations/detail-observation/:id`}
            element={<Detailobservation />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/observations/observation-rubric/:id`}
            element={<Observationrubric />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/observations/create-observation`}
            element={<Createobservation />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/observations/observation-scheduling/:id`}
            element={<ScheulingPage />}
          />

          {/* <Route
            path={`${process.env.PUBLIC_URL}/vendors/list_vendors`}
            element={<Listvendors />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/vendors/create-vendors`}
            element={<Createvendors />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/localization/transactions`}
            element={<Translations />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/localization/currency-rates`}
            element={<Rates />}
          /> */}
          {/* <Route
            path={`${process.env.PUBLIC_URL}/localization/taxes`}
            element={<Taxes />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/reports/report`}
            element={<Reports />}
          /> */}

          <Route
            path={`${process.env.PUBLIC_URL}/settings/profile`}
            element={<Profile />}
          />

          {/* <Route
            path={`${process.env.PUBLIC_URL}/invoice`}
            element={<Invoice />}
          /> */}

          {/* <Route
            path={`${process.env.PUBLIC_URL}/data-table`}
            element={<Datatable />}
          /> */}
        </Route>
      </Routes>
    </Fragment>
  );
};

export default LayoutRoutes;
