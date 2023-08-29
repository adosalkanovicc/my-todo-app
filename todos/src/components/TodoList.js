import React from 'react'
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'urql';
import { ADD_TODO, DELETE_TODO, GET_TODOS } from '../api/todos';
import { FaPen } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md'


const TodoList = () => {

const [inputValue, setInputValue] = useState('');
const [, addTodo ] = useMutation(ADD_TODO);
const [, deleteTodo] = useMutation(DELETE_TODO); 
const [todos, setTodos] = useState([]);
const [comlpeted, isComleted] = useState(0);
/*
const handleAdd = () => {
addTodo({ task: inputValue }).then(() => {
setInputValue('');
});
};
*/



const handleAdd = async () => {
    try {
      const response = await addTodo({ task: inputValue });
      const newTodo = response.data.insert_todos.returning[0];
      setTodos([...todos, newTodo]);
      console.log('Added todo:', newTodo);
      setInputValue('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };


  const handleDelete = async (id) => {
    try {
      await deleteTodo({ id });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const [result] = useQuery({
    query: GET_TODOS,
  });
  
  /* const handleUpdate = () => {

  }
*/
  const { data } = result;

  useEffect(() => {
    if (data) {
      setTodos(data.todos);
    }
  }, [data]);


  return (
<div className='my-todos'>
    <h1>My Todos</h1>
    <p>Completed : {comlpeted} / {todos.length}</p>
<input
type="text"
value={inputValue}
onChange={e => setInputValue(e.target.value)}
/>
<button onClick={handleAdd} className='btn-add'>+</button>

<ul>
 {todos.map(todo => {
   return <li className="todo"
          key={todo.id}>
          {todo.task} 
          <input type='checkbox'></input>
          <button className="btn-delete" onClick={() => {handleDelete(todo.id)}}><MdDelete></MdDelete></button> 
          <button className='btn-update'><FaPen></FaPen></button>
          </li>
    
 })}
  
</ul>
</div>

);
};

export default TodoList
