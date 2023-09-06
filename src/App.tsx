import React from 'react';
import './App.css';
import {CardInfo, feelings, findCard, needs} from './Data';
import {Container, Nav, Navbar, NavbarBrand, Offcanvas, Row} from "react-bootstrap";
import Dragula from "react-dragula";
import SaveDialog from "./SaveDialog";
import ShareDialog from "./ShareDialog";
import CardView from "./CardView";
import {SavedState, Screens} from "./types";
import Navigation from "./Navigation";
import LoadDialog from "./LoadDialog";

type NvcCardsAppProps = {};

type Modals = 'share' | 'save' | 'load'

type NvcCardsAppState = {
    activeScreen: Screens;

    selectedCards: string[];

    navBarExpanded: boolean;

    modalShown: Modals | null ;
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
            modalShown: null,
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
            modalShown: null
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

    private showModal(modal: Modals) {
        this.setState({modalShown: modal});
    }

    private save() {
        this.setState({modalShown: 'save'});
    }

    private handleSave(name: string) {
        const storedState: SavedState = {
            selectedCards: this.state.selectedCards,
            name: name,
            savedAt: new Date().toISOString()
        };
        localStorage.setItem('saved-' + new Date().toISOString(), JSON.stringify(storedState));
    }

    private hideModals() {
        this.setState({modalShown: null, navBarExpanded: false});
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
                            share={() => this.showModal('share')}
                            save={() => this.showModal('save')}
                            load={() => this.showModal('load')}
                />

                <CardList cards={feelings} selectedCards={this.state.selectedCards}
                          onCardClick={this.selectCard.bind(this)} active={this.state.activeScreen === 'feelings'}/>

                <CardList cards={needs} selectedCards={this.state.selectedCards}
                          onCardClick={this.selectCard.bind(this)} active={this.state.activeScreen === 'needs'}/>

                <SelectedCardList cards={this.getSelectedCardsList()} selectedCards={this.state.selectedCards}
                                  onCardClick={this.selectCard.bind(this)}
                                  onSelectionChange={this.setNewSelection.bind(this)}
                                  active={this.state.activeScreen === 'selection'}/>

                <ShareDialog selectedCards={this.getSelectedCardsList()} show={this.state.modalShown === 'share'}
                             handleClose={this.hideModals.bind(this)}/>

                <SaveDialog show={this.state.modalShown === 'save'}
                            handleSave={this.handleSave.bind(this)}
                            handleClose={this.hideModals.bind(this)}/>

                <LoadDialog show={this.state.modalShown === 'load'}
                            handleClose={this.hideModals.bind(this)}
                            savedStates={[]}
                            handleLoad={(saved) => this.setStoredState(saved.selectedCards, 'selection')}/>
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

export default App;
