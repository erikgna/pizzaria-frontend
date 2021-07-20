import React from 'react'
import PhoneInput from 'react-phone-input-2'

import './styles.css'

export const Input = ({title, type, length, label, place, required, handleChange, value, styles}) => {
    return (
        <div id='input' style={styles}>
            <label>{label} {!required&& '(opcional)'}</label>
            {title?.substring(0,5) === 'phone'? 
                <PhoneInput 
                    name={title}
                    specialLabel
                    country='br'
                    placeholder="Telefone/Celular" 
                    className="phone"
                    onChange={(e) => handleChange(title, e)} 
                    value={value}
                    required
                />
                : 
                <input 
                    name={title}
                    type={type} 
                    placeholder={place} 
                    maxLength={length} 
                    onChange={(e) => handleChange('', e)} 
                    value={value}
                    required={required}
                />
        }
        </div>
    )
}
