import React from 'react'

import { Clients } from '../Clients/Clients'
import { Relatorios } from '../Relatorios/Relatorios'
import './styles.css'

export const Inicio = () => {
    return (
        <div className="inicio">
            <Relatorios />
            <div className="mobile-divider"></div>
            <Clients />
        </div>
    )
}
