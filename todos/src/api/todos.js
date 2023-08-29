import { gql } from "urql";

export const ADD_TODO = gql`
mutation AddTodo($task: String!) {
insert_todos(objects: {task: $task}) {
returning {
id
task
completed
}
}
}
`;
export const UPDATE_TODO = gql`
mutation UpdateTodo($id: Int!, $completed: Boolean!) {
update_todos(where: {id: {_eq: $id}}, _set: {completed: $completed}) {
returning {
id
task
completed
}
}
}
`;
export const DELETE_TODO = gql`
mutation DeleteTodo($id: Int!) {
delete_todos(where: {id: {_eq: $id}}) {
returning {
id
}
}
}
`;

export const GET_TODOS = gql`
query GetTodos {
 todos {
    id
    task
    completed
  }
}
`
    