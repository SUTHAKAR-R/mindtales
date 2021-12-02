import React from 'react'

const Input = ({ required, label, type, placeholder, error, defaultValue, value, setValue }) => {

	return (
		<>
			<label>{label}</label>
			<input 
				required={required} 
				type={type} 
				placeholder={placeholder} 
				className={!!error ? 'error' : ''}
				defaultValue={defaultValue}
				value={value}
				onChange={e => setValue(e.target.value)}
			/>
		</>
	)
}

export default Input