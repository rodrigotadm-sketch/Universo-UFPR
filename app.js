
(async()=>{
const root=document.getElementById('app');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let D;try{D=await fetch('universo.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error();return r.json()})}
catch(e){root.innerHTML='<div class="panel">Não foi possível carregar as informações do Universo UFPR.</div>';return}

const value=v=>v?esc(v):'A confirmar';

root.innerHTML=`
<section class="hero">
 <div class="eyebrow">UFPR · CURSO DE BIOMEDICINA</div>
 <h1>${esc(D.title)}</h1>
 <p>${esc(D.subtitle)}</p>
</section>

<section class="current">
 <div class="current-head"><h2>Próxima edição — ${esc(D.next_edition.year)}</h2><span class="badge">${esc(D.next_edition.status)}</span></div>
 <div class="meta-grid">
  <div class="meta"><small>Data</small><strong>${value(D.next_edition.date)}</strong></div>
  <div class="meta"><small>Horário</small><strong>${value(D.next_edition.time)}</strong></div>
  <div class="meta"><small>Local</small><strong>${value(D.next_edition.location)}</strong></div>
  <div class="meta"><small>Estande Biomedicina</small><strong>${value(D.next_edition.biomedicine_stand)}</strong></div>
 </div>
 <div class="notice">${esc(D.next_edition.note)}</div>
</section>

<div class="quick">
 <a href="#curso">Conheça Biomedicina</a>
 <a href="#evento">Biomedicina no evento</a>
 <a href="#visita">Planeje sua visita</a>
 <a href="#historico">Histórico</a>
</div>

<section class="section"><h2>O que é o Universo UFPR?</h2><div class="panel">${esc(D.about_event)}</div></section>

<section class="section" id="curso">
 <h2>Conheça Biomedicina</h2>
 <div class="grid">${D.about_course.map(x=>`<article class="card"><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></article>`).join('')}</div>
</section>

<section class="section" id="evento">
 <h2>${esc(D.event_biomedicine.title)}</h2>
 <div class="panel">${D.event_biomedicine.items.map(i=>`<div class="kv"><span>${esc(i.label)}</span><strong>${esc(i.value)}</strong></div>`).join('')}</div>
</section>

<section class="section" id="visita">
 <h2>${esc(D.visitor.title)}</h2>
 <div class="grid">${D.visitor.items.map(x=>`<article class="card"><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></article>`).join('')}</div>
</section>

<section class="section">
 <h2>Conheça o curso antes da visita</h2>
 <div class="links">${D.course_links.map(l=>`<article class="link-card"><a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a></article>`).join('')}</div>
</section>

<section class="section" id="historico">
 <h2>Histórico das edições</h2>
 <div class="timeline">${D.history.map(h=>`<article class="history-card"><h3>${esc(h.title)}</h3><p>${h.date?`<b>Data:</b> ${esc(h.date)}<br>`:''}${h.location?`<b>Local:</b> ${esc(h.location)}<br>`:''}${h.attendance?`<b>Público:</b> ${esc(h.attendance)}<br>`:''}${esc(h.note)}</p></article>`).join('')}</div>
</section>

<section class="section">
 <h2>Contato</h2>
 <div class="panel contact">Coordenação do Curso: <a href="mailto:${esc(D.contact.email)}">${esc(D.contact.email)}</a> · ${esc(D.contact.phone)}</div>
</section>`;
})();
