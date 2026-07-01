# 🛍️ Toko Los

Aplikasi web e-commerce sederhana bertema marketplace (mirip Shopee), dibangun menggunakan **Node.js** dan **Express**. Menyediakan alur belanja dasar mulai dari katalog produk, pencarian, keranjang belanja dinamis, hingga proses checkout dengan struk pesanan.

## ✨ Fitur

- **Katalog Produk** — Menampilkan daftar produk lengkap dengan gambar, nama, dan harga.
- **Pencarian Produk** — Filter produk berdasarkan kata kunci dari nama produk.
- **Halaman Detail Produk** — Menampilkan informasi lengkap tiap produk.
- **Login Sederhana** — Halaman autentikasi dasar (belum terhubung ke database).
- **Keranjang Belanja Dinamis** — Tambah produk ke keranjang, ubah jumlah barang secara real-time, dan hapus otomatis saat jumlah menjadi 0. Data disimpan menggunakan `express-session`.
- **Checkout & Struk Pesanan** — Form alamat pengiriman, pilihan metode pembayaran (Transfer Bank, E-Wallet, COD), kalkulasi total otomatis, dan struk konfirmasi transaksi.
- **Indikator Keranjang** — Badge jumlah barang di keranjang pada header, muncul di semua halaman.

## 🛠️ Tech Stack

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/) `v5`
- [express-session](https://www.npmjs.com/package/express-session) — penyimpanan state keranjang belanja
- HTML/CSS inline (server-side rendered, tanpa template engine/framework frontend)

## 📁 Struktur Proyek

```
Toko/
├── app.js                  # Entry point aplikasi (routing utama, header/footer global)
├── public/                 # Asset statis (gambar produk)
│   ├── baju.jpeg
│   ├── sepatu.jpeg
│   └── tas.jpeg
├── routes/
│   ├── authentication      # Route login (/auth)
│   ├── produk               # Route detail produk (/products)
│   ├── keranjang             # Route keranjang & checkout versi sesi dinamis (/cart)
│   └── checkout              # Route keranjang & checkout versi alternatif (/orders)
├── sql.sql                  # Skema database referensi (users, produk, keranjang)
├── package.json
└── package-lock.json
```

> **Catatan:** Saat ini seluruh data produk & keranjang disimpan **in-memory / di session**, belum terhubung ke database MySQL. File `sql.sql` berisi rancangan skema database (tabel `users`, `produk`, `keranjang`) yang bisa dijadikan referensi untuk pengembangan lanjutan (integrasi database).

## 🚀 Instalasi & Menjalankan Proyek

### Prasyarat
- [Node.js](https://nodejs.org/) (disarankan versi 18 ke atas)
- npm (terpasang otomatis bersama Node.js)

### Langkah-langkah

1. **Clone repository**
   ```bash
   git clone https://github.com/username/toko-los.git
   cd toko-los
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Jalankan aplikasi**
   ```bash
   node app.js
   ```

4. **Buka di browser**
   ```
   http://localhost:3000
   ```

## 🗺️ Daftar Route

| Method | Endpoint                     | Deskripsi                                  |
|--------|-------------------------------|---------------------------------------------|
| GET    | `/`                            | Halaman utama & pencarian produk           |
| GET    | `/products/detail/:nama`       | Detail produk                              |
| GET    | `/auth`                        | Halaman login                              |
| POST   | `/auth/login`                  | Proses login (dummy)                       |
| POST   | `/cart/add`                    | Tambah produk ke keranjang                 |
| GET    | `/cart`                        | Lihat keranjang & form checkout            |
| POST   | `/cart/proses-checkout`        | Proses checkout & tampilkan struk          |
| GET    | `/cart/reset`                  | Kosongkan keranjang                        |

## 📌 Rencana Pengembangan

- [ ] Integrasi database MySQL sesuai skema di `sql.sql`
- [ ] Autentikasi login yang sesungguhnya (hashing password, validasi session)
- [ ] Manajemen produk dinamis (CRUD admin)
- [ ] Riwayat pesanan per user

## 👥 Kontributor

Proyek ini dibuat untuk keperluan tugas kelompok mata kuliah Pemrograman Web.
Nobita Berliana 202451103 bertugas membuat tampilan login
Benedicta Finalia Chrismanto 202451090 bertugas untuk membuat tampilan catalog dan cari
Salwa Salsabilla Khasanah 202451088 bertugas untuk membuat tampilan keranjang 
Rizqika Ale Sandro  202451188 bertugas untuk membuat bagian checkout dan juga mendeploy

## 📄 Lisensi

ISC
