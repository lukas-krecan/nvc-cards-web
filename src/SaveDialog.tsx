import React, {FormEvent} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Language} from "./LanguageContext";
import {getTranslation} from "./translations";

type SaveDialogProps = {
    show: boolean;
    handleSave: (name: string) => void;
    handleClose: () => void;
    language: Language;
}

class SaveDialog extends React.Component<SaveDialogProps> {
    onSubmit = (e: FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement);
        this.props.handleSave(formData.get('name') as string);
    }

    render() {
        let translations = getTranslation(this.props.language).dialogs.save;
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <form onSubmit={this.onSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>{translations.title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <input type="text" placeholder={translations.namePlaceholder} name="name" autoFocus={true} />
                        <p className="pt-2"><em className="small">{translations.storageInfo}</em></p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" type="submit">{translations.saveButton}</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

export default SaveDialog;
