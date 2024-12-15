const leftside = document.querySelector(".left-side");
const rightside = document.querySelector(".right-side");
const checkedToRightButton = document.querySelector(".checked-to-right");
const allToRightButton = document.querySelector(".all-to-right");
const checkedToLeftButton = document.querySelector(".checked-to-left");
const allToLeftButton = document.querySelector(".all-to-left");
const addButton = document.querySelector(".add-button");
const inputBox = document.querySelector(".input-box");

let item = 8; // initial number of items in lists

let leftlist = [
    { id: "item1", checked: false, title: "php" },
    { id: "item2", checked: false, title: "python" },
    { id: "item3", checked: false, title: "Ruby" },
    { id: "item4", checked: false, title: "c++" },
];
let rightlist = [
    { id: "item5", checked: false, title: "HTML" },
    { id: "item6", checked: false, title: "css" },
    { id: "item7", checked: false, title: "javascript" },
    { id: "item8", checked: false, title: "java" },
];

renderDom(leftlist, rightlist);
registerEvents();

// Render Dom
function renderDom(leftlistToRender, rightlistToRender) {
    leftside.innerHTML = "";
    rightside.innerHTML = ""; leftlistToRender.forEach((item) => {
        leftside.innerHTML += `<div class="box box-left">
            <input type="checkbox" class="input-box" id="${item.id}" />
            <label for="${item.id}">${item.title}</label>
        </div>`;
    });

    rightlistToRender.forEach((item) => {
        rightside.innerHTML += `<div class="box box-right">
            <input type="checkbox" class="input-box" id="${item.id}" />
            <label for="${item.id}">${item.title}</label>
        </div>`;
    });
}

// Clear Dom
function clearDom() {
    document.querySelectorAll(".side").forEach((el) => {
        el.innerHTML = "";
    });
}


// Register Events
function registerEvents() {
    addButton.addEventListener('click', () => {
        if (inputBox.value.trim() === "") return;
        item++;
        leftlist.push({ id: `item${item}`, checked: false, title: inputBox.value.trim() });
        inputBox.value = '';
        clearDom();
        renderDom(leftlist, rightlist);
    });

    checkedToRightButton.addEventListener('click', () => moveCheckedItems(leftlist, rightlist, leftside, rightside));
    checkedToLeftButton.addEventListener('click', () => moveCheckedItems(rightlist, leftlist, rightside, leftside));
    allToRightButton.addEventListener('click', () => moveAllItems(leftlist, rightlist));
    allToLeftButton.addEventListener('click', () => moveAllItems(rightlist, leftlist));
}

function moveCheckedItems(fromList, toList, fromSide, toSide) {
    const items = fromSide.querySelectorAll('.box input:checked');
    items.forEach((input) => {
        const itemId = input.id;
        const itemIndex = fromList.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
            const [item] = fromList.splice(itemIndex, 1);
            toList.push(item);
        }
    });
    clearDom();
    renderDom(leftlist, rightlist);
}

function moveAllItems(fromList, toList) {
    toList.push(...fromList);
    fromList.length = 0; // Clear fromList
    clearDom();
    renderDom(leftlist, rightlist);
}


