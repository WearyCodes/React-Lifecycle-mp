import React from 'react'

export default class Form extends React.Component {
  render() {
    const {handleSubmit, todoNameInput, onTodoNameInputChange, toggleDisplayCompleteds, displayCompleteds} = this.props
    return (
      <>
        <form
          onSubmit={handleSubmit} id="todoForm">
          <input
            value={todoNameInput} onChange={onTodoNameInputChange} type="text" placeholder="Type todo"
          ></input>
          <input
            type="submit">
          </input>
        </form>
        <button
          onClick={toggleDisplayCompleteds}
        >{displayCompleteds ? "Hide" : "Show"} Completed
        </button>
      </>
    )
  }
}
