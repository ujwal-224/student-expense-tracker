// Login check
const user = localStorage.getItem("currentUser");

if (!user) {
  window.location.href = "login.html";
}


// Username
document.getElementById("userName").innerText =
  "Welcome, " + user;


// Logout
document.getElementById("logoutBtn").onclick = () => {

  localStorage.removeItem("currentUser");

  window.location.href = "login.html";
};


// Date
const month =
  new Date().toISOString().slice(0,7);


// Budget & Used
const budget =
  Number(localStorage.getItem(
    `monthBudget_${user}_${month}`
  )) || 0;

const used =
  Number(localStorage.getItem(
    `monthUsed_${user}_${month}`
  )) || 0;


// Show
document.getElementById("budget").innerText = budget;
document.getElementById("used").innerText = used;
document.getElementById("balance").innerText =
  budget - used;


// Collect expenses
let expenses = [];

for (let i=0;i<localStorage.length;i++) {

  const key = localStorage.key(i);

  if (key.startsWith("daily_" + user)) {

    const data =
      JSON.parse(localStorage.getItem(key));

    const date = key.split("_")[2];

    data.forEach(e => {
      expenses.push({
        date,
        category: e.category,
        amount: e.amount
      });
    });
  }
}


// Recent
const list = document.getElementById("recentList");

expenses.slice(-10).reverse().forEach(e => {

  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${e.date}</td>
    <td>${e.category}</td>
    <td>₹${e.amount}</td>
  `;

  list.appendChild(row);
});


// Category data
let cat = {};

expenses.forEach(e => {

  if (cat[e.category]) {
    cat[e.category]+=e.amount;
  } else {
    cat[e.category]=e.amount;
  }
});

// Menu Popup
const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const menuBox = document.getElementById("menuBox");

openMenu.onclick = () => {
  menuBox.style.display = "block";
};

closeMenu.onclick = () => {
  menuBox.style.display = "none";
};

// Close when clicking outside
window.onclick = (e) => {
  if (e.target === menuBox) {
    menuBox.style.display = "none";
  }
};
// Chart
new Chart(
  document.getElementById("expenseChart"),

  {
    type:"pie",

    data:{

      labels:Object.keys(cat),

      datasets:[{
        data:Object.values(cat),

        backgroundColor:[
          "#f200fa",
          "#950019",
          "#4e0000",
          "#5a00b4",
          "#540784"
        ]
      }]
    }
  }
);