import React, { useState } from "react";
import calc from './assets/calculator.png'

function Calculator() {
    const inputs = ["%", "CE", "C", "DEL", "1/x", "x^2", "√x", "/", "7", "8", "9", "X", "4", "5", "6", "-", "1", "2", "3", "+", "+/-", "0", ".", "="];
    const [display, setDisplay] = useState("0");
    const [operation, setOperation] = useState(null);
    const [operand, setOperand] = useState(null);

    const handleButtonClick = (input) => {
        switch (input) {
            case '%':
                setDisplay(String(parseFloat(display) / 100));
                break;
            case 'CE':
                setDisplay("0");
                break;
            case 'C':
                setDisplay("0");
                setOperation(null);
                setOperand(null);
                break;
            case 'DEL':
                setDisplay(display.slice(0, -1) || "0");
                break;
            case '=':
                if (operation && operand != null) {
                    const result = eval(`${operand} ${operation} ${display}`);
                    setDisplay(String(result));
                    setOperation(null);
                    setOperand(null);
                }
                break;
            case '+/-':
                setDisplay(String(parseFloat(display) * -1));
                break;
            case '1/x':
                setDisplay(String(1 / parseFloat(display)));
                break;
            case 'x^2':
                setDisplay(String(parseFloat(display) ** 2));
                break;
            case '√x':
                setDisplay(String(Math.sqrt(parseFloat(display))));
                break;
            case 'X':
                setOperation('*');
                setOperand(parseFloat(display));
                setDisplay("0");
                break;
            case '+':
            case '-':
            case '/':
                setOperation(input);
                setOperand(parseFloat(display));
                setDisplay("0");
                break;
            default:
                setDisplay(display === "0" ? input : display + input);
        }
    };



    const buttons = inputs.map((input) => (
        <button
            key={input}
            className="border border-stone-300 rounded-md shadow-md bg-stone-50 hover:bg-stone-100 items-center justify-center"
            onClick={() => handleButtonClick(input)}
        >
            {input}
        </button>
    ));

    return (
        <div className="flex flex-col w-80 h-[525px] bg-neutral-100 border border-stone-400 rounded-lg overflow-hidden">
            <div className="flex w-full h-8 items-center justify-between">
            <div className="flex ml-4 gap-4 items-center">
            <img src={calc} alt="calculator" className=" w-4 h-4" />
          <p className="text-[11px] font-semibold">Calculator</p>
        </div>
        <div className="flex items-center">
          <button className="flex h-8 w-10 hover:bg-stone-300 items-center justify-center">
            <div className="w-3 h-[0.5px] bg-gray-600" />
          </button>
          <button className="flex h-8 w-10 hover:bg-stone-300 items-center justify-center">
            <div className="w-3 h-3 border border-neutral-600 rounded-sm" />
          </button>
          <button className="flex h-8 w-12 hover:bg-[#C92E23] hover:text-white font-thin items-center justify-center">
            X
          </button>
        </div>
                {/* Title and Control Buttons */}
            </div>
            <div className="flex flex-col p-1">
                <div className="w-full h-14 px-2 ">
                    <p className="text-right text-stone-500 mt-8">{operation? operand + operation: ''}</p>
                </div>
                <div className="w-full px-2" >
                    <p className=" text-right text-5xl font-semibold ">{display}</p>
                </div>
                <div className="grid grid-cols-4 w-full h-80 grid-rows-6 gap-1 relative top-12">
                    {buttons}
                </div>
            </div>
        </div>
    );
}

export default Calculator;