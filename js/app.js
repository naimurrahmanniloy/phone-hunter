const loadPhone = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}` ;

    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data , dataLimit)

}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerText ='';
    //display 10 phones only
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0,10);        
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none')
    }


    //display no phone found
    const noPhoneFound = document.getElementById('no-phone-message');
    if(phones.length === 0){
        noPhoneFound.classList.remove('d-none')
    }  
    else{
        noPhoneFound.classList.add('d-none')
    } 

    //display all phone


    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
            
                    <div class="card p-4">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}title</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit longer.</p>

                                <button onclick="loadPhoneDetails('${phone.slug}')"><a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</a> </button>

                        </div>
                          
            </div>
        `
        phonesContainer.appendChild(phoneDiv);
        
    }) 
    //stop spinner loader
    toggleSpinner(false);
}

const processSearch = (dataLimit) => {
     toggleSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value ;
    
    loadPhone(searchText, dataLimit);
    searchText.value = '';
}

//search btn click
document.getElementById('btn-search').addEventListener('click', function(){
    // start loader 
    processSearch(10)
})

//search input field enter key handler
document.getElementById('search-field').addEventListener('keypress',function(e){
    if(e.key === 'Enter'){
        processSearch(10)
    }
})  

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');

    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }

}

//not the best way to load show all


document.getElementById('btn-show-all').addEventListener('click',function(){
    processSearch();
})

const loadPhoneDetails = async(id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res= await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}


const displayPhoneDetails = (phone) => {
    const modalTilte = document.getElementById('phoneDetailModalLabel');
    modalTilte.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <p> Release Date : ${phone.releaseDate ? phone.releaseDate : 'no release date found'}</p>
        <p>Storage : ${phone.mainFeatures ? phone.mainFeatures.storage : 'no storage info found'} </p>
        <p>Others : ${phone.others? phone.others.Bluetooth: 'no bluetooth info'} </p>
    `
}

// loadPhone('a+pple')