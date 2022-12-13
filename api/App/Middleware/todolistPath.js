export default function todoListPath(request, response, next) {
   const todoList = request.session.todoList;

   if (!todoList) return response.sendStatus(500);

   request.todoList = { ...todoList };

   next();
}
