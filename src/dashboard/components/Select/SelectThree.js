import React from 'react'
import { useGlobalContext } from '../../../context'

export const SelectThree = ({data, placaS}) => {
    const {getMotoboy} = useGlobalContext()

    const refresh = async (e) => {
        const take = e.target.value
        const motoboys = await getMotoboy()
        
        let somaMoney = 0
        let somaTotal = 0
        motoboys.forEach(({placa, rendimentos}) => {
            if(placa === placaS){
                rendimentos.entregas.forEach((obj) => {
                    if(obj.date.substring(5,7) === take){
                        somaTotal += obj.count
                    } 
                })
                rendimentos.dinheiro.forEach((obj) => {
                    if(obj.date.substring(5,7) === take){
                        somaMoney += obj.price
                    }
                })
            }
        })
        data({somaMoney, somaTotal})
    }

    return(
        <select onChange={(e) => refresh(e)}>
            <option value="01">Janeiro</option>
            <option value="02">Fevereiro</option>
            <option value="03">Março</option>
            <option value="04">Abril</option>
            <option value="05">Maio</option>
            <option value="06">Junho</option>
            <option value="07">Julho</option>
            <option value="08">Agosto</option>
            <option value="09">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
        </select>
    )
}