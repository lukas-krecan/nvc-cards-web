import React from "react";
import {Button, Modal} from "react-bootstrap";
import {CardInfo} from "./Data";
import {Language} from "./LanguageContext";
import {getTranslation} from "./translations";


type ShareDialogProps = {
    selectedCards: CardInfo[];
    show: boolean;
    handleClose: () => void;
    language: Language;
};
class ShareDialog extends React.Component<ShareDialogProps> {
    render() {
        const show = this.props.show;
        let translations = getTranslation(this.props.language).dialogs.share;
        return <Modal show={show} onHide={this.props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{translations.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.concatSelectedCards(this.props.selectedCards)}</Modal.Body>
            <Modal.Footer>
                <Button onClick={this.copyToClipboard.bind(this)}>
                    {translations.copyButton}
                </Button>
            </Modal.Footer>
        </Modal>
    }

    private copyToClipboard() {
        const textToShare = this.props.selectedCards
            .map((card) => card.data.map((d) => d.text).join(', '))
            .map((text) => `- ${text}`)
            .join('\n');


        navigator.clipboard.writeText(textToShare)
    }

    private concatSelectedCards(cards: CardInfo[]) {
        return cards
            .map((card) => card.data.map((d) => d.text).join(', '))
            .map((text, i) => <div key={i}>- {text}</div>);
    }

}

export default ShareDialog;
