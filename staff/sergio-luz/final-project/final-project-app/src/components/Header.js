import React, { Component } from 'react'

class Header extends Component {

    render() {

        return (<header class="headerPage">
            <nav class="head__Nav">
                <div class="container">
                    <ul class="ul__Nav">
                        <li>
                            <h1 class="logo">Logo</h1>
                        </li>

                    </ul>
                </div>

                <div>
                    <img class="profile-image__Nav" src="./nobody_m.original.jpg" alt="" />
                </div>
            </nav>

            <aside class="head__Notify">
                <div class="container">
                    <ul class="ul__Nav">
                        <li class="li__Nav"><a class="button__Nav" href="#">Buscar</a></li>
                        <li class="li__Nav"><a class="button__Nav" href="#"></a></li>
                        <li class="li__Nav"><a class="button__Nav" href="#"></a></li>
                    </ul>
                </div>
            </aside>

        </header>)
    }

}


export default Header