        // Lista de productos por categoría
        const productCategories = {
            "Dulces Mexicanos": [
                { id: 1, name: "Mazapán", price: 2.50, img: "https://dulcesdelarosa.com.mx/wp-content/uploads/dulces-de-la-rosa_mazapan_mazapan-12-28g.png" },
                { id: 2, name: "Paleta de Tamarindo", price: 1.75, img: "https://dcdn.mitiendanube.com/stores/003/169/707/products/31830f96-d69f-4390-bc99-fc7c56f8e8ee-2384b4311350d35e6f17148844318459-1024-1024.webp" },
            ],
            "Chocolates": [
                { id: 3, name: "Chocolate Amargo", price: 3.50, img: "https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00003746604269L.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF" },
                { id: 4, name: "Trufa de Chocolate", price: 4.00, img: "https://delantaldealces.com/wp-content/uploads/2016/04/trufas-veganas.jpg" },
            ],
            "Gomitas": [
                { id: 5, name: "Gomitas Ácidas", price: 2.25, img: "https://acdn.mitiendanube.com/stores/001/132/452/products/tubitos-fruti-b3bc3350a684429cab16970436087516-1024-1024.webp" },
                { id: 6, name: "Gomitas de Osito", price: 1.50, img: "https://www.kram.mx/wp-content/uploads/2023/11/30794.png" },
            ]
        };

        let cart = [];

        // Función para mostrar productos por categoría
        function displayCategories() {
            const productCategoriesEl = document.getElementById("productCategories");
            productCategoriesEl.innerHTML = "";

            for (const category in productCategories) {
                const categoryHTML = `
                    <div class="category-title">${category}</div>
                    <div class="row">
                        ${productCategories[category].map(product => `
                            <div class="col-6 col-sm-4 col-md-3 mb-4">
                                <div class="product-item text-center h-100">
                                    <img src="${product.img}" alt="${product.name}" class="img-fluid" />
                                    <h4>${product.name}</h4>
                                    <p>$${product.price.toFixed(2)}</p>
                                    <button class="btn btn-outline-primary" onclick="addToCart(${product.id}, '${category}')">Añadir al Carrito</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
                productCategoriesEl.innerHTML += categoryHTML;
            }
        }

        // Función para agregar productos al carrito
        function addToCart(id, category) {
            const product = productCategories[category].find(p => p.id === id);
            const existingProduct = cart.find(item => item.id === id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            updateCart();
            alert(`Añadido ${product.name} al carrito`);
        }

        // Función para actualizar el carrito
        function updateCart() {
            const cartItems = document.getElementById("cartItems");
            const totalPriceEl = document.getElementById("totalPrice");
            cartItems.innerHTML = "";
            let total = 0;
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                cartItems.innerHTML += `
                    <div class="cart-item d-flex justify-content-between align-items-center">
                        <span>${item.name} (x${item.quantity})</span>
                        <span>$${itemTotal.toFixed(2)}</span>
                        <span class="btn-remove" onclick="removeFromCart(${item.id})"><i class="bi bi-trash"></i></span>
                    </div>
                `;
            });
            totalPriceEl.textContent = total.toFixed(2);
        }

        // Función para remover productos del carrito
        function removeFromCart(id) {
            cart = cart.filter(item => item.id !== id);
            updateCart();
        }

        // Función para activar/desactivar el modo oscuro
        function toggleDarkMode() {
            document.body.classList.toggle("dark-mode");
        }

        // Función para finalizar compra
        function checkout() {
            const checkoutModal = new bootstrap.Modal(document.getElementById("checkoutModal"));
            checkoutModal.show();
            cart = [];
            updateCart();
        }

        // Inicialización de la página
        document.addEventListener("DOMContentLoaded", displayCategories);