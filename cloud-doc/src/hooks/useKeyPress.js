import { useState,useEffect } from "react";

const useKeyPress = ( triggerKeyCode ) => {
    const [isTrigger,setIsTrigger] = useState(false);

    useEffect(() => {
        const keyDownHandle = ({keyCode}) => {
            console.log(`keyDownHandle${keyCode}`)
            if(keyCode === triggerKeyCode){
                setIsTrigger(true)
            }
        };
        const keyUpHandle = ({keyCode}) => {
            console.log(`keyUpHandle${keyCode}`)
            if(keyCode === triggerKeyCode){
                setIsTrigger(false)
            }
        };
        document.addEventListener('keyup',keyUpHandle);
        document.addEventListener('keydown',keyDownHandle);

        return () => {
            document.removeEventListener('keyup',keyUpHandle);
            document.removeEventListener('keydown',keyDownHandle);
        }
    },[]); //设置空deps 仅挂载时调用

    return isTrigger;
};

export default useKeyPress;