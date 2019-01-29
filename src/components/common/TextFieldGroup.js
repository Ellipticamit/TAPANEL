import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export const TextFieldGroup = ({
    name,
    placeholder,
    label,
    error,
    type,
    value,
    onChange
}) => {
    return (
        <div className={classnames('form-group', { 'has-error': error})}>
            <label>{label}</label>
            <input 
                className='form-control form-control-lg'
                type={type}
                value={value}
                name={name}
                placeholder={placeholder} 
                onChange={onChange}
            />
            {error && <div className="alert-danger">{error}</div>}
        </div>
    );
}

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

TextFieldGroup.defaultProps = {
    type: 'text'
}