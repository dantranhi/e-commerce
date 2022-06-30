import NewProduct from '../pages/NewProduct'
import Home from '../pages/Home'
import Detail from '../pages/Detail'
import {Login} from '../pages/Auth'

const routes = [
    { id: 5, path: '/products/:id', component: Detail },
    { id: 1, path: '/', component: Home },
    { id: 2, path: '/products', component: Home },
    { id: 3, path: '/login', component: Login, layout: null },
    { id: 4, path: '/products/create', component: NewProduct },
]

export default routes