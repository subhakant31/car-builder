const carContainer = document.querySelector(".car-container");
const builderPage = document.querySelector(".builder-container");
const closeContainer = document.querySelector(".close-container");
const activeProperty = document.querySelector(".active-property");
const properties = document.querySelector(".property-name-wrapper");
const propertyValues = document.querySelector(".property-values");
const buildCarImage = document.querySelector(".build-car-image");
const buildCarName = document.querySelector(".car-title");
let finalPrice = document.querySelector(".final-price");
const colorNameObj = {
  "sojave silver":
    "./assets/images/colors/3b8f1b22c62c64ed99b7b095af7c8f0c50695.webp",
  "polar white": "./assets/images/colors/polar white.webp",
  "brilliant blue": "/assets/images/colors/brilliant blue.webp",
  "emerald green": "/assets/images/colors/emerald green.webp",
  "selenite grey": "/assets/images/colors/selenite grey.webp",
  "obsidian black / rubellite red": "/assets/images/colors/two tone.webp",
  "designo diamond white bright": "/assets/images/colors/diamond white.webp",
};

const wheelObj = {
  r63: "./assets/images/wheel/r63.webp",
  r65: "./assets/images/wheel/r65.webp",
};

let modifiedCar = [];

let url = "./data/staticdata.json";

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
    car.innerHTML = `
        <div class="result-img-container">
                        <img src="${carData["cars"][i]["defaultImage"]}" alt="">
                        
                    </div>
                    </div>
                    <div class="result-details">
                        <span class="car-name">${carData["cars"][i]["name"]}</span>
                        <span class="price">Starting MSRP $${carData["cars"][i]["startingPrice"]}</span>
                    </div>
                    <div class='hovered-element'>
                        <button class="build-this button" id="build-this">build this car</button>
                    
        `;
    carContainer.appendChild(car);
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
    @description : creates carousel on the hero section
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
                                alt="">
                        
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

  /*  @function : createCarousel
    @description : creates carousel on the hero section
    @param : null
    @return : null
*/
  function showCarBuild(car) {
    finalPrice.innerText = car["startingPrice"];
    function showThisProperty(e) {
      propertyValues.innerHTML = "";
      e.target.children[0].classList.remove("hide");

      function findColorImage(str, obj) {
        const keys = Object.keys(obj);
        for (var i = 0; i < keys.length; i++) {
          console.log(keys[i]);
          if (keys[i] == str) {
            return obj[`${keys[i]}`];
          }
        }
      }

      if (e.target.classList.contains("wheels")) {
        for (var i = 0; i < car["wheelTypes"].length; i++) {
          const keys = Object.keys(car["wheelTypes"][i]);
          const wheel = document.createElement("div");
          wheel.classList.add("wheel");
          wheel.innerHTML = `<span class="wheel-heading property-value">${
            keys[0]
          }</span>
          <img src="${findColorImage(keys[0], wheelObj)}">`;

          propertyValues.appendChild(wheel);
        }
      }

      if (e.target.classList.contains("colors")) {
        for (var i = 0; i < car["colors"].length; i++) {
          const keys = Object.keys(car["colors"][i]);
          const color = document.createElement("div");
          color.classList.add("color");
          color.innerHTML = `<span class="color-heading property-value">${
            keys[0]
          }</span>
            <img src="${findColorImage(keys[0], colorNameObj)}">
            `;

          propertyValues.appendChild(color);
        }
      }

      function showThisColorCar(e) {
        if (e.target.classList.contains("color-heading")) {
          const selectedColor = findClass(e, "color-heading");

          e.stopPropagation();
          for (var i = 0; i < car["colors"].length; i++) {
            const keys = Object.keys(car["colors"][i]);

            if (keys[0] == selectedColor.toLowerCase()) {
              buildCarImage.firstElementChild.setAttribute(
                "src",
                `${car["colors"][i][`${keys[0]}`]["source"]}`
              );
              modifiedCar.push(car["colors"][i][`${keys[0]}`]);
            }
          }
        }
      }
      propertyValues.addEventListener("click", showThisColorCar);
    }
    properties.addEventListener("click", showThisProperty);
  }

  for (var i = 0; i < buildThisBtn.length; i++) {
    buildThisBtn[i].addEventListener("click", showBuildPage);
  }

  /*  @function : showBuilderPage
    @description : brings up the build car tool
    @param : null
    @return : null
*/
  function showBuildPage(e) {
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

  closeContainer.addEventListener("click", () => {
    buildCarImage.innerHTML = "";
    propertyValues.classList.add("hide");
    builderPage.classList.remove("open-builder");
    document.body.classList.remove("no-scroll");
  });
}

document.addEventListener("DOMContentLoaded", init);
