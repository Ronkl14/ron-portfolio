import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Maximize2, X } from 'lucide-react'

type Shot = { src: string; title: string; description: string }
const base = '/images/beauty/'
const web: Shot[] = [
  {src:'customer-service-selection.webp',title:'Service selection',description:'Customer booking · English'},
  {src:'customer-booking-calendar.webp',title:'Booking calendar',description:'Customer availability · English'},
  {src:'customer-booking-confirmed.webp',title:'Booking confirmed',description:'End-to-end customer journey'}
]
const mobile: Shot[] = [
  {src:'owner-day-sheet-en.webp',title:'Daily appointments',description:'Owner mobile · English'},
  {src:'owner-today-en.webp',title:'Today overview',description:'Owner mobile · English'},
  {src:'owner-schedule-en.webp',title:'Schedule',description:'Owner mobile · English'},
  {src:'owner-time-grid-en.webp',title:'Time grid',description:'Owner mobile · English'},
  {src:'owner-services-en.webp',title:'Services',description:'Owner mobile · English'},
  {src:'owner-day-sheet-he.webp',title:'יומן יומי',description:'Owner mobile · Hebrew / RTL'}
]
const translated: Record<string,string> = {
  'customer-service-selection.webp':'customer-service-selection-he.webp',
  'customer-booking-calendar.webp':'customer-booking-calendar-he.webp'
}
function Gallery({ shots, device, onOpen }: { shots:Shot[];device?:boolean;onOpen:(shots:Shot[],index:number)=>void }) {
  const [index,setIndex]=useState(0)
  const current=shots[index]
  function move(delta:number){setIndex(i=>(i+delta+shots.length)%shots.length)}
  return <div className={'bb-carousel '+(device?'bb-carousel-mobile':'')}>
    <div className="bb-carousel-head"><div><span className="story-eyebrow">{device?'OWNER MOBILE / REACT NATIVE':'CUSTOMER WEB / REACT'}</span><h4>{device?'Manage on the go':'The booking experience'}</h4></div><span className="bb-counter">{String(index+1).padStart(2,'0')} / {String(shots.length).padStart(2,'0')}</span></div>
    <div className="bb-stage">
      <button type="button" className="bb-nav bb-prev" onClick={()=>move(-1)} aria-label="Previous screenshot"><ArrowLeft size={20}/></button>
      <button type="button" className={device?'bb-photo-button bb-phone':'bb-photo-button bb-web'} onClick={()=>onOpen(shots,index)} aria-label={'Enlarge '+current.title}>
        {device?<div className="bb-phone-screen"><span className="bb-phone-island"/><img src={base+current.src} alt={current.title} loading="lazy"/></div>:<><div className="bb-browser-bar"><span/><span/><span/><small>Beauty Booking</small></div><img src={base+current.src} alt={current.title} loading="lazy"/></>}
        <span className="bb-zoom"><Maximize2 size={15}/> Enlarge</span>
      </button>
      <button type="button" className="bb-nav bb-next" onClick={()=>move(1)} aria-label="Next screenshot"><ArrowRight size={20}/></button>
    </div>
    <div className="bb-caption"><strong>{current.title}</strong><span>{current.description}</span></div>
    <div className="bb-thumbs" aria-label="Choose screenshot">{shots.map((shot,i)=><button type="button" key={shot.src} className={i===index?'bb-thumb active':'bb-thumb'} onClick={()=>setIndex(i)} aria-label={'Show '+shot.title} aria-pressed={i===index}><img src={base+shot.src} alt="" loading="lazy"/></button>)}</div>
  </div>
}
export default function BeautyGallery(){
  const [language,setLanguage]=useState<'en'|'he'>('en')
  const [comparison,setComparison]=useState<'service'|'calendar'>('calendar')
  const [lightbox,setLightbox]=useState<{shots:Shot[];index:number}|null>(null)
  const pair= comparison==='calendar'?'customer-booking-calendar.webp':'customer-service-selection.webp'
  const compareShots:Shot[]=[{src:language==='en'?pair:translated[pair],title:comparison==='calendar'?'Booking calendar':'Service selection',description:language==='en'?'English / LTR':'Hebrew / RTL'}]
  useEffect(()=>{
    if(!lightbox)return
    const old=document.body.style.overflow
    document.body.style.overflow='hidden'
    function handle(e:KeyboardEvent){
      if(e.key==='Escape')setLightbox(null)
      if(e.key==='ArrowRight')setLightbox(s=>s?{...s,index:(s.index+1)%s.shots.length}:null)
      if(e.key==='ArrowLeft')setLightbox(s=>s?{...s,index:(s.index-1+s.shots.length)%s.shots.length}:null)
    }
    window.addEventListener('keydown',handle)
    return()=>{document.body.style.overflow=old;window.removeEventListener('keydown',handle)}
  },[lightbox!==null])
  const active=lightbox&&lightbox.shots[lightbox.index]
  return <div className="product-gallery" aria-label="Real Beauty Booking screenshots">
    <div className="gallery-heading"><span>PRODUCT SCREENS / FICTIONAL DEMO DATA</span><span>WEB + MOBILE + LOCALIZATION</span></div>
    <div className="bb-galleries"><Gallery shots={web} onOpen={(shots,index)=>setLightbox({shots,index})}/><Gallery shots={mobile} device onOpen={(shots,index)=>setLightbox({shots,index})}/></div>
    <div className="bb-localize">
      <div><span className="story-eyebrow">INTERNATIONALIZATION</span><h3>Designed for <em>LTR and RTL.</em></h3><p>Compare the same customer flow in English and Hebrew.</p><div className="bb-select-view"><button type="button" className={comparison==='calendar'?'active':''} onClick={()=>setComparison('calendar')}>Calendar</button><button type="button" className={comparison==='service'?'active':''} onClick={()=>setComparison('service')}>Services</button></div></div>
      <div className="bb-translation"><div className="bb-language-tabs"><button type="button" className={language==='en'?'active':''} onClick={()=>setLanguage('en')} aria-pressed={language==='en'}>EN / LTR</button><button type="button" className={language==='he'?'active':''} onClick={()=>setLanguage('he')} aria-pressed={language==='he'}>HE / RTL</button></div><button type="button" className="bb-translation-image" onClick={()=>setLightbox({shots:compareShots,index:0})} aria-label="Enlarge localized screenshot"><img key={compareShots[0].src} src={base+compareShots[0].src} alt={compareShots[0].title+' '+compareShots[0].description}/><Maximize2 size={17}/></button></div>
    </div>
    {lightbox&&active&&<div className="bb-lightbox" role="dialog" aria-modal="true" aria-label="Screenshot viewer" onClick={()=>setLightbox(null)}><button type="button" className="bb-lightbox-close" onClick={()=>setLightbox(null)} aria-label="Close image"><X size={25}/></button><button type="button" className="bb-lightbox-arrow" onClick={e=>{e.stopPropagation();setLightbox(s=>s?{...s,index:(s.index-1+s.shots.length)%s.shots.length}:null)}} aria-label="Previous image"><ArrowLeft/></button><div className="bb-lightbox-content" onClick={e=>e.stopPropagation()}><img src={base+active.src} alt={active.title}/><div><strong>{active.title}</strong><span>{lightbox.index+1} / {lightbox.shots.length}</span></div></div><button type="button" className="bb-lightbox-arrow" onClick={e=>{e.stopPropagation();setLightbox(s=>s?{...s,index:(s.index+1)%s.shots.length}:null)}} aria-label="Next image"><ArrowRight/></button></div>}
  </div>
}
