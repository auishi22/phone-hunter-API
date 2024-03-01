const loadPhone = async (phoneName, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${phoneName}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhone(phones, isShowAll);
};

const displayPhone = (phones, isShowAll) => {
  // console.log(phones.length);
  const phoneContainer = document.getElementById("phone-container");

  //   clear phone container card before adding new card
  phoneContainer.innerText = "";
  //   display slow all button if there are more than 12 phones
  const showAllButton = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllButton.classList.remove("hidden");
  } else {
    showAllButton.classList.add("hidden");
  }
  //   display only first 12 phones
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList =
      "card w-96 bg-base-100 shadow-xl border-2 rounded-2xl";
    phoneCard.innerHTML = `
        <div class="p-6 rounded-2xl">
            <figure class="bg-[#0d6efd0d] p-8"><img src="${phone.image}" alt="Shoes" /></figure>
        </div>
        <div class="card-body flex justify-center items-center">
            <h2 class="card-title text-4xl font-bold">${phone.brand}</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <h2 class="card-title text-3xl mb-4">${phone.phone_name}</h2>
            <div class="card-actions">
              <button onclick="handleShowDetails('${phone.slug}')" class="btn w-[180px] btn-primary">Show Details</button>
            </div>
        </div>
      `;
    phoneContainer.appendChild(phoneCard);
  });
  toggleLoadingSpinner(false);
};

// handle search button
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
};

// loading spinner
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// handle show all button
const handleShowAll = () => {
  handleSearch(true);
};

// show phone details
const handleShowDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phoneData = data.data;
  console.log(phoneData);
  showPhoneDetails(phoneData);
};

const showPhoneDetails = (phone) => {
  const showDetailsImg = document.getElementById("show-details-img");
  showDetailsImg.src = phone.image;

  const showDetailsName = document.getElementById("show-details-name");
  showDetailsName.innerText = phone.name;

  const showDetailsStorage = document.getElementById("show-details-storage");
  showDetailsStorage.innerText =`Storage : ${phone.mainFeatures.storage}`;
  const showDetailsDisplaySize = document.getElementById("show-details-display-size");
  showDetailsDisplaySize.innerText =`Display-Size : ${phone.mainFeatures.DisplaySize}`;
  const showDetailsChipset = document.getElementById("show-details-chipset");
  showDetailsChipset.innerText =`Chipset : ${phone.mainFeatures.chipSet}`;
  const showDetailsMemory = document.getElementById("show-details-memory");
  showDetailsMemory.innerText =`Memory : ${phone.mainFeatures.memory}`;


  // show modal
  show_detail.showModal();
};
