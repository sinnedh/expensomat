import React from 'react'

class EditableInput extends React.Component {
  state = {
    initialValue: this.props.value,
    value: this.props.value,
    editMode: false
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.value === '') {
      this.setState({initialValue: nextProps.value, value: nextProps.value})
    }
  }

  handleClickEdit(event) {
    event.preventDefault()
    this.setState({editMode: true})
  }

  handleClickCancel(event) {
    event.preventDefault()
    this.setState({value: this.state.initialValue, editMode: false})
  }

  handleClickSave(event) {
    event.preventDefault()
    this.setState({editMode: false})
    this.props.onClickSave(this.state.value)
  }

  handleChangeValue(event) {
    this.setState({value: event.target.value})
  }

  render() {
    if(this.state.editMode) {
      return (
        <span>
          <input className="value" type="text" value={this.state.value} onChange={e => this.handleChangeValue(e)} />
          <input className="save-button" type="button" value="Save" onClick={e => this.handleClickSave(e)} />
          <input className="cancel-button" type="button" value="Cancel" onClick={e => this.handleClickCancel(e)} />
        </span>
      )
    } else {
      return (
        <span>
          {this.state.value}
          <input className="edit-button" type="button" value="Edit" onClick={e => this.handleClickEdit(e)} />
        </span>
      )
    }
  }
}

export default EditableInput
