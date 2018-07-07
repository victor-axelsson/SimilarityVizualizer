import { post, del, get, put } from 'core/http'
import { CONSTANTS } from 'core/constants'

export function getSessionSimilarity(items, dispatch) {
     post('http://localhost:6001/item/similar/compare', {items: items}, (err, res) => {

        console.log(err)
        if(!!res){

            console.log(res)
            var d = {}
            items.forEach((_d) => { d[_d] = 1 })

            var graph = {
                nodes: Object.keys(d).map((_d) => { return {id: _d, label: _d} }),
                edges: []
            } 

            res.itemScores.forEach((sim) => {
                if(sim.x_i !== sim.x_j){
                    graph.edges.push({
                        'from': sim.x_i,
                        'to': sim.x_j,
                        'value': sim.score
                    })
                }
            })

            dispatch({
                type: CONSTANTS.GOT_SIM_GRAPH,
                payload: graph
            })
        }
     })    
}

export function getSimilarDevice(device, dispatch) {
    get('http://localhost:6001/item/similar?threshold=0.6&item=' + device, (err, res) => {

        var graph = {
            nodes: [{id: device, label: device}],
            edges: []
        } 

        res.items.forEach((sim) => {


            if(sim.label !== device){
                graph.edges.push({
                    'from': device,
                    'to': sim.label,
                    'value': sim.score
                })

                graph.nodes.push({id: sim.label, label: sim.label})
            }
        })

        console.log(graph)
        
        dispatch({
            type: CONSTANTS.GOT_SIM_GRAPH,
            payload: graph
        })
        
    })    
}

export function getDistribution(dispatch) {
    get('http://localhost:6001/device/distribution', (err, res) => {
        console.log(err)
        console.log(res)
        dispatch({
            type: CONSTANTS.GOT_DISTRIBUTION,
            payload: res
        })
    })    
}
