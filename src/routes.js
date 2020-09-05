/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Customers from "./views/Customers/Customers";
import Orders from "./views/Orders/Orders"
import Icons from "views/Icons.js";
import Notifications from "views/Notifications.js";
import TableList from "views/TableList.js";
import UserProfile from "views/UserProfile.js";
import WaterTypes from "./views/WaterTypes/WaterTypes";
import Products from "./views/Products/Products";

let routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/Customers",
    name: "Customers",
    icon: "tim-icons icon-align-center",
    component: Customers,
    layout: "/admin"
  },
  {
    path: "/Products",
    name: "Products",
    icon: "tim-icons icon-coins",
    component: Products,
    layout: "/admin"
  },
  {
    path: "/Orders",
    name: "Orders",
    icon: "tim-icons icon-cart",
    component: Orders,
    layout: "/admin"
  },
  {
    path: "/watertypes",
    name: "Water-Type",
    icon: "tim-icons icon-compass-05",
    component: WaterTypes,
    layout: "/admin"
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "tim-icons icon-atom",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "tim-icons icon-bell-55",
  //   component: Notifications,
  //   layout: "/admin"
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "tim-icons icon-single-02",
  //   component: UserProfile,
  //   layout: "/admin"
  // },
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   icon: "tim-icons icon-puzzle-10",
  //   component: TableList,
  //   layout: "/admin"
  // },


];
export default routes;
