/* Local appearance preference only. No cookies, network calls, or account changes. */
(() => {
 'use strict';
 const key='mist-stone-appearance-v1';
 const root=document.documentElement;
 const system=window.matchMedia('(prefers-color-scheme: dark)');
 let preference='system';
 try {const saved=localStorage.getItem(key);if(['light','dark','system'].includes(saved))preference=saved;}catch(_){/* Private browsing can deny storage. */}
 function apply(){
  const resolved=preference==='system'?(system.matches?'dark':'light'):preference;
  root.setAttribute('data-theme',resolved);
  root.setAttribute('data-ms-theme',resolved);
  root.setAttribute('data-appearance',preference);
  root.style.colorScheme=resolved;
  document.querySelectorAll('[data-appearance-choice]').forEach(select=>{select.value=preference;});
  const meta=document.querySelector('meta[name="theme-color"]');
  if(meta)meta.setAttribute('content',resolved==='dark'?'#303236':'#EBE8E6');
 }
 apply();
 system.addEventListener('change',()=>{if(preference==='system')apply();});
 window.addEventListener('storage',event=>{if(event.key===key){preference=['light','dark','system'].includes(event.newValue)?event.newValue:'system';apply();}});
 function initialize(){
  let holders=[...document.querySelectorAll('[data-appearance-control]')];
  if(!holders.length){
   const holder=document.createElement('div');holder.className='appearance-toolbar';holder.setAttribute('data-appearance-control','');
   // Standalone toolbar outside the application component tree.
   document.body.append(holder);holders=[holder];
  }
  holders.forEach((holder,i)=>{
   const label=document.createElement('label');label.className='appearance-label';
   const name=document.createElement('span');name.setAttribute('data-appearance-label','');
   const select=document.createElement('select');select.setAttribute('data-appearance-choice','');select.id='appearance-choice-'+i;
   for(const value of ['system','light','dark']){const option=document.createElement('option');option.value=value;select.append(option);}
   label.append(name,select);holder.append(label);
   select.addEventListener('change',()=>{preference=select.value;try{localStorage.setItem(key,preference);}catch(_){}apply();});
  });
  function localize(){const zh=(root.getAttribute('lang')||'').startsWith('zh');
   document.querySelectorAll('[data-appearance-label]').forEach(el=>{el.textContent=zh?'外观':'Appearance';});
   document.querySelectorAll('[data-appearance-choice]').forEach(select=>{select.setAttribute('aria-label',zh?'选择浅色、深色或跟随系统':'Choose light, dark, or system appearance');[...select.options].forEach(option=>{option.textContent=zh?({system:'跟随系统',light:'浅色',dark:'深色'}[option.value]):({system:'System',light:'Light',dark:'Dark'}[option.value]);});});
  }
  localize();apply();
  new MutationObserver(localize).observe(root,{attributes:true,attributeFilter:['lang']});
 }
 if(document.readyState==='complete')initialize();else window.addEventListener('load',initialize,{once:true});
})();

/* Background movement is optional; no tracking or network activity. */
(() => {
 const root=document.documentElement, key='mist-stone-motion-v1';
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 let enabled=true;
 try {enabled=localStorage.getItem(key)!=='off';}catch(_){}
 function sync(){
  const running=enabled&&!reduced.matches;
  root.dataset.motion=running?'on':'off';
  root.dataset.motionPaused=document.hidden?'true':'false';
  document.querySelectorAll('[data-motion-choice]').forEach(input=>{input.checked=running;input.disabled=reduced.matches;});
 }
 function localize(){
  const zh=(root.lang||'').startsWith('zh');
  document.querySelectorAll('[data-motion-label]').forEach(label=>{label.textContent=reduced.matches?(zh?'动态背景：已遵循减少动态设置':'Motion off · reduced-motion preference'):(zh?'动态背景':'Background motion');});
 }
 sync();
 document.addEventListener('visibilitychange',sync);
 reduced.addEventListener('change',()=>{sync();localize();});
 window.addEventListener('storage',event=>{if(event.key===key){enabled=event.newValue!=='off';sync();}});
 function init(){
  document.querySelectorAll('[data-appearance-control]').forEach(holder=>{
   const label=document.createElement('label');label.className='motion-label';
   const input=document.createElement('input');input.type='checkbox';input.setAttribute('data-motion-choice','');
   const text=document.createElement('span');text.setAttribute('data-motion-label','');
   label.append(input,text);holder.append(label);
   input.addEventListener('change',()=>{enabled=input.checked;try{localStorage.setItem(key,enabled?'on':'off');}catch(_){}sync();});
  });
  sync();localize();new MutationObserver(localize).observe(root,{attributes:true,attributeFilter:['lang']});
 }
 if(document.readyState==='complete')init();else window.addEventListener('load',init,{once:true});
})();
