import React from 'react'
import { faDesktop, faHandHoldingDollar, faPercent } from '@fortawesome/free-solid-svg-icons';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';

import Overview from '../../components/Overview'
import NotificationSidebar from '../../components/NotificationSidebar'
import useFetch from '../../hooks/useFetch'

import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
const cl = classNames.bind(styles);

function Dashboard() {
    const { data: productData } = useFetch('/product')
    const { data: promotionData } = useFetch('/promotion')
    const { data: revenueData } = useFetch('/revenue?time=1M')
    const { data: chartData } = useFetch('/revenue/chart')

    return (
        <div>
            <div className="grid ultrawide">
                <div className="row">
                    <div className="col l-9 m-8 c-12">
                        <Overview>
                            <div className="row">
                                <div className="col l-4 m-6 c-12">
                                    <Overview.Item name='Products' amount={productData.length} lastAdded={
                                        productData.filter(item => moment(item.createdAt).isBetween(moment().subtract(24, 'hours'), moment())).length
                                    } icon={faDesktop} />
                                </div>
                                <div className="col l-4 m-6 c-12">
                                    <Overview.Item name='Promotions' amount={promotionData.length} lastAdded={
                                        promotionData.filter(item => moment(item.createdAt).isBetween(moment().subtract(24, 'hours'), moment())).length
                                    } icon={faPercent} />
                                </div>
                                <div className="col l-4 m-6 c-12">
                                    <Overview.Item name='Revenue' icon={faHandHoldingDollar} period="This month" revenue={
                                        revenueData.reduce((accumulator, item) => accumulator + item.filterTotal, 0)
                                    } />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col l-12 m-12 c-12">
                                    <ResponsiveContainer className={cl('chart')} width="100%" height={400}>
                                        <LineChart width={600} height={400} className={cl('chart')} data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                            <Line type="monotone" dataKey="total" name="Revenue" stroke="#8884d8" />
                                            {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </Overview>
                    </div>
                    <div className="col l-3 m-4 c-12">
                        <NotificationSidebar>

                        </NotificationSidebar>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dashboard