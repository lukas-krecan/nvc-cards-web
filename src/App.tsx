import React from 'react';
import './App.css';
import {CardData, CardInfo, feelings, findCard, needs} from './Data';
import {Card, Container, Nav, Navbar, NavbarBrand, Offcanvas, Row} from "react-bootstrap";
import Dragula from "react-dragula";
import SaveDialog from "./SaveDialog";
import ShareDialog from "./ShareDialog";

type NvcCardsAppProps = {};

type Screens = 'feelings' | 'needs' | 'selection';

type NvcCardsAppState = {
    activeScreen: Screens;
    selectedCards: string[];

    navBarExpanded: boolean;

    shareModalShown: boolean;

    saveModalShown: boolean;
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
            navBarExpanded: false,
            shareModalShown: false,
            saveModalShown: false
        };
    }

    componentDidMount() {
        this.recoverState();
    }

    componentDidUpdate() {
        this.saveState();
    }

    private recoverState() {
        const result = localStorage.getItem('@last')
        try {
            if (result != null) {
                const savedResult = JSON.parse(result);
                this.setStoredState(savedResult.selectedCards, savedResult.activeScreen)
            }
        } catch (e) {
            console.error(e);
        }
    }

    private setStoredState(selectedCards: string[], activeScreen: Screens) {
        this.setState({
            activeScreen: activeScreen,
            selectedCards: selectedCards,
            navBarExpanded: false,
            shareModalShown: false,
            saveModalShown: false
        });
    }

    private saveState() {
        localStorage.setItem('@last', JSON.stringify({
            activeScreen: this.state.activeScreen,
            selectedCards: this.state.selectedCards,
        }));
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
        this.setState({selectedCards: ids, navBarExpanded: false});
    }

    private clean() {
        this.setNewSelection([])
    }

    private share() {
        this.setState({shareModalShown: true});
    }

    private save() {
        this.setState({saveModalShown: true});
    }

    private handleSave(name: string) {
        localStorage.setItem('saved-' + new Date().toISOString(), JSON.stringify({
            activeScreen: this.state.activeScreen,
            selectedCards: this.state.selectedCards,
            name: name,
            savedAt: new Date()
        }));
    }

    private hideModals() {
        this.setState({shareModalShown: false, navBarExpanded: false, saveModalShown: false});
    }


    render() {
        const noCardsSelected = this.state.selectedCards.length === 0;
        return (
            <Container>
                <Navigation expanded={this.state.navBarExpanded}
                            toggle={expanded => this.setState({navBarExpanded: expanded})}
                            activeScreen={this.state.activeScreen}
                            setActiveScreen={screen => this.setState({activeScreen: screen})}
                            noCardsSelected={noCardsSelected}
                            clean={this.clean.bind(this)}
                            share={this.share.bind(this)}
                            save={this.save.bind(this)}
                />

                <CardList cards={feelings} selectedCards={this.state.selectedCards}
                          onCardClick={this.selectCard.bind(this)} active={this.state.activeScreen === 'feelings'}/>

                <CardList cards={needs} selectedCards={this.state.selectedCards}
                          onCardClick={this.selectCard.bind(this)} active={this.state.activeScreen === 'needs'}/>

                <SelectedCardList cards={this.getSelectedCardsList()} selectedCards={this.state.selectedCards}
                                  onCardClick={this.selectCard.bind(this)}
                                  onSelectionChange={this.setNewSelection.bind(this)}
                                  active={this.state.activeScreen === 'selection'}/>

                <ShareDialog selectedCards={this.getSelectedCardsList()} show={this.state.shareModalShown}
                             handleClose={this.hideModals.bind(this)}/>

                <SaveDialog show={this.state.saveModalShown}
                            handleSave={this.handleSave.bind(this)}
                            handleClose={this.hideModals.bind(this)}/>
            </Container>
        );
    }
}

type NavigationProps = {
    expanded: boolean,
    activeScreen: Screens,
    toggle: (expanded: boolean) => void,
    noCardsSelected: boolean,
    share: () => void,
    clean: () => void,
    save: () => void,
    setActiveScreen: (screen: Screens) => void
}

class Navigation extends React.Component<NavigationProps> {

    private screenSelection(screenId: Screens, label: string, disabled: boolean = false) {
        const activeScreen = this.props.activeScreen;

        return <Nav.Link active={activeScreen === screenId}
                         disabled={disabled}
                         onClick={() => this.props.setActiveScreen(screenId)}>{label}</Nav.Link>;
    }

    render() {
        return <Navbar collapseOnSelect
                       bg="light"
                       expand="sm"
                       sticky="top"
                       expanded={this.props.expanded}
                       onToggle={this.props.toggle}>
            <NavbarBrand>NVC</NavbarBrand>
            <Nav>
                {this.screenSelection('feelings', 'Pocity')}
                {this.screenSelection('needs', 'Potřeby')}
                {this.screenSelection('selection', 'Výběr', this.props.noCardsSelected)}
            </Nav>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`}/>
            <Navbar.Offcanvas
                id={`offcanvasNavbar-expand`}
                aria-labelledby={`offcanvasNavbarLabel-expand`}
                placement="end"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                        NVC Kartičky
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Navbar.Toggle aria-controls="navbarSupportedContent"/>
                        <Navbar.Collapse id="navbarSupportedContent">
                            <Nav>
                                <Nav.Link onClick={this.props.clean}
                                          disabled={this.props.noCardsSelected}>Vymazat výběr</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link onClick={this.props.save}
                                          disabled={this.props.noCardsSelected}>Uložit</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link onClick={this.props.share}
                                          disabled={this.props.noCardsSelected}>Sdílet</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link href="https://lukas-krecan.github.io/nvc-cards-web/help.html"
                                          target="_blank">Nápověda</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Nav>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Navbar>;
    }
}

type CardListProps = {
    active: boolean;
    cards: CardInfo[];
    selectedCards: string[];
    onCardClick: (card: CardInfo) => void;
};

const CardList = (props: CardListProps) => {
    const {cards, active} = props;

    const isSelected = (card: CardInfo): boolean => {
        return props.selectedCards.indexOf(card.id) !== -1;
    };

    return (
        <Container className={!active ? "hidden" : ""}>
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

function hideIf(cond: boolean) {
    return cond ? " hidden" : "";
}

class SelectedCardList extends React.Component<SelectedCardListProps> {

    render() {
        const {cards, active} = this.props;

        const isSelected = (card: CardInfo): boolean => {
            return this.props.selectedCards.indexOf(card.id) !== -1;
        };

        return (
            <Container className={hideIf(!active)}>
                <Row className={"text-center text-lg-start" + hideIf(cards.length === 0)} ref={this.dragulaDecorator}>
                    {cards.map(card => {
                        return <CardView onCardClick={this.props.onCardClick} card={card}
                                         isSelected={isSelected(card)}
                                         key={card.id}/>
                    })}
                </Row>

                <Row className={"text-center text-lg-start" + hideIf(cards.length > 0)}>
                    Nejsou vybrány žádné kartičky
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
        <div className="card-body d-flex flex-column justify-content-center align-items-center">
            {card.data.map((t, i) => <span className={fontClass(t)} key={i}>{t.text}</span>)}
        </div>
    </Card>
}

export default App;
