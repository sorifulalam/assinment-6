// store see more for all data store
let dataAll = [];

// data fatch from api to load data function
const loadData = () => {
  // load spinner function
  loadSpinner(true);
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((r) => r.json())
    .then((data) => diplayLoad(data.data.tools));
};

const diplayLoad = (data) => {
  //console.log(data)
  
  const cardContainer = document.getElementById("card-container");
  // store data
  dataAll = data;
  // console.log(dataAll);

  data = data.slice(0, 6);
  //console.log(dataAll)
  data.forEach((data) => {
    // console.log(data)
    //creat card
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("col");
    cardDiv.innerHTML = `
        <div class="card h-100">
      <img src="${
        data.image
      }" class="card-img-top rounded img-fluid p-3 " style="height:300px ;width:500px" alt="...">
      <div class="card-body">
        <h5 class="card-title fs-3 fw-bold">Features</h5>
        <p class="card-text">
        <ol class="list-group list-group-numbered ">
        ${allFetures(data.features)}
            </ol>
        </p>
      </div>
      <hr class="mx-3">
      <div class="px-3 pb-3 d-flex justify-content-between">
          <div>
              <h5 class="card-title fs-4 fw-bold">${data.name}</h5>
              ${dateFormatiing(data.published_in)}
          </div>
         <div class="pt-3 ">
         <button id=""  class="border-0 rounded-circle text-danger text-bg-danger bg-opacity-25" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadaiId('${
           data.id
         }')"> <i class="fa-solid fa-arrow-right "></i></button>
         </div>
      </div>
    </div>

        `;
    cardContainer.appendChild(cardDiv);
  });
  // load spinner function false
  loadSpinner(false);
};

// ALL FUTURE FUNCTION

const allFetures = (features) => {
  let featureHtml = "";
  for (let i = 0; i < features.length; i++) {
    featureHtml += `<li class="list-group-item border-0">${features[i]}</li>`;
  }
  return featureHtml;
};

// see more button
document.getElementById("see-more").addEventListener("click", function () {
  // console.log(dataAll);

  // load spinner function
  loadSpinner(true);
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  dataAll.forEach((data) => {
    // console.log(data)
    //creat card
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("col");
    cardDiv.innerHTML = `
     <div class="card h-100">
      <img src="${
        data.image
      }" class="card-img-top rounded img-fluid p-3" style="height:300px ;width:500px" alt="...">
      <div class="card-body">
        <h5 class="card-title fs-3 fw-bold">Features</h5>
        <p class="card-text">
        <ol class="list-group list-group-numbered ">
        ${allFetures(data.features)}
            </ol>
        </p>
      </div>
      <hr class="mx-3">
      <div class="px-3 pb-3 d-flex justify-content-between">
          <div>
              <h5 class="card-title fs-4 fw-bold">${data.name}</h5>
              ${dateFormatiing(data.published_in)}
          </div>
         <div class="pt-3 ">
         <button id="" class="border-0 rounded-circle text-danger text-bg-danger bg-opacity-25" data-bs-toggle="modal" data-bs-target="#exampleModal"  onclick="loadaiId('${
           data.id
         }')"> <i class="fa-solid fa-arrow-right "></i></button>
         </div>
      </div>
    </div>
     `;
    cardContainer.appendChild(cardDiv);
  });

  document.getElementById("see-more").classList.add("d-none");
  // load spinner function false
  loadSpinner(false);
});

// spinner loading

const loadSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader-spinner");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

// sorting button date daynamic to click

document.getElementById("sorting-date").addEventListener("click", function () {
  dataAll.sort(function (x, y) {
    const sortDate = new Date(x.published_in);
    const sortingDate = new Date(y.published_in);
    return sortDate - sortingDate;
  });

  // load spinner function
  loadSpinner(true);

  // Creat sorting inner html
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  dataAll.forEach((data) => {
    // console.log(data)
    //creat card
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("col");
    cardDiv.innerHTML = `
     <div class="card h-100">
      <img src="${
        data.image
      }" class="card-img-top rounded img-fluid p-3" style="height:300px ;width:500px" alt="...">
      <div class="card-body">
        <h5 class="card-title fs-3 fw-bold">Features</h5>
        <p class="card-text">
        <ol class="list-group list-group-numbered ">
        ${allFetures(data.features)}
            </ol>
        </p>
      </div>
      <hr class="mx-3">
      <div class="px-3 pb-3 d-flex justify-content-between">
          <div>
              <h5 class="card-title fs-4 fw-bold">${data.name}</h5>
              ${dateFormatiing(data.published_in)}
          </div>
         <div class="pt-3 ">
         <button id="" onclick="loadaiId('${
           data.id
         }')" class="border-0 rounded-circle text-danger text-bg-danger bg-opacity-25" data-bs-toggle="modal" data-bs-target="#exampleModal"> <i class="fa-solid fa-arrow-right "></i></button>
         </div>
      </div>
    </div>
     `;
    cardContainer.appendChild(cardDiv);
  });
  // load spinner function
  loadSpinner(false);

  document.getElementById("see-more").classList.add("d-none");
});
// fetch daynamic id load
const loadaiId = (id) => {
  // load spinner function
  loadSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then((r) => r.json())
    .then((data) => displayloadId(data.data));
};

// global item variable
let item = 0;
const displayloadId = (id) => {
  //console.log(id)
  const modalBody = document.getElementById("modal-body");
  // modal body code dynamic
  modalBody.innerHTML = `
    <div class="container-fluid  ">

    <div class="row g-4 ">
      <div class=" col-md-6 col-sm-12 ">
        <div class="p-3 border bg-light rounded-4  w-100 ">
          <h4>${id.description}</h4>
          <div class="row g-2 m-2 ">
            <div class="col-md-4   ">
              <div class="p-3 text-success fw-bolder  border bg-light rounded-4">
              ${pricingDisplay(id.pricing, (item = 0))}
              </div>
            </div>
            <div class="col-md-4    ">
              <div class="p-3 border fw-bolder text-warning bg-light rounded-4">
              ${pricingDisplay(id.pricing, (item = 1))}
              </div>
            </div>
            <div class="col-md-4    ">
              <div class="p-3 border fw-bolder text-danger bg-light rounded-4">
              ${pricingDisplay(id.pricing, (item = 2))}
              </div>
            </div>

          </div>

          <div class="row g-2 m-2">
            <div class="col-md-6 col-sm-12">
              <div class="p-3 ">
                <h4>Features</h4>
                <ul>
                  ${modalfeatures(id.features)}
                </ul>
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="p-3 ">
                <h4>Integrations</h4>
                <ul>
                ${allintrigation(id.integrations)}
                </ul>
              </div>
            </div>
       

          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-12 mb-5 ">
        <div class="p-3 border bg-light rounded-4 ">
          <div class="card" >
            <div class="p-3">
              <img src=${
                id.image_link[0]
              } class="card-img-top img-size" alt="...">
              ${modalAccuracydisplay(id.accuracy.score)}
            </div>
           
            
            <div class="card-body text-center">
            ${inputOutputDisplay(id.input_output_examples)}

            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
    
    `;
    // load spinner function
    loadSpinner(false);
};

// pricing store
const pricingDisplay = (example, items) => {
  let featureHtml = "";
  if (example == null) {
    featureHtml = `<p class="text-center m-3 ">No data Found</p>`;
  } else {
    if (example[items].price==0) {
      featureHtml = ` <p class="text-center m-3 ">Free <br>
      ${example[items].plan}</p>`;
    } else {
      featureHtml = ` <p class="text-center m-3 ">${example[items].price} <br>
                ${example[items].plan}</p>`;
    }
    
  }
  return featureHtml;
};



//  date null value handel and date 
const dateFormatiing = dates=>{
  let featureHtml=''
 if (dates== null) {
  featureHtml+=`<p> <i class="fa-solid fa-calendar-days"></i>Not Found</p>`
 } else {
  const date = new Date(dates); // parse the date string
// format date another style 
const formattedDate = date.toLocaleString("en-US", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
}); 
  featureHtml+=`<p> <i class="fa-solid fa-calendar-days"></i> ${formattedDate}</p>`
 }
 return featureHtml
}


// input Output store
const inputOutputDisplay = (example) => {
  let featureHtml = "";
  if (example == null) {
    featureHtml = ` <h5 class="card-title">No Question Data?</h5>
        <p class="card-text">No! Not Yet! Take a break!!!</p>`;
  } else {
    featureHtml = ` <h5 class="card-title">${example[0].input}</h5>
        <p class="card-text">${example[0].output}</p>`;
  }
  return featureHtml;
};

//all intrigation li daynamic creats and null velus

const allintrigation = (integrations) => {
  let integrationstore = "";
  if (integrations !== null) {
    for (let i = 0; i < integrations.length; i++) {
      integrationstore += `<li>${integrations[i]}</li>`;
    }
  } else {
    integrationstore += `<li>Data Not Found</li>`;
  }

  return integrationstore;
};
// modal future function
const modalfeatures = (f) => {
  let featureHtml = "";

  Object.keys(f).forEach((data) => {
    featureHtml += `<li class="text-muted">${f[data].feature_name}</li>`;
  });

  return featureHtml;
};
// acurycy function for modal
const modalAccuracydisplay = (accuracy) => {
  let modalAccuracy = "";
  if (accuracy === null) {
    modalAccuracy = "";
  } else {
    modalAccuracy = `<button class="position-btn bg-danger border-0 rounded-3 text-white" style="position: relative; bottom: 210px; left: 360px;"> <span> ${
      accuracy * 100
    }% </span> accuracy</button>`;
  }
  return modalAccuracy;
};

loadData();
