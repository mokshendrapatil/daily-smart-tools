// Weather Section
async function loadWeather() {
  const apiKey = '4a57241246f5dbdcfed6bb55c792acbd'; // Replace with your API key
  const city = document.getElementById('city-input').value || 'Delhi';

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();

    if (data.cod === 200) {
      document.getElementById('weather-output').innerHTML = `
        <p><strong>${data.name}</strong> — ${data.weather[0].description}</p>
        <p>🌡️ Temp: ${data.main.temp}°C</p>
      `;
    } else {
      document.getElementById('weather-output').innerText = "⚠️ City not found!";
    }
  } catch (err) {
    document.getElementById('weather-output').innerText = '⚠️ Failed to load weather.';
    console.error(err);
  }
}

// Quote Section
async function loadQuote() {
  try {
    const res = await fetch("https://type.fit/api/quotes");
    const quotes = await res.json();
    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    document.getElementById('quote').innerHTML = `
      <h2 class="font-bold text-xl">💬 Quote of the Day</h2>
      <p>"${quote.text}"</p>
      <p class="text-right italic">– ${quote.author || "Unknown"}</p>
    `;
  } catch (err) {
    document.getElementById('quote').innerText = '⚠️ Failed to load quote.';
    console.error(err);
  }
}

// To-Do Section
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

todoInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const task = e.target.value.trim();
    if (task) {
      const li = document.createElement('li');
      li.textContent = task;
      li.className = "bg-gray-200 px-3 py-1 rounded";
      todoList.appendChild(li);
      e.target.value = '';
    }
  }
});

// Dark Mode Toggle
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
}

// Run on Page Load
loadWeather();
loadQuote();
