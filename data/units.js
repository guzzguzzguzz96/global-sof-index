const rawUnits = [
      {c:"North America", country:"United States", code:"DEVGRU", name:"Naval Special Warfare Development Group", tier:"S", role:"Maritime Counter Terror", tags:["Maritime","Counter Terror","Direct Action"], sel:98, multi:97, env:96},
      {c:"North America", country:"United States", code:"DELTA", name:"1st SFOD-D / Delta Force", tier:"S", role:"Hostage rescue and high-value target missions", tags:["Hostage Rescue","Counter Terror","Direct Action"], sel:98, multi:98, env:95},
      {c:"North America", country:"United States", code:"24 STS", name:"24th Special Tactics Squadron", tier:"S", role:"Air-ground integration and special tactics", tags:["Air Control","Recon","Direct Action"], sel:97, multi:96, env:96},
      {c:"North America", country:"United States", code:"GREEN BERETS", name:"United States Army Special Forces", tier:"A", role:"Unconventional warfare and partner-force development", tags:["Recon","Direct Action","Mountain"], sel:94, multi:95, env:94},
      {c:"North America", country:"United States", code:"75 RGR", name:"75th Ranger Regiment", tier:"A", role:"Large-scale direct action and airfield seizure", tags:["Direct Action","Airborne","Urban"], sel:93, multi:92, env:91},
      {c:"North America", country:"United States", code:"MARSOC", name:"Marine Raider Regiment", tier:"A", role:"Expeditionary special operations", tags:["Direct Action","Recon","Maritime"], sel:92, multi:93, env:93},
      {c:"North America", country:"Canada", code:"JTF2", name:"Joint Task Force 2", tier:"A", role:"Strategic counter-terrorism and hostage rescue", tags:["Counter Terror","Hostage Rescue","Arctic"], sel:95, multi:94, env:96},
      {c:"North America", country:"Canada", code:"CSOR", name:"Canadian Special Operations Regiment", tier:"A", role:"Expeditionary direct action and special reconnaissance", tags:["Direct Action","Recon","Arctic"], sel:91, multi:91, env:95},
      {c:"North America", country:"Mexico", code:"FES", name:"Fuerzas Especiales", tier:"B", role:"Counter-narcotics and high-risk operations", tags:["Urban","Counter Terror","Direct Action"], sel:87, multi:84, env:88},
      {c:"North America", country:"Mexico", code:"FER", name:"Fuerza Especial de Reacción", tier:"B", role:"Rapid-response counter-terror operations", tags:["Counter Terror","Urban","Hostage Rescue"], sel:86, multi:84, env:86},

      {c:"Europe", country:"United Kingdom", code:"SAS", name:"Special Air Service", tier:"S", role:"Strategic reconnaissance and counter-terrorism", tags:["Recon","Counter Terror","Direct Action"], sel:99, multi:99, env:98},
      {c:"Europe", country:"United Kingdom", code:"SBS", name:"Special Boat Service", tier:"S", role:"Maritime special operations and coastal reconnaissance", tags:["Maritime","Recon","Counter Terror"], sel:98, multi:98, env:98},
      {c:"Europe", country:"France", code:"GIGN", name:"Groupe d'intervention de la Gendarmerie nationale", tier:"S", role:"Precision hostage rescue and counter-terror intervention", tags:["Hostage Rescue","Counter Terror","Urban"], sel:96, multi:94, env:93},
      {c:"Europe", country:"Germany", code:"KSK", name:"Kommando Spezialkräfte", tier:"A", role:"Military special operations and strategic reconnaissance", tags:["Recon","Direct Action","Counter Terror"], sel:94, multi:94, env:94},
      {c:"Europe", country:"Germany", code:"GSG 9", name:"Grenzschutzgruppe 9", tier:"A", role:"Federal police counter-terror and hostage rescue", tags:["Counter Terror","Hostage Rescue","Urban"], sel:93, multi:91, env:90},
      {c:"Europe", country:"Poland", code:"GROM", name:"Jednostka Wojskowa GROM", tier:"A", role:"NATO special missions and maritime counter-terror", tags:["Counter Terror","Maritime","Direct Action"], sel:95, multi:95, env:94},
      {c:"Europe", country:"Italy", code:"GIS", name:"Gruppo di Intervento Speciale", tier:"A", role:"Urban counter-terror and close-quarters intervention", tags:["Urban","Counter Terror","Hostage Rescue"], sel:92, multi:90, env:89},
      {c:"Europe", country:"Italy", code:"COL MOSCHIN", name:"9th Paratroopers Assault Regiment", tier:"A", role:"Special reconnaissance and airborne assault", tags:["Recon","Airborne","Direct Action"], sel:92, multi:92, env:93},
      {c:"Europe", country:"Norway", code:"FSK", name:"Forsvarets Spesialkommando", tier:"B", role:"Arctic warfare and counter-terror response", tags:["Arctic","Mountain","Counter Terror"], sel:94, multi:91, env:98},
      {c:"Europe", country:"Sweden", code:"SOG", name:"Särskilda operationsgruppen", tier:"B", role:"Nordic special operations and reconnaissance", tags:["Recon","Arctic","Direct Action"], sel:92, multi:91, env:96},

      {c:"Asia", country:"Israel", code:"MATKAL", name:"Sayeret Matkal", tier:"S", role:"Strategic reconnaissance and intelligence-led missions", tags:["Recon","Counter Terror","Hostage Rescue"], sel:98, multi:98, env:96},
      {c:"Asia", country:"Israel", code:"S'13", name:"Shayetet 13", tier:"S", role:"Naval commando and maritime counter-terror operations", tags:["Maritime","Counter Terror","Direct Action"], sel:98, multi:97, env:97},
      {c:"Asia", country:"Russia", code:"ALPHA", name:"Alpha Group", tier:"A", role:"High-risk counter-terror and hostage rescue", tags:["Counter Terror","Hostage Rescue","Urban"], sel:95, multi:92, env:92},
      {c:"Asia", country:"Russia", code:"VYMPEL", name:"Vympel Directorate", tier:"A", role:"Strategic infrastructure and deep special missions", tags:["Recon","Counter Terror","Direct Action"], sel:95, multi:94, env:94},
      {c:"Asia", country:"India", code:"MARCOS", name:"Marine Commandos", tier:"A", role:"Maritime warfare and amphibious special operations", tags:["Maritime","Direct Action","Recon"], sel:94, multi:93, env:96},
      {c:"Asia", country:"India", code:"PARA SF", name:"Para Special Forces", tier:"A", role:"Deep strike and high-altitude warfare", tags:["Mountain","Direct Action","Recon"], sel:94, multi:94, env:97},
      {c:"Asia", country:"Pakistan", code:"SSG", name:"Special Service Group", tier:"A", role:"Mountain warfare and direct action", tags:["Mountain","Direct Action","Counter Terror"], sel:95, multi:93, env:97},
      {c:"Asia", country:"Japan", code:"SFGp", name:"Special Forces Group", tier:"A", role:"Counter-terrorism and national special missions", tags:["Counter Terror","Urban","Recon"], sel:91, multi:90, env:92},
      {c:"Asia", country:"South Korea", code:"707 SMG", name:"707th Special Mission Group", tier:"B", role:"Counter-terror intervention and urban assault", tags:["Counter Terror","Urban","Hostage Rescue"], sel:92, multi:89, env:89},
      {c:"Asia", country:"Thailand", code:"THAI SEAL", name:"Royal Thai Navy SEALs", tier:"B", role:"Maritime reconnaissance and amphibious operations", tags:["Maritime","Recon","Jungle"], sel:90, multi:89, env:95},

      {c:"Africa", country:"South Africa", code:"RECCES", name:"South African Special Forces Brigade", tier:"S", role:"Long-range reconnaissance and bush warfare", tags:["Recon","Jungle","Direct Action"], sel:96, multi:94, env:98},
      {c:"Africa", country:"Egypt", code:"UNIT 777", name:"Unit 777", tier:"A", role:"Counter-terror and hostage intervention", tags:["Counter Terror","Hostage Rescue","Urban"], sel:91, multi:88, env:88},
      {c:"Africa", country:"Egypt", code:"UNIT 999", name:"Unit 999", tier:"A", role:"Strategic military special operations", tags:["Direct Action","Recon","Desert"], sel:91, multi:90, env:94},
      {c:"Africa", country:"Morocco", code:"GCP", name:"Groupement des Commandos Parachutistes", tier:"A", role:"Airborne commando and desert operations", tags:["Airborne","Desert","Direct Action"], sel:89, multi:88, env:94},
      {c:"Africa", country:"Nigeria", code:"NASF", name:"Nigerian Army Special Forces", tier:"B", role:"Counter-insurgency and regional combat operations", tags:["Jungle","Direct Action","Urban"], sel:86, multi:84, env:91},
      {c:"Africa", country:"Kenya", code:"RSF", name:"Ranger Strike Force", tier:"B", role:"Counter-terror and rapid strike operations", tags:["Counter Terror","Direct Action","Urban"], sel:87, multi:85, env:90},
      {c:"Africa", country:"Algeria", code:"GIS", name:"Special Intervention Group", tier:"B", role:"Desert counter-terror and crisis response", tags:["Desert","Counter Terror","Hostage Rescue"], sel:89, multi:87, env:96},
      {c:"Africa", country:"Tunisia", code:"BSI", name:"Brigade Spéciale d'Intervention", tier:"B", role:"Urban intervention and counter-terror operations", tags:["Urban","Counter Terror","Hostage Rescue"], sel:86, multi:84, env:86},
      {c:"Africa", country:"Uganda", code:"SFC", name:"Special Forces Command", tier:"B", role:"Regional security and rapid-response missions", tags:["Direct Action","Jungle","Urban"], sel:86, multi:84, env:90},
      {c:"Africa", country:"Ghana", code:"SBS", name:"Special Boat Squadron", tier:"B", role:"Maritime security and coastal special operations", tags:["Maritime","Recon","Direct Action"], sel:84, multi:83, env:91},

      {c:"South America", country:"Brazil", code:"COPESP", name:"Comando de Operações Especiais", tier:"S", role:"Jungle warfare and strategic special operations", tags:["Jungle","Recon","Direct Action"], sel:96, multi:95, env:99},
      {c:"South America", country:"Brazil", code:"BOPE", name:"Batalhão de Operações Policiais Especiais", tier:"S", role:"High-risk urban combat and tactical policing", tags:["Urban","Counter Terror","Direct Action"], sel:94, multi:90, env:91},
      {c:"South America", country:"Colombia", code:"AFEAU", name:"Agrupación de Fuerzas Especiales Antiterroristas Urbanas", tier:"A", role:"Urban counter-terror and counter-guerrilla operations", tags:["Urban","Counter Terror","Jungle"], sel:94, multi:93, env:97},
      {c:"South America", country:"Chile", code:"BOE", name:"Brigada de Operaciones Especiales", tier:"A", role:"Mountain and high-altitude special operations", tags:["Mountain","Recon","Direct Action"], sel:91, multi:91, env:97},
      {c:"South America", country:"Peru", code:"CEV", name:"Comando Especial VRAEM", tier:"A", role:"Jungle warfare and counter-insurgency missions", tags:["Jungle","Direct Action","Recon"], sel:90, multi:89, env:98},
      {c:"South America", country:"Argentina", code:"601", name:"Compañía de Comandos 601", tier:"B", role:"Reconnaissance and airborne commando operations", tags:["Recon","Airborne","Mountain"], sel:89, multi:88, env:93},
      {c:"South America", country:"Uruguay", code:"CEA", name:"Compañía Especial Antiterrorista", tier:"B", role:"National counter-terror response", tags:["Counter Terror","Urban","Hostage Rescue"], sel:85, multi:83, env:84},
      {c:"South America", country:"Venezuela", code:"BAE", name:"Brigada de Acciones Especiales", tier:"B", role:"Special action and internal security missions", tags:["Direct Action","Urban","Recon"], sel:86, multi:84, env:88},
      {c:"South America", country:"Ecuador", code:"GOE", name:"Grupo de Operaciones Especiales", tier:"B", role:"Jungle and tactical police operations", tags:["Jungle","Urban","Counter Terror"], sel:86, multi:84, env:94},
      {c:"South America", country:"Paraguay", code:"CODI", name:"Comando de Operaciones de Defensa Interna", tier:"B", role:"Internal defense and counter-insurgency operations", tags:["Jungle","Direct Action","Recon"], sel:84, multi:82, env:91},

      {c:"Oceania", country:"Australia", code:"SASR", name:"Special Air Service Regiment", tier:"S", role:"Long-range reconnaissance and strategic direct action", tags:["Recon","Direct Action","Desert"], sel:98, multi:97, env:98},
      {c:"Oceania", country:"Australia", code:"2 CDO", name:"2nd Commando Regiment", tier:"S", role:"Counter-terror and expeditionary direct action", tags:["Counter Terror","Direct Action","Urban"], sel:96, multi:95, env:95},
      {c:"Oceania", country:"New Zealand", code:"NZSAS", name:"New Zealand Special Air Service", tier:"A", role:"SAS-style reconnaissance and counter-terror missions", tags:["Recon","Counter Terror","Mountain"], sel:96, multi:95, env:97},
      {c:"Oceania", country:"Fiji", code:"CRWU", name:"Counter Revolutionary Warfare Unit", tier:"A", role:"Commando and national crisis-response missions", tags:["Counter Terror","Jungle","Direct Action"], sel:88, multi:86, env:93},
      {c:"Oceania", country:"Papua New Guinea", code:"LRRU", name:"Long Range Reconnaissance Unit", tier:"B", role:"Jungle reconnaissance and border operations", tags:["Jungle","Recon","Direct Action"], sel:84, multi:82, env:97},
      {c:"Oceania", country:"Tonga", code:"TDS SOF", name:"Tonga Defence Services Special Operations", tier:"B", role:"Amphibious and island security operations", tags:["Maritime","Direct Action","Recon"], sel:82, multi:80, env:92},
      {c:"Oceania", country:"Vanuatu", code:"SRU", name:"Special Response Unit", tier:"B", role:"Police tactical response and island security", tags:["Urban","Counter Terror","Maritime"], sel:78, multi:76, env:87},
      {c:"Oceania", country:"Solomon Islands", code:"PRT", name:"Police Response Team", tier:"B", role:"Tactical policing and public-order response", tags:["Urban","Counter Terror","Maritime"], sel:77, multi:75, env:87},
      {c:"Oceania", country:"Samoa", code:"TRG", name:"Tactical Response Group", tier:"B", role:"Island tactical response and protective security", tags:["Urban","Counter Terror","Maritime"], sel:76, multi:74, env:88},
      {c:"Oceania", country:"Micronesia", code:"MRU", name:"Maritime Response Unit", tier:"B", role:"Maritime security and coastal response", tags:["Maritime","Recon","Direct Action"], sel:75, multi:73, env:90}
    ];

const flags = {
  "United States":"🇺🇸","Canada":"🇨🇦","Mexico":"🇲🇽","United Kingdom":"🇬🇧","France":"🇫🇷","Germany":"🇩🇪","Poland":"🇵🇱","Italy":"🇮🇹","Norway":"🇳🇴","Sweden":"🇸🇪","Israel":"🇮🇱","Russia":"🇷🇺","India":"🇮🇳","Pakistan":"🇵🇰","Japan":"🇯🇵","South Korea":"🇰🇷","Thailand":"🇹🇭","South Africa":"🇿🇦","Egypt":"🇪🇬","Morocco":"🇲🇦","Nigeria":"🇳🇬","Kenya":"🇰🇪","Algeria":"🇩🇿","Tunisia":"🇹🇳","Uganda":"🇺🇬","Ghana":"🇬🇭","Brazil":"🇧🇷","Colombia":"🇨🇴","Chile":"🇨🇱","Peru":"🇵🇪","Argentina":"🇦🇷","Uruguay":"🇺🇾","Venezuela":"🇻🇪","Ecuador":"🇪🇨","Paraguay":"🇵🇾","Australia":"🇦🇺","New Zealand":"🇳🇿","Fiji":"🇫🇯","Papua New Guinea":"🇵🇬","Tonga":"🇹🇴","Vanuatu":"🇻🇺","Solomon Islands":"🇸🇧","Samoa":"🇼🇸","Micronesia":"🇫🇲"
};

const iso2 = {
  "United States":"US","Canada":"CA","Mexico":"MX","United Kingdom":"GB","France":"FR","Germany":"DE","Poland":"PL","Italy":"IT","Norway":"NO","Sweden":"SE","Israel":"IL","Russia":"RU","India":"IN","Pakistan":"PK","Japan":"JP","South Korea":"KR","Thailand":"TH","South Africa":"ZA","Egypt":"EG","Morocco":"MA","Nigeria":"NG","Kenya":"KE","Algeria":"DZ","Tunisia":"TN","Uganda":"UG","Ghana":"GH","Brazil":"BR","Colombia":"CO","Chile":"CL","Peru":"PE","Argentina":"AR","Uruguay":"UY","Venezuela":"VE","Ecuador":"EC","Paraguay":"PY","Australia":"AU","New Zealand":"NZ","Fiji":"FJ","Papua New Guinea":"PG","Tonga":"TO","Vanuatu":"VU","Solomon Islands":"SB","Samoa":"WS","Micronesia":"FM"
};

const commons = (file, width = 1600) =>
  `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}?width=${width}`;

const confidence = {
  verified: ["verified", "VERIFIED / OFFICIAL"],
  documented: ["documented", "PUBLICLY DOCUMENTED"],
  reported: ["reported", "COMMONLY REPORTED"],
  historical: ["historical", "HISTORICAL / PERIOD-SPECIFIC"],
};

const weapon = (model, type, note, level = "reported") => ({
  model,
  type,
  note,
  confidence: confidence[level][0],
  confidenceLabel: confidence[level][1],
});

const detailed = {
  "DEVGRU": {
    slug: "devgru",
    founded: "1980",
    branch: "United States Navy",
    unitType: "Special mission unit / maritime counter-terrorism",
    status: "Active; detailed organization is classified",
    personnel: "Classified",
    environment: ["Maritime", "Urban", "Airborne"],
    logoUrl: commons("U.S. Navy SEALs Special Warfare insignia.png", 500),
    coverImage: commons("United States Navy SEALs 095.jpg", 1800),
    mediaStatus: "representative",
    history: { summary: "DEVGRU เป็นหน่วยภารกิจพิเศษของกองทัพเรือสหรัฐฯ ที่พัฒนาจากแนวคิดการต่อต้านการก่อการร้ายทางทะเลหลังเหตุการณ์ปลายทศวรรษ 1970 ภารกิจ โครงสร้าง และอุปกรณ์จำนวนมากไม่เปิดเผยต่อสาธารณะ จึงควรแยกข้อมูลของ U.S. Navy SEAL โดยรวมออกจากข้อมูลที่ยืนยันเฉพาะ DEVGRU" },
    equipment: {
      dataStatus: "publicly reported / mission dependent",
      primary: [
        weapon("HK416 family", "5.56×45 mm carbine", "แพลตฟอร์มที่ถูกเชื่อมโยงกับหน่วยภารกิจพิเศษสหรัฐฯ อย่างกว้างขวาง แต่รูปแบบและชุดแต่งเปลี่ยนตามยุค", "reported"),
        weapon("SIG MCX family", "Modular carbine", "มีการรายงานการใช้งานในชุมชนหน่วยปฏิบัติการพิเศษสหรัฐฯ การระบุรุ่นย่อยกับภารกิจเฉพาะมักไม่เปิดเผย", "reported"),
      ],
      sidearms: [
        weapon("Glock 19", "9×19 mm pistol", "ปืนพกที่พบอย่างแพร่หลายในหน่วยปฏิบัติการพิเศษสหรัฐฯ", "documented"),
        weapon("SIG Sauer P226", "9×19 mm pistol", "มีความเกี่ยวข้องกับ U.S. Navy SEAL ในอดีตและช่วงเวลาหนึ่ง ไม่ควรตีความว่าเป็นอาวุธหลักปัจจุบันของทุกทีม", "historical"),
      ],
      blades: [weapon("Mission-selected fighting / utility knife", "Knife / tool", "ไม่มีมีดรุ่นเดียวที่ยืนยันว่าเป็นมาตรฐานถาวรของทุกทีม", "reported")],
      support: [weapon("Suppressors, laser aiming modules and night optics", "Mission accessories", "ชุดอุปกรณ์ขึ้นกับภารกิจและช่วงเวลา", "documented")],
    },
    uniform: {
      colors: ["Ranger green", "Coyote brown", "Mission-specific neutral colors"],
      patterns: ["MultiCam family", "Maritime / environment-specific clothing"],
      headgear: ["High-cut ballistic helmet", "Maritime helmet configurations"],
      armor: ["Modular plate carrier", "Maritime load carriage", "Night-vision compatible equipment"],
      note: "ไม่มีเครื่องแบบ DEVGRU แบบเดียวสำหรับทุกภารกิจ ภาพสาธารณะจำนวนมากเป็นภาพ Navy SEAL ทั่วไปและไม่ควรใช้ยืนยันทีมย่อยหรือช่วงเวลาโดยไม่มีบริบท",
    },
    gallery: [
      { url: commons("United States Navy SEALs 095.jpg", 1500), status: "representative", caption: "ภาพ U.S. Navy SEAL จากแหล่งสาธารณะ ใช้เป็นภาพประกอบชุมชน Naval Special Warfare ไม่ใช่การยืนยันว่าเป็น DEVGRU" },
      { url: commons("US Navy SEALs conducting VBSS exercise.jpg", 1500), status: "representative", caption: "ภาพฝึก Visit, Board, Search and Seizure ของ U.S. Navy SEAL" },
      { url: commons("United States Navy SEALs 605.jpg", 1500), status: "representative", caption: "ภาพ U.S. Navy SEAL ในบริบทการฝึก" },
    ],
    timeline: [
      { year: "1980", title: "Formation era", description: "ก่อตั้งในบริบทการพัฒนาขีดความสามารถต่อต้านการก่อการร้ายของสหรัฐฯ" },
      { year: "1980s–90s", title: "Capability expansion", description: "พัฒนาความสามารถทางทะเล การช่วยตัวประกัน และปฏิบัติการภารกิจพิเศษ" },
      { year: "2001+", title: "Global counter-terror era", description: "มีบทบาทในยุคปฏิบัติการต่อต้านการก่อการร้ายทั่วโลก โดยรายละเอียดจำนวนมากยังเป็นความลับ" },
      { year: "Today", title: "Special mission role", description: "ยังคงเป็นองค์ประกอบระดับสูงของระบบปฏิบัติการพิเศษสหรัฐฯ" },
    ],
    sources: [
      { title: "U.S. Naval Special Warfare Command", note: "ใช้ตรวจสอบบริบทของ Naval Special Warfare โดยรวม ไม่ใช่รายละเอียดลับของ DEVGRU", url: "https://www.nsw.navy.mil/" },
      { title: "Wikimedia Commons — U.S. Navy SEAL imagery", note: "แหล่งภาพสาธารณะสำหรับงานต้นแบบ โดยต้องตรวจสอบหน้าลิขสิทธิ์รายไฟล์", url: "https://commons.wikimedia.org/wiki/Category:United_States_Navy_SEALs" },
    ],
  },
  "DELTA": {
    slug: "delta-force",
    founded: "1977",
    branch: "United States Army",
    unitType: "Special mission unit / counter-terrorism",
    status: "Active; official details are limited",
    personnel: "Classified",
    environment: ["Urban", "Airborne", "Global expeditionary"],
    history: { summary: "Delta Force หรือชื่อที่สาธารณะมักใช้เรียก 1st SFOD-D เป็นหน่วยภารกิจพิเศษของกองทัพบกสหรัฐฯ ที่จัดตั้งขึ้นเพื่อรับมือการก่อการร้าย การช่วยตัวประกัน และเป้าหมายที่มีความสำคัญสูง ข้อมูลทางการเกี่ยวกับโครงสร้างและยุทโธปกรณ์มีจำกัดมาก" },
    equipment: {
      dataStatus: "publicly reported / classified in detail",
      primary: [weapon("HK416 family", "5.56×45 mm carbine", "เชื่อมโยงกับหน่วยภารกิจพิเศษสหรัฐฯ อย่างกว้างขวาง", "reported"), weapon("M4A1 family", "5.56×45 mm carbine", "แพลตฟอร์มมาตรฐานที่ปรับแต่งได้หลากหลาย", "documented")],
      sidearms: [weapon("Glock 19", "9×19 mm pistol", "ปืนพกที่มีการใช้งานแพร่หลายใน SOF สหรัฐฯ", "documented")],
      blades: [weapon("Operator-selected utility knife", "Knife / multitool", "ไม่มีรุ่นมาตรฐานสาธารณะที่ยืนยันสำหรับทั้งหน่วย", "reported")],
      support: [weapon("Night-vision and breaching systems", "Mission equipment", "อุปกรณ์เสริมเปลี่ยนตามภารกิจและทีม", "reported")],
    },
    uniform: { colors: ["Ranger green", "Coyote brown", "Civilian-compatible neutral colors"], patterns: ["MultiCam family", "Mission-specific clothing"], headgear: ["High-cut ballistic helmets", "Low-profile headgear"], armor: ["Modular plate carriers", "Low-visibility armor"], note: "หน่วยภารกิจพิเศษใช้เครื่องแต่งกายตามบริบท ตั้งแต่ชุดรบเต็มรูปแบบจนถึงชุด low-visibility จึงไม่ควรผูกหน่วยกับลายพรางเดียว" },
    gallery: [],
    timeline: [
      { year: "1977", title: "Formation", description: "จัดตั้งเพื่อพัฒนาขีดความสามารถต่อต้านการก่อการร้ายของกองทัพบกสหรัฐฯ" },
      { year: "1980s", title: "Early special missions", description: "เข้าสู่ยุคปฏิบัติการพิเศษและการพัฒนาหลักนิยมช่วยตัวประกัน" },
      { year: "2001+", title: "Counter-terror operations", description: "มีบทบาทในปฏิบัติการต่อต้านการก่อการร้ายและภารกิจเป้าหมายสำคัญ" },
      { year: "Today", title: "Classified readiness", description: "รายละเอียดปัจจุบันยังไม่เปิดเผยต่อสาธารณะ" },
    ],
    sources: [{ title: "U.S. Army Special Operations context", note: "ใช้เป็นบริบทของระบบปฏิบัติการพิเศษกองทัพบก ไม่ใช่การยืนยันรายละเอียดภายในหน่วย", url: "https://www.socom.mil/" }],
  },
  "SAS": {
    slug: "british-sas",
    founded: "1941",
    branch: "British Army",
    unitType: "Special forces / strategic reconnaissance",
    status: "Active",
    personnel: "Not publicly confirmed",
    environment: ["Desert", "Urban", "Mountain", "Global"],
    logoUrl: commons("UK SAS (badge).svg", 500),
    history: { summary: "Special Air Service เริ่มต้นในสงครามโลกครั้งที่สองจากแนวคิดหน่วยขนาดเล็กที่โจมตีลึกหลังแนวข้าศึก ต่อมาพัฒนาเป็นต้นแบบสำคัญของหน่วยรบพิเศษสมัยใหม่ ครอบคลุมการลาดตระเวนเชิงยุทธศาสตร์ การต่อต้านการก่อการร้าย และการสนับสนุนกำลังพันธมิตร" },
    equipment: {
      dataStatus: "publicly documented / period dependent",
      primary: [weapon("L119A2 / C8 family", "5.56×45 mm carbine", "แพลตฟอร์มคาร์บินที่เชื่อมโยงกับ UK Special Forces ในข้อมูลสาธารณะ", "documented"), weapon("HK MP5 family", "9×19 mm submachine gun", "มีชื่อเสียงจากภารกิจต่อต้านการก่อการร้ายในอดีต ปัจจุบันไม่ควรถือว่าเป็นแพลตฟอร์มหลักทุกภารกิจ", "historical")],
      sidearms: [weapon("Glock 17", "9×19 mm pistol", "ปืนพกประจำการของกองทัพสหราชอาณาจักรและเชื่อมโยงกับ UKSF", "documented"), weapon("SIG Sauer P226", "9×19 mm pistol", "มีความเกี่ยวข้องกับ UK special forces ในช่วงเวลาก่อนหน้า", "historical")],
      blades: [weapon("Fairbairn–Sykes fighting knife", "Historic fighting knife", "เป็นสัญลักษณ์และมรดกทางประวัติศาสตร์ ไม่ได้หมายความว่าเป็นมีดปฏิบัติการมาตรฐานปัจจุบัน", "historical")],
      support: [weapon("Night vision, suppressors and breaching equipment", "Mission accessories", "การจัดชุดขึ้นกับบทบาทและภารกิจ", "documented")],
    },
    uniform: { colors: ["Ranger green", "Coyote / tan", "Black for historic CT imagery"], patterns: ["Multi-Terrain Pattern", "Mission-specific camouflage"], headgear: ["High-cut ballistic helmet", "Boonie / patrol headgear", "Respiratory protection for CT"], armor: ["Modular plate carriers", "Load-bearing systems", "Low-visibility configurations"], note: "ภาพชุดดำและหน้ากากป้องกันแก๊สเป็นภาพจำทางประวัติศาสตร์ของงานต่อต้านการก่อการร้าย ไม่ใช่เครื่องแบบมาตรฐานสำหรับทุกภารกิจของ SAS" },
    gallery: [],
    timeline: [
      { year: "1941", title: "Founded in North Africa", description: "เริ่มจากหน่วยจู่โจมขนาดเล็กในสงครามทะเลทราย" },
      { year: "Post-war", title: "Re-formed and expanded", description: "พัฒนาบทบาทลาดตระเวน สงครามนอกแบบ และสนับสนุนพันธมิตร" },
      { year: "1980", title: "Public CT profile", description: "เหตุการณ์สถานทูตอิหร่านทำให้ขีดความสามารถต่อต้านการก่อการร้ายเป็นที่รู้จักทั่วโลก" },
      { year: "Today", title: "Global special forces role", description: "ยังคงเป็นองค์ประกอบสำคัญของ United Kingdom Special Forces" },
    ],
    sources: [
      { title: "National Army Museum — SAS historical context", note: "ใช้สำหรับประวัติการก่อตั้งและพัฒนาการในภาพรวม", url: "https://www.nam.ac.uk/explore/sas" },
      { title: "Wikimedia Commons — UK SAS badge", note: "ไฟล์ตราสัญลักษณ์สำหรับงานต้นแบบ ต้องตรวจเงื่อนไขเครื่องหมายราชการแยกจากลิขสิทธิ์ไฟล์", url: "https://commons.wikimedia.org/wiki/File:UK_SAS_(badge).svg" },
    ],
  },
  "SBS": {
    slug: "british-sbs",
    founded: "World War II lineage",
    branch: "Royal Marines / United Kingdom Special Forces",
    unitType: "Maritime special forces",
    status: "Active",
    personnel: "Not publicly confirmed",
    environment: ["Maritime", "Coastal", "Urban"],
    history: { summary: "Special Boat Service เป็นองค์ประกอบทางทะเลของ United Kingdom Special Forces มีรากจากหน่วยเรือและการจู่โจมชายฝั่งในสงครามโลกครั้งที่สอง ปัจจุบันเน้นการแทรกซึมทางน้ำ การลาดตระเวนชายฝั่ง และภารกิจต่อต้านการก่อการร้ายทางทะเล" },
    equipment: { dataStatus: "publicly reported / mission dependent", primary: [weapon("L119A2 / C8 family", "5.56×45 mm carbine", "แพลตฟอร์มที่เชื่อมโยงกับ UKSF", "documented")], sidearms: [weapon("Glock 17", "9×19 mm pistol", "แพลตฟอร์มปืนพกของกองทัพสหราชอาณาจักร", "documented")], blades: [weapon("Dive / utility knife", "Maritime tool", "ประเภทและรุ่นขึ้นกับภารกิจดำน้ำและงานทางทะเล", "reported")], support: [weapon("Closed-circuit diving systems", "Maritime insertion equipment", "อุปกรณ์สำคัญของภารกิจทางน้ำ แต่รายละเอียดรุ่นย่อยไม่เปิดเผย", "reported")] },
    uniform: { colors: ["Ranger green", "Coyote", "Maritime black / dark neutral"], patterns: ["Multi-Terrain Pattern", "Maritime over-garments"], headgear: ["High-cut helmet", "Diving headgear"], armor: ["Maritime plate carrier", "Flotation-compatible load carriage"], note: "ชุดและอุปกรณ์ของ SBS เปลี่ยนอย่างมากระหว่างการดำน้ำ การขึ้นเรือ และภารกิจบนบก" },
    gallery: [],
    timeline: [{year:"WWII",title:"Maritime raiding lineage",description:"มีรากจากหน่วยเรือขนาดเล็กและการจู่โจมชายฝั่ง"},{year:"Post-war",title:"Special boat capability",description:"พัฒนาการลาดตระเวนและการแทรกซึมทางน้ำ"},{year:"Modern era",title:"Maritime counter-terrorism",description:"ขยายบทบาทสู่การต่อต้านการก่อการร้ายและภารกิจร่วม"},{year:"Today",title:"UKSF maritime component",description:"ดำรงบทบาทหน่วยรบพิเศษทางทะเลของสหราชอาณาจักร"}],
    sources: [{ title: "Royal Navy — Special Boat Service overview", note: "ข้อมูลสาธารณะเกี่ยวกับบทบาททางทะเลในภาพรวม", url: "https://www.royalnavy.mod.uk/organisation/units-and-squadrons/special-boat-service" }],
  },
  "GIGN": {
    slug: "gign",
    founded: "1973–1974 formation era",
    branch: "French National Gendarmerie",
    unitType: "National counter-terrorism and intervention unit",
    status: "Active",
    personnel: "Public figures vary by organization period",
    environment: ["Urban", "Aircraft", "Maritime"],
    logoUrl: commons("Écusson région gendarmerie GIGN.svg", 500),
    coverImage: commons("GIGN5 Domenjod 160316.jpg", 1800),
    mediaStatus: "verified",
    history: { summary: "GIGN เป็นหน่วยแทรกแซงระดับชาติของ French National Gendarmerie จัดตั้งขึ้นหลังเหตุการณ์ก่อการร้ายในยุโรปช่วงต้นทศวรรษ 1970 มีชื่อเสียงด้านการช่วยตัวประกัน การต่อต้านการก่อการร้าย การเจรจา และการเข้าควบคุมยานพาหนะหรืออากาศยาน" },
    equipment: {
      dataStatus: "publicly documented / role dependent",
      primary: [weapon("HK416 family", "5.56×45 mm carbine", "ปรากฏในข้อมูลและภาพสาธารณะของหน่วยแทรกแซงฝรั่งเศส", "documented"), weapon("HK MP5 family", "9×19 mm submachine gun", "แพลตฟอร์มที่มีประวัติยาวนานในงานต่อต้านการก่อการร้าย", "historical")],
      sidearms: [weapon("Glock 17 / 19 family", "9×19 mm pistol", "พบในภาพและข้อมูลสาธารณะของหน่วยตำรวจยุทธวิธี", "documented"), weapon("Manurhin MR 73", ".357 Magnum revolver", "อาวุธที่มีความเชื่อมโยงทางประวัติศาสตร์และวัฒนธรรมกับ GIGN", "historical")],
      blades: [weapon("Utility / rescue knife", "Rescue tool", "ใช้เป็นเครื่องมือช่วยเหลือและงานอเนกประสงค์ รุ่นแตกต่างกันได้", "reported")],
      support: [weapon("Ballistic shields and breaching systems", "Intervention equipment", "ใช้ในงานช่วยตัวประกันและการเข้าควบคุมพื้นที่", "documented")],
    },
    uniform: { colors: ["Dark navy", "Black", "Ranger green"], patterns: ["Solid intervention uniforms", "Camouflage for field roles"], headgear: ["Ballistic helmet", "Protective visor", "Communication headset"], armor: ["Heavy intervention armor", "Modular plate carrier", "Ballistic shield teams"], note: "เครื่องแบบแตกต่างระหว่างหน่วยจู่โจม งานคุ้มกัน งานภาคสนาม และช่วงเวลาขององค์กร" },
    gallery: [{ url: commons("GIGN5 Domenjod 160316.jpg", 1500), status: "verified", caption: "ภาพ GIGN ที่ระบุหน่วยในชื่อไฟล์สาธารณะบน Wikimedia Commons" }],
    timeline: [{year:"1973–74",title:"Formation",description:"จัดตั้งเพื่อตอบสนองภัยก่อการร้ายและเหตุจับตัวประกัน"},{year:"1980s",title:"National intervention growth",description:"พัฒนาขีดความสามารถด้านการช่วยตัวประกันและการยิงแม่นยำ"},{year:"1994",title:"Aircraft intervention era",description:"ภารกิจบนอากาศยานทำให้หน่วยเป็นที่รู้จักในระดับโลก"},{year:"Today",title:"Integrated national capability",description:"ปฏิบัติภารกิจแทรกแซง คุ้มกัน สังเกตการณ์ และต่อต้านการก่อการร้าย"}],
    sources: [{ title: "Gendarmerie Nationale — GIGN", note: "แหล่งข้อมูลทางการสำหรับบทบาทและโครงสร้างสาธารณะ", url: "https://www.gendarmerie.interieur.gouv.fr/gign" }, { title: "Wikimedia Commons — GIGN media", note: "ใช้สำหรับภาพในต้นแบบและตรวจใบอนุญาตรายไฟล์", url: "https://commons.wikimedia.org/wiki/Category:Groupe_d%27intervention_de_la_Gendarmerie_nationale" }],
  },
  "GROM": {
    slug: "grom",
    founded: "1990",
    branch: "Polish Special Forces",
    unitType: "Special mission and counter-terrorism unit",
    status: "Active",
    personnel: "Not publicly confirmed",
    environment: ["Urban", "Maritime", "Airborne"],
    logoUrl: commons("Odznaka Grom.JPG", 500),
    coverImage: commons("GROM with Navy SEALs 01.jpg", 1800),
    mediaStatus: "verified",
    history: { summary: "Jednostka Wojskowa GROM ก่อตั้งในปี 1990 เพื่อให้โปแลนด์มีหน่วยตอบสนองภารกิจต่อต้านการก่อการร้ายและช่วยเหลือพลเมืองในต่างประเทศ หน่วยพัฒนาความสามารถทั้งทางบก ทางทะเล และทางอากาศ พร้อมทำงานร่วมกับพันธมิตร NATO อย่างใกล้ชิด" },
    equipment: { dataStatus: "public imagery and reporting", primary: [weapon("HK416 family", "5.56×45 mm carbine", "ปรากฏในภาพและข้อมูลสาธารณะของ GROM", "documented"), weapon("FN SCAR family", "Modular rifle", "พบในบริบท Polish special operations และภาพสาธารณะบางช่วง", "reported")], sidearms: [weapon("Glock 17 family", "9×19 mm pistol", "แพลตฟอร์มที่พบในหน่วยยุทธวิธีโปแลนด์", "reported")], blades: [weapon("GROM-pattern commemorative / utility knives", "Knife", "มีมีดที่เชื่อมโยงกับชื่อหน่วยในเชิงวัฒนธรรม แต่การใช้งานภาคสนามจริงขึ้นกับผู้ปฏิบัติและภารกิจ", "reported")], support: [weapon("Night optics, suppressors and maritime equipment", "Mission accessories", "หน่วยรองรับภารกิจหลายสภาพแวดล้อม", "documented")] },
    uniform: { colors: ["Ranger green", "Coyote brown", "Black"], patterns: ["MultiCam family", "Polish camouflage depending on period"], headgear: ["High-cut ballistic helmets", "Maritime-compatible configurations"], armor: ["Modular plate carriers", "Mission-configurable pouches"], note: "GROM มีภาพสาธารณะหลากหลายช่วงเวลา จึงควรระบุปีและบริบทก่อนสรุปลายพรางหรือชุดอุปกรณ์" },
    gallery: [{url:commons("GROM with Navy SEALs 01.jpg",1500),status:"verified",caption:"ภาพ GROM ฝึกร่วมกับ U.S. Navy SEALs"},{url:commons("GROM with Navy SEALs 03.jpg",1500),status:"verified",caption:"ภาพการฝึกร่วมที่ระบุ GROM ในชื่อไฟล์"},{url:commons("GROM DN-SD-04-01612.JPEG",1500),status:"verified",caption:"ภาพ GROM จากคลังสาธารณะของกระทรวงกลาโหมสหรัฐฯ"}],
    timeline: [{year:"1990",title:"Formation",description:"ก่อตั้งหน่วยเพื่อรองรับภารกิจต่อต้านการก่อการร้ายและช่วยเหลือในต่างประเทศ"},{year:"1990s",title:"International integration",description:"พัฒนาการฝึกและทำงานร่วมกับหน่วยพันธมิตรตะวันตก"},{year:"NATO era",title:"Joint operations",description:"ขยายขีดความสามารถทางบก ทางทะเล และทางอากาศ"},{year:"Today",title:"Polish special mission unit",description:"เป็นหนึ่งในองค์ประกอบสำคัญของ Polish Special Forces"}],
    sources: [{title:"Polish Special Forces / GROM public context",note:"ใช้ตรวจสอบบทบาทในภาพรวมของ Polish Special Forces",url:"https://www.wojsko-polskie.pl/"},{title:"Wikimedia Commons — GROM",note:"ภาพการฝึกร่วมและสัญลักษณ์สาธารณะ",url:"https://commons.wikimedia.org/wiki/Category:GROM"}],
  },
  "MATKAL": {
    slug: "sayeret-matkal",
    founded: "1957",
    branch: "Israel Defense Forces",
    unitType: "Strategic reconnaissance and special missions",
    status: "Active",
    personnel: "Classified",
    environment: ["Desert", "Urban", "Long-range reconnaissance"],
    history: { summary: "Sayeret Matkal เป็นหน่วยลาดตระเวนเชิงยุทธศาสตร์ของกองทัพอิสราเอล มีบทบาทด้านข่าวกรอง การปฏิบัติการลึก และการช่วยตัวประกันในภารกิจระดับชาติ รายละเอียดการจัดกำลังและอุปกรณ์เฉพาะภารกิจจำนวนมากไม่เปิดเผย" },
    equipment: { dataStatus: "publicly observed / mission dependent", primary: [weapon("M4 / short-barrel AR-platform family", "5.56×45 mm carbine", "แพลตฟอร์มตระกูล AR พบในกองทัพและหน่วยพิเศษอิสราเอล แต่รุ่นย่อยเปลี่ยนตามช่วงเวลา", "reported"), weapon("IWI Tavor family", "5.56×45 mm bullpup", "เป็นแพลตฟอร์มอิสราเอลที่มีการใช้งานใน IDF การระบุประจำหน่วยเฉพาะต้องดูภาพและช่วงเวลา", "reported")], sidearms: [weapon("Glock 17 / 19 family", "9×19 mm pistol", "พบทั่วไปในหน่วยบังคับใช้กฎหมายและหน่วยพิเศษอิสราเอล", "reported")], blades: [weapon("Utility / field knife", "Knife / tool", "ไม่มีรุ่นมาตรฐานสาธารณะที่ยืนยันสำหรับทั้งหน่วย", "reported")], support: [weapon("Long-range optics and intelligence equipment", "Reconnaissance systems", "บทบาทเชิงยุทธศาสตร์ทำให้ชุดอุปกรณ์ขึ้นกับภารกิจข่าวกรอง", "reported")] },
    uniform: { colors: ["Olive drab", "Ranger green", "Civilian-compatible clothing"], patterns: ["Predominantly solid IDF field colors", "Mission-specific camouflage"], headgear: ["Ballistic helmet", "Soft field headgear"], armor: ["IDF-compatible plate carriers", "Low-profile load carriage"], note: "กองทัพอิสราเอลนิยมสีภาคสนามแบบเรียบมากกว่าการผูกกับลายพรางเดียว และภารกิจลับอาจใช้เครื่องแต่งกายที่ไม่แสดงเอกลักษณ์หน่วย" },
    gallery: [],
    timeline: [{year:"1957",title:"Formation",description:"ก่อตั้งหน่วยลาดตระเวนเชิงยุทธศาสตร์"},{year:"1960s–70s",title:"Strategic missions",description:"พัฒนาบทบาทข่าวกรองและปฏิบัติการลึก"},{year:"1976",title:"Hostage-rescue legacy",description:"ยุคปฏิบัติการช่วยตัวประกันทำให้หน่วยเป็นที่รู้จักในระดับโลก"},{year:"Today",title:"National special mission role",description:"ยังคงปฏิบัติภารกิจระดับยุทธศาสตร์ของ IDF"}],
    sources: [{title:"Israel Defense Forces — public special forces context",note:"ข้อมูลสาธารณะของ IDF ใช้ได้เฉพาะส่วนที่เปิดเผย",url:"https://www.idf.il/"}],
  },
  "S'13": {
    slug: "shayetet-13",
    founded: "1949 lineage",
    branch: "Israeli Navy",
    unitType: "Naval commando",
    status: "Active",
    personnel: "Classified",
    environment: ["Maritime", "Coastal", "Urban"],
    history: { summary: "Shayetet 13 เป็นหน่วยคอมมานโดทางเรือของอิสราเอล มีบทบาทด้านการแทรกซึมทางน้ำ การโจมตีชายฝั่ง การต่อต้านการก่อการร้าย และภารกิจข่าวกรองทางทะเล รายละเอียดภารกิจและอุปกรณ์จำนวนมากไม่เปิดเผย" },
    equipment: { dataStatus: "publicly observed / classified in detail", primary: [weapon("M4 / AR-platform family", "5.56×45 mm carbine", "แพลตฟอร์มที่พบในหน่วยพิเศษอิสราเอล", "reported"), weapon("IWI X95 family", "5.56×45 mm bullpup", "แพลตฟอร์มขนาดกะทัดรัดของอิสราเอล เหมาะกับบริบททางเรือและพื้นที่จำกัด แต่การระบุประจำหน่วยต้องดูช่วงเวลา", "reported")], sidearms: [weapon("Glock family", "9×19 mm pistol", "พบทั่วไปในหน่วยพิเศษอิสราเอล", "reported")], blades: [weapon("Dive knife", "Maritime tool", "รุ่นขึ้นกับชุดดำน้ำและภารกิจ", "reported")], support: [weapon("Rebreather and maritime insertion systems", "Diving equipment", "อุปกรณ์แทรกซึมทางน้ำเป็นหัวใจของบทบาทหน่วย", "reported")] },
    uniform: { colors: ["Olive drab", "Black / dark maritime", "Ranger green"], patterns: ["Solid IDF field colors", "Maritime over-garments"], headgear: ["High-cut helmet", "Diving headgear"], armor: ["Maritime plate carrier", "Flotation-compatible systems"], note: "ภารกิจของหน่วยมีตั้งแต่ใต้น้ำจนถึงบนบก ชุดที่เห็นจึงต่างกันมากและไม่ควรสรุปจากภาพเดียว" },
    gallery: [],
    timeline: [{year:"1949",title:"Naval commando lineage",description:"พัฒนาจากกำลังทางทะเลยุคก่อตั้งรัฐอิสราเอล"},{year:"1960s–70s",title:"Maritime capability growth",description:"ขยายขีดความสามารถดำน้ำและจู่โจมชายฝั่ง"},{year:"Modern era",title:"Joint special operations",description:"ปฏิบัติภารกิจร่วมทางทะเลและบนบก"},{year:"Today",title:"Israeli naval special forces",description:"เป็นหน่วยคอมมานโดหลักของกองทัพเรืออิสราเอล"}],
    sources: [{title:"Israeli Navy public context",note:"ใช้ตรวจสอบบทบาททางทะเลที่เปิดเผยต่อสาธารณะ",url:"https://www.idf.il/en/mini-sites/israeli-navy/"}],
  },
  "THAI SEAL": {
    slug: "royal-thai-navy-seal",
    founded: "1956",
    branch: "Royal Thai Navy",
    unitType: "Naval special warfare",
    status: "Active",
    personnel: "Not publicly confirmed",
    environment: ["Maritime", "Jungle", "Coastal"],
    logoUrl: commons("Royal Thai Navy Seals Emblem.svg", 500),
    coverImage: commons("4171065 Royal Thai Navy SEAL prepares to parachute from a U.S. Air Force MC-130H Combat Talon II at U-Tapao.jpg", 1800),
    mediaStatus: "verified",
    history: { summary: "หน่วยสงครามพิเศษทางเรือของกองทัพเรือไทยพัฒนาขึ้นเพื่อรองรับการปฏิบัติการทางทะเล การลาดตระเวน การทำลายใต้น้ำ การแทรกซึม และการช่วยเหลือในสภาพแวดล้อมชายฝั่งหรือพื้นที่ทุรกันดาร ข้อมูลการจัดกำลังและบัญชีอุปกรณ์ประจำหน่วยไม่ได้เปิดเผยครบถ้วน" },
    equipment: { dataStatus: "public imagery / model verification pending", primary: [weapon("M4 / AR-platform family", "5.56×45 mm carbine", "พบแพลตฟอร์มตระกูล AR ในภาพฝึกของกองกำลังพิเศษทางเรือหลายประเทศ รวมถึงบริบทไทยบางช่วง แต่ควรตรวจภาพต้นฉบับก่อนระบุรุ่นย่อย", "reported"), weapon("HK MP5 family", "9×19 mm submachine gun", "แพลตฟอร์มที่เชื่อมโยงกับงานทางเรือและต่อต้านการก่อการร้ายในหลายช่วงเวลา การยืนยันสถานะปัจจุบันต้องมีแหล่งทางการ", "historical")], sidearms: [weapon("9 mm service pistol — model varies", "Sidearm", "ยังไม่ควรระบุรุ่นเดียวเป็นมาตรฐานของทั้งหน่วยจากข้อมูลสาธารณะที่มี", "reported")], blades: [weapon("Dive knife", "Maritime tool", "เป็นอุปกรณ์งานดำน้ำ รุ่นขึ้นกับชุดอุปกรณ์และภารกิจ", "documented")], support: [weapon("Diving, parachuting and maritime insertion equipment", "Mission systems", "ภาพสาธารณะยืนยันการฝึกทางอากาศและความสามารถทางทะเลในภาพรวม", "documented")] },
    uniform: { colors: ["Ranger green", "Black / dark maritime", "Coyote brown"], patterns: ["Woodland / jungle patterns depending on period", "Digital or mission-specific camouflage"], headgear: ["Ballistic helmet", "Boonie hat", "Diving headgear"], armor: ["Modular plate carrier", "Flotation-compatible load carriage", "Diving harness"], note: "ลายพรางและชุดอุปกรณ์ของหน่วยเปลี่ยนตามยุค พื้นที่ และการฝึกร่วม การระบุลายเฉพาะควรผูกกับปีและภาพต้นฉบับ" },
    gallery: [{url:commons("4171065 Royal Thai Navy SEAL prepares to parachute from a U.S. Air Force MC-130H Combat Talon II at U-Tapao.jpg",1500),status:"verified",caption:"ภาพ Royal Thai Navy SEAL เตรียมกระโดดร่มจาก MC-130H ระหว่างการฝึกที่อู่ตะเภา"},{url:commons("4170958 Royal Thai Navy SEAL prepares to parachute from a U.S. Air Force MC-130H Combat Talon II at U-Tapao.jpg",1500),status:"verified",caption:"ภาพการฝึกทางอากาศที่ระบุ Royal Thai Navy SEAL ในชื่อไฟล์"},{url:commons("Thail and US Navy SEALS training.jpg",1500),status:"verified",caption:"ภาพการฝึกร่วมระหว่างหน่วยไทยและ U.S. Navy SEAL ตามคำอธิบายไฟล์สาธารณะ"}],
    timeline: [{year:"1956",title:"Formation era",description:"เริ่มพัฒนาขีดความสามารถทำลายใต้น้ำและสงครามพิเศษทางเรือ"},{year:"Cold War era",title:"Capability expansion",description:"ขยายบทบาทการลาดตระเวน แทรกซึม และปฏิบัติการชายฝั่ง"},{year:"Modern era",title:"Joint training",description:"มีการฝึกร่วมด้านทางน้ำ ทางอากาศ และปฏิบัติการพิเศษกับมิตรประเทศ"},{year:"Today",title:"Royal Thai Navy special warfare",description:"ดำรงความพร้อมด้านปฏิบัติการทางทะเลและภารกิจพิเศษ"}],
    sources: [{title:"Royal Thai Navy public information",note:"ใช้ตรวจสอบข้อมูลที่กองทัพเรือเปิดเผยในภาพรวม",url:"https://www.navy.mi.th/"},{title:"Wikimedia Commons — Royal Thai Navy SEAL media",note:"แหล่งภาพการฝึกสาธารณะ ต้องตรวจคำอธิบายและใบอนุญาตรายไฟล์",url:"https://commons.wikimedia.org/wiki/Category:Naval_Special_Warfare_Command_(Thailand)"}],
  },
  "SASR": {
    slug: "australian-sasr",
    founded: "1957",
    branch: "Australian Army",
    unitType: "Special forces / strategic reconnaissance",
    status: "Active",
    personnel: "Not publicly confirmed",
    environment: ["Desert", "Maritime", "Long-range reconnaissance"],
    history: { summary: "Special Air Service Regiment ของออสเตรเลียก่อตั้งขึ้นโดยรับอิทธิพลจากแนวคิด SAS ของสหราชอาณาจักร มีบทบาทด้านลาดตระเวนระยะไกล การปฏิบัติการพิเศษ การต่อต้านการก่อการร้าย และภารกิจสนับสนุนระดับยุทธศาสตร์" },
    equipment: { dataStatus: "publicly reported / period dependent", primary: [weapon("M4 / AR-platform family", "5.56×45 mm carbine", "แพลตฟอร์มตระกูล AR มีความเกี่ยวข้องกับ Australian special operations ในข้อมูลสาธารณะ", "reported"), weapon("Australian service rifle variants", "5.56×45 mm rifle", "อาวุธประจำการทั่วไปอาจปรากฏตามช่วงเวลาและบทบาท แต่ไม่ควรสรุปเป็นอาวุธหลักของทุกทีม SASR", "reported")], sidearms: [weapon("9 mm service pistol — model varies by period", "Sidearm", "รุ่นและสถานะเปลี่ยนตามระบบจัดหา", "reported")], blades: [weapon("Field / utility knife", "Knife / tool", "เลือกตามผู้ปฏิบัติและภารกิจ", "reported")], support: [weapon("Long-range communications and surveillance systems", "Reconnaissance equipment", "สอดคล้องกับบทบาทลาดตระเวนระยะไกล", "reported")] },
    uniform: { colors: ["Ranger green", "Coyote brown", "Australian field colors"], patterns: ["Australian Multicam Camouflage Uniform family", "Mission-specific camouflage"], headgear: ["High-cut helmet", "Boonie / patrol headgear"], armor: ["Modular plate carrier", "Long-range patrol load carriage"], note: "การใช้งานมีตั้งแต่งานลาดตระเวนระยะไกลจนถึงต่อต้านการก่อการร้าย ทำให้ชุดและน้ำหนักอุปกรณ์แตกต่างกันมาก" },
    gallery: [],
    timeline: [{year:"1957",title:"Formation",description:"ก่อตั้งหน่วย SAS ของกองทัพบกออสเตรเลีย"},{year:"1960s–70s",title:"Operational development",description:"พัฒนาบทบาทลาดตระเวนและสงครามนอกแบบ"},{year:"Modern era",title:"Counter-terror and expeditionary role",description:"ขยายขีดความสามารถต่อต้านการก่อการร้ายและปฏิบัติการนอกประเทศ"},{year:"Today",title:"Australian special forces",description:"ดำรงบทบาทระดับยุทธศาสตร์ภายใต้ระบบปฏิบัติการพิเศษออสเตรเลีย"}],
    sources: [{title:"Australian Army — Special Air Service Regiment",note:"แหล่งข้อมูลทางการสำหรับประวัติและบทบาทที่เปิดเผย",url:"https://www.army.gov.au/our-people/units/special-operations-command/special-air-service-regiment"}],
  },
  "NZSAS": {
    slug: "new-zealand-sas",
    founded: "1955 lineage",
    branch: "New Zealand Army",
    unitType: "Special operations force",
    status: "Active",
    personnel: "Not publicly confirmed",
    environment: ["Mountain", "Maritime", "Expeditionary"],
    history: { summary: "New Zealand Special Air Service มีรากจากแนวคิด SAS และพัฒนาบทบาทด้านลาดตระเวน การปฏิบัติการพิเศษ การต่อต้านการก่อการร้าย และการสนับสนุนภารกิจของนิวซีแลนด์ในต่างประเทศ" },
    equipment: { dataStatus: "publicly reported / period dependent", primary: [weapon("AR-platform carbine family", "5.56×45 mm carbine", "แพลตฟอร์มสมัยใหม่ของหน่วยปฏิบัติการพิเศษ รายละเอียดรุ่นย่อยเปลี่ยนตามการจัดหา", "reported")], sidearms: [weapon("9 mm service pistol", "Sidearm", "รุ่นย่อยควรยืนยันจากข้อมูลจัดหาหรือภาพที่ลงวันที่", "reported")], blades: [weapon("Field utility knife", "Knife / tool", "อุปกรณ์ส่วนบุคคลและภารกิจ", "reported")], support: [weapon("Climbing, maritime and surveillance systems", "Mission equipment", "รองรับสภาพแวดล้อมของนิวซีแลนด์และภารกิจนอกประเทศ", "reported")] },
    uniform: { colors: ["Ranger green", "Coyote", "New Zealand field colors"], patterns: ["Multi-terrain camouflage", "Mission-specific clothing"], headgear: ["High-cut helmet", "Patrol headgear"], armor: ["Modular plate carrier", "Long-duration load carriage"], note: "การระบุเครื่องแบบควรแยกระหว่าง NZDF ทั่วไปกับ NZSAS และระบุช่วงเวลา" },
    gallery: [],
    timeline: [{year:"1955",title:"Early formation",description:"ก่อตั้งกำลัง SAS ของนิวซีแลนด์"},{year:"Post-war era",title:"Special operations growth",description:"พัฒนางานลาดตระเวนและการปฏิบัติการพิเศษ"},{year:"Modern era",title:"National CT capability",description:"ขยายบทบาทด้านการต่อต้านการก่อการร้ายและสนับสนุนต่างประเทศ"},{year:"Today",title:"NZDF special operations",description:"ดำรงบทบาทหน่วยปฏิบัติการพิเศษหลักของนิวซีแลนด์"}],
    sources: [{title:"New Zealand Defence Force — NZSAS",note:"ข้อมูลทางการเกี่ยวกับประวัติและบทบาทที่เปิดเผย",url:"https://www.nzdf.mil.nz/army/our-equipment-and-capabilities/new-zealand-special-air-service/"}],
  },
};

const detailedCountryByCode = {
  DEVGRU: "United States",
  DELTA: "United States",
  SAS: "United Kingdom",
  SBS: "United Kingdom",
  GIGN: "France",
  GROM: "Poland",
  MATKAL: "Israel",
  "S\'13": "Israel",
  "THAI SEAL": "Thailand",
  SASR: "Australia",
  NZSAS: "New Zealand",
};

const genericCapability = (unit) => ({
  cqb: unit.tags.includes("Urban") || unit.tags.includes("Counter Terror") ? 92 : 84,
  recon: unit.tags.includes("Recon") ? 95 : 84,
  mobility: unit.tags.includes("Maritime") || unit.tags.includes("Airborne") ? 94 : 86,
  environment: unit.env,
  versatility: unit.multi,
  counterTerror: unit.tags.includes("Counter Terror") ? 96 : 83,
  mental: Math.min(99, Math.round((unit.sel + unit.env) / 2)),
  joint: Math.min(98, Math.round((unit.multi + unit.env) / 2)),
});

const genericDetail = (unit) => ({
  slug: slugify(`${unit.country}-${unit.code}`),
  founded: "อยู่ระหว่างตรวจสอบ",
  branch: "หน่วยปฏิบัติการพิเศษระดับชาติ / เหล่าทัพที่เกี่ยวข้อง",
  unitType: unit.role,
  status: "Active or publicly referenced",
  personnel: "ไม่เปิดเผย / ยังไม่ยืนยัน",
  environment: unit.tags.filter((tag) => ["Maritime", "Jungle", "Mountain", "Arctic", "Urban", "Desert"].some((env) => tag.includes(env))).length
    ? unit.tags.filter((tag) => ["Maritime", "Jungle", "Mountain", "Arctic", "Urban", "Desert"].some((env) => tag.includes(env)))
    : ["Mission dependent"],
  mediaStatus: "representative",
  history: { summary: `${unit.name} เป็นหน่วยที่มีบทบาทเด่นด้าน ${unit.role.toLowerCase()} ขณะนี้โปรไฟล์อยู่ในระดับ Basic Dossier และยังต้องเพิ่มประวัติ อุปกรณ์ เครื่องแบบ และแหล่งอ้างอิงรายหน่วยก่อนเผยแพร่เป็นข้อมูลสมบูรณ์` },
  equipment: { dataStatus: "research pending", primary: [], sidearms: [], blades: [], support: [] },
  uniform: { colors: ["Mission dependent"], patterns: ["Research pending"], headgear: ["Research pending"], armor: ["Research pending"], note: "ยังไม่มีข้อมูลสาธารณะที่ผ่านการตรวจสอบเพียงพอสำหรับสรุปเครื่องแบบของหน่วยนี้" },
  gallery: [],
  timeline: [
    { year: "FOUND", title: "Formation research pending", description: "อยู่ระหว่างตรวจสอบปีจัดตั้งและหน่วยต้นสังกัด" },
    { year: "EXPAND", title: "Capability development", description: "อยู่ระหว่างรวบรวมข้อมูลพัฒนาการของหน่วย" },
    { year: "MODERN", title: "Modern role", description: unit.role },
  ],
  sources: [],
});

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const builtUnits = rawUnits.map((raw, index) => {
  const hasExpandedDetail = detailedCountryByCode[raw.code] === raw.country;
  const override = hasExpandedDetail ? detailed[raw.code] : {};
  const base = genericDetail(raw);
  const countryCode = iso2[raw.country] || "";
  const flag = flags[raw.country] || "🏳️";
  const merged = {
    ...raw,
    id: `${raw.country}::${raw.code}`,
    ...base,
    ...override,
    continent: raw.c,
    flag,
    // Backward compatible: `country` stays a string (used by the Unit Detail page);
    // `countryInfo` is the structured object consumed by CountryBadge.
    iso2: countryCode,
    countryInfo: { name: raw.country, iso2: countryCode, flagEmoji: flag, continent: raw.c },
    recordNo: index + 1,
    scores: { selection: raw.sel, versatility: raw.multi, environment: raw.env },
    capability: { ...genericCapability(raw), ...(override.capability || {}) },
    capabilities: [
      { code: "01", title: raw.tags[0] || "Special Operations", description: `ความเชี่ยวชาญหลักด้าน ${raw.tags[0] || raw.role}` },
      { code: "02", title: raw.tags[1] || "Joint Operations", description: `รองรับภารกิจ ${raw.tags[1] || "ร่วมหลายหน่วยงาน"}` },
      { code: "03", title: raw.tags[2] || "Mission Adaptation", description: `ปรับชุดกำลังและอุปกรณ์ตาม ${raw.tags[2] || "บริบทภารกิจ"}` },
    ],
    detailLevel: hasExpandedDetail ? "expanded" : "basic",
    updatedAt: hasExpandedDetail ? "2026-07-12" : "RESEARCH QUEUE",
    contentNote: hasExpandedDetail
      ? "ข้อมูลอาวุธและเครื่องแบบเป็นการสรุปจากข้อมูลสาธารณะและอาจเปลี่ยนตามช่วงเวลา ไม่ควรถือเป็นบัญชีประจำการทางการ"
      : "Basic Dossier นี้มีข้อมูลระดับภาพรวมเท่านั้น รายละเอียดอาวุธ เครื่องแบบ และประวัติยังไม่ผ่านการตรวจสอบรายแหล่ง",
  };

  // Normalized media model. Units without a cover image resolve to "pending"
  // so the UI can show a designed MediaFallback instead of an empty black area.
  const coverSrc = merged.coverImage || null;
  const mediaStatus = coverSrc ? (merged.mediaStatus === "verified" ? "verified" : "representative") : "pending";
  merged.mediaStatus = mediaStatus;
  const emblemSrc = merged.logoUrl || null;
  merged.media = {
    cover: {
      src: coverSrc,
      alt: coverSrc
        ? `${raw.code} — ${raw.name}, ${raw.country}. ${mediaStatus === "verified" ? "Public unit media." : "Representative imagery, not confirmed unit media."}`
        : "",
      status: mediaStatus,
      // Source metadata is intentionally left null until each file's Commons
      // page and license are individually curated — surfaced by media:audit.
      sourceName: coverSrc ? "Wikimedia Commons" : null,
      sourceUrl: null,
      credit: null,
      license: null,
    },
    emblem: emblemSrc
      ? { src: emblemSrc, alt: `${raw.code} official emblem / insignia`, variant: "square", sourceUrl: null, license: null }
      : null,
    gallery: merged.gallery || [],
  };
  return merged;
});

const duplicateSlugs = builtUnits
  .map((unit) => unit.slug)
  .filter((slug, index, allSlugs) => allSlugs.indexOf(slug) !== index);

if (duplicateSlugs.length) {
  throw new Error(`Duplicate unit slugs found: ${[...new Set(duplicateSlugs)].join(", ")}`);
}

export const units = builtUnits;

export function getUnitBySlug(slug) {
  return units.find((unit) => unit.slug === slug);
}

export function getFeaturedUnits() {
  return units.filter((unit) => unit.detailLevel === "expanded");
}

export function getRelatedUnits(unit, limit = 3) {
  return units
    .filter((candidate) => candidate.slug !== unit.slug)
    .map((candidate) => ({
      unit: candidate,
      score:
        (candidate.continent === unit.continent ? 3 : 0) +
        candidate.tags.filter((tag) => unit.tags.includes(tag)).length * 2 +
        (candidate.tier === unit.tier ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.unit);
}
