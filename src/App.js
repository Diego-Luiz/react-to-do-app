import React from 'react';
import {
  Routes,
  Route
} from 'react-router-dom';

import { 
  Home,
  Edit,
  Missing
} from './pages';
import data from './defaultTodos';
import { createTodo } from './modules';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = { 
      inputToDo: '', 
      toDos: [],
      errors: {
        newInputTodo: new Set(),
        editInputTodo: new Set()
      },
      noTransition: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleToDoClick = this.handleToDoClick.bind(this);
    this.removeError = this.removeError.bind(this);
    this.setErrorState = this.setErrorState.bind(this);
    this.inputRef = React.createRef(null);
  }
  componentDidMount(){
    this.setState({ toDos: this.loadData() });
  }
  loadData(){
    let hasDataAlready = localStorage.getItem('toDo-app');
    if(!hasDataAlready) localStorage.setItem('toDo-app', JSON.stringify(data));
    return JSON.parse(localStorage.getItem('toDo-app'));
  }
  handleDataChange(toDosToSet, toDosToStore){
    this.setState(toDosToSet);
    localStorage.setItem('toDo-app', JSON.stringify(toDosToStore));
  }
  handleInputChange(evt){
    this.setState({ inputToDo: evt.target.value });
  }
  setErrorState(updatedErrors){
    this.setState({errors: updatedErrors});
  }
  handleFormSubmit(evt){
    evt.preventDefault();
    const state = this.state;
    if(!state.inputToDo){
      const actualErrors = {...state.errors}
      actualErrors.newInputTodo.add('Cannot add an empty To Do');
      this.setErrorState(actualErrors);
      return;
    }
    const id = state.toDos.length === 0 ? 0 : state.toDos[state.toDos.length - 1].id + 1;
    const newTodo = createTodo(id, state.inputToDo, false);
    const toDos = {toDos: [...state.toDos, newTodo]};
    this.handleDataChange(toDos, toDos.toDos);
    this.setState({inputToDo: ''});
    this.inputRef.current.focus();
  }
  handleDeleteTodo(todoId){
    const state = this.state;
    const toDos = state.toDos.filter((todo) => (todo.id !== todoId));
    this.handleDataChange({ toDos }, toDos);
    this.setState({noTransition: '--no-transition'});
  }
  handleToDoClick(todoId){
    const state = this.state;
    const toDos = state.toDos.map( todo => {
      if(todo.id === todoId) todo.completed = !todo.completed;
      return todo;
    });
    this.handleDataChange({ toDos }, toDos);
  }
  removeError(errorsToRemove){
    const stateError = this.state.errors;
    const actualErrors = {...stateError};
    errorsToRemove.forEach(field => {
      actualErrors[field].clear();
    });
    this.setErrorState(actualErrors);
  }
 
  render(){
    return (
      <Routes path='/react-to-do-app'> 
        <Route index element={<Home
          inputToDo={this.state.inputToDo}
          handleChange={this.handleInputChange}
          handleSubmit={this.handleFormSubmit}
          handleDelete={this.handleDeleteTodo}
          handleToDoClick={this.handleToDoClick}
          toDos={this.state.toDos}
          Errors={this.state.errors}
          removeError={this.removeError}
          ref={this.inputRef}
          noTransition={this.state.noTransition}
        />}/>
        <Route path='edit/:id' element={<Edit
          toDos={this.state.toDos}
          handleDataChange={this.handleDataChange}
          Errors={this.state.errors}
          removeError={this.removeError}
          setErrorState={this.setErrorState}
        />} />
        <Route path='*' element={<Missing/>} />
      </Routes>
    );
  }
}

export default App;