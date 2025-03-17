const getRandomQuote = async () => {
  const quoteData = await fetch(
    "https://api.freeapi.app/api/v1/public/quotes/quote/random"
  );
  const quoteJSON = await quoteData.json();
  const quotesContainer =
    document.getElementsByClassName("quotes-container")[0];
  quotesContainer.innerText = `"${quoteJSON?.data?.content}" -${quoteJSON?.data?.author}`;
};

const copyToClipboard = async () => {
  const quotesText =
    document.getElementsByClassName("quotes-container")[0].innerText;
  console.log(quotesText);
  try {
    await navigator.clipboard.writeText(quotesText);
  } catch (e) {
    console.error("Failed to copy");
  }
};

const shareThisQuote = () => {
  const quote =
    document.querySelector(".quotes-container")?.innerText ||
    "No quote available.";
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    quote
  )}`;

  window.open(twitterShareUrl, "_blank");
};

const changeBackground = async () => {
  const response = await fetch("https://picsum.photos/1080/1080");
  const imageUrl = response.url;

  const quotesContainer =
    document.getElementsByClassName("quotes-container")[0];

  if (!quotesContainer) {
    console.error("No element with class 'quotes-container' found.");
    return;
  }

  quotesContainer.style.backgroundImage = `url('${imageUrl}')`;
  quotesContainer.style.backgroundSize = "cover";
  quotesContainer.style.backgroundPosition = "center";
};

getRandomQuote();
