/* Frrrrame UI localization (independent of canvas/output language). */
(() => {
  'use strict';
  const translations = {
    '프레임 생성기':'Frame Generator',
    '앱 안에서 사용할 생성기를 선택하세요.':'Choose a frame generator to get started.',
    '구글맵 프레임':'Google Maps-style Frame',
    '유튜브 프레임':'YouTube-style Frame',
    '구글맵 생성기 예시':'Google Maps-style frame example',
    '유튜브 생성기 예시':'YouTube-style frame example',
    '홈 화면에 추가':'Add to Home Screen', '설치':'Install',
    '처음으로':'Home', '구글맵st 프레임 생성기':'Google Maps-style Frame Generator',
    '유튜브st 프레임 생성기':'YouTube-style Frame Generator',
    '패치노트':'Release Notes','패치노트 보기':'View release notes',
    '이미지 또는 영상을 선택해 구글맵 느낌의 프레임을 생성합니다.':'Create a Google Maps-style frame from an image or video.',
    '이미지 또는 영상을 선택해 유튜브 느낌의 프레임을 생성합니다.':'Create a YouTube-style frame from an image or video.',
    '모드':'Mode', '이미지':'Image', '영상':'Video',
    '이미지 파일':'Image file','영상 파일':'Video file',
    '장소명':'Place name', '별점 (비우면 랜덤)':'Rating (leave blank for random)',
    '리뷰수 (비우면 랜덤)':'Number of reviews (leave blank for random)',
    '카테고리':'Category', '이미지 속 언어':'Language in generated frame',
    '한국어':'Korean', '이미지 생성하기':'Generate image', '이미지 저장':'Download image',
    '완성!':'Done!', '“이미지 저장” 버튼으로 PNG를 저장하세요.':'Click “Download image” to save the PNG.',
    '영상 편집 (최대 7초)':'Video editing (up to 7 seconds)',
    '재생':'Play', '일시정지':'Pause',
    '시작 지점 (초)':'Start time (seconds)',
    '길이 (초, 최대 7초)':'Length (seconds, max 7)',
    '영상 생성하기':'Generate video',
    '첫 생성 시 시간이 걸릴 수 있습니다.':'The first render may take a little longer.',
    '미리보기':'Preview', '동영상 저장 (MP4)':'Download video (MP4)',
    '댓글 작성자 프로필 이미지 (선택)':'Comment author profile image (optional)',
    '닉네임':'Username',
    'n시간 전 (비우면 1~10 랜덤)':'Hours ago (leave blank for random 1–10)',
    '좋아요 수 (비우면 랜덤)':'Number of likes (leave blank for random)',
    '댓글내용':'Comment',
    '예: 인천공항':'e.g., Incheon Airport', '예: 3.4':'e.g., 3.4',
    '예: 58':'e.g., 58', '예: Airport':'e.g., Airport',
    '예: user123':'e.g., user123', '예: 2':'e.g., 2',
    '예: 4K 또는 128':'e.g., 4K or 128', '예: 와 쩐다..':'e.g., This is amazing!',
    '브라우저 메뉴에서 홈 화면에 추가 또는 설치를 선택하시면 앱처럼 사용할 수 있습니다.':
    'To install Frrrrame as an app, select "Add to Home Screen" or "Install" from your browser menu.'
  };
  const uiLabel = {ko:'Language',en:'Language'};
  const reverse = Object.fromEntries(Object.entries(translations).map(([k,v])=>[v,k]));
  const initial = (()=>{try{return localStorage.getItem('frrrrame-ui-lang')==='en'?'en':'ko'}catch{return 'ko'}})();
  let language = initial;
  const stored = new WeakMap();
  let updating = false;
  function translate(raw) {
    if (!raw.trim()) return raw;
    let result = raw;
    if (language === 'en') {
      // Replace longer strings first: avoid translating words inside larger sentences.
      for (const [ko, en] of Object.entries(translations).sort((a,b)=>b[0].length-a[0].length))
        result = result.replaceAll(ko,en);
    }
    return result;
  }
  function apply(root=document.body){
    if(!root||updating)return;
    updating=true;
    try {
      const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){
        if(!node.parentElement||node.parentElement.closest('script,style,textarea,[data-no-i18n]'))return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }});
      while(walker.nextNode()){
        const node=walker.currentNode;
        if(!stored.has(node))stored.set(node,node.textContent);
        const original=stored.get(node);
        const nextText = language === 'en' ? translate(original) : original;
        if (node.textContent !== nextText) node.textContent = nextText;
      }
      root.querySelectorAll?.('[placeholder],[title],[aria-label],[alt]').forEach(el=>{
        for(const attr of ['placeholder','title','aria-label','alt']){
          if(!el.hasAttribute(attr))continue;
          const key='data-i18n-original-'+attr;
          if(!el.hasAttribute(key))el.setAttribute(key,el.getAttribute(attr));
          const original=el.getAttribute(key);
          const nextValue = language === 'en' ? translate(original) : original;
          if (el.getAttribute(attr) !== nextValue) el.setAttribute(attr,nextValue);
        }
      });
      document.documentElement.lang=language;
      document.title=language==='en'?(document.title==='프레임 생성기'?'Frame Generator':document.title==='유튜브st 프레임 생성기'?'YouTube-style Frame Generator':document.title==='googlemap_custom'?'Google Maps-style Frame Generator':document.title):document.title;
      const selector=document.querySelector('#siteLanguageSelector');
      if(selector){selector.value=language;selector.setAttribute('aria-label',uiLabel[language]);}
      const label=document.querySelector('#siteLanguageLabel');
      if(label)label.textContent=uiLabel[language];
    } finally {updating=false;}
  }
  function init(){
    const bar=document.createElement('div');bar.id='siteLanguageBar';
    bar.style.cssText='display:flex;justify-content:flex-end;align-items:center;gap:8px;padding:8px 16px;max-width:980px;margin:8px auto 0;font:600 13px system-ui,sans-serif;color:#222';
    bar.innerHTML='<label id="siteLanguageLabel" for="siteLanguageSelector"></label><select id="siteLanguageSelector" style="padding:7px;border:1px solid #bbb;border-radius:8px;background:white;color:#111"><option value="ko">한국어</option><option value="en">English</option></select>';
    document.body.prepend(bar);
    document.querySelector('#siteLanguageSelector').addEventListener('change',e=>{
      language=e.target.value;try{localStorage.setItem('frrrrame-ui-lang',language)}catch{}
      apply();
    });
    apply();
    // Track newly inserted UI nodes; do not alter canvas output or video content.
    // Only process newly inserted elements, never translation-produced text mutations.
    const observer = new MutationObserver(changes => {
      if (updating) return;
      for (const change of changes) {
        for (const node of change.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE && !node.closest('[data-no-i18n], #siteLanguageBar')) {
            apply(node);
          }
        }
      }
    });
    observer.observe(document.body, {subtree:true, childList:true});
  }
  console.log('[Frrrrame] i18n script loaded');

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('[Frrrrame] DOM ready, initializing');
      init();
    }, { once: true });
  } else {
    console.log('[Frrrrame] Initializing immediately');
    init();
  }
})();  

