import '../styles/BottomBar.css';
interface BottomBarProps {
  speed: number;
  comparisons: number;
  items: number;
  alreadySorted: number;
}
export const BottomBar: React.FC<BottomBarProps> = ({
  speed,
  comparisons,
  items,
  alreadySorted,
}) => {
  return (
    <div className="bottom-bar">
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
            <td>Total comparisons:</td>
            <td>{comparisons}</td>
          </tr>
          <tr>
            <td>Already sorted:</td>
            <td>
              {alreadySorted} item{alreadySorted > 1 ? 's' : ''} (
              {alreadySorted / (items / 100)}%)
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
