/** Welcome type writer effect */
const welcomeText = "Welcome, Rob."
const h1 = document.getElementById('welcome-text');

function typewrite (index) {
  
  h1.innerHTML = welcomeText.substr(0, index + 1);
  if (index < welcomeText.length) {
    setTimeout(typewrite, 200, ++index);
  }
}

window.addEventListener("load", function() {
  typewrite(0);
})

/** Life Progress bar */
function updateProgressBar() {
  const deathDate = new Date("Feb 23 2076");
  const birthDate = new Date("Feb 23 1997");

  const totalLife = deathDate - birthDate;
  const spentLife = new Date() - birthDate;

  const lifeProgress = spentLife / totalLife * 100;
  const days = Math.floor((totalLife - spentLife) / 1000 / 60 / 60 / 24);

  const lifeBar = document.getElementById('life-bar');
  const lifeStats = document.getElementById('life-stats');
  lifeBar.setAttribute('days', days);
  lifeBar.setAttribute('progress', lifeProgress);
  lifeStats.innerHTML = 
    `You have lived approximately ${Math.ceil(spentLife / totalLife * 100)}% of your life`
}
setTimeout(updateProgressBar, 0);

/** Search bar */
const input = document.getElementById("searchInput");
input.addEventListener("change", function(ev) {
  const searchString = ev.target.value.trim().replace(" ", "+");
  window.open(`https://duckduckgo.com/?q=${searchString}`, '_self');
})

const searchBarDiv = document.getElementById("searchbar");
const searchBarButton = document.getElementById("searchButton");
searchBarDiv.addEventListener("mouseover", function() {
  searchBarButton.style.backgroundColor = "rgb(210, 210, 210)";
});

searchBarDiv.addEventListener("mouseout", function() {
  searchBarButton.style.backgroundColor = "rgb(239, 239, 239)"
});
