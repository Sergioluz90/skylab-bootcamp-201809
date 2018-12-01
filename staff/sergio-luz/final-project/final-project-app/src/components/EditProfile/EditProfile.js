import React, { Component } from 'react'
import logic from '../../logic'

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
      receives: null,
      moves: null,
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

  handleCityChange = event => {
    const _new_info = this.state.new_info
    _new_info.city = event.target.value

    this.setState({ new_info: _new_info })
  }

  handleUploadImage = event => {
    let image
    event ? image = event.target.files[0] : image = this.state.user_info.profileImage
    logic.uploadImage(image)
      .then(() => {

        this.props.retrieveUserInfo()
      })
  }

  handleDeleteImage = () => {
    let user = this.state.user_info
    user.profileImage = null
    this.setState({ user_info: user }, () => {
      this.handleUploadImage()
    })
  }

  handleUpdateProfile = (event) => {
    event.preventDefault()
    const { new_info, user_info } = this.state

    logic.updateProfile(user_info.id, new_info.name, new_info.email, new_info.skype, new_info.age, new_info.gender, new_info.height, new_info.weight, new_info.smoker, new_info.description, new_info.receives, new_info.moves, new_info.city, new_info.offer, new_info.searching)
      .then(() => {

        let new_info = {
          name: null,
          email: null,
          skype: null,
          gender: null,
          age: null,
          height: null,
          weight: null,
          smoker: null,
          description: null,
          receives: null,
          moves: null,
          searching: [

          ],
          offer: [
          ]
        }
        this.setState({ new_info })
        this.props.retrieveUserInfo()
      })
  }

  handleDeleteSkype = (event) => {
    event.preventDefault()
    let info = this.state.new_info

    if (event.target.checked) {
      info.skype = 'delete'
      this.setState({ new_info: info })
    }
  }

  handleDeleteDescription = event => {
    event.preventDefault()

    let info = this.state.new_info
    if (event.target.checked) {
      info.description = 'delete'
      this.setState({ new_info: info })
    }
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

  handleDeleteAccount = event => {
    console.log('delete account')
    logic.deleteAccount()
      .then(() => logic.logout())
      .then(() => this.props.history.push(`/`))
  }


  render() {

    console.log('render edit profile')
    const { user_info, default_info, listAges, listHeight, listWeight, new_info } = this.state

    if (this.props.user_info) {
      return <main className='initial__profile'>

        <section className='container__profile'>
          <div>
            <form className='bttn bttn--upload-image' encType="multipart/form-data">
              <label className='label__upload-image'>
                <input className='input__image' type="file" name="avatar" onChange={this.handleUploadImage} />
                Upload image
              </label>
            </form>
            
            <button className='bttn bttn--delete-image' onClick={this.handleDeleteImage} >Delete image</button>

          </div>

          <div className='container'>
            <div className='container--column '>

              <div className='spacer--20'></div>

              <section>
                <img className="profile__cover-image" src="https://image.freepik.com/free-photo/wall-wallpaper-concrete-colored-painted-textured-concept_53876-31799.jpg"></img>


                <div className='container__image--profile'>
                  <div className='profile__image-box'>
                    {user_info && <img src={user_info.profileImage ? user_info.profileImage : 'https://res.cloudinary.com/db2aaxmvg/image/upload/v1543488064/nobody_m.original.jpg'} alt="Image did not load..."
                      className='edit-profile__image'
                    />}
                  </div>
                </div>
                <div className='profile__username'>
                  <h2>{user_info && user_info.username}</h2>
                  {user_info && <div className='profile__data-container'>
                    <h3>City:</h3>
                    <input className='profile__input' onChange={this.handleCityChange} placeholder={user_info.city} />
                  </div>}
                </div>
              </section>


              {user_info && <div className='component__profile profile__margin--bottom'>
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






              <div className='component__profile profile__margin--bottom'>

                <h2>Profile</h2>

                {user_info && <div className='profile__data-container'>
                  <h3>Name:</h3>
                  <input className='profile__input' onChange={this.handleNameChange} placeholder={user_info.name} />
                </div>}

                {user_info && <div className='profile__data-container'>
                  <h3>Email:</h3>
                  <input className='profile__input' onChange={this.handleEmailChange} placeholder={user_info.email} />
                </div>}

                {user_info && <div className='profile__data-container'>
                  <h3>Skype:</h3>
                  <input className='profile__input' onChange={this.handleSkypeChange} placeholder={user_info.skype ? user_info.skype : 'type your skype'} />
                  <input type='checkbox' value='delete skype' onChange={this.handleDeleteSkype} /> Delete skype <br />
                </div>}

                {user_info && <div className='profile__data-container'>
                  <h3>Gender:</h3>
                  <select className='profile__select' onChange={this.handleGenderChange}>
                    {user_info.gender ? <option value={user_info.gender}>{user_info.gender}</option> : <option value={null}>Select your gender:</option>}
                    {user_info.gender && <option value={'delete'}>Don't show gender</option>}

                    <option key={0} value='Male'>Male</option>
                    <option key={1} value='Female'>Female</option>
                  </select>
                </div>}

                {user_info && <div className='profile__data-container'>
                  <h3>Age:</h3>
                  <select className='profile__select' onChange={this.handleAgeChange}>
                    {user_info.age ? <option value={user_info.age}>{user_info.age}</option> : <option value={null}>Select your age:</option>}
                    {user_info.age && <option value={'delete'}>Don't show age</option>}
                    {listAges && listAges.map((age, index) => {
                      return <option key={index} value={age}>{age}</option>
                    })
                    }
                  </select>
                </div>}

                {user_info && <div className='profile__data-container'>
                  <h3>Height:</h3>
                  <select className='profile__select' onChange={this.handleHeightChange}>
                    {user_info.height ? <option value={user_info.height}>{user_info.height} cm</option> : <option value={null}>Select your height:</option>}
                    {user_info.height && <option value={'delete'}>Don't show height</option>}
                    {listHeight && listHeight.map((height, index) => {
                      return <option key={index} value={height}>{height} cm</option>
                    })
                    }
                  </select>
                </div>}

                {user_info && <div className='profile__data-container'>
                  <h3>Weight:</h3>
                  <select className='profile__select' onChange={this.handleWeightChange}>
                    {user_info.weight ? <option value={user_info.weight}>{user_info.weight} kg</option> : <option value={null}>Select your weight:</option>}
                    {user_info.weight && <option value={'delete'}>Don't show weight</option>}
                    {listWeight && listWeight.map((weight, index) => {
                      return <option key={index} value={weight}>{weight} kg</option>
                    })
                    }
                  </select>
                </div>}

                {user_info && <div className='profile__data-container'>
                  <h3>Smoker:</h3>
                  <select className='profile__select' onChange={this.handleSmokerChange}>
                    {user_info.smoker ? <option defaultValue={user_info.smoker}>{user_info.smoker ? 'yes' : 'no'}</option> : <option value='null'>Do you smoke?</option>}
                    {user_info.smoker && <option value={'delete'}>Don't show </option>}

                    <option key={0} value='true'>yes</option>
                    <option key={1} value='false'>no</option>
                  </select>
                </div>}

              </div>

              {user_info && <div className='component__profile profile__margin--bottom'>
                <h2>About me</h2>
                <div className='description__options'>
                  <textarea className='profile__textarea' onChange={this.handleDescriptionChange} placeholder={user_info.description ? user_info.description : 'Write a description to allow other people to know more about you'} className='profile__textArea'></textarea>
                  <div><input type='checkbox' value='delete description' onChange={this.handleDeleteDescription} /> Delete description <br /></div>
                </div>

              </div>}

              {user_info && <div className='component__profile profile__margin--bottom'>
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

                      return active ? <p key={index} className='component__profile language-tags active' onClick={this.onOfferClickHandler}>{language}</p> : <p key={index} className='component__profile language-tags inactive' onClick={this.onOfferClickHandler}>{language}</p>
                    })}
                </div>
              </div>}




            </div>

          </div>

          <div>

            <button
              className='bttn bttn--save-profile'
              onClick={this.handleUpdateProfile}
            >Save</button>

            <button
              className='bttn bttn--delete-profile'
              onClick={this.handleDeleteAccount}
            >Delete account</button>
          </div>

        </section>
      </main>


    } else {
      return null
    }
  }

}


export default EditProfile