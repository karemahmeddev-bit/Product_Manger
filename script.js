let productname = document.getElementById("product-name");
let productprice = document.getElementById("product-price");
let productquantity = document.getElementById("product-quantity");
let saveproduct = document.getElementById("save-product");
let message = document.getElementById("message");
let productlist = document.getElementById("product-list");

let products = [];
let editindex = null;

let savedProducts = localStorage.getItem("products");

if(savedProducts != null){
    products = JSON.parse(savedProducts);
}

function saveProducts(){
    localStorage.setItem("products", JSON.stringify(products));
}

// 
function displayProducts(){
    productlist.innerHTML = "";

    products.forEach(function(product,index){
        productlist.innerHTML += `
        <div class="product">
            <div>
                <h3>${product.name}</h3>
            </div>

            <div>
                <p>Price: ${product.price}</p>
            </div>

            <div>
                <p>Quantity: ${product.quantity}</p>
            </div>

            <div class="actions">
                <button class="edit" onclick="editProduct(${index})">Edit</button>
                <button class="delete" onclick="deleteProduct(${index})">Delete</button>
            </div>
        </div>
        `;
    });
}

saveproduct.addEventListener("click", function(){

    let product = {
        name: productname.value,
        price: productprice.value,
        quantity: productquantity.value
    };

    if(product.name === "" || product.price === "" || product.quantity === ""){
        message.textContent = "Please fill in all fields";
        return;
    }

    if(editindex === null){
        products.push(product);
        message.textContent = "Product added successfully";
    }else{
        products[editindex] = product;
        editindex = null;
        saveproduct.textContent = "Save Product";
        message.textContent = "Product updated successfully";
    }

    saveProducts();
    displayProducts();

    productname.value = "";
    productprice.value = "";
    productquantity.value = "";
});

function editProduct(index){
    editindex = index;

    let product = products[index];

    productname.value = product.name;
    productprice.value = product.price;
    productquantity.value = product.quantity;

    saveproduct.textContent = "Update Product";
}

function deleteProduct(index){
    products.splice(index, 1);

    saveProducts();
    displayProducts();

    message.textContent = "Product deleted successfully";
}

displayProducts();