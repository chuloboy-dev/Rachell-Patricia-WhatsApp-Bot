
BTW INI PAKE LENY BASE, THANKS TO HIM BCS I JADI BISA CREATE THIS PROJECT. BTW I TUJUANNYA BUAT LEARN ABOUT CODING. I UPLOAD DI HERE JUGA BUAT BACKUP SEKALIAN SHARE JUGA BUAT YANG SAMA SAMA MAU BELAJAR.
## 📂 **Struktur Folder**

    RACHELLBOT/
    │   ├── database/
    │   │   ├── image/             # Aset Gambar (Contoh: Rachell.jpeg)
    │   │   │   └── Rachell.jpeg
    │   │   ├── Menu/              # Template Teks Menu Bot
    │   │   │   └── menu.js
    │   │   ├── creator.json       # Daftar Nomor Owner/Creator
    │   │   └── premium.json       # Daftar Nomor Pengguna Premium
    │   ├── scrape/                # Kumpulan Modul Scraping (AI, Downloader, dll)
    │   │   └── Ai4Chat.js
    │   ├── index.js               # Koneksi Baileys & Manajemen Sesi
    │   ├── len.js                 # Global Message & Config Handler
    │   └── danss.js               # Main Command Handler (Switch Case)
    ├── Rachell.js                # Pusat Kendali & Konfigurasi Global
    ├── package.json               # Dependencies & Script Startup
    └── RachellSesi/                 # (Auto-Generated) Folder Sesi WhatsApp


## ⚙️ **Penjelasan Fungsi File Utama**

**2. WhatsApp/index.js (The Core Connection)**

File Ini Menangani Seluruh Alur Koneksi Ke Server WhatsApp. Menggunakan Multi-File Auth State Dan Mendukung Pairing Code.

**Manajemen Autentikasi :** Sesi Akan Disimpan Secara Otomatis Di Luar Folder WhatsApp Untuk Keamanan.

```JavaScript
const { state, saveCreds } = await useMultiFileAuthState(
  path.resolve(__dirname, "./RachellSesi")
)
```

**Logika Pairing Code :** Jika Fitur usePairingCode Aktif, Bot Akan Meminta Input Nomor WhatsApp Di Terminal Dan Menghasilkan Kode Unik.

```JavaScript
if (usePairingCode && !chell.authState.creds.registered) {
    const phoneNumber = await question("☘️ Masukan Nomor Yang Diawali Dengan 62 :\n")
    const code = await chell.requestPairingCode(phoneNumber.trim())
    console.log(`🎁 Pairing Code : ${code}`)
}
```

**3. WhatsApp/len.js (Global Manager)**

Mengatur Variabel Yang Bisa Diakses Di Seluruh File Tanpa Perlu Import Berulang Menggunakan globalThis.

```javascript
globalThis.prefix = ['#', '.', '!', '/']; // Multi Prefix
globalThis.noprefix = false; // Set True Untuk Menonaktifkan Prefix

globalThis.mess = {
    wait: '☕ *Sedang Diproses...*',
    admin: '⚠ *Fitur Ini Khusus Admin Grup!*',
    group: '⚠ *Fitur Ini Hanya Dapat Digunakan Di Dalam Grup!*',
    creator: '⚠ *Fitur Ini Hanya Untuk Owner Bot!*',
    error: '⚠ *Terjadi Kesalahan Pada Sistem*'
};
```

**4. danss.js (Feature Logic)**

Tempat Semua Fitur Bot Diletakkan Menggunakan Struktur switch case. File Ini Adalah Jantung Dari Interaksi Bot. Contoh Implementasi Kondisi :

```javascript
switch (command) {
    case "admin": {
        if (!isAdmin) return chell(globalThis.mess.admin) // Cek Status Admin
        chellreply("🎁 *Akses Diterima, Anda Adalah Admin*")
    }
    break

   case "private": {
       if (!IsPriv) return lenwyreply(globalThis.mess.private) // Cek Lokasi Chat (Private)
       chellreply("🎁 *Kamu Sedang Berada Di Dalam Private Chat*")
   }
   break

    case "group": {
        if (!isGroup) return lenwyreply(globalThis.mess.group) // Cek Lokasi Chat (Group)
        chellreply("🎁 *Bot Berhasil Merespon Di Dalam Grup*")
    }
    break

    case "menu": {
        await chell.sendMessage(replyJid, {
            image: MenuImage, // Diambil Dari globalThis di len.js
            caption: globalThis.lenwymenu,
            mentions: [sender]
        }, { quoted: len })
    }
    break
}
```
