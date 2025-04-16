let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let searchInp = document.getElementById("search");
let category = document.getElementById("category");
let count = document.getElementById("count");
let submit = document.getElementById("submit");
let totals = document.querySelectorAll(".total");
let tbody = document.querySelector(".insertion");
let statusSettingIcon=document.querySelector(".status")
let inputs = [title, price, taxes, ads, discount, count, category];

let mood = "create";
let tmp;
// console.log(totals)
// console.log(title,price,taxes,ads,discount,total,count,submit)
//get total
function GetTotal()
{
            if (price.value != "" && taxes.value!="" && ads.value !="") {
                let resault =
                    +price.value + +taxes.value + +ads.value - +discount.value;
                total.innerHTML = resault;
                total.style.backgroundColor = "green";
            } else {
                total.innerHTML = "0";
                total.style.backgroundColor = "red";
            }
}
totals.forEach((element) => {
    element.addEventListener("keyup", GetTotal);
   
 });
//create product
let dataProduct = [];
if (localStorage.PRODUCT != null) {
    dataProduct = JSON.parse(localStorage.PRODUCT);
    //  console.log(dataProduct);
}

submit.addEventListener("click", function () {
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };
    if(title.value !="" && price.value !="" && category.value !="" &&newProduct.count <=100){
          if (mood == "create") {
        if (newProduct.count > 1) {
            for (let i = 0; i < newProduct.count; i++) {
                dataProduct.push(newProduct);
            }
        } else {
            dataProduct.push(newProduct);
        }
    } else {
        dataProduct[tmp] = newProduct;
        mood = "create";
        submit.textContent = "Create";
        count.style.display = "block";
    }
    ClearData();
    }
  

    localStorage.setItem("PRODUCT", JSON.stringify(dataProduct));
    addData();
    // console.log(newProduct)
    // console.log(dataProduct)
});
//save in local storage
//clear inputs
function ClearData() {
    inputs.forEach((inp) => {
        inp.value = "";
    });
    total.innerHTML = "";
}
//read
function addData() {
    GetTotal()
    // let newRow=table.insertRow();
    // let end=dataProduct[dataProduct.length -1]
    // let endArr=Object.values(end)
    // console.log(endArr)
    let table = "";
    for (let i = 0; i < dataProduct.length; i++) {
        table += `
   <tr>
                    <th>${i + 1}</th>
                    <th>${dataProduct[i].title}</th>
                    <th>${dataProduct[i].price}</th>
                    <th>${dataProduct[i].taxes}</th>
                    <th>${dataProduct[i].ads}</th>
                    <th>${dataProduct[i].discount}</th>
                    <th>${dataProduct[i].total}</th>
                    <th>${dataProduct[i].category}</th>
                    <th><button onclick="updateData(${i})" id="update">Update</button></th>
                    <th><button onclick=deleteData(${i}) id="delete" >Delete</button></th>
    </tr>
  `;
    }
    tbody.innerHTML = table;
    let dltAll = document.getElementById("deleteAll");
    if (dataProduct.length > 0) {
        //   let btn= document.createElement("button")
        //   btn.className="dltbtn"
        //   btn.textContent="Delete All";
        //   btn.addEventListener("click",deleteAll)
        //   dltAll.appendChild(btn)
        dltAll.innerHTML = `<button onclick=deleteAll() >Delete All (${dataProduct.length})</button>`;
    } else {
        dltAll.innerHTML = "";
    }
}
addData();
//delete

function deleteData(i) {
    dataProduct.splice(i, 1);
    localStorage.PRODUCT = JSON.stringify(dataProduct);
    addData();
}
function deleteAll() {
    localStorage.clear();
    dataProduct.splice(0);
    addData();
}

//update

function updateData(i) {
    tmp = i;
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    GetTotal()
    category.value = dataProduct[i].category;
    count.style.display = "none";
    submit.textContent = "Update";
    mood = "update";
    scroll({ top: 0, behavior: "smooth" });
}
//search
let searchMode="title"
let searchBtn= document.querySelectorAll(".btnSearch button")
// console.log(searchBtn)
searchBtn.forEach((element)=>element.addEventListener("click",function(){getSearchMode(this.id)}))
function getSearchMode(id){
if(id=="searchTitle"){
    searchMode="title"
}else{
    searchMode="category"

}
searchInp.placeholder="search by "+searchMode
searchInp.focus()
searchInp.value=""
addData()
}

searchInp.addEventListener("keyup",function(){searchData(this.value)})


function searchData(value){
    let table='';
    for (let i = 0; i < dataProduct.length; i++) {
    if(searchMode=="title"){
        
            if(dataProduct[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                                 <th>${i + 1}</th>
                                 <th>${dataProduct[i].title}</th>
                                 <th>${dataProduct[i].price}</th>
                                 <th>${dataProduct[i].taxes}</th>
                                 <th>${dataProduct[i].ads}</th>
                                 <th>${dataProduct[i].discount}</th>
                                 <th>${dataProduct[i].total}</th>
                                 <th>${dataProduct[i].category}</th>
                                 <th><button onclick="updateData(${i})" id="update">Update</button></th>
                                 <th><button onclick=deleteData(${i}) id="delete" >Delete</button></th>
                 </tr>
               `
            }
        
    }else{
       
            if(dataProduct[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                                 <th>${i + 1}</th>
                                 <th>${dataProduct[i].title}</th>
                                 <th>${dataProduct[i].price}</th>
                                 <th>${dataProduct[i].taxes}</th>
                                 <th>${dataProduct[i].ads}</th>
                                 <th>${dataProduct[i].discount}</th>
                                 <th>${dataProduct[i].total}</th>
                                 <th>${dataProduct[i].category}</th>
                                 <th><button onclick="updateData(${i})" id="update">Update</button></th>
                                 <th><button onclick=deleteData(${i}) id="delete" >Delete</button></th>
                 </tr>
               `
            }
        
    }
}
    tbody.innerHTML=table
}
//clean data

statusSettingIcon.onclick=function(){
document.body.classList.toggle("light");
if(document.body.classList.contains("light"))
{
    statusSettingIcon.src="img/moon.png"
}else{
    statusSettingIcon.src="img/sun.png"
}
}
