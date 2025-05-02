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
