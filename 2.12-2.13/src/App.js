import React from 'react'
import axios from 'axios'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentDidMount() {
    axios.get('https://restcountries.eu/rest/v2/all').then( response => {
      this.setState({
        countries: response.data
      })
    })
  }

  handleChange = event => {
    this.setState({
      filter: event.target.value
    })
  }

  handleClick = filter => {
    this.setState({
      filter
    })
  }

  render() {

    const filteredCountries = this.state.countries.filter( country => {
      return country.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) > -1
    })

    const countries = filteredCountries.map( country => {
      return (
        <li 
          key={country.name}
          onClick={() => this.handleClick(country.name)}>
          {country.name}
        </li>
      )
    })

    return (
      <div>
        find countries:
        <input
          onChange={this.handleChange}
          value={this.state.filter} />

        {filteredCountries &&
         filteredCountries.length === 1 ?
          <div>
            <h1>{filteredCountries[0].name}</h1>
            <p>capital: {filteredCountries[0].capital}</p>
            <p>population: {filteredCountries[0].population}</p>
            <img src={filteredCountries[0].flag} />
          </div> :
          null
        }

        {countries &&
         countries.length > 1 &&
         countries.length <= 10 ?
          <ul> {countries} </ul> :
          null
        }

        {countries &&
         countries.length > 10 ?
          <p>too many matches, specify another filter</p> :
          null
        }
      </div>
    )
  }
}

export default App;
