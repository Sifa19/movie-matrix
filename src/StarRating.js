import { useState } from "react";
import PropTypes from "prop-types"

const containerStyle = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
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
    size = '1',
    startStyle = ""
}) {


    const emptyStartStyle = {

        fontSize: size + "rem",
        cursor: "pointer",
        color: color
    };

    const fullStartStyle = {

        fontSize: size + "rem",
        cursor: "pointer",
        color: color
    };

    const textStyle = {
        height: size + "rem",
        display: "flex",
        alignItems: "flex-end",
        lineHeight: "1",
        margin: "0",
        fontSize: (size - 0.4) + "rem",
        color: color
    };

    const [rating, setRating] = useState(defaultRating);
    const [tempRating, setTempRating] = useState(defaultRating);

    setStarRating((s) => rating)

    var full;
    return (
        <div style={containerStyle} className={startStyle}>
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
                            >
                                &#9733;
                            </Star>
                            : <Star
                                key={indx}
                                startStyle={emptyStartStyle}
                                onRate={() => setRating(indx + 1)}
                                onMouseOver={() => setTempRating(indx + 1)}
                                onMouseLeave={() => setTempRating(0)}
                            >
                                &#9734;
                            </Star>

                    );
                })}
            </div>
            <span style={textStyle}>{tempRating || rating || "0"}</span>
        </div >
    );
}




function Star({ startStyle, onRate, onMouseOver, onMouseLeave, children }) {

    return <span
        style={startStyle}
        // className={`fa fa-star`}
        role="button"
        onClick={onRate}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
    >{children}
    </span>
}

