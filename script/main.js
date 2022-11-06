const productsListEl = document.querySelector("#products-list");
const modalWrapperEl = document.querySelector("#modal-wrapper");
const modalDeleteEl = document.querySelector("#modal-delete");
const confirmDeleteEl = document.querySelector("#modal-btn-alright");
const loadingEl = document.querySelector(".loading");


const BASE_URL = "https://fakestoreapi.com/products";



(async () => {
    loadingImg(true);
    try {
        const RESPONSE = await fetch(BASE_URL);
        const DATA = await RESPONSE.json();
        loadingImg(false);
        render(DATA);
    }
    catch (error) {
        alert(error);
    }
})()

function loadingImg(isLoading) {
    if(isLoading === true) {
        loadingEl.style.display = "block";
    }
    else {
        loadingEl.style.display = "none";
    }
}

function render(products) {
    productsListEl.innerHTML = '';
    products.forEach(product => {
        const newProductLiEl = document.createElement("li");
        const productImgEl = document.createElement("img");
        productImgEl.className = "product-img";
        productImgEl.src = product.image;
        const productPriseEl = document.createElement("p");
        productPriseEl.innerHTML = "Price: $" + product.price;
        productPriseEl.className = "product-prise";
        const productDiscountEl = document.createElement("p");
        productDiscountEl.innerHTML = "Discount: " + product.rating.count;
        productDiscountEl.className = "product-discount";
        const productDescEl = document.createElement("p");
        productDescEl.innerHTML = "Desc: " + product.title;
        productDescEl.className = "product-desc";
        const productNameEl = document.createElement("p");
        productNameEl.innerHTML = "Category: " + product.category;
        const productDeleteEl = document.createElement("i");
        productDeleteEl.className = "fa-solid fa-trash";
        confirmDeleteEl.setAttribute("data-user-id", product.id);

        newProductLiEl.addEventListener('click', (e) => {
            if (e.target.matches("i")) {
                modalWrapperEl.classList.add("modal-wrapper--active");
                modalDeleteEl.addEventListener('click', (e) => {
                    if (e.target.classList.contains("modal-btn-cancel")) {
                        render(products);
                        modalWrapperEl.classList.remove("modal-wrapper--active");
                    }
                    else if (e.target.classList.contains("modal-btn-alright")) {
                        render(products);
                        modalWrapperEl.classList.remove("modal-wrapper--active");
                        fetch(BASE_URL + "/" + e.target.dataset.userId,
                            {
                                method: "DELETE"
                            }
                        )
                        .then(res => {
                            if(res.status === 200) {
                                alert("deleted successfully");
                            }
                        })

                    }
                })
            }
        })


        newProductLiEl.append(productImgEl, productPriseEl, productDiscountEl, productDescEl, productNameEl, productDeleteEl);
        productsListEl.appendChild(newProductLiEl);
    })
}
