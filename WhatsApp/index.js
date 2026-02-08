/* Made By chell
  Base : chell
  WhatsApp : wa.me/6283829814737
  Telegram : t.me/ichell
  Youtube : @chell

  Channel : https://whatsapp.com/channel/0029VaGdzBSGZNCmoTgN2K0u

  Copy Code?, Recode?, Rename?, Reupload?, Reseller? Taruh Credit Ya :D

  Mohon Untuk Tidak Menghapus Watermark Di Dalam Kode Ini

*/

// Import Module
import { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion,  downloadContentFromMessage, getContentType } from "@whiskeysockets/baileys"
import pino from "pino"
import chalk from "chalk"
import readline from "readline"
import path from "path"
import { fileURLToPath } from "url"
import os from "os"
import fs from "fs";


// Path ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Pairing Mode
const usePairingCode = true

// Fungsi Input Terminal
async function question(prompt) {
  process.stdout.write(prompt)
  const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise((resolve) => {
    r1.question("", (ans) => {
      r1.close()
      resolve(ans)
    })
  })
}

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState(
    path.resolve(__dirname, "../RachellSesi")
  )

  const { version, isLatest } = await fetchLatestBaileysVersion()
  console.log(`chell Using WA v${version.join(".")}, isLatest: ${isLatest}`)

  const chell = makeWASocket({
    logger: pino({ level: "silent" }),
    printQRInTerminal: !usePairingCode,
    auth: state,
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    version,
    syncFullHistory: true,
    generateHighQualityLinkPreview: true,
    getMessage: async (key) => {
      if (store) {
        const msg = await store.loadMessage(key.remoteJid, key.id)
        return msg?.message || undefined
      }
      return {}
    }
  })

  // Handle Pairing
  if (usePairingCode && !chell.authState.creds.registered) {
    try {
      const phoneNumber = await question("☘️ Masukan Nomor Yang Diawali Dengan 62 :\n")
      const code = await chell.requestPairingCode(phoneNumber.trim())
      console.log(`🎁 Pairing Code : ${code}`)
    } catch (err) {
      console.error("Failed to get pairing code:", err)
    }
  }

  chell.ev.on("creds.update", saveCreds)

  chell.ev.on("connection.update", (update) => {
    const { connection } = update
    if (connection === "close") {
      console.log(chalk.red("❌  Koneksi Terputus, Mencoba Menyambung Ulang"))
      
      // Sambungkan Ulang
      connectToWhatsApp()
      
    } else if (connection === "open") {
      console.log(chalk.green("✔  Bot Berhasil Terhubung Ke WhatsApp"))
    }
  })

// Console Log
chell.ev.on("messages.upsert", async (m) => {
  const msg = m.messages[0]
  if (!msg.message) return

  const sender = msg.key.remoteJid
  const pushname = msg.pushName || "chell"

  // Deteksi Tipe Pesan
  const messageType = getContentType(msg.message)
  let body = ""
  let mediaType = null

  switch (messageType) {
    case "conversation":
      body = msg.message.conversation
      break
    case "extendedTextMessage":
      body = msg.message.extendedTextMessage.text
      break
    case "imageMessage":
      mediaType = "Image"
      body = msg.message.imageMessage.caption || ""
      break
    case "videoMessage":
      mediaType = "Video"
      body = msg.message.videoMessage.caption || ""
      break
    case "stickerMessage":
      mediaType = "Sticker"
      break
    case "audioMessage":
      mediaType = "Audio"
      break
    case "documentMessage":
      mediaType = "Document"
      break
    default:
      body = ""
  }

  // Filter Pesan Kosong
  if (!body.trim() && !mediaType) return

  // Log Pesan
  const listColor = ["red", "green", "yellow", "magenta", "cyan", "white", "blue"]
  const randomColor = listColor[Math.floor(Math.random() * listColor.length)]
  const logTag = mediaType ? `[${mediaType}]` : ""

  console.log(
    chalk.yellow.bold("Credit : chell"),
    chalk.green.bold("[ WhatsApp]"),
    chalk[randomColor](pushname),
    chalk[randomColor](" : "),
    chalk.magenta.bold(`${logTag}`),
    chalk.white(` ${body}`)
  )

  // Import Handler
  const { default: handler } = await import("./danss.js")
  handler(chell, m, { body, mediaType, sender, pushname })
})
}

// Default export agar bisa dipanggil dari chellSet.js
export default connectToWhatsApp