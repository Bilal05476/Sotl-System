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
import EditProfile from "../components/settings/edit-profile";
import Createcourses from "../components/courses/create-courses";
import Listcourses from "../components/courses/list-courses";

const URL = process.env.PUBLIC_URL;

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
      dispatch({
        type: "SET_USER_DATA",
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  async function fetchHodData() {
    try {
      const usersres = await fetch(`${process.env.REACT_APP_BASE_URL}/users/`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const courseres = await fetch(
        `${process.env.REACT_APP_BASE_URL}/courses/`,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const udata = await usersres.json();
      const cdata = await courseres.json();
      dispatch({
        type: "SET_USERS",
        payload: udata,
      });
      dispatch({
        type: "SET_COURSES",
        payload: cdata,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (user.role === "Head_of_Department") fetchHodData();
    fetchData();
  }, []);

  return (
    <Fragment>
      <Routes>
        <Route element={<App />}>
          <Route path={`${URL}/`} element={<Dashboard />} />
          <Route path={`${URL}/dashboard`} element={<Dashboard />} />

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
            path={`${URL}/observations/create-observation`}
            element={<Createobservation />}
          />
          <Route
            path={`${URL}/observations/observation-scheduling/:id`}
            element={<ScheulingPage />}
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
