const listBody = document.querySelector("#list-body");
let storedBreeds=[];
let filteredBreeds=[];
let breedGroup=[];
document.querySelector("#btnSearch").addEventListener("click",filterBreeds);
function createRow(name, imageURL, description) {
  return `<div class="media flex-column flex-sm-row mt-0 mb-3">
            <div class="mr-sm-3 mb-2 mb-sm-0">
            <div class="card-img-actions">
                <a href="#" data-abc="true">
                <img
                    src="${imageURL}"
                    class="img-fluid img-preview rounded"
                    alt=""
                />
                </a>
            </div>
            </div>

            <div class="media-body">
            <h6 class="media-title">
                <a href="#" data-abc="true"
                >${name}</a
                >
            </h6>
            <ul class="list-inline list-inline-dotted text-muted mb-2">
                <li class="list-inline-item">
                <i class="fa fa-book mr-2"></i> Book tutorials
                </li>
            </ul>
            ${description}
            </div>
        </div>`;
};

async function populate(){
    try {
        storedBreeds =  await getListOfDogs();
        storedBreeds.forEach(dog => {
            let imgUrl =`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`
            listBody.innerHTML += createRow(dog.name,imgUrl,dog.temperament);
        }); 
        breedGroup = [...new Set(storedBreeds.map(breed=>breed.breed_group))];
        console.log("breed Group:",breedGroup )
    } catch (error) {
        
    }   finally{
        populateBreedGroupSelect()
    }
    // listBody.innerHTML += createRow("baggy","jgyhbikjn","kjdsfjfbhjdbfhjsdbhjb");
}

async function getListOfDogs(breed){
    let result = await fetch("https://api.thedogapi.com/v1/breeds");
    return await result.json();
}

populate();

function populateBreedGroupSelect(){
    let breedGroupSelect= document.querySelector("#select_breed_group")
    breedGroup.forEach(bg=>{
        var option = document.createElement("option");
        option.text = bg; 
        option.value= bg;
        breedGroupSelect.add(option);
    })
}


function filterBreeds(){

    let filter_name=document.querySelector("#searchbox_name").value;
    let filter_breed_group = document.querySelector("#select_breed_group").value;
    console.log(filter_breed_group)
    filteredBreeds = storedBreeds.filter((breed)=>{
        let result_name =false;
        let result_breed_group=false;
        if( filter_name &&  filter_name !=="" && filter_name.length>0){
            result_name = breed.name.includes(filter_name)
        }
        if( filter_breed_group !== 0 ){
            result_breed_group = breed.breed_group===filter_breed_group
        }
        if(filter_name ==="" &&  filter_breed_group === '0'){
            return true;
        }else if(filter_name ===""&&  filter_breed_group !== '0'){
            return result_breed_group;
        }else if(filter_name !==""&&  filter_breed_group === '0'){
            return result_name;
        }
        else{
            return result_name && result_breed_group;
        }
       
    })
    console.log(filteredBreeds)
    console.log(filter_name.value);
    clearList();
    populateWithFilter();
    

}
function populateWithFilter(){
    filteredBreeds.forEach(dog => {
        let imgUrl =`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`
        listBody.innerHTML += createRow(dog.name,imgUrl,dog.temperament);
    });  
}

function clearList(){
    listBody.innerHTML =""
}