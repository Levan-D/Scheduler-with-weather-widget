/** @format */
import "./ProgressBar.css";
function ProgressBar({ tasksComplete, tasksTotal, width }) {
  return (
    <div className="barcontainer">
      <div className="bar" style={{ width: width + "px" }}>
        <div
          className="progress"
          style={{ width: (tasksComplete / tasksTotal) * width + "px" }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;
