function searchCountry() {

    const countryNameInput = document.getElementById("countryInput").value.trim();
    if (countryNameInput === "") {
        alert("Please enter a country name");
        return;
    }

    // Country API
    fetch(`https://restcountries.com/v3.1/name/${countryNameInput}`)
        .then(res => res.json())
        .then(data => {
            const countryData = data[0];
            const officialCountryName = countryData.name.common;
            document.getElementById("countries").innerHTML = `
                <h2>🌐 Country Information</h2>
                <p>🏳️ <b>Country:</b> ${officialCountryName}</p>
                <p>🏛️ <b>Capital:</b> ${countryData.capital ? countryData.capital[0] : 'N/A'}</p>
                <p>👨‍👩‍👧‍👦 <b>Population:</b> ${countryData.population.toLocaleString()}</p>
                <img src="${countryData.flags.png}" width="180">
            `;

            const region = countryData.region || 'N/A';
            const languages = countryData.languages ? Object.values(countryData.languages).join(', ') : 'N/A';
            const currency = countryData.currencies
                ? Object.values(countryData.currencies).map(c => c.name).join(', ')
                : 'N/A';
            const timezone = countryData.timezones && countryData.timezones.length > 0
                ? countryData.timezones.join(', ')
                : 'N/A';

            document.getElementById("users").innerHTML = `
                <h2>🌍 Country Details</h2>
                <p>🗺️ <b>Region:</b> ${region}</p>
                <p>🗣️ <b>Languages:</b> ${languages}</p>
                <p>💰 <b>Currency:</b> ${currency}</p>
                <p>⏰ <b>Timezone:</b> ${timezone}</p>
            `;
        })
        .catch(error => {
            document.getElementById("countries").innerHTML = `
                <h2>🌐 Country Information</h2>
                <p>❌ Country not found</p>
            `;
            document.getElementById("users").innerHTML = `
                <h2>👤 User Information</h2>
                <p>❌ No user information found for this country.</p>
            `;
        });

    // Weather API (kept as before, but you may want to update lat/lon dynamically)
    fetch("https://api.open-meteo.com/v1/forecast?latitude=17.3850&longitude=78.4867&current_weather=true")
        .then(res => res.json())
        .then(data => {
            document.getElementById("weather").innerHTML = `
                <h2>☀️ Weather Information</h2>
                <p>🌡️ <b>Temperature:</b> ${data.current_weather.temperature}°C</p>
                <p>💨 <b>Wind Speed:</b> ${data.current_weather.windspeed} km/h</p>
            `;
        });
}