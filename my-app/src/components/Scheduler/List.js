/** @format */
import ProgressBar from "../ProgressBar/ProgressBar";

function List({ name, listSelect, todos, index }) {
  return (
    <div className="wrapperOfList">
      <div
        onClick={listSelect}
        className={`${
          name === todos[index].listName ? "selectedList" : ""
        } containerList`}
      >
        <div className={`${name} nameList`}> {name} </div>

        {name === todos[index].listName && (
          <div className="tripleDot">
            <div className="dotdot"></div>
            <div className="dotdot"></div>
            <div className="dotdot"></div>
          </div>
        )}
      </div>

      <ProgressBar
        tasksComplete={
          todos[todos.map((x) => x.listName).indexOf(name)].todoArray.filter(
            (x) => x.complete === true
          ).length
        }
        tasksTotal={
          todos[todos.map((x) => x.listName).indexOf(name)].todoArray.length
        }
        width={100}
        height={3}
        background={`#6e85b7`}
      />
    </div>
  );
}

export default List;
