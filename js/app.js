//varibel
let shoppingCart=document.querySelector("#shopping-cart tbody ")

let clearCartAll=document.querySelector("#clear-cart");

//addEventListener
addEventListenr() 
function addEventListenr() {
document.querySelector("#courses-list").addEventListener("click",BtnsaveInfo);
shoppingCart.addEventListener("click",removeCourse);
clearCartAll.addEventListener("click",removeAllCourses);
document.addEventListener("DOMContentLoaded",loadedDataForLS);
}


//function

function BtnsaveInfo(e) {
  e.preventDefault();
  if(e.target.classList.contains("add-to-cart")){
    let courses=e.target.parentElement.parentElement
   
    let coursesInfo={
      img:courses.querySelector("img").src,
      titel:courses.querySelector("h4").textContent,
      price:courses.querySelector("span").textContent,
      id:courses.querySelectorAll("a")[1].getAttribute("data-id")
    }
    
    setInfoCourses(coursesInfo)
  }
}


function setInfoCourses(cInfo) {
let tr=document.createElement("tr");
tr.innerHTML=`
       <tr>
            <td>
               <img src="${cInfo.img}" width="100px">
            </td>
            <td>${cInfo.titel}</td>
            <td>${cInfo.price}</td>
          <td>
               <a href="#" class="remove" data-id="${cInfo.id}" >X</a>
          </td>
          
       </tr>

`
shoppingCart.appendChild(tr)
setLocalStorage(cInfo)
}


function removeCourse(e) {
  let cours;
  let coursId;
  if(e.target.classList.contains("remove")){
     e.target.parentElement.parentElement.remove();
     cours=e.target.parentElement.parentElement
    
     coursId=cours.querySelector('a').getAttribute('data-id')
    
    } 
     removeCourseLS(coursId)
  }

  
  
  function removeAllCourses() {
    while (shoppingCart.firstChild) {
      shoppingCart.firstChild.remove()
  }
  removeAllCourseLS()
}


function setLocalStorage(cInfo) {
  let getLS=getLocalStorage();
  getLS.push(cInfo);
  
  localStorage.setItem("course",JSON.stringify(getLS))
  
}

function getLocalStorage() {
  let cours;
  let getLS=localStorage.getItem("course");
  
  if(getLS==null){
    cours=[];
    
  }else{
    cours=JSON.parse(getLS);
  }
  return cours
}


function loadedDataForLS(e) {
  let getLS=getLocalStorage();
  getLS.forEach(cInfo => {
    
    let tr=document.createElement("tr");
    tr.innerHTML=`
    <tr>
    <td>
    <img src="${cInfo.img}" width="100px">
    </td>
    <td>${cInfo.titel}</td>
    <td>${cInfo.price}</td>
    <td>
    <a href="#" class="remove" data-id="${cInfo.id}" >X</a>
    </td>
    
    </tr>
    
    `
    shoppingCart.appendChild(tr)
  });
}

function  removeCourseLS(coursId){
  let getLS=getLocalStorage();
 getLS.forEach((get,index) => {
if (get.id==coursId) {
 getLS.splice(index,1)
}
 });
 localStorage.setItem("course",JSON.stringify(getLS))
}

function removeAllCourseLS() {
  localStorage.clear(shoppingCart)
}


