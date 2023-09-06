import {CardData, CardInfo} from "./Data";
import {Card} from "react-bootstrap";
import React from "react";


type CardProps = {
    card: CardInfo;
    isSelected: boolean;
    onCardClick: (card: CardInfo) => void;
};

const CardView = (props: CardProps) => {
    const {card, isSelected} = props;

    const guessFontSize = (text: string): number => {
        if (text.length < 20) {
            return 1;
        } else if (text.length < 25) {
            return 2;
        } else {
            return 3;
        }
    };

    const fontClass = (c: CardData) => "text" + (c.size ? c.size : guessFontSize(c.text));

    function selectedClass(card: CardInfo) {
        if (!isSelected) {
            return "";
        } else {
            return card.id.startsWith('n')
                ? "selectedNeed"
                : "selectedFeeling";
        }
    }

    return <Card
        className={"col-lg-3 col-md-4 col-sm-12 text-center " + selectedClass(card)}
        onClick={_ => props.onCardClick(card)}
        id={card.id}
    >
        <div className="card-body d-flex flex-column justify-content-center align-items-center">
            {card.data.map((t, i) => <span className={fontClass(t)} key={i}>{t.text}</span>)}
        </div>
    </Card>
}

export default CardView;
