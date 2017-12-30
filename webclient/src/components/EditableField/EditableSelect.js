import React from 'react'
import PropTypes from 'prop-types'

class EditableSelect extends React.Component {
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
          <select className="value" value={this.state.editValue} onChange={e => this.handleChangeValue(e)}>
          {Object.keys(this.props.options).map((key) =>
            <option key={key} value={key}>{this.props.options[key]}</option>
          )}
          </select>
          <input className="save-button" type="button" value="Save" onClick={e => this.handleClickSave(e)} />
          <input className="cancel-button" type="button" value="Cancel" onClick={e => this.handleClickCancel(e)} />
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        {this.props.options[this.props.value]}
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

EditableSelect.propTypes = {
  options: PropTypes.object,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  isEditable: PropTypes.bool,
  onClickSave: PropTypes.func.isRequired,
}

EditableSelect.defaultProps = {
  options: [],
  value: '',
  isEditable: true,
  onClickSave: (value) => {},
}

export default EditableSelect
