export const initialState = {
    appState: {
        snapshots:[],
        selectedSnapshot: null,
        selectedProcessTime: null,
        simGraph: null,
        simThreshold: 0,
        distribution: null
    },
    navigation: {
        route: {
            name: "SIMILARITY",
            title: "Similarity"
        }
    }
};
