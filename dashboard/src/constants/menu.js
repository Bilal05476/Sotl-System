// {
//     title: 'Products', icon: Box, type: 'sub', active: false, children: [
//         {
//             title: 'Physical', type: 'sub', active: false, children: [
//                 { path: '/products/physical/category', title: 'Category', type: 'link' },
//                 { path: '/products/physical/sub-category', title: 'Sub Category', type: 'link' },
//                 { path: '/products/physical/product-list', title: 'Product List', type: 'link' },
//                 { path: '/products/physical/product-detail', title: 'Product Detail', type: 'link' },
//                 { path: '/products/physical/add-product', title: 'Add Product', type: 'link' },
//             ]
//         },
//         {
//             title: 'digital', type: 'sub', active: false, children: [
//                 { path: '/products/digital/digital-category', title: 'Category', type: 'link' },
//                 { path: '/products/digital/digital-sub-category', title: 'Sub Category', type: 'link' },
//                 { path: '/products/digital/digital-product-list', title: 'Product List', type: 'link' },
//                 { path: '/products/digital/digital-add-product', title: 'Add Product', type: 'link' },
//             ]
//         },
//     ]
// },

import {
  Home,
  Box,
  DollarSign,
  Tag,
  Clipboard,
  Camera,
  AlignLeft,
  UserPlus,
  Users,
  Chrome,
  BarChart,
  Settings,
  Archive,
  LogIn,
} from "react-feather";

export const MENUITEMS = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: Home,
    type: "link",
    badgeType: "primary",
    active: false,
  },

  {
    path: "/observations/list-observation",
    title: "Observations",
    icon: Clipboard,
    type: "link",
    badgeType: "primary",
    active: false,
  },

  {
    title: "Users",
    icon: UserPlus,
    type: "sub",
    active: false,
    children: [
      { path: "/users/list-user", title: "All Users", type: "link" },
      {
        path: "/users/campus-directors",
        title: "Campus Directors",
        type: "link",
      },
      {
        path: "/users/head-of-departments",
        title: "Head of Departments",
        type: "link",
      },
      {
        path: "/users/observers",
        title: "Faculty Observers",
        type: "link",
      },
      {
        path: "/users/faculty",
        title: "Faculty Members",
        type: "link",
      },
      { path: "/users/create-user", title: "Create User", type: "link" },
    ],
  },

  {
    title: "Settings",
    icon: Settings,
    type: "sub",
    children: [
      { path: "/settings/profile", title: "Your Profile", type: "link" },
      { path: "/settings/logout", title: "Logout", type: "link" },
    ],
  },
];

export const HODMENU = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: Home,
    type: "link",
    badgeType: "primary",
    active: false,
  },

  {
    title: "Users",
    icon: UserPlus,
    type: "sub",
    active: false,
    children: [
      { path: "/users/list-user", title: "All Users", type: "link" },
      {
        path: "/users/observers",
        title: "Faculty Observers",
        type: "link",
      },
      {
        path: "/users/faculty",
        title: "Faculty Members",
        type: "link",
      },
      { path: "/users/create-user", title: "Create User", type: "link" },
    ],
  },

  {
    title: "Observations",
    icon: Clipboard,
    type: "sub",
    active: false,
    children: [
      {
        path: "/observations/list-observation",
        title: "All Observations",
        type: "link",
      },
      {
        path: "/observations/create-observation",
        title: "Create Observation",
        type: "link",
      },
    ],
  },

  {
    title: "Settings",
    icon: Settings,
    type: "sub",
    children: [
      { path: "/settings/profile", title: "Your Profile", type: "link" },
      { path: "/settings/logout", title: "Logout", type: "link" },
    ],
  },
];

export const FACULTYMENU = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: Home,
    type: "link",
    badgeType: "primary",
    active: false,
  },

  {
    title: "Observations",
    icon: Clipboard,
    type: "link",
    active: false,
    path: "/observations/list-observation",
  },
  {
    path: "/",
    title: "Courses",
    icon: Home,
    type: "link",
    badgeType: "primary",
    active: false,
  },

  {
    title: "Settings",
    icon: Settings,
    type: "sub",
    children: [
      { path: "/settings/profile", title: "Your Profile", type: "link" },
      { path: "/settings/logout", title: "Logout", type: "link" },
    ],
  },
];

export const OBSERVERMENU = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: Home,
    type: "link",
    badgeType: "primary",
    active: false,
  },
];
