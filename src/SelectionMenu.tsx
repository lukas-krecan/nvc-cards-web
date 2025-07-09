import {Nav, Navbar} from "react-bootstrap";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { faLanguage } from '@fortawesome/free-solid-svg-icons'
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import { Language } from './LanguageContext';

type SelectionMenuProps = {
    noCardsSelected: boolean,
    hasSavedStates: boolean,
    share: () => void,
    clean: () => void,
    save: () => void,
    load: () => void,
    language?: Language,
    setLanguage?: (lang: Language) => void,
}

export default class SelectionMenu extends React.Component<SelectionMenuProps> {
    toggleLanguage = () => {
        if (this.props.setLanguage && this.props.language) {
            // Toggle between 'cs' and 'en'
            const newLanguage = this.props.language === 'cs' ? 'en' : 'cs';
            this.props.setLanguage(newLanguage);
        }
    }

    render() {
        const languageTooltip = this.props.language === 'cs' ? 'Switch to English' : 'Přepnout do češtiny';

        return <Navbar bg="light"
                       expand="sm"
                       sticky="top"
                       className="pt-0"
        >
            <Icon onClick={this.props.share} disabled={this.props.noCardsSelected} icon={faShareNodes} tooltip="Sdílet"/>
            <Icon onClick={this.props.load} disabled={!this.props.hasSavedStates} icon={faUpload} tooltip="Načíst"/>
            <Icon onClick={this.props.save} disabled={this.props.noCardsSelected} icon={faDownload} tooltip="Uložit"/>
            <Icon onClick={this.props.clean} disabled={this.props.noCardsSelected} icon={faTrashCan} tooltip="Vymazat"/>
            {this.props.setLanguage && 
                <Icon onClick={this.toggleLanguage} disabled={false} icon={faLanguage} tooltip={languageTooltip}/>
            }
        </Navbar>
    }
}


type IconProps = {
    onClick: () => void,
    disabled: boolean,
    icon: IconProp,
    tooltip: string
}
class Icon extends React.Component<IconProps> {
    render() {
        return <Nav>
                <Nav.Link onClick={this.props.onClick} className="pt-0"
                          disabled={this.props.disabled}><FontAwesomeIcon icon={this.props.icon} />
                </Nav.Link>
        </Nav>
    }
}
