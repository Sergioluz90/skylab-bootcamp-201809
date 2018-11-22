import React, { Component } from 'react'

class Home extends Component {

    render() {

        return <main class="container initial">
            <div class="spacer--20"></div>
            <section class="container--row">
                <div class="searcher component">
                    <div class="component searcher__header">
                        <h3 class="margin--left">Búsqueda</h3>
                        <a href="#">
                            <i class="fas fa-grip-horizontal"></i>
                        </a>

                    </div>

                    <div class="container--row">
                        <div class="searcher--panel component no-shadow  ">

                            <ul>
                                <li>
                                    <a href="#">
                                        <i class="fas fa-comments"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="fas fa-user"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="fas fa-map-marker-alt"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="component searcher--options no-shadow">
                            <div class="center component">
                                <input type="text" placeholder="Buscar usuario" class=" search-bar component" />
                            </div>
                            <div>
                                <div class="margin--left">
                                    <h4>Estas buscando...</h4>
                                    <input type="checkbox" name="checkbox" /> I have a bike<br />
                                    <input type="checkbox" name="checkbox" /> I have a bike<br />
                                    <input type="checkbox" name="checkbox" /> I have a bike<br />
                                    <input type="checkbox" name="checkbox" /> I have a bike<br />
                                    <input type="checkbox" name="checkbox" /> I have a bike<br />
                                    <input type="checkbox" name="checkbox" /> I have a bike<br />
                                </div>
                                <div class="margin--left">
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


                <div class="results component">
                    <div class="component">
                        <h3 class="center">Resultados</h3>
                    </div>
                    <div class="component ">
                        <div class="margin--left">

                            <ul class="ul__filters ">
                                <li class="component margin--left margin-bottom">
                                    <h4>Filtros:</h4>
                                </li>
                                <li class="component margin--left  ">
                                    <a href="#"> x </a>
                                    <p>Filtro</p>
                                </li>
                                <li class="component margin--left  ">
                                    <a href="#"> x </a>
                                    <p>Filtro</p>
                                </li>
                                <li class="component margin--left  ">
                                    <a href="#"> x </a>
                                    <p>Filtro</p>
                                </li>

                                <li class="component margin--left  ">
                                    <a href="#"> x </a>
                                    <p>Filtro</p>
                                </li>
                                <li class="component margin--left  ">
                                    <a href="#"> x </a>
                                    <p>Filtro</p>
                                </li>
                                <li class="component margin--left  ">
                                    <a href="#"> x </a>
                                    <p>Filtro</p>
                                </li>
                                <li class="component margin--left  ">
                                    <a href="#"> x </a>
                                    <p>Filtro</p>
                                </li>
                                <li class="component margin--left  ">
                                    <a href="#"> x </a>
                                    <p>Filtro</p>
                                </li>
                                <li class="component margin--left  ">
                                    <a href="#"> x </a>
                                    <p>Filtro</p>
                                </li>
                                <li class="component margin--left  ">
                                    <a href="#"> x </a>
                                    <p>Filtro</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="wrapper__images center">
                        <div class="search-panel__profile">
                            <div class="container__image"></div>
                            <div class="search-panel__profile-info">hola adios muy buenas</div>
                            <div class="search-panel__profile-text"> Info personal</div>
                        </div>
                        <div class="search-panel__profile">
                            <div class="container__image"></div>
                            <div class="search-panel__profile-info">hola adios muy buenas</div>
                            <div class="search-panel__profile-text"> Info personal</div>
                        </div>
                        <div class="search-panel__profile">
                            <div class="container__image"></div>
                            <div class="search-panel__profile-info">hola adios muy buenas</div>
                            <div class="search-panel__profile-text"> Info personal</div>
                        </div>
                        <div class="search-panel__profile">
                            <div class="container__image"></div>
                            <div class="search-panel__profile-info">hola adios muy buenas</div>
                            <div class="search-panel__profile-text"> Info personal</div>
                        </div>
                        <div class="search-panel__profile">
                            <div class="container__image"></div>
                            <div class="search-panel__profile-info">hola adios muy buenas</div>
                            <div class="search-panel__profile-text"> Info personal</div>
                        </div>
                        <div class="search-panel__profile">
                            <div class="container__image"></div>
                            <div class="search-panel__profile-info">hola adios muy buenas</div>
                            <div class="search-panel__profile-text"> Info personal</div>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    }

}


export default Home