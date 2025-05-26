// Fetch profiles from JSON
interface UserProfile {
  badge?: string;
  status?: string;
  photo?: string;
  name?: string;
  id?: string;
  address?: string;
  dob?: string;
  role?: string;
}

interface Profiles {
  [key: string]: UserProfile;
}

let profiles: Profiles = {};
let currentRole: string = localStorage.getItem('currentRole') || 'visitor';

// Renders the profile popup based on the current role (visitor, citizen, resident)
function renderPopup(
  popup: HTMLElement | null,
  summaryBtn: HTMLElement | null
) {
  if (!popup || !summaryBtn) return;
  // Get the user profile for the current role
  const user = profiles[currentRole] || {};
  if (currentRole === 'visitor') {
    // Show login options if user is a visitor
    popup.innerHTML = `
      <div class="px-4 py-3 border-b border-neutral-200">
        <p class="font-semibold text-lg">Welcome, Visitor!</p>
        <p class="text-sm text-neutral-500">Please choose how to log in:</p>
      </div>
      <div class="p-4 space-y-3">
        <button id="login-citizen"
                class="w-full py-2 rounded-lg bg-red-800 text-white font-semibold hover:bg-red-700">
          Log in as Citizen
        </button>
        <button id="login-resident"
                class="w-full py-2 rounded-lg border border-red-800 text-red-800 font-semibold hover:bg-red-50">
          Log in as Resident
        </button>
      </div>
    `;
    // Add event listeners for login buttons
    const loginCitizen = document.getElementById('login-citizen');
    if (loginCitizen) loginCitizen.onclick = () => switchRole('citizen');
    const loginResident = document.getElementById('login-resident');
    if (loginResident) loginResident.onclick = () => switchRole('resident');
  } else {
    // Show user profile info if logged in
    popup.innerHTML = `
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold ${
        user.badge === 'green'
          ? 'bg-green-100 text-green-800'
          : 'bg-yellow-100 text-yellow-800'
      }">
        <span>${user.status || ''}</span>
        <span class="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full ${
          user.badge === 'green' ? 'bg-green-500' : 'bg-yellow-500'
        }"></span>
      </div>
      <div class="p-3 sm:p-4 space-y-2 sm:space-y-3 text-xs sm:text-sm">
        <div class="flex items-center gap-2 sm:gap-3">
          <img src="${user.photo}" alt="Mock ID"
               class="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-neutral-300"/>
          <div>
            <p class="font-semibold">${user.name}</p>
            <p class="text-neutral-500">${user.role} ID: ${user.id || ''}</p>
          </div>
        </div>
        <div>
          <p><span class="font-semibold">Address:</span> ${user.address || ''}</p>
          <p><span class="font-semibold">Date of Birth:</span> ${user.dob || ''}</p>
        </div>
        <button id="logout-btn" class="mt-3 sm:mt-4 w-full py-2 rounded-lg border border-neutral-300 text-neutral-700 font-semibold hover:bg-neutral-100">Log out</button>
      </div>
    `;
    // Add event listener for logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.onclick = () => switchRole('visitor');
  }
  // Update summary icon (profile picture or default icon)
  if (currentRole !== 'visitor' && user.photo) {
    summaryBtn.innerHTML = `<img src="${user.photo}" alt="Profile" class="h-9 w-9 rounded-full"/>`;
  } else {
    summaryBtn.innerHTML = `<img src="/src/assets/icons/icon-user.png" alt="Profile" class="h-9 w-9 rounded-full filter invert" />`;
  }
}

function switchRole(role: string) {
  currentRole = role;
  localStorage.setItem('currentRole', role);
  const popup = document.getElementById('profile-popup');
  const summaryBtn = document.getElementById('profile-summary');
  renderPopup(popup, summaryBtn);
}

window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('profile-container');
  const summaryBtn = document.getElementById('profile-summary');
  const popup = document.getElementById('profile-popup');
  if (!summaryBtn || !popup) return;

  summaryBtn.addEventListener('click', () => {
    if (!popup || !summaryBtn) return;
    const isOpen = popup.classList.toggle('hidden') === false;
    summaryBtn.classList.toggle('open-icon', isOpen);
    renderPopup(popup, summaryBtn);
  });

  fetch('/src/data/profiles.json')
    .then(res => res.json())
    .then((data: Profiles) => {
      profiles = data;
      renderPopup(popup, summaryBtn);
    });

  renderPopup(popup, summaryBtn);
});
