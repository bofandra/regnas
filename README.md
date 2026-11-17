# REGNAS — Mockup Portal Registri Kanker Nasional & Daerah

Mockup statis interaktif berbasis rancangan form **F01–F17**, termasuk **F12B verifikator internal fasyankes**. Rancangan memakai pola *generate launch URL* dari SIMRS/fasyankes seperti SSRME/KOMEN; data klinis akan dibaca melalui SATUSEHAT FHIR dan di-abstraksi pada Registry API saat implementasi.

## Akses

- GitHub Pages: https://bofandra.github.io/regnas/
- Repository: https://github.com/bofandra/regnas
- Workflow deployment: `.github/workflows/pages.yml`

Setiap commit di `main` akan menjalankan workflow GitHub Pages.

## Layar mockup

- Ringkasan/dashboard: indikator dan grafik progres yang mengikuti perubahan status kasus sintetis.
- Daftar Kasus: pencarian serta perpindahan antar-kasus tumor primer.
- Simulasi Launch SIMRS (melalui panel presenter): tautan demo untuk membuka kasus terpilih, dengan detail referensi FHIR yang opsional.
- Registrasi Kanker: identitas, episode, diagnosis, stadium/TNM, penunjang, terapi, tindak lanjut, dan pengajuan. Tahap pemeriksaan mengarah ke QC yang interaktif.
- Pemeriksaan Kelengkapan: status perbaikan/konfirmasi dalam bahasa pengguna, dengan kode aturan yang bisa dibuka jika diperlukan.
- Antrean Review: simulasi keputusan verifikator fasyankes, daerah, dan nasional.
- Pelaporan: rekap kasus final sesuai cakupan peran dan ekspor CSV data sintetis.
- Integrasi & Audit: status sistem contoh dan aktivitas sesi; hanya tersedia melalui panel presenter.
- Konfigurasi: master organisasi, role, routing, dan kebijakan verifikasi internal; hanya tersedia melalui panel presenter.

## Tampilan audiens dan kontrol presenter

**Tampilan audiens adalah mode default.** Halaman utama menggunakan istilah yang dapat dipahami pengguna; menu menyesuaikan peran yang sedang diperagakan. ID FHIR, kode QC, dan catatan teknis disimpan dalam bagian detail yang dapat dibuka sesuai kebutuhan. Label **Data Simulasi** tetap terlihat agar mockup tidak disalahartikan sebagai aplikasi operasional.

Klik **⚙ Kontrol Demo** di kanan atas untuk membuka panel presenter. Di panel itu tersedia:
- Pemilihan peran Registrar Fasyankes, Verifikator RS, Reviewer Daerah, Reviewer Nasional, dan Admin Operasional.
- **Simulasi Launch SIMRS** untuk membuat tautan kasus, lalu membuka form registrasi terkait.
- Akses ke **Integrasi & Audit** dan **Konfigurasi**, yang tidak muncul pada navigasi audiens.
- **Reset Demo**, untuk mengembalikan kondisi awal seluruh data dan alur.
Panel dapat ditutup kembali tanpa menghapus progres kasus. Saat tautan kasus dibuka dari SIMRS demo, aplikasi kembali ke tampilan registrar yang bersih.

## Cara menguji — skenario demo end-to-end

1. Pada **Ringkasan**, amati rekap kasus dan grafik progres dinamis. Klik **⚙ Kontrol Demo** untuk mengganti peran ke **Registrar Fasyankes**.
2. Dalam panel tersebut, klik **Simulasi Launch SIMRS**, pilih **REG-2026-00130**, lalu klik **Buat Tautan Kasus** dan **Buka Kasus**. Panel presenter tertutup otomatis; nomor kasus dan data klinis contoh sesuai pilihan.
3. Buka **Registrasi Kanker**, lalu pilih bagian **Stadium / TNM**. Kasus ini sengaja memiliki **TX** dan edisi staging **Belum dipastikan**; untuk latihan, ubah T ke **T2** dan edisi ke **Edisi ditetapkan pengampu**. Nilai ini hanya data contoh, bukan hasil perhitungan klinis.
4. Buka **Pemeriksaan Kelengkapan**, klik **Periksa Ulang**. Bila masih ada peringatan, tulis alasan lalu pilih **Konfirmasi Peringatan**. Hasil pemeriksaan terikat pada revisi kasus; setiap perubahan isian mengharuskan pemeriksaan ulang.
5. Buka bagian **Pengajuan** di **Registrasi Kanker** dan klik **Ajukan ke Verifikator RS**. Pada kasus 00130, alur verifikasi internal memang diwajibkan dalam skenario.
6. Buka **⚙ Kontrol Demo** dan pilih **Verifikator RS**. Masuk **Antrean Review**, pilih kasus 00130, lalu **Setujui**.
7. Ganti peran pada panel presenter ke **Reviewer Daerah** kemudian **Reviewer Nasional**; di setiap antrean, pilih kasus dan setujui. Kasus berakhir dengan label **Registrasi final**.
8. Buka **Ringkasan** dan **Pelaporan** untuk melihat perubahan indikator serta hasil kasus final. Ekspor contoh tersedia sebagai CSV sintetis.
9. Kembali ke **⚙ Kontrol Demo**, klik **Reset Demo** untuk mengulang demonstrasi.

Alternatif: gunakan **Kembalikan untuk Perbaikan** pada antrean verifikator/reviewer, kembali ke registrar, perbaiki kasus dan lakukan QC ulang. Kasus final tidak dapat dikembalikan melalui alur review biasa.

## Keamanan dan batasan

**Seluruh data sintetis.** Tidak ada backend, penyimpanan server, SSO, API SATUSEHAT, maupun integrasi SIMRS nyata. Role-switch, penyimpanan draf, QC, validasi, keputusan reviewer, dan audit adalah interaksi sisi browser saja; **tidak dapat digunakan untuk mengelola data pasien nyata**. GitHub Pages bersifat publik—jangan menaruh token, NIK, secret, atau informasi rekam medis di repository ini.

Simulasi tidak berarti kriteria registrable case, multiple primary, coding ICD-O, persetujuan verifikator, ekspor CanReg5 atau mekanisme IARC telah disahkan. Perilaku produksi memerlukan Registry API, FHIR Adapter, RBAC, audit immutable, SOP klinis, kebijakan data, dan verifikasi lingkungan SATUSEHAT.

## Sumber spesifikasi

Dokumen desain bertahap tersimpan di [folder Google Drive REGNAS](https://drive.google.com/drive/folders/1BKgJUllvHViDdp3F5eQlPLfVjQ-KmaAO): indeks 00, detail tahap 01–06, F01/F12B (07), dan kamus data induk F01–F17 (08).

## Teknologi

Satu file statis HTML/CSS/JavaScript tanpa dependency eksternal. Compatible dengan GitHub Pages project site pada subpath `/regnas/`.
