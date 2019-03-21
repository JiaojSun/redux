import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

let $addCounter = $('.counterBox .addCounter');
let $counterPanrl = $('.counterBox .counterPanel');
let $hasAll = $('.allSel .val');
let $maximum = $('.maximum .val');
let $allCount = $('.allCount .val');

let initState = {
    counterA:[],
    counterB:[]
}
function counterA(state=[],action){
    let {type,id}=action;

    switch (type) {
        case 'ADD_COUNTER_A':
            return [...state,{
                id:new Date().getTime(),
                value:0
            }]
        case 'INCREMENT':
            return state.map(elt=>{
                if(elt.id === id){
                    elt.value++;
                }
                return elt;
            })
        case 'DECREMENT':
            return state.map(elt=>{
                if(elt.id === id){
                    elt.value--;
                }
                return elt;
            })
        default:
            return state;
    }
}

function counterB(state=[],action){
    let {type,id}=action;

    switch (type) {
        case 'ADD_COUNTER_B':
            return [...state,{
                id:new Date().getTime(),
                value:0
            }]
        case 'INCREMENT':
            return state.map(elt=>{
                if(elt.id === id){
                    elt.value++;
                }
                return elt;
            })
        case 'DECREMENT':
            return state.map(elt=>{
                if(elt.id === id){
                    elt.value--;
                }
                return elt;
            })
        default:
            return state;
    }
}

/* function counters(state,action){
    return {
        counterA:counterA(state.counterA,action),
        counterB:counterB(state.counterB,action)
    }
} */
// 等价于
counters = combineReducers({
    counterA,counterB
});

let store = createStore(counters,initState,applyMiddleware(thunk));

class Counter{
    constructor(store, {id,value}){
        debugger;
        this.value = value;
        this.counters = store;
        this.store = store;
        this.id = id;
        this.elt = $('<div class="counter"></div>');

        let incrementBtn = this.incrementBtn = $('<button class="add"></button>');
        let decrementBtn = this.decrementBtn = $('<button class="sub"></button>');
        let oddBtn = this.oddBtn = $('<button class="addIfOdd"></button>');
        let asyncBtn = this.asyncBtn = $('<button class="addAsync"></button>');
        let num = this.num = $(`<span>${this.value}</span>`);

        this.elt.append(decrementBtn,num,incrementBtn,oddBtn,asyncBtn);
        this.decrement = this.decrement.bind(this);
        this.increment = this.increment.bind(this);
        this.addIfOdd = this.addIfOdd.bind(this);
        this.asyncAdd = this.asyncAdd.bind(this);

        incrementBtn.click(this.increment);
        decrementBtn.click(this.decrement);
        oddBtn.click(this.addIfOdd);
        asyncBtn.click(this.asyncAdd);
    }

    decrement(){
        if(this.value === 0) return
        boundDecrement(this.id)
    }

    increment(){
        this.num.html(++this.value);
        boundIncrement(this.id)
    }



    addIfOdd(){
        boundAddIfOdd(this.id,this.value);
    }

    asyncAdd(){
        boundAsyncAdd(this.id);
    }
}

function increment(id){
    return {type: 'INCREMENT',id:id}
}
function decrement(id){
    return {type: 'DECREMENT',id:id}
}
function addIfOdd(id,value){
    return function(dispatch,getState) {
        if(value%2 === 0) return
        dispatch(increment(id))
    }
}

// 另外一种写法
const asyncAdd = id => () =>{
    setTimeout(()=>{
        boundIncrement(id)
    },1000)
}

const boundIncrement = (id) => store.dispatch(increment(id));
const boundDecrement = (id) => store.dispatch(decrement(id));
const boundAddIfOdd = (id) => store.dispatch(addIfOdd(id));
const boundAsyncAdd = (id) => store.dispatch(asyncAdd(id));

$($addCounter[0]).click(ev=>{
    store.dispatch({ type: 'ADD_COUNTER_A' })
});
$($addCounter[1]).click(ev=>{
    store.dispatch({ type: 'ADD_COUNTER_B' })
})

store.subscribe(()=>{
    let state = store.getState();
    $counterPanrl.html('');
    initPanel(state.counterA,0);
    initPanel(state.counterB,1);

});
function initPanel(state,num){
    state.forEach(data=>{
        $($counterPanrl[num]).append(new Counter(store,data).elt) 
    });

    $($hasAll[num]).html(state.every(elt=> elt.value !==0)+'');
    $($maximum[num]).html(state.slice().sort((a,b)=>{
        b.value-a.value
    })[0].value)
    $($allCount[num]).html(state.reduce((accu,elt)=> accu+elt.value,0))
}
