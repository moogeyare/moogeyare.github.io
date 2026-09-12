const header=document.getElementById("header");
const progress=document.getElementById("pageProgress");
const menuBtn=document.getElementById("menuBtn");
const navLinks=document.getElementById("navLinks");

function onScroll(){
  const y=window.scrollY;
  header.classList.toggle("scrolled",y>25);
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=(max>0?(y/max)*100:0)+"%";
  let current="home";
  document.querySelectorAll("main section[id]").forEach(s=>{
    if(y>=s.offsetTop-180) current=s.id;
  });
  document.querySelectorAll(".nav-links a[href^='#']").forEach(a=>{
    a.classList.toggle("active",a.getAttribute("href")==="#"+current);
  });
}
window.addEventListener("scroll",onScroll,{passive:true});
onScroll();

menuBtn.addEventListener("click",()=>{
  const open=navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded",open);
});
navLinks.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
  navLinks.classList.remove("open");
  menuBtn.setAttribute("aria-expanded","false");
}));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const glow=document.querySelector(".cursor-glow");
window.addEventListener("pointermove",e=>{
  if(window.innerWidth>900){
    glow.style.transform=`translate(${e.clientX-80}px,${e.clientY-80}px)`;
  }
});
