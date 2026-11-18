# REGNAS — Mockup Portal Registri Kanker Nasional & Daerah

Mockup statis interaktif berbasis rancangan form **F01–F17**, termasuk **F12B verifikator internal fasyankes**. Rancangan memakai pola *generate launch URL* dari SIMRS/fasyankes seperti SSRME/KOMEN; data klinis akan dibaca melalui SATUSEHAT FHIR dan di-abstraksi pada Registry API saat implementasi.

## Akses

- GitHub Pages: https://bofandra.github.io/regnas/
- **Demo Pengampu Wilayah (langsung): https://bofandra.github.io/regnas/#pengampu**
- Repository: https://github.com/bofandra/regnas
- Workflow deployment: `.github/workflows/pages.yml`

Setiap commit di `main` akan menjalankan workflow GitHub Pages.

## Implementasi dashboard Pengampu Wilayah (18 November 2026)

**Fitur pengampu wilayah telah diimplementasikan sebagai demo interaktif dengan data sintetis** mengikuti [rencana penyesuaian](docs/PLAN_PENYESUAIAN_MOCKUP_PENGAMPU_WILAYAH_2026-11-18.md). Status pekerjaan, batasan, dan hasil pengujian tercatat pada **[Laporan Implementasi](docs/STATUS_IMPLEMENTASI_PENGAMPU_WILAYAH_2026-11-18.md)**.

**Cara membuka:** gunakan [tautan Pengampu Wilayah](https://bofandra.github.io/regnas/#pengampu), atau pilih **Pengampu Wilayah** dalam panel **⚙ Kontrol Demo**. Pilih jejaring contoh **Barat** atau **Timur** melalui kontrol presenter. **Pengampu Wilayah berbeda dari Reviewer Daerah**: pengampu memonitor faskes binaan dan agregat registri tetapi tidak mendapat tombol ACC/return.

**Isi demo baru:** peta/diagram sebaran provinsi-faskes (ilustratif, tidak menggunakan batas administratif presisi), klik wilayah → faskes → kasus; grafik jenis kanker → lokus → faskes → kasus; filter periode menurut tanggal diagnosis/submit/finalisasi; unit hitung tumor primer atau pasien unik; tabel faskes binaan termasuk belum melapor; status QC draf, progres review, distribusi stadium, tren bulanan, dan CSV **agregat**.

**Dataset sintetis:** 54 tumor primer contoh dari 12 faskes sintetis di dua jejaring pengampu lintas provinsi, termasuk satu faskes tanpa submission. Seluruh data, hubungan jejaring, tanggal dan koordinat pada diagram hanya untuk demonstrasi; bukan statistik nasional atau daftar faskes pengampu resmi.

## Layar mockup

- Ringkasan/dashboard: indikator progres sesuai role; **Pengampu Wilayah** mendapatkan peta, grafik kanker/lokus dan monitoring jejaring.
- Daftar Kasus: pencarian serta perpindahan antar-kasus tumor primer.
- Simulasi Launch SIMRS (melalui panel presenter): tautan demo untuk membuka kasus terpilih, dengan detail referensi FHIR yang opsional.
- Registrasi Kanker: identitas, episode, diagnosis, stadium/TNM, penunjang, terapi, tindak lanjut, dan pengajuan. Tahap pemeriksaan mengarah ke QC yang interaktif.
- Pemeriksaan Kelengkapan: status perbaikan/konfirmasi dalam bahasa pengguna, dengan kode aturan yang bisa dibuka jika diperlukan.
- Antrean Review: simulasi keputusan verifikator fasyankes, daerah, dan nasional.
- Pelaporan: rekap kasus final sesuai cakupan peran dan ekspor CSV sintetis; dashboard jejaring menyediakan unduh CSV agregat faskes.
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

## Cara menguji — dashboard Pengampu Wilayah

1. Buka **https://bofandra.github.io/regnas/#pengampu**. Lihat KPI jejaring dan penanda **DATA SIMULASI**.
2. Klik provinsi pada **Peta Sebaran** → lihat faskes binaan → klik **Lihat kasus** untuk meninjau daftar kasus dan **Ringkasan** (tanpa identitas pasien).
3. Klik salah satu batang **Kasus per Jenis Kanker** → pilih **Lokus/Topografi** → pilih faskes → lihat daftar kasus yang membentuk angka agregat.
4. Gunakan filter **Dasar periode, Tahun, Wilayah, Faskes, Jenis Kanker, Lokus, Pelaporan Faskes, Status, Unit Hitung**. Coba **Belum melapor**: faskes tanpa kasus tetap terlihat.
5. Bandingkan **Tumor primer** dan **Pasien unik**, serta filter **Tanggal diagnosis**, **Tanggal submit**, dan **Tanggal finalisasi**; unit dan basis hitung tercantum pada metadata layar.
6. Gunakan panel **Faskes Binaan** untuk mengunduh **CSV agregat sintetis** tanpa data identitas pasien.
7. Klik **⚙ Kontrol Demo** untuk beralih ke jejaring contoh lainnya, melihat peran **Registrar Fasyankes**, atau memilih **Reset Demo**.

**Peta yang digunakan adalah diagram geografi ilustratif**; nama dan titik faskes adalah sintetis. Ini bukan geodata administratif resmi atau pemetaan kejadian kanker berdasarkan domisili pasien.

## Cara menguji — skenario registrasi end-to-end

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

## Teknologi dan pengujian

Mockup tetap **statis tanpa dependency runtime eksternal** dan kompatibel dengan GitHub Pages pada subpath `/regnas/`.

- `index.html` — portal, alur registrar, review, navigasi peran dan Kontrol Demo.
- `assets/js/regional-dashboard.js` — seed jejaring/kasus sintetis, agregasi, filter, peta ilustratif, drill-down, ekspor agregat.
- `assets/css/regional-dashboard.css` — styling dashboard responsif.
- `tests/regional-dashboard.test.js` — **19 skenario** logika, scope, drill-down, periode, unit hitung, CSV, dan regresi registrar.
- `tests/browser-smoke.mjs` — smoke test Chromium/Playwright untuk dashboard desktop, mobile, drill-down, dan akses registrar.
- `.github/workflows/validate.yml` — menjalankan uji Node dan smoke test browser pada push/PR; screenshot QA diunggah sebagai artefak `regnas-browser-qa-screenshots`.

Pengujian lokal (Node.js 22): `node --test tests/regional-dashboard.test.js`. Untuk menguji tampilan Chromium: instal Playwright (`npm install --no-save --no-package-lock playwright@1.56.1`, kemudian `npx playwright install chromium`) dan jalankan `node tests/browser-smoke.mjs` dari root repository.

**Status validasi:** 19 skenario logika lulus pada pemeriksaan JavaScript dengan shim V8 saat pengembangan. Workflow Node + Playwright telah dikonfigurasi, tetapi hasil eksekusi GitHub Actions, screenshot yang dihasilkan, deployment GitHub Pages, dan penilaian visual manusia **belum terkonfirmasi** dalam percakapan ini. Periksa tab [Actions](https://github.com/bofandra/regnas/actions) dan artefak screenshot sebelum presentasi eksternal. GitHub Pages publik dan seluruh role switch di sini hanya simulasi, bukan otorisasi produksi.
