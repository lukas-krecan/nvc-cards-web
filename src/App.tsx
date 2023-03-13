import React, {memo} from 'react';
import './App.css';
import {CardData, CardInfo, feelings, needs} from './Data';
import {Tab, Tabs} from "react-bootstrap";

type NvcCardsAppProps = {};

type NvcCardsAppState = {
    selectedCards: string[];
};

class App extends React.Component<
    NvcCardsAppProps,
    NvcCardsAppState
> {
    constructor(props: NvcCardsAppProps) {
        super(props);
        this.state = {
            selectedCards: [],
        };
    }

    private selectCard(item: CardInfo) {
        let selected = this.state.selectedCards;
        if (selected.indexOf(item.id) !== -1) {
            this.setState({selectedCards: selected.filter((id) => id !== item.id)});
        } else {
            this.setState({selectedCards: selected.concat([item.id])});
        }
    }

    render() {
        return (
            <div className="App">
                <Tabs>
                    <Tab eventKey="needs" title="Potřeby" key="needs">
                        <CardList cards={needs} selectedCards={this.state.selectedCards} onCardClick={this.selectCard.bind(this)}/>
                    </Tab>
                    <Tab eventKey="feelings" title="Pocity" key="feelings">
                        <CardList cards={feelings} selectedCards={this.state.selectedCards} onCardClick={this.selectCard.bind(this)}/>
                    </Tab>
                </Tabs>
            </div>
        );
    }
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


    function selectedClass(card: CardInfo) {
        if (!isSelected(card)) {
            return "";
        } else {
            return card.id.startsWith('n')
                ? "selectedNeed"
                : "selectedFeeling";
        }
    }

    return (
        <div className="container">
            <div className="row text-center text-lg-start">
                {cards.map(card => {
                    return <div
                        className={"card col-lg-3 col-md-4 col-sm-12 " + selectedClass(card)}
                        onClick={_ => props.onCardClick(card)}
                        key={key(card)}
                    >
                        <div className="card-body">
                            {card.data.map(t => <p className={fontClass(t)}>{t.text}</p>)}
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
};

export default App;
