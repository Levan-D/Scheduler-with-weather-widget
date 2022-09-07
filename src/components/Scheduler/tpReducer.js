import ACTIONS from "./actions";

function tpReducer(taskProgress, action) {
  switch (action.type) {
    case ACTIONS.SET_TASKSCOMPLETE:
      return {
        ...taskProgress,
        tasksComplete: action.payload.todos[
          action.payload.index
        ].todoArray.filter((x) => x.complete === true).length,
      };

    case ACTIONS.SET_TASKSTOTAL:
      return {
        ...taskProgress,
        tasksTotal: action.payload.todos[action.payload.index].todoArray.length,
      };

    case ACTIONS.SET_CONFETTIBOOM:
      return {
        ...taskProgress,
        confettiBoom: action.payload.state1,
        triggered: action.payload.state2,
      };

    case ACTIONS.SET_OPACITYZERO:
      return {
        ...taskProgress,
        opacity: action.payload.opa,
      };

    case ACTIONS.SET_OPACITYONE:
      return {
        ...taskProgress,
        opacity: 1,
      };
  }
}

export default tpReducer;
