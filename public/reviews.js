document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const tripId = urlParams.get("tripId");

  try {
    const res = await fetch(`/reviews/${tripId}`);
    const data = await res.json();

    const title = document.querySelector("#title");
    const tripName = document.createElement("span");
    tripName.textContent = " " + data[0].name;
    title.appendChild(tripName);

    const container = document.getElementById("reviewsContainer");
    container.innerHTML = "<h2>ביקורות:</h2>";

    if (Array.isArray(data) && data.length > 0) {
      data.forEach((review) => {
        const card = document.createElement("div");
        card.className = "review-card";

        card.innerHTML = `
            <div class="review-header">
          <span class="review-username">${review.username}</span>
          <span class="review-rating">⭐️ ${review.rating}/5</span>
        </div>
        <div class="review-comment">${review.comment}</div>
          `;

        container.appendChild(card);
      });
    } else {
      container.innerHTML += "<p>אין ביקורות זמינות לטיול זה.</p>";
    }
  } catch (err) {
    console.error("שגיאה בטעינת ביקורות", err);
    document.getElementById("reviewsContainer").innerHTML =
      "<p>שגיאה בטעינת הביקורות.</p>";
  }

  // ✅ Make sure this is outside the fetch block so it always registers
  const form = document.getElementById("reviewForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const rating = document.getElementById("rating").value;
      const comment = document.getElementById("comment").value;

      try {
        const res = await fetch(`/reviews/${tripId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ rating, comment }),
        });

        const result = await res.json();
        alert(result.message || "ביקורת נשלחה בהצלחה!");
        location.reload();
      } catch (err) {
        console.error("שגיאה בשליחת הביקורת", err);
        alert("אירעה שגיאה בשליחת הביקורת.");
      }
    });
  }
});

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
