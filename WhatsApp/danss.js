/*  

  Made By chell
  Base : chell
  WhatsApp : wa.me/6283829814737
  Telegram : t.me/ichell
  Youtube : @chell

  Channel : https://whatsapp.com/channel/0029VaGdzBSGZNCmoTgN2K0u

  Copy Code?, Recode?, Rename?, Reupload?, Reseller? Taruh Credit Ya :D

  Mohon Untuk Tidak Menghapus Watermark Di Dalam Kode Ini

*/

// Import Module
import "./len.js"
import "./database/Menu/menu.js"

import fs from "fs"
import axios from "axios";
import { downloadContentFromMessage, jidNormalizedUser, getContentType } from "@whiskeysockets/baileys"
import path from 'path'

// Scrape
import Ai4Chat from "./scrape/Ai4Chat.js"

// Track Messages
const processedMessages = new Set()
const groupMetadataCache = new Map();

// Export Handler
export default async (chell, m, meta) => {
    const { body, mediaType, sender, pushname } = meta
    const msg = m.messages[0]
    if (!msg.message) return

    // Jangan Balas Pesan Sendiri (Bot)
    if (msg.key.fromMe) return

    // Anti Double
    if (processedMessages.has(msg.key.id)) return
    processedMessages.add(msg.key.id)
    setTimeout(() => processedMessages.delete(msg.key.id), 30000)

    // Default Quoted chell
    const pplu = fs.readFileSync(globalThis.MenuImage) // Ganti Sesuai Keinginan
    const len = {
        key: {
            participant: `0@s.whatsapp.net`,
            ...(msg.chat ? { remoteJid: `status@broadcast` } : {})
        },
        message: {
            contactMessage: {
                displayName: `${pushname}`,
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;Rachell,;;;\nFN: Rachell V2.2\nitem1.TEL;waid=${sender.split("@")[0]}:+${sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
                jpegThumbnail: pplu,
                thumbnail: pplu,
                sendEphemeral: true
            }
        }
    }

// Multi Prefix + Tanpa Prefix
let usedPrefix = null
    for (const pre of globalThis.prefix) {
        if (body.startsWith(pre)) {
            usedPrefix = pre
            break
        }
    }
    if (!usedPrefix && !globalThis.noprefix) return

    const args = usedPrefix
        ? body.slice(usedPrefix.length).trim().split(" ")
        : body.trim().split(" ")

    const command = args.shift().toLowerCase()
    const q = args.join(" ")

    // Custom Reply
    const chellreply = (teks) => chell.sendMessage(sender, { text: teks }, { quoted: len })

    // Gambar Menu
    const MenuImage = fs.readFileSync(globalThis.MenuImage)

    // Deteksi Grup & Admin
    const isGroup = sender.endsWith("@g.us")
    let isAdmin = false
    let isBotAdmin = false

    if (isGroup) {
      let metadata = groupMetadataCache.get(sender);
      if (!metadata) {
        try {
          metadata = await chell.groupMetadata(sender);
          groupMetadataCache.set(sender, metadata);
        } catch (e) {
          console.error("Gagal mengambil metadata grup:", e);
        }
      }

      if (metadata) {
        const participants = metadata.participants;
        
        const userParticipant = participants.find(p => p.id === msg.key.participant);
        if (userParticipant) {
          isAdmin = userParticipant.admin === 'admin' || userParticipant.admin === 'superadmin';
        }

        const botJid = jidNormalizedUser(chell.user.id);
        const botParticipant = participants.find(p => p.id === botJid);

        if (botParticipant) {
          isBotAdmin = botParticipant.admin === 'admin' || botParticipant.admin === 'superadmin';
        } else {
          try {
            await chell.groupUpdateSubject(sender, metadata.subject);
            isBotAdmin = true;
          } catch (e) {
            isBotAdmin = false;
          }
        }
      }
    }

    // Premium
    const premiumPath = path.join(process.cwd(), 'WhatsApp', 'database', 'premium.json')
    const premiumUsers = JSON.parse(fs.readFileSync(premiumPath, 'utf8') || '[]')
    const isPremium = premiumUsers.includes(sender)

    const CreatorPath = path.join(process.cwd(), 'WhatsApp', 'database', 'creator.json')
    const isCreatorArray = JSON.parse(fs.readFileSync(CreatorPath, 'utf8') || '[]')
    const ischell = isCreatorArray.includes(sender) 
    // Command Yang Diperbolehkan User Free
    const allowedPrivateCommands = ['menu', 'aimenu', 'downmenu', 'downloadmenu']

    if (!isGroup && !isPremium && !ischell && !allowedPrivateCommands.includes(command)) {
        return chellreply("⚠️ *Kamu Bukan User Premium!*\n\nKamu Hanya Bisa Menggunakan Fitur *Menu* Di Private Chat");
    }

switch (command) {

case "menu": {
  await chell.sendMessage(sender, {
    image: MenuImage,
    caption: globalThis.Rachellmenu,
    mentions: [sender]
  }, { quoted: len })
}
break 

case "admin": {
    if (!isAdmin) return chellreply(globalThis.mess.admin)
    chellreply("🎁 *Kamu Adalah Admin*")
}
break

case "group": {
    if (!isGroup) return chellreply(globalThis.mess.group)
    chellreply("🎁 *Kamu Sedang Berada Di Dalam Grup*")
}
break

case "private": {
    if (!IsPriv) return chellreply(globalThis.mess.private)
    chellreply("🎁 *Kamu Sedang Berada Di Dalam Private Chat*")
}
break

case "panel": {
chellreply(`📑 *Halo Ini List Harga panelnya Ya*

*[+] Ram 2Gb*
*[+] CPU 120%*
*[+] Disk 5Gb*
*[+] Rp10.000/Bulan*

*[+] Ram 4Gb*
*[+] CPU 150%*
*[+] Disk 10Gb*
*[+] Rp15.000/Bulan*

*[+] Ram 6Gb*
*[+] CPU 200%*
*[+] Disk 15Gb*
*[+] Rp25.000/Bulan*

*[+] Ram 8Gb*
*[+] CPU 250%*
*[+] Disk 20Gb*
*[+] Rp35.000/Bulan*

*[+] Ram 10Gb*
*[+] CPU 300%*
*[+] Disk 25Gb*
*[+] Rp50.000/Bulan*

📣 *Benefit :*
*[+] Server Pribadi* 
*[+] Bergaransi 30 Hari*  
*[+] Script Kalian Terjamin Aman*  

☘️ *Mau Beli? Bisa Chat :*
🎁 *Chat :* wa.me/6283829814737
🎁 *Langsung Ke Tele :* t.me/ichell`)
}
break

// AI Menu =========================

case "aimenu": {
  chellreply(globalThis.aimenu)
}
break

case "ai": {
    if (!q) return chellreply("☘️ *Contoh:* Ai Apa itu JavaScript?")
    chellreply(globalThis.mess.wait)
    try {
        const lenai = await Ai4Chat(q)
        await chellreply(`*chell AI*\n\n${lenai}`)
    } catch (error) {
        console.error("Error:", error)
        chellreply(globalThis.mess.error)
    }
}
break

// Download Menu =========================

case "downmenu":
case "downloadmenu": {
  chellreply(globalThis.downmenu)
}
break

case "tt": 
case "ttdl":
case "tiktok": {
    if (!q) return chellreply("⚠ *Mana Link Tiktoknya?*");
    if (!q.includes("tiktok.com")) return chellreply("❌ *Link yang Anda berikan bukan link TikTok.*");

    chellreply(globalThis.mess.wait);
    
    try {
        const encodedUrl = encodeURIComponent(q.trim());
        const apiUrl = `https://api.fromscratch.web.id/v1/api/down/tiktok?url=${encodedUrl}`;

        const { data: response } = await axios.get(apiUrl);
        
        if (response.status !== 200 || !response.data?.no_watermark) {
            console.error("API TikTok Error Response:", response);
            return chellreply(`❌ *Gagal mengunduh video TikTok:*\nStatus: ${response.message || 'Data tidak ditemukan'}`);
        }

        const videoUrl = response.data.no_watermark;
        
        await chell.sendMessage(sender, {
            video: { url: videoUrl },
            caption: `*🎁 chell Tiktok Downloader*\n*[+] Powered by api.fromscratch.web.id*`
        }, { quoted: len }); //
        
    } catch (error) {
        console.error("Error TikTok DL via API:", error.message);
        chellreply(`❌ *Gagal mengunduh video TikTok. Coba Link Lain.*\n*Detail Error:* ${error.message}`);
    }
}
break

        default: { // Reply Pesan Tidak Dikenal
           // chellreply(globalThis.mess.default) 
        }
    }
}

