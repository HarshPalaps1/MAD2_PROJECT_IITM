import manager_Home from "./components/manager_veiws/home.js";
import About from "./components/about.js";
import ContactUs from "./components/contact.js";
import Cart from "./components/acart.js";
import Posts from "./components/post.js";
import Sign_up from "./components/sign_up.js";
import Sign_in from "./components/sign_in.js";
import user_Home from "./components/user_fields/home.js";
import manager_category from "./components/manager_veiws/category.js"
import Admin_Home from "./components/admin_fields/home.js";
import Void from "./components/void.js"
import Name from "./components/manager_veiws/name.js";
import Admin_category from "./components/admin_fields/category.js";
import pending_Home from "./components/manager_veiws/pending.js";
import rejected_Home from "./components/manager_veiws/rejected.js";
import Admin_req from "./components/manager_veiws/ad_req.js";
import Manager_req from "./components/admin_fields/man_req.js";
import Admin_reject from "./components/admin_fields/ad_rejected.js";
import Admin_pending from "./components/admin_fields/ad_pending.js";
import Edit_cato from "./components/manager_veiws/edit_cato.js";
import ad_Edit_cato from "./components/admin_fields/ad_edit_cato.js";
import Edit_product from "./components/manager_veiws/edit_pro.js";
import user_Cart from "./components/user_fields/user_cart.js";
import User_Search from "./components/user_fields/user_search.js";
import man_summary from "./components/manager_veiws/man_summary.js";
const routes = [{
  name:"void",
  path: "/",
  component: Void,
},
{
  name:"Store_name",
  path: "/store_name",
  component: Name,
},
{
  name:"admin_category",
  path: "/admin_categorY/:id",
  component: Admin_category,
},
{
  name:"admin_reject",
  path: "/admin_rejecY/:id",
  component: Admin_reject,
},
{
  name:"admin_pending",
  path: "/admin_pending/:id",
  component: Admin_pending,
},
{
  name:"admin_edit_category",
  path: "/ad_edit_categorY/:id",
  component: ad_Edit_cato,
},
{
  name:"Manager_request",
  path: "/man_reQ/:id",
  component: Manager_req,
},
  {
    path: "/sign_up",
    component:Sign_up,
  },
  {
    name:"sing_iN",
    path: "/sign_iN",
    component:Sign_in,
  },
  {
    name:"manager_veiw",
    path: "/manager_homE",
    component: manager_Home,
  },
  {
    name:"manager_pending",
    path: "/pending_homE",
    component: pending_Home,
  },
  {
    name:"manager_rejected",
    path: "/rejected_homE",
    component: rejected_Home,
  },
  {
    name:"Manager_Summary",
    path: "/man_summary/:id",
    component: man_summary,
  },
  {
    name:"admin_eqr",
    path: "/admin_req_homE",
    component: Admin_req,
  },
  {
    name:"manager_category",
    path: "/manager_categorE/:id",
    component: manager_category,
  },
  {
    name:"Edit_Category",
    path: "/edit_categorE/:id",
    component: Edit_cato,
  },
  {
    name:"Edit_product",
    path: "/edit_producT/:id",
    component: Edit_product,
  },
  {
    name:"user_home",
    path: "/user_homE",
    component: user_Home,
  },
  {
    name:"user_cart",
    path: "/user_cart/:id",
    component: user_Cart,
  },
  {
    name:"user_Search",
    path: "/user_search/:id",
    component: User_Search,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/contact-us",
    component: ContactUs,
  },

  {
    path: "/cart",
    component: Cart,
  },
  {
    path: "/posts",
    component: Posts,
  },
  {
    name:"admin_home",
    path: "/admin_homE",
    component: Admin_Home,
  }
];

const router = new VueRouter({
  routes,
});

export default router;
