import React, { Component } from 'react'

class EditProfile extends Component {

  state = {
    user_info: null,
    default_info: {
      listAges: [],
      listHeight: [],
      listWeight: [],
      searching: [
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
      offer: [
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
    new_info: {
      name: null,
      email: null,
      skype: null,
      gender: null,
      age: null,
      height: null,
      weight: null,
      smoker: null,
      description: null,
      searching: [

      ],
      offer: [
      ]
    }
  }

  componentDidMount() {

    this.setState({ user_info: this.props.user_info })
    this.props.retrieveUserInfo()
    this.setupDefaultOptions()

  }

  setupDefaultOptions = () => {
    let list = []
    for (let i = 18; i < 100; i++) {
      list.push(i)
    }
    this.setState({ listAges: list })

    list = []
    for (let i = 150; i < 220; i += 5) {
      list.push(i)
    }
    this.setState({ listHeight: list })

    list = []
    for (let i = 44; i < 120; i += 2) {
      list.push(i)
    }
    this.setState({ listWeight: list })
  }

  componentWillReceiveProps(props) {

    this.setState({ user_info: props.user_info })
  }

  handleNameChange = event => {
    const _new_info = this.state.new_info
    _new_info.name = event.target.value

    this.setState({ new_info: _new_info })
  }

  handleEmailChange = event => {
    const _new_info = this.state.new_info
    _new_info.email = event.target.value

    this.setState({ new_info: _new_info })
  }

  handleSkypeChange = event => {
    const _new_info = this.state.new_info
    _new_info.skype = event.target.value

    this.setState({ new_info: _new_info })
  }

  handleGenderChange = event => {
    const _new_info = this.state.new_info
    _new_info.gender = event.target.value

    this.setState({ new_info: _new_info })
  }

  handleAgeChange = event => {
    const _new_info = this.state.new_info
    _new_info.age = event.target.value

    this.setState({ new_info: _new_info })
  }

  handleHeightChange = event => {
    const _new_info = this.state.new_info
    _new_info.height = event.target.value

    this.setState({ new_info: _new_info })
  }

  handleWeightChange = event => {
    const _new_info = this.state.new_info
    _new_info.weight = event.target.value

    this.setState({ new_info: _new_info })
  }

  handleSmokerChange = event => {
    const _new_info = this.state.new_info
    _new_info.smoker = event.target.value

    this.setState({ new_info: _new_info })
  }

  handleDescriptionChange = event => {
    const _new_info = this.state.new_info
    _new_info.description = event.target.value

    this.setState({ new_info: _new_info })
  }


  onSearchingClickHandler = this.onSearchingClickHandler.bind(this)
  onSearchingClickHandler(event) {
    event.preventDefault()

    let list = this.state.new_info.searching.findIndex(off => off === event.target.textContent)

    if (list >= 0)
      list = this.state.new_info.searching.filter(off => off !== event.target.textContent)

    else {

      list = this.state.new_info.searching
      list.push(event.target.textContent)
    }

    let _new_info = this.state.new_info
    _new_info.searching = list

    this.setState({ new_info: _new_info })
  }

  onOfferClickHandler = this.onOfferClickHandler.bind(this)
  onOfferClickHandler(event) {
    event.preventDefault()


    let list = this.state.new_info.offer.findIndex(off => off === event.target.textContent)

    if (list >= 0)
      list = this.state.new_info.offer.filter(off => off !== event.target.textContent)

    else {

      list = this.state.new_info.offer
      list.push(event.target.textContent)
    }

    let _new_info = this.state.new_info
    _new_info.offer = list

    this.setState({ new_info: _new_info })
  }



  render() {

    const { user_info, default_info, listAges, listHeight, listWeight, new_info } = this.state

    if (this.props.user_info) {
      return <main className='initial'>
        <section className='component profile--fixed'>
          <div className='container__profile-header'>
            <div className='container__image--profile'></div>
            <div className='margin--left'>
              <h2>{user_info && user_info.username}</h2>
              <p>Online</p>
            </div>

          </div>
        </section>

        <section className='container__profile'>
          <div className='container'>
            <div className='container--column '>
              <div className='spacer--20'></div>

              {user_info && <div className='component__profile margin--bottom'>
                <h2>Looking for..</h2>
                <div className='profile__data-container'>
                  {
                    default_info.searching.map((language, index) => {
                      let active, active2

                      if (user_info.searching) {
                        active = user_info.searching.includes(language)
                      }

                      if (new_info.searching) {
                        active2 = new_info.searching.includes(language)
                      }

                      if (active === active2)
                        active = false
                      else
                        active = true


                      return active ? <p key={index} className='component__profile language-tags active' onClick={this.onSearchingClickHandler}>{language}</p> : <p key={index} className='component__profile language-tags inactive' onClick={this.onSearchingClickHandler}>{language}</p>
                    })}
                </div>
              </div>}

              <div className='component__profile margin--bottom'>
                <h2>Profile</h2>

                {user_info && <div className='profile__data-container'>
                  <h3>Name:</h3>
                  <input onChange={this.handleNameChange} placeholder={user_info.name} />
                </div>}

                {user_info && <div className='profile__data-container'>
                  <h3>Email:</h3>
                  <input onChange={this.handleEmailChange} placeholder={user_info.email} />
                </div>}

                {user_info && <div className='profile__data-container'>
                  <h3>Skype:</h3>
                  <input onChange={this.handleSkypeChange} placeholder={user_info.skype} />
                </div>}

                {user_info && <div className='profile__data-container'>
                  <h3>Gender:</h3>
                  <select onChange={this.handleGenderChange}>
                    {user_info.gender ? <option defaultValue={user_info.gender}></option> : <option>Select your gender:</option>}

                    <option key={0} value='Male'>Male</option>
                    <option key={1} value='Female'>Female</option>
                  </select>
                </div>}

                {user_info && <div className='profile__data-container'>
                  <h3>Age:</h3>
                  <select onChange={this.handleAgeChange}>
                    {user_info.age ? <option defaultValue={user_info.age}></option> : <option>Select your age:</option>}
                    {
                      listAges && listAges.map((age, index) => {
                        return <option key={index} value={age}>{age}</option>
                      })
                    }
                  </select>
                </div>}

                {user_info && <div className='profile__data-container'>
                  <h3>Height:</h3>
                  <select onChange={this.handleHeightChange}>
                    {user_info.height ? <option defaultValue={user_info.height}></option> : <option>Select your height:</option>}
                    {
                      listHeight && listHeight.map((height, index) => {
                        return <option key={index} value={height}>{height} cm</option>
                      })
                    }
                  </select>
                </div>}

                {user_info && <div className='profile__data-container'>
                  <h3>Weight:</h3>
                  <select onChange={this.handleWeightChange}>
                    {user_info.weight ? <option defaultValue={user_info.weight}></option> : <option>Select your weight:</option>}
                    {
                      listWeight && listWeight.map((weight, index) => {
                        return <option key={index} value={weight}>{weight} kg</option>
                      })
                    }
                  </select>
                </div>}

                {user_info && <div className='profile__data-container'>
                  <h3>Smoker:</h3>
                  <select onChange={this.handleSmokerChange}>
                    {user_info.smoker ? <option defaultValue={user_info.smoker}></option> : <option value='null'>Do you smoke?</option>}

                    <option key={0} value='true'>yes</option>
                    <option key={1} value='false'>no</option>
                  </select>
                </div>}

              </div>

              {user_info && <div className='component__profile margin--bottom'>
                <h2>About me</h2>
                <div>
                  <textarea onChange={this.handleDescriptionChange} placeholder='Write a description to allow other people to know more about you' className='profile__textArea'></textarea>
                  <p>{user_info.description}</p>
                </div>

              </div>}

              {user_info && <div className='component__profile margin--bottom'>
                <h2>My language knowledges</h2>
                <div className='profile__data-container'>
                  {default_info.offer && user_info.offer &&
                    default_info.offer.map((language, index) => {
                      let active, active2

                      if (user_info.offer) {
                        active = user_info.offer.includes(language)
                      }

                      if (new_info.offer) {
                        active2 = new_info.offer.includes(language)
                      }

                      if (active === active2)
                        active = false
                      else
                        active = true


                      return active ? <p key={index} className='component__profile language-tags active' onClick={this.onOfferClickHandler}>{language}</p> : <p key={index}className='component__profile language-tags inactive' onClick={this.onOfferClickHandler}>{language}</p>
                    })}
                </div>
              </div>}

            </div>
          </div>
          <button className='bttn bttn--save-profile'>Save</button>
        </section>
      </main>


    } else {
      return null
    }
  }

}


export default EditProfile