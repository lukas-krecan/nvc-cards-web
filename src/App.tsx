import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Container} from "react-bootstrap";
import {CardInfo, CardData, feelings, findCard, needs} from './Data';

function App() {
    return (
        <div className="App">
            <div className="container">
                <div className="row text-center text-lg-start">
                    {needs.map(c => {
                        return <div className="card col-lg-3 col-md-4 col-sm-12">
                            <div className="card-body">
                                {c.data.map(t => <p className="card-text">{t.text}</p>)}
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
