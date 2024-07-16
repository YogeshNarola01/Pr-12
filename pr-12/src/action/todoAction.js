
import { app } from '../firebase/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, getFirestore } from 'firebase/firestore';
const db = getFirestore(app)
export const addTodo = (todo) => async (dispatch) => {
  await addDoc(collection(db, 'todos'), todo);
  dispatch({ type: 'ADD_TODO', payload: todo });
};

export const fetchTodos = () => async (dispatch) => {
  const todosCol = collection(db, 'todos');
  const todoSnapshot = await getDocs(todosCol);
  const todosList = todoSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  dispatch({ type: 'SET_TODOS', payload: todosList });
};

export const deleteTodo = (id) => async (dispatch) => {
  await deleteDoc(doc(db, 'todos', id));
  dispatch({ type: 'DELETE_TODO', payload: id });
};
