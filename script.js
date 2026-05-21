const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const forms = document.querySelectorAll(".enquiry-form");
const enquiryList = document.querySelector("#enquiryList");
const clearButton = document.querySelector("#clearEnquiries");
const storageKey = "pari-tour-and-travel-enquiries";

// Live setup:
// 1. Create Google Sheet + Apps Script using google-apps-script.gs.
// 2. Deploy Apps Script as Web App.
// 3. Paste the Web App URL below.
const FORM_ENDPOINT = "";

function getEnquiries() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  } catch {
    return [];
  }
}

function saveEnquiries(enquiries) {
  localStorage.setItem(storageKey, JSON.stringify(enquiries));
}

function formatValue(value) {
  return value && String(value).trim() ? value : "Not provided";
}

function renderEnquiries() {
  if (!enquiryList) {
    return;
  }

  const enquiries = getEnquiries();

  if (!enquiries.length) {
    enquiryList.innerHTML =
      '<p class="empty-state">No enquiries saved on this device yet. Live setup can send data to Google Sheets.</p>';
    return;
  }

  enquiryList.innerHTML = enquiries
    .map(
      (item) => `
        <article class="enquiry-item">
          <strong>${formatValue(item.name)}</strong>
          <span>${formatValue(item.service)} - ${formatValue(item.customerType || item.formName)}</span>
          <span>Mobile: ${formatValue(item.mobile)}</span>
          <span>Destination: ${formatValue(item.destination)}</span>
          <span>${new Date(item.createdAt).toLocaleString()}</span>
        </article>
      `,
    )
    .join("");
}

navToggle?.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

async function sendToLiveEndpoint(enquiry) {
  if (!FORM_ENDPOINT) {
    return { live: false };
  }

  await fetch(FORM_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(enquiry),
  });

  return { live: true };
}

forms.forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const enquiry = Object.fromEntries(formData.entries());
    enquiry.formName = form.dataset.formName || "Website Enquiry";
    enquiry.createdAt = new Date().toISOString();
    enquiry.source = window.location.href;

    const enquiries = getEnquiries();
    enquiries.unshift(enquiry);
    saveEnquiries(enquiries.slice(0, 20));

    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton?.textContent || "Submit Enquiry";
    const message = form.querySelector(".success-message");

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    try {
      const result = await sendToLiveEndpoint(enquiry);
      form.reset();

      if (message) {
        message.textContent = result.live
          ? "Thank you. Your enquiry has been submitted successfully."
          : "Enquiry saved on this device. Add Google Apps Script URL in script.js for live Google Sheet data.";
      }
    } catch {
      if (message) {
        message.textContent =
          "Enquiry saved on this device. Please call or WhatsApp us if online submission fails.";
      }
    }

    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }

    renderEnquiries();
  });
});

clearButton?.addEventListener("click", () => {
  saveEnquiries([]);
  renderEnquiries();
});

renderEnquiries();
