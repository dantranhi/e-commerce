import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import useValidate from '../../hooks/useValidate'

import styles from './ValidateMessage.module.scss'

function ValidateMessage({ errors, name }) {
    const [message, setMessage] = useState('')

    let msg = useValidate(errors, name)
    useEffect(() => {
        setMessage(msg)
    }, [msg])

    return (
        <div className={styles['validate-error']}>
            <span>{message}</span>
        </div>
    )
}

ValidateMessage.propTypes = {
    errors: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired
}

export default ValidateMessage