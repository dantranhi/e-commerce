import React from 'react'

import { ReactComponent as Svg } from '../../assets/img/loading.svg'

function AnimatedLoading({height, width}) {
    return (
        // SVG part goes here
        <Svg width={width} height={height}/>
    )
}

export default AnimatedLoading