export const baseUrl =
   process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_PRODUCTION_API
      : process.env.REACT_APP_HTTPS === 'true'
      ? process.env.REACT_APP_DEVELOPMENT_API_HTTPS
      : process.env.REACT_APP_DEVELOPMENT_API;

export const pages = {
   login: 'login',
   signup: 'signup',
   verification: 'verification',
   personalTodo: 'Personal Todo list',
   listOfSharedTodos: 'List of shared Todo lists',
   sharedTodo(id) {
      return `sharedTodo/${id}`;
   },
};
