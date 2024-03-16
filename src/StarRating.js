import { useState } from "react";
import PropTypes from "prop-types"

const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
};

const starContainerStyle = {
    display: "flex",
    gap: "0.5rem",
};


StarRating.propTypes = {
    maxRating: PropTypes.number.isRequired,
    defaultRating: PropTypes.number,
    color: PropTypes.string,
    setStarRating: PropTypes.func
}


export default function StarRating({
    maxRating = 5,
    defaultRating = 0,
    setStarRating,
    color = '#fcc419',
    size = '1rem' }) {


    const emptyStartStyle = {
        fontSize: size,
        cursor: "pointer",
    };

    const fullStartStyle = {
        fontSize: size,
        cursor: "pointer",
        color: color
    };

    const textStyle = {
        lineHeight: "1",
        margin: "0",
        fontSize: size
    };

    const [rating, setRating] = useState(defaultRating);
    const [tempRating, setTempRating] = useState(defaultRating);

    setStarRating((s) => rating)

    var full;
    return (
        <div style={containerStyle}>
            <div style={starContainerStyle}>
                {Array.from({ length: maxRating }).map((_, indx) => {
                    full = tempRating ? tempRating >= indx + 1 : rating >= indx + 1
                    return (
                        full ?
                            <Star
                                key={indx}
                                startStyle={fullStartStyle}
                                onRate={() => setRating(indx + 1)}
                                onMouseOver={() => setTempRating(indx + 1)}
                                onMouseLeave={() => setTempRating(0)}
                            />
                            : <Star
                                key={indx}
                                startStyle={emptyStartStyle}
                                onRate={() => setRating(indx + 1)}
                                onMouseOver={() => setTempRating(indx + 1)}
                                onMouseLeave={() => setTempRating(0)}
                            />

                    );
                })}
            </div>
            <p style={textStyle}>{tempRating || rating || ""}</p>
        </div>
    );
}




function Star({ startStyle, onRate, onMouseOver, onMouseLeave }) {

    return <span
        style={startStyle}
        className={`fa fa-star`}
        role="button"
        onClick={onRate}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
    ></span>
}

