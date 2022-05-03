const cityForm = document.querySelector('main form');
const card = document.querySelector('main .card');
const details = document.querySelector('main .details');


const updateUI = (data) => {
	// const cityDetails = data.cityDetails;
	// const weather = data.weather;

	// Destructure Property: its a better way to write the above
	const {cityDetails, weather} = data;

	// converting Fahrenheit to degree Celsius
	const fahrenheit = weather.Temperature.Value;
	const celsius = Math.round(5/9 * (fahrenheit - 32))

	// Chainging the contents of the details

	details.innerHTML = `

				<h5 class="my-3">${cityDetails.EnglishName}</h5>

				<h5 class="">02:50pm</h5>

				<div class="my-3">${weather.IconPhrase}</div>

				<div class="display-4 my-4">
					<span>${celsius}</span>
					<span>&deg;C</span>
				</div> `

	if(card.classList.contains('d-none')) {
		card.classList.remove('d-none');
	}
}

const updateCity = async (city) => {
	const cityDetails = await getCity(city);
	const weather = await getWeather(cityDetails.Key);

	return {cityDetails, weather};

}


cityForm.addEventListener('submit', e => {
	// To prevent the refresh behaviour
	e.preventDefault();


	const cityInput = document.querySelector('main form input');
	const city = cityInput.value.trim();
	cityForm.reset();
	
	updateCity(city)
		.then((data) => updateUI(data))
			.catch((err) => console.log(err)); 
})