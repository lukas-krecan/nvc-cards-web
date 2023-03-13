import React, {memo} from 'react';
import './App.css';
import {CardData, CardInfo, feelings, findCard, needs} from './Data';
import {Card, Container, Nav, Navbar, Row, Tab, Tabs} from "react-bootstrap";

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

    private getSelectedCardsList() {
        return this.state.selectedCards.map((id) => findCard(id));
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
                <Container>
                    <Tabs>
                        <Tab eventKey="needs" title="Potřeby" key="needs">
                            <CardList cards={needs} selectedCards={this.state.selectedCards}
                                      onCardClick={this.selectCard.bind(this)}/>
                        </Tab>
                        <Tab eventKey="feelings" title="Pocity" key="feelings">
                            <CardList cards={feelings} selectedCards={this.state.selectedCards}
                                      onCardClick={this.selectCard.bind(this)}/>
                        </Tab>
                        <Tab eventKey="selection" title="Výběr" key="selection">
                            <CardList cards={this.getSelectedCardsList()} selectedCards={this.state.selectedCards}
                                      onCardClick={this.selectCard.bind(this)}/>
                        </Tab>
                    </Tabs>
                </Container>
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

    const isSelected = (card: CardInfo): boolean => {
        return props.selectedCards.indexOf(card.id) !== -1;
    };

    return (
        <Container>
            <Row className="text-center text-lg-start">
                {cards.map(card => {
                    return <CardView onCardClick={props.onCardClick} card={card} isSelected={isSelected(card)}
                                     key={card.id}/>
                })}
            </Row>
        </Container>
    );
};

type CardProps = {
    card: CardInfo;
    isSelected: boolean;
    onCardClick: (card: CardInfo) => void;
};

const CardView = (props: CardProps) => {
    const {card, isSelected} = props;

    const fontClass = (t: CardData) => "text" + (t.size || 1);

    function selectedClass(card: CardInfo) {
        if (!isSelected) {
            return "";
        } else {
            return card.id.startsWith('n')
                ? "selectedNeed"
                : "selectedFeeling";
        }
    }

    return <div
        className={"card col-lg-3 col-md-4 col-sm-12 " + selectedClass(card)}
        onClick={_ => props.onCardClick(card)}
    >
        <div className="card-body">
            {card.data.map((t, i) => <p className={fontClass(t)} key={i}>{t.text}</p>)}
        </div>
    </div>
}

export default App;
