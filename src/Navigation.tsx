import React from "react";
import {Nav, Navbar, NavbarBrand, Offcanvas} from "react-bootstrap";
import {Screens} from "./types";

type NavigationProps = {
    expanded: boolean,
    activeScreen: Screens,
    toggle: (expanded: boolean) => void,
    noCardsSelected: boolean,
    setActiveScreen: (screen: Screens) => void
}

class Navigation extends React.Component<NavigationProps> {

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
