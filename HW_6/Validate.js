// регистрация события загрузки документа.
if (window.addEventListener) window.addEventListener("load", init, false);
else if (window.attachEvent) window.attachEvent("onload", init);

// регистрация обработчиков событий элементов формы.
function init() {
    var elementsForValidation = document.querySelectorAll("[check-type]");
    for (var i = elementsForValidation.length - 1; i >= 0; i--) {
       switch (elementsForValidation[i].getAttribute('check-type')) {

           case 'name':  elementsForValidation[i].onchange = nameOnChange;        
                         break;

           case 'email': elementsForValidation[i].onchange = emailOnChange;        
                         break;

           case 'zip':   elementsForValidation[i].onchange = zipcodeOnChange;        
                         break;   
         
           case 'submit':elementsForValidation[i].onsubmit = onsubmitHandler;        
                         break;                                                           
       }
    }

}

// метод проверки значения в элементе по регулярному выражению.
function validate(elem, pattern) {
    var res = pattern.test(elem.value);
    if (res === false) {
        //elem.className = "invalid";
        elem.classList.remove("valid");
        elem.classList.add("invalid");        
    } // установка CSS класса 
    else {
        //elem.className = "valid";
        elem.classList.remove("invalid");
        elem.classList.add("valid");
    }
}

// обработчики событий изменения текста в окне.
function nameOnChange() {
    var pattern = /\S/;
    validate(this, pattern);
}

function emailOnChange() {
    var pattern = /\b[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,4}\b/i;
    validate(this, pattern);
}

function zipcodeOnChange() {
    var pattern = /\d{5}/;
    validate(this, pattern);
}

// событие при отправке формы на сервер.
function onsubmitHandler(event) {
    var elementsForValidation = document.querySelectorAll("[check-type]");
    for (var i = elementsForValidation.length - 1; i >= 0; i--) {
        var elem = elementsForValidation[i];
        elem.onchange(); // запуск события onchange
        if (elem.classList.contains("invalid")) {
          alert("Допущены ошибки при заполнении формы проверьте значение - " + elem.value + "!");
          event.preventDefault();
          return false; // отмена отправки формы.  
        }
    }

}