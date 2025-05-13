window.addEventListener("DOMContentLoaded", loadMyOrders);

async function loadMyOrders() {
  try {
    const response = await fetch("/myorders", {
      credentials: "include", // Important if JWT is in cookies
    });
    const data = await response.json();

    const myDiv = document.querySelector("#myDiv");
    myDiv.innerHTML = "<h2 class='text-2xl font-bold mb-6 text-center'>ההזמנות שלי</h2>";

    if (Array.isArray(data) && data.length > 0) {
      const container = document.createElement("div");
      container.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
      
      data.forEach((item) => {
        const card = document.createElement("div");
        card.className = "trip-card";
        card.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover">
          <div class="info">
            <h3>${item.name}</h3>
            <p>תאריך הזמנה: ${new Date(item.date).toLocaleDateString("he-IL")}</p>
            <p>מחיר: $${item.price}</p>
          </div>
        `;
        container.appendChild(card);
      });
      
      myDiv.appendChild(container);
    } else {
      myDiv.innerHTML += "<p class='text-center text-gray-600 mt-4'>אין הזמנות להצגה.</p>";
    }
  } catch (error) {
    console.error("שגיאה בשליפת ההזמנות:", error);
    document.querySelector("#myDiv").innerHTML = 
      "<p class='text-center text-red-600 mt-4'>אירעה שגיאה בשליפת ההזמנות.</p>";
  }
}

async function signOut() {
  try {
    const res = await fetch("/signout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();
    //alert(result.message);
    window.location.href = "/welcome.html";
  } catch (err) {
    console.error("Login failed", err);
    //alert("Login failed. See console for details.");
  }
}

function backToIndex() {
  window.location.href = "/";
}
