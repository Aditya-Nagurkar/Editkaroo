const PROJECTS = [
  { 
    id: 1, 
    title: "Streetwear Drop – 30s", 
    cat: "short-form videos", 
    src: "assets/videos/short1.mp4",
    thumbnail: "assets/thumbnails/short1.jpg",
    tags:["UGC","Reels","TikTok"] 
  },
  { 
    id: 2, 
    title: "Gaming Montage – 1m", 
    cat: "gaming videos", 
    src: "assets/videos/gaming1.mp4",
    thumbnail: "assets/thumbnails/gaming1.jpg",
    tags:["Montage","Sync","Highlights"] 
  },
  { 
    id: 3, 
    title: "Football Recap – 45s", 
    cat: "football edits", 
    src: "assets/videos/football1.mp4",
    thumbnail: "assets/thumbnails/football1.jpg",
    tags:["Highlights","Sports","Action"] 
  },
  { 
    id: 4, 
    title: "E‑Commerce Ad – 20s", 
    cat: "eCommerce ads", 
    src: "assets/videos/ecom1.mp4",
    thumbnail: "assets/thumbnails/ecom1.jpg",
    tags:["Product","Ad","Conversion"] 
  },
  { 
    id: 5, 
    title: "Travel Documentary – 15m", 
    cat: "long-form videos", 
    src: "assets/videos/travel_doc.mp4",
    thumbnail: "assets/thumbnails/travel_doc.jpg",
    tags:["Documentary","Cinematic","Story"] 
  },
  { 
    id: 6, 
    title: "Product Demo – 35s", 
    cat: "eCommerce ads", 
    src: "assets/videos/product_demo.mp4",
    thumbnail: "assets/thumbnails/product_demo.jpg",
    tags:["Demo","Tech","Sales"] 
  },
  { 
    id: 7, 
    title: "Nature Documentary – 8m", 
    cat: "documentary style", 
    src: "assets/videos/nature_doc.mp4",
    thumbnail: "assets/thumbnails/nature_doc.jpg",
    tags:["Nature","Storytelling","Cinematic"] 
  },
  { 
    id: 8, 
    title: "Fitness Brand Ad – 25s", 
    cat: "ads", 
    src: "assets/videos/fitness_ad.mp4",
    thumbnail: "assets/thumbnails/fitness_ad.jpg",
    tags:["Fitness","Brand","Motion"] 
  },
  { 
    id: 9, 
    title: "Anime AMV – 3m", 
    cat: "anime videos", 
    src: "assets/videos/anime_amv.mp4",
    thumbnail: "assets/thumbnails/anime_amv.jpg",
    tags:["AMV","Sync","Anime"] 
  },
  { 
    id: 10, 
    title: "Color Grading Reel – 2m", 
    cat: "color grading", 
    src: "assets/videos/color_reel.mp4",
    thumbnail: "assets/thumbnails/color_reel.jpg",
    tags:["Grading","Cinematic","Portfolio"] 
  },
  { 
    id: 11, 
    title: "Podcast Highlights – 1.5m", 
    cat: "long-form videos", 
    src: "assets/videos/podcast.mp4",
    thumbnail: "assets/thumbnails/podcast.jpg",
    tags:["Podcast","Highlights","Educational"] 
  },
  { 
    id: 12, 
    title: "Restaurant Promo – 40s", 
    cat: "short-form videos", 
    src: "assets/videos/restaurant.mp4",
    thumbnail: "assets/thumbnails/restaurant.jpg",
    tags:["Food","Promo","Instagram"] 
  },
  { 
    id: 13, 
    title: "Gaming Tournament – 5m", 
    cat: "gaming videos", 
    src: "assets/videos/tournament.mp4",
    thumbnail: "assets/thumbnails/tournament.jpg",
    tags:["Esports","Tournament","Highlight"] 
  },
  { 
    id: 14, 
    title: "Football Skills – 1m", 
    cat: "football edits", 
    src: "assets/videos/skills.mp4",
    thumbnail: "assets/thumbnails/skills.jpg",
    tags:["Skills","Training","Youth"] 
  },
  { 
    id: 15, 
    title: "Startup Story – 12m", 
    cat: "documentary style", 
    src: "assets/videos/startup.mp4",
    thumbnail: "assets/thumbnails/startup.jpg",
    tags:["Business","Story","Inspiration"] 
  },
];

const CATEGORIES = [
  "all",
  "short-form videos", 
  "long-form videos", 
  "gaming videos", 
  "football edits", 
  "eCommerce ads", 
  "documentary style", 
  "color grading", 
  "anime videos", 
  "ads"
];

const chipsEl = document.getElementById('chips');
const gridEl = document.getElementById('grid');
const countEl = document.getElementById('count');
const searchEl = document.getElementById('search');
const clearBtn = document.getElementById('clearSearch');

// Build chips
CATEGORIES.forEach((c,i)=>{
  const chip=document.createElement('button');
  chip.className='chip'+(i===0?' active':'');
  chip.textContent=c;
  chip.dataset.cat=c;
  chip.onclick=()=>{
    document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));
    chip.classList.add('active');
    render();
  };
  chipsEl.appendChild(chip);
});

clearBtn.onclick=()=>{
  searchEl.value='';
  render();
};

searchEl.oninput=()=>render();

function render(){
  const active=document.querySelector('.chip.active').dataset.cat;
  const q=searchEl.value.toLowerCase();
  const filtered=PROJECTS.filter(p=>{
    const inCat=active==='all'||p.cat===active;
    const inSearch=!q||p.title.toLowerCase().includes(q)||p.tags.join(' ').toLowerCase().includes(q);
    return inCat&&inSearch;
  });
  countEl.textContent=filtered.length;
  
  gridEl.innerHTML=filtered.map(p=>`
    <article class="card" data-video="${p.src}">
      <div class="thumb">
        <img src="${p.thumbnail}" alt="${p.title}" class="thumbnail-img" loading="lazy">
        <video src="${p.src}" muted playsinline preload="none" style="display: none;"></video>
        <div class="play-overlay">
          <div class="play-button">▶</div>
        </div>
        <div class="badge">${p.cat}</div>
      </div>
      <div class="meta">
        <div class="title">${p.title}</div>
        <div class="tags">${p.tags.map(t=>`<span class='tag'>#${t}</span>`).join('')}</div>
      </div>
    </article>`).join('');

  // Enhanced interaction with thumbnails
  gridEl.querySelectorAll('.card').forEach(setupCardInteraction);
}

function setupCardInteraction(card) {
  const videoSrc = card.dataset.video;
  const img = card.querySelector('.thumbnail-img');
  const video = card.querySelector('video');
  const playOverlay = card.querySelector('.play-overlay');
  const title = card.querySelector('.title').textContent;
  
  card.onmouseenter = () => {
    img.style.opacity = '0';
    video.style.display = 'block';
    playOverlay.style.opacity = '0';
    video.currentTime = 0;
    video.play().catch(e => {
      console.log('Play failed:', e);
      // Fallback to showing thumbnail
      img.style.opacity = '1';
      video.style.display = 'none';
      playOverlay.style.opacity = '1';
    });
  };
  
  card.onmouseleave = () => {
    video.pause();
    video.currentTime = 0;
    video.style.display = 'none';
    img.style.opacity = '1';
    playOverlay.style.opacity = '1';
  };
  
  card.onclick = () => openLightbox(videoSrc, title);
}

function openLightbox(src, title){
  const lb=document.getElementById('lightbox');
  const lbVideo=document.getElementById('lbVideo');
  const lbTitle=document.getElementById('lbTitle');
  lbTitle.textContent = title;
  lbVideo.innerHTML=`<video src="${src}" controls autoplay></video>`;
  lb.classList.add('open');
}

const lbClose=document.getElementById('lbClose');
lbClose.onclick=()=>{
  document.getElementById('lightbox').classList.remove('open');
  document.getElementById('lbVideo').innerHTML='';
};

// Close lightbox on background click
document.getElementById('lightbox').onclick = (e) => {
  if (e.target.id === 'lightbox') {
    lbClose.click();
  }
};

// Close lightbox on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    lbClose.click();
  }
});

// Handle form submission
document.getElementById('contactForm').onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  // Create mailto link with form data
  const subject = `New Project Inquiry - ${data.projectType || 'General'}`;
  const body = `Name: ${data.name}
Email: ${data.email}
Project Type: ${data.projectType || 'Not specified'}
Budget Range: ${data.budget || 'Not specified'}

Project Details:
${data.message}`;
  
  const mailtoLink = `mailto:hello@editkaro.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;
  
  // Show success message
  alert('Thank you! Your default email client should open with the message ready to send.');
};

// Error handling for missing thumbnails
document.addEventListener('DOMContentLoaded', () => {
  // Add error handling for missing images
  const handleImageError = (img) => {
    img.style.display = 'none';
    const video = img.parentElement.querySelector('video');
    video.style.display = 'block';
    video.setAttribute('poster', '');
  };
  
  // Apply to dynamically loaded images
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          const images = node.querySelectorAll ? node.querySelectorAll('.thumbnail-img') : [];
          images.forEach(img => {
            img.onerror = () => handleImageError(img);
          });
        }
      });
    });
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
});

render();