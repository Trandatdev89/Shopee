export const sendData=(value)=>{
    return({
        type:"data",
        value:value
    })
}

export const sortPrice=(value)=>{
    return({
        type:"sort",
        value:value
    })
}

export const reloadHeader=(value)=>{
    return({
        type:"reload",
        value:value
    })
}

export const send=(value)=>{
    return({
        type:"send",
        data:value
    })
}

export const reloadValue=(value)=>{
    return({
        type:"reload",
        data:value
    })
}
