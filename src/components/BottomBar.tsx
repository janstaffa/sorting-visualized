import { colors } from "../globals";
import "../styles/BottomBar.css";
interface BottomBarProps {
  speed: number;
  comparisons: number;
  items: number;
  alreadySorted: number;
  sortName: string;
}
export const BottomBar: React.FC<BottomBarProps> = ({
  speed,
  comparisons,
  items,
  alreadySorted,
  sortName,
}) => {
  return (
    <div className="bottom-bar">
      <div className="color-bar">
        <div className="color-wrap">
          <span
            className="color"
            style={{ backgroundColor: colors.block }}
          ></span>
          &nbsp;- item
        </div>
        <div className="color-wrap">
          <span
            className="color"
            style={{ backgroundColor: colors.compare }}
          ></span>
          &nbsp;- comparing
        </div>
        <div className="color-wrap">
          <span
            className="color"
            style={{ backgroundColor: colors.sorted }}
          ></span>
          &nbsp;- sorted
        </div>
        <div className="color-wrap">
          <span
            className="color"
            style={{ backgroundColor: colors.pivot }}
          ></span>
          &nbsp;- pivot
        </div>
      </div>
      <div>
        <h2>{sortName}</h2>
      </div>
      <table>
        <tbody>
          <tr>
            <td>Speed(compars/s):</td>
            <td>{speed}</td>
          </tr>
          <tr>
            <td>Total items:</td>
            <td>{items}</td>
          </tr>
          <tr>
            <td>Total iterations:</td>
            <td>{comparisons}</td>
          </tr>
          <tr>
            <td>Already sorted:</td>
            <td>
              {alreadySorted} item{alreadySorted > 1 ? "s" : ""} (
              {(alreadySorted / (items / 100)).toFixed(2)}%)
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
