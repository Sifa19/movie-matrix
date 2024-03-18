export default function Box({ children }) {
    return (
        <div className="box">
            <button className="box-btn">-</button>
            {children}
        </div>
    );
}