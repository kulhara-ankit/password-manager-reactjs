import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import PasswordListItem from '../PasswordListItem'
import './index.css'

class PasswordForm extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    passwordList: [],
    searchInput: '',
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsernameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  formSubmit = event => {
    event.preventDefault()

    const {websiteInput, usernameInput, passwordInput} = this.state

    if (websiteInput !== '' && usernameInput !== '' && passwordInput !== '') {
      const newPasswordList = {
        id: uuidV4(),
        website: websiteInput,
        username: usernameInput,
        password: passwordInput,
        showStar: true,
      }

      this.setState(prevState => ({
        passwordList: [...prevState.passwordList, newPasswordList],
        websiteInput: '',
        usernameInput: '',
        passwordInput: '',
      }))
    }
  }

  onChangeCheckbox = event => {
    const {passwordList} = this.state

    if (event.target.checked) {
      const newList = passwordList.map(eachItem => ({
        ...eachItem,
        showStar: false,
      }))
      this.setState({passwordList: newList})
    } else {
      this.setState({
        passwordList: passwordList.map(eachItem => ({
          ...eachItem,
          showStar: true,
        })),
      })
    }
  }

  renderNoPasswordView = () => (
    <div className="no-password-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-password-img"
      />
      <p className="no-password-title">No Passwords</p>
    </div>
  )

  onDeletePassword = id => {
    const {passwordList} = this.state
    const updatedList = passwordList.filter(eachItem => eachItem.id !== id)
    this.setState({passwordList: updatedList})
  }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      passwordList,
      searchInput,
    } = this.state

    const passwordManagerImage =
      window.innerWidth >= 768
        ? 'https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png'

    const filteredPasswordDetails = passwordList.filter(eachPasswords =>
      eachPasswords.website.includes(searchInput),
    )

    return (
      <div className="bg-container">
        <div className="app-container">
          {/* Password Manager Logo */}
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="password-manager-logo"
          />

          {/* passwords-form-container User fill form container start here */}

          <div className="passwords-form-container">
            {/* making form to  enter the password */}

            <form className="form" onSubmit={this.formSubmit}>
              <h2 className="form-heading">Add New Password</h2>

              {/* Enter website */}
              <div className="input-container">
                <div className="icon-image">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    className="input-icon"
                    alt="website"
                  />
                </div>
                <input
                  type="text"
                  className="input-element"
                  placeholder="Enter Website"
                  value={websiteInput}
                  onChange={this.onChangeWebsiteInput}
                />
              </div>

              {/* Enter Username */}
              <div className="input-container">
                <div className="icon-image">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    className="input-icon"
                    alt="username"
                  />
                </div>
                <input
                  type="text"
                  className="input-element"
                  placeholder="Enter Username"
                  value={usernameInput}
                  onChange={this.onChangeUsernameInput}
                />
              </div>

              {/* Enter password */}
              <div className="input-container">
                <div className="icon-image">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    className="input-icon"
                    alt="password"
                  />
                </div>
                <input
                  type="password"
                  className="input-element"
                  placeholder="Enter Password"
                  value={passwordInput}
                  onChange={this.onChangePasswordInput}
                />
              </div>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              src={passwordManagerImage}
              className="image"
              alt="password manager"
            />
          </div>

          {/* Saved Password List */}

          <div className="password-list-container">
            {/* Header with search Input */}
            <div className="title-and-search-container">
              {/* title-container */}
              <div className="title-container">
                <h1 className="your-password-title">Your Passwords</h1>
                <p className="passwords-count">{passwordList.length}</p>
              </div>
              {/* search-container */}
              <div className="search-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-icon"
                />
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                />
              </div>
            </div>
            <hr className="horizontal-ruler" />
            {/* check box */}
            <div className="checkbox-section">
              <input
                type="checkbox"
                id="checkbox"
                onChange={this.onChangeCheckbox}
              />
              <label htmlFor="checkbox" className="checkbox-label">
                Show Passwords
              </label>
            </div>
            {/* password list  */}
            {filteredPasswordDetails.length === 0 ? (
              this.renderNoPasswordView()
            ) : (
              <ul className="password-list">
                {filteredPasswordDetails.map(eachDetails => (
                  <PasswordListItem
                    eachDetails={eachDetails}
                    key={eachDetails.id}
                    onDeletePassword={this.onDeletePassword}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordForm
