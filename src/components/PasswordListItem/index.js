import './index.css'

const PasswordListItem = props => {
  const {onDeletePassword, eachDetails} = props
  const {id, website, username, password, showStar} = eachDetails

  const onClickDeleteButton = () => {
    onDeletePassword(id)
  }

  return (
    <li className="password-list-items">
      <div className="user-and-delete-container">
        <div className="user-detail-container">
          <div className="weblogo">
            <h1 className="website-first-letter">{website[0].toUpperCase()}</h1>
          </div>
          <div>
            <p className="website">{website}</p>
            <p className="username">{username}</p>
            {showStar ? (
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                alt="stars"
                className="star-image"
              />
            ) : (
              <p className="password">{password}</p>
            )}
          </div>
        </div>
        <button
          type="button"
          className="delete-button"
          onClick={onClickDeleteButton}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordListItem
