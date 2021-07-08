import React from 'react'
import LoadingSpin from 'react-loading-spin';

import './styles.css'

export const Loading = () => {
    return (
        <div id="loading">
            <LoadingSpin />
            <h4>Carregando...</h4>
        </div>
    )
}
