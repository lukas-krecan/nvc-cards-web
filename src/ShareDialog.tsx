import React from "react";
import {Button, Modal} from "react-bootstrap";
import {CardInfo} from "./Data";


type ShareDialogProps = {
    selectedCards: CardInfo[];
    show: boolean;
    handleClose: () => void;
};
class ShareDialog extends React.Component<ShareDialogProps> {
    render() {
        const show = this.props.show;
        return <Modal show={show} onHide={this.props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Vybrané kartičky</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.concatSelectedCards(this.props.selectedCards)}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.copyToClipboard.bind(this)}>
                    Zkopírovat do schránky
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
