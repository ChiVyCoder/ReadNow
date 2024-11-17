

// ĐỐI TƯỢNG
Validator = function(options) {

    function  getParent(element, selector) {
       while (element.parentElement) {
           if (element.parentElement.matches(selector)) {
               return element.parentElement
           }
           element = element.parentElement
       }
      }
   
     var selectorRules = {};
     var formElement = document.querySelector(options.form);
     if (formElement) {
         formElement.onsubmit = function (e) {
             e.preventDefault();
             var isFormValid = true
           // lặp qua các rule và validate
            options.rules.forEach( function(rule) {
           var inputELement = formElement.querySelector(rule.selector)
           var isValid = validate(inputELement, rule)
           if (!isValid) {
               isFormValid = false
           } 
   
       });
   
       if (isFormValid) {
          if ( typeof options.onsubmit === 'function') {
           var enablelInputs = formElement.querySelectorAll('[name]')
           var formValues = Array.from(enablelInputs).reduce(function (values, input) {
              switch(input.type) {
               case 'radio':
                   values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value
                   break;
               case 'checkbox':
                   if (!input.matches(':checked')) {
                       return values
                   }
                   if (!Array.isArray(values[input.name])) {
                       values[input.name] = []
                    }
                   values[input.name].push(input.value)
                   break;
               case 'file':
                   values[input.name] = input.files
               default: values[input.name] = input.value;
              }
               return values
           },{});
           options.onsubmit(formValues)
          }
       } 
       }
     }
   
     function validate(inputELement,rule) {
       var showError 
       var errorElement = getParent(inputELement,'.form-group').querySelector(options.errorElement)
       
       // lấy ra các rules của selector
       var rules = selectorRules[rule.selector]
       // lặp qua các rules và kiểm tra 
       // nếu có lỗi thì ngưng lại
    
       for ( var i =0; i<rules.length; ++i) {
           switch (inputELement.type) {
               case 'checkbox':
               case 'radio': 
               showError = rules[i](
                   formElement.querySelector(rule.selector + ":checked"),
               )
               break;
               default:
               showError = rules[i](inputELement.value)
           }
        
        if (showError) {
          break;
        }  // ngưng lại khi có lỗi
       }
       if (showError) { 
        errorElement.innerText = showError
        inputELement.parentElement.classList.add('invalid')
       }
       else {
        errorElement.innerText = "";  
        inputELement.parentElement.classList.remove('invalid')
       }  
       return !showError   
   }
   
     if (formElement) {
       // Xử lý các rules
           options.rules.forEach( function(rule) {
               var inputELements = formElement.querySelectorAll(rule.selector)
               Array.from(inputELements).forEach( function(inputELement) {
   
                   if (Array.isArray(selectorRules[rule.selector])) {
                       selectorRules[rule.selector].push(rule.test)
                   } else {
                   selectorRules[rule.selector] = [rule.test]
                   }
           
                   if (inputELement) {
                       //xử lý blur ra khỏi input
                       inputELement.onblur = function() {
                           validate(inputELement,rule);
                       }
                   }
           
           
                   // xử lý nhập input
                   inputELement.oninput = function() {
                       var errorElement = inputELement.parentElement.querySelector(options.errorElement);
                       if (errorElement) {
                           errorElement.innerText = '';  
                       }
                       inputELement.parentElement.classList.remove('invalid');
                   }
               })
   
           })
   }
   }
   
   // ĐỊNH NGHĨA RULES
   // quy tắc của các rules là
   //khi hợp lệ trả undefined
   //khi hợp lệ trả "vui long nhap truong nay"
   Validator.isRequired = function(selector) {
       return {
           selector,
           test: function (value) {
               return value ? undefined : "vui lòng nhập trường này";
           }
       }
   }
   
   Validator.isEmail = function(selector) {
     return {
           selector,
           test: function (value) {
               var regex =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
               return regex.test(value) ? undefined : "Trường này phải là email"
           }
       }
   }
   Validator.minLength = function(selector, min) {
       return {
             selector,
             test: function (value) {
                 return value.length >= min ? undefined : `Nhập tối thiểu ${min} kí tự`
             }
         }
     }
   
     Validator.isConfirmed = function(selector, getConfirmedValue,message) {
       return {
             selector,
             test: function (value) {
               return value === getConfirmedValue() ? "" : message || "Xác nhận không chính xác"
             }
             }
   }
   
//    ==========XỬ LÝ CLOSE FORM==================
const signInBtn = document.querySelector('.signin-btn')
const signInForm = document.querySelector('.form-signin')
const closeBtn = document.querySelector('.close-btn')
const closeBtn2 = document.querySelector('.login-close-btn')
const modal = document.querySelector('.modal')
const logInForm = document.querySelector('.form-login')
const logInBtn = document.querySelector('.login-btn')
if (signInForm) {
    signInBtn.addEventListener('click', function() {
    signInForm.classList.add('open')
    modal.classList.add('open')
  })
}
if (logInForm) {
    logInBtn.addEventListener('click', function() {
    logInForm.classList.add('open')
    modal.classList.add('open')
  })
}
if (closeBtn) {
    closeBtn.addEventListener('click', function() {
    signInForm.classList.remove('open')
    modal.classList.remove('open')
  })
}
if (closeBtn2) {
    closeBtn2.addEventListener('click', function() {
    logInForm.classList.remove('open')
    modal.classList.remove('open')
  })
}
if (modal.classList.contains('open')) {
    modal.addEventListener('click', function() {
        signInForm.classList.remove('open')
        modal.classList.remove('open')
    })
}
if (modal.classList.contains('open')) {
    modal.addEventListener('click', function() {
        logInForm.classList.remove('open')
        modal.classList.remove('open')
    })
}