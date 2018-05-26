import React, { Component } from 'react'

import CompaniesJson from '../providedData/Companies.json'

export default class CompanySelect extends Component {

  handleSelect = (event) => {
    console.log('in handleSelect, event.target.name', event.target.name);
    this.props.handleChange()
  }


  render() {

    //.map over JSON object to create select options for each company
    let companySelectOptions = CompaniesJson.map((company => {
      return <option value={company.company}>{company.company} - {company.city}</option>
    }))
    
    return (
      <div>

        <select name="companySelect" 
                id="companySelect"
                onClick={this.handleSelect}>
          {companySelectOptions}
        </select>   

      </div>
    )
  }
}
