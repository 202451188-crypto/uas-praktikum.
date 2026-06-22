app.locals.getHeader = (title, currentKeyword = '') => `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <style>
        /* Tambahkan ini agar form & tombol berada di lapisan teratas */
        .search-form { 
            flex: 1; 
            margin: 0 30px; 
            display: flex; 
            position: relative; 
            z-index: 9999; 
        }
        .search-bar { 
            display: flex; 
            width: 100%; 
        }
        .search-bar input { 
            flex: 1; 
            padding: 10px; 
            border: none; 
            border-radius: 4px 0 0 4px; 
            outline: none; 
        }
        .search-bar button { 
            background: #f94f2f; 
            border: none; 
            padding: 0 20px; 
            color: white; 
            cursor: pointer; 
            border-radius: 0 4px 4px 0; 
            font-weight: bold; 
            pointer-events: auto; /* Memastikan tombol bisa diklik */
        }
    </style>
</head>
<body>
    <header>
        <div class="header-container">
            <a href="/" class="logo">🛍️ Toko Los</a>
            
            <form action="/" method="GET" class="search-form">
                <div class="search-bar">
                    <input type="text" name="keyword" placeholder="Cari produk..." value="${currentKeyword}" required>
                    <button type="submit">Cari</button>
                </div>
            </form>
            
            <div class="nav-links">
                <a href="/auth">Login</a>
                <a href="/cart">Keranjang</a>
            </div>
        </div>
    </header>
`;