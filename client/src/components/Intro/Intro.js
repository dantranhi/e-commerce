import { useState } from 'react'

import IntroItem from './IntroItem'
import cpuImg from '../../assets/img/intro/cpu.png'
import ramImg from '../../assets/img/intro/ram.png'
import gpuImg from '../../assets/img/intro/graphic-card.png'
import powerImg from '../../assets/img/intro/power-supply.png'
import hddImg from '../../assets/img/intro/hard-disk.png'
import ssdImg from '../../assets/img/intro/ssd.png'
import pcImg from '../../assets/img/intro/pc.png'

import classNames from 'classnames/bind';
import styles from './Intro.module.scss';
const cl = classNames.bind(styles);

const data = [
    {
        image: cpuImg,
        name: 'CPU',
        desc: 'A processor (CPU) is the logic circuitry that responds to and processes the basic instructions that drive a computer.'
    },
    {
        image: ramImg,
        name: 'RAM',
        desc: 'A processor (CPU) is the logic circuitry that responds to and processes the basic instructions that drive a computer.'
    },
    {
        image: gpuImg,
        name: 'GPU',
        desc: 'A processor (CPU) is the logic circuitry that responds to and processes the basic instructions that drive a computer.'
    },
    {
        image: powerImg,
        name: 'Power supply',
        desc: 'A processor (CPU) is the logic circuitry that responds to and processes the basic instructions that drive a computer.'
    },
    {
        image: hddImg,
        name: 'Hard drive',
        desc: 'A processor (CPU) is the logic circuitry that responds to and processes the basic instructions that drive a computer.'
    },
    {
        image: ssdImg,
        name: 'SSD',
        desc: 'A processor (CPU) is the logic circuitry that responds to and processes the basic instructions that drive a computer.'
    },
]

function Intro() {
    const [showComputer, setShowComputer] = useState(false)
    return (
        <div className={cl('outer-wrapper')}>
            <div className="grid wide">
                <div className="row" style={{'position': 'relative'}}>
                    <div className="col l-6 m-12 c-12">
                        <div className={cl('left', {hidden: showComputer})}>
                            {data.map((item, index) => {
                                if (index < data.length / 2) return <IntroItem key={item.name} {...item}></IntroItem>
                                return <div key={item.name}></div>
                            })}
                        </div>

                    </div>
                    <div className="col l-6 m-12 c-12">
                        <div className={cl('right', {hidden: showComputer})}>
                            {data.map((item, index) => {
                                if (index >= data.length / 2) return <IntroItem reverse key={item.name} {...item}></IntroItem>
                                return <div key={item.name}></div>
                            })}
                        </div>
                    </div>
                    <div onClick={() => setShowComputer(prev=>!prev)} className={cl('computer', {animate: showComputer})}>
                        <img src={pcImg} alt="" className={cl('computer-icon')} />
                        <div className={cl('computer-info', {animate: showComputer})}>
                            <div className={cl('computer-heading')}>Fully functional computer</div>
                            <div className={cl('computer-desc')}>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat architecto neque harum, iste autem at, quos magnam beatae quis non doloribus dolorum praesentium porro eius iure. Vitae at incidunt libero consectetur distinctio, ratione voluptas et, alias, dolorem ea itaque quas.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// <a href="https://www.flaticon.com/free-icons/ram" title="ram icons">Ram icons created by Freepik - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/psu" title="psu icons">Psu icons created by Triangle Squad - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/hard-disk" title="hard disk icons">Hard disk icons created by Vectors Market - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/ssd" title="ssd icons">Ssd icons created by Hilmy Abiyyu A. - Flaticon</a>

export default Intro