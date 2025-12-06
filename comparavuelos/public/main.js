const API_BASE = 'TU_URL_DE_BACKEND/api'; // la vamos a completar después
document.getElementById('year').textContent = new Date().getFullYear();

async function autosuggest(q){
  if(!q || q.length < 2) return [];
  const res = await fetch(`${API_BASE}/autosuggest?query=${encodeURIComponent(q)}`);
  if(!res.ok) return [];
  return res.json();
}

function bindInput(id, listId){
  const input = document.getElementById(id);
  const list = document.getElementById(listId);
  let timeout;
  input.addEventListener('input', ()=> {
    clearTimeout(timeout);
    timeout = setTimeout(async ()=> {
      const vals = await autosuggest(input.value);
      list.innerHTML = '';
      vals.forEach(v=>{
        const li = document.createElement('li');
        li.textContent = `${v.placeName || v.name} (${v.placeId || v.code || ''})`;
        li.addEventListener('click', ()=>{ input.value = v.placeId || v.code || v.name; list.innerHTML=''; });
        list.appendChild(li);
      });
    }, 250);
  });
  document.addEventListener('click', (e)=>{ if(!input.contains(e.target)) list.innerHTML=''; });
}

bindInput('from','from-suggestions');
bindInput('to','to-suggestions');

document.getElementById('searchForm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  const depart = document.getElementById('depart').value;
  const ret = document.getElementById('return').value;
  const payload = {from,to,depart,return:ret};
  const res = await fetch(`${API_BASE}/search`, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  renderResults(data);
});

function renderResults(data){
  const container = document.getElementById('results');
  container.innerHTML = '';
  if(!data || data.length === 0){ container.innerHTML = '<p>No encontramos resultados.</p>'; return; }
  data.forEach(r=>{
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<strong>${r.airline || r.carrier} </strong> ${r.from} → ${r.to} <div>${r.price ? r.price + ' ' + r.currency : ''}</div>
      <a href="${r.bookingUrl || '#'}" target="_blank" rel="noopener">Reservar</a>`;
    container.appendChild(div);
  });
}
