import React from "react";
import Modal from 'react-bootstrap/Modal';
import {SavedState} from "./types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

type LoadDialogProps = {
    show: boolean;
    savedStates: SavedState[];
    handleLoad: (savedState: SavedState) => void;
    handleDelete: (savedState: SavedState) => void;
    handleClose: () => void;
}

class LoadDialog extends React.Component<LoadDialogProps> {
    deleteSavedState = (savedState: SavedState) => {
        if (window.confirm("Upravdu chcete vymazat " + savedState.name + " z " + this.formatDate(savedState))) {
            this.props.handleDelete(savedState)
        }
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Uložené výběry</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <table>
                        {this.props.savedStates.map(savedState =>
                            <tr key={savedState.savedAt}>
                                <td>{this.formatDate(savedState)}</td>
                                <td>{savedState.name}</td>
                                <td><Button className="btn-sm" onClick={() => this.props.handleLoad(savedState)}>Načíst</Button></td>
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
