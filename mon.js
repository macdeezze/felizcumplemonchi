'use strict';
// Fixed positions echo the reference without covering the page with guide lines.
const circles=[[12,14],[28,-2],[43,3],[59,0],[76,0],[88,17],[6,33],[18,39],[9,52],[22,61],[9,80],[22,87],[34,100],[54,107],[69,94],[78,77],[87,92],[95,70],[84,56],[95,35]];
const hearts=[[19,9,-6],[50,6,0],[68,9,-7],[95,10,-8],[13,26,-10],[27,43,17],[77,45,-13],[86,31,8],[93,53,10],[14,65,-12],[4,68,0],[26,75,7],[86,70,-9],[96,87,8],[79,94,0],[61,97,-4],[45,101,0],[14,97,5]];
const background=document.querySelector('.decoration');
for(const [x,y] of circles){const el=document.createElement('span');el.className='circle';el.style.left=x+'%';el.style.top=y+'%';background.append(el);}
for(const [x,y,tilt] of hearts){const el=document.createElement('span');el.className='heart';el.textContent='♥';el.style.left=x+'%';el.style.top=y+'%';el.style.setProperty('--tilt',tilt+'deg');background.append(el);}
const page=location.pathname.split('/').pop()||'index.html';
document.querySelectorAll('.navigation a').forEach(a=>{if(a.getAttribute('href')===page)a.setAttribute('aria-current','page');});
const photos=[...document.querySelectorAll('.gallery img,.imagen-evento')];
if(photos.length){
 const modal=document.createElement('dialog');modal.className='lightbox';modal.setAttribute('aria-label','Fotografía ampliada');
 const close=document.createElement('button');close.type='button';close.className='close-lightbox';close.textContent='×';close.setAttribute('aria-label','Cerrar fotografía');
 const full=document.createElement('img');modal.append(close,full);document.body.append(modal);
 let opener=null;
 photos.forEach((photo,i)=>{const button=document.createElement('button');button.type='button';button.className='photo-button';button.setAttribute('aria-label','Ampliar fotografía '+(i+1));photo.before(button);button.append(photo);button.addEventListener('click',()=>{opener=button;full.src=photo.src;full.alt=photo.alt;modal.showModal();document.body.classList.add('lightbox-open');});});
 close.addEventListener('click',()=>modal.close());
 modal.addEventListener('click',e=>{if(e.target===modal){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)modal.close();}});
 modal.addEventListener('close',()=>{document.body.classList.remove('lightbox-open');opener?.focus();});
}
if(document.body.classList.contains('inner')){
 const topButton=document.createElement('button');topButton.type='button';topButton.className='back-top';topButton.textContent='↑';topButton.setAttribute('aria-label','Volver arriba');topButton.hidden=true;document.body.append(topButton);
 window.addEventListener('scroll',()=>{topButton.hidden=window.scrollY<600;},{passive:true});
 topButton.addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
}
