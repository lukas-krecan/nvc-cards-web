import {Nav, Navbar, OverlayTrigger, Tooltip} from "react-bootstrap";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { faShareNodes } from '@fortawesome/free-solid-svg-icons'
import {IconProp} from "@fortawesome/fontawesome-svg-core";

type SelectionMenuProps = {
    noCardsSelected: boolean,
    hasSavedStates: boolean,
    share: () => void,
    clean: () => void,
    save: () => void,
    load: () => void,
}

export default class SelectionMenu extends React.Component<SelectionMenuProps> {
    render() {
        return <Navbar bg="light"
                       expand="sm"
                       sticky="top"
                       className="pt-0"
        >

            <Icon onClick={this.props.share} disabled={this.props.noCardsSelected} icon={faShareNodes} tooltip="Sdílet"/>
            <Icon onClick={this.props.load} disabled={!this.props.hasSavedStates} icon={faUpload} tooltip="Načíst"/>
            <Icon onClick={this.props.save} disabled={this.props.noCardsSelected} icon={faDownload} tooltip="Uložit"/>
            <Icon onClick={this.props.clean} disabled={this.props.noCardsSelected} icon={faTrashCan} tooltip="Vymazat"/>
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
            <OverlayTrigger overlay={<Tooltip id={this.props.tooltip}>{this.props.tooltip}</Tooltip>} placement="top">
                <Nav.Link onClick={this.props.onClick} className="pt-0"
                          disabled={this.props.disabled}><FontAwesomeIcon icon={this.props.icon} />
                </Nav.Link>
            </OverlayTrigger>
        </Nav>
    }
}
