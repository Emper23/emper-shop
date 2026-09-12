(function(global){
  'use strict';
  const STORAGE_KEY='emper_admin_products';
  const BASE=[
    {id:1,game:'Roblox',name:'Roblox Premium Account — Blox Fruits',tier:'LEVEL 2450 • พร้อมเล่น',price:349,stock:8,icon:'R',image:'assets/products/roblox-blox-fruits.webp',color:'linear-gradient(145deg,#2563eb,#111827 72%)',summary:'ไอดี Blox Fruits เลเวลสูง พร้อมเริ่มเล่นต่อทันที เหมาะสำหรับคนที่ไม่อยากเริ่มฟาร์มใหม่ตั้งแต่ต้น',rank:'Level 2450',email:'เปลี่ยนได้',warranty:'7 วัน',features:['เลเวล 2450 พร้อมเล่น','มี Beli และ Fragment สำหรับเริ่มต้น','เปลี่ยนอีเมลและรหัสผ่านได้','เหมาะสำหรับเล่นต่อหรือใช้เป็นไอดีรอง']},
    {id:2,game:'Roblox',name:'Roblox Account — Anime Vanguards',tier:'RARE UNITS • FARMED',price:459,stock:4,icon:'RV',image:'assets/products/roblox-anime-vanguards.webp',color:'linear-gradient(145deg,#7c3aed,#251044 72%)',summary:'บัญชี Anime Vanguards ที่ผ่านการฟาร์มมาแล้ว มีตัวละครและทรัพยากรพร้อมสำหรับเล่นด่านระดับสูง',rank:'High Progress',email:'เปลี่ยนได้',warranty:'7 วัน',features:['มี Rare Units หลายตัว','ฟาร์มทรัพยากรพื้นฐานแล้ว','พร้อมเล่นคอนเทนต์ช่วงกลางถึงท้ายเกม']},
    {id:3,game:'Valorant',name:'Valorant Account — Rank Diamond',tier:'ASIA • EMAIL CHANGEABLE',price:790,stock:3,icon:'V',image:'assets/products/valorant-diamond.webp',color:'linear-gradient(145deg,#ef4444,#111827 75%)',summary:'บัญชี Valorant ระดับ Diamond สำหรับผู้เล่นที่ต้องการเริ่มจากแรงก์สูงขึ้น',rank:'Diamond',email:'เปลี่ยนได้',warranty:'3 วัน',features:['Rank Diamond','เปลี่ยนอีเมลได้','พร้อมเข้า Competitive']},
    {id:4,game:'Genshin',name:'Genshin Impact — AR58',tier:'5★ CHARACTERS • ASIA',price:690,stock:5,icon:'GI',image:'assets/products/genshin-ar58.webp',color:'linear-gradient(145deg,#0891b2,#172554 78%)',summary:'บัญชี Genshin Impact AR58 มีตัวละคร 5 ดาวและความคืบหน้าสำหรับเล่นต่อได้ทันที',rank:'AR 58',email:'เปลี่ยนได้',warranty:'7 วัน',features:['Adventure Rank 58','มีตัวละครระดับ 5 ดาว','ผ่านเนื้อหาหลักจำนวนมาก','เหมาะสำหรับผู้เล่นที่ไม่อยากเริ่มใหม่']},
    {id:5,game:'Minecraft',name:'Minecraft Premium Java Account',tier:'FULL ACCESS • CHANGE MAIL',price:399,stock:12,icon:'MC',image:'assets/products/minecraft-premium.webp',color:'linear-gradient(145deg,#16a34a,#17231a 75%)',summary:'บัญชี Minecraft Java สำหรับใช้งานบน PC พร้อมสิทธิ์เปลี่ยนข้อมูลบัญชีตามเงื่อนไข Demo',rank:'Premium Java',email:'เปลี่ยนได้',warranty:'7 วัน',features:['Minecraft Java Edition','เปลี่ยนอีเมลได้','พร้อมเข้าเซิร์ฟเวอร์ออนไลน์']},
    {id:6,game:'ROV',name:'ROV Account — Skin Collection',tier:'90+ SKINS',price:550,stock:6,icon:'ROV',image:'assets/products/rov-skin-collection.webp',color:'linear-gradient(145deg,#f59e0b,#431407 75%)',summary:'ไอดี ROV ที่เน้นคอลเลกชันสกิน เหมาะกับผู้เล่นที่ต้องการเริ่มด้วยของสะสมจำนวนมาก',rank:'90+ Skins',email:'ตามระบบเกม',warranty:'3 วัน',features:['มีสกินมากกว่า 90 รายการ','พร้อมเล่นโหมด Ranked','มีฮีโร่สำหรับเริ่มเล่นหลายตัว']},
    {id:7,game:'Free Fire',name:'Free Fire Account — Rare Bundle',tier:'LIMITED SET',price:420,stock:7,icon:'FF',image:'assets/products/freefire-rare-bundle.webp',color:'linear-gradient(145deg,#f97316,#3f1d0c 75%)',summary:'บัญชี Free Fire ที่มีชุดสะสมและไอเทมหายากบางรายการ สำหรับผู้เล่นที่เน้นแต่งตัวและสะสมของ',rank:'Rare Bundle',email:'ตามบัญชีเชื่อมต่อ',warranty:'3 วัน',features:['มี Rare Bundle','มีไอเทมตกแต่งหลายรายการ','พร้อมเข้าเล่นทันที']},
    {id:8,game:'Steam',name:'Steam Gaming Account — Starter Pack',tier:'READY',price:299,stock:10,icon:'S',image:'assets/products/steam-starter-pack.webp',color:'linear-gradient(145deg,#0f766e,#0f172a 78%)',summary:'บัญชี Steam Starter สำหรับโครงระบบร้าน Demo แสดงรูปแบบสินค้าประเภทบัญชีเกมบนแพลตฟอร์ม PC',rank:'Starter Pack',email:'เปลี่ยนได้',warranty:'3 วัน',features:['พร้อมเปลี่ยนข้อมูลตามเงื่อนไข','เหมาะสำหรับทดสอบระบบร้าน','ส่งข้อมูลหลังชำระในระบบจริง']}
  ];
  const EDITABLE=['game','name','tier','price','stock','icon','image','color','summary','rank','email','warranty','features'];

  function readOverrides(){
    try{const value=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');return Array.isArray(value)?value:[]}catch(_){return []}
  }

  function normalize(base,edited){
    if(!edited)return {...base,features:[...base.features]};
    const out={...base};
    EDITABLE.forEach(key=>{
      if(edited[key]===undefined||edited[key]===null)return;
      if(key==='price'||key==='stock') out[key]=Math.max(0,Number(edited[key]));
      else if(key==='features') out[key]=Array.isArray(edited[key])?edited[key].map(x=>String(x).trim()).filter(Boolean):base.features;
      else if(key==='image'){
        const value=String(edited[key]).trim();
        if(value)out[key]=value;
      }
      else out[key]=String(edited[key]);
    });
    return out;
  }

  function getProducts(){
    const overrides=readOverrides();
    return BASE.map(base=>normalize(base,overrides.find(x=>Number(x.id)===base.id)));
  }

  function getProduct(id){return getProducts().find(p=>p.id===Number(id))||getProducts()[0]}

  function saveAdminProducts(products){
    const safe=products.map(p=>{
      const base=BASE.find(x=>x.id===Number(p.id));
      if(!base)return null;
      const merged=normalize(base,p);
      return {id:base.id,game:merged.game,name:merged.name,tier:merged.tier,price:merged.price,stock:merged.stock,icon:merged.icon,image:merged.image,color:merged.color,summary:merged.summary,rank:merged.rank,email:merged.email,warranty:merged.warranty,features:merged.features};
    }).filter(Boolean);
    localStorage.setItem(STORAGE_KEY,JSON.stringify(safe));
  }

  function updateProduct(id,changes){
    const products=getProducts();
    const index=products.findIndex(p=>p.id===Number(id));
    if(index<0)return false;
    products[index]=normalize(products[index],changes||{});
    saveAdminProducts(products);
    return products[index];
  }

  function reset(){localStorage.removeItem(STORAGE_KEY)}

  function decrementStock(id,amount=1){
    const products=getProducts();const product=products.find(p=>p.id===Number(id));
    if(!product||product.stock<amount)return false;
    product.stock=Math.max(0,product.stock-amount);saveAdminProducts(products);return true;
  }

  global.EmperCatalog={STORAGE_KEY,BASE:BASE.map(x=>({...x,features:[...x.features]})),getProducts,getProduct,saveAdminProducts,updateProduct,decrementStock,reset};
})(window);
