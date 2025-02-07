import React, {createContext, useContext, useState, useReducer} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './style.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes, NavLink, useParams } from 'react-router-dom';
import styled from "styled-components";
import { createStore } from 'redux';
import {Provider, useSelector, useDispatch, connect} from 'react-redux';

const themeDefault = {border: '10px solid red'};
const themeContext = createContext(themeDefault);

const SimpleButton = styled.button`
  color: white;
  background: green;
`;
const LargeButton = styled(SimpleButton)`
  font-size: 50px;
`;

const ReactButton = props =>{
  return <button className={props.className}>{props.children}</button>;
}
const ReactLargeButton = styled(ReactButton)`
  font-size: 50px;
`;

const PrimaryButton = styled.button`
  color: ${props => props.primary ? 'white' : 'black'};
  background: ${props => props.primary ? 'blue' : 'gray'};
  `;

function Home(){
  return (
    <div>
      <h2>Home</h2>
      Home...
    </div>
  );  
}

var contents = [
  { id: 1, title: "HTML", description: "HTML is ..." },
  { id: 2, title: "JS", description: "JS is ..." },
  { id: 3, title: "React", description: "React is ..." },
];

function Topic(){
  var params = useParams();
  var topic_id = params.topic_id;
  var selected_topic = {
    title:'Sorry',
    desc:'Not Found'
  };
  for (var i=0; i<contents.length; i++){
    if (contents[i].id === Number(topic_id)){
      selected_topic = contents[i];
      break;
    }
  }
  console.log(params);      
  return (
    <div>
      <h3>{selected_topic.title}</h3>
      {selected_topic.description}
    </div>
  );
}

function Topics(){
  var lis = [];
  for (var i=0; i<contents.length; i++){
    lis.push(
      <li key={contents[i].id}>
        <NavLink to={"/topics/"+contents[i].id}> {contents[i].title} </NavLink>
      </li>
    );
  }
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        {lis}
      </ul>
      <Routes>
        <Route path="/:topic_id" element={<Topic />} />
      </Routes>
    </div>
  );
}

function Contact(){
  return (
    <div>
      <h2>Contact</h2>
      Contact...
    </div>
  );
}

function reducer(currentState, action){
  if(currentState === undefined){
    return {number: 1};
  }
  const newState = {...currentState};
  if(action.type === 'PLUS'){
    newState.number++;
  }

  return newState;
}
const store = createStore(reducer);

function Left1(props){
  return (
    <div>
      <h2>Left1</h2>
      <Left2></Left2>
    </div>
  );
}
function Left2(props){ 
  return (
    <div>
      <h1>Left2</h1>
      <Left3></Left3>
    </div>
  );
}
function Left3(props){
  const number = useSelector((state)=>state.number);
  return (
    <div>
      <h1>Left3 : {number} </h1>
    </div>
  );
}

function Right1(props){
  return (
    <div>
      <h2>Right1</h2>
      <Right2></Right2>
    </div>
  );
}
function Right2(props){
  
  return (
    <div>
      <h1>Right2</h1>
      <Right3></Right3>
    </div>
  );
}
function Right3(props){
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Right3</h1>
      <input 
        type="button" 
        value="+" 
        onClick={() => {
          dispatch({type: 'PLUS'})}}>
      </input>
    </div>
  );
}

function App(){
  const theme = useContext(themeContext);
  console.log('theme:', theme);
    
  function countReducer(oldCount, action){
    switch(action.type){
      case 'UP':
        return oldCount + action.number;
      case 'DOWN':
        return oldCount - action.number;
      case 'RESET':
        return 0;
    }
  }
  const [count, countDispatch] = useReducer(countReducer, 0);
  function down(){
    countDispatch({type: 'DOWN', number: number});
  }
  function reset(){
    countDispatch({type: 'RESET', number: number});
  }
  function up(){
    countDispatch({type: 'UP', number: number});
  }

  function changeNumber(event){
    setNumber(Number(event.target.value));
  }
  const [number, setNumber] = useState(1);
  
  return (
    <div>

      <themeContext.Provider value={{ border: "10px solid blue" }}>
        <div className="root" style={theme}>
          <h1>Hello World!</h1>
          <Sub1 />
        </div>
      </themeContext.Provider>

      <SimpleButton>Simple Button</SimpleButton>
      <LargeButton>Large Button</LargeButton>
      <ReactButton>React Button</ReactButton>
      <ReactLargeButton>React Large Button</ReactLargeButton>
      <PrimaryButton>Normal</PrimaryButton>
      <PrimaryButton primary>Primary</PrimaryButton>
      
      <br />
      <input type="button" value="-" onClick={down} />
      <input type="button" value="0" onClick={reset} />
      <input type="button" value="+" onClick={up} />
      <input type="text" value={number} onChange={changeNumber} />
      <span>{count}</span>

      <h1>Hello React Router DOM </h1>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/topics">Topics</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topics/*" element={<Topics />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/*" element={"Not Found"} />
      </Routes>


    <div  id="container">
    <h1>Root</h1>
      <div id="grid">
        <Provider store={store}>
          <Left1></Left1>
          <Right1></Right1>
        </Provider>
      </div>
    </div>
    </div>
  );
}

function Sub1(){
  const theme = useContext(themeContext);
  return (
    <themeContext.Provider value={{border: '10px solid green'}}>
      <div style={theme}>
        <h1>Sub1</h1>
        <Sub2 />
      </div>
    </themeContext.Provider>
  );
}

function Sub2(){
  const theme = useContext(themeContext);
  return (
    <div style={theme}>
      <h1>Sub2</h1>
      <Sub3 />
    </div>
  );
}

function Sub3(){
  const theme = useContext(themeContext);
  return (
    <div style={theme}>
      <h1>Sub3</h1>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
