# RENCANA PENYESUAIAN MOCKUP REGNAS — PENGAMPU WILAYAH & DRILL-DOWN REGISTRI KANKER

> **Pembaruan pelaksanaan, 18 November 2026:** fitur utama P0 dan P1 serta sebagian analitik P2 telah diimplementasikan dalam mockup. Untuk rincian hasil, keterbatasan, dan pengujian lihat [Status Implementasi](STATUS_IMPLEMENTASI_PENGAMPU_WILAYAH_2026-11-18.md). Pernyataan “belum diimplementasikan” pada isi dokumen ini merupakan status pada saat rencana awal ditulis.

**Versi:** 1.0 (rencana implementasi mockup)  
**Tanggal:** 18 November 2026  
**Repository:** https://github.com/bofandra/regnas  
**Target:** mockup statis HTML/CSS/JavaScript pada GitHub Pages; tanpa backend maupun data pasien nyata  
**Status:** rencana/backlog, **belum** berarti fitur dashboard pengampu wilayah sudah diimplementasikan atau disahkan sebagai alur operasional nasional.

## 1. Keputusan produk utama

REGNAS dipertahankan sebagai **satu portal dengan tampilan berdasarkan peran**, bukan dua aplikasi terpisah. Fokus tiap peran:

| Peran | Tujuan pekerjaan | Tampilan masuk (default) | Tindakan |
|---|---|---|---|
| Registrar RS | Mencatat dan melengkapi kasus pada fasyankesnya | Daftar kasus dan registrasi | Abstraksi F04–F10, QC F11, submit F12, koreksi |
| Verifikator RS | Memeriksa hasil registrasi yang diusulkan registrar | Antrean verifikasi internal | Setujui/kembalikan F12B apabila kebijakan organisasi mensyaratkan |
| **Pengampu Wilayah (baru)** | Memantau jaringan faskes binaan dan kualitas/progres registri | **Dashboard Jejaring Pengampuan** | Filter, peta, grafik, drill-down agregat, monitoring faskes; **tanpa ACC/return kasus secara otomatis** |
| Reviewer Daerah/Regional | Mengambil keputusan pada submission yang ditugaskan menurut mandat | Antrean review daerah | Meninjau, ACC, kembalikan, eskalasi sesuai scope F13 |
| Reviewer Nasional | Finalisasi dan pengawasan registri pada cakupan nasional | Dashboard nasional/antrean nasional | F14 dan akses dataset sesuai hak |
| Admin/Presenter | Mengatur simulasi, relasi faskes binaan, role, dan reset | Kontrol Presenter tersembunyi | Berpindah skenario, konfigurasi data sintetis, reset; bukan aksi klinis |

**Aturan pemisahan:** "Pengampu Wilayah" bukan sinonim "Reviewer Daerah". Orang/organisasi boleh memiliki lebih dari satu assignment jika nantinya secara resmi berwenang, namun mockup harus memperagakan hak tersebut secara **terpisah**, tidak otomatis memberi akses keputusan atau data individu hanya karena dapat melihat dashboard wilayah.

### Definisi jejaring dan wilayah

- **Faskes binaan** = organisasi/fasyankes yang tercatat pada mapping jejaring pengampuan ke suatu unit pengampu untuk periode tertentu; tidak boleh dihitung hanya dengan kesamaan provinsi atau domisili pasien.
- **Wilayah administratif faskes** = provinsi/kabupaten/kota alamat organisasi pelapor, terpisah dari domisili pasien.
- **Wilayah registri/PBCR** = cakupan populasi registri yang disahkan, konsep berbeda dari jejaring faskes dan wilayah administratif.
- **Pengampu wilayah** = unit pengampu atau koordinator yang diberi assignment faskes binaan; pada demo memakai unit sintetis. Identitas/mandat riil dan cakupan sesuai regulasi perlu disahkan sebelum implementasi produksi.
- **Data demo tetap HBCR/operasional secara default**: bukan insidensi populasi, angka epidemiologi resmi atau data tersinkron dari SATUSEHAT.

## 2. Tujuan demo dan batasan

### Tujuan yang harus terbukti dalam presentasi
1. Registrar RS dapat mencatat, QC, dan mengirim satu kasus sesuai alur yang sudah berfungsi.
2. Pengampu Wilayah dapat mengetahui **sebaran kasus menurut wilayah/faskes binaan** dan melakukan drill-down dari visual menjadi daftar faskes, daftar kasus, lalu ringkasan kasus yang diizinkan.
3. Pengampu Wilayah dapat mengetahui **jumlah kasus per jenis kanker dan lokus/topografi**, lalu drill-down ke jenis/lokus, faskes dan kasus.
4. Angka dashboard berubah konsisten setelah perubahan status kasus pada simulasi.
5. Pengampu Wilayah dapat memonitor faskes yang sudah/belum mengirim registri serta kasus yang memerlukan tindak lanjut, tanpa mengambil alih tugas registrar atau reviewer.
6. Reviewer Daerah dan Nasional mempertahankan alur keputusan F13–F14 yang sudah ada; fitur baru tidak boleh memotong gate F12B.
7. Presenter dapat berpindah role dan mereset skenario tanpa membingungkan audiens.

### Di luar cakupan penyesuaian mockup ini
- Backend, database, SSO, otorisasi nyata, integrasi API SATUSEHAT/SSRME/SIMRS, atau penarikan data pasien nyata.
- Perhitungan epidemiologi PBCR (ASR, angka insidensi penduduk, survival, MV%/DCO% sah), integrasi data mortalitas, atau pelaporan IARC sesungguhnya.
- Penetapan formal pengampu wilayah, wilayah binaan, kewenangan reviewer dan validasi daftar RS oleh Kemenkes; mockup hanya contoh relasi.
- Geolokasi pasien, peta titik rumah pasien, identitas asli pasien, atau penentuan stadium klinis otomatis.
- Seluruh 439 field spesifikasi induk ditampilkan pada mockup; prioritas pada perjalanan pengguna, data minimal dan hubungan data.

## 3. Susunan layar yang ditargetkan

| Menu/tampilan | Registrar RS | Pengampu Wilayah | Reviewer Daerah | Reviewer Nasional | Keterangan |
|---|---|---|---|---|---|
| Ringkasan | Ringkasan RS | **Dashboard Jejaring Pengampuan** | Ringkasan antrean/rute | Ringkasan nasional | KPI beda berdasarkan scope |
| Daftar Kasus | Kasus RS sendiri | **Drill-down daftar kasus binaan (izin demo)** | Submission dalam rute review | Kasus sesuai mandat | Tidak otomatis membuka data klinis sensitif |
| Registrasi Kanker | Edit kasus yang berhak | Ringkasan read-only / disembunyikan jika tidak berhak | Detail read-only saat review | Detail sesuai tugas | F04–F12 tetap |
| Pemeriksaan Kelengkapan | Jalankan QC | Agregat QC per faskes, bukan edit | Lihat ringkasan QC submission | Lihat ringkasan QC | F11 tetap |
| Antrean Review | Status pengajuan | **Monitoring status** tanpa tombol ACC | **ACC/return F13** | **ACC/return F14** | Pisahkan UI tindakan dan pemantauan |
| Sebaran Kasus | Opsional ringkasan RS | **Peta wilayah/faskes binaan** | Sesuai scope | Nasional | Baru |
| Jenis Kanker & Lokus | Opsional ringkasan RS | **Grafik kelompok kanker/lokus** | Sesuai scope | Nasional | Baru |
| Faskes Binaan | Tidak perlu | **Tabel monitoring faskes** | Opsional | Monitoring nasional | Baru |
| Pelaporan | Tidak wajib | Agregat jejaring, terbatas | Rekap regional | Data final nasional | Bedakan laporan operasional vs epidemiologi |
| Kontrol Presenter | Tidak terlihat default | Tidak terlihat default | Tidak terlihat default | Tidak terlihat default | Tetap tombol tersembunyi/drawer |

Tampilan pengampu wilayah saat login demo **tidak** lagi memakai dashboard reviewer daerah yang sama. Navigasi yang disarankan:
**Ringkasan Jejaring / Peta Sebaran / Jenis Kanker & Lokus / Faskes Binaan / Monitoring Registrasi**.
Apabila ada tugas review formal, pengguna melihat tab **Antrean Review** berdasarkan assignment reviewer terpisah, bukan default role pengampu.

## 4. Fitur P0 — Peta sebaran kasus dan drill-down

### Ringkasan layar
Header: nama unit pengampu sintetis, periode, definisi unit hitung, cakupan faskes binaan, label "Data Simulasi", as-of.
Kartu ringkas: faskes binaan, faskes melapor, jumlah tumor primer tercatat, pasien unik, kasus sedang review, kasus final.
Peta: wilayah administratif **faskes pelapor**; ada switch yang jelas jika suatu saat ditampilkan domisili pasien (tidak aktif pada mockup MVP). 

### Interaksi minimum
- **Level 0:** jaringan pengampu → peta provinsi/kabupaten yang memiliki faskes binaan (angka = tumor primer tercatat, bukan jumlah kunjungan).
- **Level 1:** klik provinsi/kabupaten di peta atau tabel → tampil panel daftar faskes binaan pada lokasi itu; marker/area memperlihatkan jumlah kasus, jumlah RS dan status data.
- **Level 2:** klik faskes → daftar kasus di RS itu, dengan filter jenis kanker, lokus, tahun, status verifikasi, stadium.
- **Level 3:** klik kasus → ringkasan kasus sintetis. Panel abstraksi klinis rinci hanya boleh terbuka pada persona demo yang diizinkan; pengampu default melihat metadata minimal kasus, bukan hak edit/ACC.
- Breadcrumb: "Jejaring > Wilayah > Faskes > Kasus" dengan tombol kembali dan **Hapus Filter**.
- Filter peta dan tabel daftar kasus harus tetap sinkron; hasil nol menunjukkan empty state yang jelas.

### Aturan peta
- Gunakan GeoJSON/SVG batas administrasi yang sumber dan lisensinya dapat diverifikasi sebelum ditambahkan; jangan menggambar batas administratif seolah akurat tanpa data sumber.
- Jika aset geografi belum siap, fallback berupa **diagram wilayah interaktif + daftar faskes** yang tetap mendemonstrasikan drill-down; label jelas "ilustrasi", tidak mengaku peta administrasi presisi.
- Untuk marker faskes gunakan hanya koordinat fasilitas **sintetis**/koordinat ilustratif yang ditandai demikian; jangan menyimpulkan angka kasus sebagai konsentrasi kejadian di lokasi domisili pasien.
- Hindari ketergantungan API key atau tile map berbayar untuk GitHub Pages; utamakan aset lokal dan interaksi JavaScript ringan.
- Klik peta tidak pernah mengubah role atau scope pengguna; filter wilayah bukan pemberian izin.

## 5. Fitur P0 — Agregat jenis kanker, lokus, dan drill-down

### Visual utama
- Grafik batang horizontal **kelompok kanker** (contoh: payudara, kolorektal, paru, serviks, dan lainnya) disertai jumlah kasus; kategori disimpan dalam mapping contoh kode ICD-10/ICD-O yang terdokumentasi.
- Grafik/daftar turunan **lokus/topografi** sesuai kode dan teks kategori sintetis (misalnya C50.9 sebagai contoh topografi pada mockup saat ini).
- Distribusi stadium dan status final ditampilkan sebagai **filter/opsional**, bukan dicampur dalam angka total; "Tidak diketahui"/"Tidak berlaku" terpisah.
- Toggle ukuran hitung: **tumor primer (default)** versus **pasien unik**. Label semua angka berubah mengikuti ukuran hitung.

### Interaksi minimum
- Klik bar jenis kanker → tabel lokus/topografi (kode + deskripsi) dalam kategori tersebut.
- Klik lokus → daftar faskes binaan yang memiliki kasus terkait.
- Klik faskes → daftar kasus yang membentuk angka itu.
- Klik kasus → ringkasan sintetis (dalam scope).
- Setiap pilihan mempertahankan filter periode, wilayah/faskes dan status.
- Breadcrumb: "Jenis kanker > Lokus > Faskes > Kasus" dengan back/reset.
- Jika angka kelompok tidak dapat direkonsiliasi dengan daftar kasus, ini adalah **bug demo**, bukan sekadar perbedaan chart.

### Definisi angka
- "Jumlah tumor primer" = distinct primary_tumor_id yang termasuk dalam filter; **jangan menghitung Encounter atau klik Generate URL**.
- "Pasien unik" = distinct patient registry identity pada filter; satu pasien dengan dua tumor primer dapat berkontribusi 2 pada unit tumor, tetapi 1 pada unit pasien.
- "Kasus final" = record eligible dengan status FINAL_LOCKED pada snapshot contoh; **jangan disebut otomatis insidensi wilayah**.
- "Jumlah RS pelapor" = distinct organization_id dengan minimal satu kasus sesuai filter; ini bukan "jumlah RS yang siap integrasi".
- Saat jenis/lokus tidak dapat ditentukan, kelompokkan sebagai "Belum diketahui", jangan buang baris diam-diam.
- Saat membandingkan periode, label **tanggal diagnosis** versus **tanggal submit/review** harus eksplisit; satu tanggal tidak menggantikan jenis tanggal lainnya.

## 6. Fitur P0 — Monitoring faskes binaan

Tabel jejaring (satu baris per faskes binaan aktif di periode terpilih):
- Nama faskes sintetis, kode faskes contoh, wilayah administratif, unit pengampu, status jejaring aktif, kasus terdaftar, kasus final, belum final/returned, terakhir submit (contoh), kelengkapan yang dihitung menurut definisi yang jelas.
- Status "Belum melapor" berarti **belum ada submission kasus dalam periode/filter**, bukan bukti faskes tidak memiliki pasien kanker.
- Indikator "Faskes aktif mengirim" menggunakan event submit sintetis; jangan menyimpulkan kesiapan API integrasi nyata.
- Klik baris faskes → profil singkat faskes & distribusi kasus → daftar kasus dalam cakupan.
- Filter "Semua / Sudah melapor / Belum melapor / Perlu tindak lanjut" dan urut berdasarkan jumlah kasus atau status.
- Sediakan **faskes binaan tanpa satu kasus pun** dalam seed, agar skenario "belum melapor" terbukti.

## 7. Fitur P1 — Monitoring progres dan kualitas

Panel pengampu wilayah terpisah dari tombol reviewer:
- Funnel: Draf → Menunggu verifikasi RS (jika berlaku) → Review daerah → Review nasional → Final.
- Returned/correction disajikan sebagai status tersendiri, bukan dihitung ganda dengan kasus di antrean.
- Grafik menurut faskes: total, belum final, dikembalikan, final, status QC.
- Waktu proses dan ketepatan waktu belum wajib pada MVP; jika ditambahkan, gunakan tanggal event sintetis terpisah yang konsisten.
- Klik angka status → daftar kasus hasil filter; hanya role reviewer dengan assignment yang menampilkan tombol keputusan.
- Perbedaan **Monitoring Pengampu** vs **Review Daerah** harus jelas pada menu, judul, dan tombol.

## 8. Fitur P2 — Analitik lanjutan (setelah MVP stabil)

- Distribusi stadium menurut jenis kanker/lokus dengan kategori unknown/not applicable; tanpa menyimpulkan stadium otomatis dari TNM.
- Tren bulanan dengan pilihan dasar tanggal diagnosis atau submit, bukan keduanya digabung.
- Kelengkapan dan mutu abstraksi per faskes: diagnosis, topografi, stadium, sumber bukti/hasil patologi, terapi, follow-up; aturan QC tetap mengikuti versi rancangan, bukan klaim indikator nasional.
- Filter kelompok umur/jenis kelamin **jika didukung nilai contoh yang terdefinisi**; jangan menyamakan gender FHIR dengan variabel epidemiologi sex at diagnosis.
- Komparasi antarjejaring atau nasional hanya sesuai role dan definisi metodologi; tidak menampilkan rate populasi tanpa data denominator sah.
- Ekspor agregat CSV sesuai filter, tanpa identitas asli; ekspor tingkat kasus harus dibatasi menurut peran.

## 9. State filter yang konsisten di semua layar

Satu objek state filter di frontend (mock):
- managing_unit_id atau network_id: ditentukan persona/assignment; bukan filter bebas lintas wilayah.
- period_start / period_end dan period_basis (diagnosis / submit / finalisasi).
- geography_type: reporting_facility_region (default). Residence region tidak tersedia di mockup MVP.
- province_code, district_code, organization_id.
- cancer_group, topography_code / site_group.
- registry_status, stage_group, case_unit (primary_tumor / unique_patient).
- data_as_of dan dataset_version (keterangan contoh statis yang disinkronkan pada reset).

Aturan:
- Mengubah wilayah membersihkan pilihan faskes/lokus yang tidak cocok, **tanpa** menghapus filter lain yang masih relevan.
- Semua kartu angka, chart, daftar dan peta memakai fungsi filter dan agregasi yang **sama**.
- Klik grafik menghasilkan daftar yang jumlahnya dapat dihitung ulang; agregasi unique_patient harus menjelaskan mengapa satu pasien muncul sekali walau multi-tumor.
- Tombol "Lihat Semua" / breadcrumb menghapus filter level terkait, bukan mengubah role/scope.
- Semua filter memiliki empty state, reset dan label cakupan.
- Untuk performa demo, agregasi dihitung di browser dari seed sintetis tanpa request jaringan.

## 10. Model data sintetis yang diperlukan

**Pertahankan kasus demo eksisting, terutama REG-2026-00130 untuk skenario registrar → verifikator RS → review daerah → nasional.** Tambahkan record untuk menceritakan jejaring.

Entitas minimum (penamaan internal usulan, bukan skema SATUSEHAT):
| Entitas | Field contoh | Relasi |
|---|---|---|
| management_units | id, display_name, kind, permitted_provinces | Pengampu/koordinator demo |
| organizations | organization_id, name, province_code, district_code, facility_type, active | Faskes sintetis |
| network_assignments | management_unit_id, organization_id, effective_from/to, status | Jejaring pengampuan; **bukan** otomatis seluruh faskes di provinsi |
| demo_users / assignments | persona_id, role, management_unit_id, org_scope, review_unit_id, can_open_case | Perbedaan pengampu dan reviewer |
| patients | patient_key sintetis, demographic placeholder | Pasien dapat punya lebih dari satu tumor primer |
| cases / primary_tumors | case_id, primary_tumor_id, patient_key, reporting_org_id, cancer_group, ICD-10, ICD-O topography, laterality, stage, diagnosis_date, status | Unit utama agregasi dan daftar |
| events | case_id, event_type, submitted_at, reviewer_unit, timestamp, revision | Monitoring progres saat status berubah |
| source_references | case_id, contoh Patient/EpisodeOfCare/Condition, source_type, source_as_of | Hanya ID sintetis, read-only |
| dashboard_config | case_unit, period_basis, as_of, taxonomy_version, label "Simulasi" | Kontrak tampilan |

**Seed minimum yang direkomendasikan (bukan angka kasus resmi):**
- 2 unit pengampu sintetis dengan assignment jaringan **tidak identik** dengan batas provinsi.
- 3 provinsi untuk filter ilustratif; 6–10 faskes sintetis, termasuk sekurangnya 1 faskes binaan belum melapor.
- 40–60 tumor primer sintetis agar peta/bar tidak kosong, dengan 5+ kelompok kanker dan beberapa lokus.
- Setidaknya 1 pasien memiliki 2 tumor primer berbeda untuk menguji beda pasien unik vs tumor primer.
- Sebagian kasus DRAFT, RETURNED, INTERNAL_VERIFICATION_PENDING, REGIONAL_REVIEW, NATIONAL_REVIEW dan FINAL_LOCKED.
- Setidaknya satu lokus unknown, satu stadium unknown dan satu rumah sakit lintas-batas jejaring.
- Setiap label faskes memakai "RS Contoh ..."; jangan gunakan daftar fasilitas nyata sebagai dataset demo kecuali telah diperiksa/diberi label contoh yang tidak menyiratkan pelaporan nyata.

**Skenario koordinat geografi:** pemilihan provinsi/kabupaten dapat menggunakan boundary resmi statis yang lisensinya layak; titik faskes dalam demo dinyatakan sintetis, bukan koordinat RS yang sesungguhnya.

## 11. Matriks akses dan perlindungan data pada mockup

| Aksi | Registrar RS | Verifikator RS | Pengampu Wilayah | Reviewer Daerah | Reviewer Nasional |
|---|---|---|---|---|---|
| Lihat agregat cakupan sendiri | Ya | Ya | **Ya, faskes binaan** | Ya, assigned region | Ya, mandat nasional |
| Lihat agregat jejaring lain | Tidak | Tidak | Tidak, kecuali assignment | Tidak, kecuali assignment | Sesuai mandat |
| Klik wilayah/faskes | RS sendiri | RS sendiri | **Ya, dalam jejaring** | Dalam scope | Dalam scope |
| Lihat daftar kasus sintetis | RS sendiri | RS sendiri | **Hanya ringkasan / daftar terbatas** | Submission ditugaskan | Sesuai mandat |
| Lihat rincian klinis sensitif | Sesuai role RS | Sesuai verifikasi | **Default tidak** | Jika ditugaskan review | Jika ditugaskan review |
| Edit abstraksi | Ya | Tidak | **Tidak** | Tidak | Tidak |
| Jalankan QC | Ya | Lihat hasil | Lihat agregat | Lihat hasil | Lihat hasil |
| Setujui internal F12B | Tidak | Ya jika REQUIRED dan mandat | **Tidak** | Tidak | Tidak |
| ACC/return F13 | Tidak | Tidak | **Tidak** | Ya jika ditugaskan | Tidak lewat fungsi F13 |
| ACC final F14 | Tidak | Tidak | **Tidak** | Tidak | Ya jika ditugaskan |
| Unduh agregat | Terbatas | Terbatas | **Agregat cakupan** | Agregat cakupan | Sesuai mandat |
| Unduh CSV tingkat kasus | Tidak default | Tidak default | **Tidak default** | Tidak default | Simulasi hanya, kebijakan produksi terpisah |

**Ketentuan demo:** kontrol role boleh dipilih presenter, tetapi jangan menampilkan seakan-akan dropdown role adalah otorisasi nyata. Semua case drill-down hanya menggunakan kasus sintetis. Saat pindah ke role lain, filter dan konteks kasus yang berada di luar scope harus di-reset atau ditolak (tidak bocor lewat URL hash). 

## 12. Rencana visual/UI terperinci

### Dashboard Pengampu Wilayah — desktop 16:9
1. Header: "Jejaring Pengampuan Kanker" + unit pengampu + periode + Data Simulasi.
2. Bar filter global di bawah header: periode, wilayah, faskes, jenis kanker, status, unit hitung; tombol "Hapus Filter".
3. KPI satu baris: N faskes binaan, N faskes melapor, N tumor primer, N pasien unik, N kasus perlu tindak lanjut, N final.
4. Konten utama dua kolom:
   - kiri (lebih lebar): peta wilayah/faskes binaan interaktif + legenda;
   - kanan: grafik kelompok kanker (batang horizontal), klik untuk memperinci lokus.
5. Baris kedua: tabel faskes binaan + monitoring progres registrasi.
6. Drawer/panel kanan untuk drill-down level wilayah/faskes/lokus; breadcrumb selalu terlihat.
7. Catatan kaki permanen: "Data simulasi · Agregasi menurut lokasi faskes pelapor · Unit: tumor primer/pasien unik · Periode: ... · As of ...".
8. Desain tetap memakai warna/komponen REGNAS (navy, teal) dan proporsi teks/spacing yang mudah dibaca pada proyektor.

### Mobile/tablet
- Filter pindah ke drawer sederhana; peta/diagram dan chart ditumpuk; daftar faskes dapat digulir.
- Panel drill-down menjadi layar/detail penuh dengan back navigation.
- Tidak boleh bergantung hanya pada hover untuk membuka daftar kasus.

### Perbaikan layar lama
- Registrar RS tetap masuk ke alur yang telah ada; jangan memaksa melihat dashboard jejaring.
- Reviewer Daerah tetap masuk Antrean Review (F13), tidak otomatis menjadi pengampu.
- Dashboard nasional memakai agregator yang sama dengan scope nasional, tanpa menyamakan registri raw HBCR dengan PBCR.
- Label status bahasa Indonesia; kode status internal dan sumber FHIR hanya berada pada expandable technical detail.
- Hindari kembali menambahkan menu teknis di sidebar audiens. Panel Presenter tetap tersedia.

## 13. Rencana struktur kode / folder

Kondisi saat ini: satu index.html monolitik, kasus sintetis dan fungsi chart ada di dalam script halaman.

**Target struktur ringan untuk mockup GitHub Pages (usulan):**

- index.html — shell aplikasi, sidebar, layout, modal/drawer, host konten.
- assets/css/regnas.css — styling umum dan responsive layout.
- assets/js/demo-data.js — seed organisasi, assignment jejaring, pasien, kasus, event, taxonomy.
- assets/js/demo-store.js — state role/persona, selectedCase, currentFilters, seed reset, kasus/edit/QC.
- assets/js/registry-logic.js — status F11/F12/F12B/F13/F14; pertahankan transisi yang sudah teruji.
- assets/js/analytics.js — helper filter/agregasi reusable, jumlah unik, unit count, peta dan chart.
- assets/js/region-dashboard.js — komponen dan drill-down pengampu wilayah.
- assets/js/app.js — routing/nav/peran dan kontrol presenter.
- assets/geo/ — GeoJSON/SVG **hanya setelah sumber dan lisensi valid**. Bila belum, gunakan region list/diagram fallback.
- docs/ — rencana, dataset demo, kamus indikator, skenario UAT.

Jangan melakukan refaktor menyeluruh sekaligus dengan pengembangan peta. Prioritaskan **tes regresi alur yang sudah bekerja**; ekstraksi modul bertahap boleh dilakukan setelah fitur P0 stabil.

## 14. Tahapan dan backlog prioritas

### Tahap 0 — Baseline dan guardrail (P0)
- [ ] Bekukan skenario lama REG-2026-00130 dan tes DRAFT → QC → F12B → F13 → F14.
- [ ] Tambah persona pengampu wilayah **terpisah** dari reviewer daerah pada Kontrol Presenter.
- [ ] Dokumentasikan definisi jaringan/faskes binaan, geography, case unit, status dan periode.
- [ ] Seed organisasi, jejaring dan kasus sintetis; pastikan relasi lintas-wilayah dan faskes belum melapor.
- [ ] Tambah tes agregasi kasus (tumor primer vs pasien unik) dan penapisan scope.

**Exit:** pergantian persona aman untuk data simulasi, status lama tidak rusak, jumlah seed bisa dijelaskan dan direproduksi.

### Tahap 1 — MVP Pengampu Wilayah (P0)
- [ ] Dashboard khusus pengampu: KPI + filter global.
- [ ] Peta/diagram wilayah dengan klik provinsi/kabupaten → daftar faskes binaan → daftar kasus → ringkasan.
- [ ] Grafik kelompok kanker → lokus → faskes → daftar kasus.
- [ ] Tabel monitoring faskes binaan, termasuk belum melapor.
- [ ] Sinkronisasi filter dengan tabel/chart/peta, breadcrumb/back/reset.
- [ ] Cakupan jejaring mengikuti assignment, **bukan selected.region**.

**Exit:** kedua skenario usulan pengguna dapat didemokan end-to-end, dan semua angka pada detail cocok dengan angka agregat.

### Tahap 2 — Monitoring dan konsistensi antar-role (P1)
- [ ] Funnel progres kasus/QC per faskes; klik status membuka kasus terfilter.
- [ ] Navigasi role-specific yang memisahkan pengampu vs reviewer.
- [ ] Filter multi-kriteria, sorting dan empty states; responsif mobile.
- [ ] Pelaporan agregat sesuai scope dengan keterangan cut-off dan unit hitung.
- [ ] Refinement UI: skeleton/empty states, label data simulasi, panel teknis tersembunyi.
- [ ] Uji perubahan status kasus pada portal registrar memicu update chart dan peta.

**Exit:** setelah satu kasus disubmit/disetujui di demo, indikator terkait langsung berubah dan angka tetap konsisten.

### Tahap 3 — Analitik tambahan/pendalaman (P2)
- [ ] Stadium per jenis kanker/lokus (termasuk Unknown/NA).
- [ ] Tren bulanan menurut basis tanggal yang eksplisit.
- [ ] Rekap QC/provenance per RS; komparasi antarjejaring dalam scope.
- [ ] Ekspor agregat dengan filter dan label definisi.
- [ ] Pengujian visual browser dan UAT bersama calon pengguna.

**Exit:** fitur tambahan tidak menciptakan klaim insidensi populasi atau otorisasi yang tidak didukung rancangan.

## 15. Acceptance criteria / UAT wajib

| ID | Skenario | Hasil yang harus terbukti |
|---|---|---|
| UAT-01 | Masuk role Registrar RS | Sidebar tidak menampilkan dashboard pengampu; edit hanya kasus RS dalam scope demo |
| UAT-02 | Masuk role Pengampu Wilayah | Sidebar/dashboard jejaring muncul; tombol ACC/return tidak ada |
| UAT-03 | Pilih Unit Pengampu A | Hanya faskes binaan A yang tampil, termasuk yang lokasinya lintas provinsi sesuai seed |
| UAT-04 | Klik provinsi pada peta | Panel kabupaten/faskes dan daftar kasus muncul dengan breadcrumb benar |
| UAT-05 | Klik faskes | Daftar kasus hanya dari faskes itu, jumlah cocok dengan kartu/marker |
| UAT-06 | Klik kelompok kanker → lokus | Jumlah bar = distinct tumor primer terfilter; daftar kasus identik dengan hasil agregasi |
| UAT-07 | Ganti "tumor primer" ke "pasien unik" | Pasien multi-primary tidak dihitung dua kali pada unit pasien |
| UAT-08 | Filter periode/status/lokus | Peta, kartu, tabel dan grafik berubah serempak, tanpa record dari luar scope |
| UAT-09 | Faskes binaan tanpa kasus | Muncul sebagai "belum melapor" dan total faskes binaan tetap benar |
| UAT-10 | Tampilkan kasus FINAL_LOCKED saja | Tidak menghitung draf/returned sebagai final; bukan klaim angka insidensi |
| UAT-11 | Pengampu klik daftar kasus | Hanya ringkasan sintetis yang diperbolehkan; tidak ada form edit/approve |
| UAT-12 | Review Daerah sebagai role terpisah | F13 approve/return tetap tersedia hanya pada submission yang ditugaskan |
| UAT-13 | Skenario REG-2026-00130 | DRAFT tertahan jika TNM belum lengkap, QC ulang, F12B, F13, F14, final sukses |
| UAT-14 | Finalisasi 1 kasus | Dashboard dan laporan terkait berubah sesuai status tanpa refresh network |
| UAT-15 | Reset Demo | Seed, mapping faskes, filter, grafik, status dan audit kembali ke kondisi awal |
| UAT-16 | URL hash kasus dari scope lain | Tidak membuka data di luar persona/scope pada mockup |
| UAT-17 | Layar peta tanpa geodata valid | Fallback daftar wilayah interaktif tetap dapat drill-down |
| UAT-18 | Pengujian desktop/mobile | Tabel/label/legend tidak terpotong; aksi klik bisa dilakukan tanpa hover |
| UAT-19 | Statistik epi tidak memiliki denominator | Tidak menampilkan ASR/insidensi sebagai angka; gunakan N/A/keterangan |
| UAT-20 | Akses di GitHub Pages | Seluruh aset statis lokal, tanpa token API/map key dan tanpa data pribadi asli |

## 16. Naskah demonstrasi calon audiens (±8–12 menit)

1. **Awal (1 menit):** tampilkan peran "Pengampu Wilayah"; sebut unit pengampu contoh dan faskes binaan.
2. **Peta (2 menit):** lihat sebaran kasus → klik salah satu provinsi/kabupaten → pilih RS binaan → lihat daftar kasus.
3. **Jenis kanker/lokus (2 menit):** grafik kanker → pilih kelompok (misalnya payudara) → pilih lokus → lihat kontribusi RS dan daftar kasus.
4. **Monitoring (1–2 menit):** filter faskes belum melapor dan kasus perlu koreksi → daftar kerja tindak lanjut.
5. **Hubungan dengan registrar (2 menit):** ganti persona ke Registrar RS pada Kontrol Presenter, lengkapi/QC satu kasus sintetis lalu submit.
6. **Kembali ke pengampu (1 menit):** tunjukkan progres status dan angka ter-update; pengampu **tidak** memberi ACC.
7. **Jika diperlukan (1–2 menit):** tampilkan reviewer daerah/nasional sebagai persona terpisah, demonstrasikan proses keputusan.
8. **Penutup:** tekankan bahwa seluruh contoh data, peran, jejaring dan proses adalah ilustrasi; implementasi nyata memerlukan ketentuan program dan otorisasi.

## 17. Risiko dan keputusan terbuka

| Topik | Sikap mockup sekarang | Keputusan resmi yang masih diperlukan |
|---|---|---|
| Siapa "Pengampu Wilayah" | Persona pemantau jejaring sintetis, tanpa ACC | Unit organisasi, cakupan wilayah, penetapan dan role formal |
| Mapping RS binaan | Seed network_assignments terpisah dari provinsi | Daftar resmi jejaring dan periode aktif sesuai keputusan pengampuan |
| Kasus mana yang ditampilkan | Semua status untuk monitor operasional, bisa filter FINAL_LOCKED | Definisi eligibilitas dan aturan penayangan bagi pengampu |
| Drill-down data klinis | Ringkasan dan kasus sintetis; detail sensitif tidak default | Mandat data individu, minimisasi data dan otorisasi |
| Batas admin wilayah | Wilayah faskes pelapor | Konteks geographic registry dan domisili pasien jika kelak diizinkan |
| Jenis kanker/lokus | Mapping kategori contoh dengan ICD-10/ICD-O dan unknown | Katalog terminologi/versi nasional yang disahkan |
| Angka insidensi dan tren | Hanya jumlah record registri contoh | Metodologi HBCR/PBCR, denominator dan catchment |
| Peta | Asset berlisensi jelas atau fallback diagram | Sumber boundary, lisensi, penyebaran marker dan definisi wilayah |
| Klaim kesiapan layanan | Simulasi browser tanpa API nyata | Arsitektur produksi, privacy, security, SLA |

Tidak boleh menyamakan kewajiban **laporan kegiatan pengampuan** dengan pengiriman **data registri klinis pasien**; keduanya bisa mendukung pemantauan tetapi objek laporan berbeda. Regulasi jejaring tidak otomatis menjadi definisi tabel FHIR ataupun hak akses kasus.

## 18. Referensi rancangan dan sumber pemeriksaan

**Sumber rancangan REGNAS yang dipakai sebagai dasar (masih draft produk):**
- Peta form dan tahapan: https://docs.google.com/document/d/1dTmMSuztydACv0ylbhXeFn21VWJtl4sGusFrUjQeeac/edit
- F01 organisasi, role, routing wilayah dan F12B: https://docs.google.com/document/d/17zthRBwW_sFKGLDRM27PmLlGJ_CHp_1Rm6ey8fy1RqQ/edit
- F16 Dashboard, F15 Pelaporan, dan F17 Monitoring: https://docs.google.com/document/d/1BgyviqnQUKNWSuVb1dQxtDVLA_boepdT1kHkB_ABRpM/edit
- Kamus data induk F01–F17: https://docs.google.com/document/d/1BiVk1raZaNwroozn-1YElgBmTqJvhKqfkztdzFK__sI/edit
- Source mockup yang diperiksa: https://github.com/bofandra/regnas/blob/main/index.html

**Asal usulan baru dalam dokumen ini:**
- Prioritas peta sebaran kasus per wilayah/faskes binaan dan agregat jenis kanker/lokus dengan drill-down: permintaan pengguna.
- Penambahan persona "Pengampu Wilayah" tersendiri, pilihan seed, desain peta fallback, prioritas P0–P2 dan UAT: rekomendasi desain mockup yang perlu validasi oleh pemilik program. Bukan aturan resmi SATUSEHAT.

---
**Keluaran yang diminta dari pekerjaan ini:** rencana implementasi beserta backlog/UAT di repository, **bukan klaim** bahwa peta dan dashboard pengampu sudah terpasang. Implementasi fitur dilakukan pada tahap pengembangan berikutnya setelah baseline diuji.
