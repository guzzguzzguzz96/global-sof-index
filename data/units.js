import { computeEditorial } from "../lib/editorial.js";

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
    // The displayed insignia is the general U.S. Naval Special Warfare / SEAL
    // insignia, not a confirmed DEVGRU-specific emblem — labelled accordingly.
    emblemKind: "parent-branch-insignia",
    emblemNote: "The U.S. Naval Special Warfare insignia is displayed as parent-branch identification and is not presented as a confirmed DEVGRU-specific emblem.",
    reviewedOn: "2026-07-12",
    history: { summary: "Naval Special Warfare Development Group (DEVGRU) พัฒนามาจากหน่วยที่รู้จักในชื่อ SEAL Team Six ซึ่งมีรายงานว่าจัดตั้งขึ้นราวปี 1980 หลังความล้มเหลวของปฏิบัติการ Eagle Claw ในอิหร่าน เพื่อสร้างขีดความสามารถต่อต้านการก่อการร้ายทางทะเลโดยเฉพาะ ต่อมาในปี 1987 หน่วยได้รับการปรับโครงสร้างและเปลี่ยนชื่อเป็น Naval Special Warfare Development Group ภารกิจที่ระบุอย่างเป็นทางการเน้นการทดสอบ ประเมิน และพัฒนายุทโธปกรณ์ เทคนิค และยุทธวิธีให้กับ Naval Special Warfare ส่วนบทบาทด้านการต่อต้านการก่อการร้ายและปฏิบัติการเสี่ยงสูงเป็นสิ่งที่มีการรายงานอย่างกว้างขวางแต่ไม่ได้เปิดเผยรายละเอียดอย่างเป็นทางการ โครงสร้าง กำลังพล และบัญชีอุปกรณ์ของหน่วยเป็นความลับ ข้อมูลจำนวนมากที่เผยแพร่ในสาธารณะเป็นการคาดการณ์และควรใช้ด้วยความระมัดระวัง ภาพถ่าย U.S. Navy SEAL ทั่วไปไม่ควรถูกใช้เป็นการยืนยันว่าเป็น DEVGRU" },
    equipment: {
      dataStatus: "classified / not officially confirmed",
      // DEVGRU-specific weapon loadouts are classified and not officially disclosed.
      // No acceptable open source verified a unit-specific model, so none are asserted
      // here rather than presenting speculation as fact (mission-dependent by nature).
      primary: [],
      sidearms: [],
      blades: [],
      support: [],
    },
    uniform: {
      // No public source maps to a DEVGRU-specific uniform/colour/pattern, and a
      // unit uniform must not be inferred from generic U.S. SOF imagery, so these
      // claims are held at research-pending (UI fields preserved, not deleted).
      colors: [],
      patterns: [],
      headgear: [],
      armor: [],
      note: "ยังไม่มีแหล่งอ้างอิงสาธารณะที่ยืนยันเครื่องแบบ สี หรือลายพรางเฉพาะของ DEVGRU รายละเอียดจึงอยู่ในสถานะ research pending และไม่ควรสรุปจากภาพ U.S. Navy SEAL ทั่วไป",
    },
    gallery: [
      { url: commons("United States Navy SEALs 095.jpg", 1500), status: "representative", caption: "ภาพ U.S. Navy SEAL จากแหล่งสาธารณะ ใช้เป็นภาพประกอบชุมชน Naval Special Warfare ไม่ใช่การยืนยันว่าเป็น DEVGRU" },
      { url: commons("US Navy SEALs conducting VBSS exercise.jpg", 1500), status: "representative", caption: "ภาพฝึก Visit, Board, Search and Seizure ของ U.S. Navy SEAL" },
      { url: commons("United States Navy SEALs 605.jpg", 1500), status: "representative", caption: "ภาพ U.S. Navy SEAL ในบริบทการฝึก" },
    ],
    timeline: [
      { year: "1980", title: "SEAL Team Six formed", description: "จัดตั้งในบริบทหลังปฏิบัติการ Eagle Claw เพื่อขีดความสามารถต่อต้านการก่อการร้ายทางทะเล (มีรายงานว่าเริ่มราวปี 1980)" },
      { year: "1987", title: "Redesignated NSWDG", description: "ปรับโครงสร้างและเปลี่ยนชื่อเป็น Naval Special Warfare Development Group" },
      { year: "2001+", title: "Global counter-terror era", description: "มีบทบาทในยุคปฏิบัติการต่อต้านการก่อการร้ายทั่วโลก โดยรายละเอียดจำนวนมากยังเป็นความลับ" },
      { year: "2011", title: "Publicly acknowledged raid", description: "กำลังพลจากหน่วยเข้าร่วมปฏิบัติการที่ Abbottabad ซึ่งรัฐบาลสหรัฐฯ ยืนยันในระดับชาติ" },
    ],
    sources: [
      { title: "The Secret Unit That Killed Bin Laden", publisher: "History.com (A&E Networks)", url: "https://www.history.com/articles/the-secret-unit-that-killed-bin-laden", type: "reputable-media", accessedAt: "2026-07-12", supports: ["history"], notes: "ที่มาหลังปฏิบัติการ Eagle Claw การเปลี่ยนชื่อเป็น NSWDG ในปี 1987 และบทบาทต่อต้านการก่อการร้าย" },
      { title: "Naval Special Warfare Development Group (DEVGRU) — research guide", publisher: "U.S. Naval War College Library", url: "https://usnwc.libguides.com/c.php?g=943947&p=6821702", type: "reference", accessedAt: "2026-07-12", supports: ["history", "branch"], notes: "คู่มือค้นคว้าของสถาบันทางทหารสหรัฐฯ ยืนยันชื่อหน่วยและภารกิจพัฒนายุทโธปกรณ์/ยุทธวิธีของ Navy SEAL" },
      { title: "SEAL Team Six (Naval Special Warfare Development Group)", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/SEAL_Team_Six", type: "reference", accessedAt: "2026-07-12", supports: ["history", "branch"], notes: "แหล่งอ้างอิงระดับตติยภูมิ ใช้ประกอบบริบทชื่อทางการ สายการบังคับบัญชา และช่วงเวลาก่อตั้ง/ปรับโครงสร้าง" },
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
    reviewedOn: "2026-07-12",
    history: { summary: "Delta Force หรือชื่อทางการคือ 1st Special Forces Operational Detachment-Delta (1st SFOD-D) จัดตั้งขึ้นในปี 1977 โดยพันเอก Charles Beckwith ผู้ได้รับแรงบันดาลใจจากการปฏิบัติงานร่วมกับหน่วย SAS ของอังกฤษ เพื่อให้กองทัพบกสหรัฐฯ มีขีดความสามารถด้านการต่อต้านการก่อการร้ายและการช่วยตัวประกันโดยเฉพาะ หน่วยขึ้นการบังคับบัญชาทางธุรการกับกองทัพบก และปฏิบัติภารกิจภายใต้ Joint Special Operations Command (JSOC) ปฏิบัติการสำคัญครั้งแรกคือ Operation Eagle Claw ในเดือนเมษายน 1980 ซึ่งเป็นความพยายามช่วยตัวประกันชาวอเมริกันในกรุงเตหะราน แต่ต้องยุติที่จุดพักกลางทะเลทราย (Desert One) หลังเกิดอุบัติเหตุอากาศยานชนกันจนมีผู้เสียชีวิต 8 นาย ความล้มเหลวดังกล่าวนำไปสู่การปฏิรูปหน่วยปฏิบัติการพิเศษของสหรัฐฯ ต่อมารัฐบาลสหรัฐฯ ยืนยันการมีส่วนร่วมของหน่วยในปฏิบัติการปี 2019 ที่ทำให้ผู้นำ ISIS เสียชีวิต ทั้งนี้รายละเอียดกำลังพลและอุปกรณ์ของหน่วยยังเป็นความลับ" },
    equipment: {
      dataStatus: "classified / not officially confirmed",
      // Delta-specific loadouts are classified and mission-dependent; no acceptable
      // open source verified a unit-specific model, so none are asserted here.
      primary: [],
      sidearms: [],
      blades: [],
      support: [],
    },
    // No public source maps to a Delta-specific uniform/colour/pattern; a unit
    // uniform must not be inferred from generic U.S. SOF imagery, so these claims
    // are held at research-pending (UI fields preserved, not deleted).
    uniform: { colors: [], patterns: [], headgear: [], armor: [], note: "ยังไม่มีแหล่งอ้างอิงสาธารณะที่ยืนยันเครื่องแบบ สี หรือลายพรางเฉพาะของหน่วย รายละเอียดจึงอยู่ในสถานะ research pending มีเพียงการรายงานทั่วไปถึงการใช้ชุด low-visibility ซึ่งยังไม่ผ่านการตรวจสอบรายแหล่ง" },
    gallery: [],
    timeline: [
      { year: "1977", title: "Formation", description: "จัดตั้งโดยพันเอก Charles Beckwith โดยได้แรงบันดาลใจจากหน่วย SAS ของอังกฤษ" },
      { year: "1980", title: "Operation Eagle Claw", description: "ปฏิบัติการช่วยตัวประกันในกรุงเตหะรานที่ต้องยุติที่ Desert One มีผู้เสียชีวิต 8 นาย" },
      { year: "Post-1980", title: "Special operations reform", description: "ความล้มเหลวนำไปสู่การปฏิรูปและการจัดตั้ง Joint Special Operations Command (JSOC)" },
      { year: "2019", title: "Publicly confirmed raid", description: "รัฐบาลสหรัฐฯ ยืนยันการมีส่วนร่วมในปฏิบัติการที่ทำให้ผู้นำ ISIS เสียชีวิตในซีเรีย" },
    ],
    sources: [
      { title: "Delta Force: Missions and History", publisher: "Military.com", url: "https://www.military.com/special-operations/delta-force.html", type: "reputable-media", accessedAt: "2026-07-12", supports: ["history", "branch"], notes: "ยืนยันชื่อทางการ 1st SFOD-D การก่อตั้งปี 1977 โดย Charles Beckwith สายการบังคับบัญชา Army/JSOC และบทบาทต่อต้านการก่อการร้าย/ช่วยตัวประกัน" },
      { title: "Operation Eagle Claw", publisher: "Airborne & Special Operations Museum Foundation", url: "https://www.asomf.org/operation-eagle-claw/", type: "academic", accessedAt: "2026-07-12", supports: ["history"], notes: "แหล่งพิพิธภัณฑ์ ใช้สำหรับรายละเอียดปฏิบัติการ Eagle Claw ปี 1980 (Desert One) และการนำไปสู่การจัดตั้ง JSOC" },
      { title: "ISIS Leader Baghdadi Killed in Special Ops Raid in Syria", publisher: "Military.com", url: "https://www.military.com/daily-news/2019/10/27/isis-leader-baghdadi-killed-daring-special-ops-nighttime-raid-syria.html", type: "reputable-media", accessedAt: "2026-07-12", supports: ["history"], notes: "ยืนยันการมีส่วนร่วมของหน่วยในปฏิบัติการปี 2019 ที่รัฐบาลสหรัฐฯ ยืนยันต่อสาธารณะ" },
    ],
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
    reviewedOn: "2026-07-12",
    history: { summary: "Special Air Service ก่อตั้งในเดือนกรกฎาคม ค.ศ. 1941 ที่แอฟริกาเหนือ ในชื่อแรกว่า 'L Detachment, Special Air Service Brigade' โดยเดวิด สเตอร์ลิง ซึ่งรวบรวมกำลังชุดแรกจากหน่วยคอมมานโด แนวคิดของหน่วยคือการใช้กำลังขนาดเล็กโจมตีลึกหลังแนวข้าศึก โดยเฉพาะการจู่โจมสนามบินและฐานส่งกำลังในสงครามทะเลทราย พิพิธภัณฑ์ National Army Museum ระบุว่าหน่วยทำลายอากาศยานฝ่ายอักษะได้มากกว่า 300 ลำ หน่วยได้รับสถานะระดับกรมในปี 1942 ปฏิบัติการต่อเนื่องในยุโรปจนสิ้นสงคราม ถูกยุบหลังสงครามก่อนจะฟื้นขึ้นใหม่ในปี 1947 ในรูปกำลังอาสาสมัคร (21 SAS) และจัดตั้งกำลังประจำการ 22 SAS ในปี 1952 หน่วยเป็นที่รู้จักทั่วโลกจากการเข้าคลี่คลายเหตุการณ์ยึดสถานทูตอิหร่านในกรุงลอนดอนเมื่อปี 1980 (Operation Nimrod) ปัจจุบันเป็นองค์ประกอบหลักของ United Kingdom Special Forces คติพจน์ประจำหน่วยคือ 'Who Dares Wins'" },
    equipment: {
      dataStatus: "publicly documented / period dependent",
      primary: [weapon("L119A2 (Colt Canada C8) family", "5.56×45 mm carbine", "มีรายงานอย่างกว้างขวางในสื่อกลาโหมเฉพาะทางว่าเป็นคาร์บินของ UK Special Forces แต่บัญชีอาวุธของ UKSF ไม่ได้เปิดเผยอย่างเป็นทางการ", "reported"), weapon("Heckler & Koch MP5", "9×19 mm submachine gun", "เชื่อมโยงกับภาพจำการเข้าคลี่คลายเหตุยึดสถานทูตอิหร่านปี 1980 พิพิธภัณฑ์ CMSM จัดแสดง MP5 ของ SAS จากเหตุการณ์ดังกล่าว ปัจจุบันไม่ควรถือเป็นอาวุธหลักของทุกภารกิจ", "historical")],
      sidearms: [weapon("Glock 17 (L131A1)", "9×19 mm pistol", "ปืนพกประจำการของกองทัพสหราชอาณาจักรตั้งแต่ปี 2013 แทนที่ Browning L9A1 (ยืนยันโดย GOV.UK) เป็นอาวุธประจำกายทั่วไป มิใช่ของ UKSF โดยเฉพาะ", "documented")],
      blades: [weapon("Fairbairn–Sykes fighting knife", "Historic fighting knife", "เป็นสัญลักษณ์และมรดกทางประวัติศาสตร์ ไม่ได้หมายความว่าเป็นมีดปฏิบัติการมาตรฐานปัจจุบัน", "historical")],
      support: [weapon("Stun grenades, sledgehammers and frame charges", "Breaching / assault tools", "National Army Museum ระบุการใช้ระเบิดแสง ค้อนโจมตี และดินระเบิดกรอบในการเข้าคลี่คลายเหตุยึดสถานทูตอิหร่านปี 1980 การจัดชุดอุปกรณ์ขึ้นกับภารกิจ", "documented")],
    },
    uniform: { colors: ["Ranger green", "Coyote / tan", "Black for historic CT imagery"], patterns: ["Multi-Terrain Pattern", "Mission-specific camouflage"], headgear: ["High-cut ballistic helmet", "Boonie / patrol headgear", "Respiratory protection for CT"], armor: ["Modular plate carriers", "Load-bearing systems", "Low-visibility configurations"], note: "ภาพชุดดำและหน้ากากป้องกันแก๊สเป็นภาพจำทางประวัติศาสตร์ของงานต่อต้านการก่อการร้าย ไม่ใช่เครื่องแบบมาตรฐานสำหรับทุกภารกิจของ SAS" },
    gallery: [],
    timeline: [
      { year: "1941", title: "Founded in North Africa", description: "เดวิด สเตอร์ลิง ก่อตั้งในชื่อ L Detachment เพื่อจู่โจมลึกหลังแนวข้าศึกในสงครามทะเลทราย" },
      { year: "1942–45", title: "Regimental status", description: "ได้สถานะระดับกรมในปี 1942 และปฏิบัติการทั่วยุโรปจนสิ้นสงคราม" },
      { year: "1947–52", title: "Re-formed", description: "ฟื้นเป็นกำลังอาสาสมัคร 21 SAS ปี 1947 และจัดตั้งกำลังประจำการ 22 SAS ปี 1952" },
      { year: "1980", title: "Iranian Embassy Siege", description: "การเข้าคลี่คลายเหตุยึดสถานทูตอิหร่าน (Operation Nimrod) ทำให้ขีดความสามารถต่อต้านการก่อการร้ายเป็นที่รู้จักทั่วโลก" },
    ],
    sources: [
      { title: "Special Air Service", publisher: "National Army Museum", url: "https://www.nam.ac.uk/explore/sas", type: "academic", accessedAt: "2026-07-12", supports: ["history", "branch"], notes: "ยืนยันการก่อตั้งเดือนกรกฎาคม 1941 (L Detachment) การรวมเข้ากับกองทัพบก (22 SAS ปี 1952) และบทบาทปัจจุบัน" },
      { title: "David Stirling: The Phantom Major", publisher: "National Army Museum", url: "https://www.nam.ac.uk/explore/david-stirling", type: "academic", accessedAt: "2026-07-12", supports: ["history"], notes: "ผู้ก่อตั้ง กำลังชุดแรก 67 นาย คติพจน์ 'Who Dares Wins' และการใช้รถจี๊ปจู่โจมสนามบิน" },
      { title: "Iranian Embassy siege", publisher: "National Army Museum", url: "https://www.nam.ac.uk/explore/iranian-embassy-siege", type: "academic", accessedAt: "2026-07-12", supports: ["history", "uniform", "equipment"], notes: "เหตุการณ์ปี 1980 (Operation Nimrod) ชุดจู่โจมสีดำและหน้ากากกันแก๊ส และอุปกรณ์เจาะทำลาย (ระเบิดแสง ค้อน ดินระเบิดกรอบ)" },
      { title: "Original SAS MP5 – Iranian Embassy Siege 1980", publisher: "Combined Military Services Museum", url: "https://cmsm.co.uk/original-sas-mp5-iranian-embassy-siege-1980", type: "academic", accessedAt: "2026-07-12", supports: ["equipment", "history"], notes: "พิพิธภัณฑ์อิสระที่จัดแสดง MP5 ของ SAS จากเหตุการณ์ปี 1980 สนับสนุนความเชื่อมโยงเชิงประวัติศาสตร์ของ MP5" },
      { title: "New pistols for UK Armed Forces", publisher: "UK Ministry of Defence (GOV.UK)", url: "https://www.gov.uk/government/news/new-pistols-for-uk-armed-forces", type: "government", accessedAt: "2026-07-12", supports: ["equipment"], notes: "ประกาศทางการปี 2013 การนำ Glock 17 Gen4 (L131A1) เข้าประจำการแทน Browning L9A1" },
      { title: "File:UK SAS (badge).svg", publisher: "Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:UK_SAS_(badge).svg", type: "reference", accessedAt: "2026-07-12", supports: ["media"], notes: "ตราสัญลักษณ์มีดปีก 'Who Dares Wins' สถานะลิขสิทธิ์เป็นสาธารณสมบัติ (Crown Copyright หมดอายุ) แต่มีข้อจำกัดการใช้เครื่องหมายราชการ" },
    ],
  },
  "SBS": {
    slug: "british-sbs",
    founded: "1940 lineage (SBS from 1987)",
    branch: "Royal Navy — United Kingdom Special Forces",
    unitType: "Maritime special forces",
    status: "Active",
    personnel: "Not publicly confirmed",
    environment: ["Maritime", "Coastal", "Urban"],
    reviewedOn: "2026-07-12",
    history: { summary: "Special Boat Service มีจุดกำเนิดในสงครามโลกครั้งที่สอง เมื่อกัปตัน Roger Courtney จัดตั้งหน่วยเรือแคนูจู่โจมขนาดเล็กในปี 1940 ซึ่งเริ่มแรกใช้ชื่อ 'Folboat Section' และต่อมาเป็น No 1 Special Boat Section โดยใช้เรือแคนูผ้าใบพับได้ (folboats) ในภารกิจก่อวินาศกรรมชายฝั่งและการลาดตระเวนหาดยกพล ต้นปี 1943 มีการตั้ง Special Boat Squadron แยกจาก SAS ปฏิบัติการจู่โจมในทะเลอีเจียนและเมดิเตอร์เรเนียน หน่วยในช่วงสงครามถูกยุบในปี 1945 และบทบาทถูกรวมเข้ากับกำลังของ Royal Marines ในปี 1947 จากนั้นเปลี่ยนชื่อเป็น Special Boat Company (1951) และ Special Boat Squadron (1974) ก่อนจะได้ชื่อ Special Boat Service เมื่อวันที่ 28 กรกฎาคม 1987 พร้อมรับผิดชอบภารกิจต่อต้านการก่อการร้ายทางทะเล ปัจจุบันเป็นหน่วยรบพิเศษทางทะเลของ Royal Navy ที่นำภารกิจต่อต้านการก่อการร้ายทางทะเลของสหราชอาณาจักร" },
    equipment: { dataStatus: "publicly documented / mission dependent", primary: [weapon("L119A2 (Colt Canada C8) family", "5.56×45 mm carbine", "มีรายงานในสื่อกลาโหมเฉพาะทางว่าเป็นคาร์บินของ UK Special Forces แต่ไม่ได้เปิดเผยเป็นบัญชีทางการ", "reported")], sidearms: [weapon("Glock 17 (L131A1)", "9×19 mm pistol", "ปืนพกประจำการของกองทัพสหราชอาณาจักรตั้งแต่ปี 2013 (ยืนยันโดย GOV.UK) เป็นอาวุธประจำกายทั่วไป มิใช่ของ UKSF โดยเฉพาะ", "documented")], blades: [weapon("Dive / utility knife", "Maritime tool", "ประเภทและรุ่นขึ้นกับภารกิจดำน้ำและงานทางทะเล", "reported")], support: [weapon("Rigid Inflatable Boats (RIBs) and swimmer-canoeist diving teams", "Maritime insertion", "National Army Museum ระบุว่า SBS ใช้เรือยางท้องแข็งและชุดนักทำลายใต้น้ำที่มีขีดความสามารถดำน้ำ", "documented"), weapon("Folboats (collapsible canoes)", "Historic insertion craft", "อุปกรณ์แทรกซึมทางน้ำยุคสงครามโลกครั้งที่สองตามข้อมูลของ National Army Museum", "historical")] },
    uniform: { colors: ["Ranger green", "Coyote", "Maritime black / dark neutral"], patterns: ["Multi-Terrain Pattern", "Maritime over-garments"], headgear: ["High-cut helmet", "Diving headgear"], armor: ["Maritime plate carrier", "Flotation-compatible load carriage"], note: "รายละเอียดเครื่องแบบร่วมสมัยของ SBS ไม่ได้เปิดเผยเป็นทางการ รายการนี้เป็นข้อมูลที่มีการรายงานทั่วไป ชุดและอุปกรณ์เปลี่ยนอย่างมากระหว่างการดำน้ำ การขึ้นเรือ และภารกิจบนบก" },
    gallery: [],
    timeline: [{year:"1940",title:"Folboat Section formed",description:"กัปตัน Roger Courtney จัดตั้งหน่วยเรือแคนูจู่โจม (ต่อมาเป็น No 1 Special Boat Section)"},{year:"1943",title:"Special Boat Squadron",description:"ตั้งเป็นหน่วยแยกจาก SAS ปฏิบัติการในทะเลอีเจียนและเมดิเตอร์เรเนียน"},{year:"1951–74",title:"Post-war reorganization",description:"เปลี่ยนชื่อเป็น Special Boat Company (1951) และ Special Boat Squadron (1974)"},{year:"1987",title:"Renamed Special Boat Service",description:"เปลี่ยนชื่อเมื่อ 28 กรกฎาคม 1987 พร้อมรับภารกิจต่อต้านการก่อการร้ายทางทะเล"}],
    sources: [
      { title: "Special Boat Service", publisher: "National Army Museum", url: "https://www.nam.ac.uk/explore/special-boat", type: "academic", accessedAt: "2026-07-12", supports: ["history", "branch", "equipment"], notes: "ลำดับการเปลี่ยนชื่อ (1947/1951/1974/28 ก.ค. 1987) บทบาทต่อต้านการก่อการร้ายทางทะเลปัจจุบัน เรือยางท้องแข็งและขีดความสามารถดำน้ำ" },
      { title: "Origins of the Special Forces", publisher: "National Army Museum", url: "https://www.nam.ac.uk/explore/special-forces-origins", type: "academic", accessedAt: "2026-07-12", supports: ["history"], notes: "จุดกำเนิดโดย Roger Courtney เรือ folboats และการปรับโครงสร้างช่วงสงคราม" },
      { title: "Roger Courtney: SBS pioneer", publisher: "National Army Museum", url: "https://www.nam.ac.uk/explore/roger-courtney-sbs-pioneer", type: "academic", accessedAt: "2026-07-12", supports: ["history", "equipment"], notes: "ประวัติผู้ก่อตั้ง การฝึกที่ Isle of Arran และการใช้เรือแคนูพับได้" },
      { title: "New pistols for UK Armed Forces", publisher: "UK Ministry of Defence (GOV.UK)", url: "https://www.gov.uk/government/news/new-pistols-for-uk-armed-forces", type: "government", accessedAt: "2026-07-12", supports: ["equipment"], notes: "ประกาศทางการปี 2013 การนำ Glock 17 Gen4 (L131A1) เข้าประจำการแทน Browning L9A1" },
      { title: "UK Special Boat Service personnel raid ship after suspected hijacking", publisher: "Naval Technology", url: "https://www.naval-technology.com/news/uk-special-boat-service-personnel-raid-ship-after-suspected-hijacking/", type: "reputable-media", accessedAt: "2026-07-12", supports: ["branch", "equipment"], notes: "แหล่งข่าวอิสระ ระบุ SBS เป็นหน่วยรบพิเศษของ Royal Navy และการใช้เฮลิคอปเตอร์ Merlin/Wildcat ในการขึ้นเรือปี 2020" },
    ],
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
    coverSourceUrl: "https://commons.wikimedia.org/wiki/File:GIGN5_Domenjod_160316.jpg",
    coverCredit: "Domenjod",
    coverLicense: "CC BY-SA 4.0",
    emblemSourceUrl: "https://commons.wikimedia.org/wiki/File:%C3%89cusson_r%C3%A9gion_gendarmerie_GIGN.svg",
    emblemCredit: "Gendarmerie Nationale (vector: Futurhit12)",
    emblemLicense: "Public domain (PD-trademarked; Gendarmerie trademark applies)",
    reviewedOn: "2026-07-12",
    history: { summary: "GIGN (Groupe d'intervention de la Gendarmerie nationale) เป็นหน่วยแทรกแซงชั้นสูงของ French National Gendarmerie ซึ่งเป็นกำลังกึ่งทหารที่ทำหน้าที่บังคับใช้กฎหมาย จึงแตกต่างจากหน่วยรบพิเศษของกองทัพ หน่วยจัดตั้งในปี 1973 และเริ่มปฏิบัติงานในเดือนมีนาคม 1974 (แรกเริ่มใช้ชื่อ ECRI) โดยมีร้อยโท Christian Prouteau เป็นผู้บังคับหน่วยคนแรก ในบริบทหลังเหตุโจมตีโอลิมปิกมิวนิกปี 1972 บทบาทหลักคือการช่วยตัวประกัน การต่อต้านการก่อการร้าย การจับกุมผู้ต้องหาความเสี่ยงสูง และการคุ้มกันบุคคลและสถานที่สำคัญ ปฏิบัติการที่เป็นที่รู้จักต่อสาธารณะมากที่สุดคือการเข้าคลี่คลายเหตุจี้เครื่องบิน Air France เที่ยวบิน 8969 ที่เมืองมาร์กเซยในปี 1994 มีรายงานว่าหน่วยผ่านการปรับโครงสร้างครั้งสำคัญในปี 2007 และ 2021 อาวุธประจำหน่วยที่เป็นสัญลักษณ์คือปืนลูกโม่ Manurhin MR 73 ทั้งนี้บัญชีกำลังพลและยุทโธปกรณ์โดยละเอียดไม่ได้เปิดเผยอย่างเป็นทางการ" },
    equipment: {
      dataStatus: "publicly reported / role dependent (official issue not itemized)",
      primary: [weapon("HK416 family", "5.56×45 mm carbine", "ปรากฏในรายการอาวุธสาธารณะของ GIGN (แหล่งอ้างอิงเดียว) จึงจัดเป็นข้อมูลที่มีการรายงาน", "reported"), weapon("Heckler & Koch MP5 family", "9×19 mm submachine gun", "แพลตฟอร์มที่มีประวัติยาวนานในงานต่อต้านการก่อการร้ายของหน่วยตำรวจยุทธวิธี", "reported")],
      sidearms: [weapon("Manurhin MR 73", ".357 Magnum revolver", "ปืนลูกโม่สัญลักษณ์ของ GIGN ที่มีการบันทึกไว้ ใช้ครั้งแรกในภารกิจ Air France 8969 ปี 1994 (Wikipedia, The War Zone)", "documented"), weapon("Glock 17 / 19 family", "9×19 mm pistol", "ปรากฏในรายการอาวุธสาธารณะของหน่วย จัดเป็นข้อมูลที่มีการรายงาน", "reported")],
      blades: [],
      support: [weapon("Ballistic shields and breaching systems", "Intervention equipment", "อุปกรณ์ที่ปรากฏในรายการสาธารณะของหน่วยแทรกแซง ใช้ในงานช่วยตัวประกันและการเข้าควบคุมพื้นที่", "reported")],
    },
    uniform: { colors: ["Dark navy", "Black", "Ranger green"], patterns: [], headgear: ["Ballistic helmet", "Protective visor", "Communication headset"], armor: ["Heavy intervention armor", "Modular plate carrier", "Ballistic shield teams"], note: "ชุดจู่โจมสีดำเป็นภาพจำเชิงประวัติศาสตร์/เฉพาะยุคของ GIGN ไม่ใช่มาตรฐานถาวรของทุกบทบาท หน่วยส่วนใหญ่ใช้เครื่องแบบแทรกแซงสีเข้มแบบไม่มีลายพราง สีที่แสดงเป็นเพียงภาพอ้างอิงโดยประมาณ ไม่ใช่สีมาตรฐานทางการ และยังไม่มีแหล่งยืนยันลายพรางเฉพาะของหน่วย" },
    gallery: [{ url: commons("GIGN5 Domenjod 160316.jpg", 1500), status: "verified", caption: "ภาพ GIGN (Domenjod, CC BY-SA 4.0, via Wikimedia Commons) ที่ระบุหน่วยในชื่อไฟล์สาธารณะ" }],
    timeline: [{year:"1973–74",title:"Formation (ECRI)",description:"จัดตั้งปี 1973 เริ่มปฏิบัติงานมีนาคม 1974 โดยร้อยโท Christian Prouteau หลังเหตุมิวนิก 1972"},{year:"1976",title:"Loyada hostage rescue",description:"ปฏิบัติการช่วยตัวประกันที่ Loyada (จิบูตี) — เหตุการณ์ที่มีการรายงาน"},{year:"1994",title:"Air France Flight 8969",description:"เข้าคลี่คลายเหตุจี้เครื่องบินที่มาร์กเซย ผู้โดยสารและลูกเรือได้รับการช่วยเหลือ (เหตุการณ์ที่ได้รับการยืนยัน)"},{year:"2007",title:"Reorganization",description:"ปรับโครงสร้างหน่วย (ยุบ GSIGN) — ตามที่มีการรายงาน"},{year:"2021",title:"Restructure & shield insignia",description:"ปรับโครงสร้างและใช้ตราสัญลักษณ์รูปโล่ร่วม — ตามที่มีการรายงาน"}],
    sources: [
      { title: "GIGN", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/GIGN", type: "reference", accessedAt: "2026-07-12", supports: ["identity","history","branch","role","timeline","equipment"], notes: "โครงหลักด้านข้อเท็จจริง หลายตัวเลข (กำลังพล การปรับโครงสร้าง 2007/2021) มาจากแหล่งนี้แหล่งเดียว จัดเป็นข้อมูลที่มีการรายงาน" },
      { title: "Manurhin MR 73", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/Manurhin_MR_73", type: "reference", accessedAt: "2026-07-12", supports: ["equipment","timeline"], notes: "ยืนยัน MR73 เป็นปืนพกของ GIGN และการใช้ครั้งแรกในเหตุ Air France 8969 ปี 1994" },
      { title: "France's Elite GIGN Counter Terror Unit Still Has A Cult-Like Affinity For The Revolver", publisher: "The War Zone", url: "https://www.twz.com/25547/frances-elite-gign-counter-terror-unit-still-has-a-cult-like-affinity-for-the-revolver", type: "reputable-media", accessedAt: "2026-07-12", supports: ["identity","role","equipment"], notes: "แหล่งอิสระ ยืนยันบริบทการก่อตั้งหลังมิวนิก บทบาทต่อต้านการก่อการร้าย/ช่วยตัวประกัน และความสำคัญของ MR73" },
      { title: "File:Écusson région gendarmerie GIGN.svg", publisher: "Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:%C3%89cusson_r%C3%A9gion_gendarmerie_GIGN.svg", type: "archive", accessedAt: "2026-07-12", supports: ["media"], notes: "ตราสัญลักษณ์ GIGN สถานะ PD-trademarked (เป็นเครื่องหมายการค้าของ Gendarmerie การนำไปใช้ต้องเคารพสิทธิเครื่องหมาย)" },
      { title: "File:GIGN5 Domenjod 160316.jpg", publisher: "Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:GIGN5_Domenjod_160316.jpg", type: "archive", accessedAt: "2026-07-12", supports: ["media"], notes: "ภาพปกที่ยืนยันว่าเป็น GIGN สัญญาอนุญาต CC BY-SA 4.0 เครดิต Domenjod (ปี 2016)" },
    ],
  },
  "GROM": {
    slug: "grom",
    founded: "13 July 1990",
    branch: "Polish Special Forces (Wojska Specjalne)",
    unitType: "Special mission and counter-terrorism unit",
    status: "Active",
    personnel: "Not publicly confirmed",
    environment: ["Urban", "Maritime", "Airborne"],
    logoUrl: commons("Odznaka Grom.JPG", 500),
    coverImage: commons("GROM with Navy SEALs 01.jpg", 1800),
    mediaStatus: "verified",
    coverSourceUrl: "https://commons.wikimedia.org/wiki/File:GROM_with_Navy_SEALs_01.jpg",
    coverCredit: "U.S. Department of Defense",
    coverLicense: "Public domain (U.S. federal government work)",
    emblemSourceUrl: "https://commons.wikimedia.org/wiki/File:Odznaka_Grom.JPG",
    emblemCredit: "Polish Ministry of National Defence",
    emblemLicense: "Public domain (Polish official symbol, Copyright Act Art. 4)",
    reviewedOn: "2026-07-12",
    history: { summary: "Jednostka Wojskowa GROM (หน่วยทหาร JW 2305) จัดตั้งอย่างเป็นทางการเมื่อวันที่ 13 กรกฎาคม 1990 โดยทั่วไปมีการยกให้พันเอก (ต่อมาเป็นพลจัตวา) Sławomir Petelicki เป็นผู้ผลักดันการก่อตั้ง มีรายงานเชื่อมโยงการก่อตั้งกับปฏิบัติการ 'Most' (สะพาน) ในการช่วยอพยพ และกับเหตุโจมตีนักการทูตโปแลนด์ในเลบานอนปี 1990 ช่วงแรกหน่วยปฏิบัติงานอย่างลับ ๆ และเป็นที่รู้จักต่อสาธารณะราวปี 1994 หลังภารกิจในเฮติ ต่อมาในวันที่ 4 สิงหาคม 1995 หน่วยได้รับมรดกและชื่อกิตติมศักดิ์จากหน่วย 'Cichociemni' (พลร่มเงียบ) ของกองทัพบ้านเกิดในสงครามโลกครั้งที่สอง เดิมหน่วยขึ้นกับกระทรวงมหาดไทย ก่อนโอนไปสังกัดกระทรวงกลาโหมเมื่อวันที่ 1 ตุลาคม 1999 และผนวกเข้ากับกองทัพโปแลนด์ ปัจจุบันเป็นส่วนหนึ่งของ Polish Special Forces ภายใต้ Dowództwo Komponentu Wojsk Specjalnych (DKWS) โดยรายละเอียดยุทโธปกรณ์และการจัดกำลังจัดเป็นความลับ" },
    equipment: { dataStatus: "reported — official issue classified", primary: [weapon("HK416 family", "5.56×45 mm carbine", "มีรายงานในสื่ออาวุธเฉพาะทางว่าเป็นคาร์บินหลักปัจจุบัน แทนแพลตฟอร์ม M4/SR-16 เดิม (แหล่งอ้างอิงเดียว)", "reported"), weapon("SIG MPX", "9×19 mm submachine gun / PDW", "มีรายงานว่านำเข้าประจำการราวปี 2019 แทน MP5", "reported")], sidearms: [weapon("Glock 17 family", "9×19 mm pistol", "ปรากฏในรายการอาวุธสาธารณะของหน่วย จัดเป็นข้อมูลที่มีการรายงาน", "reported")], blades: [], support: [weapon("Direct Action Spitfire plate carrier", "Protective equipment", "มีรายงานการจัดหาจากผู้ผลิตโปแลนด์ (สัญญาปี 2018) และเลือกใช้เป็นเสื้อเกราะหลัก — ข้อมูลจากการจัดซื้อ", "reported")] },
    uniform: { colors: ["Ranger green", "Coyote brown", "Black"], patterns: ["MultiCam family"], headgear: ["Graphite / grey beret", "High-cut ballistic helmets"], armor: ["Modular plate carriers", "Mission-configurable pouches"], note: "ภาพสาธารณะของ GROM ส่วนมากเป็นภาพการฝึกร่วม จึงไม่ใช่หลักฐานว่าเป็นเครื่องแบบหรือชุดอุปกรณ์ที่ออกให้ทั้งหน่วย รายละเอียดการออกยุทโธปกรณ์จัดเป็นความลับ หมวกเบเรต์สีเทา/กราไฟต์เป็นเครื่องหมายที่มักเชื่อมโยงกับหน่วย สีที่แสดงเป็นภาพอ้างอิงโดยประมาณ ไม่ใช่สีมาตรฐานทางการ" },
    gallery: [{url:commons("GROM with Navy SEALs 01.jpg",1500),status:"verified",caption:"ภาพการฝึกร่วมระหว่าง GROM กับ U.S. Navy SEALs (ภาพกระทรวงกลาโหมสหรัฐฯ สาธารณสมบัติ) ใกล้กดัญสก์ ปี 2009"},{url:commons("GROM with Navy SEALs 03.jpg",1500),status:"verified",caption:"ภาพการฝึกร่วมที่ระบุ GROM ในชื่อไฟล์"},{url:commons("GROM DN-SD-04-01612.JPEG",1500),status:"verified",caption:"ภาพ GROM จากคลังสาธารณะของกระทรวงกลาโหมสหรัฐฯ"}],
    timeline: [{year:"1990",title:"Formation (13 July)",description:"จัดตั้งหน่วย JW 2305 อย่างเป็นทางการเมื่อ 13 กรกฎาคม 1990"},{year:"1994",title:"Haiti deployment",description:"เป็นที่รู้จักต่อสาธารณะหลังภารกิจในเฮติ (Operation Uphold Democracy)"},{year:"1995",title:"Cichociemni heritage",description:"รับมรดกและชื่อกิตติมศักดิ์จากหน่วย Cichociemni ของ AK ตามคำสั่งรัฐมนตรีกลาโหม 4 สิงหาคม 1995"},{year:"1999",title:"Transfer to MoD",description:"โอนจากกระทรวงมหาดไทยไปสังกัดกระทรวงกลาโหมเมื่อ 1 ตุลาคม 1999"},{year:"2003",title:"Iraq operations",description:"เข้าร่วมปฏิบัติการในอิรัก รวมถึงการยึดสถานีน้ำมันนอกชายฝั่ง (ตามที่มีการรายงาน)"}],
    sources: [
      { title: "Wojska Specjalne — Jednostka Wojskowa GROM", publisher: "Ministerstwo Spraw Wewnętrznych i Administracji (gov.pl)", url: "https://www.gov.pl/web/mswia/wojska-specjalne", type: "government", accessedAt: "2026-07-12", supports: ["identity","history","branch","role"], notes: "ยืนยันการก่อตั้ง 13 กรกฎาคม 1990 และการขึ้นตรงต่อผู้บัญชาการ DKWS ไม่ระบุบัญชีอาวุธ" },
      { title: "GROM Military Unit", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/GROM_Military_Unit", type: "reference", accessedAt: "2026-07-12", supports: ["identity","history","timeline","equipment","uniform"], notes: "รายการอาวุธที่อ้างอิงสื่อเฉพาะทาง เป็นแหล่งหลักของข้อมูลอาวุธ (จัดเป็นข้อมูลที่มีการรายงาน) และสีหมวกเบเรต์" },
      { title: "From the history of J.W. GROM", publisher: "GROM. Strength and Honour Foundation", url: "https://eng.fundacjagrom.org.pl/eng/from-the-history-of-j-w-grom/", type: "reference", accessedAt: "2026-07-12", supports: ["history","timeline","branch"], notes: "บริบทปฏิบัติการ 'Most'/เบรุต 1990 การโอนสังกัดปี 1999 และโครงสร้าง DKWS (มูลนิธิทหารผ่านศึก)" },
      { title: "World-famous Polish special forces unit founded 27 yrs ago", publisher: "Polska Agencja Prasowa (PAP)", url: "https://www.pap.pl/en/news/news,286941,world-famous-polish-special-forces-unit-founded-27-yrs-ago.html", type: "reputable-media", accessedAt: "2026-07-12", supports: ["identity","history","role","timeline"], notes: "สำนักข่าวสาธารณะโปแลนด์ มรดก Cichociemni และการวางกำลังหลายภารกิจ" },
      { title: "File:Odznaka Grom.JPG", publisher: "Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Odznaka_Grom.JPG", type: "archive", accessedAt: "2026-07-12", supports: ["media"], notes: "ตราสัญลักษณ์ทางการของหน่วย (กระทรวงกลาโหมโปแลนด์) สถานะสาธารณสมบัติตามมาตรา 4 ของกฎหมายลิขสิทธิ์โปแลนด์" },
      { title: "File:GROM with Navy SEALs 01.jpg", publisher: "Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:GROM_with_Navy_SEALs_01.jpg", type: "archive", accessedAt: "2026-07-12", supports: ["media"], notes: "ภาพการฝึกร่วมที่ยืนยันว่าเป็น GROM (สาธารณสมบัติ ผลงานรัฐบาลกลางสหรัฐฯ) บริบทการฝึกร่วมใกล้กดัญสก์ 2009" },
    ],
  },
  "MATKAL": {
    slug: "sayeret-matkal",
    founded: "1957",
    branch: "Israel Defense Forces (General Staff Reconnaissance Unit)",
    unitType: "Strategic reconnaissance and special missions",
    status: "Active",
    personnel: "Classified",
    environment: ["Desert", "Urban", "Long-range reconnaissance"],
    reviewedOn: "2026-07-12",
    history: { summary: "Sayeret Matkal (หน่วยลาดตระเวนกองบัญชาการใหญ่ หรือ General Staff Reconnaissance Unit; รู้จักในชื่อ Unit 269) เป็นหน่วยรบพิเศษของกองทัพอิสราเอล (IDF) ก่อตั้งในปี 1957 โดย Avraham Arnan ผู้บังคับหน่วยคนแรก ภารกิจหลักที่มีการบันทึกคือการลาดตระเวนเชิงยุทธศาสตร์ในเชิงลึกเพื่อรวบรวมข่าวกรองหลังแนวข้าศึก รวมถึงบทบาทด้านการต่อต้านการก่อการร้ายและการช่วยตัวประกัน หน่วยเกี่ยวข้องกับปฏิบัติการที่ได้รับการยอมรับต่อสาธารณะหลายครั้ง เช่น การเข้าคลี่คลายเหตุจี้เครื่องบิน Sabena เที่ยวบิน 571 ในปี 1972 (นำโดย Ehud Barak) และปฏิบัติการช่วยตัวประกันที่ Entebbe ในปี 1976 (Operation Thunderbolt/Yonatan) ซึ่ง พ.ท. Yonatan Netanyahu ผู้บังคับหน่วยเสียชีวิต ทั้งนี้ความสามารถและกิจกรรมส่วนใหญ่ของหน่วยจัดเป็นความลับ และปฏิบัติการจำนวนมากที่ถูกกล่าวอ้างว่าเป็นของหน่วยยังไม่ได้รับการยืนยันอย่างเป็นทางการ" },
    equipment: {
      dataStatus: "classified / not officially confirmed",
      // No fetched source publishes a unit-specific loadout; the IDF fields varied
      // platforms and no fixed loadout is attributed here — held at research-pending.
      primary: [],
      sidearms: [],
      blades: [],
      support: [],
    },
    uniform: { colors: [], patterns: [], headgear: [], armor: [], note: "ไม่มีแหล่งอ้างอิงสาธารณะที่ระบุเครื่องแบบ สี หรือลายพรางเฉพาะของหน่วย รายละเอียดจึงอยู่ในสถานะ research pending กองทัพอิสราเอลนิยมสีภาคสนามแบบเรียบ และภารกิจลับอาจใช้เครื่องแต่งกายที่ไม่แสดงเอกลักษณ์ (เช่น การปลอมเป็นช่างเทคนิคในเหตุ Sabena ปี 1972) ซึ่งเป็นข้อมูลเฉพาะปฏิบัติการนั้น" },
    gallery: [],
    timeline: [{year:"1957",title:"Formation",description:"ก่อตั้งหน่วยโดย Avraham Arnan ผู้บังคับหน่วยคนแรก"},{year:"1972",title:"Sabena Flight 571 rescue",description:"เข้าคลี่คลายเหตุจี้เครื่องบินที่สนามบิน Lod นำโดย Ehud Barak (เหตุการณ์ที่ได้รับการยอมรับ)"},{year:"1973",title:"Yom Kippur War",description:"ปฏิบัติการในไซนายและที่ราบสูงเฮอร์มอน (ตามข้อมูล IDF)"},{year:"1976",title:"Entebbe raid",description:"เป็นกำลังหลักในปฏิบัติการช่วยตัวประกันที่ Entebbe พ.ท. Yonatan Netanyahu เสียชีวิต"},{year:"2006",title:"Second Lebanon War",description:"ปฏิบัติการเชิงลึกในเลบานอน พ.ท. Emanuel Moreno เสียชีวิต (ตามข้อมูล IDF)"}],
    sources: [
      { title: "Sayeret Matkal", publisher: "Israel Defense Forces (IDF)", url: "https://www.idf.il/en/mini-sites/our-units/elite-units/sayeret-matkal/", type: "official", accessedAt: "2026-07-12", supports: ["identity","history","branch","role","timeline"], notes: "หน้าทางการของ IDF ยืนยันชื่อ การก่อตั้งปี 1957 ผู้ก่อตั้ง Avraham Arnan บทบาทลาดตระเวน/ต่อต้านการก่อการร้าย/ช่วยตัวประกัน และความลับของหน่วย" },
      { title: "Israel Special Forces: Sayeret Matkal", publisher: "Jewish Virtual Library (AICE)", url: "https://jewishvirtuallibrary.org/sayeret-matkal", type: "reference", accessedAt: "2026-07-12", supports: ["identity","history","role"], notes: "ยืนยันชื่อ 'General Staff Reconnaissance Unit 269' และบทบาทช่วยตัวประกัน/ต่อต้านการก่อการร้าย" },
      { title: "The Entebbe Rescue Operation", publisher: "Jewish Virtual Library (AICE)", url: "https://jewishvirtuallibrary.org/the-entebbe-rescue-operation", type: "reference", accessedAt: "2026-07-12", supports: ["history","timeline"], notes: "รายละเอียดปฏิบัติการ Entebbe ปี 1976 หน่วยเป็นกำลังหลัก พ.ท. Yonatan Netanyahu เสียชีวิต" },
      { title: "Sabena Flight 571 Hijacking", publisher: "Israel Defense Forces (IDF)", url: "https://www.idf.il/en/mini-sites/wars-and-operations/sabena-flight-571-hijacking/", type: "official", accessedAt: "2026-07-12", supports: ["history","timeline"], notes: "ปฏิบัติการปี 1972 นำโดย Ehud Barak (ผู้บังคับหน่วย)" },
      { title: "Israeli Raid on Entebbe", publisher: "EBSCO Research Starters", url: "https://www.ebsco.com/research-starters/history/israeli-raid-entebbe", type: "academic", accessedAt: "2026-07-12", supports: ["history","timeline"], notes: "แหล่งวิชาการอิสระ ยืนยันวันที่และรายละเอียด Entebbe" },
    ],
  },
  "S'13": {
    slug: "shayetet-13",
    founded: "1948 lineage (commonly reported)",
    branch: "Israeli Navy",
    unitType: "Naval commando",
    status: "Active",
    personnel: "Classified",
    environment: ["Maritime", "Coastal", "Urban"],
    reviewedOn: "2026-07-12",
    history: { summary: "Shayetet 13 (Flotilla 13) เป็นหน่วยคอมมานโดทางเรือของกองทัพเรืออิสราเอล โดยทั่วไปมีการระบุว่าก่อตั้งราวปี 1948 โดย Yohai Ben-Nun จากกำลัง Palyam (หน่วยทางเรือของ Palmach) แม้ปีก่อตั้งจะมีรายงานไม่ตรงกันในแต่ละแหล่ง หน่วยพัฒนาเป็นกำลังคอมมานโดทางเรือหลักของอิสราเอล มีบทบาทด้านการแทรกซึมจากทะเลสู่ฝั่ง การโจมตีโครงสร้างพื้นฐานทางทะเลของข้าศึก การรวบรวมข่าวกรองทางทะเล การช่วยตัวประกันในทะเล และการเข้าตรวจค้น/ยึดเรือ ตราสัญลักษณ์รูปค้างคาวของหน่วยมีรายงานว่าเริ่มใช้หลังหน่วยถูกเปิดเผยต่อสาธารณะราวปี 1960 หน่วยเกี่ยวข้องกับการสกัดกั้นเรือลำเลียงอาวุธหลายครั้ง (เช่น Karine A) ซึ่งเป็นข้อมูลที่มีการรายงาน และในเหตุการณ์ที่ได้รับการยอมรับล่าสุดคือการเป็นกำลังตอบโต้ชุดแรกในเหตุโจมตี 7 ตุลาคม 2023 ทั้งนี้รายละเอียดวิธีการและขีดความสามารถใต้น้ำในปัจจุบันไม่ได้เปิดเผยต่อสาธารณะ" },
    equipment: {
      dataStatus: "general capability documented / weapon specifics classified",
      // No fetched source attributes specific weapon models to the unit; weapon
      // items are held at research-pending. Only the general maritime capability
      // is officially stated (no methods or underwater specifics).
      primary: [],
      sidearms: [],
      blades: [],
      support: [weapon("Combat boats and diving / underwater operations", "Maritime capability (general)", "IDF ระบุความเชี่ยวชาญด้านการรบทางทะเล การดำน้ำ และการใช้เรือพิเศษ โดยไม่เปิดเผยรุ่นอุปกรณ์หรือวิธีการเฉพาะ", "documented")],
    },
    uniform: { colors: [], patterns: [], headgear: [], armor: [], note: "ไม่มีแหล่งอ้างอิงสาธารณะที่ระบุสีหรือลายพรางเฉพาะของหน่วย รายละเอียดจึงอยู่ในสถานะ research pending หน่วยใช้ตราสัญลักษณ์รูปค้างคาว (มีรายงานว่าเริ่มใช้ราวปี 1960) และเครื่องแต่งกายขึ้นกับภารกิจตั้งแต่งานทางทะเลถึงบนบก ไม่ควรสรุปเป็นเครื่องแบบเดียวสำหรับทุกภารกิจ" },
    gallery: [],
    timeline: [{year:"1948",title:"Formation (reported)",description:"มีการระบุว่าก่อตั้งโดย Yohai Ben-Nun จากกำลัง Palyam (ปีก่อตั้งมีรายงานไม่ตรงกัน)"},{year:"c.1960",title:"Public disclosure & bat insignia",description:"หน่วยถูกเปิดเผยต่อสาธารณะ และเริ่มใช้ตราสัญลักษณ์รูปค้างคาว (ตามข้อมูล JVL)"},{year:"1980s+",title:"Maritime interdictions",description:"เชื่อมโยงกับการสกัดกั้นเรือลำเลียงอาวุธหลายครั้ง (เช่น Karine A) — ข้อมูลที่มีการรายงาน"},{year:"2023",title:"October 7 response",description:"เป็นกำลังตอบโต้ชุดแรกในเหตุ 7 ตุลาคม 2023 (เหตุการณ์ที่ได้รับการยอมรับ)"}],
    sources: [
      { title: "Shayetet 13", publisher: "Israel Defense Forces (IDF)", url: "https://www.idf.il/en/mini-sites/our-corps-units-brigades/elite-units/shayetet-13/", type: "official", accessedAt: "2026-07-12", supports: ["identity","branch","role","equipment"], notes: "หน้าทางการของ IDF ระบุว่าเป็นหน่วยคอมมานโดทางเรือ ปฏิบัติการทางทะเล บนบก และทางอากาศ เชี่ยวชาญการดำน้ำและการใช้เรือพิเศษ (ไม่ระบุอาวุธ)" },
      { title: "Israel Special Forces: Shayetet-13", publisher: "Jewish Virtual Library (AICE)", url: "https://jewishvirtuallibrary.org/shayetet-13", type: "reference", accessedAt: "2026-07-12", supports: ["identity","history","branch","role","timeline"], notes: "ระบุการก่อตั้งปี 1948 โดย Yohai Ben-Nun จาก Palyam บทบาทหน่วย และตราสัญลักษณ์รูปค้างคาวหลังเปิดเผยราวปี 1960" },
      { title: "Wave breakers: An inside look into Israel's elite amphibious commandos", publisher: "Ynetnews", url: "https://www.ynetnews.com/magazine/article/bkge11ezvh", type: "reputable-media", accessedAt: "2026-07-12", supports: ["role","history"], notes: "อธิบายสามสายงาน (ดำน้ำ นำทาง จู่โจม) และบทบาทการเข้าควบคุมเรือ" },
      { title: "Meet Israel's Naval Commando, Which Rescued Hundreds of Hostages Within Hours", publisher: "Israel Defense", url: "https://www.israeldefense.co.il/en/node/59938", type: "reputable-media", accessedAt: "2026-07-12", supports: ["identity","branch","role","timeline"], notes: "ยืนยันสถานะหน่วยคอมมานโดทางเรือของกองทัพเรือ และการตอบโต้เหตุ 7 ตุลาคม 2023" },
    ],
  },
  "JTF2": {
    slug: "jtf2",
    founded: "1 April 1993",
    branch: "Canadian Special Operations Forces Command (CANSOFCOM)",
    unitType: "Special operations / counter-terrorism unit",
    status: "Active",
    personnel: "Not publicly confirmed",
    environment: ["Urban", "Global expeditionary"],
    logoUrl: commons("Joint Task Force Two Logo.png", 500),
    emblemSourceUrl: "https://commons.wikimedia.org/wiki/File:Joint_Task_Force_Two_Logo.png",
    emblemCredit: "Department of National Defence (Canada)",
    emblemLicense: "Public domain (simple text/shapes, below threshold of originality)",
    reviewedOn: "2026-07-12",
    history: { summary: "Joint Task Force 2 (JTF2) จัดตั้งเมื่อวันที่ 1 เมษายน 1993 เมื่อกองทัพแคนาดารับภารกิจต่อต้านการก่อการร้ายและช่วยตัวประกันระดับชาติต่อจากหน่วย Special Emergency Response Team (SERT) ของตำรวจม้าแคนาดา (RCMP) ที่ถูกยุบ กำลังพลชุดแรกมาจากหน่วยของกองทัพบกแคนาดาเป็นหลัก ระยะแรกหน่วยเน้นภารกิจต่อต้านการก่อการร้ายภายในประเทศ หลังเหตุการณ์ 11 กันยายน 2001 หน่วยถูกส่งไปอัฟกานิสถานซึ่งเป็นบทบาทการรบในต่างประเทศครั้งสำคัญครั้งแรก ความสำเร็จในอัฟกานิสถานมีส่วนนำไปสู่การจัดตั้ง Canadian Special Operations Forces Command (CANSOFCOM) ในปี 2006 ซึ่ง JTF2 กลายเป็นหน่วยความพร้อมสูงหลัก ทั้งนี้กิจกรรมจำนวนมากของหน่วยจัดเป็นความลับ รายละเอียดภารกิจ กำลังพล และการวางกำลังปัจจุบันไม่ได้เปิดเผยต่อสาธารณะ บทบาทหลักที่เปิดเผยคือการต่อต้านการก่อการร้าย การช่วยตัวประกัน การปฏิบัติการโดยตรง และการลาดตระเวนพิเศษ" },
    equipment: {
      dataStatus: "unit-specific loadout largely not published",
      // Only the TAC-50/C15 is documented at unit level (DND-confirmed 2017 shot);
      // all other weapon/kit claims are research-pending rather than asserted.
      primary: [weapon("McMillan TAC-50 (Canadian C15 LRSW)", ".50 BMG precision / anti-materiel rifle", "อาวุธแม่นปืนระยะไกลที่ DND ยืนยันว่าทีมซุ่มยิงของ JTF2 ใช้ในภารกิจที่อิรักปี 2017", "documented")],
      sidearms: [],
      blades: [],
      support: [],
    },
    uniform: { colors: [], patterns: [], headgear: [], armor: [], note: "ยังไม่มีแหล่งอ้างอิงสาธารณะที่ยืนยันสีหรือลายพรางเฉพาะของ JTF2 รายละเอียดจึงอยู่ในสถานะ research pending มีการรายงานทั่วไปถึงหมวกเบเรต์สีแทน แต่ลายพราง CADPAT เป็นลายมาตรฐานของกองทัพแคนาดาโดยรวม จึงใช้เป็นหลักฐานการออกให้เฉพาะ JTF2 ไม่ได้" },
    gallery: [],
    timeline: [{year:"1993",title:"Formation (1 April)",description:"จัดตั้งโดยรับภารกิจต่อต้านการก่อการร้าย/ช่วยตัวประกันต่อจาก RCMP SERT ที่ถูกยุบ"},{year:"2001–02",title:"Afghanistan deployment",description:"บทบาทการรบในต่างประเทศครั้งสำคัญครั้งแรก (Task Force K-Bar) — เหตุการณ์ที่ได้รับการยอมรับ"},{year:"2004",title:"U.S. Presidential Unit Citation",description:"ได้รับเกียรติจากการปฏิบัติงานในอัฟกานิสถานปี 2001–02"},{year:"2006",title:"CANSOFCOM created",description:"จัดตั้ง Canadian Special Operations Forces Command โดย JTF2 เป็นหน่วยความพร้อมสูงหลัก"},{year:"2017",title:"Long-range shot (Iraq)",description:"DND ยืนยันการยิงระยะไกลของทีมซุ่มยิง JTF2 ในปฏิบัติการ Operation Impact"}],
    sources: [
      { title: "Canadian special forces unit cited for heroism", publisher: "The Globe and Mail", url: "https://www.theglobeandmail.com/news/national/canadian-special-forces-unit-cited-for-heroism/article1008131/", type: "reputable-media", accessedAt: "2026-07-12", supports: ["history","timeline","role"], notes: "ปี 2004 การได้รับ Presidential Unit Citation และการปฏิบัติงานใน Task Force K-Bar ปี 2001–02" },
      { title: "Canadian sniper in Iraq makes longest confirmed kill shot", publisher: "Global News", url: "https://globalnews.ca/news/3549621/canadian-sniper-in-iraq-makes-longest-confirmed-kill-shot-in-military-history/", type: "reputable-media", accessedAt: "2026-07-12", supports: ["timeline","equipment","role"], notes: "ปี 2017 DND ยืนยันการยิงระยะไกลและอาวุธ TAC-50/C15" },
      { title: "Understanding Canada's Special Operations Forces", publisher: "Project Ploughshares", url: "https://ploughshares.ca/understanding-canadas-special-operations-forces/", type: "academic", accessedAt: "2026-07-12", supports: ["identity","history","branch"], notes: "การก่อตั้งปี 1993 จาก RCMP SERT และการจัดตั้ง CANSOFCOM ปี 2006" },
      { title: "Joint Task Force 2", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/Joint_Task_Force_2", type: "reference", accessedAt: "2026-07-12", supports: ["identity","history","role","timeline"], notes: "แหล่งอ้างอิงตติยภูมิ ใช้ประกอบข้อเท็จจริงที่ตรวจสอบได้" },
      { title: "Canadian Special Operations Forces Command", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/Canadian_Special_Operations_Forces_Command", type: "reference", accessedAt: "2026-07-12", supports: ["branch","identity"], notes: "CANSOFCOM ปี 2006 มีห้าหน่วย JTF2 รับผิดชอบ CT/ช่วยตัวประกัน" },
      { title: "File:Joint Task Force Two Logo.png", publisher: "Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Joint_Task_Force_Two_Logo.png", type: "archive", accessedAt: "2026-07-12", supports: ["media"], notes: "ตราสัญลักษณ์ JTF2 (แหล่ง DND) สถานะสาธารณสมบัติ (รูปทรง/ข้อความอย่างง่าย ต่ำกว่าเกณฑ์ลิขสิทธิ์)" },
    ],
  },
  "MARCOS": {
    slug: "marcos",
    founded: "February 1987 (as IMSF; MCF from 1991)",
    branch: "Indian Navy",
    unitType: "Marine commando / maritime special operations",
    status: "Active",
    personnel: "Classified",
    environment: ["Maritime", "Coastal", "Amphibious"],
    reviewedOn: "2026-07-12",
    history: { summary: "MARCOS (Marine Commando Force — MCF) เป็นหน่วยรบพิเศษของกองทัพเรืออินเดีย จุดเริ่มต้นมาจากการที่กองทัพเรืออินเดียตัดสินใจสร้างขีดความสามารถปฏิบัติการพิเศษทางทะเลในช่วงกลางทศวรรษ 1980 หน่วยถูกจัดตั้งอย่างเป็นทางการในเดือนกุมภาพันธ์ 1987 ภายใต้ชื่อ Indian Marine Special Force (IMSF) โดยพัฒนาจากสายงานประดาน้ำของกองทัพเรือ นายทหารรุ่นก่อตั้งบางส่วนมีรายงานว่าไปฝึกกับหน่วย U.S. Navy SEALs และ Special Boat Service ของอังกฤษ ต่อมาในปี 1991 หน่วยเปลี่ยนชื่อเป็น Marine Commando Force และคำย่อ 'MARCOS' เป็นที่ใช้กันแพร่หลายในภายหลัง ฐานเดิมอยู่ที่ INS Abhimanyu เมืองมุมไบ และมีการจัดตั้งฐานเฉพาะ INS Karna ใกล้เมืองวิสาขปัตนัมเมื่อวันที่ 12 กรกฎาคม 2016 หน่วยมีบทบาทด้านการต่อต้านการก่อการร้ายทางทะเล การลาดตระเวนสะเทินน้ำสะเทินบก การเข้าตรวจค้นเรือ และการต่อต้านโจรสลัด มีการบันทึกว่าหน่วยเข้าร่วมตอบโต้เหตุโจมตีมุมไบเมื่อ 26 พฤศจิกายน 2008 และในเดือนมกราคม 2024 เข้าช่วยเหลือเรือ MV Lila Norfolk ที่ถูกยึดในทะเลอาหรับเหนือ ข้อมูลกำลังพลจัดเป็นความลับ และคำกล่าวอ้างเชิงยกย่องหรือสถิติการฝึกที่แพร่หลายจำนวนมากไม่มีการยืนยันอย่างเป็นทางการ" },
    equipment: {
      dataStatus: "reported — official issue not published",
      primary: [weapon("IWI Tavor TAR-21", "5.56×45 mm bullpup carbine", "มีรายงานว่ากองทัพเรืออินเดียจัดหา TAR-21 สำหรับ MARCOS แต่แหล่งอาวุธเฉพาะทางระบุว่ารุ่น 'Zittara' ของอินเดียเป็นของกองทัพบก การระบุประจำหน่วย MARCOS จึงเป็นข้อมูลที่มีการรายงาน", "reported"), weapon("Heckler & Koch MP5 family", "9×19 mm submachine gun", "มีการรายงานการใช้ในงานระยะประชิด/ต่อต้านการก่อการร้าย (รวมถึงเหตุมุมไบ 2008)", "reported")],
      sidearms: [],
      blades: [],
      support: [weapon("Combat diving and maritime special operations equipment", "Maritime capability (general)", "หน่วยพัฒนาจากสายงานประดาน้ำของกองทัพเรือ และเชี่ยวชาญปฏิบัติการทางทะเล (ข้อมูลทั่วไป ไม่ระบุรุ่นหรือวิธีการ)", "reported")],
    },
    uniform: { colors: [], patterns: [], headgear: [], armor: [], note: "ไม่มีแหล่งอ้างอิงที่ระบุสีหรือลายพรางเฉพาะของหน่วยอย่างเป็นทางการ รายละเอียดจึงอยู่ในสถานะ research pending หน่วยใช้ทั้งชุดปฏิบัติการทางทะเลและชุดลายพรางบนบกตามภารกิจ จึงไม่ควรสรุปเป็นเครื่องแบบเดียว และไม่มีการระบุค่าสีทางการ" },
    gallery: [],
    timeline: [{year:"1987",title:"Raised as IMSF (Feb)",description:"จัดตั้งเป็น Indian Marine Special Force พัฒนาจากสายงานประดาน้ำของกองทัพเรือ"},{year:"1991",title:"Renamed Marine Commando Force",description:"เปลี่ยนชื่อเป็น MCF และใช้คำย่อ MARCOS ในภายหลัง"},{year:"2008",title:"Mumbai (26/11) response",description:"เข้าร่วมตอบโต้เหตุโจมตีมุมไบที่โรงแรม Taj และ Trident (เหตุการณ์ที่ได้รับการบันทึก)"},{year:"2016",title:"INS Karna commissioned",description:"จัดตั้งฐานเฉพาะใกล้เมืองวิสาขปัตนัมเมื่อ 12 กรกฎาคม 2016"},{year:"2024",title:"MV Lila Norfolk rescue",description:"เข้าช่วยเหลือเรือที่ถูกยึดในทะเลอาหรับเหนือ ลูกเรือ 21 คนปลอดภัย"}],
    sources: [
      { title: "MARCOS", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/MARCOS", type: "reference", accessedAt: "2026-07-12", supports: ["identity","history","branch","role","timeline","equipment"], notes: "การก่อตั้งปี 1987 (IMSF) เปลี่ยนชื่อ MCF ปี 1991 ฐาน INS Abhimanyu/INS Karna บทบาท และการตอบโต้เหตุมุมไบ 2008" },
      { title: "MARCOs conduct rescue ops on hijacked ship — Who are MARCOS", publisher: "India TV News", url: "https://www.indiatvnews.com/explainers/marcos-conduct-rescue-ops-on-hijacked-ship-in-arabian-sea-who-are-indian-navy-s-elite-commandos-who-is-marcos-latest-updates-2024-01-06-910513", type: "reputable-media", accessedAt: "2026-07-12", supports: ["identity","role","timeline","history"], notes: "ยืนยันการก่อตั้งปี 1987 (IMSF) บทบาททางทะเล/อากาศ/บก และการช่วยเหลือ MV Lila Norfolk ปี 2024" },
      { title: "IWI TAR-21 (Tavor)", publisher: "MilitaryFactory.com", url: "https://www.militaryfactory.com/smallarms/detail.php?smallarms_id=592", type: "reference", accessedAt: "2026-07-12", supports: ["equipment"], notes: "แหล่งอาวุธเฉพาะทางอิสระ ระบุว่ารุ่น 'Zittara' ของอินเดียเป็นของกองทัพบก จึงช่วยกำกับการระบุ Tavor ให้ MARCOS ว่าเป็นเพียงข้อมูลที่มีการรายงาน" },
    ],
  },
  "THAI SEAL": {
    slug: "royal-thai-navy-seal",
    founded: "1956",
    branch: "Royal Thai Navy (Naval Special Warfare Command)",
    unitType: "Naval special warfare",
    status: "Active",
    personnel: "Not publicly confirmed",
    environment: ["Maritime", "Coastal", "Riverine"],
    logoUrl: commons("Royal Thai Navy Seals Emblem.svg", 500),
    coverImage: commons("4171065 Royal Thai Navy SEAL prepares to parachute from a U.S. Air Force MC-130H Combat Talon II at U-Tapao.jpg", 1800),
    mediaStatus: "verified",
    coverSourceUrl: "https://commons.wikimedia.org/wiki/File:4171065_Royal_Thai_Navy_SEAL_prepares_to_parachute_from_a_U.S._Air_Force_MC-130H_Combat_Talon_II_at_U-Tapao.jpg",
    coverCredit: "Capt. Jessica Tait (U.S. Air Force)",
    coverLicense: "Public domain (U.S. federal government work)",
    emblemSourceUrl: "https://commons.wikimedia.org/wiki/File:Royal_Thai_Navy_Seals_Emblem.svg",
    emblemCredit: "Sodacan (SVG reproduction)",
    emblemLicense: "Public domain",
    reviewedOn: "2026-07-12",
    history: { summary: "หน่วยสงครามพิเศษทางเรือของกองทัพเรือไทย (Naval Special Warfare Command — หน่วยบัญชาการสงครามพิเศษทางเรือ) หรือที่รู้จักในชื่อ Royal Thai Navy SEALs มีจุดเริ่มต้นในปี 1956 เมื่อกองทัพเรือไทยจัดตั้งหน่วยประดาน้ำจู่โจมขนาดเล็กโดยรับแบบอย่างจากหน่วย Underwater Demolition Teams ของกองทัพเรือสหรัฐฯ ต่อมามีการขยายและปรับโครงสร้าง จนวันที่ 18 มีนาคม 1991 ได้รับการยกฐานะเป็นกองรบพิเศษทางเรือ (Naval Special Warfare Group) ขึ้นตรงต่อกองเรือยุทธการ และในวันที่ 7 สิงหาคม 2008 เป็นหน่วยบัญชาการสงครามพิเศษทางเรือ ภารกิจหลักครอบคลุมการทำลายใต้น้ำ การเก็บกู้และทำลายสิ่งกีดขวาง การลาดตระเวนและข่าวกรอง และการต่อต้านการก่อการร้ายทางทะเล หน่วยเป็นที่รู้จักในระดับนานาชาติจากปฏิบัติการช่วยเหลือทีมหมูป่าที่ถ้ำหลวงในปี 2018 โดยอดีตนักทำลายใต้น้ำ จ่าเอก Saman Kunan เสียชีวิตขณะวางถังอากาศเมื่อวันที่ 6 กรกฎาคม 2018 และต่อมานักทำลายใต้น้ำประจำการ จ่า Beirut Pakbara เสียชีวิตจากการติดเชื้อในเดือนธันวาคม 2019 หลังปฏิบัติการดังกล่าวมีการนำการดำน้ำในถ้ำเข้าสู่หลักสูตรการฝึก" },
    equipment: {
      dataStatus: "reported — unit-specific models not published",
      // No unit-specific weapon model is verified in fetched sources; specific
      // models are held at research-pending. Only the general naval-special-warfare
      // capability is described by the reference source.
      primary: [],
      sidearms: [],
      blades: [],
      support: [weapon("Combat diving / UDT and special operations craft", "Maritime capability (general)", "แหล่งอ้างอิงระบุบทบาทการทำลายใต้น้ำและการใช้เรือปฏิบัติการพิเศษ (เช่น Seafox, Zodiac) โดยไม่ยืนยันรุ่นอาวุธเฉพาะหน่วย", "reported")],
    },
    uniform: { colors: [], patterns: [], headgear: [], armor: [], note: "ยังไม่มีแหล่งอ้างอิงเฉพาะหน่วยที่ยืนยันสี ลายพราง หรือเครื่องแบบของหน่วย รายละเอียดจึงอยู่ในสถานะ research pending ไม่ควรสรุปสีน้ำเงินกองทัพเรือ ลายวูดแลนด์ หรือลายพรางใด ๆ โดยไม่มีแหล่งยืนยัน" },
    gallery: [{url:commons("4171065 Royal Thai Navy SEAL prepares to parachute from a U.S. Air Force MC-130H Combat Talon II at U-Tapao.jpg",1500),status:"verified",caption:"เจ้าหน้าที่สงครามพิเศษทางเรือของไทยเตรียมกระโดดร่มจาก MC-130H ระหว่าง Cobra Gold 2018 ที่อู่ตะเภา (ภาพ Capt. Jessica Tait/U.S. DoD สาธารณสมบัติ)"},{url:commons("Thail and US Navy SEALS training.jpg",1500),status:"verified",caption:"การฝึกร่วมระหว่าง Royal Thai Navy SEALs และ U.S. Navy SEALs (Cobra Gold) — ภาพนี้แสดงทั้งกำลังไทยและสหรัฐฯ"}],
    timeline: [{year:"1956",title:"Formation",description:"กองทัพเรือไทยจัดตั้งหน่วยประดาน้ำจู่โจม โดยรับแบบจาก UDT ของสหรัฐฯ"},{year:"1991",title:"Naval Special Warfare Group",description:"ยกฐานะเป็นกองรบพิเศษทางเรือ ขึ้นตรงกองเรือยุทธการ (18 มีนาคม 1991)"},{year:"2008",title:"Naval Special Warfare Command",description:"ยกฐานะเป็นหน่วยบัญชาการสงครามพิเศษทางเรือ (7 สิงหาคม 2008)"},{year:"2018",title:"Tham Luang cave rescue",description:"มีบทบาทสำคัญในการช่วยเหลือที่ถ้ำหลวง อดีตนักทำลายใต้น้ำ Saman Kunan เสียชีวิต"},{year:"2019",title:"Post-rescue",description:"นักทำลายใต้น้ำ Beirut Pakbara เสียชีวิตจากการติดเชื้อที่ได้รับระหว่างปฏิบัติการ"}],
    sources: [
      { title: "Naval Special Warfare Command (Thailand)", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/Naval_Special_Warfare_Command_(Thailand)", type: "reference", accessedAt: "2026-07-12", supports: ["identity","history","branch","role","timeline","equipment"], notes: "ยืนยันชื่อทางการ (หน่วยบัญชาการสงครามพิเศษทางเรือ) การก่อตั้งปี 1956 การยกฐานะปี 1991/2008 และบทบาทหน่วย" },
      { title: "Former Thai navy SEAL is first casualty of cave rescue effort", publisher: "PBS NewsHour", url: "https://www.pbs.org/newshour/world/former-thai-navy-seal-is-first-casualty-of-cave-rescue-effort", type: "reputable-media", accessedAt: "2026-07-12", supports: ["history","timeline"], notes: "การเสียชีวิตของ Saman Kunan ระหว่างปฏิบัติการถ้ำหลวงปี 2018" },
      { title: "Thailand cave rescuer dies after year-long blood infection", publisher: "Al Jazeera", url: "https://www.aljazeera.com/news/2019/12/28/thailand-cave-rescuer-dies-after-year-long-blood-infection", type: "reputable-media", accessedAt: "2026-07-12", supports: ["history","timeline"], notes: "การเสียชีวิตของ Beirut Pakbara ปลายปี 2019 จากการติดเชื้อ" },
      { title: "Tham Luang cave rescue", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/Tham_Luang_cave_rescue", type: "reference", accessedAt: "2026-07-12", supports: ["history","timeline"], notes: "บทบาทของหน่วย SEAL ในการช่วยเหลือ และการนำการดำน้ำในถ้ำเข้าสู่การฝึก" },
      { title: "File:4171065 Royal Thai Navy SEAL prepares to parachute at U-Tapao.jpg", publisher: "Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:4171065_Royal_Thai_Navy_SEAL_prepares_to_parachute_from_a_U.S._Air_Force_MC-130H_Combat_Talon_II_at_U-Tapao.jpg", type: "archive", accessedAt: "2026-07-12", supports: ["media"], notes: "ภาพปกยืนยันว่าเป็นเจ้าหน้าที่สงครามพิเศษทางเรือของไทย (Cobra Gold 2018) เครดิต Capt. Jessica Tait สถานะสาธารณสมบัติ (US DoD)" },
      { title: "File:Royal Thai Navy Seals Emblem.svg", publisher: "Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Royal_Thai_Navy_Seals_Emblem.svg", type: "archive", accessedAt: "2026-07-12", supports: ["media"], notes: "ตราสัญลักษณ์เฉพาะหน่วย (ภาพวาด SVG โดย Sodacan อิงจากตราหน่วย) สถานะสาธารณสมบัติ" },
    ],
  },
  "SASR": {
    slug: "australian-sasr",
    founded: "1957 (Regiment from 1964)",
    branch: "Australian Army — Special Operations Command (SOCOMD)",
    unitType: "Special forces / strategic reconnaissance",
    status: "Active",
    personnel: "Not publicly confirmed",
    environment: ["Desert", "Jungle", "Long-range reconnaissance"],
    coverImage: commons("Australian SAS long range patrol vehicle at the AWM August 2012.JPG", 1800),
    mediaStatus: "verified",
    coverSourceUrl: "https://commons.wikimedia.org/wiki/File:Australian_SAS_long_range_patrol_vehicle_at_the_AWM_August_2012.JPG",
    coverCredit: "Nick-D",
    coverLicense: "CC BY-SA 3.0",
    reviewedOn: "2026-07-12",
    history: { summary: "Special Air Service Regiment (SASR) ของออสเตรเลียมีต้นกำเนิดจากกองร้อยที่ 1 Special Air Service ซึ่งจัดตั้งที่ Swanbourne รัฐเวสเทิร์นออสเตรเลียในปี 1957 โดยรับแบบอย่างจากหน่วย SAS ของอังกฤษ รวมถึงคติพจน์ 'Who Dares Wins' ต่อมาได้รับการยกฐานะเป็นกรม (Regiment) ในปี 1964 การปฏิบัติการครั้งแรกคือที่เกาะบอร์เนียวระหว่างการเผชิญหน้าอินโดนีเซีย โดยชุดแรกเดินทางถึงบรูไนเมื่อ 16 กุมภาพันธ์ 1965 ได้รับการฝึกจากทหาร 22 SAS ของอังกฤษ และเริ่มปฏิบัติการข้ามพรมแดน 'Claret' ตั้งแต่ 1 พฤษภาคม 1965 ระหว่างปี 1966–1971 กองร้อยรบทั้งสามผลัดกันปฏิบัติหน้าที่ในเวียดนามคนละสองวาระ ประจำที่ Nui Dat ทำหน้าที่เป็น 'หูและตา' ของกองกำลังเฉพาะกิจออสเตรเลียที่ 1 เน้นภารกิจลาดตระเวนและซุ่มโจมตี ปัจจุบัน SASR เป็นหน่วยรบพิเศษของกองทัพบกออสเตรเลียภายใต้ Special Operations Command มีบทบาทด้านการปฏิบัติการพิเศษและการต่อต้านการก่อการร้าย โดยในปี 2021 มีการยกระดับสายการบังคับบัญชาของหน่วยเป็นระดับพันเอก" },
    equipment: {
      dataStatus: "research-pending — no current loadout asserted",
      primary: [],
      sidearms: [],
      blades: [],
      support: [weapon("Long Range Patrol Vehicle (LRPV)", "Desert / long-range mobility", "ยานลาดตระเวนระยะไกลของ SASR มีตัวอย่างจัดแสดงที่ Australian War Memorial (ได้รับความเสียหายจากการสู้รบในอัฟกานิสถาน) — หลักฐานเชิงวัตถุ", "documented")],
    },
    uniform: { colors: [{ name: "Sand / fawn (beret)", visualHex: "#c6ab82", confidence: "documented", isApproximate: true, sourceRefs: [] }], patterns: [], headgear: ["Fawn / sand beret", "Winged-dagger cap badge — Who Dares Wins"], armor: [], note: "หมวกเบเรต์สีแทน/ทรายและตราหมวกมีดปีก 'Who Dares Wins' มีบันทึกโดย Australian War Memorial (สวมบนฐานที่ตั้ง ไม่ใช่ในการรบ) ส่วนลายพราง DPCU/AMCU เป็นลายมาตรฐานของกองทัพบกออสเตรเลียโดยรวม จึงไม่ใช่หลักฐานเฉพาะ SASR สีที่แสดงเป็นภาพอ้างอิงโดยประมาณ ไม่ใช่ค่าสีทางการ" },
    gallery: [{url:commons("Australian SAS long range patrol vehicle at the AWM August 2012.JPG",1500),status:"verified",caption:"ยานลาดตระเวนระยะไกล (LRPV) ของ SASR จัดแสดงที่ Australian War Memorial ได้รับความเสียหายจากการสู้รบในอัฟกานิสถาน (ภาพ Nick-D, CC BY-SA 3.0, via Wikimedia Commons)"}],
    timeline: [{year:"1957",title:"1 SAS Company raised",description:"จัดตั้งกองร้อยที่ 1 Special Air Service ที่ Swanbourne รัฐเวสเทิร์นออสเตรเลีย"},{year:"1964",title:"Regiment formed",description:"ยกฐานะเป็น Special Air Service Regiment"},{year:"1965",title:"Borneo deployment",description:"ปฏิบัติการครั้งแรกที่บอร์เนียว รวมถึงปฏิบัติการข้ามพรมแดน 'Claret' (เหตุการณ์ที่ได้รับการบันทึก)"},{year:"1966–71",title:"Vietnam service",description:"กองร้อยรบทั้งสามปฏิบัติหน้าที่ในเวียดนาม ประจำที่ Nui Dat เน้นการลาดตระเวน"},{year:"2021",title:"Command reform",description:"ยกระดับสายการบังคับบัญชาของหน่วยเป็นระดับพันเอก"}],
    sources: [
      { title: "1 Squadron, Special Air Service Regiment (Borneo)", publisher: "Australian War Memorial", url: "https://www.awm.gov.au/collection/U60458", type: "archive", accessedAt: "2026-07-12", supports: ["history","timeline"], notes: "การวางกำลังครั้งแรกที่บอร์เนียวปี 1965 การฝึกโดย 22 SAS อังกฤษ และปฏิบัติการ Claret" },
      { title: "1st Squadron, Special Air Service Regiment (Vietnam)", publisher: "Australian War Memorial", url: "https://www.awm.gov.au/collection/U53505", type: "archive", accessedAt: "2026-07-12", supports: ["history","timeline"], notes: "การปฏิบัติหน้าที่ในเวียดนามปี 1966–1971 ที่ Nui Dat บทบาทลาดตระเวน" },
      { title: "SASR beret and cap badge (Trooper D R Barnby, 2 Squadron SASR)", publisher: "Australian War Memorial", url: "https://www.awm.gov.au/collection/C163653", type: "archive", accessedAt: "2026-07-12", supports: ["uniform"], notes: "หมวกเบเรต์สีแทนและตราหมวกมีดปีก 'Who Dares Wins' (สวมบนฐาน ไม่ใช่ในการรบ)" },
      { title: "Australia strengthens command and control structure of SASR unit", publisher: "Army Technology", url: "https://www.army-technology.com/news/australia-command-control-structure-sasr-unit/", type: "reputable-media", accessedAt: "2026-07-12", supports: ["identity","history","branch","role","timeline"], notes: "การจัดตั้งกรมปี 1964 บทบาทภายใต้ Special Operations Command และการยกระดับสายการบังคับบัญชาปี 2021" },
      { title: "File:Australian SAS long range patrol vehicle at the AWM August 2012.JPG", publisher: "Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Australian_SAS_long_range_patrol_vehicle_at_the_AWM_August_2012.JPG", type: "archive", accessedAt: "2026-07-12", supports: ["media"], notes: "ภาพ LRPV ของ SASR ที่ AWM สัญญาอนุญาต CC BY-SA 3.0 เครดิต Nick-D" },
    ],
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
  JTF2: "Canada",
  MARCOS: "India",
  "THAI SEAL": "Thailand",
  SASR: "Australia",
  NZSAS: "New Zealand",
};

// -------------------- Minimum (Basic) Dossiers --------------------
// Researched minimum dossiers keyed by composite identity `${country}::${code}`
// (codes such as SBS/GIS are not globally unique, so a bare code must never be
// used as an identity here). These are intentionally NOT expanded/featured
// dossiers: they are merged over the generic fallback but below any `detailed`
// expanded override, and they never set detailLevel "expanded" — so they stay
// out of getFeaturedUnits() and the featured-rich count.
//
// Each entry carries the researched minimum: official founded/formation period,
// parent branch, a Thai short history, and one or more valid content sources as
// the evidence requires. A necessary source is never removed merely to force a
// Basic classification, so editorial completeness may compute as Rich while
// detailLevel stays "basic" (these entries are still never expanded/featured).
// Weapons, uniform, media and detailed timeline are deliberately left at the
// research-pending fallback. `reviewedOn` is present only where the identity,
// branch and sources were confirmed against the record.
const minimumDossiers = {
  "United States::24 STS": {
    founded: "1987 (redesignated 24th Special Tactics Squadron, 1992)",
    branch: "United States Air Force — Air Force Special Operations Command (AFSOC)",
    unitType: "Air Force special tactics squadron",
    status: "Active",
    reviewedOn: "2026-07-12",
    history: { summary: "24th Special Tactics Squadron เป็นหน่วยของกองทัพอากาศสหรัฐฯ ภายใต้ Air Force Special Operations Command (AFSOC) สายเชื้อสายในบทบาทสงครามพิเศษสมัยใหม่เริ่มจากการจัดตั้งเป็น 1724th Combat Control Squadron เมื่อวันที่ 1 พฤษภาคม 1987 เปลี่ยนเป็น 1724th Special Tactics Squadron ในเดือนตุลาคม 1987 และได้รับการกำหนดใหม่เป็น 24th Special Tactics Squadron เมื่อวันที่ 31 มีนาคม 1992 บทบาทที่เปิดเผยต่อสาธารณะคือการเป็นกำลังภาคพื้นด้านสงครามพิเศษของกองทัพอากาศ ครอบคลุมงานควบคุมการรบ (combat control) การกู้ภัยทางยุทธวิธี (pararescue) การลาดตระเวนพิเศษ และการควบคุมอากาศยานส่วนหน้า โดยหน่วยทำหน้าที่เป็นองค์ประกอบของกองทัพอากาศให้กับ Joint Special Operations Command (JSOC) ในปี 2025 กองบิน 24th Special Operations Wing ซึ่งเคยเป็นหน่วยเหนือถูกปลดประจำการเมื่อวันที่ 16 พฤษภาคม 2025 พร้อมการปรับโครงสร้าง Air Force Special Tactics โดยหน่วยยังคงสังกัด AFSOC ทั้งนี้รายละเอียดกำลังพลและวิธีปฏิบัติจัดเป็นความลับ" },
    sources: [
      { title: "24 Special Tactics Squadron (AFSOC) — Fact Sheet", publisher: "Air Force Historical Research Agency", url: "https://www.dafhistory.af.mil/About-Us/Fact-Sheets/Display/Article/432747/24-special-tactics-squadron-afsoc/", type: "official", accessedAt: "2026-07-12", supports: ["identity", "history"], notes: "เอกสารข้อเท็จจริงทางการของ Air Force Historical Research Agency สนับสนุนตัวตนและสายเชื้อสายของหน่วย ช่วงการจัดตั้งปี 1987 และการกำหนดใหม่เป็น 24th Special Tactics Squadron ในปี 1992" },
      { title: "Special Tactics Enterprise Transitions as 24 SOW Flag Furled", publisher: "Air Force Special Operations Command (AFSOC)", url: "https://www.afsoc.af.mil/News/Article-Display/Article/4193224/special-tactics-enterprise-transitions-as-24-sow-flag-furled/", type: "official", accessedAt: "2026-07-12", supports: ["history"], notes: "แหล่งข่าวทางการ AFSOC สนับสนุนการปรับโครงสร้าง Air Force Special Tactics และการปลดประจำการ 24th Special Operations Wing เมื่อ 16 พฤษภาคม 2025 (ไม่ได้ระบุสายการบังคับบัญชาโดยตรงของ 24th STS)" },
    ],
  },
  "United States::GREEN BERETS": {
    founded: "1952",
    branch: "United States Army — 1st Special Forces Command (Airborne), USASOC",
    unitType: "Army special forces (unconventional warfare)",
    status: "Active",
    reviewedOn: "2026-07-12",
    history: { summary: "United States Army Special Forces หรือที่รู้จักในชื่อ Green Berets เป็นหน่วยรบพิเศษของกองทัพบกสหรัฐฯ ก่อตั้งในปี 1952 เมื่อมีการจัดตั้ง 10th Special Forces Group (Airborne) ที่ Fort Bragg รัฐนอร์ทแคโรไลนา ภายใต้การนำของพันเอก Aaron Bank โดยสืบทอดแนวคิดสงครามนอกแบบจากหน่วย Office of Strategic Services (OSS) ในสงครามโลกครั้งที่สอง หน่วยพัฒนาควบคู่กับ Psychological Warfare School ซึ่งต่อมาเป็น John F. Kennedy Special Warfare Center and School หมวกเบเรต์สีเขียวอันเป็นสัญลักษณ์ได้รับการรับรองอย่างเป็นทางการในสมัยประธานาธิบดี John F. Kennedy เมื่อปี 1961 ภารกิจหลักตามหลักนิยมที่เปิดเผยประกอบด้วยสงครามนอกแบบ (unconventional warfare) การป้องกันภายในให้ต่างประเทศ (foreign internal defense) การปฏิบัติการโดยตรง การต่อต้านการก่อการร้าย และการลาดตระเวนพิเศษ ปัจจุบันหน่วยขึ้นตรงต่อ 1st Special Forces Command (Airborne) ภายใต้ United States Army Special Operations Command (USASOC)" },
    sources: [
      { title: "U.S. Army Branch Birthdays — Special Forces", publisher: "U.S. Army Center of Military History", url: "https://history.army.mil/Research/Reference-Topics/Army-Birthdays/Branch-Birthday/", type: "official", accessedAt: "2026-07-12", supports: ["history"], notes: "ศูนย์ประวัติศาสตร์การทหารกองทัพบกสหรัฐฯ (CMH) สนับสนุนประวัติและช่วงการก่อตั้งของเหล่า Special Forces" },
      { title: "1st Special Forces Command (Airborne)", publisher: "United States Army (army.mil)", url: "https://www.army.mil/1sfc", type: "official", accessedAt: "2026-07-12", supports: ["identity", "branch", "role"], notes: "หน้าทางการของกองทัพบกสหรัฐฯ ยืนยันตัวตน สังกัด (1st Special Forces Command ภายใต้ USASOC) และบทบาทของหน่วย Special Forces" },
    ],
  },
  "United States::75 RGR": {
    founded: "1974 (battalions); regiment established 1986",
    branch: "United States Army — 75th Ranger Regiment, USASOC",
    unitType: "Airborne light infantry / special operations raid force",
    status: "Active",
    reviewedOn: "2026-07-12",
    history: { summary: "75th Ranger Regiment เป็นหน่วยจู่โจมทางยุทธการของกองทัพบกสหรัฐฯ ในเดือนมกราคม 1974 พลเอก Creighton Abrams เสนาธิการทหารบก สั่งการให้จัดตั้งกองพันเรนเจอร์ กองพันที่ 1 ได้รับการจัดตั้งและกระโดดร่มลงที่ Fort Stewart รัฐจอร์เจีย เมื่อวันที่ 1 กรกฎาคม 1974 ตามด้วยกองพันที่ 2 ที่ Fort Lewis รัฐวอชิงตัน เมื่อวันที่ 1 ตุลาคม 1974 ต่อมาในปี 1984 มีการจัดตั้งกองพันที่ 3 พร้อมกองบังคับการกรม และในปี 1986 จึงจัดตั้งเป็น 75th Ranger Regiment อย่างเป็นทางการ โดยรับสืบทอดเชื้อสายจากหน่วยเรนเจอร์และ Merrill's Marauders ในสงครามโลกครั้งที่สอง บทบาทที่เปิดเผยต่อสาธารณะเน้นการปฏิบัติการโดยตรงขนาดใหญ่ การเข้ายึดสนามบิน และการจู่โจมทางอากาศ ปัจจุบันหน่วยขึ้นตรงต่อ United States Army Special Operations Command (USASOC) คติพจน์ประจำหน่วยคือ 'Rangers Lead the Way' และ 'Sua Sponte'" },
    sources: [
      { title: "75th Ranger Regiment History", publisher: "U.S. Army Special Operations Command (soc.mil)", url: "https://www.soc.mil/rangers/history.html", type: "official", accessedAt: "2026-07-12", supports: ["identity", "history", "branch", "role"], notes: "หน้าประวัติทางการของ USASOC ยืนยันคำสั่งจัดตั้งปี 1974 การจัดตั้งกองพันที่ 1–3 การจัดตั้งกรมในปี 1986 และเชื้อสายจากเรนเจอร์สงครามโลกครั้งที่สอง" },
    ],
  },
  "United States::MARSOC": {
    founded: "2006 (MARSOC activated; regiment redesignated Marine Raider Regiment, 2015)",
    branch: "United States Marine Corps — Marine Forces Special Operations Command (MARSOC), USSOCOM",
    unitType: "Marine special operations regiment",
    status: "Active",
    reviewedOn: "2026-07-12",
    history: { summary: "Marine Raider Regiment เป็นหน่วยรบหลักของ United States Marine Corps Forces Special Operations Command (MARSOC) ซึ่งเป็นส่วนสนับสนุนของนาวิกโยธินสหรัฐฯ ให้กับ United States Special Operations Command (USSOCOM) จุดเริ่มต้นมาจากการจัดตั้งหน่วยทดลอง MCSOCOM Detachment 1 ในปี 2003 ที่ปฏิบัติงานร่วมกับหน่วยปฏิบัติการพิเศษอื่น หลังพิสูจน์ขีดความสามารถ MARSOC จึงได้รับการจัดตั้งอย่างเป็นทางการเมื่อวันที่ 24 กุมภาพันธ์ 2006 ที่ Camp Lejeune รัฐนอร์ทแคโรไลนา โดยกำลังพลรุ่นแรกส่วนใหญ่มาจากกองร้อยลาดตระเวนกำลังรบที่ 1 และ 2 (Force Reconnaissance) ในปี 2014 หน่วยรองในสังกัดได้รับการเปลี่ยนชื่อเป็น Marine Raiders เพื่อฟื้นชื่อหน่วย Raider อันเป็นตำนานในสงครามโลกครั้งที่สอง และในปี 2015 กรมได้รับการกำหนดใหม่เป็น Marine Raider Regiment บทบาทที่เปิดเผยครอบคลุมการปฏิบัติการโดยตรง การลาดตระเวนพิเศษ และการป้องกันภายในให้ต่างประเทศ คติพจน์ประจำหน่วยคือ 'Spiritus Invictus'" },
    sources: [
      { title: "About MARSOC", publisher: "U.S. Marine Corps Forces Special Operations Command", url: "https://www.marsoc.marines.mil/about.aspx", type: "official", accessedAt: "2026-07-12", supports: ["identity", "history", "branch", "role"], notes: "เว็บไซต์ทางการของ MARSOC ยืนยันการจัดตั้งปี 2006 การเป็นส่วนของนาวิกโยธินใน USSOCOM และการใช้ชื่อ Marine Raiders" },
    ],
  },
  "Canada::CSOR": {
    founded: "13 August 2006",
    branch: "Canadian Armed Forces — Canadian Special Operations Forces Command (CANSOFCOM)",
    unitType: "Special operations regiment",
    status: "Active",
    reviewedOn: "2026-07-12",
    history: { summary: "Canadian Special Operations Regiment (CSOR) เป็นหน่วยรบพิเศษของกองทัพแคนาดา จัดตั้งขึ้นเมื่อวันที่ 13 สิงหาคม 2006 ซึ่งเป็นส่วนหนึ่งของการปรับโครงสร้างครั้งใหญ่ที่นำไปสู่การก่อตั้ง Canadian Special Operations Forces Command (CANSOFCOM) เมื่อวันที่ 1 กุมภาพันธ์ 2006 หน่วยมีที่ตั้งหลักที่ Canadian Forces Base Petawawa รัฐออนแทรีโอ และมีผู้บังคับหน่วยเป็นนายทหารระดับพันโท ภารกิจที่เปิดเผยต่อสาธารณะคือการสร้างและใช้กำลังพลความพร้อมสูงเพื่อปฏิบัติการพิเศษเต็มรูปแบบทั้งในและต่างประเทศ ตามวัตถุประสงค์ที่ผู้บัญชาการทหารสูงสุด (Chief of the Defence Staff) กำหนด ครอบคลุมการปฏิบัติการโดยตรง การลาดตระเวนพิเศษ และการฝึกและให้คำปรึกษาแก่กำลังของประเทศพันธมิตร โดยหน่วยขึ้นตรงต่อ CANSOFCOM" },
    sources: [
      { title: "Canadian Special Operations Regiment", publisher: "Canadian Special Operations Forces Command (Canada.ca)", url: "https://www.canada.ca/en/special-operations-forces-command/corporate/organizational-structure/so-regiment.html", type: "official", accessedAt: "2026-07-12", supports: ["identity", "history", "branch", "role"], notes: "หน้าทางการของรัฐบาลแคนาดา ยืนยันการจัดตั้งปี 2006 การขึ้นตรงต่อ CANSOFCOM ที่ตั้ง CFB Petawawa และบทบาทปฏิบัติการพิเศษเต็มรูปแบบ" },
    ],
  },
  "Mexico::FES": {
    founded: "1 April 2001",
    branch: "Secretaría de Marina — Armada de México",
    unitType: "Naval special operations force",
    status: "Active",
    reviewedOn: "2026-07-12",
    history: { summary: "Fuerzas Especiales (FES) เป็นหน่วยปฏิบัติการพิเศษของ Armada de México ภายใต้ Secretaría de Marina จัดตั้งขึ้นเมื่อวันที่ 1 เมษายน 2001 ตาม Acuerdo Secretarial No. 031 เพื่อพัฒนาขีดความสามารถปฏิบัติการพิเศษทางทะเลของกองทัพเรือเม็กซิโก บทบาทที่เปิดเผยต่อสาธารณะเน้นการปฏิบัติการพิเศษทางทะเลและสะเทินน้ำสะเทินบก รวมถึงการสนับสนุนภารกิจความมั่นคงและการปฏิบัติการเสี่ยงสูง เอกสารเผยแพร่ทางการของ Secretaría de Marina ในปี 2025 ยังระบุถึงการดำรงอยู่อย่างต่อเนื่องของหน่วยและการครบรอบการก่อตั้ง 24 ปีในปีดังกล่าว ทั้งนี้ต้องแยกหน่วยนี้ออกจากคำว่า Fuerzas Especiales ในความหมายทั่วไป และจากหน่วยรบพิเศษของกองทัพบกเม็กซิโก" },
    sources: [
      { title: "Comité de Información — respuesta oficial sobre la creación de las Fuerzas Especiales (Armada de México)", publisher: "Secretaría de Marina — Armada de México", url: "https://semar.gob.mx/transparencia/Comite%20de%20Informacion/1806.pdf", type: "official", accessedAt: "2026-07-12", supports: ["identity", "branch", "history"], notes: "คำตอบทางการของ SEMAR ยืนยันตัวตนของหน่วยในสังกัด Armada de México การก่อตั้งเมื่อ 1 เมษายน 2001 และ Acuerdo Secretarial No. 031" },
      { title: "Publicación oficial de la Secretaría de Marina — Mayo 2025", publisher: "Secretaría de Marina — Armada de México", url: "https://www.gob.mx/cms/uploads/attachment/file/994154/MAYO_2025.pdf", type: "official", accessedAt: "2026-07-12", supports: ["identity", "history", "role"], notes: "สิ่งพิมพ์ทางการของ SEMAR ปี 2025 สนับสนุนตัวตนปัจจุบันของ Fuerzas Especiales การก่อตั้งในปี 2001 บทบาทปฏิบัติการพิเศษทางทะเล และการดำรงอยู่ต่อเนื่อง (ครบรอบ 24 ปีในปี 2025)" },
    ],
  },
  "Germany::KSK": {
    founded: "20 September 1996",
    branch: "German Army (Heer) — Division Schnelle Kräfte (DSK)",
    unitType: "Army special forces command",
    status: "Active",
    reviewedOn: "2026-07-13",
    history: { summary: "Kommando Spezialkräfte (KSK) เป็นหน่วยรบพิเศษของกองทัพบกเยอรมนี (Heer) จัดตั้งเข้าประจำการอย่างเป็นทางการเมื่อวันที่ 20 กันยายน 1996 ที่ค่าย Graf-Zeppelin-Kaserne เมือง Calw รัฐบาเดิน-เวือร์ทเทิมแบร์ก ปัจจุบันหน่วยขึ้นตรงต่อ Division Schnelle Kräfte (DSK) ของกองทัพบก กำลังพลรุ่นแรกส่วนหนึ่งมาจากสายพลร่มคอมมานโดของกองทัพบก และการจัดตั้งได้รับอิทธิพลจากแบบอย่างหน่วยรบพิเศษต่างประเทศ บทบาทที่เปิดเผยต่อสาธารณะครอบคลุมการลาดตระเวนเชิงยุทธศาสตร์ การจัดการวิกฤตระหว่างประเทศ การช่วยเหลือและอพยพพลเมือง และการฝึกกำลังพันธมิตร ทั้งนี้ต้องแยก KSK ของกองทัพบกออกจาก Kommando Spezialkräfte der Marine (KSM) ของกองทัพเรือ ซึ่งเป็นคนละหน่วยกัน และรายละเอียดเชิงยุทธวิธีและกำลังพลไม่ได้เปิดเผยต่อสาธารณะ" },
    sources: [
      { title: "Kommando Spezialkräfte der Division Schnelle Kräfte", publisher: "Bundeswehr", url: "https://www.bundeswehr.de/de/organisation/heer/organisation/division-schnelle-kraefte/kommando-spezialkraefte", type: "official", accessedAt: "2026-07-13", supports: ["identity", "history", "branch", "role"], notes: "หน้าทางการของ Bundeswehr ยืนยันตัวตน การขึ้นตรงต่อ Heer/Division Schnelle Kräfte ที่ตั้ง Calw การเข้าประจำการเมื่อ 20 กันยายน 1996 และบทบาทของหน่วย" },
    ],
  },
  "Germany::GSG 9": {
    founded: "26 September 1972",
    branch: "Bundespolizei (German Federal Police)",
    unitType: "Federal police counter-terrorism unit",
    status: "Active",
    reviewedOn: "2026-07-13",
    history: { summary: "GSG 9 der Bundespolizei เป็นหน่วยต่อต้านการก่อการร้ายของตำรวจสหพันธ์เยอรมนี (Bundespolizei) จัดตั้งเมื่อวันที่ 26 กันยายน 1972 ภายหลังเหตุการณ์สังหารหมู่ที่โอลิมปิกมิวนิกในปีเดียวกัน เดิมหน่วยสังกัด Bundesgrenzschutz (BGS หรือหน่วยพิทักษ์ชายแดนสหพันธ์) ซึ่งต่อมาเปลี่ยนชื่อเป็น Bundespolizei ในปี 2005 ชื่อย่อ GSG 9 มาจากคำเดิม 'Grenzschutzgruppe 9' แต่ชื่อทางการปัจจุบันคือ GSG 9 der Bundespolizei บทบาทที่เปิดเผยต่อสาธารณะครอบคลุมการต่อต้านการก่อการร้ายและการรับมืออาชญากรรมรุนแรงร้ายแรง หน่วยนี้เป็นหน่วยตำรวจสหพันธ์ มิใช่หน่วยทหารของ Bundeswehr และต้องแยกออกจากหน่วย SEK ของตำรวจระดับรัฐ ทั้งนี้รายละเอียดเชิงยุทธวิธีและกำลังพลไม่ได้เปิดเผยต่อสาธารณะ" },
    sources: [
      { title: "50 Jahre GSG 9 der Bundespolizei", publisher: "Bundesministerium des Innern und für Heimat (BMI)", url: "https://www.bmi.bund.de/SharedDocs/kurzmeldungen/DE/2022/09/50jahre-gsg9.html", type: "government", accessedAt: "2026-07-13", supports: ["identity", "history", "branch", "role"], notes: "หน้าทางการของกระทรวงมหาดไทยสหพันธ์ (BMI) เนื่องในวาระครบ 50 ปี ยืนยันชื่อ GSG 9 der Bundespolizei การก่อตั้ง 26 กันยายน 1972 การเป็นหน่วยพิเศษของ Bundespolizei และบทบาทต่อต้านการก่อการร้าย/อาชญากรรมรุนแรงร้ายแรง (การเข้าถึงอัตโนมัติถูกบล็อก HTTP 400 จึงยืนยันเนื้อหาผ่านการค้นคืนของเครื่องมือค้นหาและ de.wikipedia)" },
      { title: "GSG 9 der Bundespolizei — Bundespolizeidirektion 11", publisher: "Bundespolizei", url: "https://bundespolizei.de/die-bundespolizei/organisation/bundespolizeidirektion-11/gsg-9", type: "official", accessedAt: "2026-07-13", supports: ["identity", "branch", "role"], notes: "หน้าองค์กรทางการของ Bundespolizei ระบุ GSG 9 เป็นหน่วยพิเศษภายใต้ Bundespolizeidirektion 11 และบทบาทต่อต้านการก่อการร้าย/อาชญากรรมร้ายแรง (ยืนยันเนื้อหาผ่านการค้นคืนของเครื่องมือค้นหา)" },
      { title: "Die GSG 9 der Bundespolizei — Einblicke in die Spezialeinheit (Grenzgebiet 2/2022)", publisher: "Bundespolizei", url: "https://bundespolizei.de/fileadmin/user_upload/Downloads/Aktuelles/Unsere_Mitarbeiterzeitschrift/2_2022-die-gsg-9-der-bundespolizei-einblicke-in-die-spezialeinheit-grenzgebiet-_gesamtausgabe-einzelseiten.pdf", type: "official", accessedAt: "2026-07-13", supports: ["identity", "role"], notes: "สิ่งพิมพ์ทางการของ Bundespolizei ว่าด้วยหน่วย GSG 9 ไฟล์ PDF ไม่สามารถแยกข้อความอัตโนมัติได้ จึงใช้สนับสนุนเฉพาะตัวตนและบทบาท และไม่ใช่แหล่งเดียวที่สนับสนุนข้อเท็จจริงทุกฟิลด์" },
    ],
  },
  "Italy::GIS": {
    founded: "6 February 1978",
    branch: "Arma dei Carabinieri — 2ª Brigata Mobile",
    unitType: "Carabinieri special intervention group",
    status: "Active",
    reviewedOn: "2026-07-13",
    history: { summary: "Gruppo di Intervento Speciale (GIS) เป็นหน่วยแทรกแซงพิเศษของ Arma dei Carabinieri จัดตั้งเมื่อวันที่ 6 กุมภาพันธ์ 1978 โดยกองบัญชาการทั่วไปของ Carabinieri ในช่วงภาวะฉุกเฉินจากการก่อการร้าย หน่วยตั้งฐานที่เมือง Livorno และจัดอยู่ในทางธุรการภายใต้ 2ª Brigata Mobile Carabinieri หน่วยมีลักษณะสองบทบาทอันเป็นเอกลักษณ์ คือบทบาทด้านการแทรกแซงพิเศษและต่อต้านการก่อการร้ายเพื่อสนับสนุนกระทรวงมหาดไทย (ในฐานะหน่วยแทรกแซงพิเศษตั้งแต่ปี 1984) และบทบาทด้านปฏิบัติการพิเศษของกระทรวงกลาโหมซึ่งผนวกเข้าตั้งแต่ปี 2004 ทั้งนี้ต้องแยก GIS ของ Carabinieri ออกจาก NOCS ของ Polizia di Stato ซึ่งเป็นคนละหน่วยกัน และรายละเอียดเชิงยุทธวิธีไม่ได้เปิดเผยต่อสาธารณะ" },
    sources: [
      { title: "Gruppo d'Intervento Speciale", publisher: "Arma dei Carabinieri", url: "https://www.carabinieri.it/chi-siamo/oggi/organizzazione/mobile-e-speciale/2-brigata-mobile/gruppo-d%27intervento-speciale", type: "official", accessedAt: "2026-07-13", supports: ["identity", "history", "branch", "role"], notes: "หน้าทางการของ Arma dei Carabinieri ยืนยันการจัดตั้ง 6 กุมภาพันธ์ 1978 การจัดอยู่ใน 2ª Brigata Mobile และสองบทบาท (ตำรวจแทรกแซงพิเศษ/กระทรวงมหาดไทย และปฏิบัติการพิเศษของกระทรวงกลาโหม)" },
    ],
  },
  "Italy::COL MOSCHIN": {
    founded: "Present regiment formed 1995 (elevated from battalion); lineage traces to the IX Reparto d'Assalto of 1918",
    branch: "Italian Army (Esercito Italiano) — Comando delle Forze Speciali dell'Esercito (COMFOSE)",
    unitType: "Army assault parachutist (incursori) regiment",
    status: "Active",
    reviewedOn: "2026-07-13",
    history: { summary: "9° Reggimento d'Assalto Paracadutisti 'Col Moschin' เป็นหน่วยปฏิบัติการพิเศษ (incursori) ของกองทัพบกอิตาลี (Esercito Italiano) สายเชื้อสายของหน่วยย้อนกลับไปถึง IX Reparto d'Assalto ในสงครามโลกครั้งที่หนึ่งเมื่อปี 1918 ซึ่งเชื่อมโยงกับยุทธการที่ Col Moschin และประเพณีของหน่วย Arditi (fiamme nere) อย่างไรก็ตามหน่วยบรรพบุรุษนี้ไม่ควรถูกนับเป็นหน่วยเดียวกับกรมในโครงสร้างปัจจุบันโดยอัตโนมัติ หน่วยในรูปแบบปัจจุบันได้รับการยกฐานะจากระดับกองพันขึ้นเป็นกรมในปี 1995 ตามการปรับโครงสร้างกองทัพบกอิตาลี และนำตราสัญลักษณ์ fiamme nere กลับมาใช้ในปี 2006 ปัจจุบันกรมตั้งฐานที่เมือง Livorno และขึ้นตรงต่อ Comando delle Forze Speciali dell'Esercito (COMFOSE) บทบาทที่เปิดเผยครอบคลุมภารกิจปฏิบัติการพิเศษของกองทัพบก โดยรายละเอียดเชิงยุทธวิธีไม่ได้เปิดเผยต่อสาธารณะ" },
    sources: [
      { title: "9° Reggimento d'Assalto Paracadutisti 'Col Moschin' — La Storia", publisher: "Esercito Italiano (Ministero della Difesa)", url: "https://www.esercito.difesa.it/organizzazione/capo-di-sme/comfoter/comando-delle-forze-speciali-dell-esercito/9-reggimento-dassalto-paracadutisti-col-moschin/la-storia/122800.html", type: "official", accessedAt: "2026-07-13", supports: ["identity", "history", "branch", "role"], notes: "หน้าประวัติทางการของ Esercito Italiano สนับสนุนสายเชื้อสาย IX Reparto d'Assalto ปี 1918 การยกฐานะเป็นกรมในปี 1995 และการขึ้นตรงต่อ COMFOSE (การเข้าถึงอัตโนมัติติดปัญหาใบรับรอง TLS จึงตรวจยืนยันเนื้อหาผ่านการค้นคืนจากโดเมนทางการเดียวกันและ it.wikipedia)" },
    ],
  },
  "Norway::FSK": {
    founded: "Established in the early 1980s (predecessor Hærens Fallskjermjegerskole 1962; government decision 1979)",
    branch: "Norwegian Armed Forces — Forsvarets spesialstyrker (Norwegian Special Operations Command)",
    unitType: "Special operations command (Army-rooted)",
    status: "Active",
    reviewedOn: "2026-07-13",
    history: { summary: "Forsvarets spesialkommando (FSK) เป็นหน่วยปฏิบัติการพิเศษของกองทัพนอร์เวย์ สายเชื้อสายของหน่วยย้อนกลับไปถึง Hærens Fallskjermjegerskole (โรงเรียนพลร่มจู่โจมของกองทัพบก) ซึ่งจัดตั้งเมื่อปี 1962 ที่ Trandum ต่อมาในปี 1979 รัฐบาลนอร์เวย์ตัดสินใจสร้างขีดความสามารถต่อต้านการก่อการร้าย ส่วนหนึ่งเพื่อรับมือภัยคุกคามต่อแท่นขุดเจาะน้ำมันในทะเลเหนือ และหน่วยในโครงสร้างปัจจุบันจัดตั้งขึ้นในช่วงต้นทศวรรษ 1980 โดยไม่ควรนับปี 1962 เป็นปีก่อตั้งของ FSK ปัจจุบันโดยอัตโนมัติ เดิมหน่วยอยู่ในความรับผิดชอบของกองทัพบก และต่อมาได้ย้ายมาอยู่ภายใต้ Forsvarets spesialstyrker (หน่วยบัญชาการปฏิบัติการพิเศษของกองทัพนอร์เวย์) ในการปรับโครงสร้างกำลังรบพิเศษเมื่อปี 2014 บทบาทที่เปิดเผยครอบคลุมการปฏิบัติการพิเศษและการสนับสนุนตำรวจในภารกิจต่อต้านการก่อการร้าย ทั้งนี้ต้องแยก FSK ออกจาก Marinejegerkommandoen (MJK) ซึ่งเป็นคนละหน่วยกัน" },
    sources: [
      { title: "Forsvarets spesialkommando (FSK)", publisher: "Forsvaret (Norwegian Armed Forces)", url: "https://www.forsvaret.no/om-forsvaret/organisasjon/forsvarets-spesialstyrker/forsvarets-spesialkommando-fsk", type: "official", accessedAt: "2026-07-13", supports: ["identity", "branch", "role", "history"], notes: "หน้าทางการของกองทัพนอร์เวย์ ยืนยันตัวตน การเป็นส่วนของ Forsvarets spesialstyrker บทบาทปัจจุบัน หน่วยบรรพบุรุษ Hærens Fallskjermjegerskole ปี 1962 และการตัดสินใจของรัฐบาลปี 1979 (ยืนยันเนื้อหาผ่าน WebFetch)" },
      { title: "Prop. 151 S (2015–2016) — Kampkraft og bærekraft", publisher: "Regjeringen / Forsvarsdepartementet (Norwegian Government)", url: "https://www.regjeringen.no/no/dokumenter/prop.-151-s-20152016/id2504884/?ch=3", type: "government", accessedAt: "2026-07-13", supports: ["branch", "history"], notes: "เอกสารทางการของรัฐบาลนอร์เวย์ สนับสนุนการจัดวาง FSK ภายใต้ Forsvarets spesialstyrker (โครงสร้างกำลังรบพิเศษที่จัดตั้งในปี 2014) แทนการอ้างอิงจาก Wikipedia (การเข้าถึงอัตโนมัติถูกบล็อก HTTP 403 จึงยืนยันบริบทการปรับโครงสร้างปี 2014 ผ่านการค้นคืนของเครื่องมือค้นหา)" },
    ],
  },
  "Sweden::SOG": {
    founded: "Publicly announced in December 2010; formed through the planned SSG/SIG consolidation during 2011; established as a separate organisational unit on 1 January 2012",
    branch: "Swedish Armed Forces (Försvarsmakten) — Försvarsmaktens specialförband, under Specialförbandsledningen",
    unitType: "Joint special operations unit",
    status: "Active",
    reviewedOn: "2026-07-13",
    history: { summary: "Särskilda operationsgruppen (SOG) เป็นหน่วยปฏิบัติการพิเศษหลักของกองทัพสวีเดน (Försvarsmakten) และเป็นส่วนหนึ่งของ Försvarsmaktens specialförband ตั้งฐานที่ Karlsborg ตามข้อมูลทางการของกองทัพสวีเดน SOG เป็นหน่วยหลักของกำลังรบพิเศษ อยู่ภายใต้การบังคับบัญชาของ Specialförbandsledningen (กองบัญชาการกำลังรบพิเศษ) พัฒนาการของหน่วยแบ่งได้เป็นสามช่วงที่ชัดเจน คือ (1) เดือนธันวาคม 2010 กองทัพสวีเดนประกาศต่อสาธารณะว่าจะรวมหน่วย Särskilda inhämtningsgruppen (SIG) และ Särskilda skyddsgruppen (SSG) เข้าด้วยกัน และใช้ชื่อรวมว่า Särskilda operationsgruppen (SOG) (2) การรวมหน่วยตามแผนดำเนินการในระหว่างปี 2011 และ (3) หน่วยได้รับการจัดตั้งเป็นหน่วยองค์กร (organisationsenhet) แยกต่างหากอย่างเป็นทางการตั้งแต่วันที่ 1 มกราคม 2012 ทั้งนี้เดือนธันวาคม 2010 เป็นเพียงการประกาศ มิใช่วันก่อตั้งที่เสร็จสมบูรณ์ บทบาทที่เปิดเผยต่อสาธารณะครอบคลุมการรบ การรวบรวมข่าวกรอง และการให้ความช่วยเหลือทางทหาร ต้องแยก SOG ออกจากระบบ Försvarsmaktens specialförband โดยรวมและจาก Specialförbandsledningen และรายละเอียดโครงสร้าง กำลังพล และยุทโธปกรณ์ไม่ได้เปิดเผยต่อสาธารณะ" },
    sources: [
      { title: "Särskilda operationsgruppen – SOG", publisher: "Försvarsmakten (Swedish Armed Forces)", url: "https://www.forsvarsmakten.se/en/about-the-swedish-armed-forces/organisation/joint-forces/special-operations-group/", type: "official", accessedAt: "2026-07-13", supports: ["identity", "branch", "role"], notes: "หน้าทางการของกองทัพสวีเดน ยืนยันตัวตน การเป็นหน่วยร่วม (gemensamma) หลักของกำลังรบพิเศษภายใต้ Specialförbandsledningen และบทบาทปัจจุบัน (ยืนยันเนื้อหาผ่าน WebFetch ไม่ได้ระบุปีก่อตั้ง)" },
      { title: "Under ytan på specialförbanden", publisher: "Försvarsmakten (Swedish Armed Forces)", url: "https://www.forsvarsmakten.se/sv/aktuellt/2010/12/under-ytan-pa-specialforbanden/", type: "official", accessedAt: "2026-07-13", supports: ["history"], notes: "บทความทางการของกองทัพสวีเดน เผยแพร่เมื่อ 10 ธันวาคม 2010 ประกาศต่อสาธารณะว่าหน่วย Särskilda inhämtningsgruppen (SIG) และ Särskilda skyddsgruppen (SSG) จะรวมเข้าด้วยกันในระหว่างปี 2011 และหน่วยรวมจะใช้ชื่อ Särskilda operationsgruppen (SOG)" },
      { title: "Budgetpropositionen — Utgiftsområde 6: Försvar och samhällets krisberedskap", publisher: "Government Offices of Sweden (Regeringskansliet)", url: "https://www.regeringen.se/contentassets/f764ba87c27347588b4f4bb51c412688/utgiftsomrade-6-forsvar-och-samhallets-krisberedskap/", type: "government", accessedAt: "2026-07-13", supports: ["history"], notes: "เอกสารงบประมาณทางการของรัฐบาลสวีเดน สนับสนุนว่า Försvarsmakten ได้จัดตั้ง Särskilda operationsgruppen เป็นหน่วยองค์กร (organisationsenhet) แยกต่างหากเมื่อวันที่ 1 มกราคม 2012" },
    ],
  },
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
  const unitKey = `${raw.country}::${raw.code}`;
  const hasExpandedDetail = detailedCountryByCode[raw.code] === raw.country;
  const hasMinimumDossier = !hasExpandedDetail && Boolean(minimumDossiers[unitKey]);
  const override = hasExpandedDetail ? detailed[raw.code] : {};
  // Expanded (featured) override takes precedence over a researched minimum
  // dossier, which in turn takes precedence over the generic fallback.
  const minimumOverride = hasMinimumDossier ? minimumDossiers[unitKey] : {};
  const base = genericDetail(raw);
  const countryCode = iso2[raw.country] || "";
  const flag = flags[raw.country] || "🏳️";
  const merged = {
    ...raw,
    id: `${raw.country}::${raw.code}`,
    ...base,
    ...minimumOverride,
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
    // detailLevel stays "basic" for minimum dossiers: only expanded/featured
    // dossiers use "expanded", so minimum dossiers never enter getFeaturedUnits().
    detailLevel: hasExpandedDetail ? "expanded" : "basic",
    updatedAt: hasExpandedDetail || hasMinimumDossier ? "2026-07-12" : "RESEARCH QUEUE",
    // Three distinct content-note states: expanded rich dossier, researched
    // minimum/basic dossier, and the research-pending fallback.
    contentNote: hasExpandedDetail
      ? "ข้อมูลอาวุธและเครื่องแบบเป็นการสรุปจากข้อมูลสาธารณะและอาจเปลี่ยนตามช่วงเวลา ไม่ควรถือเป็นบัญชีประจำการทางการ"
      : hasMinimumDossier
      ? "Minimum Dossier นี้ผ่านการตรวจสอบข้อมูลพื้นฐานและแหล่งอ้างอิงแล้ว ส่วนอาวุธ เครื่องแบบ และสื่อยังอยู่ในสถานะ Research Pending"
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
      // Provenance is curated per unit from the file's Commons page; it stays
      // null (uncurated) until confirmed, and is never invented — surfaced by
      // media:audit.
      sourceName: coverSrc ? (merged.coverSourceName || "Wikimedia Commons") : null,
      sourceUrl: merged.coverSourceUrl || null,
      credit: merged.coverCredit || null,
      license: merged.coverLicense || null,
    },
    emblem: emblemSrc
      ? {
          src: emblemSrc,
          // A "parent-branch-insignia" emblem is not a confirmed unit-specific
          // emblem; its alt/label must say so. Source/license stay as known.
          kind: merged.emblemKind === "parent-branch-insignia" ? "parent-branch-insignia" : "official-emblem",
          alt: merged.emblemKind === "parent-branch-insignia"
            ? `${raw.code} — parent-branch insignia (${raw.branch}); not a confirmed unit-specific emblem`
            : `${raw.code} official emblem / insignia`,
          note: merged.emblemNote || null,
          variant: "square",
          // Emblem art is sourced from Wikimedia Commons file pages (via commons()).
          sourceName: merged.emblemSourceName || (emblemSrc ? "Wikimedia Commons" : null),
          sourceUrl: merged.emblemSourceUrl || null,
          credit: merged.emblemCredit || null,
          license: merged.emblemLicense || null,
        }
      : null,
    gallery: merged.gallery || [],
  };

  // Computed editorial metadata (completeness, reliability, lastReviewed, ...).
  // Backward compatible: detailLevel / updatedAt / contentNote are preserved.
  merged.editorial = computeEditorial(merged);
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
