import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classNames from 'classnames/bind';
import styles from './Button.module.scss';
const cl = classNames.bind(styles);


function Button({ to, onClick, leftIcon, className, filled, children, ...passProps }) {
    let Comp = 'button'
    const classes = cl('wrapper',{
        filled
    })
    let props = {
        onClick,
        [className]: className,
        ...passProps
    }
    if (to) {
        Comp = Link
        props.to = to
    }
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <FontAwesomeIcon className={cl('icon')} icon={leftIcon} />}
            {children}
        </Comp>
    )
}

export default Button