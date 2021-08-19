import React, {useEffect, useState} from 'react'

import { useGlobalContext } from '../../../context';
import './styles.css'

export const Relatorios = () => {
    const {getCharts, getMotoboy} = useGlobalContext()
    const [data, setData] = useState()
    const [monthlyMoney, setMonthlyMoney] = useState(0)
    const [perMonth, setPerMonth] = useState(0)
    const [motoboys, setMotoboys] = useState([])
    const [motoboy, setMotoboy] = useState()
    const [placaS, setPlacaS] = useState()
    const [inicial, setInicial] = useState('')
    const [final, setFinal] = useState('')
    const [inicial2, setInicial2] = useState('')
    const [final2, setFinal2] = useState('')
    const [inicial3, setInicial3] = useState('')
    const [final3, setFinal3] = useState('')

    const awaitCharts = async () => {
        const reciever = await getCharts("01")
        setData(reciever)
        const tempMotoboys = await getMotoboy()
        setMotoboys(tempMotoboys)
    }

    const handleSubmit = async (value) => {
        if(value === 0){
            const toSend = inicial + ',' + final
            const taked = await getCharts(toSend)
            setPerMonth(taked.pedidosMensal)
        }
        if(value === 1){
            const toSend = inicial2 + ',' + final2
            const taked = await getCharts(toSend)
            setMonthlyMoney(taked.faturaMensal)
        }
        if(value === 2){
            const motoboys = await getMotoboy()
            let somaMoney = 0
            let somaTotal = 0
            motoboys.forEach(({placa, rendimentos}) => {
                if(placa === placaS){
                    rendimentos.entregas.forEach((obj) => {
                        if(inicial3 < Date.parse(obj.date) && final3 > Date.parse(obj.date)){
                            somaTotal += obj.count
                        } 
                    })
                    rendimentos.dinheiro.forEach((obj) => {
                        if(inicial3 < Date.parse(obj.date) && final3 > Date.parse(obj.date)){
                            somaMoney += obj.price
                        }
                    })
                }
            })
            setMotoboy({somaMoney, somaTotal})
        }
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
                    <p>{perMonth} / mês</p>
                    <div>
                        <p>Data inicial</p>
                        <input type="date" onChange={(e) => setInicial(Date.parse(e.target.value))} />
                        <p>Data final</p>
                        <input type="date" onChange={(e) => setFinal(Date.parse(e.target.value))} />
                        <input type="submit" value="Enviar" onClick={() => handleSubmit(0)} />
                    </div>
                </div>
                <div>
                    <h4>Pedidos Finalizados</h4>
                    <p>{data?.finalizados} pedidos</p>
                </div>
                <div>
                    <h4>Faturamento Mensal</h4>
                    <p>R$ {monthlyMoney}</p>
                    <div>
                        <p>Data inicial</p>
                        <input type="date" onChange={(e) => setInicial2(Date.parse(e.target.value))} />
                        <p>Data final</p>
                        <input type="date" onChange={(e) => setFinal2(Date.parse(e.target.value))} />
                        <input type="submit" value="Enviar" onClick={() => handleSubmit(1)} />
                    </div>
                </div>
                <div>
                    <h4>Entregas do Motoboy</h4>
                    <p>Total de entregas do mês: {motoboy?.somaTotal}</p>
                    <p>Rendimento do mês: R$ {motoboy?.somaMoney}</p>
                    <div>
                        <p>Data inicial</p>
                        <input type="date" onChange={(e) => setInicial3(Date.parse(e.target.value))} />
                        <p>Data final</p>
                        <input type="date" onChange={(e) => setFinal3(Date.parse(e.target.value))} />
                    </div>
                    <select onChange={(e) => setPlacaS(e.target.value)}>
                        <option defaultValue hidden>Selecionar um Motoboy</option>
                        {motoboys?.map(({name, placa}) => (
                            <option key={placa} value={placa}>{name} - {placa}</option>
                        ))}
                    </select>
                    <input type="submit" value="Enviar" onClick={() => handleSubmit(2)} />
                </div>
            </div>
        </div>
    )
}
