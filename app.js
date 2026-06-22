const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Membuka akses folder public agar gambar lokal bisa tampil
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'rahasia-kelompok-toko-los',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// DATABASE PRODUK INTERNAL
const masterProduk = [
    {
        id: 'Sepatu-Outdoor-FiveFingers-Vibram',
        nama: 'Sepatu Outdoor FiveFingers Vibram Premium Grip Ergonomis',
        harga: 'Rp850.000',
        hargaAngka: 850000, // Tambahan untuk mempermudah hitungan total nanti
        gambar: '/sepatu.jpeg'
    },
    {
        id: 'Blouse-Tunik-Zalfa-Maroon',
        nama: 'Blouse Tunik Muslimah Zalfa Elegan Maroon Premium Kain Halus',
        harga: 'Rp175.000',
        hargaAngka: 175000,
        gambar: '/baju.jpeg'
    },
    {
        id: 'Tas-Ransel-Monogram-Luxury-Edition',
        nama: 'Tas Ransel Monogram Luxury Edition Leather Classic',
        harga: 'Rp2.400.000',
        hargaAngka: 2400000,
        gambar: '/tas.jpeg'
    }
];

// CONFIG TEMPLATE HEADER GLOBAL (Ditambah indikator jumlah keranjang)
app.locals.getHeader = (title, currentKeyword = '', cartCount = 0) => `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>${title} - Toko Los</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
        body { background-color: #f5f5f5; color: #333; }
        header { background-color: #ee4d2d; color: white; padding: 15px 50px; position: sticky; top: 0; z-index: 1000; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header-container { display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto; }
        .logo { font-size: 28px; font-weight: bold; text-decoration: none; color: white; }
        .search-form { flex: 1; margin: 0 30px; display: block; }
        .search-bar { display: flex; width: 100%; }
        .search-bar input { flex: 1; padding: 10px; border: none; border-radius: 4px 0 0 4px; outline: none; }
        .search-bar button { background: #f94f2f; border: none; padding: 0 20px; color: white; cursor: pointer; border-radius: 0 4px 4px 0; font-weight: bold; }
        .nav-links a { color: white; text-decoration: none; margin-left: 20px; font-size: 14px; font-weight: 500; }
        .cart-badge { background: white; color: #ee4d2d; padding: 2px 8px; border-radius: 20px; font-weight: bold; margin-left: 5px; }
        .main-container { max-width: 1200px; margin: 0 auto; padding: 20px 0; }
        .banner { background: linear-gradient(135deg, #ff7337, #ee4d2d); color: white; padding: 40px; border-radius: 4px; text-align: center; margin-bottom: 25px; }
        .banner h2 { font-size: 32px; margin-bottom: 10px; }
        .section-title { font-size: 18px; color: #757575; font-weight: 500; margin-bottom: 15px; text-transform: uppercase; }
        .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
        .product-card { background: white; border-radius: 4px; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s; display: flex; flex-direction: column; border: 1px solid rgba(0,0,0,0.05); }
        .product-card:hover { transform: translateY(-3px); box-shadow: 0 6px 15px rgba(0,0,0,0.15); border-color: #ee4d2d; }
        .product-img-wrapper { width: 100%; height: 280px; background: #fff; display: flex; align-items: center; justify-content: center; padding: 10px; overflow: hidden; }
        .product-img-wrapper img { max-width: 100%; max-height: 100%; object-fit: contain; }
        .product-info { padding: 15px; flex: 1; }
        .product-name { font-size: 14px; font-weight: bold; line-height: 20px; height: 40px; overflow: hidden; margin-bottom: 10px; text-decoration: none; color: #333; display: block;}
        .product-price { color: #ee4d2d; font-size: 16px; font-weight: bold; }
        .cart-form { display: flex; padding: 0 15px 15px 15px; gap: 10px; }
        .cart-form input[type="number"] { width: 60px; padding: 8px; border: 1px solid #ccc; border-radius: 4px; text-align: center; }
        .cart-form button { flex: 1; background: #ee4d2d; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; transition: 0.2s; }
        .cart-form button:hover { background: #d43f21; }
        .no-result { text-align: center; padding: 50px; background: white; border-radius: 4px; color: #888; width: 100%; grid-column: 1 / -1; }
        .btn-reset { display: inline-block; margin-top: 15px; background: #ee4d2d; color: white; text-decoration: none; padding: 8px 20px; border-radius: 4px; font-size: 14px; }
        footer { text-align: center; padding: 30px; margin-top: 50px; background: white; color: #888; border-top: 4px solid #ee4d2d; }
    </style>
</head>
<body>
    <header>
        <div class="header-container">
            <a href="/" class="logo">🛍️ Toko Los</a>
            <form action="/" method="GET" class="search-form">
                <div class="search-bar">
                    <input type="text" name="keyword" placeholder="Cari produk kelompok..." value="${currentKeyword}">
                    <button type="submit">Cari</button>
                </div>
            </form>
            <div class="nav-links">
                <a href="/auth">👤 Login</a>
                <a href="/cart">🛒 Keranjang <span class="cart-badge">${cartCount}</span></a>
                <a href="/orders">📦 Checkout</a>
            </div>
        </div>
    </header>
    <div class="main-container">
`;

app.locals.footerHTML = `
    </div>
    <footer>
        <p>© 2026 Toko Los - Kelompok Pemrograman Web.</p>
    </footer>
</body>
</html>
`;

// IMPORT SEMUA ROUTER ANAK
const authRoutes = require('./routes/authentication');
const productRoutes = require('./routes/produk');
const cartRoutes = require('./routes/keranjang');
const orderRoutes = require('./routes/checkout'); // Pastikan nama file di foldermu 'checkout.js' atau 'chekot.js'

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);

// TAMPILAN DASHBOARD
app.get('/', (req, res) => {
    const kataKunci = req.query.keyword || '';
    
    // Menghitung total barang di keranjang dari Session
    let totalBarang = 0;
    if (req.session.cart) {
        req.session.cart.forEach(item => { totalBarang += item.jumlah; });
    }
    
    const produkHasilFilter = masterProduk.filter(produk => 
        produk.nama.toLowerCase().includes(kataKunci.toLowerCase())
    );

    let html = app.locals.getHeader('Beranda Utama', kataKunci, totalBarang);
    
    html += `
        <div class="banner">
            <h2>Promo Besar-Besaran Toko Los! 🎉</h2>
            <p>Fitur Keranjang Dinamis (Bisa lebih dari 1 item) Aktif!</p>
        </div>
    `;

    if (kataKunci) html += `<h3 class="section-title">Hasil Pencarian: "${kataKunci}"</h3>`;
    else html += `<h3 class="section-title">REKOMENDASI KATALOG BARU HARI INI</h3>`;

    html += `<div class="product-grid">`;

    if (produkHasilFilter.length > 0) {
        produkHasilFilter.forEach(produk => {
            html += `
                <div class="product-card">
                    <a href="/products/detail/${produk.id}" style="text-decoration:none; flex:1;">
                        <div class="product-img-wrapper"><img src="${produk.gambar}"></div>
                        <div class="product-info">
                            <span class="product-name">${produk.nama}</span>
                            <div class="product-price">${produk.harga}</div>
                        </div>
                    </a>
                    <form action="/cart/add" method="POST" class="cart-form">
                        <input type="hidden" name="id" value="${produk.id}">
                        <input type="hidden" name="nama" value="${produk.nama}">
                        <input type="hidden" name="harga" value="${produk.harga}">
                        <input type="hidden" name="hargaAngka" value="${produk.hargaAngka}">
                        <input type="number" name="jumlah" value="1" min="1" required>
                        <button type="submit">+ Keranjang</button>
                    </form>
                </div>
            `;
        });
    } else {
        html += `<div class="no-result"><p>Produk "${kataKunci}" tidak ditemukan.</p><a href="/" class="btn-reset">Lihat Semua</a></div>`;
    }

    html += `</div>`;
    html += app.locals.footerHTML;
    res.send(html);
});

app.listen(PORT, () => {
    console.log(`Server Toko Los aktif berjalan di http://localhost:${PORT}`);
});