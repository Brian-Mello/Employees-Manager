import React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import './styles.css';

export default function FiltersSection() {

    function handleOpenModal() {
        console.log("1")
    }

    return (
        <div id="filtes-section" className="container">
            <div className="filters">
                <legend>Gerenciador de Funcionários</legend>
                <Input 
                    label="Buscar" 
                    name="buscar" 
                    type="text"
                />
                <Select 
                    label="Filtrar" 
                    name="filter" 
                    options={[
                        {value: "valor++", label: `Valor +`},
                        {value: "valor--", label: `Valor -`},
                        {value: "name++", label: `Name +`},
                        {value: "name--", label: `Name -`}
                    ]}
                />
            </div>
            <div className="registrations">
                <legend>Cadastrar</legend>
                <Button 
                    onClick={handleOpenModal} 
                    name="Novo funcionário"
                />
                <Button 
                    onClick={handleOpenModal} 
                    name="Novo cargo"
                />
            </div>
        </div>
    )
}