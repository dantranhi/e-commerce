import NewProduct from '../pages/NewProduct'
import SearchProduct from '../pages/SearchProduct'
import ProductList from '../pages/ProductList'

import PromotionList from '../pages/PromotionList'
import NewPromotion from '../pages/NewPromotion'
import EditPromotion from '../pages/EditPromotion'

import NewOrder from '../pages/NewOrder'
import OrderList from '../pages/OrderList'
import MyOrders from '../pages/MyOrders'

import Revenue from '../pages/Revenue'

import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'
import Detail from '../pages/Detail'
import UserList from '../pages/UserList'
import AdminLayout from '../layouts/AdminLayout'
import { Login, Register } from '../pages/Auth'

import Profile from '../pages/Profile'
import { EditProfile, NewProfile } from '../pages/Profile'
import EditProduct from '../pages/EditProduct'

import NotFound from '../pages/404'

const routes = [
    { path: '/admin/product/create', component: NewProduct, layout: AdminLayout },
    { path: '/admin/product/:id', component: EditProduct, layout: AdminLayout },
    { path: '/admin/promotion/create', component: NewPromotion, layout: AdminLayout },
    { path: '/admin/promotion/:id', component: EditPromotion, layout: AdminLayout },
    { path: '/order/my-orders/:id', component: MyOrders },
    { path: '/order/:id', component: NewOrder, layout: null },
    { path: '/product/:id', component: Detail },
    { path: '/product', component: SearchProduct },
    { path: '/profile/:userId', component: Profile },
    { path: '/profile/:userId/create', component: NewProfile },
    { path: '/profile/:userId/:id', component: EditProfile },
    { path: '/admin/product', component: ProductList, layout: AdminLayout },
    { path: '/admin/promotion', component: PromotionList, layout: AdminLayout },
    { path: '/admin/order', component: OrderList, layout: AdminLayout },
    { path: '/admin/user', component: UserList, layout: AdminLayout },
    { path: '/admin/revenue', component: Revenue, layout: AdminLayout },
    { path: '/admin', component: Dashboard, layout: AdminLayout },
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Register, layout: null },
    { path: '/', component: Home },
    { path: '*', component: NotFound },
]

export default routes