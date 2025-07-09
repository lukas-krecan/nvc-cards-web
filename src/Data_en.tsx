export type CardInfo = {
    id: string;
    data: CardData[];
};

export type CardData = {
    text: string;
    size?: number;
};

export const needs: CardInfo[] = [
    {id: 'n1', data: [{text: 'Security, Safety'}, {text: 'Stability'}]},
    {id: 'n2', data: [{text: 'Touch'}, {text: 'display of affection'}]},
    {
        id: 'n3',
        data: [
            {text: 'Integrity'},
            {text: 'harmony between what I say'},
            {text: 'and what I do', size: 3},
        ],
    },
    {
        id: 'n4',
        data: [
            {text: 'Peace'},
            {text: 'do things at my own pace'},
            {text: 'Peace of mind', size: 3},
        ],
    },
    {id: 'n5', data: [{text: 'Love'}]},
    {id: 'n6', data: [{text: 'Adventure'}, {text: 'Challenge'}]},
    {
        id: 'n7',
        data: [
            {text: 'Trust'},
            {text: 'Rely on someone', size: 2},
            {text: 'be trusted', size: 2},
        ],
    },
    {
        id: 'n8',
        data: [
            {text: 'Clarity'},
            {text: 'to know', size: 2},
            {text: 'to understand', size: 2},
        ],
    },
    {id: 'n9', data: [{text: 'Harmony'}, {text: 'Beauty'}]},
    {
        id: 'n10',
        data: [
            {text: 'Autonomy'},
            {text: 'Independence'},
            {text: 'Influence on things that concern me, choice'},
        ],
    },
    {id: 'n11', data: [{text: 'Rest'}, {text: 'Relaxation'}]},
    {id: 'n12', data: [{text: 'Be supported'}, {text: 'support, help'}]},
    {id: 'n13', data: [{text: 'Order'}, {text: 'cleanness'}]},
    {
        id: 'n14',
        data: [{text: 'Appreciation'}, {text: 'recognition, to be seen'}],
    },
    {
        id: 'n15',
        data: [
            {text: 'Giving, Contribution'},
            {text: 'Contribute to the lives of others'},
        ],
    },
    {
        id: 'n16',
        data: [
            {text: 'Be understood'},
            {text: 'be heard, empathy', size: 2},
        ],
    },
    {id: 'n17', data: [{text: 'Movement'}]},
    {
        id: 'n18',
        data: [{text: 'Understand'}, {text: 'Know, be informed'}],
    },
    {id: 'n19', data: [{text: 'Friendship'}, {text: 'Closeness'}]},
    {id: 'n20', data: [{text: 'Progress'}, {text: 'Effectivity'}]},
    {
        id: 'n21',
        data: [
            {text: 'Space'},
            {text: 'Physical space'},
            {text: 'in time, in conversation', size: 3},
        ],
    },
    {
        id: 'n22',
        data: [
            {text: 'Respect'},
            {text: 'be taken seriously', size: 2},
            {text: 'feel that "I matter"', size: 2},
        ],
    },
    {id: 'n23', data: [{text: 'Sharing'}]},
    {
        id: 'n24',
        data: [{text: 'Power, influence'}, {text: 'Influence on things that concern me'}],
    },
    {id: 'n25', data: [{text: 'Concentration'}]},
    {id: 'n26', data: [{text: 'Order'}, {text: 'Predictability'}]},
    {id: 'n27', data: [{text: 'Growth, development'}, {text: 'learning'}]},
    {id: 'n28', data: [{text: 'Erós'}, {text: 'Sexual expression'}]},
    {
        id: 'n29',
        data: [{text: 'Sense'}, {text: 'meaningfulness, significance, depth'}],
    },
    {
        id: 'n30',
        data: [
            {text: 'Solidarity'},
            {text: 'be with people, do not be alone'},
            {text: 'be part of a group, belong'},
        ],
    },
    {
        id: 'n31',
        data: [
            {text: 'Cooperation'},
            {text: 'work together on something'},
            {text: 'achieve results together'},
        ],
    },
    {
        id: 'n32',
        data: [
            {text: 'Fair-play'},
            {text: 'Adequacy', size: 2},
            {text: 'Reciprocity', size: 2},
        ],
    },
    {
        id: 'n33',
        data: [{text: 'Acceptance'}, {text: 'To be accepted as I am'}],
    },
    {id: 'n34', data: [{text: 'Fun'}, {text: 'humor'}]},
    {id: 'n35', data: [{text: 'Freedom'}, {text: 'Independence, Lightness'}]},
    {id: 'n36', data: [{text: 'Spontaneity'}, {text: 'Authenticity'}]},
    {
        id: 'n37',
        data: [
            {text: 'Transparency'},
            {text: 'Openness', size: 2},
            {text: 'Directness'},
        ],
    },
    {id: 'n38', data: [{text: 'Pleasure'}, {text: 'delight'}]},
    {
        id: 'n39',
        data: [{text: 'Intimacy'}, {text: 'closeness, depth of shared experience'}],
    },
    {id: 'n40', data: [{text: 'Play'}, {text: 'joy, competition'}]},
    {
        id: 'n41',
        data: [
            {text: 'Competency'},
            {text: 'Mastery', size: 2},
            {text: 'mastering a skill', size: 3},
        ],
    },
    {id: 'n42', data: [{text: 'Attention'}, {text: 'Be heard, be seen'}]},
    {
        id: 'n43',
        data: [{text: 'Health, well-being'}, {text: 'physical, mental'}],
    },
    {
        id: 'n44',
        data: [
            {text: 'Transcendence'},
            {text: 'Spirituality, Transcendence'},
            {text: 'contact with something that transcends us'},
        ],
    },
    {id: 'n45', data: [{text: 'Creativity'}, {text: 'Self-expression'}]},
];

export const feelings: CardInfo[] = [
    {id: 'f1', data: [{text: 'Anger, Rage'}]},
    {id: 'f2', data: [{text: 'Impatience'}]},
    {id: 'f3', data: [{text: 'Sadness'}]},
    {id: 'f4', data: [{text: 'Fear'}]},
    {id: 'f5', data: [{text: 'Helplessness'}]},
    {
        id: 'f6',
        data: [{text: 'Irritation'}, {text: 'Outrage', size: 2}],
    },
    {id: 'f7', data: [{text: 'Tension'}, {text: 'Stress'}]},
    {id: 'f8', data: [{text: 'Regret'}, {text: 'Disappointment'}]},
    {id: 'f9', data: [{text: 'Tiredness'}, {text: 'Exhaustion', size: 2}]},
    {id: 'f10', data: [{text: 'Pain'}, {text: 'Hurt', size: 2}]},
    {id: 'f11', data: [{text: 'Confusion'}]},
    {id: 'f12', data: [{text: 'Embarrassment'}, {text: 'Shame', size: 2}]},
    {id: 'f13', data: [{text: 'Overload'}]},
    {id: 'f14', data: [{text: 'Loneliness'}]},
    {id: 'f15', data: [{text: 'Grumpiness'}, {text: 'Frustration'}]},
    {id: 'f16', data: [{text: 'Nervousness'}]},
    {id: 'f39', data: [{text: 'Boredom'}]},
    {id: 'f17', data: [{text: 'Bitterness'}]},
    {
        id: 'f18',
        data: [
            {text: 'Resignation'},
            {text: 'Stupor, disconnection', size: 2},
        ],
    },
    {id: 'f19', data: [{text: 'Anxiety'}, {text: 'Worry, Hopelessness', size: 2}]},
    {id: 'f20', data: [{text: 'Gratitude'}, {text: 'Fulfillment', size: 2}]},
    {id: 'f21', data: [{text: 'Energy'}, {text: 'Stimulation', size: 2}]},
    {id: 'f22', data: [{text: 'Peace'}]},
    {id: 'f23', data: [{text: 'Freedom'}, {text: 'Light mood', size: 2}]},
    {id: 'f24', data: [{text: 'Surprise'}]},
    {
        id: 'f25',
        data: [{text: 'Inspiration'}, {text: 'Fascination', size: 2}],
    },
    {
        id: 'f26',
        data: [
            {text: 'Joy'},
            {text: 'happiness, lightheartedness', size: 2},
            {text: 'pleasure', size: 2},
        ],
    },
    {
        id: 'f27',
        data: [{text: 'Serenity'}, {text: 'Self-confidence, composure', size: 2}],
    },
    {id: 'f28', data: [{text: 'Heavy feeling'}, {text: 'Constriction, Burden', size: 2}]},
    {id: 'f29', data: [{text: 'Curiosity'}, {text: 'Interest', size: 2}]},
    {id: 'f30', data: [{text: 'Tenderness'}]},
    {id: 'f31', data: [{text: 'Pride'}]},
    {id: 'f32', data: [{text: 'Good mood'}, {text: 'Warm feeling', size: 2}]},
    {id: 'f33', data: [{text: 'Enthusiasm'}, {text: 'Passion', size: 2}]},
    {id: 'f34', data: [{text: 'Disgust'}]},
    {id: 'f35', data: [{text: 'Comfort'}, {text: 'Contentment'}]},
    {id: 'f36', data: [{text: 'Encouragement'}, {text: 'Determination'}]},
    {id: 'f37', data: [{text: 'Amusement'}, {text: 'Playfulness', size: 2}]},
    {id: 'f38', data: [{text: 'Hope'}]},
];

export function findCard(id: string): CardInfo {
    if (id.startsWith('n')) {
        return needs.find(c => c.id === id) || {id: id, data: []};
    } else {
        return feelings.find(c => c.id === id) || {id: id, data: []};
    }
}
