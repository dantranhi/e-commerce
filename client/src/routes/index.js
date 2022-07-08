import NewProduct from '../pages/NewProduct'
import Home from '../pages/Home'
import Detail from '../pages/Detail'
import ProductList from '../pages/ProductList'
import EditProduct from '../pages/EditProduct'
import Sidebar from '../components/Sidebar'
import {Login} from '../pages/Auth'
import AdminLayout from '../layouts/AdminLayout'

const routes = [
    { path: '/admin/product/create', component: NewProduct, layout: AdminLayout },
    { path: '/admin/product/:id', component: EditProduct, layout: AdminLayout },
    { path: '/product/:id', component: Detail },
    { path: '/product', component: Home },
    { path: '/admin/product', component: ProductList, layout: AdminLayout },
    { path: '/admin', component: Sidebar },
    { path: '/login', component: Login, layout: null },
    { path: '/', component: Home },
]

export default routes