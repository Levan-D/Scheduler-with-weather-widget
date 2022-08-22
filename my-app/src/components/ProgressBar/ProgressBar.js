/** @format */
import "./ProgressBar.css";
function ProgressBar({ tasksComplete, tasksTotal, width, height, background }) {
  return (
    <div className="barcontainer">
      <div
        className="bar"
        style={{
          width: width + "px",
          height: height + "px",
          backgroundColor: background
        }}
      >
        <div
          className="progress"
          style={{
            width: (tasksComplete / tasksTotal) * width + "px",
            height: height + "px",
          }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;
