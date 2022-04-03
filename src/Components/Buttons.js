// / import { toContainHTML } from '@testing-library/jest-dom/dist/matchers'
import React from 'react'
// import {useState} from 'react';

const btns = [
    {
        label: "AC",
        clsName: "clear"
    },
    {
        label: "C",
        clsName: "clean"
    },
    {
        label: "/",
        clsName: "devide"
    },
    {
        label: "*",
        clsName: "multi"
    },
    {
        label: "+",
        clsName: "plus"
    },
    {
        label: "-",
        clsName: "minus"
    },
    {
        label: "7",
        clsName: "no-7"
    },
    {
        label: "8",
        clsName: "no-8"
    },
    {
        label: "9",
        clsName: "no-9"
    },
    {
        label: "4",
        clsName: "no-4"
    },
    {
        label: "5",
        clsName: "no-5"
    },
    {
        label: "6",
        clsName: "no-6"
    },
    {
        label: "1",
        clsName: "no-1"
    },
    {
        label: "2",
        clsName: "no-2"
    },
    {
        label: "3",
        clsName: "no-3"
    },
    {
        label: "0",
        clsName: "no-0"
    },
    {
        label: ".",
        clsName: "dot"
    },
    {
        label: "=",
        clsName: "ans"
    }

]

const calcSymbols = ['+', '-', '*', '/'];
let textToDisplay = "";
let calculatedResult="";
let indexOfAllSymbols = [];
let  containSymbol = false;


export const Buttons = ({displayFunc}) => {
    const handleClick = (btnValue) => {
        //if there's remaining result from previouse calculation and user pressed a number (not the operator sign or equal sign), then wipeout the previouse calculated result)
        if (calculatedResult!=="" && !(calcSymbols.includes(btnValue)) && btnValue!=="="){
            calculatedResult = "";
        }

        // transfer previouseCalculatedResult to textToDisplay and then wipe it out, if it hasn't been wiped it out in the previous if statement. 
        textToDisplay = textToDisplay + calculatedResult;
        calculatedResult = "";

        // if the current value is dot , and the previouse value is dot => do nohing(no need to add currentDot to the text to display), end handleClick.    
        if (btnValue === "." && textToDisplay[textToDisplay.length - 1] === ".") return;

        //if textToDisplay is empty and user press any operators symbol or sezo to start with => do nothing, end handleClick func.
         if(textToDisplay===""){
             if(calcSymbols.includes(btnValue) || btnValue === "0"){
                return;
             }
        }

        // if AC key pressed, wipeout textToDisplay and show 0 on screen.
        if (btnValue === "AC") {
            textToDisplay = "";
            return displayFunc("0");
        }

        //if C key pressed
        if (btnValue === "C") {
            textToDisplay = textToDisplay.slice(0, -1);
            if (textToDisplay.length) {
                return displayFunc(textToDisplay);
            }
            else
            {
                return displayFunc(0); //if user clears everything return 0 to the display reader.
            }
        }

        // if last character is operator, and operator is pressed, then, remove the previouse operator
        if (calcSymbols.includes(btnValue) && calcSymbols.includes(textToDisplay[textToDisplay.length - 1])){
            textToDisplay = textToDisplay.slice(0,-1);
        }

        // if 0 is pressed and the character before is symbol, do nothing and end the handleClicked func
        if(btnValue==="0" && calcSymbols.includes(textToDisplay[textToDisplay.length-1])){
            return;
        }

        
        //***********************************************************
        //
        //  Allow only 1 dot (max) after any operator
        //
        //***********************************************************

        // Collecting index of each operator to put to an array  and sort it  
        if(textToDisplay!==""){
            if (calcSymbols.includes(btnValue)){    
                indexOfAllSymbols.push(textToDisplay.length)
                indexOfAllSymbols.sort((a,b)=> b-a);
            }
        }
        // if(textToDisplay !==""){
        //     indexOfAllSymbols = textToDisplay.filter((element,idex) => (calcSymbols.includes(btnValue))); 
        //     indexOfAllSymbols.sort((a,b) => b-a);
        // }
        
        
        //Check if textToDisplay contain symbol
        containSymbol = calcSymbols.some(element => 
            textToDisplay.includes(element));
        
        //if contain symbol, find subString after the last operator and check if it contain dot.
        if (containSymbol){
            let indexOfLastOperator = indexOfAllSymbols[0];       
            let subString = containSymbol ? textToDisplay.slice(indexOfLastOperator): textToDisplay;
            let subStringContainDot=subString.includes(".");
            if(btnValue === "." && subStringContainDot){
                return;
            } 
        }else if(textToDisplay.includes(".") && btnValue === (".")) return; // if not contain symbol, do not allow second dot.

        //********************************************
        if (btnValue === "=") 
        {
            // if textToDisplay is null, do nothing and end this handleClick Func
            if (textToDisplay===""){
                return displayFunc(textToDisplay); 
            } 

            //if last char is symbol ==> remove symbol
            if (calcSymbols.includes(textToDisplay[textToDisplay.length - 1])) { 
                textToDisplay = textToDisplay.slice(0, -1);
            }
            calculateTotal(textToDisplay);
            indexOfAllSymbols = [];
            return;
        }

        textToDisplay = textToDisplay + btnValue;
        displayFunc(textToDisplay);  
    }

    const calculateTotal = () => {
        try{
            textToDisplay = String(eval(textToDisplay).toFixed(4));
            displayFunc(textToDisplay);
            calculatedResult = textToDisplay;
            textToDisplay = "";         
        }catch (e){
            console.log(e);
        }
    }

  return (
    <div className="items">
        {
            btns.map((btn,i) => (
                <button key={i} className={btn.clsName} onClick={()=>{handleClick(btn.label)}}>{btn.label}</button>
            ))
        }
    </div>   
  )
}
