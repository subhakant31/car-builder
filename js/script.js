const carContainer = document.querySelector(".car-container");
const builderPage = document.querySelector(".builder-container");
const closeContainer = document.querySelector(".close-container");
const activeProperty = document.querySelector(".active-property");
const properties = document.querySelector(".property-name-wrapper");
const propertyValues = document.querySelector(".property-values");
const buildCarImage = document.querySelector(".build-car-image");
const buildCarName = document.querySelector(".car-title");
const hamburger = document.querySelector(
  ".NavigationStyles__HamburgerButton-sc-zlirk0-6"
);
const finalBuildContainer = document.querySelector(".final-build-container");
const showSummary = document.querySelector(".show-summary");
let url = "./data/staticdata.json";

const navList = document.querySelector(".nav-list");
let isClicked = false;
let finalPrice = document.querySelector(".final-price");
let colorOfCar;
let finalCar = { carName: [], item: [], price: [], property: [], imageSrc: [] };

let finalWheel;

/*  @function : openSidePanel()
    @description : brings up side panel when hamburger is clicked
    @param : null
    @return : null
*/
function openSidePanel() {
  if (isClicked) {
    navList.style.left = "-150vw";
    hamburger.classList.remove("eNNFmn");
    hamburger.classList.add("lbwthk");

    isClicked = false;
  } else {
    navList.style.left = "0vw";

    hamburger.classList.remove("lbwthk");
    hamburger.classList.add("eNNFmn");

    isClicked = true;
  }
}
hamburger.addEventListener("click", openSidePanel);

const selector = document.querySelector(".string");
const string = selector.innerHTML;
selector.innerHTML = "";
let i = 0;
let intervalId;
/*  @function : animation
    @description : makes the typewriter effect on hero page
    @param : null
    @return : null
*/
function animation() {
  if (i === string.length) {
    clearInterval(intervalId);
    selector.innerHTML += '<span class="blink-dot">.</span>';
    setInterval(function () {
      const dot = document.querySelector(".blink-dot");
      dot.style.visibility =
        dot.style.visibility === "hidden" ? "visible" : "hidden";
    }, 700);
    return;
  } else {
    selector.innerHTML += string[i];
    i++;
  }
}
intervalId = setInterval(animation, 100);

/*  @function : preFetch
    @description : fetches json data from url
    @param : url of json
    @return : object carData containing all cars
*/
async function prefetch(url) {
  let cars = await fetch(url);
  let carData = await cars.json();
  return carData;
}

/*  @function : showAllCars
    @description : shows all the cards from the json data
    @param : carData
    @return : null
*/
function showAllCars(carData) {
  for (var i = 0; i < carData["cars"].length; i++) {
    const car = document.createElement("div");
    car.classList.add("car");
    car.setAttribute("tab-index", 1);
    car.setAttribute("data-aos", "zoom-in");
    car.innerHTML = `
    <div class="car-result-container">
        <div class="result-img-container">
                        <img src="${carData["cars"][i]["defaultImage"]}" alt="car">
                        
                    </div>
                    </div>
                    <div class="result-details">
                        <span class="car-name">${carData["cars"][i]["name"]}</span>
                        <span class="price">Starting MSRP ${carData["cars"][i]["startingPrice"]}</span>
                        <div class="feature-container">
                        
                <ul class="car-property-name">
                    <li>property</li>
                </ul>
                <ul class="car-property-value">
                    <li>value</li>
                </ul>
            </div>
                    </div>
                    <div class='car-hovered-element'>
                        <button class="build-this button" id="build-this">build & buy</button>

    </div>
                    
        `;
    carContainer.appendChild(car);

    let propertyName = document.querySelectorAll(".car-property-name");
    let propertyValue = document.querySelectorAll(".car-property-value");

    //for adding the features of car from description
    for (
      var j = 0;
      j < carData["cars"][i]["description"]["property"].length;
      j++
    ) {
      const feature = document.createElement("li");
      feature.innerHTML = carData["cars"][i]["description"]["property"][j];
      propertyName[i].appendChild(feature);
      const value = document.createElement("li");
      value.innerHTML = carData["cars"][i]["description"]["values"][j];
      propertyValue[i].appendChild(value);
    }
  }
}

function showThisCar(e) {}

/*  @function : init
    @description : initialize all the functions
    @param : null
    @return : null
*/
async function init() {
  let carData = await prefetch(url);
  showAllCars(carData);

  //initializing objects which has respective icons
  const colorNameObj = carData["colorNameObj"];
  const wheelObj = carData["wheelObj"];
  const interiorObj = carData["interiorObj"];

  //header changes on scroll
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (scrollY > 200) {
      header.style.backgroundColor = "black";
    } else {
      header.style.backgroundColor = "transparent";
    }
  });

  /*  @function : findClass
    @description : returns the required text from targeted element 
    @param : event , class name to find
    @return : string
*/
  function findClass(e, className) {
    let target = e.target;
    while (target !== document) {
      if (target.classList.contains(className)) {
        return target.innerText;
      }
      target = target.parentNode;
    }
    return null;
  }
  //   function findClass(e, classNameToFind) {
  //     if (e.target.classList.contains(classNameToFind)) {
  //       return e.target.innerText;
  //     }
  //   }

  carContainer.addEventListener("click", showThisCar);
  const buildThisBtn = document.querySelectorAll(".build-this");

  /*  @function : createCarousel
    @description : creates automatic carousel on the hero section
    @param : null
    @return : null
*/
  createCarousel();
  function createCarousel() {
    const carousel = document.querySelector(".hero-carousel");

    for (var i = 0; i < carData["carouselCars"]["source"].length; i++) {
      const car = document.createElement("div");
      car.classList.add("slide");
      car.innerHTML = `
            
                            <img src="${carData["carouselCars"]["source"][i]}"
                                alt="carousel car">
                        
            `;
      carousel.appendChild(car);
    }
    const slides = document.getElementsByClassName("slide");
    for (var i = 0; i < slides.length; i++) {
      slides[i].style.left = `${i * 100}%`;
    }
    let counter = 0;
    let slideNumber = 0;
    setInterval(function () {
      if (slideNumber < slides.length - 1) {
        slideNumber++;
        counter++;
        nextSlide(counter);
      } else {
        slideNumber = 0;
        counter = 0;
        nextSlide(counter);
      }
    }, 8000);
    function nextSlide(counter) {
      for (var i = 0; i < slides.length; i++) {
        slides[i].style.transform = `translateX(-${counter * 100}%)`;
      }
    }
  }

  /*  @function : showCarBuild
    @description : performs operations on a single car which is clicked to modify
    @param : object car
    @return : null
*/
  function showCarBuild(car) {
    finalPrice.innerText = car["startingPrice"];
    finalCar.property.pop();
    finalCar.imageSrc.pop();
    finalCar.item.pop();
    finalCar.price.pop();
    finalCar.property.push("color");
    finalCar.imageSrc.push(car["defaultImage"]);
    const keys = Object.keys(car["colors"][0]);

    finalCar.item.push(keys);
    finalCar.price.push(car["startingPrice"]);
    function showThisProperty(e) {
      e.preventDefault();
      propertyValues.innerHTML = "";

      /*  @function : findColorImage
    @description : returns the required color texture icon
    @param : string=name of color , obj=object from which color icon to be fetched
    @return : object
*/
      function findColorImage(str, obj) {
        const keys = Object.keys(obj);
        for (var i = 0; i < keys.length; i++) {
          if (keys[i] == str) {
            return obj[`${keys[i]}`];
          }
        }
      }

      /*  @function : showFinalCarDetails
    @description : shows final car images along with price and content
    @param : null
    @return : null
*/
      function showFinalCarDetails() {
        finalBuildContainer.classList.remove("hide");

        const uniqueProperties = [...new Set(finalCar.property)]; // Get unique properties

        const filteredItems = [];
        const filteredPrices = [];
        const filteredImages = [];
        const filteredProperties = [];

        //for removing duplicate items in the finalCar array
        for (let i = finalCar.property.length - 1; i >= 0; i--) {
          const currentProperty = finalCar.property[i];
          if (uniqueProperties.includes(currentProperty)) {
            filteredItems.unshift(finalCar.item[i]);
            filteredPrices.unshift(finalCar.price[i]);
            filteredImages.unshift(finalCar.imageSrc[i]);
            filteredProperties.unshift(currentProperty);
            uniqueProperties.splice(
              uniqueProperties.indexOf(currentProperty),
              1
            );
          }
        }

        //filtered items
        finalCar = {
          item: filteredItems,
          price: filteredPrices,
          imageSrc: filteredImages,
          property: filteredProperties,
        };

        //for showing the final price after show summary button is clicked
        let priceFinal = 0;
        for (var i = 0; i < finalCar["price"].length; i++) {
          priceFinal += finalCar["price"][i];
        }
        document.querySelector(".summary-final-price").innerHTML =
          finalPrice.innerHTML;

        //displaying the final car details in the DOM
        document.querySelector(".property-header").innerHTML = "";
        document.querySelector(
          ".property-header"
        ).innerHTML += `<li>property</li>`;
        for (var i = 0; i < finalCar["property"].length; i++) {
          const box = `<li>${finalCar["property"][i]}</li>`;
          document.querySelector(".property-header").innerHTML += box;
        }
        document.querySelector(".item-name").innerHTML = "";
        document.querySelector(".item-name").innerHTML += `<li>name</li>`;
        for (var i = 0; i < finalCar["item"].length; i++) {
          const box = `<li>${finalCar["item"][i]}</li>`;
          document.querySelector(".item-name").innerHTML += box;
        }

        document.querySelector(".price-items").innerHTML = "";
        document.querySelector(".price-items").innerHTML += `<li>price</li>`;
        for (var i = 0; i < finalCar["price"].length; i++) {
          const box = `<li>$${finalCar["price"][i]}</li>`;
          document.querySelector(".price-items").innerHTML += box;
        }

        /*  @function : showExteriorImg
    @description : sets the final exterior image of car upon clicking on summary
    @param : null
    @return : null
*/
        showExteriorImg();
        function showExteriorImg() {
          document
            .querySelector(".final-ext-int-image")
            .setAttribute("src", finalCar["imageSrc"][0]);
        }

        document
          .querySelector(".show-exterior-btn")
          .addEventListener("click", showExteriorImg);

        /*  @function : getImageSrc
    @description : returns the index of interior image inside the finalcar image source array
    @param : null
    @return : index
*/
        function getImageSrc() {
          let index = finalCar["property"].indexOf("interior");
          return index;
        }

        /*  @function : showInteriorImage
    @description : sets the final interior image of car upon clicking on summary
    @param : null
    @return : null
*/
        function showInteriorImage() {
          document
            .querySelector(".final-ext-int-image")
            .setAttribute("src", finalCar["imageSrc"][getImageSrc()]);
        }
        document.querySelector(".final-ext-int-image").style.scale = 1;

        document
          .querySelector(".show-interior-btn")
          .addEventListener("click", showInteriorImage);
      }

      showSummary.addEventListener("click", showFinalCarDetails);

      //setting active property on clicking a particular property
      const property = document.querySelectorAll(".property");
      for (var i = 0; i < property.length; i++) {
        property[i].addEventListener("click", function () {
          for (var j = 0; j < property.length; j++) {
            property[j].classList.remove("active-property");
          }
          this.classList.add("active-property");
        });
      }

      //for showing image of interiors
      if (e.target.classList.contains("interiors")) {
        for (var i = 0; i < car["interior"].length; i++) {
          const keys = Object.keys(car["interior"][i]);
          const interior = document.createElement("div");
          interior.classList.add("interior");
          interior.innerHTML = `<span class="interior-heading property-value hovered-element">${
            keys[0]
          }</span>
          <img  src="${findColorImage(keys[0], interiorObj)}">`;

          propertyValues.appendChild(interior);
        }
        document.querySelector(".interior").classList.add("active-color");
      }

      //for showing image of wheels
      if (e.target.classList.contains("wheels")) {
        for (var i = 0; i < car["wheelTypes"].length; i++) {
          const keys = Object.keys(car["wheelTypes"][i]);
          const wheel = document.createElement("div");
          wheel.classList.add("wheel");
          wheel.innerHTML = `<span class="wheel-heading property-value hovered-element">${
            keys[0]
          }</span>
          <img src="${findColorImage(keys, wheelObj)}">`;

          propertyValues.appendChild(wheel);
        }
        document.querySelector(".wheel").classList.add("active-color");
      }
      //for showing image of colors
      if (e.target.classList.contains("colors")) {
        // if(finalCar['item'].includes())
        for (var i = 0; i < car["colors"].length; i++) {
          const keys = Object.keys(car["colors"][i]);
          const color = document.createElement("div");
          color.classList.add("color");
          color.innerHTML = `<span class="color-heading property-value hovered-element">${
            keys[0]
          }</span>
            <img src="${findColorImage(keys[0], colorNameObj)}">
            `;

          propertyValues.appendChild(color);
        }
        document.querySelector(".color").classList.add("active-color");
      }

      /*  @function : showThisColorCar
    @description : changes the preview image of each property
    @param : event
    @return : null
*/
      function showThisColorCar(e) {
        e.preventDefault();

        // to show the interior images in the preview section
        if (e.target.classList.contains("interior-heading")) {
          const selectedInterior = findClass(e, "interior-heading");
          const elements = e.target.parentElement.parentElement.children;
          for (let element of elements) {
            if (element === e.target) {
              element.classList.add("active-color");
            } else {
              element.classList.remove("active-color");
            }
          }
          e.target.parentElement.classList.add("active-color");
          e.stopPropagation();

          for (var i = 0; i < car["interior"].length; i++) {
            const keys = Object.keys(car["interior"][i]);

            if (keys[0] == selectedInterior.toLowerCase()) {
              buildCarImage.firstElementChild.setAttribute(
                "src",
                `${car["interior"][i][`${keys[0]}`]}`
              );
              buildCarImage.firstElementChild.style.scale = 1;

              finalPrice.innerHTML =
                parseInt(finalPrice.innerHTML) +
                car["interior"][i][`${keys[1]}`];
              finalCar["item"].push(keys[0]); //pushing the latest item
              finalCar["price"].push(car["interior"][i][`${keys[1]}`]); //pushing latest item's price
              finalCar["property"].push("interior");
              finalCar["imageSrc"].push(car["interior"][i][`${keys[0]}`]);
            }
          }
        }

        //to show exterior color image in the preview section
        if (e.target.classList.contains("color-heading")) {
          e.preventDefault();

          const selectedColor = findClass(e, "color-heading"); //gets the value of the selected color
          const elements = e.target.parentElement.parentElement.children;
          for (let element of elements) {
            if (element === e.target) {
              element.classList.add("active-color");
            } else {
              element.classList.remove("active-color");
            }
          }
          e.target.parentElement.classList.add("active-color");
          e.stopPropagation();

          //looping through colors array in json and finding the respective image
          for (var i = 0; i < car["colors"].length; i++) {
            const keys = Object.keys(car["colors"][i]);

            if (keys[0] == selectedColor.toLowerCase()) {
              buildCarImage.firstElementChild.setAttribute(
                "src",
                `${car["colors"][i][`${keys[0]}`]["source"]}`
              );

              colorOfCar = keys[0];
              finalCar["item"].pop(); //popping before inserting latest item
              finalCar["price"].pop();
              finalCar["property"].pop();
              finalCar["imageSrc"].pop();
              finalCar["item"].push(keys[0]); //pushing the latest item
              finalCar["price"].push(car["colors"][i][`${keys[0]}`]["price"]); //pushing latest item's price
              finalCar["property"].push("color");
              finalCar["imageSrc"].push(
                car["colors"][i][`${keys[0]}`]["source"]
              );
              finalPrice.innerHTML = car["startingPrice"];
              finalPrice.innerHTML =
                parseInt(finalPrice.innerHTML) +
                car["colors"][i][`${keys[0]}`]["price"];

              break;
            }
          }
        }

        //to show car image along with wheel in the preview section
        if (e.target.classList.contains("wheel-heading")) {
          e.preventDefault();
          const selectedWheel = findClass(e, "wheel-heading");
          const elements = e.target.parentElement.parentElement.children;
          for (let element of elements) {
            if (element === e.target) {
              element.classList.add("active-color");
            } else {
              element.classList.remove("active-color");
            }
          }
          e.target.parentElement.classList.add("active-color");
          e.stopPropagation();

          //looping through wheelTypes array in json and finding the respective wheeltype
          for (var i = 0; i < car["wheelTypes"].length; i++) {
            const keys = Object.keys(car["wheelTypes"][i]);
            const extKeys = Object.keys(
              car["wheelTypes"][i][`${keys[0]}`].exterior
            );

            //checking if in finalcar object's property array has wheel property
            if (!finalCar["property"].includes("wheel")) {
              for (var j = 0; j < extKeys.length; j++) {
                if (
                  colorOfCar == extKeys[j] &&
                  keys[0] == selectedWheel.toLowerCase()
                ) {
                  buildCarImage.firstElementChild.setAttribute(
                    "src",
                    `${
                      car["wheelTypes"][i][`${keys[0]}`].exterior[
                        `${extKeys[j]}`
                      ]
                    }`
                  );

                  finalPrice.innerHTML =
                    parseInt(finalPrice.innerHTML) +
                    car["wheelTypes"][i][`${keys[0]}`]["price"];

                  break;
                }
              }
            } else {
              for (var j = 0; j < extKeys.length; j++) {
                if (
                  colorOfCar == extKeys[j] &&
                  keys[0] == selectedWheel.toLowerCase()
                ) {
                  buildCarImage.firstElementChild.setAttribute(
                    "src",
                    `${
                      car["wheelTypes"][i][`${keys[0]}`].exterior[
                        `${extKeys[j]}`
                      ]
                    }`
                  );
                  break;
                }
              }
            }

            if (
              colorOfCar == extKeys[j] &&
              keys[0] == selectedWheel.toLowerCase()
            ) {
              finalCar["item"].push(keys[0]);
              finalCar["price"].push(
                car["wheelTypes"][i][`${keys[0]}`]["price"]
              );
              finalCar["property"].push("wheel");
              finalCar["imageSrc"].push(
                car["wheelTypes"][i][`${keys[0]}`].exterior[`${extKeys[j]}`]
              );
            }
          }
        }
      }

      propertyValues.addEventListener("click", showThisColorCar);
    }
    properties.addEventListener("click", showThisProperty);
  }

  //opening a particular car's build section
  for (var i = 0; i < buildThisBtn.length; i++) {
    buildThisBtn[i].addEventListener("click", showBuildPage);
  }

  /*  @function : showBuilderPage
    @description : brings up the build car tool
    @param : null
    @return : null
*/
  function showBuildPage(e) {
    e.preventDefault();
    document.body.classList.add("no-scroll");

    buildCarName.innerText =
      e.target.parentElement.parentElement.children[1].children[0].innerText;
    function getImage() {
      for (var i = 0; i < carData["cars"].length; i++) {
        if (
          carData["cars"][i]["name"] ==
          e.target.parentElement.parentElement.children[1].children[0].innerText
        ) {
          return carData["cars"][i]["defaultImage"];
        }
      }
    }

    const carImage = document.createElement("img");
    carImage.setAttribute("src", getImage());
    buildCarImage.appendChild(carImage);

    let selectedCar =
      e.target.parentElement.parentElement.children[1].children[0].innerText;
    for (var i = 0; i < carData["cars"].length; i++) {
      if (
        selectedCar.toLowerCase() == carData["cars"][i]["name"].toLowerCase()
      ) {
        builderPage.classList.add("open-builder");
        showCarBuild(carData["cars"][i]);

        break;
      }
    }
  }
  document
    .querySelector(".summary-close")
    .addEventListener("click", function () {
      document.querySelector(".final-build-container").classList.toggle("hide");
    });
  //hiding the buildcar container on close button click
  closeContainer.addEventListener("click", () => {
    buildCarImage.innerHTML = "";
    propertyValues.classList.add("hide");
    builderPage.classList.remove("open-builder");
    document.body.classList.remove("no-scroll");
  });
}

document.addEventListener("DOMContentLoaded", init);
