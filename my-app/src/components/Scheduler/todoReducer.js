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
      let newListName = `list_${todos.length + 1}`;
      let listNames = todos.map((x) => x.listName);
      while (listNames.includes(newListName)) {
        newListName += 1;
      }
      return [...todos, newList(newListName)];

    case ACTIONS.DELETE_LIST:
      if (todos[action.payload.index] && todos.length > 1) {
        if (
          todos[action.payload.index].listName === action.payload.zeName &&
          action.payload.index + 1 !== todos.length
        ) {
          todos.splice(action.payload.index, 1);
        } else if (
          todos[todos.length - 1].listName === action.payload.zeName &&
          action.payload.index + 1 === todos.length
        ) {
          action.payload.setInfexF(todos.length - 2);
          todos.pop();
        }
      }

      return [...todos];

    case ACTIONS.RENAME_LIST:
      let newObject0 = [
        {
          ...todos[action.payload.index],
          listNameShow: action.payload.newListName,
        },
      ];
      return todos.map(
        (obj) => newObject0.find((o) => o.listName === obj.listName) || obj
      );
    case ACTIONS.CHANGE_LIST_COLOR:
      let newObject00 = [
        {
          ...todos[action.payload.index],
          color: action.payload.color,
        },
      ];
      return todos.map(
        (obj) => newObject00.find((o) => o.listName === obj.listName) || obj
      );

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
                return {
                  ...x,
                  complete: !x.complete,
                  completeDate: Date(Date.now()),
                };
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
    completeDate: "",
  };
}
function newList(listName) {
  return {
    listName: listName,
    listNameShow: "",
    color: "default",
    todoArray: [],
  };
}

export default todoReducer;
