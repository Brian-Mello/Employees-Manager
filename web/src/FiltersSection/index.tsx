import React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import './styles.css';

export default function FiltersSection() {

    function handleOpenModal() {
        console.log("1")
    }

    return (
        <div id="filtes-section" className="container">
            <div className="filters">
                <legend>Gerenciador de Funcionários</legend>
                <Input label="Buscar" name="buscar" type="text"/>
                <Input label="Fitrar" name="Fitrar" type="text"/>
            </div>
            <div className="registrations">
                <legend>Cadastrar</legend>
                <Button onClick={handleOpenModal} name="Novo funcionário"/>
                <Button onClick={handleOpenModal} name="Novo cargo"/>
            </div>
        </div>
    )
}