/** @format */

function List({ name, listSelect }) {
  return (
    <div onClick={listSelect} className={name}>
      {name}
    </div>
  )
}

export default List
