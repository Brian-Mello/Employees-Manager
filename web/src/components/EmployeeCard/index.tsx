import React from 'react';
import './styles.css';

interface EmployeeCardProps {
    name: string;
    role: string; 
    onClick?: React.MouseEventHandler<HTMLElement>;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({name, role, onClick}) => {
    return(
        <div onClick={onClick} className="employee-card">
            <p>Nome: {name}</p>
            <p>Cargo: {role}</p>
        </div>
    )
}

export default EmployeeCard;