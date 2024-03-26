import React from 'react';
import ReactDOM from 'react-dom';

// const parent = document.getElementById("root");

// // using javascript

// // const h1 = document.createElement("h1");
// // h1.innerText = "Hi shaurya";
// // parent.appendChild(h1);


// // using ReactJs

// const obj = React;

// const root = ReactDOM.createRoot(parent);
// const h1 = obj.createElement("h1",{},"Hello shaurya, coming from react");
// const h2 = obj.createElement("h2",{},"this is a supporting div");
// const li = obj.createElement("li",{
//     className: 'li-item',
//     title: 'this is simple as shaurya makes it up'
// },"hello1");
// const li2 = obj.createElement("li",{},"hello32");
// const li3 = obj.createElement("li",{},"hello1");
// const li4 = obj.createElement("li",{},"hello2");
// const li5 = obj.createElement("li",{},"hello3");
// const ol = obj.createElement("ol",{},[li,li2,li3,li4,li5])
// const normalDiv = obj.createElement("div",{},[h1,h2,ol]);
// root.render(normalDiv);

const heading = <h1 className='black-mamba'>{document.querySelector("#root").setAttribute("class","the_parent")} this is a sample that we are doing</h1>;
const sec = ()=>{
    return {
        heading
    }
}
const parent = document.querySelector("#root");
const root = ReactDOM.createRoot(parent);
root.render(sec)