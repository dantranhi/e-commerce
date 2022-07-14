import NewProduct from '../pages/NewProduct'
import NewPromotion from '../pages/NewPromotion'
import EditPromotion from '../pages/EditPromotion'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'
import Detail from '../pages/Detail'
import ProductList from '../pages/ProductList'
import PromotionList from '../pages/PromotionList'
import UserList from '../pages/UserList'
import EditProduct from '../pages/EditProduct'
import {Login, Register} from '../pages/Auth'
import AdminLayout from '../layouts/AdminLayout'

const routes = [
    { path: '/admin/product/create', component: NewProduct, layout: AdminLayout },
    { path: '/admin/product/:id', component: EditProduct, layout: AdminLayout },
    { path: '/admin/promotion/create', component: NewPromotion, layout: AdminLayout },
    { path: '/admin/promotion/:id', component: EditPromotion, layout: AdminLayout },
    { path: '/product/:id', component: Detail },
    { path: '/product', component: Home },
    { path: '/admin/product', component: ProductList, layout: AdminLayout },
    { path: '/admin/promotion', component: PromotionList, layout: AdminLayout },
    { path: '/admin/user', component: UserList, layout: AdminLayout },
    { path: '/admin', component: Dashboard, layout: AdminLayout },
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Register, layout: null },
    { path: '/', component: Home },
]

export default routes