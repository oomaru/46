// Wrapper
let cardWrapper = document.querySelector('#cardWrapper');

// Bottoni
let showContactsBtn = document.querySelector('#showContactsBtn');
let saveContactBtn = document.querySelector('#saveContactBtn');
let searchContactBtn = document.querySelector('#searchContactBtn');

// Input
let nameInput = document.querySelector('#nameInput');
let numberInput = document.querySelector('#numberInput');



let rubrica = {

    contacts : [
        {id: 1, name: 'Matteo', number: 33333333},
        {id: 2, name: 'Omar', number: 33344444},
        {id: 3, name: 'Lorenzo', number: 33355555},
        {id: 4, name: 'Alberto', number: 33366666},
        {id: 5, name: 'Matteo', number: 333777777},
    ],

    showContacts: function(array){
        // 1. foreach sui contatti

        cardWrapper.innerHTML = '';
        
        array.forEach( (contact)=> {
            let div = document.createElement('div');
            div.classList.add('card-custom');
            div.innerHTML = `
                <p class="lead">${contact.name}</p>
                <p>${contact.number}</p>
                <i class="fa-solid fa-trash-can icon" id="${contact.id}"></i>  
            `;

            cardWrapper.appendChild(div);


        });

        // Icone
        let icons = document.querySelectorAll('.icon');

        icons.forEach( (icon, i)=> {
            icon.addEventListener('click', ()=>{
                // Cliccando sull'icona voglio prendere l'id del contatto a cui l'icona appartiene
                // Una volta preso l'id posso lanciare la funzione deleteContact sull'id appena preso

           
                let contactId = icon.id;
                this.deleteContact(contactId);
            });
        });        

    },

    saveContact: function(newName, newNumber){
        // Questa funzione deve fare un push sull'array dei contatti
        // Deve pushare un nuovo oggetto
        // Questo oggetto deve avere nome e numero
        // Per avere nome e numero li devo passare sotto forma di parametri formali

       let newId;

        if(this.contacts.length > 0){
            newId = this.contacts[this.contacts.length - 1].id + 1;
            console.log(newId);
        }else{
            newId = 1;
            console.log(newId);
        }
        this.contacts.push( {id: newId, name: newName, number: newNumber} );

        this.showContacts(this.contacts);
    },

    deleteContact: function(deletedId){
        // Abbiamo bisogno dell'indice dell'elemento che vogliamo cancellare perche' ci servira' per fare lo splice
        // .indexOf():trova l'indice di un elemento all'interno di un array 
        // .find()

        let element = this.contacts.find( (contatto)=> contatto.id == deletedId );
        let index = this.contacts.indexOf(element);
        this.contacts.splice(index, 1);
        this.showContacts(this.contacts);
    },

    searchContact: function(searchedName){

        let filtered = this.contacts.filter( (contact)=> contact.name == searchedName );
        console.log(filtered);
        this.showContacts(filtered);

    }

};



let check = false;


showContactsBtn.addEventListener('click', ()=>{
    
    if(check == false){
        rubrica.showContacts(rubrica.contacts);
        showContactsBtn.innerHTML = 'Nascondi Rubrica';
        check = true;
    }else{
        cardWrapper.innerHTML = '';
        showContactsBtn.innerHTML = 'Mostra Rubrica';
        check = false;
    }
    
});


saveContactBtn.addEventListener('click', ()=>{
    // nameInput e' un oggetto, il value e' una sua proprieta' e per richiamarla possiamo usare la Dot Syntax
    // Tutta la nostra logica deve partire solo se sia il value del nameInput che del numberInput siano dati truthy

    if(nameInput.value != '' && numberInput.value != ''){
        rubrica.saveContact(nameInput.value, numberInput.value);

        nameInput.value = '';
        numberInput.value = '';

        if(check == false){
            showContactsBtn.innerHTML = 'Nascondi Rubrica';
            check = true;
        }
    } else{
        alert('Devi inserire sia Nome che Numero!!!');
    }

    console.log(rubrica);
});


searchContactBtn.addEventListener('click', ()=>{
    rubrica.searchContact(nameInput.value);

    nameInput.value = '';
})