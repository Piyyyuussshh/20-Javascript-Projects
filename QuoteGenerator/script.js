const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')
// Get Quotes from API

let apiQuotes = [];

// Show that content is loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show new Quote
function newQuote(){
    loading()
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if(!quote.author){
        authorText.textContent = "Unknown";
    }
    else{
        authorText.textContent = quote.author;
    }
    if(quote.text.length>120){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide loader
    quoteText.textContent = quote.text;
    complete();
}

async function getQuotes(){
    loading()
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl)
        apiQuotes = await response.json();
        newQuote()
    }
    catch{
        // Catch Error
    }
}

//To Tweet a Quote
function tweetQuote(){
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(tweetUrl,'_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);


getQuotes();