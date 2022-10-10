const search=()=>{
    const searchFood=document.getElementById("food");
    
     sniperDisplay('block')
     sniperDisplayOut('none')
    const food=searchFood.value;
    searchFood.value=''
    const error=document.getElementById('error-message');
    error.textContent=''
    if(food==''){
     const p=document.createElement('p')
    
    p.innerHTML=`<p>please write something to display</p>`
     error.appendChild(p)

    }
  
    
  else{
    const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        display(data.meals)
    })
  }
}
const sniperDisplay=displayStyle=>{
  document.getElementById('spiner').style.display=displayStyle;
}
const sniperDisplayOut=displayOut=>{
  document.getElementById('meal-details').style.display=displayOut;
}
const display=meals=>{
  
    const searchResult=document.getElementById('search-result');
   searchResult.textContent=''
   const show=document.getElementById('result');
   show.textContent=''
   sniperDisplay('none')
 
    
   if(!meals){
     const div=document.createElement('div')
    div.innerHTML=`<div><p>result not found</p></div>`
     show.appendChild(div)
   }
   else{
    
    meals.forEach(meal => {
     
        const div=document.createElement('div');
       
        
        div.classList.add("col");
        div.innerHTML=`<div class="card h-100" onclick="load(${meal.idMeal})">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
        </div>`;
      searchResult.appendChild(div);
     
        
    });
    
  }
    
}
const load=mealID=>{
   const url=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
   fetch(url)
   .then(res=>res.json())
  .then(data=>
    displayMealDetail(data.meals[0])
  )
}
const displayMealDetail = meal => {
  console.log(meal);
  const mealDetails = document.getElementById('meal-details');
  sniperDisplayOut('block')
  mealDetails.textContent=''
  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML = `
  <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
  <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
      <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
  </div>
  `;
  mealDetails.appendChild(div);
}