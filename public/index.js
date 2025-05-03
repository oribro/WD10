async function submitDates() {
  const startDate = document.querySelector("#startDate").value;
  const endDate = document.querySelector("#endDate").value;

  if (!startDate || !endDate) {
    alert("יש לבחור תאריכי התחלה וסיום.");
    return;
  }

  try {
    const response = await fetch(
      `/trips?startDate=${startDate}&endDate=${endDate}`
    );
    const data = await response.json();

    const container = document.getElementById("tripContainer");
    container.innerHTML = ""; // Clear previous

    if (Array.isArray(data) && data.length > 0) {
      data.forEach((item) => {
        const card = document.createElement("div");
        card.className = "trip-card";
        card.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="info">
                        <h3>${item.name}</h3>
                        <p>מתאריך: ${new Date(
                          item.start_date
                        ).toLocaleDateString("he-IL")}</p>
                        <p>עד תאריך: ${new Date(
                          item.end_date
                        ).toLocaleDateString("he-IL")}</p>
                        <p>מחיר: $${item.price}</p>
                        <button onclick="orderTrip(${
                          item.id
                        })">הזמן טיול</button>
                        <button onclick="showReviews(${
                          item.id
                        })">הצג ביקורות</button>
                    </div>
                `;
        container.appendChild(card);
      });
    } else {
      container.innerHTML = "<p>אין טיולים זמינים בטווח תאריכים זה.</p>";
    }
  } catch (error) {
    console.error("שגיאה:", error);
    document.getElementById("tripContainer").innerHTML =
      "<p>שגיאה בטעינת נתונים מהשרת.</p>";
  }
}

async function orderTrip(tripId) {
  try {
    const response = await fetch(`/orders/${tripId}`, {
      method: "POST",
      credentials: "include", // to send cookies if using JWT in cookies
    });

    if (response.ok) {
      alert("ההזמנה בוצעה בהצלחה!");
    } else {
      const data = await response.json();
      alert(data.error || "הזמנה נכשלה.");
    }
  } catch (err) {
    console.error("שגיאה בהזמנה:", err);
    alert("אירעה שגיאה.");
  }
}

async function showReviews(tripId) {
  try {
    const response = await fetch(`/reviews/${tripId}`);

    if (response.ok) {
      window.location.href = `/reviews.html?tripId=${tripId}`;
    }
  } catch (err) {
    console.error("שגיאה :", err);
    alert("אירעה שגיאה.");
  }
}

async function goToMyOrders() {
  window.location.href = "/myorders.html";
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
