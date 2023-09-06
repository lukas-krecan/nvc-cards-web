import React from "react";
import Modal from 'react-bootstrap/Modal';
import {SavedState} from "./types";
import {Button} from "react-bootstrap";

type LoadDialogProps = {
    show: boolean;
    savedStates: SavedState[];
    handleLoad: (savedState: SavedState) => void;
    handleDelete: (savedState: SavedState) => void;
    handleClose: () => void;
}

class LoadDialog extends React.Component<LoadDialogProps> {

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Načíst</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <table>
                        {this.props.savedStates.map(savedState =>
                            <tr key={savedState.savedAt}>
                                <td>{new Date(savedState.savedAt).toLocaleString()}</td>
                                <td>{savedState.name}</td>
                                <td><Button onClick={() => this.props.handleLoad(savedState)}>Načíst</Button></td>
                                <td><Button onClick={() => this.props.handleDelete(savedState)}>Vymazat</Button></td>
                            </tr>
                        )}
                    </table>
                </Modal.Body>
            </Modal>
        );
    }
}

export default LoadDialog;
