import {CardData, CardInfo} from "./Data";
import {Card} from "react-bootstrap";
import React from "react";


type CardProps = {
    card: CardInfo;
    isSelected: boolean;
    onCardClick: (card: CardInfo) => void;
    // when true, render a drag handle which will be used to start dragging
    showHandle?: boolean;
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
            {/* Drag handle - only rendered when parent asks for it */}
            {props.showHandle && (
                <>
                    <button className="drag-handle drag-handle-left" title="Drag to reorder"
                            // prevent clicks on the handle from toggling selection
                            onClick={(e) => e.stopPropagation()}
                            type="button"
                            aria-label="Drag to reorder"
                    >
                        <span className="drag-icon" aria-hidden>≡</span>
                    </button>

                    <button className="drag-handle drag-handle-right" title="Drag to reorder"
                            // prevent clicks on the handle from toggling selection
                            onClick={(e) => e.stopPropagation()}
                            type="button"
                            aria-label="Drag to reorder"
                    >
                        <span className="drag-icon" aria-hidden>≡</span>
                    </button>
                </>
            )}
            {card.data.map((t, i) => <span className={fontClass(t)} key={i}>{t.text}</span>)}
        </div>
    </Card>
}

export default CardView;
