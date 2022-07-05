import React, { useEffect, useState } from 'react'
import useValidate from '../../hooks/useValidate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons'

import styles from './ValidateMessage.module.scss'

function ValidateMessage({ errors, name }) {
    const [hide, setHide] = useState(false)
    const [message, setMessage] = useState('')

    let msg = useValidate(errors, name)
    useEffect(()=>{
        setMessage(msg)
    },[msg])
    return (
        <div className={styles['validate-error']}>
            {!hide && message && (<>
                <span>{message}</span>
                <FontAwesomeIcon onClick={()=>setHide(true)} icon={faRectangleXmark} />
            </>)}
        </div>
    )
}

export default ValidateMessage