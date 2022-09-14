/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

const initialState = {
  data: [
    {
      listName: `list_1`,
      listNameShow: "",
      color: "default",
      todoArray: [
        {
          id: Date.now(),
          time: Date(Date.now()),
          taskName: `whoop whoop`,
          complete: false,
          completeDate: "",
        },
      ],
    },
  ],
  isInitialData: true,
};

const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    FETCH_TODODATA: (state) => {
      if (
        JSON.parse(localStorage.getItem("todoData")) !== null &&
        JSON.parse(localStorage.getItem("todoData")).length > 0
      ) {
        state.data = JSON.parse(localStorage.getItem("todoData"));
      }
      state.isInitialData = false;
      localStorage.setItem("todoData", JSON.stringify(state.data));
    },
    ADD_TODO: (state, action) => {
      state.data[action.payload.index].todoArray = [
        ...state.data[action.payload.index].todoArray,
        newTodo(action.payload.taskName),
      ];
    },
    ADD_LIST: (state) => {
      let newListName = `list_${state.data.length + 1}`;
      let listNames = state.data.map((x) => x.listName);
      while (listNames.includes(newListName)) {
        newListName += 1;
      }
      state.data = [...state.data, newList(newListName)];
    },
    RENAME_LIST: (state, action) => {
      let newObject0 = [
        {
          ...state.data[action.payload.index],
          listNameShow: action.payload.newListName,
        },
      ];
      state.data = state.data.map(
        (obj) => newObject0.find((o) => o.listName === obj.listName) || obj
      );
    },
    CHANGE_LIST_COLOR: (state, action) => {
      let newObject00 = [
        {
          ...state.data[action.payload.index],
          color: action.payload.color,
        },
      ];
      state.data = state.data.map(
        (obj) => newObject00.find((o) => o.listName === obj.listName) || obj
      );
    },
    RENAME_TODO: (state, action) => {
      let newObject5 = [
        {
          ...state.data[action.payload.index],
          todoArray: [
            ...state.data[action.payload.index].todoArray.map((x) => {
              if (x.id === action.payload.id) {
                return {
                  ...x,
                  taskName: action.payload.taskRename,
                };
              }
              return x;
            }),
          ],
        },
      ];
      state.data = state.data.map(
        (obj) => newObject5.find((o) => o.listName === obj.listName) || obj
      );
    },
    TOGGLE_TODO: (state, action) => {
      let newObject3 = [
        {
          ...state.data[action.payload.index],
          todoArray: [
            ...state.data[action.payload.index].todoArray.map((x) => {
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
      state.data = state.data.map(
        (obj) => newObject3.find((o) => o.listName === obj.listName) || obj
      );
    },
    DELETE_LIST: (state, action) => {
      if (state.data[action.payload.index] && state.data.length > 1) {
        if (
          state.data[action.payload.index].listName === action.payload.zeName &&
          action.payload.index + 1 !== state.data.length
        ) {
          console.log("state.data:", state.data);

          state.data = state.data
            .map((obj, i) => {
              if (i !== action.payload.index) {
                return obj;
              }
            })
            .filter((item) => item);
          console.log("state.data:", state.data);
        }
      }
    },
    DELETE_TODO: (state, action) => {
      let newObject2 = [
        {
          ...state.data[action.payload.index],
          todoArray: [
            ...state.data[action.payload.index].todoArray.filter(
              (x) => x.id !== action.payload.id
            ),
          ],
        },
      ];
      state.data = state.data.map(
        (obj) => newObject2.find((o) => o.listName === obj.listName) || obj
      );
    },
    CHANGE_TODO_POSITION: (state, action) => {
      let currentTodo =
        state.data[action.payload.index].todoArray[action.payload.todoIndex];

      let newTodoArray = state.data[action.payload.index].todoArray.filter(
        (x) => x.id !== action.payload.todoId
      );
      newTodoArray.splice(action.payload.newPositionIndex, 0, currentTodo);

      let newObject6 = [
        {
          ...state.data[action.payload.index],
          todoArray: [...newTodoArray],
        },
      ];
      state.data = state.data.map(
        (obj) => newObject6.find((o) => o.listName === obj.listName) || obj
      );
    },
    CHANGE_LIST_POSITION: (state, action) => {
      let oldList = state.data[action.payload.todoIndex];
      let newObject69 = state.data.filter(
        (x) => x.listName !== action.payload.todoId
      );
      newObject69.splice(action.payload.newPositionIndex, 0, oldList);

      state.data = newObject69;
    },
  },
});

export const {
  FETCH_TODODATA,
  ADD_TODO,
  ADD_LIST,
  RENAME_LIST,
  CHANGE_LIST_COLOR,
  RENAME_TODO,
  TOGGLE_TODO,
  DELETE_LIST,
  DELETE_TODO,
  CHANGE_TODO_POSITION,
  CHANGE_LIST_POSITION,
} = todoSlice.actions;
export default todoSlice.reducer;
