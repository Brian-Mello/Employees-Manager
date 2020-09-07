import React from 'react';
import EmployeesSection from '../EmployeesSection';
import FiltersSection from '../FiltersSection';
import './styles.css'
class EmployeeManager extends React.Component {

    render() {
        return(
            <div id="employee-manager" className="container">
                <FiltersSection/>
                <EmployeesSection/>
            </div>
        )
    }
}


export default EmployeeManager;