window.addEventListener("DOMContentLoaded", loadMyOrders);

async function loadMyOrders() {
  try {
    const response = await fetch("/myorders", {
      credentials: "include", // Important if JWT is in cookies
    });
    const data = await response.json();

    const myDiv = document.querySelector("#myDiv");
    myDiv.innerHTML = "<p><b>ההזמנות שלי:</b></p>";

    if (Array.isArray(data) && data.length > 0) {
      data.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("trip-card");
        card.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="info">
                    <h3>${item.name}</h3>
                    <p>תאריך הזמנה: ${new Date(item.date).toLocaleDateString(
                      "he-IL"
                    )}</p>
                    <p>מחיר: $${item.price}</p>
                </div>
              `;
        myDiv.appendChild(card);
      });
    } else {
      myDiv.innerHTML += "<p>אין הזמנות להצגה.</p>";
    }
  } catch (error) {
    console.error("שגיאה בשליפת ההזמנות:", error);
    document.querySelector("#myDiv").textContent =
      "אירעה שגיאה בשליפת ההזמנות.";
  }
}

async function signOut() {
  try {
    const res = await fetch("/signout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();
    alert(result.message);
    window.location.href = "/welcome.html";
  } catch (err) {
    console.error("Login failed", err);
    alert("Login failed. See console for details.");
  }
}

function backToIndex() {
  window.location.href = "/";
}
