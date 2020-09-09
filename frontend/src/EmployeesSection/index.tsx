import React from 'react';
import EmployeeCard from '../components/EmployeeCard';
import './styles.css';

export default function EmployeesSection() {
    return(
        <section id="employees-section" className="container">
            <legend>Funcionários</legend>
            <div className="employees-container">
                <div className="employees">
                    <div className="employee-list">
                        <EmployeeCard name="Brian Mello" role="dev"/>
                    </div>
                </div>
                <nav className="pagination-nav">
                    1 | 2 | 3 | 4 | 5 | 6 | 7
                </nav>
            </div>
        </section>
    )
}