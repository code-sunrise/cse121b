/* W05: Programming Tasks */

/* Declare and initialize global variables */
let templeList;

/* async displayTemples Function */
const displayTemples = (temples) => {
   const templesElement = document.getElementById("temples");
   const ul = document.createElement("ul");
   temples.forEach(temple => {
      const li = document.createElement("li");
      const img = document.createElement("img");
      img.src = temple.imageUrl
      img.alt = temple.location
      li.innerHTML = temple.templeName;
      ul.appendChild(li)
      ul.appendChild(img)
   });
   templesElement.appendChild(ul);
};


/* async getTemples Function using fetch()*/

const getTemples = async () => {
   const response = await fetch("https://byui-cse.github.io/cse121b-ww-course/resources/temples.json");
   templeList = await response.json();
   displayTemples(templeList);
}

/* reset Function */
const reset = () => {
   const templesElement = document.getElementById("temples");
   templesElement.innerHTML = " ";
}

/* filterTemples Function */
const filterTemples = (temples) => {
   reset(); // This resets the display before applying any filtering
 
   const filterElement = document.getElementById("filtered");
   const filter = filterElement.value;
 
   switch (filter) {
     case "utah":
       displayTemples(temples.filter(temple => temple.location.toLowerCase().includes("utah")));
       break;
 
     case "nonutah":
       displayTemples(temples.filter(temple => !temple.location.toLowerCase().includes("utah")));
       break;
 
     case "older":
       displayTemples(temples.filter(temple => new Date(temple.dedicated) < new Date(1950, 0, 1)));
       break;
 
     case "all":
     default:
       displayTemples(temples);
       break;
   }
 };
var change = document.querySelector("#filtered").addEventListener("change", () => {filterTemples(templeList)});
getTemples();

/* Event Listener */
