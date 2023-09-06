export type Screens = 'feelings' | 'needs' | 'selection';

export type StateToBeSaved = {
    selectedCards: string[]
    name: string
    savedAt: string
}

export type SavedState = StateToBeSaved & {
    key: string
}
