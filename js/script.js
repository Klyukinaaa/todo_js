document.addEventListener('DOMContentLoaded', function () {

    // добавляем to do
    let addMessage = document.getElementById('new-task');
    let addButton = document.getElementById('add');
    let todo = document.querySelector('.todo'); //весь список элементов li

    let todoList = []; //в массив записываем newTodo

    if (localStorage.getItem('todo')) { //если данные есть в to do,
        todoList = JSON.parse(localStorage.getItem('todo')); //получаем данные и преобразовываем в массив
        displayMessages();
    }

    addButton.addEventListener('click', function () {  //при клике на кнопку
        if (!addMessage.value) return;
        const activeCheckbox = checkboxes.find(item => item.selected) //находит элемент в массиве тру selected
        const activeColor = activeCheckbox ? activeCheckbox.backgroundColor : checkboxes[Math.floor(Math.random() * 6)].backgroundColor;

        let newTodo = {      // данные последнего сообщения
            todo: addMessage.value,
            checked: false,
            checked_color: false,
            color: activeColor,
        };

        todoList.push(newTodo); // добавление элемента в конец массива
        displayMessages();
        localStorage.setItem('todo', JSON.stringify(todoList)); //сохраняем значение
        addMessage.value = '';
    });

    function displayMessages() { //перебираем todoList и каждый объект выводить на стр в li
        let displayMessage = '';
        if (todoList.length === 0) todo.innerHTML = '';
        todoList.forEach(function (item, i) {
            displayMessage += `
        <li>
           <div class="checkbox ${item.checked_color ? 'checked_color' : ''}" style="background-color: ${item.color}">
             <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
           </div>
           <label style="background-color: ${item.color}" class="task ${item.checked_color ? 'checked_color' : ''}" for='item_${i}'>${item.todo}</label>
        </li>
        `;
            todo.innerHTML = displayMessage; //добавить верстку
        });
    }

    todo.addEventListener('change', function (event) { // отслеживать чекед и сохранять
        let idInput = event.target.getAttribute('id'); //получить атрибут id
        let id = Number(idInput.split('_')[1]); //номер атрибута
        todoList[id].checked = !todoList[id].checked; //значение будет меняться на противоположное
        todoList[id].checked_color = !todoList[id].checked_color;
        displayMessages();
        localStorage.setItem('todo', JSON.stringify(todoList));
    });

    todo.addEventListener('contextmenu', function (event) { //вызов контекстного меню на элементе
        event.preventDefault(); //отменим стандартное поведение браузера
        todoList.forEach(function (item, i) {
            if (item.todo === event.target.innerHTML) { //сравнение с элементами массива
                if (event.ctrlKey || event.metaKey) {
                    todoList.splice(i, 1);
                }
                displayMessages();
                localStorage.setItem('todo', JSON.stringify(todoList));
            }
        });
    });

    const checkboxes = [
        {
            backgroundColor: '#ef666c',
            selected: false
        },
        {
            backgroundColor: '#f171a2',
            selected: false
        },
        {
            backgroundColor: '#8f6ac8',
            selected: false
        },
        {
            backgroundColor: '#5eb1f3',
            selected: false
        },
        {
            backgroundColor: '#68d8e3',
            selected: false
        },
        {
            backgroundColor: '#fde087',
            selected: false
        }
    ];

    let color_btns = document.querySelector('.color_btns');

    function displayCheckColors() {
        let checkboxesHTML = '';
        checkboxes.forEach(function (item, i) {
            checkboxesHTML += `<span class="btn ${item.selected ? 'active' : ''}"><button id="btn_${i + 1}"></button></span>`
        });
        color_btns.innerHTML = checkboxesHTML;

        // получить элемент контейнера
        let colorBtns = document.querySelector('.color_btns');

        // получить все кнопки с классом btn внутри контейнера
        let btns = colorBtns.querySelectorAll('.btn');

        // перебор кнопок и добавляем активный класс к текущей нажатой кнопке
        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function () {
                checkboxes.forEach(function (item, ind) {
                    item.selected = false;
                    if (i === ind) {
                        item.selected = !item.selected;
                    }
                });
                displayCheckColors();
            });
        }

        let page = document.querySelector('.page');

        page.onclick = function (e) {
            if (e.target.id === 'background') {
                btns.forEach(removeActive)
            }
        };

        function removeActive(element) {
            element.className = element.className.replace(/\bactive\b/g, "");
        }
    }
    displayCheckColors();

});






