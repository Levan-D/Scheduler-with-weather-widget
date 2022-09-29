/** @format */
import style from "./ProgressBar.module.css";
function ProgressBar({ tasksComplete, tasksTotal, width, height, background }) {
  return (
    <div>
      <div
        className={style.bar}
        style={{
          width: width + "px",
          height: height + "px",
          backgroundColor: background,
        }}
      >
        <div
          className={style.progress}
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
