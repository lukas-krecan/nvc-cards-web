import {Nav, Navbar, OverlayTrigger, Tooltip} from "react-bootstrap";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from '@fortawesome/free-regular-svg-icons'
import {faDownload, faShareNodes, faUpload} from '@fortawesome/free-solid-svg-icons'
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {Language} from './LanguageContext';
import {getTranslation} from './translations';

type SelectionMenuProps = {
    noCardsSelected: boolean,
    hasSavedStates: boolean,
    share: () => void,
    clean: () => void,
    save: () => void,
    load: () => void,
    language: Language,
}

export default class SelectionMenu extends React.Component<SelectionMenuProps> {
    render() {
        let translations = getTranslation(this.props.language).menu;

        return <Navbar bg="light"
                                                     expand="sm"
                                                     sticky="top"
                                                     className="pt-0"
        >
            <Icon onClick={this.props.share} disabled={this.props.noCardsSelected} icon={faShareNodes} tooltip={translations.share}/>
            <Icon onClick={this.props.load} disabled={!this.props.hasSavedStates} icon={faUpload} tooltip={translations.load}/>
            <Icon onClick={this.props.save} disabled={this.props.noCardsSelected} icon={faDownload} tooltip={translations.save}/>
            <Icon onClick={this.props.clean} disabled={this.props.noCardsSelected} icon={faTrashCan} tooltip={translations.delete}/>
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
            <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id={`tooltip-${this.props.tooltip}`}>{this.props.tooltip}</Tooltip>}
            >
                <Nav.Link onClick={this.props.onClick} className="pt-0"
                          disabled={this.props.disabled}><FontAwesomeIcon icon={this.props.icon} />
                </Nav.Link>
            </OverlayTrigger>
        </Nav>
    }
}
