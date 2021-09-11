interface BottomBarProps{
    speed: number;
    comparisons: number;
}

export const BottomBar: React.FC<BottomBarProps> = ({speed, comparisons}) => {
    return (
        <div className="bottom-bar">
            <span>Speed: {speed} comparisons/s</span>
            <span>Total comparisons: {comparisons}</span>
        </div>
    )
}