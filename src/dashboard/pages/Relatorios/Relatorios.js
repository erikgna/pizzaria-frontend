import React, {useEffect, useState} from 'react'

import { useGlobalContext } from '../../../context';
import { Select } from '../../components/Select/Select';
import { SelectThree } from '../../components/Select/SelectThree';
import { SelectTwo } from '../../components/Select/SelectTwo';
import './styles.css'

export const Relatorios = () => {
    const {getCharts, getMotoboy} = useGlobalContext()
    const [data, setData] = useState()
    const [monthlyMoney, setMonthlyMoney] = useState()
    const [motoboys, setMotoboys] = useState([])
    const [motoboy, setMotoboy] = useState()
    const [placa, setPlaca] = useState()

    const awaitCharts = async () => {
        const reciever = await getCharts("01")
        setData(reciever)
        const tempMotoboys = await getMotoboy()
        setMotoboys(tempMotoboys)
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
                    <h4>Pedidos por mês</h4>
                    <p>{data?.pedidosMensal} / mês</p>
                    <Select data={setData} />
                </div>
                <div>
                    <h4>Pedidos Finalizados</h4>
                    <p>{data?.finalizados} pedidos</p>
                </div>
                <div>
                    <h4>Faturamento Mensal</h4>
                    <p>R$ {monthlyMoney?.faturaMensal}</p>
                    <SelectTwo data={setMonthlyMoney} />
                </div>
                <div>
                    <h4>Entregas do Motoboy</h4>
                    <p>Total de entregas do mês: {motoboy?.somaTotal}</p>
                    <p>Rendimento do mês: R$ {motoboy?.somaMoney}</p>
                    <SelectThree data={setMotoboy} placaS={placa} />
                    <select onChange={(e) => setPlaca(e.target.value)}>
                        <option defaultValue hidden>Selecionar um Motoboy</option>
                        {motoboys?.map(({name, placa}) => (
                            <option key={placa} value={placa}>{name} - {placa}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}
