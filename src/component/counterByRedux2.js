import { createStore } from 'redux';

let $addCounter = $('.counterBox .addCounter');
let $counterPanrl = $('.counterBox .counterPanel');
let $hasAll = $('.allSel .val');
let $maximum = $('.maximum .val');
let $allCount = $('.allCount .val');

let initState = []
function counter(state=[],action){
    let {type,id}=action;

    switch (type) {
        case 'ADD_COUNTER':
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

let store = createStore(counter,[])

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
        this.store.dispatch({type: 'DECREMENT',id:this.id});
    }

    increment(){
        this.num.html(++this.value);
        this.store.dispatch({type: 'INCREMENT',id:this.id});
    }

    addIfOdd(){
        if(this.value%2 === 0) return
        this.store.dispatch({type: 'INCREMENT',id:this.id});
    }

    asyncAdd(){
        setTimeout(()=>{
            this.store.dispatch({type: 'INCREMENT',id:this.id});
        },1000)
    }
}

$addCounter.click(ev=>{
    store.dispatch({ type: 'ADD_COUNTER' })
})

store.subscribe(()=>{
    let state = store.getState();
    $counterPanrl.html('');
    state.forEach(data=>{
        $counterPanrl.append(new Counter(store,data).elt) 
    });

    $hasAll.html(state.every(elt=> elt.value !==0)+'');
    $maximum.html(state.slice().sort((a,b)=>{
        b.value-a.value
    })[0].value)
    $allCount.html(state.reduce((accu,elt)=> accu+elt.value,0))
})
