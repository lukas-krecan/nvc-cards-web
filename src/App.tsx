import React from 'react';
import './App.css';
import {CardData, CardInfo, feelings, findCard, needs} from './Data';
import {Card, Container, Nav, Navbar, NavbarBrand, Row, Tab, Tabs} from "react-bootstrap";
import Dragula from "react-dragula";

type NvcCardsAppProps = {};

type Screens = 'feelings' | 'needs' | 'selection';

type NvcCardsAppState = {
    activeScreen: Screens;
    selectedCards: string[];
};

class App extends React.Component<
    NvcCardsAppProps,
    NvcCardsAppState
> {
    constructor(props: NvcCardsAppProps) {
        super(props);
        this.state = {
            activeScreen: 'feelings',
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

    private setNewSelection(ids: string[]) {
        this.setState({selectedCards: ids});
    }
    private screenSelection(screenId: Screens, label: string) {
        const activeScreen = this.state.activeScreen;

        return <Nav.Link active={activeScreen == screenId}
                         onClick={() => this.setState({activeScreen: screenId})}>{label}</Nav.Link>;
    }


    render() {
        return (
            <Container>
                <Navbar bg="light" expand="sm" sticky="top">
                    <NavbarBrand>NvcCards</NavbarBrand>
                    <Nav>
                        {this.screenSelection('feelings', 'Pocity')}
                        {this.screenSelection('needs', 'Potřeby')}
                        {this.screenSelection('selection', 'Výběr')}
                    </Nav>
                    <Navbar.Toggle aria-controls="navbarSupportedContent"/>
                    <Navbar.Collapse id="navbarSupportedContent">
                        <Nav>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <CardList cards={feelings} selectedCards={this.state.selectedCards}
                          onCardClick={this.selectCard.bind(this)} />

                <CardList cards={needs} selectedCards={this.state.selectedCards}
                          onCardClick={this.selectCard.bind(this)}/>

                <SelectedCardList cards={this.getSelectedCardsList()} selectedCards={this.state.selectedCards}
                                  onCardClick={this.selectCard.bind(this)}
                                  onSelectionChange={this.setNewSelection.bind(this)}/>
            </Container>
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

type SelectedCardListProps = CardListProps & {
    onSelectionChange: (ids: string[]) => void
};

class SelectedCardList extends React.Component<SelectedCardListProps> {

    render() {
        const {cards} = this.props;

        const isSelected = (card: CardInfo): boolean => {
            return this.props.selectedCards.indexOf(card.id) !== -1;
        };

        return (
            <Container>
                <Row className="text-center text-lg-start" ref={this.dragulaDecorator}>
                    {cards.map(card => {
                        return <CardView onCardClick={this.props.onCardClick} card={card} isSelected={isSelected(card)}
                                         key={card.id}/>
                    })}
                </Row>
            </Container>
        );
    }

    dragulaDecorator = (componentBackingInstance: HTMLElement) => {
        if (componentBackingInstance) {
            let options = {};
            Dragula([componentBackingInstance], options).on('drop', el => {
                const ids = this.getChildrenIds(componentBackingInstance);
                this.props.onSelectionChange(ids)
            })
        }
    };

    private getChildrenIds(componentBackingInstance: HTMLElement) {
        const ids = []
        const children = componentBackingInstance.children;
        for (let i = 0; i < children.length; i++) {
            ids.push(children[i].id)
        }
        return ids;
    }
}

type CardProps = {
    card: CardInfo;
    isSelected: boolean;
    onCardClick: (card: CardInfo) => void;
};

const CardView = (props: CardProps) => {
    const {card, isSelected} = props;

    const guessFontSize = (text: string): number => {
        if (text.length < 20) {
            return 1;
        } else if (text.length < 25) {
            return 2;
        } else {
            return 3;
        }
    };

    const fontClass = (c: CardData) => "text" + (c.size ? c.size : guessFontSize(c.text));

    function selectedClass(card: CardInfo) {
        if (!isSelected) {
            return "";
        } else {
            return card.id.startsWith('n')
                ? "selectedNeed"
                : "selectedFeeling";
        }
    }

    return <Card
        className={"col-lg-3 col-md-4 col-sm-12 text-center " + selectedClass(card)}
        onClick={_ => props.onCardClick(card)}
        id={card.id}
    >
        <div className="card-body">
            {card.data.map((t, i) => <p className={fontClass(t)} key={i}>{t.text}</p>)}
        </div>
    </Card>
}

export default App;
