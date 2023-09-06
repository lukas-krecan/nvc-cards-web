import React from "react";
import Modal from 'react-bootstrap/Modal';
import {SavedState} from "./types";

type LoadDialogProps = {
    show: boolean;
    savedStates: SavedState[];
    handleLoad: (savedState: SavedState) => void;
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

                </Modal.Body>
            </Modal>
        );
    }
}

export default LoadDialog;
