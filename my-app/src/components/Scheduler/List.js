/** @format */

function List({ name, listSelect }) {
  return (
    <div onClick={listSelect} className="containerList">
      <div className={`${name} listName`}> {name} 22222222222</div>
      <div className="tripleDot">
        <div className="dotdot"></div>
        <div className="dotdot"></div>
        <div className="dotdot"></div>
      </div>
    </div>
  );
}

export default List;
