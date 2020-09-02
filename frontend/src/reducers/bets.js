const initialState = {
    items: [],
    updateItems: []
};

const bets = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ITEMS':
            const items = [...state.items, ...action.payload];
            return {...state, ...{items}};
        case 'UPDATE_ITEMS':
            const cloneItems = [...state.items];
            const updateItems = cloneItems.splice(0, 30);
            return {...state, ...{items: cloneItems, updateItems}};
        default:
            return state;
    }
};

export default bets;