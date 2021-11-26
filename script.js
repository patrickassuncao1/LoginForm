// modifying the html validation api style


class ValidateField {

    constructor(input) {
        this.input = input;
        this.addlisteners();
    }

    
    addlisteners() {
        this.input.addEventListener("blur", () => this.validation());

        this.input.addEventListener('invalid', event => {
            event.preventDefault();
            this.validation();

        });

        this.input.addEventListener("focus", event => {
            this.input.classList.remove('invalid')
        });

    }

    verifyErrors() { 
        let foundError = false;

        for(let error in this.input.validity) {
            if(this.input.validity[error] && !this.input.validity.valid){
                foundError = error;
            }
        }
        return foundError;
    }

    customMessage(typeError) {
        const messages = {
            email: {
                valueMissing:"Required Email",
                typeMismatch:"Invalid Email"
            },
            password: {
                valueMissing:"Password required",
                tooShort:"Password must contain at least 5 characters"
            }
        }

        return messages[this.input.type][typeError];
    }

    setCustomMessage(message) {
        let errorMensagem;

         errorMensagem = this.input.parentNode.querySelector('p.invalid-camp');
        
        if(message){
            this.input.classList.add("invalid");
            errorMensagem.innerHTML = message;
        }else{
            this.input.classList.remove("invalid");
            errorMensagem.innerHTML = ""; 
        }
    }
    
    validation() {
        
        const error = this.verifyErrors();

        if (error) {
            const message = this.customMessage(error)
            this.setCustomMessage(message);
        } else {
           this.setCustomMessage();
        }
    }

}



