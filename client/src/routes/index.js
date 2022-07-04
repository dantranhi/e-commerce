import NewProduct from '../pages/NewProduct'
import Home from '../pages/Home'
import Detail from '../pages/Detail'
import Sidebar from '../components/Sidebar'
import {Login} from '../pages/Auth'
import AdminLayout from '../layouts/AdminLayout'

const routes = [
    { id: 5, path: '/products/:id', component: Detail },
    { id: 1, path: '/', component: Home },
    { id: 2, path: '/products', component: Home },
    { id: 3, path: '/login', component: Login, layout: null },
    { id: 4, path: '/products/create', component: NewProduct, layout: AdminLayout },
    { id: 6, path: '/admin', component: Sidebar },
]

export default routes