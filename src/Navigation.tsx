import React from "react";
import {Nav, Navbar, NavbarBrand, Offcanvas} from "react-bootstrap";
import {Screens} from "./types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLanguage} from "@fortawesome/free-solid-svg-icons";
import {Language} from "./LanguageContext";

type NavigationProps = {
    expanded: boolean,
    activeScreen: Screens,
    toggle: (expanded: boolean) => void,
    noCardsSelected: boolean,
    setActiveScreen: (screen: Screens) => void,
    language?: Language,
    setLanguage?: (lang: Language) => void
}

class Navigation extends React.Component<NavigationProps> {
    toggleLanguage = () => {
        if (this.props.setLanguage && this.props.language) {
            // Toggle between 'cs' and 'en'
            const newLanguage = this.props.language === 'cs' ? 'en' : 'cs';
            this.props.setLanguage(newLanguage);
        }
    }

    private screenSelection(screenId: Screens, label: string) {
        const activeScreen = this.props.activeScreen;

        return <Nav.Link active={activeScreen === screenId}
                         className="tab"
                         onClick={() => this.props.setActiveScreen(screenId)}>
            {label}
        </Nav.Link>;
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
                {this.screenSelection('selection', 'Výběr')}
            </Nav>
            {this.props.language && this.props.setLanguage && (
                <Nav className="ms-auto">
                    <Nav.Link 
                        onClick={this.toggleLanguage}
                        title={this.props.language === 'cs' ? 'Switch to English' : 'Přepnout do češtiny'}
                    >
                        <FontAwesomeIcon icon={faLanguage} />
                        <span className="ms-1">{this.props.language.toUpperCase()}</span>
                    </Nav.Link>
                </Nav>
            )}
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

export default Navigation;
