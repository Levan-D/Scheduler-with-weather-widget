/** @format */
import ProgressBar from "../ProgressBar/ProgressBar";

function List({ name, listSelect, todos, index, popUpMenu, nameShow, color }) {
  function invertColor(hex, bw) {
    if (hex.indexOf("#") === 0) {
      hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error("Invalid HEX color.");
    }
    var r = parseInt(hex.slice(0, 2), 16),
      g = parseInt(hex.slice(2, 4), 16),
      b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
      // https://stackoverflow.com/a/3943023/112731
      return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#323232" : "#F0F0F0";
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
  }
  function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join("0");
    return (zeros + str).slice(-len);
  }

  return (
    <div className="wrapperOfList">
      <div
        onClick={listSelect}
        className={`${
          name === todos[index].listName ? "selectedList" : ""
        } containerList`}
        style={{
          color:
            color !== "default"
              ? invertColor(color.substring(1), `bw`)
              : "#354259",
          backgroundColor: color !== "default" ? color : "",
          border:
            name === todos[index].listName
              ? `2px solid ${invertColor(color.substring(1), `bw`)}`
              : "",
        }}
      >
        <div className={`${name} nameList`}>
          {nameShow !== "" ? nameShow : name.replace(/_/, " ")}
        </div>

        {name === todos[index].listName && (
          <div
            className="tripleDot"
            onClick={(e) => {
              popUpMenu(e);
            }}
          >
            <div
              className="dotdot"
              style={{
                backgroundColor:
                  color !== "default"
                    ? invertColor(color.substring(1), `bw`)
                    : "#354259",
              }}
            ></div>
            <div
              className="dotdot"
              style={{
                backgroundColor:
                  color !== "default"
                    ? invertColor(color.substring(1), `bw`)
                    : "#354259",
              }}
            ></div>
            <div
              className="dotdot"
              style={{
                backgroundColor:
                  color !== "default"
                    ? invertColor(color.substring(1), `bw`)
                    : "#354259",
              }}
            ></div>
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
        width={170}
        height={3}
        background={`#6e85b7`}
      />
    </div>
  );
}

export default List;
