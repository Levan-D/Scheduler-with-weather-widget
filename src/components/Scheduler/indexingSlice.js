/** @format */

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: {
    listIndex: 0,
    todoIndex: { todoId: 0, todoIndex: 0 },
    taskRename: "",
    onDragOverListName: "",
    onDragStartListName: "",
    popUpVisibility: false,
    newtodoid: "",
    newListName: "",
    popUpCoords: { x: 0, y: 0 },
    ListDragging: false,
    TodoDragging: false,
    isLoggedIn: false,
  },
}

const indexingSlice = createSlice({
  name: "indexing",
  initialState: initialState,
  reducers: {
    CHANGE_LISTINDEX: (state, action) => {
      if (typeof action.payload === "number" && action.payload >= 0) {
        state.data.listIndex = action.payload
      }
    },
    CHANGE_TODOINDEX: (state, action) => {
      state.data.todoIndex = action.payload
    },
    TASK_RENAME: (state, action) => {
      state.data.taskRename = action.payload
    },
    ONDRAGOVER: (state, action) => {
      state.data.onDragOverListName = action.payload
    },
    ONDRAGSTART: (state, action) => {
      state.data.onDragStartListName = action.payload
    },
    POPUPVISIBILITY: (state, action) => {
      state.data.popUpVisibility = action.payload
    },
    NEWTODOID: (state, action) => {
      state.data.newtodoid = action.payload
    },
    NEWLISTNAME: (state, action) => {
      state.data.newListName = action.payload
    },
    POPUPCOORDS: (state, action) => {
      state.data.popUpCoords = action.payload
    },
    LISTDRAGGING: (state, action) => {
      state.data.ListDragging = action.payload
    },
    TODODRAGGING: (state, action) => {
      state.data.TodoDragging = action.payload
    },
    ISLOGGEDIN: (state, action) => {
      state.data.isLoggedIn = action.payload
    },
  },
})

export const {
  CHANGE_LISTINDEX,
  TASK_RENAME,
  CHANGE_TODOINDEX,
  ONDRAGSTART,
  ONDRAGOVER,
  POPUPVISIBILITY,
  NEWTODOID,
  NEWLISTNAME,
  POPUPCOORDS,
  LISTDRAGGING,
  TODODRAGGING,
  ISLOGGEDIN,
} = indexingSlice.actions
export default indexingSlice.reducer
