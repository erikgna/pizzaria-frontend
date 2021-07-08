import React from 'react'

import { MdMotorcycle, MdModeEdit, MdZoomIn} from 'react-icons/md'

export const NovoPedido = ({info, handleClick}) => {
    const data = info.date.substring(11, 16)
    return (
        <div id="novopedido" onClick={() => handleClick(info)}>
            <div>
                <MdMotorcycle />
                <p>{data}</p>
                <h6>{info.client}</h6>
            </div>
            <div>
                <MdZoomIn />
                <MdModeEdit />
            </div>
        </div>
    )
}
