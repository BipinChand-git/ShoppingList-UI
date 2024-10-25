const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const filterBtn = document.querySelector('#filter');

//Add Items--
function OnSubmit(e) {
    e.preventDefault();

    const items = itemInput.value;

    // Validation--
    if(items === '') {
        alert('Please add Item first');
        return;
    }

    // list item--
    const li = document.createElement('li');
    li.className = 'item';
    const text = document.createTextNode(items);
    li.appendChild(text);
    console.log(li);
    
    // Button--
    const crossBtn = CrossBtn('&#10060;');
    li.appendChild(crossBtn);

    // Insert to DOM--
    const ul = document.querySelector('ul');
    ul.insertAdjacentElement('beforeend', li);

    //It will check when it will add items too--
    checkUI();
}

function CrossBtn(text) {
    const span = document.createElement('span');
    span.className = 'cross';
    span.innerHTML = text;
    return span;
}

////Remove and Clear Items--
const removeItem = (e) => {
    if(e.target.classList.contains('cross')) {
        if(confirm(`Do you want to remove ${e.target.parentElement.innerText}`)){
            e.target.parentElement.remove();
        }
    }
    checkUI();
}

const removeList = (e) => {
    if(confirm('Are you Sure?')) {
        while(itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }
    }
    checkUI();
}

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


