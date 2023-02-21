async function getTrendingMoviesPreview() {
  const res = await fetch(
    `https://api.themoviedb.org/3//trending/movie/day?api_key=${API_KEY}`
  );
  const data = await res.json();
  const movies = data.results;

  trendingMoviesPreviewList.innerHTML = "";
  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    );

    movieContainer.appendChild(movieImg);
    trendingMoviesPreviewList.appendChild(movieContainer);
  });
}

async function getCategoriesPreview() {
  const res = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=10a3bf76ca8c31fbf39d182f6c880706"
  );
  const data = await res.json();
  const categories = data.genres;

  categoriesPreviewList.innerHTML = "";

  categories.forEach((category) => {
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");

    const categoryTitle = document.createElement("h3");
    categoryTitle.classList.add("category-title");
    categoryTitle.setAttribute("id", "id" + category.id);
    categoryTitle.addEventListener("click", () => {
      location.hash = `#category= ${category.id}-${category.name}`;
    });
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    categoriesPreviewList.appendChild(categoryContainer);
  });
}

async function getMoviesByCategory() {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?with_genres=/day?api_key=${API_KEY}`
  );
  const data = await res.json();
  const movies = data.results;

  trendingMoviesPreviewList.innerHTML = "";
  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    );

    movieContainer.appendChild(movieImg);
    trendingMoviesPreviewList.appendChild(movieContainer);
  });
}
