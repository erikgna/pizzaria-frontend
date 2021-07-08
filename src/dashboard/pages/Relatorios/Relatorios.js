import React, {useEffect, useState} from 'react'

import { useGlobalContext } from '../../../context';
import { Select } from '../../components/Select/Select';
import './styles.css'

export const Relatorios = () => {
    const {getCharts} = useGlobalContext()
    const [data, setData] = useState()

    const awaitCharts = async () => {
        const reciever = await getCharts("01")
        setData(reciever)
    }

    useEffect(() => {
        awaitCharts() // eslint-disable-next-line
    }, [])

    return (
        <div className="charts-100">
            <h2>Relatórios</h2>
            <div className="charts">
                <div>
                    <h4>Faturamento Total</h4>
                    <p>R$ {data?.total}</p>
                </div>
                <div>
                    <h4>Ticket Médio</h4>
                    <p>R$ {data?.ticket}</p>
                </div>
                <div>
                    <h4>Total de Clintes Cadastrados</h4>
                    <p>{data?.users} clientes</p>
                </div>
                <div>
                    <h4>Pedidos por mês</h4>
                    <h3>{data?.pedidosMensal} / mês</h3>
                    <Select data={setData} />
                </div>
                <div>
                    <h4>Pedidos Finalizados</h4>
                    <p>{data?.finalizados} pedidos</p>
                </div>
                <div>
                    <h4>Faturamento Mensal</h4>
                    <h3>R$ {data?.faturaMensal}</h3>
                </div>
            </div>
        </div>
    )
}
