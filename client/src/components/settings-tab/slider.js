import React, { useState } from "react"


function Slider(props) {

    const gray = '#353535'
    const green = '#40D534 '
    let bgColor = gray

    if(props.data.anim === 'animate-on'){
        bgColor = green
    }
    const [style, setStyle] = useState({
        child:`h-6 w-6 scale-90 rounded-full bg-white pointer-events-none ${props.data.anim}`,
        parent: bgColor,
    })

    const handleAnims = () => {
        if(style.child === 'h-6 w-6 scale-90 rounded-full bg-white pointer-events-none animate-on'){
            setStyle({
                child:`h-6 w-6 scale-90 rounded-full bg-white pointer-events-none animate-off`,
                parent: gray,
            })
        } else {
            setStyle({
                child:`h-6 w-6 scale-90 rounded-full bg-white pointer-events-none animate-on`,
                parent: green,
            })
        }
    }
    return (
        <div className="px-4 flex items-center justify-between text-2xl h-12 border-b text-lg">
        <div className="mr-2 font-normal">{props.data.title}</div>
        <div onClick={() => handleAnims()}
        className={'h-6 w-12 rounded-full hover:cursor-pointer'}
        style={{backgroundColor: style.parent}}>
            <div 
                className={style.child}
            ></div>
        </div>
    </div>
    )
}

export default Slider