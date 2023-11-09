import React from 'react'
import axios from 'axios';
const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      todos: [],
      todoNameInput: "",
      displayCompleteds: true
        }
  }

  onTodoNameInputChange = evt => {
    const { value } = evt.target
    this.setState({...this.state, todoNameInput: value})
  }


  postNewTodo = () => {
    axios.post(URL, {name: this.state.todoNameInput})
    .then(res => {
      this.fetchAllTodos()
      this.resetForm()
    })
    .catch(err => {
      this.setState({...this.state, error: err.response.data.message})
    })
  }

  resetForm = () => {
    this.setState({...this.state, todoNameInput: ""})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.postNewTodo()
  }

  fetchAllTodos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({...this.state, todos: res.data.data})
    })
    .catch(err => {
      this.setState({...this.state, error: err.response.data.message})
    })
  }


  toggleCompleted = id => evt => {
    axios.patch(`${URL}/${id}`)
    .then(res => this.setState({...this.state, todos: this.state.todos.map(td => {
      if(td.id !== id){return td}
      else if(td.id === id){return res.data.data}
    })}))
    .catch(err => {debugger})
  }

  toggleDisplayCompleteds = () => {
    this.setState({...this.state, displayCompleteds: !this.state.displayCompleteds})
  }

  componentDidMount(){
this.fetchAllTodos()

  }
  render() {
    return (
      <div>
        {this.state.error && <div id="error">{this.state.error}</div>}
        <div id = "todos">
      {this.state.todos.reduce((acc, td) => {
        if (this.state.displayCompleteds || !td.completed) return acc.concat(<div onClick={this.toggleCompleted(td.id)} key={td.id}>{td.name}{td.completed ? "☑️" : ""}</div>)
        return acc
      }, [])
        // return <div onClick={this.toggleCompleted(todo.id)} key={todo.id}>{todo.name}{todo.completed ? "☑️" : ""}</div>
    }</div>
    
        <form onSubmit = {this.handleSubmit} id="todoForm">
          <input value={this.state.todoNameInput} onChange={this.onTodoNameInputChange} type="text" placeholder="Type todo"></input>
          <input type="submit"></input>

        </form>
        <button onClick={this.toggleDisplayCompleteds}>{this.state.displayCompleteds ? "Hide" : "Show"} Completed</button>
      </div>
    )
  }
}
