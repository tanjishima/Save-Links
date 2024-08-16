let allLinks=[];
let input=document.getElementById("input");
let inputBtn=document.getElementById("input-btn");
let tabBtn=document.getElementById("tab-btn");
let deleteBtn=document.getElementById("delete-btn");
let list=document.getElementById("list");


let getLinksFromLocalStorage = JSON.parse(localStorage.getItem("links"));

if(getLinksFromLocalStorage){
    allLinks=getLinksFromLocalStorage;
    renderArry(allLinks);
}
 
function renderArry(arr){
    list.innerHTML="";
    arr.forEach(item => {
        list.innerHTML +=`
         <li><a href=${item} class="link">${item}</a></li>
        `
    });
}

inputBtn.addEventListener("click",()=>{
   let links= input.value;
   allLinks.push(links);
   //console.log(allLinks);
   input.value="";
   localStorage.setItem("links", JSON.stringify(allLinks));
   renderArry(allLinks);
})


deleteBtn.addEventListener("click",() =>{
    localStorage.clear();
    allLinks=[];
    renderArry(allLinks);
})

tabBtn.addEventListener("click",() =>{
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        var activeTab = tabs[0].url;
        allLinks.push(activeTab);
        localStorage.setItem("links", JSON.stringify(allLinks));
        renderArry(allLinks);
        
      });
})


