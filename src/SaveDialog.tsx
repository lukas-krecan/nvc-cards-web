import React, {FormEvent} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type SaveDialogProps = {
    show: boolean;
    handleSave: (name: string) => void;
    handleClose: () => void;
}

class SaveDialog extends React.Component<SaveDialogProps> {
    onSubmit = (e: FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement);
        this.props.handleSave(formData.get('name') as string);
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <form onSubmit={this.onSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Uložit</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <input type="text" placeholder="Jméno" name="name" autoFocus={true} />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" type="submit">Uložit</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

export default SaveDialog;
