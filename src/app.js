const listBody = document.querySelector("#list-body");

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
        let dogList =  await getListOfDogs();
        dogList.forEach(dog => {
            let imgUrl =`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`
            listBody.innerHTML += createRow(dog.name,imgUrl,dog.temperament);
        });  
    } catch (error) {
        
    }
   
    
    // listBody.innerHTML += createRow("baggy","jgyhbikjn","kjdsfjfbhjdbfhjsdbhjb");
}

async function getListOfDogs(){
    let result = await fetch("https://api.thedogapi.com/v1/breeds");
    return await result.json();
}







populate();