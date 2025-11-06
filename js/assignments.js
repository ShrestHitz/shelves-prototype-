document.addEventListener('DOMContentLoaded', () => {
  const API = 'http://localhost:8080/api/assignments';
  const tbody = document.getElementById('assignments-tbody');
  const totalEl = document.getElementById('total-count');
  const avgEl = document.getElementById('avg-score');
  const completedEl = document.getElementById('completed-percent');

  async function fetchAssignments() {
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      renderAssignments(data);
      updateStats(data);
    } catch (e) {
      console.warn('Could not fetch assignments from backend, using static table as fallback.', e);
      // leave existing static rows if present
      updateStatsFromDom();
    }
  }

  function renderAssignments(assignments) {
    tbody.innerHTML = ''; // clear sample rows
    assignments.forEach(a => {
      const tr = document.createElement('tr');
      tr.className = 'table-row';

      const nameTd = document.createElement('td');
      nameTd.innerHTML = `<div class="assignment-name"><span class="subject-tag">${escapeHtml(a.subjectTag || '')}</span> <span class="assignment-text">${escapeHtml(a.name || '')}</span></div>`;

      const dateTd = document.createElement('td');
      dateTd.className = 'date-cell';
      dateTd.textContent = a.submissionDate ? a.submissionDate : '';

      const marksTd = document.createElement('td');
      marksTd.innerHTML = `<div class="marks-cell"><span class="marks-value">${a.marksObtained ?? ''}</span> <span class="marks-total">/${a.marksTotal ?? ''}</span></div>`;

      const statusTd = document.createElement('td');
      statusTd.innerHTML = `<span class="status-badge status-good">${escapeHtml(a.status || '')}</span>`;

      tr.appendChild(nameTd);
      tr.appendChild(dateTd);
      tr.appendChild(marksTd);
      tr.appendChild(statusTd);

      tbody.appendChild(tr);
    });
  }

  function updateStats(assignments) {
    const total = assignments.length;
    totalEl.textContent = total;

    const avg = assignments.reduce((s, a) => s + (a.marksObtained || 0), 0) / (total || 1);
    avgEl.textContent = (Math.round(avg * 10) / 10).toString();

    // treat statuses Perfect/Excellent/Good as completed for a simple heuristic
    const completed = assignments.filter(a => {
      const st = (a.status || '').toLowerCase();
      return st === 'perfect' || st === 'excellent' || st === 'good' || (a.marksObtained && a.marksTotal && a.marksObtained >= a.marksTotal);
    }).length;
    const pct = total ? Math.round((completed / total) * 100) : 0;
    completedEl.textContent = pct + '%';
  }

  function updateStatsFromDom() {
    // When backend is not available, compute simple stats from existing DOM rows (fallback)
    const rows = tbody.querySelectorAll('tr.table-row');
    const total = rows.length;
    totalEl.textContent = total;
    let sum = 0, count = 0, completed = 0;
    rows.forEach(r => {
      const marksVal = r.querySelector('.marks-value')?.textContent || '';
      const marksTotal = r.querySelector('.marks-total')?.textContent.replace('/', '') || '';
      const mVal = parseFloat(marksVal) || 0;
      const mTot = parseFloat(marksTotal) || 0;
      if (!isNaN(mVal)) { sum += mVal; count++; }
      if (mTot && mVal >= mTot) completed++;
    });
    const avg = count ? Math.round((sum / count) * 10) / 10 : 0;
    avgEl.textContent = avg.toString();
    completedEl.textContent = total ? Math.round((completed / total) * 100) + '%' : '0%';
  }

  // basic HTML escaping
  function escapeHtml(s) {
    if (!s) return '';
    return s.replace(/[&<>\"']/g, function (c) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  fetchAssignments();
});
