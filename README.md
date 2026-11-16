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
- Generate URL: demonstrasi konteks launch Organization, Practitioner, Patient, Encounter, EpisodeOfCare, Composition.
- Form Registrasi: tab F04–F12 berisi identitas, episode, diagnosis, staging, penunjang, terapi, follow-up, QC dan submit.
- Quality Check: warning terstruktur dengan alasan acknowledgement.
- Antrean Review: simulasi keputusan verifikator fasyankes, daerah, dan nasional.
- Pelaporan: demonstrasi cohort, snapshot, dan export CSV data sintetis.
- Integrasi & Audit: status sistem mock serta aktivitas dalam sesi browser.
- Konfigurasi: master organisasi, role, routing, dan kebijakan verifikasi internal F12B.

## Cara menguji

1. Pilih **Registrar Fasyankes** pada dropdown kanan atas.
2. Buka **Generate URL**, klik **Generate URL demo**.
3. Buka **Daftar Kasus**, pilih salah satu kasus lalu tinjau **Form Registrasi**.
4. Buka **Quality Check**, tulis alasan warning dan klik **Akui warning demo**.
5. Pilih kasus dalam **Form Registrasi → F12 Submit** lalu klik Submit bila sesuai.
6. Ubah peran ke **Reviewer Daerah** atau **Reviewer Nasional**, buka **Antrean Review** dan lakukan simulasi persetujuan atau return.
7. **Pelaporan** dapat mengekspor CSV sintetis dari kasus yang berstatus FINAL_LOCKED.

## Keamanan dan batasan

**Seluruh data sintetis.** Tidak ada backend, penyimpanan server, SSO, API SATUSEHAT, maupun integrasi SIMRS nyata. Role-switch, QC, validasi, keputusan reviewer, dan audit adalah interaksi sisi browser saja; **tidak dapat digunakan untuk mengelola data pasien nyata**. GitHub Pages bersifat publik—jangan menaruh token, NIK, secret, atau informasi rekam medis di repository ini.

Simulasi tidak berarti kriteria registrable case, multiple primary, coding ICD-O, persetujuan verifikator, ekspor CanReg5 atau mekanisme IARC telah disahkan. Perilaku produksi memerlukan Registry API, FHIR Adapter, RBAC, audit immutable, SOP klinis, kebijakan data, dan verifikasi lingkungan SATUSEHAT.

## Sumber spesifikasi

Dokumen desain bertahap tersimpan di [folder Google Drive REGNAS](https://drive.google.com/drive/folders/1BKgJUllvHViDdp3F5eQlPLfVjQ-KmaAO): indeks 00, detail tahap 01–06, F01/F12B (07), dan kamus data induk F01–F17 (08).

## Teknologi

Satu file statis HTML/CSS/JavaScript tanpa dependency eksternal. Compatible dengan GitHub Pages project site pada subpath `/regnas/`.
