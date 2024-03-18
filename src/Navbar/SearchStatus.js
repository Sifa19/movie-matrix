export default function SearchStatus({ data }) {
    return <div className="status">
        found {data.length} result
    </div>;
}
