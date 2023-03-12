import React from 'react';
import './App.css';
import {CardData, needs} from './Data';

function App() {
    function fontClass(t: CardData) {
        return "text" + (t.size || 1);
    }

    return (
        <div className="App">
            <div className="container">
                <div className="row text-center text-lg-start">
                    {needs.map(c => {
                        return <div className="card col-lg-3 col-md-4 col-sm-12">
                            <div className="card-body">
                                {c.data.map(t => <p className={fontClass(t)}>{t.text}</p>)}
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
