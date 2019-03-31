export const reducer = (state,action)=>{
    switch(action.type) {
        case 'DynamicGlobalProperties':
            return { ...state, DynamicGlobalProperties: action.value }
        case 'Price':
            return { ...state, Price: action.value }
        default:
            return state
    }
    
}