# Global SOF Index

เว็บไซต์ Next.js App Router แบบ JSX ล้วนสำหรับฐานข้อมูลหน่วยปฏิบัติการพิเศษทั่วโลก

## Stack

- Next.js 16.2.10
- React 19.2.7
- JavaScript / JSX only
- Global CSS (ยังไม่ใช้ TypeScript)
- Dynamic route: `/units/[slug]`

## เริ่มใช้งาน

```bash
npm install
npm run dev
```

เปิด `http://localhost:3000`

## Build production

```bash
npm run build
npm start
```

## Media audit

```bash
npm run media:audit
```

รายงานสถานะสื่อรายหน่วย (verified / official emblem / representative / research pending) และช่องว่างด้านแหล่งอ้างอิงกับลิขสิทธิ์ เป็นรายงานเชิงบรรณาธิการเท่านั้น ไม่กระทบผลการ build

## Environment variables

โปรเจกต์นี้ยังไม่ต้องใช้ environment variable ใด ๆ — รัน `npm run dev` และ `npm run build` ได้โดยไม่ต้องมีไฟล์ `.env`

## โครงสร้างสำคัญ

```text
app/
├── page.js
├── globals.css
├── layout.js
└── units/[slug]/page.js
components/
├── CapabilityRadar.jsx
├── MediaGallery.jsx
├── SiteHeader.jsx
├── UnitCard.jsx
└── UnitExplorer.jsx
data/
└── units.js
```

## สถานะข้อมูล

- มีรายการพื้นฐาน 60 หน่วย
- Rich Dossier ชุดแรก: DEVGRU, Delta Force, SAS, SBS, GIGN, GROM, Sayeret Matkal, Shayetet 13, Thai SEAL, SASR และ NZSAS
- หน่วยที่เหลือมี Basic Dossier และติดสถานะ `research pending`
- รุ่นอาวุธและเครื่องแบบระบุระดับความมั่นใจ เช่น `PUBLICLY DOCUMENTED`, `COMMONLY REPORTED`, `HISTORICAL`
- ไม่ควรตีความรายการอุปกรณ์เป็นบัญชีประจำการอย่างเป็นทางการ เพราะเปลี่ยนตามช่วงเวลา ทีมย่อย และภารกิจ

## ขั้นถัดไปที่แนะนำ

1. ย้ายข้อมูลจากไฟล์ JS ไป MongoDB หรือ CMS
2. ทำ Admin Editorial Workflow สำหรับตรวจแหล่งอ้างอิง
3. เก็บรูปใน Cloudinary แทน hotlink
4. เพิ่ม Compare Mode และแผนที่จริง
5. เพิ่ม structured data และ source attribution รายข้อมูล

## Windows install recovery

If npm previously failed while this folder was open in an editor or dev server, close running Node processes, delete `node_modules` and `.next`, then run `npm cache verify` and `npm install` again. This package uses the public npm registry through the included `.npmrc` file.

## Layout and data integrity update

- Main content is centered at a maximum width of **1200px**.
- React cards use a stable country-and-code `id` instead of relying on the slug alone.
- Expanded dossier overrides are matched by **country + unit code**, because codes such as `SBS` and `GIS` can exist in more than one country.
- A duplicate-slug guard now stops the build with a clear error if duplicated routes are introduced later.
- Verified routes include both `/units/british-sbs` and `/units/ghana-sbs`.
