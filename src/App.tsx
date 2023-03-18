import React from 'react';
import './App.css';
import {CardData, CardInfo, feelings, findCard, needs} from './Data';
import {Card, Container, Nav, Navbar, NavbarBrand, Row, Offcanvas, Modal, Button} from "react-bootstrap";
import Dragula from "react-dragula";

type NvcCardsAppProps = {};

type Screens = 'feelings' | 'needs' | 'selection';

type NvcCardsAppState = {
    activeScreen: Screens;
    selectedCards: string[];

    navBarExpanded: boolean;

    modalShown: boolean;
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
            modalShown: false
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
        if (result != null) {
            this.setState(JSON.parse(result));
        }
    }

    private saveState() {
        localStorage.setItem('@last', JSON.stringify(this.state));
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
        this.setState({modalShown: true});
    }

    private hideModal() {
        this.setState({modalShown: false, navBarExpanded: false});
    }


    private screenSelection(screenId: Screens, label: string, disabled: boolean = false) {
        const activeScreen = this.state.activeScreen;

        return <Nav.Link active={activeScreen === screenId}
                         disabled={disabled}
                         onClick={() => this.setState({activeScreen: screenId})}>{label}</Nav.Link>;
    }


    render() {
        const noCardsSelected = this.state.selectedCards.length === 0;
        return (
            <Container>
                <Navbar collapseOnSelect
                        bg="light"
                        expand="sm"
                        sticky="top"
                        expanded={this.state.navBarExpanded}
                        onToggle={expanded => this.setState({navBarExpanded: expanded})}>
                    <NavbarBrand>NVC kartičky</NavbarBrand>
                    <Nav>
                        {this.screenSelection('feelings', 'Pocity')}
                        {this.screenSelection('needs', 'Potřeby')}
                        {this.screenSelection('selection', 'Výběr', noCardsSelected)}
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
                                        <Nav.Link onClick={this.clean.bind(this)}
                                                  disabled={noCardsSelected}>Vymazat</Nav.Link>
                                    </Nav>
                                    <Nav>
                                        <Nav.Link onClick={this.share.bind(this)}
                                                  disabled={noCardsSelected}>Sdílet</Nav.Link>
                                    </Nav>
                                    <Nav>
                                        <Nav.Link href="https://lukas-krecan.github.io/nvc-cards-web/help.html"
                                                  target="_blank">Nápověda</Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Navbar>

                <CardList cards={feelings} selectedCards={this.state.selectedCards}
                          onCardClick={this.selectCard.bind(this)} active={this.state.activeScreen === 'feelings'}/>

                <CardList cards={needs} selectedCards={this.state.selectedCards}
                          onCardClick={this.selectCard.bind(this)} active={this.state.activeScreen === 'needs'}/>

                <SelectedCardList cards={this.getSelectedCardsList()} selectedCards={this.state.selectedCards}
                                  onCardClick={this.selectCard.bind(this)}
                                  onSelectionChange={this.setNewSelection.bind(this)}
                                  active={this.state.activeScreen === 'selection'}/>

                <ModalDialog selectedCards={this.getSelectedCardsList()} show={this.state.modalShown}
                             handleClose={this.hideModal.bind(this)}/>
            </Container>
        );
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
        <div className="card-body">
            {card.data.map((t, i) => <p className={fontClass(t)} key={i}>{t.text}</p>)}
        </div>
    </Card>
}

type ModalDialogProps = {
    selectedCards: CardInfo[];
    show: boolean;
    handleClose: () => void;
};


class ModalDialog extends React.Component<ModalDialogProps> {
    constructor(props: ModalDialogProps) {
        super(props);
    }

    render() {
        const show = this.props.show;
        return <Modal show={show} onHide={this.props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Vybrané kartičky</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.concatSelectedCards(this.props.selectedCards)}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.copyToClipboard.bind(this)}>
                    Zkopírovat do schránky
                </Button>
            </Modal.Footer>
        </Modal>
    }

    private copyToClipboard() {
        const textToShare = this.props.selectedCards
            .map((card) => card.data.map((d) => d.text).join(', '))
            .map((text) => `- ${text}`)
            .join('\n');


        navigator.clipboard.writeText(textToShare)
    }

    private concatSelectedCards(cards: CardInfo[]) {
        return cards
            .map((card) => card.data.map((d) => d.text).join(', '))
            .map((text, i) => <div key={i}>- {text}</div>);
    }

}

export default App;
