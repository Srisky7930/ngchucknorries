import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

import RandomJokes from '../RandomJokes'

import './index.css'

const Random = props => {
  const {eachItem} = props
  const name = eachItem.slice(1)
  const newName = eachItem.charAt(0).toUpperCase().concat(name)
  return (
    <div>
      <Popup
        modal
        trigger={
          <button type="button" className="trigger-button">
            {newName} <br />
            <span className="span-text"> Unlimited Jokes On {newName} </span>
          </button>
        }
      >
        {close => (
          <div className="popup-card">
            <div>
              <RandomJokes />
            </div>
            <div>
              <button
                type="button"
                className="close-button"
                onClick={() => close()}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  )
}

export default Random
