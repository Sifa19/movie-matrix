import { useState } from "react"


export default function TextExpander({
    data = "add some text...", fontSize = "1rem", fontColor = "#fff", buttonColor = "blue"
}) {

    const textStyle = {
        fontSize: fontSize,
        color: fontColor
    }

    const buttonStyle = {
        color: buttonColor,

    }

    const [showData, setShowData] = useState(false)

    const lessData = data.slice(100)

    return <div style={textStyle}>
        {
            showData ?
                <>{data}<span
                    style={buttonStyle}
                    role="button"
                    onClick={() => setShowData(false)}>
                    show less</span></> :
                <>{lessData}<span
                    style={buttonStyle}
                    role="button"
                    onClick={() => setShowData(true)}>
                    ...show more</span></>
        }

    </div>
}