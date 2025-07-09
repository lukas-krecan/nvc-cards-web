import React from "react";
import Modal from 'react-bootstrap/Modal';
import {SavedState} from "./types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from '@fortawesome/free-regular-svg-icons'
import {Language} from "./LanguageContext";
import {getTranslation} from "./translations";

type LoadDialogProps = {
    show: boolean;
    savedStates: SavedState[];
    handleLoad: (savedState: SavedState) => void;
    handleDelete: (savedState: SavedState) => void;
    handleClose: () => void;
    language: Language;
}

class LoadDialog extends React.Component<LoadDialogProps> {
    deleteSavedState = (savedState: SavedState) => {
        const translations = getTranslation(this.props.language);
        const confirmMessage = translations.dialogs.load.deleteConfirmation
            .replace('{name}', savedState.name)
            .replace('{date}', this.formatDate(savedState));

        if (window.confirm(confirmMessage)) {
            this.props.handleDelete(savedState)
        }
    }

    render() {
        let translations = getTranslation(this.props.language).dialogs.load;
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{translations.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <table>
                        {this.props.savedStates.map(savedState =>
                            <tr key={savedState.savedAt}>
                                <td>{this.formatDate(savedState)}</td>
                                <td>{savedState.name}</td>
                                <td><Button className="btn-sm" onClick={() => this.props.handleLoad(savedState)}>{translations.loadButton}</Button></td>
                                <td><Button className="btn-sm btn-secondary" onClick={() => this.deleteSavedState(savedState)}><FontAwesomeIcon icon={faTrashCan}/></Button></td>
                            </tr>
                        )}
                    </table>
                </Modal.Body>
            </Modal>
        );
    }

    private formatDate(savedState: SavedState) {
        return new Date(savedState.savedAt).toLocaleString();
    }
}

export default LoadDialog;
