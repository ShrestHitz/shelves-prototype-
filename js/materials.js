document.addEventListener('DOMContentLoaded', () => {
  const API = 'http://localhost:8080/api/materials';
  const cards = Array.from(document.querySelectorAll('.subject-card'));

  async function fetchMaterials() {
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error('Network response not ok');
      const materials = await res.json();
      updateCards(materials);
    } catch (e) {
      console.warn('Could not fetch materials from backend, leaving static counts.', e);
    }
  }

  function updateCards(materials) {
    // materials expected to have subjectTag, title, url, description
    const bySubject = {};
    materials.forEach(m => {
      const key = (m.subjectTag || '').toUpperCase();
      if (!bySubject[key]) bySubject[key] = [];
      bySubject[key].push(m);
    });

    cards.forEach(card => {
      const subj = (card.dataset.subject || '').toUpperCase();
      const statValueEl = card.querySelector('.stat-value');
      const statVideosEl = card.querySelectorAll('.stat-item')[1]?.querySelector('.stat-value');
      const list = bySubject[subj] || [];
      // update count (resources)
      if (statValueEl) statValueEl.textContent = list.length;
      // videos count is unknown from backend; keep existing or set to 0
      if (statVideosEl && !statVideosEl.textContent.trim()) statVideosEl.textContent = '0';

      // attach Explore button handler
      const btn = card.querySelector('.explore-btn');
      if (btn) {
        btn.addEventListener('click', (ev) => {
          ev.preventDefault();
          showMaterialsModal(subj, list);
        });
      }
    });
  }

  function showMaterialsModal(subject, list) {
    // simple modal overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.left = 0;
    overlay.style.top = 0;
    overlay.style.right = 0;
    overlay.style.bottom = 0;
    overlay.style.background = 'rgba(0,0,0,0.6)';
    overlay.style.zIndex = 9999;
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';

    const box = document.createElement('div');
    box.style.background = '#fff';
    box.style.padding = '20px';
    box.style.maxWidth = '800px';
    box.style.width = '90%';
    box.style.maxHeight = '80%';
    box.style.overflow = 'auto';
    box.style.borderRadius = '8px';

    const title = document.createElement('h2');
    title.textContent = subject + ' Materials';
    box.appendChild(title);

    if (!list.length) {
      const p = document.createElement('p');
      p.textContent = 'No materials found for this subject.';
      box.appendChild(p);
    } else {
      const ul = document.createElement('ul');
      list.forEach(m => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = m.title || m.url || 'Material';
        a.href = m.url || '#';
        a.target = '_blank';
        a.style.display = 'block';
        a.style.margin = '8px 0';
        li.appendChild(a);
        if (m.description) {
          const d = document.createElement('div');
          d.textContent = m.description;
          d.style.fontSize = '0.9em';
          d.style.color = '#555';
          li.appendChild(d);
        }
        ul.appendChild(li);
      });
      box.appendChild(ul);
    }

    const close = document.createElement('button');
    close.textContent = 'Close';
    close.style.marginTop = '12px';
    close.addEventListener('click', () => document.body.removeChild(overlay));
    box.appendChild(close);

    overlay.appendChild(box);
    document.body.appendChild(overlay);
  }

  fetchMaterials();
});
