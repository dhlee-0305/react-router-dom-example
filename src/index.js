import React, {createContext, useContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './style.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes, NavLink, useParams } from 'react-router-dom';
import styled from "styled-components";

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

function App(){
  const theme = useContext(themeContext);
  console.log('theme:', theme);
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
