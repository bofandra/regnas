# REGNAS — Mockup Portal Registri Kanker Nasional & Daerah

Mockup statis interaktif berbasis rancangan form **F01–F17**, termasuk **F12B verifikator internal fasyankes**. Rancangan memakai pola *generate launch URL* dari SIMRS/fasyankes seperti SSRME/KOMEN; data klinis akan dibaca melalui SATUSEHAT FHIR dan di-abstraksi pada Registry API saat implementasi.

## Akses

- GitHub Pages: https://bofandra.github.io/regnas/
- Repository: https://github.com/bofandra/regnas
- Workflow deployment: `.github/workflows/pages.yml`

Setiap commit di `main` akan menjalankan workflow GitHub Pages.

## Layar mockup

- Ringkasan/dashboard: indikator operasional simulasi dan alur fasyankes → daerah → nasional.
- Daftar Kasus: pencarian serta perpindahan antar-kasus tumor primer.
- Generate URL: konteks launch Organization, Practitioner, Patient, Encounter, EpisodeOfCare, Composition, dan tautan demo yang membuka kasus terpilih.
- Form Registrasi: tab F04–F12 berisi identitas, episode, diagnosis, staging, penunjang, terapi, follow-up, QC dan submit.
- Quality Check: pemeriksaan sederhana per kasus/revisi, blocking dan warning dengan acknowledgement.
- Antrean Review: simulasi keputusan verifikator fasyankes, daerah, dan nasional.
- Pelaporan: demonstrasi cohort, snapshot, dan export CSV data sintetis.
- Integrasi & Audit: status sistem mock serta aktivitas dalam sesi browser.
- Konfigurasi: master organisasi, role, routing, dan kebijakan verifikasi internal F12B.

## Cara menguji — skenario demo end-to-end

1. Pilih **Registrar Fasyankes** pada dropdown kanan atas.
2. Buka **Generate URL**, pilih kasus sintetis **REG-2026-00130**, klik **Generate URL demo** lalu **Buka kasus dari URL**. URL juga bisa disalin dan dibuka di tab baru.
3. Tinjau **Form Registrasi**. Identitas, diagnosis, stadium dan referensi FHIR sintetis kini mengikuti kasus yang dipilih. Field sumber tampil read-only; field abstraksi dapat diubah selama tahap koreksi/draf.
4. Pada **F07 Stadium/TNM**, kasus 00130 sengaja memiliki **TX** dan edisi staging **Belum dipastikan**. Ubah T menjadi **T2** dan pilih **Edisi ditetapkan pengampu**. Ini hanya latihan input, **bukan validasi klinis otomatis**.
5. Buka **Quality Check**, klik **Jalankan QC demo**. Jika masih ada warning, isikan alasan dan klik **Akui warning**. QC dan acknowledgement melekat pada kasus dan revisi yang sama; pengubahan field mewajibkan QC ulang.
6. Buka **Form Registrasi → F12 Submit**, lalu klik **Ajukan ke Verifikator RS**. Kasus 00130 disetel dengan kebijakan simulasi `REQUIRED`, sehingga tidak dapat langsung melewati F12B.
7. Ubah role menjadi **Verifikator RS**, buka **Antrean Review**, klik **Pilih** untuk kasus tersebut lalu **Setujui sesuai peran**. Status berpindah ke `REGIONAL_REVIEW`.
8. Ubah role ke **Reviewer Daerah** lalu **Reviewer Nasional** secara berurutan. Pada masing-masing antrean, pilih kasus dan setujui. Status akhirnya menjadi `FINAL_LOCKED`.
9. Buka **Ringkasan** untuk melihat indikator kasus final, lalu **Pelaporan** untuk mengekspor CSV sintetis dari kasus final.
10. Klik **Reset Demo** pada toolbar untuk mengembalikan seluruh status, field, revisi, acknowledgement QC, dan audit sesi ke kondisi awal.

Skenario alternatif: pada F12B atau review daerah/nasional gunakan **Kembalikan untuk koreksi**, kemudian perbaiki kasus sebagai registrar dan ulangi QC/submit. Kasus yang sudah `FINAL_LOCKED` tidak bisa di-return lewat simulasi biasa.

## Keamanan dan batasan

**Seluruh data sintetis.** Tidak ada backend, penyimpanan server, SSO, API SATUSEHAT, maupun integrasi SIMRS nyata. Role-switch, penyimpanan draf, QC, validasi, keputusan reviewer, dan audit adalah interaksi sisi browser saja; **tidak dapat digunakan untuk mengelola data pasien nyata**. GitHub Pages bersifat publik—jangan menaruh token, NIK, secret, atau informasi rekam medis di repository ini.

Simulasi tidak berarti kriteria registrable case, multiple primary, coding ICD-O, persetujuan verifikator, ekspor CanReg5 atau mekanisme IARC telah disahkan. Perilaku produksi memerlukan Registry API, FHIR Adapter, RBAC, audit immutable, SOP klinis, kebijakan data, dan verifikasi lingkungan SATUSEHAT.

## Sumber spesifikasi

Dokumen desain bertahap tersimpan di [folder Google Drive REGNAS](https://drive.google.com/drive/folders/1BKgJUllvHViDdp3F5eQlPLfVjQ-KmaAO): indeks 00, detail tahap 01–06, F01/F12B (07), dan kamus data induk F01–F17 (08).

## Teknologi

Satu file statis HTML/CSS/JavaScript tanpa dependency eksternal. Compatible dengan GitHub Pages project site pada subpath `/regnas/`.
