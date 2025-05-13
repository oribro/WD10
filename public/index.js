// Toast notification function
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = type === 'success' ? '✓' : '✕';
  const iconColor = type === 'success' ? '#147e37' : '#d9534f';
  
  toast.innerHTML = `
    <span class="toast-icon" style="color: ${iconColor}">${icon}</span>
    <div class="toast-content">
      <p class="toast-message">${message}</p>
    </div>
    <button class="toast-close" onclick="this.parentElement.remove()">×</button>
  `;
  
  container.appendChild(toast);
  
  // Trigger reflow to enable transition
  toast.offsetHeight;
  toast.classList.add('show');
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}

// Date validation function
function validateDates(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (start < today) {
    showToast('תאריך ההתחלה חייב להיות מהיום והלאה', 'error');
    return false;
  }
  if (end < start) {
    showToast('תאריך הסיום חייב להיות אחרי תאריך ההתחלה', 'error');
    return false;
  }
  return true;
}

async function submitDates() {
  const startDate = document.querySelector("#startDate").value;
  const endDate = document.querySelector("#endDate").value;

  if (!startDate || !endDate) {
    showToast('יש לבחור תאריכי התחלה וסיום', 'error');
    return;
  }

  if (!validateDates(startDate, endDate)) {
    return;
  }

  const loading = document.getElementById('loading');
  const container = document.getElementById('tripContainer');

  try {
    loading.style.display = 'flex';
    container.innerHTML = '';

    const response = await fetch(
      `/trips?startDate=${startDate}&endDate=${endDate}`
    );
    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      data.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'trip-card';
        
        const startDate = new Date(item.start_date).toLocaleDateString('he-IL', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
        
        const endDate = new Date(item.end_date).toLocaleDateString('he-IL', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });

        card.innerHTML = `
          <img src="${item.image}" alt="${item.name}" loading="lazy">
          <div class="info">
            <h3>${item.name}</h3>
            <p>מתאריך: ${startDate}</p>
            <p>עד תאריך: ${endDate}</p>
            <p class="price">$${item.price.toLocaleString()}</p>
            <div class="buttons">
              <button onclick="orderTrip(${item.id})" class="order-btn">
                <span class="icon">🎫</span>
                הזמן טיול
              </button>
              <button onclick="showReviews(${item.id})" class="review-btn">
                <span class="icon">⭐</span>
                ביקורות
              </button>
            </div>
          </div>
        `;
        container.appendChild(card);
      });
    } else {
      container.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: #666;">
          <h3>אין טיולים זמינים בטווח תאריכים זה</h3>
          <p>נסה לבחור תאריכים אחרים</p>
        </div>
      `;
    }
  } catch (error) {
    console.error("שגיאה:", error);
    showToast('שגיאה בטעינת נתונים מהשרת', 'error');
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: #666;">
        <h3>שגיאה בטעינת הנתונים</h3>
        <p>אנא נסה שוב מאוחר יותר</p>
      </div>
    `;
  } finally {
    loading.style.display = 'none';
  }
}

async function orderTrip(tripId) {
  try {
    const response = await fetch(`/orders/${tripId}`, {
      method: "POST",
      credentials: "include",
    });

    // Check if the response has JSON content
    const contentType = response.headers.get("content-type");
    let data;
    
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = { message: await response.text() };
    }
    
    if (response.ok) {
      showToast('ההזמנה בוצעה בהצלחה! 🎉');
    } else {
      throw new Error('הזמנה נכשלה');
    }
  } catch (err) {
    console.error("שגיאה בהזמנה:", err);
    showToast(err.message || 'אירעה שגיאה בביצוע ההזמנה', 'error');
  }
}

async function showReviews(tripId) {
  try {
    const response = await fetch(`/reviews/${tripId}`);
    
    if (response.ok) {
      window.location.href = `/reviews.html?tripId=${tripId}`;
    } else {
      throw new Error('לא ניתן לטעון ביקורות');
    }
  } catch (err) {
    console.error("שגיאה:", err);
    showToast('שגיאה בטעינת הביקורות', 'error');
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
    showToast(result.message);
    
    // Redirect after a short delay to show the message
    setTimeout(() => {
      window.location.href = "/welcome.html";
    }, 1500);
  } catch (err) {
    console.error("התנתקות נכשלה", err);
    showToast('שגיאה בהתנתקות מהמערכת', 'error');
  }
}

// Set minimum date for date inputs to today
document.addEventListener('DOMContentLoaded', () => {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('startDate').min = today;
  document.getElementById('endDate').min = today;
});
