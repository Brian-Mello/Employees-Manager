import React, { ButtonHTMLAttributes } from 'react';
import AddIcon from '@material-ui/icons/Add';
import './styles.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    name: string;
    type?: "submit";
    onClick?: React.MouseEventHandler<HTMLElement>;
}

const Button: React.FC<ButtonProps> = ({ name, onClick, type, ...rest }) => {
    return(
        <button 
            className="button-block"
            type={type} 
            onClick={onClick}
            {...rest}
        >
            {name}
            <AddIcon className="add-icon"/>
        </button>
    )
}

export default Button;