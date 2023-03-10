let page = 1;
let infiniteScroll;

searchFormBtn.addEventListener("click", () => {
  location.hash = `#search=${searchFormInput.value}`;
});

trendingBtn.addEventListener("click", () => {
  location.hash = "#trends";
});

arrowBtn.addEventListener("click", () => {
  history.back();
  location.hash = "#home";
});

window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);
window.addEventListener("scroll", infiniteScroll, false);

function navigator() {
  if (infiniteScroll) {
    window.removeEventListener("scroll", infiniteScroll, { passive: false });
    infiniteScroll = undefined;
  }
  if (location.hash.startsWith("#trends")) {
    trendsPage();
  } else if (location.hash.startsWith("#search=")) {
    searchPage();
  } else if (location.hash.startsWith("#movie=")) {
    moviePage();
  } else if (location.hash.startsWith("#category=")) {
    categoryPage();
  } else {
    homePage();
  }
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  if (infiniteScroll) {
    window.addEventListener("scroll", infiniteScroll, false);
  }
}

async function homePage() {
  console.log("Home!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.add("inactive");
  arrowBtn.classList.remove("header-arrow--white");

  searchForm.classList.remove("inactive");
  trendingPreviewSection.classList.remove("inactive");
  categoriesPreviewSection.classList.remove("inactive");

  genericSection.classList.add("inactive");
  movieDetailSection.classList.add("inactive");

  getCategoriesPreview();
  getTrendingMoviesPreview();
}

async function trendsPage() {
  console.log("Trends!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";

  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");

  headerTitle.classList.add("inactive");

  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");
  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");

  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");
  headerCategoryTitle.innerHTML = "Tendencias";
  getTrendingMovies();

  infiniteScroll = getPaginatedTrendingMovies;
}

async function searchPage() {
  console.log("Search!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";

  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");

  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");
  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");

  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  // ['#search', 'platzi']
  const [_, query] = location.hash.split("=");
  getMoviesBySearch(query);
}

async function moviePage() {
  console.log("Movie!");

  headerSection.classList.add("header-container--long");
  // headerSection.style.background = "";

  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.add("header-arrow--white");
  headerTitle.classList.add("inactive");

  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.add("inactive");
  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");

  genericSection.classList.add("inactive");
  movieDetailSection.classList.remove("inactive");

  const [_, movieId] = location.hash.split("=");
  getMovieById(movieId);
}

async function categoryPage() {
  console.log("categories!");
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";

  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");

  headerTitle.classList.add("inactive");

  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");
  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");

  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  const [_, categoryData] = location.hash.split("=");
  //['#category', 'id-name]
  const [categoryId, categoryName] = categoryData.split("-");
  headerCategoryTitle.innerHTML = categoryName;
  getMoviesByCategory(categoryId);
}
