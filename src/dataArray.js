import {v4 as uuidv4} from 'uuid';

export const todosItem = [
  {
    id: uuidv4(),
    text: 'Consider using Redux',
    completed: false,
  },
  {
    id: uuidv4(),
    text: 'Keep all state in a single tree',
    completed: true
  },
  {
    id: uuidv4(),
    text: 'Keep all state in a single tree',
    completed: false
  }
]

