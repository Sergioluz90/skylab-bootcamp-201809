import React, { Component } from 'react'
import logic from '../logic'
import UserCard from './UserCard';

class Home extends Component {

    state = {
        query: '',
        offer_checkboxes: [],
        searching_checkboxes: [],
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
        users: null
    }

    componentDidMount = () => {
        logic.search('all')
            .then((res) => {
                this.setState({ users: res })
            })
            .catch(err => { debugger })
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

            this.handleSearch()
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

            this.handleSearch()
        })
    }

    handleSearch = () => {
        let query = '/home/search?'

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

        this.setState({ query })
        if (query != '') this.props.history.push(`${query}`)

        let _query = query.match(/[?](.*)/)[1]

        if (_query === '') _query = 'all'


        logic.search(_query)
            .then((res) => {

                this.setState({ users: res })
            })
            .catch(err => { debugger })
    }

    handleRenderFilterType = (type, filters) => {

        return (<div className='ul__filters'>
            <li className="component margin--left margin-bottom">
                <h4>{type}</h4>
            </li>

            {filters.map((elem, index) => {
                return <li className="component margin--left  ">
                    <a href="#"> x </a>
                    <p>{elem}</p>
                </li>
            })}
        </div>
        )

    }

    // componentWillReceiveProps(newProps) {
    //     
    //     if (newProps.history !== this.props.history) {
    //         logic.search(this.state.query)
    //             .then(() => {  })
    //     }
    // }

    render() {

        const { users, offer_checkboxes, searching_checkboxes } = this.state

        return <main className="container initial">
            <div className="spacer--20"></div>
            <section className="container--row">
                <div className="searcher component">
                    <div className="component searcher__header">
                        <h3 className="margin--left">Búsqueda</h3>
                        <a href="#">
                            <i className="fas fa-grip-horizontal"></i>
                        </a>

                    </div>

                    <div className="container--row">
                        <div className="searcher--panel component no-shadow  ">

                            <ul>
                                <li>
                                    <a href="#">
                                        <i className="fas fa-comments"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fas fa-user"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fas fa-map-marker-alt"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="component searcher--options no-shadow">
                            <div className="center component">
                                <input type="text" placeholder="Buscar usuario" className=" search-bar component" />
                            </div>
                            <div>
                                <div className="margin--left">
                                    <h4>You are looking for...</h4>
                                    {this.state.languages.map((item, index) => {
                                        return <div key={index}> <input type="checkbox" value={item} onChange={this.handleOfferCheckboxChange} /> {item}<br /> </div>
                                    })}

                                </div>
                                <div className="margin--left">
                                    <h4>They are looking for...</h4>
                                    {this.state.languages.map((item, index) => {
                                        return <div key={index}> <input type="checkbox" value={item} onChange={this.handleSearchingCheckboxChange} /> {item}<br /> </div>
                                    })}

                                </div>

                            </div>
                        </div>
                    </div>

                </div>


                <div className="results component">
                    <div className="component">
                        <h3 className="center">Resultados</h3>
                    </div>
                    <div className="component ">
                        <div className="margin--left">

                            <ul className="ul__filters ">

                                {(offer_checkboxes.length > 0) && this.handleRenderFilterType('Looking for:', offer_checkboxes)}
                                {(searching_checkboxes.length > 0) && this.handleRenderFilterType('Searching:', searching_checkboxes)}

                                <li className="component margin--left margin-bottom">
                                    <h4>Filtros:</h4>
                                </li>

                                <li className="component margin--left  ">
                                    <a href="#"> x </a>
                                    <p>Filtro</p>
                                </li>
                                <li className="component margin--left  ">
                                    <a href="#"> x </a>
                                    <p>Filtro</p>
                                </li>

                                <li className="component margin--left  ">
                                    <a href="#"> x </a>
                                    <p>Filtro</p>
                                </li>
                                <li className="component margin--left  ">
                                    <a href="#"> x </a>
                                    <p>Filtro</p>
                                </li>
                                <li className="component margin--left  ">
                                    <a href="#"> x </a>
                                    <p>Filtro</p>
                                </li>
                                <li className="component margin--left  ">
                                    <a href="#"> x </a>
                                    <p>Filtro</p>
                                </li>
                                <li className="component margin--left  ">
                                    <a href="#"> x </a>
                                    <p>Filtro</p>
                                </li>
                                <li className="component margin--left  ">
                                    <a href="#"> x </a>
                                    <p>Filtro</p>
                                </li>
                                <li className="component margin--left  ">
                                    <a href="#"> x </a>
                                    <p>Filtro</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="wrapper__images center">

                        {users && users.map((elem, index) => {
                            return <div key={index} className="search-panel__profile">
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