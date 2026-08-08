
const galleries = {
  condor: {base:'media/galleries/condor', files: ['DSC_0138.jpg', 'DSC_0139.jpg', 'DSC_0140.jpg', 'DSC_0141.jpg', 'DSC_0142.jpg', 'DSC_0143.jpg', 'DSC_0144.jpg', 'DSC_0145.jpg', 'DSC_0146.jpg', 'DSC_0147.jpg', 'DSC_0148.jpg', 'DSC_0149.jpg', 'DSC_0150.jpg', 'DSC_0151.jpg']},
  qs22: {base:'media/galleries/qs22', files: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg']}
};

function initGallery(){
  const grid=document.querySelector('#gallery'); if(!grid) return;
  const lightbox=document.querySelector('.lightbox'); const lightImg=lightbox.querySelector('img'); let current=[]; let idx=0;
  function render(which){
    current=galleries[which].files.map(f=>({thumb:`${galleries[which].base}/thumbs/${f}`,full:`${galleries[which].base}/images/${f}`}));
    grid.innerHTML=current.map((it,i)=>`<button data-index="${i}"><img src="${it.thumb}" alt="Gallery image ${i+1}" loading="lazy"></button>`).join('');
  }
  document.querySelectorAll('[data-gallery]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-gallery]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');render(btn.dataset.gallery)}));
  grid.addEventListener('click',e=>{const b=e.target.closest('button[data-index]'); if(!b) return; idx=Number(b.dataset.index); lightImg.src=current[idx].full; lightbox.classList.add('show'); lightbox.setAttribute('aria-hidden','false')});
  function close(){lightbox.classList.remove('show');lightbox.setAttribute('aria-hidden','true');lightImg.src=''}
  function nav(d){idx=(idx+d+current.length)%current.length; lightImg.src=current[idx].full}
  lightbox.querySelector('.close').addEventListener('click',close); lightbox.querySelector('.prev').addEventListener('click',()=>nav(-1)); lightbox.querySelector('.next').addEventListener('click',()=>nav(1)); lightbox.addEventListener('click',e=>{if(e.target===lightbox) close()});
  document.addEventListener('keydown',e=>{if(!lightbox.classList.contains('show')) return; if(e.key==='Escape') close(); if(e.key==='ArrowLeft') nav(-1); if(e.key==='ArrowRight') nav(1)});
  render('condor');
}
initGallery();
