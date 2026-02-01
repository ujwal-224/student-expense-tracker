// Login check
const user = localStorage.getItem("currentUser");

if (!user) {
  window.location.href="login.html";
}


// Date
const dateInput = document.getElementById("datePick");

dateInput.value =
  new Date().toISOString().slice(0,10);


// Month
const month =
  dateInput.value.slice(0,7);


// Budget
let budget =
  Number(localStorage.getItem(
    `monthBudget_${user}_${month}`
  )) || 0;

document.getElementById("showBudget").innerText = budget;


// Save budget (ADD, not replace)
document.getElementById("monthForm")
.addEventListener("submit", e => {

  e.preventDefault();

  const inputBudget =
    Number(document.getElementById("monthBudget").value);

  if (inputBudget <= 0) {
    alert("Enter valid budget");
    return;
  }

  // Get existing budget
  let existingBudget =
    Number(localStorage.getItem(
      `monthBudget_${user}_${month}`
    )) || 0;

  // ADD new budget
  let newBudget = existingBudget + inputBudget;

  // Save updated budget
  localStorage.setItem(
    `monthBudget_${user}_${month}`,
    newBudget
  );

  // Update UI
  document.getElementById("showBudget").innerText = newBudget;

  // Clear input
  document.getElementById("monthBudget").value = "";
});


// Expense
document.getElementById("expenseForm")
.addEventListener("submit",e=>{

  e.preventDefault();

  const amt =
    Number(document.getElementById("amount").value);

  const cat =
    document.getElementById("category").value;

  const date =
    dateInput.value;


  const key =
    `daily_${user}_${date}`;

  let data =
    JSON.parse(localStorage.getItem(key)) || [];

  data.push({
    amount:amt,
    category:cat
  });

  localStorage.setItem(key,JSON.stringify(data));


  // update used
  const usedKey =
    `monthUsed_${user}_${month}`;

  let used =
    Number(localStorage.getItem(usedKey))||0;

  used+=amt;

  localStorage.setItem(usedKey,used);

  render();
});


// Show list
function render(){

  const key =
    `daily_${user}_${dateInput.value}`;

  const data =
    JSON.parse(localStorage.getItem(key))||[];

  const list =
    document.getElementById("list");

  list.innerHTML="";

  data.forEach(e=>{

    const row=document.createElement("tr");

    row.innerHTML=`
      <td>${e.category}</td>
      <td>₹${e.amount}</td>
    `;

    list.appendChild(row);
    
  });
}
// Update Today Summary
function updateTodaySummary() {

  const date = dateInput.value;

  const key = `daily_${user}_${date}`;

  const data =
    JSON.parse(localStorage.getItem(key)) || [];

  let total = 0;

  data.forEach(e => {
    total += e.amount;
  });

  document.getElementById("todayTotal").innerText = total;
  document.getElementById("todayCount").innerText = data.length;
}


// Change date
dateInput.onchange=render;
updateTodaySummary();

render();