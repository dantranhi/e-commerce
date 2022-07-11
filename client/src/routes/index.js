import NewProduct from '../pages/NewProduct'
import NewPromotion from '../pages/NewPromotion'
import EditPromotion from '../pages/EditPromotion'
import Home from '../pages/Home'
import Detail from '../pages/Detail'
import ProductList from '../pages/ProductList'
import PromotionList from '../pages/PromotionList'
import EditProduct from '../pages/EditProduct'
import Sidebar from '../components/Sidebar'
import {Login} from '../pages/Auth'
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
    { path: '/admin', component: Sidebar },
    { path: '/login', component: Login, layout: null },
    { path: '/', component: Home },
]

export default routes