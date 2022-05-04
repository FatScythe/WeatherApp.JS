const key = '1LA2GnWWszd6cVuuZybO3uJuj0Yq0DAW';

// get city information
const getCity = async (city) => {
	const response = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${city}`);
	const data = await response.json();

	return data[0];
}

// get weather information
const getWeather = async (id) => {
	const response = await fetch(`https://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${id}?apikey=${key}`);
	const data = await response.json();

	return data[0];
}

// getCity('lagos')
// 	.then(data => getWeather(data.Key)) 
// 		.then(data => console.log(data))
// 			.catch(err => console.log(err));