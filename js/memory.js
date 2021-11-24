const backFace = 'images/memory/backface.png';
const display = document.querySelector('.display');
const blocks = [...document.querySelectorAll('.mini')];
let selected = null;
let hideing = null;
let isShow = true;

(function initGame(){
    //Generate paris
    document.querySelectorAll('.mini').forEach((item, index) => {
        const clone = item.cloneNode(true);
        clone.setAttribute('data-pairid', item.id);
        clone.id = `a${blocks.length + 1}`;
        item.setAttribute('data-pairid', clone.id);
        display.appendChild(clone);
        blocks.push(clone);
    });
})();

const cloneBlocks = [...blocks].map(item => item.cloneNode(true));

const hide = () => {
    if(hideing){
        clearTimeout(hideing);
        hideing = null;
    }

    blocks.forEach(item => item.firstChild.src = backFace);
    isShow = false;
    selected = null;
};

const showAll = () =>{
    if(hideing){
        clearTimeout(hideing);
        hideing = null;
    }

    blocks.forEach((item, index) =>{
        if(item.id === cloneBlocks[index].id){
            item.firstChild.src = cloneBlocks[index].firstChild.src;
        }
    });

    selected = null;
}

const show = (item) =>{
    //if(item.firstChild.getAttribute('src') !== backFace){ return; }
    if(selected === item){ return; }

    if(hideing){
        clearTimeout(hideing);
        hide();
        hideing = null;
    }

    item.firstChild.src = cloneBlocks[item.getAttribute('data-index')].firstChild.src;

    if(!selected){
        selected = item;
        return;
    }

    if(selected.id === item.getAttribute('data-pairid')){
        selected.classList.add('found');
        item.classList.add('found');
    }
    else if(!isShow){
        hideing = setTimeout(hide, 1000);
    }

    selected = null;  
}

const generateUniqueRandomNumbers = (range) => {
    let arr = [];
    let resoult = [];

    for(let i = 0; i < range; i++){
        arr.push(i);
    }

    for(let i = 1; i <= range; i++){
        const random = Math.floor(Math.random() * (range - i));
        resoult.push(arr[random]);
        arr[random] = arr[range - i];
    }

    return resoult;
}

const random = () =>{
    if(hideing){
        clearTimeout(hideing);
        hideing = null;
    }

    selected = null;
    display.innerHTML = "";
    const randomNumbers = generateUniqueRandomNumbers(blocks.length);
    
    for(let random of randomNumbers){
        display.appendChild(blocks[random]);
    }
}