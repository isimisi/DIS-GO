import TodoList from '#App/Models/TodoList';

export default async function todoListPath(request, response, next) {
   const { id } = request.params;

   if (!id) return response.sendStatus(500);
   try {
      const [todoList] = await TodoList.find(id);
      request.todoList = todoList;
   } catch (error) {
      return response.sendStatus(500);
   }

   next();
}
