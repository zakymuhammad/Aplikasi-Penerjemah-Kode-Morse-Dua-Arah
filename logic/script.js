// --- 1. MEMBUAT HASH TABLE (KAMUS) ---

const mapTeksKeMorse = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..',
    '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
    '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
    ' ': '/' // Spasi antar kata
};

// Membuat map kebalikan (Morse ke Teks)
// (Anda boleh pakai ini atau versi otomatis, keduanya benar)
const mapMorseKeTeks = {
    '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
    '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
    '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
    '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
    '-.--': 'Y', '--..': 'Z',
    '.----': '1', '..---': '2', '...--': '3', '....-': '4', '.....': '5',
    '-....': '6', '--...': '7', '---..': '8', '----.': '9', '-----': '0',
    '/': ' '
};

// --- 2. MENGAMBIL ELEMEN HTML ---
const tombolSwap = document.getElementById("tombol-swap");
const containerTeks = document.getElementById("container-teks");
const containerMorse = document.getElementById("container-morse");
const labelTeks = document.getElementById("label-teks");
const labelMorse = document.getElementById("label-morse");
const inputTeks = document.getElementById("inputTeks");
const inputMorse = document.getElementById("inputMorse");

// --- 3. LOGIKA UTAMA APLIKASI ---

// Variabel untuk melacak status mode
let modeAwalTeksKeMorse = true;

function updateMode() {
    
    if (modeAwalTeksKeMorse) {
        // --- MODE: TEKS KE MORSE ---
        labelTeks.innerText = "Teks";
        labelMorse.innerText = "Morse";
        
        // 👇 TAMBAHKAN 2 BARIS INI
        inputTeks.placeholder = "Ketik teks di sini...";
        inputMorse.placeholder = "Hasil akan muncul di sini...";
        
        inputTeks.readOnly = false;
        inputMorse.readOnly = true;
        
        containerTeks.classList.add("aktif");
        containerTeks.classList.remove("inaktif");
        containerMorse.classList.add("inaktif");
        containerMorse.classList.remove("aktif");
        
        inputTeks.focus();
        
    } else {
        // --- MODE: MORSE KE TEKS ---
        labelTeks.innerText = "Teks";
        labelMorse.innerText = "Morse";
        
        // 👇 TAMBAHKAN 2 BARIS INI
        inputTeks.placeholder = "Hasil akan muncul di sini...";
        inputMorse.placeholder = "Ketik morse di sini...";
        
        inputTeks.readOnly = true;
        inputMorse.readOnly = false;
        
        containerTeks.classList.add("inaktif");
        containerTeks.classList.remove("aktif");
        containerMorse.classList.add("aktif");
        containerMorse.classList.remove("inaktif");
        
        inputMorse.focus();
    }
    
    // Bersihkan kotak
    inputTeks.value = "";
    inputMorse.value = "";
}

function handleTeksInput() {
    // PERBAIKAN: Cek variabel yang benar
    // "Hentikan jika kita TIDAK dalam mode TeksKeMorse"
    if (!modeAwalTeksKeMorse) return;
    
    let hasilMorse = "";
    const teks = inputTeks.value.toUpperCase();
    
    for (const karakter of teks) {
        const kode = mapTeksKeMorse[karakter];
        if (kode) {
            hasilMorse += kode + " ";
        }
    }
    inputMorse.value = hasilMorse.trim();
}

function handleMorseInput() {
    // PERBAIKAN: Cek variabel yang benar
    // "Hentikan jika kita SEDANG dalam mode TeksKeMorse"
    if (modeAwalTeksKeMorse) return;
    
    let hasilTeks = "";
    const arrayKode = inputMorse.value.trim().split(" ");
    
    for (const kode of arrayKode) {
        const karakter = mapMorseKeTeks[kode];
        if (karakter) {
            hasilTeks += karakter;
        }
    }
    inputTeks.value = hasilTeks;
}

// --- 4. MENAMBAHKAN EVENT LISTENERS ---

tombolSwap.addEventListener("click", function() {
    modeAwalTeksKeMorse = !modeAwalTeksKeMorse; 
    updateMode();
});

// Panggil fungsi terjemahan setiap kali pengguna mengetik
inputTeks.addEventListener("input", handleTeksInput);
inputMorse.addEventListener("input", handleMorseInput);

// Panggil updateMode() sekali saat halaman pertama kali dimuat
updateMode();