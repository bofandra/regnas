# STATUS IMPLEMENTASI MOCKUP — PENGAMPU WILAYAH

**Tanggal:** 18 November 2026  
**Repository:** https://github.com/bofandra/regnas  
**Demo langsung:** https://bofandra.github.io/regnas/#pengampu  
**Spesifikasi:** [Rencana 18 Bagian](PLAN_PENYESUAIAN_MOCKUP_PENGAMPU_WILAYAH_2026-11-18.md)  
**Status:** penyesuaian mockup interaktif telah diimplementasikan; bukan aplikasi operasional, bukan data riil.

## 1. Hasil pelaksanaan per tahap

| Tahap rencana | Status untuk mockup | Keluaran |
|---|---|---|
| P0 — baseline/peran/data | Selesai | Role Pengampu Wilayah terpisah dari Reviewer Daerah; dua jejaring sintetis; 12 faskes; 54 tumor primer |
| P0 — peta sebaran dan drill-down | Selesai sebagai ilustrasi | Diagram wilayah interaktif, titik faskes sintetis, provinsi → faskes → kasus → ringkasan |
| P0 — jenis kanker dan lokus | Selesai | Jenis kanker → topografi/lokus → faskes → kasus, dengan filter yang sama |
| P0 — monitoring faskes binaan | Selesai | Tabel faskes, faskes belum melapor, progres, kasus final, data perlu tindak lanjut |
| P1 — filter, progres dan role-specific | Selesai untuk demo | Scope jejaring, status, jenis kanker/lokus, lokasi faskes, dasar tanggal, unit hitung, QC draf; aksi review tidak dimiliki pengampu |
| P2 — analitik tambahan | Sebagian selesai | Distribusi stadium, tren bulanan, rekap QC faskes dan ekspor CSV agregat contoh; geodata presisi/epidemiologi PBCR belum dibuat |
| Uji visual browser / CI | Perlu verifikasi lanjutan | Parsing dan skenario logika telah diuji; eksekusi runner GitHub Actions dan render browser publik belum dikonfirmasi secara independen |

## 2. File implementasi

- **index.html** — persona Pengampu Wilayah, navigasi baru, direct link dengan fragment pengampu, panel presenter dan perlindungan akses UI mockup.
- **assets/js/regional-dashboard.js** — jejaring/faskes/data sintetis, filter dan agregasi, SVG wilayah ilustratif, interaksi peta/chart, monitoring, ekspor agregat.
- **assets/css/regional-dashboard.css** — style dashboard, map, chart, tabel, drill-down, responsive.
- **tests/regional-dashboard.test.js** — 16 kasus uji regresi memakai Node bawaan.
- **.github/workflows/validate.yml** — workflow pengujian pada push/PR ke kode/aset/tes.
- **README.md** — panduan Pengampu Wilayah dan registrar end-to-end.

## 3. Pembagian persona

**Registrar RS:** mengerjakan kasus dalam faskes, F04–F10, QC F11, pengajuan F12, verifikasi internal F12B jika diwajibkan, perbaikan dan pelacakan status.

**Pengampu Wilayah:** melihat data faskes binaan dalam jejaring contoh, sebaran lokasi faskes, kasus menurut jenis kanker dan lokus, progres, daftar kasus dengan ringkasan nonidentitas, dan CSV agregat. **Tidak memiliki tombol approve/return/edit kasus.**

**Reviewer Daerah:** memproses antrean F13 dalam scope reviewer, terpisah dari mapping jejaring Pengampu Wilayah.

**Reviewer Nasional:** melakukan finalisasi F14 dan dapat membuka analitik agregat nasional sesuai tampilan demo.

## 4. Angka dan definisi demo

- Dua jejaring dengan relasi faskes sintetis **lintas provinsi**, tidak otomatis sama dengan seluruh faskes di provinsi tertentu.
- Dua belas RS contoh, termasuk setidaknya satu tanpa submission, serta 54 tumor primer sintetis dari 5 kasus sebelumnya dan 49 tambahan.
- Kelompok kanker contoh termasuk payudara, kolorektal, paru, serviks, limfoma, prostat dan hati. Kode diagnosis/topografi hanya contoh sampai terminologi resmi divalidasi.
- **Tumor primer** menggunakan hitungan ID tumor unik; **pasien unik** menggunakan kunci pasien unik. Seorang pasien dapat memiliki lebih dari satu tumor primer.
- Dasar waktu dapat dipilih: tanggal diagnosis, tanggal submit, atau tanggal finalisasi sintetis. Draf tanpa submit tidak dihitung pada basis submit/finalisasi.
- Status FINAL pada dashboard hanya finalisasi mockup, **bukan bukti angka insidensi**, laporan IARC, atau PBCR yang memenuhi definisi epidemiologi.
- Lokasi pada peta adalah **lokasi ilustratif faskes pelapor**, bukan lokasi/domisili pasien dan bukan batas kartografis resmi.
- CSV tambahan memuat agregat faskes contoh saja, tanpa Patient IHS, NIK, nama pasien atau catatan klinis.

## 5. Cara uji demo

1. Buka https://bofandra.github.io/regnas/#pengampu untuk tampilan jejaring langsung.
2. Klik provinsi pada **Peta Sebaran**, lihat faskes binaan, pilih RS, buka daftar kasus dan ringkasannya.
3. Klik jenis kanker pada grafik → lokus/topografi → faskes → daftar kasus. Jumlah yang tampil mengikuti filter.
4. Gunakan filter status **Belum melapor**, periksa faskes tanpa submission tetapi tetap tercatat sebagai faskes binaan.
5. Bandingkan **Tumor primer** dan **Pasien unik**, kemudian **Tanggal diagnosis**, **Tanggal submit**, **Tanggal finalisasi**.
6. Tinjau progres/QA draf, distribusi stadium, tren bulanan, dan ekspor CSV agregat.
7. Buka **Kontrol Demo**, ganti ke Registrar RS dan jalankan kasus REG-2026-00130: QC → Verifikator RS → Reviewer Daerah → Reviewer Nasional → Final.
8. Pilih **Reset Demo** untuk kembali ke seed awal.

## 6. Pengujian dan batasan

Skenario logika yang telah diperiksa dalam sesi pengembangan: pemisahan role, jejaring A/B, faskes belum melapor, klik wilayah, filter jenis/lokus, hitungan pasien vs tumor, basis tanggal, status final, tampilan HTML dashboard, dan regresi pengajuan QC/F12B/F13/F14 serta reset.

Pengujian 16 kasus juga **tersedia di repository** sebagai kode Node, tetapi laporan ini tidak menyatakan CI hijau sebelum workflow benar-benar terkonfirmasi. Pemeriksaan layout pada Chromium desktop/mobile nyata juga masih perlu dilakukan.

Tidak tersedia: backend, database, SSO/RBAC server, FHIR Adapter yang terhubung, data rumah sakit resmi, boundary geografi berlisensi, data pasien sesungguhnya, metode insidensi populasi/ASR, serta kanal pengiriman resmi IARC.

**Peringatan:** pada GitHub Pages publik, semua role/scope dan hak lihat kasus hanya simulasi JavaScript. Jangan gunakan mockup untuk data nyata atau menafsirkan tampilan sebagai otorisasi produksi.

## 7. Tindak lanjut

1. Verifikasi GitHub Actions dan penayangan hasil deploy Pages terbaru.
2. Jalankan seluruh 20 skenario UAT pada dokumen plan secara manual di Chrome desktop/mobile; khususnya keterbacaan diagram wilayah, scrolling tabel, aksesibilitas klik, dan filter silang.
3. Jika peta presisi diperlukan, ganti diagram ilustratif dengan boundary administrasi berlisensi dan koordinat fasilitas dari sumber terverifikasi.
4. Sebelum implementasi layanan nyata, sahkan mapping RS binaan, mandat pengampu/reviewer, terminologi, hak akses, definisi data mutu serta rencana integrasi backend SATUSEHAT.

**Catatan:** dokumen plan tetap baseline kebutuhan; dokumen status ini mencatat fitur yang dibuat dan sisa keterbatasannya.
