const FETCH_URL = 'https://davenov.com/quotes.php';


export const fetchQuote = async () => {
	const response = await fetch(FETCH_URL, {method: 'GET'});
	const parsedResponse = await response.json();

	return parsedResponse;
} 