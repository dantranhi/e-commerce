import React from 'react'
import { faDesktop, faHandHoldingDollar, faPercent } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import Overview from '../../components/Overview'
import NotificationSidebar from '../../components/NotificationSidebar'
import useFetch from '../../hooks/useFetch'

function Dashboard() {
    const { data: productData, loading: productLoading } = useFetch('/product')
    const { data: promotionData, loading: promotionLoading } = useFetch('/promotion')

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
                                    <Overview.Item name='Icome' icon={faHandHoldingDollar} lastAdded={0} />
                                </div>
                            </div>
                        </Overview>
                    </div>
                    <div className="col l-3 m-4 c-12">
                        <NotificationSidebar></NotificationSidebar>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dashboard