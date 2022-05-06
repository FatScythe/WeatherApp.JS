const cityForm = document.querySelector('main form');
const card = document.querySelector('main .card');
const details = document.querySelector('main .details');
const icon = document.querySelector('main .icon img');
const time = document.querySelector('main .time');



const updateUI = (data) => {
	// const cityDetails = data.cityDetails;
	// const weather = data.weather;
	// console.log(data);

	// Destructure Property: its a better way to write the above
	const {cityDetails, weather} = data;

	// converting Fahrenheit to degree Celsius
	const fahrenheit = weather.Temperature.Value;
	const celsius = Math.round(5/9 * (fahrenheit - 32))

	// Chainging the contents of the details

	details.innerHTML = `

				<h5 class="my-3">${cityDetails.EnglishName}</h5>

				<div class="my-3">${weather.IconPhrase}</div>

				<div class="display-4 my-4">
					<span>${celsius}</span><span>&deg;C</span>
				</div> `

	// Updating the image and icon 
	// let timeImg = null;
	const iconSrc = `image/icons/${weather.WeatherIcon}.svg`;

	// Image
	// Using ternary operator instead of the if {} else {} check

	const timeImg = weather.IsDaylight ? 'image/day.svg' : 'image/night.svg';

	// if(weather.IsDaylight){
	// 	timeImg = 'image/day.svg';
	// } else {
	// 	timeImg = 'image/night.svg';
	// }
	
	time.setAttribute('src', timeImg);

	// Icon
	icon.setAttribute('src', iconSrc);
	icon.setAttribute('title', weather.IconPhrase);


	// removing and adding the card			
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


	// Set Local Storage 

	localStorage.setItem('location', city);
});


if(localStorage.getItem('location')) {
	updateCity(localStorage.getItem('location'))
		.then(data => updateUI(data))
			.catch(err => console.log(err))
}