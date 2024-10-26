const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const filterBtn = document.querySelector('#filter');

//Display Items From Local Storage--
function displayItems() {
    const itemsFromStorage = getItemFromStorage();

    itemsFromStorage.forEach((item) => {
        addItemsToDOM(item);
    });

    checkUI();
}

//Add Items--
function OnSubmit(e) {
    e.preventDefault();

    const newItems = itemInput.value;

    // Validation--
    if(newItems === '') {
        alert('Please add Item first');
        return;
    }

    //Add Items to DOM--
    addItemsToDOM(newItems);

    //Add Items to Local Storage--
    addItemToStorage(newItems)

    //It will check when it will add items too--
    checkUI();
}

function CrossBtn(text) {
    const span = document.createElement('span');
    span.className = 'cross';
    span.innerHTML = text;
    return span;
}

// Add Items to DOM---
function addItemsToDOM(items) {
    // list item--
    const li = document.createElement('li');
    li.className = 'item';
    const text = document.createTextNode(items);
    li.appendChild(text);
    
    // Button--
    const crossBtn = CrossBtn('&#10060;');
    li.appendChild(crossBtn);

    // Insert to DOM--
    const ul = document.querySelector('ul');
    ul.insertAdjacentElement('beforeend', li);
}

// Add Items to Local Storage--
function addItemToStorage(item) {
    let itemsFromStorage;
    
    if(localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    }
    else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    //Add item to array--
    itemsFromStorage.push(item);

    //convert to json string and set to local storage--
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// Get items From LocalStorage--
function getItemFromStorage(item) {
    let itemsFromStorage;

    if(localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    }
    else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

// Remove Items From DOM when we click into X button--
const removeItem = (e) => {
    if(e.target.classList.contains('cross')) {
        if(confirm(`Do you want to remove ${e.target.parentElement.firstChild.nodeValue}`)){
            //Remove From DOM---
            e.target.parentElement.remove();

            //Remove Item From Local Storage--
            const items = e.target.parentElement.firstChild.textContent;
            removeItemFromStorage(items);
        }
    }
    checkUI();
}

// Remove Items from Local Storage---
function removeItemFromStorage(item) {
    let itemsFromStorage = getItemFromStorage();
    
    //filter items that has been removed--
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    //Re-set to Local Storage--
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

//Clear All Items when we click the clearALL Button--
const removeList = (e) => {
    if(confirm('Are you Sure?')) {
        while(itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }

        // Clear all From Local Storage too--
        localStorage.clear();
    }
    checkUI();
}

//To clear filter and clearBtn if there is nothing in ul--
function checkUI() {
    const items = document.querySelectorAll('li');
    if(items.length === 0) {
        clearBtn.style.display = 'none';
        filterBtn.style.display = 'none';
    }
    else {
        clearBtn.style.display = 'block';
        filterBtn.style.display = 'block';
    }
}
checkUI();

function FilterItems(e) {
    const items = document.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
    
    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
        
        if(itemName.includes(text)) {
            item.style.display = 'flex';
        }
        else {
            item.style.display = 'none';
        }
    })
}


// Event Listeners--
itemForm.addEventListener('submit', OnSubmit);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', removeList);
filterBtn.addEventListener('input', FilterItems);
document.addEventListener('DOMContentLoaded', displayItems);


