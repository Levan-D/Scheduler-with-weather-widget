/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

Array.prototype.swapItems = function (a, b) {
  this[a] = this.splice(b, 1, this[a])[0];
  return this;
};

const initialState = {
  data: [
    {
      listName: `list_1`,
      listNameShow: {
        date: "",
        name: "",
      },
      color: "default",
      todoArray: [],
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
    ADD_TODO: {
      reducer: (state, action) => {
        if (state.data[action.payload.index].todoArray.length <= 150) {
          state.data[action.payload.index].todoArray.push(action.payload.todo);
        }
      },
      prepare: (text) => {
        return {
          payload: {
            index: text.index,
            todo: {
              id: Date.now(),
              time: Date(Date.now()),
              taskName: text.taskName,
              complete: false,
              completeDate: "",
            },
          },
        };
      },
    },
    ADD_LIST: {
      reducer: (state, action) => {
        if (state.data.length <= 50) {
          let newListName = `list_${state.data.length + 1}`;
          let listNames = state.data.map((x) => x.listName);
          while (listNames.includes(newListName)) {
            newListName += 1;
          }
          let bob = action.payload;
          bob.listName = newListName;
          state.data.push(bob);
        }
      },
      prepare: () => {
        return {
          payload: {
            listName: "",
            listNameShow: {
              date: "",
              name: "",
            },
            color: "default",
            todoArray: [],
          },
        };
      },
    },
    RENAME_LIST: (state, action) => {
      state.data[action.payload.index].listNameShow.name =
        action.payload.newListName;
    },
    ADD_DATE_LIST: (state, action) => {
      state.data[action.payload.index].listNameShow.date =
        action.payload.newListName;
    },
    CHANGE_LIST_COLOR: (state, action) => {
      state.data[action.payload.index].color = action.payload.color;
    },
    RENAME_TODO: (state, action) => {
      state.data[action.payload.index].todoArray[
        action.payload.todoIndex
      ].taskName = action.payload.taskRename;
    },
    TOGGLE_TODO: (state, action) => {
      state.data[action.payload.index].todoArray = [
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
      ];
    },
    DELETE_LIST: (state, action) => {
      if (state.data[action.payload.index] && state.data.length > 1) {
        state.data.splice(action.payload.index, 1);
      }
    },
    DELETE_TODO: (state, action) => {
      state.data[action.payload.index].todoArray = [
        ...state.data[action.payload.index].todoArray.filter(
          (x) => x.id !== action.payload.id
        ),
      ];
    },
    CHANGE_TODO_POSITION: (state, action) => {
      state.data[action.payload.index].todoArray.swapItems(
        action.payload.todoIndex,
        action.payload.newPositionIndex
      );
    },
    CHANGE_LIST_POSITION: (state, action) => {
      let oldList = state.data[action.payload.todoIndex];
      let newArray = state.data.filter(
        (x, i) => i !== action.payload.todoIndex
      );
      newArray.splice(action.payload.newPositionIndex, 0, oldList);
      state.data = newArray;
    },
  },
});

export const {
  FETCH_TODODATA,
  ADD_TODO,
  ADD_LIST,
  RENAME_LIST,
  ADD_DATE_LIST,
  CHANGE_LIST_COLOR,
  RENAME_TODO,
  TOGGLE_TODO,
  DELETE_LIST,
  DELETE_TODO,
  CHANGE_TODO_POSITION,
  CHANGE_LIST_POSITION,
} = todoSlice.actions;
export default todoSlice.reducer;
