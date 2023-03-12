import React, {memo} from 'react';
import './App.css';
import {CardData, CardInfo, feelings, needs} from './Data';
import {Tab, Tabs} from "react-bootstrap";

function App() {
    return (
        <div className="App">
            <Tabs>
                <Tab eventKey="needs" title="Potřeby">
                    <CardList cards={needs} selectedCards={[]} onCardClick={c => null} />
                </Tab>
                <Tab eventKey="feelings" title="Pocity">
                    <CardList cards={feelings} selectedCards={[]} onCardClick={c => null} />
                </Tab>
            </Tabs>
        </div>
    );
}

type CardListProps = {
    cards: CardInfo[];
    selectedCards: string[];
    onCardClick: (card: CardInfo) => void;
};

const CardList = (props: CardListProps) => {
    const {cards} = props;

    const isSelected = (item: CardInfo): boolean => {
        return props.selectedCards.indexOf(item.id) !== -1;
    };

    const key = (card: CardInfo) => card.id;

    const fontClass = (t: CardData) => "text" + (t.size || 1);

    return (
        <div className="container">
            <div className="row text-center text-lg-start">
                {cards.map(c => {
                    return <div className="card col-lg-3 col-md-4 col-sm-12">
                        <div className="card-body">
                            {c.data.map(t => <p className={fontClass(t)}>{t.text}</p>)}
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
};

export default App;
