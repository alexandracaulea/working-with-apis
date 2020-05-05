const endpoint = "https://jobs.github.com/positions.json";
const proxy = "https://polar-caverns-16644.herokuapp.com/";
const searchJobForm = document.querySelector(".search");
const submitFormButton = searchJobForm.querySelector("[name='submit']");
const inputs = searchJobForm.querySelectorAll("input");
const jobsContainer = document.querySelector(".job__container");
const errorMsg = document.querySelector(".error-message");
const loader = document.querySelector(".lds-ellipsis");

function displayJobInformation() {
  const parentElem = this.parentElement.parentElement.parentElement;
  if (parentElem.classList.contains("current")) {
    this.textContent = "Description";
  } else {
    this.textContent = "Collapse";
  }
  parentElem.classList.toggle("current");
}

function addBtnEvents() {
  const btns = jobsContainer.querySelectorAll(".job__description__btn");
  btns.forEach((btn) => btn.addEventListener("click", displayJobInformation));
}

function formatDate(date) {
  const convertedDate = new Date(date);
  let day = convertedDate.getDate();
  let month = convertedDate.getMonth();
  const year = convertedDate.getFullYear();
  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  return `${day}/${month}/${year}`;
}

function truncateHeading(headingText) {
  headingText = `${headingText.substring(0, 35)}...`;
  return headingText;
}

function handleMissingLogo(url) {
  if (!url) {
    url = "img/missing-logo.png";
    return url;
  }
  return url;
}

async function displayJobs(jobs) {
  if (!Array.isArray(jobs) || !jobs.length) {
    errorMsg.setAttribute("role", "alert");
    errorMsg.textContent = "Nothing found";
    errorMsg.classList.add("show-error");
    loader.classList.add("hidden");
    return;
  }
  const html = jobs.map(
    (job) => `
      <li class="job__list">
        <div class="job__information">
          <figure class="job__logo">
            <img loading="lazy" src=${handleMissingLogo(job.company_logo)} alt="${
      job.company
    }" width="100" height="100" />
          </figure>
          <div class="job__summary">
            <h2 class="job__title" title="${job.title}">${truncateHeading(job.title)}</h2>
            <span class="job__type">${job.type}</span>
            <p class="job__postedby">
              <a class="external-link-company" href="${job.company_url}" target="_blank" rel="noopener noreferrer">${
      job.company
    }</a>
            </p>
            <p class="job__location"> 
              <svg aria-hidden="true" width="11" height="13" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path d="M10.044 5.168c0 2.81-4.996 10.767-4.996 10.767S.052 7.978.052 5.168c0-.668.13-1.33.38-1.948a5.095 5.095 0 011.083-1.65A4.99 4.99 0 013.135.465a4.917 4.917 0 013.825 0 4.99 4.99 0 011.621 1.103A5.095 5.095 0 019.664 3.22c.25.618.38 1.28.38 1.948z" fill="#FD7792"/><path d="M5.048 6.351c.834 0 1.51-.688 1.51-1.538 0-.85-.676-1.538-1.51-1.538s-1.51.689-1.51 1.538c0 .85.676 1.538 1.51 1.538z" fill="#fff"/></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h10.105v16H0z"/></clipPath></defs></svg>
              ${job.location}
            </p>
            <p class="job__datecreated">
              <svg class="calendar-icon" aria-hidden="true" width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.667 6.333H4v1.334H2.667V6.333zm0 2.667H4v1.333H2.667V9zm2.666-2.667h1.334v1.334H5.333V6.333zm0 2.667h1.334v1.333H5.333V9zM8 6.333h1.333v1.334H8V6.333zM8 9h1.333v1.333H8V9z" fill="#FD7792"/><path d="M1.333 13.667h9.334c.735 0 1.333-.598 1.333-1.334V3c0-.735-.598-1.333-1.333-1.333H9.333V.333H8v1.334H4V.333H2.667v1.334H1.333C.598 1.667 0 2.265 0 3v9.333c0 .736.598 1.334 1.333 1.334zm9.334-9.334v8H1.333v-8h9.334z" fill="#FD7792"/></svg>
              Published on <time>${formatDate(job.created_at)}</time>
            </p>
            <button class="job__description__btn">Description</button>
          </div>
        </div>
        <div class="job__description">
          ${job.description}
          <h2>How To Apply:</h2>
           ${job.how_to_apply}
        </div>
      </li>
    `
  );
  jobsContainer.innerHTML = html.join("");
  loader.classList.add("hidden");
  addBtnEvents();
}

async function fetchJobs(keywords, city) {
  try {
    loader.classList.remove("hidden");
    const response = await axios.get(`${proxy}${endpoint}?${keywords}&location=${city}`);
    const data = response.data;
    console.log(data);
    submitFormButton.disabled = true;
    return data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      errorMsg.textContent = `${error.response.data}`;
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
      errorMsg.textContent = `${error.request}`;
    } else {
      // Something happened in setting up the request and triggered an Error
      console.log("Error", error.message);
      errorMsg.textContent = `${error.message}`;
    }
    // console.log(error);
    errorMsg.setAttribute("role", "alert");
    errorMsg.classList.add("show-error");
  }
}

async function fetchAndDisplayJobs(keywords, city) {
  const jobs = await fetchJobs(keywords, city);
  submitFormButton.disabled = false;
  displayJobs(jobs);
}

async function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const keywords = form.keywords.value.trim().toLowerCase();
  const city = form.location.value.trim().toLowerCase();
  errorMsg.classList.remove("show-error");
  await fetchAndDisplayJobs(keywords, city);
}

function handleFocus() {
  if (this === document.activeElement || this.value !== "") {
    this.parentElement.classList.add("focused");
  } else {
    this.parentElement.classList.remove("focused");
  }
}

// Event Listeners
searchJobForm.addEventListener("submit", handleFormSubmit);
inputs.forEach((input) => input.addEventListener("focus", handleFocus));
inputs.forEach((input) => input.addEventListener("blur", handleFocus));
