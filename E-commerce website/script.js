const mens_products = [
  {
    id: 1,
    image: "./assets/products/f1.jpg",
    title: "Mens Clothing",
    text: "Baggy Shirt - H&M",
    price: "$120.02",
  },
  {
    id: 2,
    image: "./assets/products/f2.jpg",
    title: "Mens Clothing",
    text: "Baggy Shirt - Zara",
    price: "$129.99",
  },
  {
    id: 3,
    image: "./assets/products/f3.jpg",
    title: "Mens Clothing",
    text: "Baggy Shirt - Nike",
    price: "$148.00",
  },
  {
    id: 4,
    image: "./assets/products/f4.jpg",
    title: "Mens Clothing",
    text: "Baggy Shirt - Ray-Ban",
    price: "$150.00",
  },
  {
    id: 5,
    image: "./assets/products/f5.jpg",
    title: "Mens Clothing",
    text: "Baggy Shirt - Alen sholey",
    price: "$145.00",
  },
  {
    id: 6,
    image: "./assets/products/f6.jpg",
    title: "Mens Clothing",
    text: "Baggy Shirt - Blue barry",
    price: "$135.99",
  },
];

const womens_products = [
  {
    id: 7,
    image: "./assets/products/f7.jpg",
    title: "Womens Clothing",
    text: "Plaze Phant - Zara",
    price: "$99.92",
  },
  {
    id: 8,
    image: "./assets/products/f8.jpg",
    title: "Womens Clothing",
    text: "Baggy Top - H&M",
    price: "$119.89",
  },
  {
    id: 9,
    image: "./assets/products/n2.jpg",
    title: "Mens Clothing",
    text: "Formal Shirt - Otto",
    price: "$127.62",
  },
  {
    id: 10,
    image: "./assets/products/n4.jpg",
    title: "Mens Clothing",
    text: "Printed Shirt - Burberry",
    price: "$117.82",
  },
  {
    id: 11,
    image: "./assets/products/n5.jpg",
    title: "Mens Clothing",
    text: "Formal Shirt - Gucchi",
    price: "$159.42",
  },
  {
    id: 12,
    image: "./assets/products/n6.jpg",
    title: "Mens Clothing",
    text: "Cotton Shorts - H&M",
    price: "$67.38",
  },
];

const all_products = [...mens_products, ...womens_products];

function loadProducts(products, productRow) {
  products.forEach((product) => {
    const cardHTML = `
    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
      <div class="card m-auto" style="width: 18rem">
        <img src="${product.image}" class="card-img-top" alt="${product.title}" />
        <div class="card-body">
          <h5 class="card-title text-start">${product.title}</h5>
          <p class="card-text text-start">${product.text}</p>
          <p class="card-text text-start">${product.price}</p>
          <button href="#" class="cart" id="cart" onclick="viewProduct(${product.id})">View Product</button>
        </div>
      </div>
    </div>
  `;
    productRow.innerHTML += cardHTML;
  });
}

function viewProduct(productId) {
  const product = all_products.find((prod) => prod.id === productId);
  localStorage.setItem("selectedProduct", JSON.stringify(product));
  window.location.href = "product.html";
}
const brandings = [
  "./assets/clients/logo1.png",
  "./assets/clients/logo2.png",
  "./assets/clients/logo3.png",
  "./assets/clients/logo4.png",
  "./assets/clients/logo5.png",
  "./assets/clients/logo6.png",
];
const fashionBlogs = [
  {
    writer: "Liam Foster",
    date: "September 28, 2024",
    image: "./assets/blog1.jpg",
    caption: "Discover your unique look, every day.",
  },
  {
    writer: "Olivia Bennett",
    date: "October 1, 2024",
    image: "./assets/blog2.jpg",
    caption: "Effortless elegance for every fashion lover.",
  },
  {
    writer: "Mason Clark",
    date: "September 25, 2024",
    image: "./assets/blog3.jpg",
    caption: "Chic outfits that redefine your style.",
  },
  {
    writer: "Ema Wilson",
    date: "September 30, 2024",
    image: "./assets/blog4.jpg",
    caption: "Elevate your wardrobe with timeless pieces.",
  },
  {
    writer: "Noah Gray",
    date: "October 3, 2024",
    image: "./assets/blog5.jpg",
    caption: "Step into confidence with statement fashion.",
  },
  {
    writer: "Ava Morgan",
    date: "October 2, 2024",
    image: "./assets/blog6.jpg",
    caption: "Curated trends for the fashion-forward individual.",
  },
];
function LoadBrandings(Brandings, brandingsrow) {
  Brandings.forEach((brand) => {
    const brandcontent = `
    <div
            class="col-xl-2 col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center align-items-center"
          >
            <div class="brand" style="background: url(${brand});   background-position: center;
  background-size: cover;"></div>
          </div>
          `;
    brandingsrow.innerHTML += brandcontent;
  });
}

function loadBlogs(blogs, blogsrow) {
  blogs.forEach((blog) => {
    const blogContent = `
              <div class="col-xl-3 col-lg-4 col-md-6 d-flex justify-content-center">
            <div class="blog p-3">
              <img src="${blog.image}" alt="" class="img-fluid pb-3" />
              <div>
                <p>${blog.writer} : </p>
                <p>${blog.date}</p>
              </div>
              <h1>${blog.caption}</h1>
            </div>
          </div>
    `;
    blogsrow.innerHTML += blogContent;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const mens_products_row = document.getElementById("product-row-men");
  loadProducts(mens_products, mens_products_row);
  const womens_products_row = document.getElementById("product-row-women");
  loadProducts(womens_products, womens_products_row);
  const branding_row = document.getElementById("Brandings");
  LoadBrandings(brandings, branding_row);
  const blogs_row = document.getElementById("Blog-row");
  loadBlogs(fashionBlogs, blogs_row);
});
