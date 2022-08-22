import ACTIONS from "./actions";

function todoReducer(todos, action) {
  switch (action.type) {
    case ACTIONS.FETCH_TODODATA:
      return JSON.parse(localStorage.getItem("todoData"));

    case ACTIONS.ADD_TODO:
      let newObject1 = [
        {
          ...todos[action.payload.index],
          todoArray: [
            ...todos[action.payload.index].todoArray,
            newTodo(action.payload.taskName),
          ],
        },
      ];

      return todos.map(
        (obj) => newObject1.find((o) => o.listName === obj.listName) || obj
      );

    case ACTIONS.ADD_LIST:
      return [...todos, newList(`list${todos.length + 1}`)];
    case ACTIONS.DELETE_LIST:
      return  
    case ACTIONS.DELETE_TODO:
      let newObject2 = [
        {
          ...todos[action.payload.index],
          todoArray: [
            ...todos[action.payload.index].todoArray.filter(
              (x) => x.id !== action.payload.id
            ),
          ],
        },
      ];
      return todos.map(
        (obj) => newObject2.find((o) => o.listName === obj.listName) || obj
      );

    case ACTIONS.TOGGLE_TODO:
      let newObject3 = [
        {
          ...todos[action.payload.index],
          todoArray: [
            ...todos[action.payload.index].todoArray.map((x) => {
              if (x.id === action.payload.id) {
                return { ...x, complete: !x.complete };
              }
              return x;
            }),
          ],
        },
      ];
      return todos.map(
        (obj) => newObject3.find((o) => o.listName === obj.listName) || obj
      );
    default:
      return todos;
  }
}

function newTodo(taskName) {
  return {
    id: Date.now(),
    time: Date(Date.now()),
    taskName: taskName,
    complete: false,
  };
}
function newList(listName) {
  return {
    listName: listName,
    todoArray: [],
  };
}

export default todoReducer;
