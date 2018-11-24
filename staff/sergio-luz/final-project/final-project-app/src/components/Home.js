import React, { Component } from 'react'

class Home extends Component {

    render() {

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
                                    <h4>Estas buscando...</h4>
                                    <input type="checkbox" name="checkbox" /> I have a bike<br />
                                    <input type="checkbox" name="checkbox" /> I have a bike<br />
                                    <input type="checkbox" name="checkbox" /> I have a bike<br />
                                    <input type="checkbox" name="checkbox" /> I have a bike<br />
                                    <input type="checkbox" name="checkbox" /> I have a bike<br />
                                    <input type="checkbox" name="checkbox" /> I have a bike<br />
                                </div>
                                <div className="margin--left">
                                    <h4>Está buscando...</h4>
                                    <input type="checkbox" name="checkbox" /> I have a bike<br />
                                    <input type="checkbox" name="checkbox" /> I have a bike<br />
                                    <input type="checkbox" name="checkbox" /> I have a bike<br />
                                    <input type="checkbox" name="checkbox" /> I have a bike<br />
                                    <input type="checkbox" name="checkbox" /> I have a bike<br />
                                    <input type="checkbox" name="checkbox" /> I have a bike<br />
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
                                <li className="component margin--left  ">
                                    <a href="#"> x </a>
                                    <p>Filtro</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="wrapper__images center">
                        <div className="search-panel__profile">
                            <div className="container__image"></div>
                            <div className="search-panel__profile-info">hola adios muy buenas</div>
                            <div className="search-panel__profile-text"> Info personal</div>
                        </div>
                        <div className="search-panel__profile">
                            <div className="container__image"></div>
                            <div className="search-panel__profile-info">hola adios muy buenas</div>
                            <div className="search-panel__profile-text"> Info personal</div>
                        </div>
                        <div className="search-panel__profile">
                            <div className="container__image"></div>
                            <div className="search-panel__profile-info">hola adios muy buenas</div>
                            <div className="search-panel__profile-text"> Info personal</div>
                        </div>
                        <div className="search-panel__profile">
                            <div className="container__image"></div>
                            <div className="search-panel__profile-info">hola adios muy buenas</div>
                            <div className="search-panel__profile-text"> Info personal</div>
                        </div>
                        <div className="search-panel__profile">
                            <div className="container__image"></div>
                            <div className="search-panel__profile-info">hola adios muy buenas</div>
                            <div className="search-panel__profile-text"> Info personal</div>
                        </div>
                        <div className="search-panel__profile">
                            <div className="container__image"></div>
                            <div className="search-panel__profile-info">hola adios muy buenas</div>
                            <div className="search-panel__profile-text"> Info personal</div>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    }

}


export default Home