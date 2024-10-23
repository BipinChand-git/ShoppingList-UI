const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');

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
}

function CrossBtn(text) {
    const span = document.createElement('span');
    span.className = 'cross';
    span.innerHTML = text;
    return span;
}

itemForm.addEventListener('submit', OnSubmit);