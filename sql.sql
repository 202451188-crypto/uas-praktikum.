-- ====================================================================
-- 1. PEMBUATAN DATABASE & TABEL (DDL)
-- ====================================================================

-- Membuat Database Toko Los
CREATE DATABASE IF NOT EXISTS toko_los;
USE toko_los;

-- Tabel User (Untuk keperluan fitur Login di Header)
CREATE TABLE IF NOT EXISTS users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Produk (Untuk menampung data katalog produk)
CREATE TABLE IF NOT EXISTS produk (
    id_produk INT AUTO_INCREMENT PRIMARY KEY,
    nama_produk VARCHAR(255) NOT NULL,
    harga INT NOT NULL,
    gambar_url VARCHAR(255),
    kategori VARCHAR(100),
    stok INT DEFAULT 10
);

-- Tabel Keranjang (Untuk fitur "+ Keranjang" & "Keranjang Dinamis")
CREATE TABLE IF NOT EXISTS keranjang (
    id_keranjang INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_produk INT NOT NULL,
    jumlah INT NOT NULL DEFAULT 1,
    ditambahkan_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_produk) REFERENCES produk(id_produk) ON DELETE CASCADE,
    -- Memastikan kombinasi user dan produk unik agar bisa menggunakan ON DUPLICATE KEY UPDATE
    UNIQUE KEY user_produk (id_user, id_produk) 
);


-- ====================================================================
-- 2. PENGISIAN DATA AWAL / SAMPLE DATA (DML)
-- ====================================================================

-- Memasukkan 1 Data User Contoh
INSERT INTO users (username, email, password_hash) VALUES 
('budi_los', 'budi@tokolos.com', 'hashed_password_123');

-- Memasukkan 3 Data Produk Sesuai Gambar Katalog Toko Los
INSERT INTO produk (nama_produk, harga, gambar_url, kategori, stok) VALUES
(
    'Sepatu Outdoor FiveFingers Vibram Premium Grip Ergonomis', 
    850000, 
    'images/sepatu_fivefingers.jpg',
    'Sepatu',
    15
),
(
    'Blouse Tunik Muslimah Zalfa Elegan Maroon Premium Kain Halus', 
    175000, 
    'images/blouse_tunik_maroon.jpg',
    'Pakaian Wanita',
    20
),
(
    'Tas Ransel Monogram Luxury Edition Leather Classic', 
    2400000, 
    'images/tas_ransel_luxury.jpg',
    'Tas',
    5
);


-- ====================================================================
-- 3. QUERY SIMULASI OPERASIONAL APLIKASI (DML / SELECT)
-- ====================================================================

-- A. Menampilkan katalog produk di halaman depan website
SELECT id_produk, nama_produk, harga, gambar_url FROM produk;

-- B. Simulasi User (ID: 1) klik "+ Keranjang" untuk produk Sepatu (ID: 1) sebanyak 1 pcs
-- Jika diklik lagi, otomatis jumlahnya bertambah (Fitur Keranjang Dinamis)
INSERT INTO keranjang (id_user, id_produk, jumlah) 
VALUES (1, 1, 1)
ON DUPLICATE KEY UPDATE jumlah = jumlah + 1;

-- C. Mengambil total kuantitas barang untuk ditampilkan di angka lingkaran merah (Header)
SELECT SUM(jumlah) AS total_barang_keranjang FROM keranjang WHERE id_user = 1;

-- D. Menampilkan daftar belanjaan di dalam keranjang user saat akan Checkout
SELECT 
    k.id_keranjang,
    p.nama_produk,
    p.harga,
    k.jumlah,
    (p.harga * k.jumlah) AS subtotal
FROM keranjang k
JOIN produk p ON k.id_produk = p.id_produk
WHERE k.id_user = 1;