import React, { Component } from 'react'
import logic from '../logic'
import UserCard from './UserCard';

class Home extends Component {

  state = {
    search_show_options: true,
    search_options: 'lenguages',
    query: '',
    username: null,
    offer_checkboxes: [],
    searching_checkboxes: [],
    selected_gender: null,
    min_age: null,
    max_age: null,
    smoker: null,
    city: null,
    default_info: {
      listAges: [],
      listHeight: [],
      listWeight: [],
      languages: [
        'spanish',
        'english',
        'chinese (mandarin)',
        'hindi',
        'arabic',
        'portuguese',
        'bengali',
        'russian',
        'french',
        'german',
        'italian',
        'catalan'
      ]
    },
    users: null
  }

  componentDidMount = () => {
    this.setupDefaultOptions()
    this.handleConstructQuery(true)
  }

  setupDefaultOptions = () => {
    let default_info = this.state.default_info
    let list = []
    for (let i = 18; i < 100; i++) {
      list.push(i)
    }
    default_info.listAges = list

    list = []
    for (let i = 150; i < 220; i += 5) {
      list.push(i)
    }
    default_info.listHeight = list


    list = []
    for (let i = 44; i < 120; i += 2) {
      list.push(i)
    }
    default_info.listWeight = list
    this.setState({ default_info })
  }

  handleOfferCheckboxChange = event => {
    let _checkboxes = this.state.offer_checkboxes

    let active = _checkboxes.includes(event.target.value)

    if (active) {
      _checkboxes = _checkboxes.filter(item => item !== event.target.value)
    } else {
      _checkboxes.push(event.target.value)
    }

    this.setState({ offer_checkboxes: _checkboxes }, () => {

      this.handleConstructQuery(true)
    })

  }

  handleSearchingCheckboxChange = event => {
    let _checkboxes = this.state.searching_checkboxes

    let active = _checkboxes.includes(event.target.value)

    if (active) {
      _checkboxes = _checkboxes.filter(item => item !== event.target.value)
    } else {
      _checkboxes.push(event.target.value)
    }

    this.setState({ searching_checkboxes: _checkboxes }, () => {

      this.handleConstructQuery(true)
    })
  }

  handleConstructQuery = (search) => {
    let query = '/home/search?'

    if (this.state.username !== null && this.state.username.length > 2) {
      query += '&' + 'username' + '=' + this.state.username
    }

    if (this.state.offer_checkboxes.length) {

      query += '&' + 'offer' + '='
      this.state.offer_checkboxes.forEach((item, index) => {
        if (index !== 0) query += '+' + item
        else query += item
      })
    }

    if (this.state.searching_checkboxes.length) {

      query += '&' + 'searching' + '='
      this.state.searching_checkboxes.forEach((item, index) => {
        if (index !== 0) query += '+' + item
        else query += item
      })
    }

    if (this.state.selected_gender) {
      query += '&' + 'gender' + '=' + this.state.selected_gender
    }

    if (this.state.min_age) {
      query += '&' + 'minAge' + '=' + this.state.min_age
    }

    if (this.state.max_age) {
      query += '&' + 'maxAge' + '=' + this.state.max_age
    }

    if (this.state.smoker !== null) {
      query += '&' + 'smoker' + '=' + this.state.smoker
    }

    if (this.state.city !== null && this.state.city.length > 2) {
      query += '&' + 'city' + '=' + this.state.city
    }

    this.setState({ query }, () => {
      if (query != '') this.props.history.push(`${query}`)
      if (search) this.handleSearch()
    })
  }

  handleSearch = () => {
    let query = this.state.query

    let _query = query.match(/[?](.*)/)[1]
    if (_query === '') _query = 'all'

    logic.search(_query)
      .then((res) => {
        this.setState({ users: res })
      })
      .catch(err => { })
  }

  handleRenderFilterType = (type, filters) => {
    return (<div className='ul__filters'>
      <li className='component margin--left margin-bottom'>
        <h4>{type}</h4>
      </li>

      {filters.map((elem, index) => {
        return <li className='component margin--left  '>
          <a href='#'> x </a>
          <p>{elem}</p>
        </li>
      })}
    </div>
    )
  }

  handleShowSearchOptions = (event) => {
    event.preventDefault()
    const flag = this.state.search_show_options
    this.setState({ search_show_options: !flag })
  }

  handleOptionSearch = (event) => {
    event.preventDefault()
    this.setState({ search_options: event.target.attributes.value.value, search_show_options: true })
  }

  handleUsernameChange = event => {
    this.setState({ username: event.target.value }, () => {
      this.handleConstructQuery(true)
    })
  }

  handleCityChange = event => {
    this.setState({ city: event.target.value }, () => {
      this.handleConstructQuery(true)
    })
  }

  handleGenderChange = (event) => {
    let info = event.target.value
    if (info.includes('select') || info.includes('matter')) info = null
    this.setState({ selected_gender: info }, () => {

      this.handleConstructQuery(true)
    })
  }

  handleMinAgeChange = (event) => {
    let info = event.target.value
    if (info.includes('age')) info = null
    this.setState({ min_age: info }, () => {

      this.handleConstructQuery(true)
    })
  }

  handleMaxAgeChange = (event) => {
    let info = event.target.value
    if (info.includes('age')) info = null
    this.setState({ max_age: info }, () => {
      this.handleConstructQuery(true)
    })
  }

  handleSmokerChange = event => {
    let info = event.target.value
    if (info === 'Not important' || info.includes('matter')) info = null
    this.setState({ smoker: info }, () => {

      this.handleConstructQuery(true)
    })
  }

  render() {

    const { users, offer_checkboxes, searching_checkboxes, search_options, search_show_options, selected_gender, min_age, max_age, smoker } = this.state
    const { listAges, languages } = this.state.default_info

    console.log('render')

    return <main className='container initial'>
      <div className='spacer--20'></div>
      <section className='container--row'>
        <div className='searcher component'>
          <div className='component searcher__header'>
            {(search_show_options) && <h3 className='margin--left'>Búsqueda</h3>}
            <a href='#'>
              <i className='fas fa-grip-horizontal' onClick={this.handleShowSearchOptions}></i>
            </a>

          </div>

          <div className='container--row'>


            <div className='searcher--panel component no-shadow  '>

              <ul>
                <li>
                  <a href='#'>
                    <i className='fas fa-comments' value='lenguages' onClick={this.handleOptionSearch}></i>
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <i className='fas fa-user' value='people' onClick={this.handleOptionSearch}></i>
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <i className='fas fa-map-marker-alt' value='location' onClick={this.handleOptionSearch}></i>
                  </a>
                </li>
              </ul>
            </div>


            {(search_show_options) && <div className='component searcher--options no-shadow'>
              <h3 className='margin--left'>Username:</h3>
              <div className='center component'>
                <input
                  type='text'
                  placeholder='Buscar usuario'
                  className=' search-bar component'
                  onChange={this.handleUsernameChange}
                />
              </div>

              {(search_options === 'lenguages') && <div>
                <div className='margin--left'>
                  <h4>You are looking for...</h4>
                  {this.state.default_info.languages.map((item, index) => {
                    if (offer_checkboxes.includes(item))
                      return <div key={index}> <input checked='true' type='checkbox' value={item} onChange={this.handleOfferCheckboxChange} /> {item}<br /> </div>
                    else
                      return <div key={index}> <input type='checkbox' value={item} onChange={this.handleOfferCheckboxChange} /> {item}<br /> </div>

                  })}

                </div>
                <div className='margin--left'>
                  <h4>They are looking for...</h4>
                  {this.state.default_info.languages.map((item, index) => {
                    if (searching_checkboxes.includes(item))
                      return <div key={index}> <input checked='true' type='checkbox' value={item} onChange={this.handleSearchingCheckboxChange} /> {item}<br /> </div>
                    else
                      return <div key={index}> <input type='checkbox' value={item} onChange={this.handleSearchingCheckboxChange} /> {item}<br /> </div>
                  })}

                </div>

              </div>}

              {(search_options === 'people') && <div>
                <div className='margin--left'>

                  <h3>Gender:</h3>
                  <select className='profile__select' onChange={this.handleGenderChange}>
                    {selected_gender ? <option value={selected_gender}>Selected: {selected_gender}</option> : <option value={null}> Select gender:</option>}
                    {selected_gender && <option value={null}>It doesn't matter!</option>}

                    <option key={0} value='Male'>Male</option>
                    <option key={1} value='Female'>Female</option>
                  </select>

                  <h3>Age:</h3>
                  <div>
                    <select className='profile__select' onChange={this.handleMinAgeChange}>
                      {min_age ? <option value={min_age}>Selected: {min_age}</option> : <option value={null}> Minimum age:</option>}
                      {min_age && <option value={null}> No min age</option>}
                      {listAges && listAges.map((age, index) => {
                        if (max_age == null || max_age >= age)
                          return <option key={index} value={age}>{age}</option>
                        else
                          return
                      })}
                    </select>
                    <br></br>
                    <select className='profile__select' onChange={this.handleMaxAgeChange}>
                      {max_age ? <option value={max_age}>Selected:{max_age}</option> : <option value={null}> Maximum age:</option>}
                      {max_age && <option value={null}> No max age</option>}
                      {listAges && listAges.map((age, index) => {
                        if (min_age == null || min_age <= age)
                          return <option key={index} value={age}>{age}</option>
                        else
                          return
                      })}
                    </select>
                  </div>

                  <h3>Smoker:</h3>
                  <select className='profile__select' onChange={this.handleSmokerChange}>
                    {smoker ? <option value={smoker}>Selected: {smoker}</option> : <option value='null'>Not important</option>}
                    {smoker && <option value={null}> It doesn't matter</option>}
                    <option key={0} value='true'>yes</option>
                    <option key={1} value='false'>no</option>
                  </select>
                </div>
              </div>}

              {(search_options === 'location') &&
                <div >
                  <h3 className='margin--left'>City:</h3>

                  <input
                    type='text'
                    placeholder='Search by city'
                    className=' search-bar component'
                    onChange={this.handleCityChange}
                  />


                </div>}

            </div>}
          </div>

        </div>


        <div className='results component'>
          <div className='component'>
            <h3 className='center'>Resultados</h3>
          </div>

          <div className='wrapper__images center'>

            {users && users.map((elem, index) => {
              return <div key={index} className='search-panel__profile'>
                <UserCard elem={elem}></UserCard>
              </div>
            })}
          </div>

        </div>
      </section>
    </main>
  }

}


export default Home