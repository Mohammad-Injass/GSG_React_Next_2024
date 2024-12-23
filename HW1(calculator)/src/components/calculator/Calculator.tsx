import { useState } from "react";
import ResultDisplay from "./ResultDisplay";
import './Calculator.css'

const Calculator = () => {
    const [currentInput, setCurrentInput] = useState<string>("");
    const [operation, setOperation] = useState<string | null>(null);
    const [previousValue, setPreviousValue] = useState<number | null>(null);
    const [result, setResult] = useState<string>("0");

    const handleNumberClick = (number: string) => {
        setCurrentInput((prev) => prev + number);
    };

    const handleOperationClick = (op: string) => {
        if (currentInput) {
            setPreviousValue(parseFloat(currentInput));
            setOperation(op);
            setCurrentInput("");
        }
    };

    const handleEqualsClick = () => {
        if (operation && previousValue !== null && currentInput) {
            const current = parseFloat(currentInput);
            let calculatedResult: number | null = null;

            switch(operation) { 
                case "+": { 
                    calculatedResult = previousValue + current;
                   break; 
                } 
                case "-": { 
                    calculatedResult = previousValue - current; 
                   break; 
                } 
                case "*": { 
                    calculatedResult = previousValue * current; 
                   break; 
                } 
                case "/": { 
                    if (current != 0)
                    calculatedResult = previousValue / current; 
                   break; 
                } 
                default: { 
                   break; 
                } 
             }

            if (calculatedResult !== null) {
                setResult(
                    `${previousValue} ${operation} ${current} = ${calculatedResult}`
                );
                setCurrentInput("");
                setOperation(null);
                setPreviousValue(null);
            }
        }
    };

    const handleClear = () => {
        setCurrentInput("");
        setOperation(null);
        setPreviousValue(null);
        setResult("0");
    };

    return (
        <div className="mianDiv">
            <ResultDisplay result={currentInput || operation || result} />
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "10px",
                }}
            >
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((number) => (
                    <button className="numberDiv" key={number} onClick={() => handleNumberClick(number)}>
                        {number}
                    </button>
                ))}
                <button className="buttonOp"
                    onClick={() => handleOperationClick("+")}
                >
                    +
                </button>
                <button className="buttonOp"
                    onClick={() => handleOperationClick("-")}

                >
                    -
                </button>
                <button className="buttonOp"
                    onClick={() => handleOperationClick("*")}

                >
                    *
                </button>
                <button className="buttonOp"
                    onClick={() => handleOperationClick("/")}

                >
                    /
                </button>
                <button className="buttonClear buttonEquals_Clear"
                    onClick={handleClear}

                >
                    Clear
                </button>
                <button className="buttonEquals buttonEquals_Clear"
                    onClick={handleEqualsClick}
                >
                    =
                </button>
         
            </div>
        </div>
    );
};

export default Calculator;
