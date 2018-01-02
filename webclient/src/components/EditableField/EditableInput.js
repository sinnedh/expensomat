import React from 'react'
import PropTypes from 'prop-types'

class EditableInput extends React.Component {
  state = {
    editValue: this.props.value,
    editMode: false
  }

  handleClickEdit(event) {
    event.preventDefault()
    this.setState({editValue: this.props.value, editMode: true})
  }

  handleClickCancel(event) {
    event.preventDefault()
    this.setState({editValue: '', editMode: false})
  }

  handleClickSave(event) {
    event.preventDefault()
    this.setState({editMode: false})
    this.props.onClickSave(this.state.editValue)
  }

  handleChangeValue(event) {
    this.setState({editValue: event.target.value})
  }

  render() {
    if(this.state.editMode && this.props.isEditable) {
      return (
        <React.Fragment>
          <input className="value" type="text" value={this.state.editValue} onChange={e => this.handleChangeValue(e)} />
          <input className="save-button" type="button" value="Save" onClick={e => this.handleClickSave(e)} />
          <input className="cancel-button" type="button" value="Cancel" onClick={e => this.handleClickCancel(e)} />
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        {this.props.value}
        {this.props.isEditable &&
          <input
            className="edit-button"
            type="button"
            value="Edit"
            onClick={e => this.handleClickEdit(e)}
          />
        }
      </React.Fragment>
    )
  }
}

EditableInput.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  isEditable: PropTypes.bool,
  onClickSave: PropTypes.func.isRequired,
}

EditableInput.defaultProps = {
  value: '',
  isEditable: true,
  onClickSave: (value) => {},
}

export default EditableInput
