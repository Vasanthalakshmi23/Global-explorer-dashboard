function searchCountry() {

    const countryName = document.getElementById("countryInput").value;

    if(countryName === ""){
        alert("Please enter a country name");
        return;
    }

    // Country API
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(res => res.json())
    .then(data => {

        document.getElementById("countries").innerHTML = `
            <h2>🌐 Country Information</h2>

            <p>🏳️ <b>Country:</b> ${data[0].name.common}</p>

            <p>🏛️ <b>Capital:</b> ${data[0].capital[0]}</p>

            <p>👨‍👩‍👧‍👦 <b>Population:</b>
            ${data[0].population.toLocaleString()}</p>

            <img src="${data[0].flags.png}" width="180">
        `;
    })
    .catch(error => {
        document.getElementById("countries").innerHTML = `
        <h2>🌐 Country Information</h2>
        <p>❌ Country not found</p>
        `;
    });


    // Weather API
    fetch("https://api.open-meteo.com/v1/forecast?latitude=17.3850&longitude=78.4867&current_weather=true")
    .then(res => res.json())
    .then(data => {

        document.getElementById("weather").innerHTML = `
            <h2>☀️ Weather Information</h2>

            <p>🌡️ <b>Temperature:</b>
            ${data.current_weather.temperature}°C</p>

            <p>💨 <b>Wind Speed:</b>
            ${data.current_weather.windspeed} km/h</p>
        `;
    });


    // Users API
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => {

        document.getElementById("users").innerHTML = `
            <h2>👤 User Information</h2>

            <p>🙋 <b>Name:</b> ${data[0].name}</p>

            <p>📧 <b>Email:</b> ${data[0].email}</p>

            <p>📞 <b>Phone:</b> ${data[0].phone}</p>
        `;
    });

}