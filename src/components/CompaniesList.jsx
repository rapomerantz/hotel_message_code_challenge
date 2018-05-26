import React, { Component } from 'react'

import CompaniesJson from '../providedData/Companies.json'

export default class CompaniesList extends Component {
  render() {

    let companiesArray = []; 

    for (const company in CompaniesJson) {
        companiesArray.push(
            <p>{company}</p>
        )
    }

    return (
      <div>

          {JSON.stringify(CompaniesJson, null, 3)}
          {companiesArray}
        
      </div>
    )
  }
}
