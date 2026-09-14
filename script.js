const themeToggle=document.getElementById("themeToggle");
const savedTheme=localStorage.getItem("omar-theme");

if(savedTheme==="light"){
  document.body.classList.add("light-mode");
  if(themeToggle){
    themeToggle.setAttribute("aria-pressed","true");
    themeToggle.querySelector(".theme-icon").textContent="☀";
  }
}

if(themeToggle){
  themeToggle.addEventListener("click",()=>{
    const light=document.body.classList.toggle("light-mode");
    localStorage.setItem("omar-theme",light?"light":"dark");
    themeToggle.setAttribute("aria-pressed",String(light));
    themeToggle.querySelector(".theme-icon").textContent=light?"☀":"☾";
  });
}

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

if(menuBtn && navLinks){
  menuBtn.addEventListener("click",()=>{
    const open=navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded",open);
  });

  navLinks.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded","false");
  }));
}

const revealItems=document.querySelectorAll(".reveal");

if("IntersectionObserver" in window){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.12});

  revealItems.forEach(el=>observer.observe(el));
}else{
  revealItems.forEach(el=>el.classList.add("visible"));
}

const glow=document.querySelector(".cursor-glow");

if(glow){
  window.addEventListener("pointermove",e=>{
    if(window.innerWidth>900){
      glow.style.transform=`translate(${e.clientX-80}px,${e.clientY-80}px)`;
    }
  });
}
