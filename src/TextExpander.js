import { useState } from "react"


export default function TextExpander({
    data = "add some text...",
    showDefault = false,
    fontSize = "1rem",
    fontColor = "#fff",
    buttonColor = "blue",
    startStyle = ""
}) {

    const textStyle = {
        fontSize: fontSize,
        color: fontColor
    }

    const buttonStyle = {
        color: buttonColor,

    }

    const [showData, setShowData] = useState(showDefault)

    const lessData = data.slice(0, 100)

    return <div style={textStyle} className={startStyle}>
        {
            showData ?
                <>
                    {data}
                    <span
                        style={buttonStyle}
                        role="button"
                        onClick={() => setShowData(false)}>
                        show less</span>
                </> :
                <>
                    {lessData}
                    <span
                        style={buttonStyle}
                        role="button"
                        onClick={() => setShowData(true)}>
                        ...show more</span>
                </>
        }

    </div>
}