import React, { Component } from 'react'
import logic from '../../logic'
import Input from '../Input/Input'
import SelectorAge from '../SelectorAge/SelectorAge';
import Selector from '../Selector/Selector';
import './editProfile.css'

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
      ],
      listGender: [
        'Male',
        'Female'
      ],
      listSmoker: [
        'yes',
        'no'
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
    const { profileImage } = this.refs
    profileImage.src = 'https://blog.teamtreehouse.com/wp-content/uploads/2015/05/InternetSlowdown_Day.gif'
    let image
    event ? image = event.target.files[0] : image = this.state.user_info.profileImage
    try {
      logic.uploadImage(image)
        .then(() => {

          this.props.retrieveUserInfo()
        })
        .catch(err => {
          this.props.handleSetError(err.message)
        })
    } catch (err) {
      this.props.handleSetError(err.message)
    }
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

    try {
      logic.updateProfile(user_info.id.toString(), new_info.name, new_info.email, new_info.skype, new_info.age, new_info.gender, new_info.height, new_info.weight, new_info.smoker, new_info.description, new_info.receives, new_info.moves, new_info.city, new_info.offer, new_info.searching)
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
        .catch(err => {
          this.props.handleSetError(err.message)
        })
    } catch (err) {
      this.props.handleSetError(err.message)
    }
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
    try {
      logic.deleteAccount()
        .then(() => logic.logout())
        .then(() => this.props.history.push(`/`))
        .catch(err => {
          this.props.handleSetError(err.message)
        })
    } catch (err) {
      this.props.handleSetError(err.message)
    }
  }


  render() {

    const { user_info, default_info, listAges, listHeight, listWeight, new_info } = this.state

    if (this.props.user_info) {
      return <main className='initial__profile'>

        <section className='container__edit-profile'>
          <div className='edit-profile--row'>
            <form className='bttn bttn--upload-image' encType="multipart/form-data">
              <label className='label__upload-image'>
                <input className='input__image' type="file" name="avatar" onChange={this.handleUploadImage} />
                Upload image
              </label>
            </form>

            <button className='bttn bttn--delete-image' onClick={this.handleDeleteImage} >Delete image</button>

          </div>

          <div className='edit-profile__container'>
            <div className='container--column '>

              <div className='spacer--20'></div>

              <section>
                <img className="profile__cover-image" src="https://image.freepik.com/free-photo/wall-wallpaper-concrete-colored-painted-textured-concept_53876-31799.jpg" alt='It did not load...'></img>


                <div className='container__image--profile'>
                  <div className='profile__image-box'>
                    {user_info && <img ref='profileImage' src={user_info.profileImage ? user_info.profileImage : 'https://res.cloudinary.com/db2aaxmvg/image/upload/v1543488064/nobody_m.original.jpg'} alt='It did not load...'
                      className='edit-profile__image'
                    />}
                  </div>
                </div>
                <div className='edit-profile__username'>
                  <h2>{user_info && user_info.username}</h2>
                  {user_info && <div className='edit-profile__data-container'>
                    <h3>City:</h3>
                    <input className='profile__input' onChange={this.handleCityChange} placeholder={user_info.city} />
                  </div>}
                </div>
              </section>


              {user_info && <div className='component__edit-profile--margin-bottom'>
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


                      return active ? <p key={index} className='edit-profile__language-tags--active' onClick={this.onSearchingClickHandler}>{language}</p> : <p key={index} className='edit-profile__language-tags--inactive' onClick={this.onSearchingClickHandler}>{language}</p>
                    })}
                </div>
              </div>}

              <div className='component__edit-profile--margin-bottom'>

                <h2>Profile</h2>

                {user_info &&
                  <div className='profile__data-container'>

                    <Input
                      title={'Name:'}
                      placeholder={user_info.name}
                      onChange={this.handleNameChange}
                      classNameDiv={'profile__data-container'}
                      classNameTitle={''}
                      classNameInput={'profile__input'}
                    />
                  </div>}

                {user_info &&
                  <div className='profile__data-container'>
                    <Input
                      title={'Email:'}
                      placeholder={user_info.email}
                      onChange={this.handleEmailChange}
                      classNameDiv={'profile__data-container'}
                      classNameTitle={''}
                      classNameInput={'profile__input'}
                    />
                  </div>}

                {user_info &&
                  <div className='profile__data-container'>
                    <Input
                      title={'Skype:'}
                      placeholder={user_info.skype}
                      onChange={this.handleSkypeChange}
                      classNameDiv={'profile__data-container'}
                      classNameTitle={''}
                      classNameInput={'profile__input'}
                    />
                    <input type='checkbox' value='delete skype' onChange={this.handleDeleteSkype} /> Delete skype <br />
                  </div>}

                {user_info &&
                  <div className='profile__data-container'>
                    <Selector
                      title={'Gender:'}
                      firstOption={'Select your gender:  '}
                      onSelect={this.handleGenderChange}
                      selected={user_info.gender}
                      list={default_info.listGender}
                      classNameDiv={'profile__data-container'}
                      classNameTitle={'margin--left'}
                      classNameSelect={'profile__select'}
                    />
                  </div>}

                {user_info &&
                  <div className='profile__data-container'>
                    <Selector
                      title={'Age:'}
                      firstOption={'Select your age:  '}
                      onSelect={this.handleAgeChange}
                      selected={user_info.age}
                      list={listAges}
                      classNameDiv={'profile__data-container'}
                      classNameTitle={'margin--left'}
                      classNameSelect={'profile__select'}
                    />
                  </div>}

                {user_info &&
                  <div className='profile__data-container'>
                    <Selector
                      title={'Height:'}
                      firstOption={'Select your height:  '}
                      onSelect={this.handleHeightChange}
                      selected={user_info.height}
                      list={listHeight}
                      tag={'cm'}
                      classNameDiv={'profile__data-container'}
                      classNameTitle={'margin--left'}
                      classNameSelect={'profile__select'}
                    />
                  </div>}

                {user_info &&
                  <div className='profile__data-container'>
                    <Selector
                      title={'Weight:'}
                      firstOption={'Select your weight:  '}
                      onSelect={this.handleWeightChange}
                      selected={user_info.weight}
                      list={listWeight}
                      tag={'kg'}
                      classNameDiv={'profile__data-container'}
                      classNameTitle={'margin--left'}
                      classNameSelect={'profile__select'}
                    />
                  </div>}

                {user_info &&
                  <div className='profile__data-container'>
                    <Selector
                      title={'Smoker:'}
                      firstOption={'Do you smoke?  '}
                      onSelect={this.handleSmokerChange}
                      selected={user_info.smoker}
                      list={default_info.listSmoker}
                      classNameDiv={'profile__data-container'}
                      classNameTitle={'margin--left'}
                      classNameSelect={'profile__select'}
                    />
                  </div>}

              </div>

              {user_info && <div className='component__edit-profile--margin-bottom'>
                <h2>About me</h2>
                <div className='description__options'>
                  <textarea className='profile__textarea' onChange={this.handleDescriptionChange} placeholder={user_info.description ? user_info.description : 'Write a description to allow other people to know more about you'} className='profile__textArea'></textarea>
                  <div><input type='checkbox' value='delete description' onChange={this.handleDeleteDescription} /> Delete description <br /></div>
                </div>

              </div>}

              {user_info && <div className='component__edit-profile--margin-bottom'>
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

                      return active ? <p key={index} className='edit-profile__language-tags--active' onClick={this.onOfferClickHandler}>{language}</p> : <p key={index} className='edit-profile__language-tags--inactive' onClick={this.onOfferClickHandler}>{language}</p>
                    })}
                </div>
              </div>}

            </div>

          </div>

          <div className='edit-profile--row'>

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