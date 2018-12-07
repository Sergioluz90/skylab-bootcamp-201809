import React, { Component } from 'react'
import logic from '../../logic'
import UserCard from '../UserCard/UserCard';
import SelectorAge from '../SelectorAge/SelectorAge';
import Selector from '../Selector/Selector';
import Input from '../Input/Input';
import CheckBoxes from '../CheckBoxes/CheckBoxes';
import './home.css'


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
      ],
      listGender: [
        'male',
        'female'
      ],
      listSmoker: [
        'yes',
        'no'
      ]
    },
    users: null
  }

  componentDidMount = () => {
    this.setupDefaultOptions()
    this.handleConstructQuery(true)
  }

  componentWillReceiveProps(props) {

    let new_query = (props.query ? '/home/' + props.query : '/home/')
    if (this.state.query !== new_query)
      this.setState({ query: (new_query) }, () => {
        this.handleSearch()
      })
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
    let query = '/home/'

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


    let _query = query.match(/[/](.*)/)[1]
    _query = _query.match(/[/](.*)/)[1]
    if (_query === '') _query = 'all'

    try {
      logic.search(_query)
        .then((res) => {
          
          this.setState({ users: res })
        })
        .catch(err => {
          this.props.handleSetError(err.message)
        })
    } catch (err) {
      this.props.handleSetError(err.message)
    }
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
    const { listAges, languages, listGender, listSmoker } = this.state.default_info

    return <main className='home__main'>
      <div className='spacer--20'></div>
      <section className='container__home'>
        <div className='searcher__component'>
          <div className='searcher__header'>
            {(search_show_options) && <h3 className='margin--left'>Search</h3>}
            <a href='#'>
              <i className='fas fa-grip-horizontal' onClick={this.handleShowSearchOptions}></i>
            </a>

          </div>

          <div className='container__searcher'>


            <div className='searcher__options'>

              <ul>
                <li>
                  <a href='#'>
                    <i className='fas fa-comments searcher__option' value='lenguages' onClick={this.handleOptionSearch}></i>
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <i className='fas fa-user searcher__option' value='people' onClick={this.handleOptionSearch}></i>
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <i className='fas fa-map-marker-alt searcher__option' value='location' onClick={this.handleOptionSearch}></i>
                  </a>
                </li>
              </ul>
            </div>


            {(search_show_options) && <div className='component__searcher-options'>

              <Input
                title={'Username:'}
                placeholder={'Search user'}
                onChange={this.handleUsernameChange}
              />

              {(search_options === 'lenguages') && <div className='component__searcher-options--checkboxes'>

                <CheckBoxes
                  title={'You are looking for...'}
                  list={this.state.default_info.languages}
                  selectedList={offer_checkboxes}
                  onChange={this.handleOfferCheckboxChange}
                />

                <CheckBoxes
                  title={'They are looking for...'}
                  list={this.state.default_info.languages}
                  selectedList={searching_checkboxes}
                  onChange={this.handleSearchingCheckboxChange}
                />
              </div>}

              {(search_options === 'people') && <div>
                <div className='options__selectors--margin'>

                  <Selector
                    title={'Gender:'}
                    firstOption={'Select gender:'}
                    onSelect={this.handleGenderChange}
                    selected={selected_gender}
                    list={listGender}
                  />


                  <SelectorAge
                    title={'Age:'}
                    onSelectMinAge={this.handleMinAgeChange}
                    onSelectMaxAge={this.handleMaxAgeChange}
                    selectedMinAge={min_age}
                    selectedMaxAge={max_age}
                    list={listAges}
                  />

                  <Selector
                    title={'Smoker:'}
                    firstOption={'Not important'}
                    onSelect={this.handleSmokerChange}
                    selected={smoker}
                    list={listSmoker}
                  />

                </div>
              </div>}

              {(search_options === 'location') &&

                <Input
                  title={'City:'}
                  placeholder={'Search by city'}
                  onChange={this.handleCityChange}
                />}

              <div className='spacer--20'></div>

            </div>}
          </div>

        </div>


        <div className='results__component'>
          <div className='component'>
            <h3 className='center'>Results</h3>
          </div>

          <div className='wrapper__images'>

            {users && users.map((elem, index) => {
              return <div key={index} className='search-panel__profile'>
                <UserCard elem={elem} ></UserCard>
              </div>
            })}
          </div>

        </div>
      </section>
    </main>
  }

}


export default Home