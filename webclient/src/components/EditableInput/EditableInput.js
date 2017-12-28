import React from 'react'

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
    if(this.state.editMode) {
      return (
        <span>
          <input className="value" type="text" value={this.state.editValue} onChange={e => this.handleChangeValue(e)} />
          <input className="save-button" type="button" value="Save" onClick={e => this.handleClickSave(e)} />
          <input className="cancel-button" type="button" value="Cancel" onClick={e => this.handleClickCancel(e)} />
        </span>
      )
    } else {
      return (
        <span>
          {this.props.value}
          <input className="edit-button" type="button" value="Edit" onClick={e => this.handleClickEdit(e)} />
        </span>
      )
    }
  }
}

export default EditableInput
