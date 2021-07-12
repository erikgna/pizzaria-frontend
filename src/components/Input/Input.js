import React from 'react'
import PhoneInput from 'react-phone-input-2'

import './styles.css'

export const Input = ({name, type, length, label, place, required, handleChange, value, styles}) => {
    return (
        <div id='input' style={styles}>
            <label>{label} {!required&& '(opcional)'}</label>
            {name === 'phone'? 
                <PhoneInput 
                    name={name}
                    specialLabel
                    country='br'
                    placeholder="Telefone/Celular" 
                    className="phone"
                    onChange={(e) => handleChange('phone', e)} 
                    value={value}
                    required
                />
                : 
                <input 
                    name={name}
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
