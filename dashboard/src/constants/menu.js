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
  Clipboard,
  UserPlus,
  User,
  Book,
  BookOpen,
  FileText,
  Mail,
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
    title: "Observations",
    icon: Clipboard,
    type: "sub",
    badgeType: "primary",
    active: false,
    children: [
      {
        path: "/observations/list-observation",
        title: "All Observation",
        type: "link",
      },
      {
        path: "/observations/prompt-observation",
        title: "Observation Prompt",
        type: "link",
      },
    ],
  },
  {
    path: "/courses/list-courses",
    title: "Courses",
    icon: Book,
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
        path: "/user/campus-directors",
        title: "Campus Directors",
        type: "link",
      },
      {
        path: "/user/head-of-departments",
        title: "Head of Departments",
        type: "link",
      },
      {
        path: "/user/observers",
        title: "Observers",
        type: "link",
      },
      {
        path: "/user/faculty",
        title: "Faculties",
        type: "link",
      },
    ],
  },

  {
    title: "Academic Plans",
    icon: FileText,
    type: "sub",
    active: false,
    children: [
      {
        path: "/plan/teaching-plan",
        title: "Teaching Plan",
        type: "link",
      },
      {
        path: "/plan/reflection-plan",
        title: "Reflection Plan",
        type: "link",
      },
    ],
  },
  {
    title: "Email Templates",
    icon: Mail,
    type: "sub",
    active: false,
    children: [
      {
        path: "/email/new-user",
        title: "New User",
        type: "link",
      },
      {
        path: "/email/initiate-observation",
        title: "Initiate Observation",
        type: "link",
      },
      {
        path: "/email/update-observation",
        title: "Update Observation",
        type: "link",
      },
      {
        path: "/email/observation-prompt",
        title: "Observation Prompt",
        type: "link",
      },
    ],
  },
  {
    title: "Profile",
    icon: User,
    path: "/settings/profile",
    type: "link",
    badgeType: "primary",
    active: false,
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
      // {
      //   path: "/users/observers",
      //   title: "Observers",
      //   type: "link",
      // },
      // {
      //   path: "/users/faculty",
      //   title: "Faculty",
      //   type: "link",
      // },
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
        title: "Initiate Observation",
        type: "link",
      },
    ],
  },

  {
    title: "Courses",
    icon: Book,
    type: "sub",
    active: false,
    children: [
      {
        path: "/courses/list-courses",
        title: "All Courses",
        type: "link",
      },
      {
        path: "/courses/create-courses",
        title: "Create Courses",
        type: "link",
      },
      {
        path: "/courses/assign-courses",
        title: "Assign Courses",
        type: "link",
      },
    ],
  },

  {
    title: "Profile",
    icon: User,
    path: "/settings/profile",
    type: "link",
    badgeType: "primary",
    active: false,
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
    title: "Profile",
    icon: User,
    path: "/settings/profile",
    type: "link",
    badgeType: "primary",
    active: false,
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
  {
    title: "Observations",
    icon: Clipboard,
    type: "link",
    active: false,
    path: "/observations/list-observation",
  },
  // {
  //   path: "/",
  //   title: "Courses",
  //   icon: BookOpen,
  //   type: "link",
  //   badgeType: "primary",
  //   active: false,
  // },

  {
    title: "Profile",
    icon: User,
    path: "/settings/profile",
    type: "link",
    badgeType: "primary",
    active: false,
  },
];
