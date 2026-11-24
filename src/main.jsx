import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeft, ArrowRight, Eye, EyeOff, Heart,
  LockKeyhole, Menu, Pause, Play, Sparkles, X,
} from 'lucide-react';
import { birthday } from './content.js';
import './style.css';
import './overrides.css';

const chapters = [
  ['home', '✳'], ['calendar', '♡'], ['scrapbook', '▧'], ['about', '✿'],
  ['letter', '✉'], ['wish', '✧'], ['wishes', '♡'], ['ten', '❋'],
  ['favourites', '▤'], ['moments', '⌁'], ['timeline', '◷'], ['final', '♥'],
].map(([id, icon], index) => ({ id, icon, label: birthday.chapterLabels[index] }));

function App() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('birthdayUnlocked') === 'yes');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [opening, setOpening] = useState(false);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState('forward');
  const [melodyOn, setMelodyOn] = useState(false);
  const [wishMade, setWishMade] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const chapter = chapters[page];

  useEffect(() => {
    if (!melodyOn) return undefined;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return undefined;
    const context = new AudioContext();
    const notes = [392, 440, 523.25, 440, 349.23, 392, 293.66, 349.23];
    let step = 0;
    const play = () => {
      const oscillator = context.createOscillator();
      const volume = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = notes[step++ % notes.length];
      volume.gain.setValueAtTime(0.0001, context.currentTime);
      volume.gain.exponentialRampToValueAtTime(0.018, context.currentTime + 0.08);
      volume.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.68);
      oscillator.connect(volume); volume.connect(context.destination);
      oscillator.start(); oscillator.stop(context.currentTime + 0.7);
    };
    play();
    const timer = window.setInterval(play, 760);
    return () => { window.clearInterval(timer); context.close(); };
  }, [melodyOn]);

  useEffect(() => { setWishMade(false); setLetterOpen(false); }, [page]);

  function unlock(event) {
    event.preventDefault();
    if (password !== birthday.password) {
      setWrongPassword(true); setShaking(false);
      window.setTimeout(() => setShaking(true), 0);
      window.setTimeout(() => setShaking(false), 380);
      return;
    }
    setWrongPassword(false); setOpening(true);
    window.setTimeout(() => { sessionStorage.setItem('birthdayUnlocked', 'yes'); setUnlocked(true); }, 950);
  }
  function goTo(index) {
    setDirection(index >= page ? 'forward' : 'backward');
    setPage((index + chapters.length) % chapters.length);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  useEffect(() => {
    if (!unlocked) return undefined;
    const onKeyDown = event => {
      if (event.target instanceof HTMLElement && (event.target.isContentEditable || ['INPUT', 'TEXTAREA', 'BUTTON'].includes(event.target.tagName))) return;
      if (event.key === 'ArrowRight') goTo(page + 1);
      if (event.key === 'ArrowLeft' && page > 0) goTo(page - 1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [unlocked, page]);
  const photo = (index, alt = 'A favourite memory', className = '') => (
    <img className={className} src={birthday.photoPaths[index % birthday.photoPaths.length]} alt={alt} />
  );

  if (!unlocked) return <Login password={password} setPassword={setPassword} showPassword={showPassword}
    setShowPassword={setShowPassword} wrongPassword={wrongPassword} shaking={shaking} opening={opening} onSubmit={unlock} />;

  return <div className="app-shell"><div className="grain" aria-hidden="true" /><div className="ambient-hearts" aria-hidden="true"><span>♡</span><span>✧</span><span>✿</span></div>
    <header className="topbar">
      <button className="brand" onClick={() => goTo(0)}><span className="brand-flower">✿</span><span>a little world <i>for you</i></span></button>
      <nav className="desktop-nav" aria-label="Scrapbook pages">{chapters.map((item, index) =>
        <button key={item.id} onClick={() => goTo(index)} className={page === index ? 'active' : ''}
          title={item.label} aria-label={item.label}>{item.icon}</button>)}</nav>
      <div className="top-actions"><button className="music" onClick={() => setMelodyOn(value => !value)} aria-pressed={melodyOn}>
        {melodyOn ? <Pause size={15} /> : <Play size={15} />}<span>{melodyOn ? 'Pause melody' : 'Our melody'}</span></button>
        <button className="mobile-menu" onClick={() => setMenuOpen(value => !value)} aria-label="Toggle page menu">{menuOpen ? <X /> : <Menu />}</button>
      </div>
    </header>
    {menuOpen && <nav className="mobile-nav" aria-label="Scrapbook pages">{chapters.map((item, index) =>
      <button key={item.id} onClick={() => goTo(index)}>{item.icon} &nbsp; {item.label}</button>)}</nav>}
    <main className="story"><div className="page-meta"><span>PAGE {String(page + 1).padStart(2, '0')} <b>·</b> {String(chapters.length).padStart(2, '0')}</span>
      <span className="meta-line" /><span>{chapter.label.toUpperCase()}</span></div>
      <div key={chapter.id} className={`page-turn ${direction}`}>
        <Chapter id={chapter.id} photo={photo} goTo={goTo}
          wishMade={wishMade} setWishMade={setWishMade} letterOpen={letterOpen} setLetterOpen={setLetterOpen} />
      </div>
      <div className="page-bottom"><button className="text-nav" disabled={page === 0} onClick={() => goTo(page - 1)}><ArrowLeft size={16} /> Previous</button>
        <div className="progress"><div className="progress-label">{String(page + 1).padStart(2, '0')} <span> / {String(chapters.length).padStart(2, '0')}</span></div>
          <div className="progress-track"><span style={{ width: `${(page + 1) / chapters.length * 100}%` }} /></div></div>
        <button className="text-nav" onClick={() => goTo(page + 1)}>Next <ArrowRight size={16} /></button></div>
    </main>
    <footer className="site-foot"><span>✿ &nbsp; SOME THINGS ARE BETTER KEPT IN THE HEART</span><span>AND THIS ONE IS FOR YOU &nbsp; ♡</span></footer>
  </div>;
}

function Login({ password, setPassword, showPassword, setShowPassword, wrongPassword, shaking, opening, onSubmit }) {
  return <main className="login"><div className="grain" aria-hidden="true" />
    <div className="floaty f1">♡</div><div className="floaty f2">✦</div><div className="floaty f3">✧</div><div className="floaty f4">♡</div>
    <section className={`login-card ${opening ? 'unlocking' : ''} ${shaking ? 'shake' : ''}`}>
      <div className="seal">✿</div><div className="envelope">{opening ? <span className="envelope-heart">♡</span> : <span className="envelope-mark">♡</span>}</div>
      <p className="eyebrow">{birthday.login.eyebrow}</p><h1>{birthday.login.titleLine1}<br />{birthday.login.titleLine2}</h1>
      <p className="login-copy">{birthday.login.subtitle}</p><form onSubmit={onSubmit}>
        <div className="password-wrap"><LockKeyhole size={16} /><input type={showPassword ? 'text' : 'password'} placeholder="Your secret password"
          value={password} onChange={event => setPassword(event.target.value)} aria-label="Password" autoComplete="current-password" />
          <button type="button" className="eye" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div>
        {wrongPassword && <p className="error" role="alert">Oops! That's not the right password. Try again!</p>}
        <button className="primary unlock-btn">Unlock your surprise <Heart size={14} /></button></form>
      <p className="hint">A tiny hint: the password is <em>{birthday.login.passwordHint}</em></p>
    </section><p className="login-foot">MADE WITH LOVE, JUST FOR YOU</p></main>;
}

function Chapter({ id, photo, goTo, wishMade, setWishMade, letterOpen, setLetterOpen }) {
  if (id === 'home') return <section className="page home-page"><div className="home-copy"><span className="script kicker">{birthday.home.kicker}</span>
    <h1>{birthday.home.heading}<br /><i>{birthday.home.headingScript}</i></h1><p>{birthday.home.note}</p>
    <button className="primary" onClick={() => goTo(1)}>{birthday.home.button} <ArrowRight size={16} /></button><div className="signature">{birthday.home.signature} <Heart size={15} /></div></div>
    <div className="hero-art"><div className="sunburst" /><span className="sticker star-sticker">✳</span><span className="sticker tiny-heart">♡</span>
      <div className="hero-polaroid">{photo(0, 'Birthday scrapbook photo')}<span>{birthday.home.photoCaption}</span></div><span className="sticker little-flower">✿</span>
      <div className="tape tape-one" /><div className="side-note">one more trip<br />around the sun ☼</div><span className="spark s1">✦</span><span className="spark s2">✧</span></div></section>;

  if (id === 'calendar') {
    const firstWeekday = new Date(birthday.birthdayYear, birthday.birthdayMonthIndex, 1).getDay();
    const daysInMonth = new Date(birthday.birthdayYear, birthday.birthdayMonthIndex + 1, 0).getDate();
    const cells = [...Array(firstWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
    while (cells.length % 7) cells.push(null);
    return <section className="page calendar-page"><div className="section-heading"><span className="script">{birthday.calendar.kicker}</span>
      <h1>{birthday.birthdayMonth}, <i>{birthday.calendar.heading}</i></h1><p>{birthday.calendar.note}</p></div><div className="calendar-layout">
      <div className="calendar-card"><div className="calendar-head"><span>{birthday.birthdayMonth.toUpperCase()} · {birthday.birthdayYear}</span><span className="calendar-spark">✳</span></div><div className="month-title">The month of <em>you</em></div>
        <div className="cal-grid">{['S','M','T','W','T','F','S'].map((day, index) => <b key={index}>{day}</b>)}{cells.map((day, index) => {
          if (day === birthday.birthdayDate) return <button key={index} type="button" className="birthday-date" aria-label={`Open birthday message for ${birthday.birthdayMonth} ${day}`}
            onClick={() => document.querySelector('.date-secret')?.classList.toggle('visible')}>{day}<i>♡</i></button>;
          return <span key={index} className={day ? '' : 'muted'}>{day || ''}</span>;
        })}</div>
        <div className="calendar-note">✿ &nbsp; the day the world got a little brighter</div></div>
      <div className="calendar-aside"><div className="tiny-photo">{photo(1)}</div><span className="script">{birthday.calendar.asideKicker}</span><h2>{birthday.calendar.asideHeading}</h2>
        <p>{birthday.calendar.asideNote}</p>
        <button className="text-link" onClick={event => event.currentTarget.nextElementSibling.classList.toggle('visible')}>Tap the heart for a little secret <Heart size={13} /></button>
        <div className="date-secret">{birthday.calendar.secret}</div></div></div></section>;
  }

  if (id === 'scrapbook') return <section className="page scrapbook-page"><div className="section-heading align-left"><span className="script">{birthday.scrapbook.kicker}</span>
    <h1>{birthday.scrapbook.heading}</h1><p>{birthday.scrapbook.note}</p></div><div className="scrap-grid">
    {[0,1,2,3].map((n) => <div className={`polaroid p${n+1} interactive-photo`} key={n}>{photo(n, birthday.photoCaptions[n])}<span>{birthday.polaroidCaptions[n]}</span></div>)}
    <span className="camera-sticker">📷</span><span className="scrap-heart">♡</span><div className="filmstrip">{[4,5,6,7].map(n => photo(n, birthday.photoCaptions[n]))}</div></div></section>;

  if (id === 'about') return <section className="page about-page"><div className="about-photo-wrap"><div className="about-photo">{photo(2, 'Portrait of my favourite person')}</div>
    <span className="photo-caption">my favourite view, always</span><span className="doodle-heart">♡</span><span className="doodle-star">✧</span><div className="tape tape-about" /></div>
    <div className="about-copy"><span className="script">{birthday.about.kicker}</span><h1>{birthday.about.heading}</h1>
      {birthday.about.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<div className="about-sign">{birthday.about.signature} <span>✿</span></div>
      <span className="about-side">a few of my favourite things ♡</span></div></section>;

  if (id === 'letter') return <section className="page letter-page"><div className="letter-sprig">✿</div><article className={`letter-paper ${letterOpen ? 'letter-open' : ''}`}>
    {!letterOpen ? <div className="sealed-letter"><span className="script">{birthday.letter.sealed}</span><div className="letter-seal">♡</div>
      <h1>There’s a little something<br /><i>inside.</i></h1><button className="primary" onClick={() => setLetterOpen(true)}>{birthday.letter.openButton} <ArrowRight size={15} /></button></div> : <>
      <span className="script">{birthday.letter.kicker}</span><h1>{birthday.letter.heading}</h1><div className="typing-copy">
        <p>{birthday.letter.salutation}</p>{birthday.letter.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<p className="letter-love">{birthday.letter.signoff} <Heart size={15} /></p></div>
      <span className="letter-from">{birthday.letter.from}</span></>}</article><span className="letter-leaf">❧</span></section>;

  if (id === 'wish') return <section className="page wish-page"><div className="wish-copy"><span className="script">{birthday.cake.kicker}</span>
    <h1>{birthday.cake.heading}</h1><p>{birthday.cake.note}</p>
    <div className="wish-answer">{wishMade ? birthday.cake.answer : birthday.cake.prompt}</div></div>
    <button className={`cake-button ${wishMade ? 'blown' : ''}`} onClick={() => setWishMade(true)} aria-label="Blow out the birthday candles">
      <span className="cake-spark sp1">✦</span><span className="cake-spark sp2">✧</span><div className="candles">{[0,1,2].map(n => <span className="candle" key={n}><i className="flame" /></span>)}</div>
      <div className="cake-top">♡</div><div className="cake-tier top-tier" /><div className="icing-drips">⌁ &nbsp;⌁ &nbsp;⌁</div><div className="cake-tier bottom-tier" /><div className="cake-plate" /><span className="cake-instruction">{birthday.cake.buttonHint}</span></button></section>;

  if (id === 'wishes') return <section className="page wishes-page"><div className="wishes-heading"><span className="script">{birthday.wishes.kicker}</span><h1>{birthday.wishes.heading}</h1></div>
    <div className="wish-list">{birthday.wishes.list.map((wish, index) =>
      <div key={wish} className="wish-row"><span className="wish-num">0{index+1}</span><span>{wish}</span><i>{['✿','♡','✧','✳','❀'][index]}</i></div>)}</div>
    <span className="wishes-foot">{birthday.wishes.signoff}</span></section>;

  if (id === 'ten') return <section className="page ten-page"><div className="ten-heading"><span className="script">{birthday.ten.kicker}</span><h1>{birthday.ten.heading}</h1></div>
    <div className="ten-collage">{Array.from({ length: 10 }, (_, index) => <div className={`ten-photo t${index+1}`} key={index}>{photo(index, birthday.photoCaptions[index])}
      <b>{String(index+1).padStart(2, '0')}</b><span>{birthday.photoCaptions[index]}</span></div>)}<div className="ten-center"><Heart size={21} /><small>{birthday.ten.center}</small></div></div></section>;

  if (id === 'favourites') return <section className="page favourites-page"><div className="fave-heading"><span className="script">{birthday.favourites.kicker}</span>
    <h1>{birthday.favourites.heading}</h1><p>{birthday.favourites.note}</p></div><div className="fave-gallery">
    <button className="fave-main photo-button" onClick={() => document.querySelector('.fave-main')?.classList.toggle('photo-zoom')}>{photo(3)}<span className="fave-caption">{birthday.favourites.mainCaption}</span></button>
    <div className="fave-side fside-one">{photo(4)}<span>{birthday.favourites.sideCaptions[0]}</span></div><div className="fave-side fside-two">{photo(5)}<span>{birthday.favourites.sideCaptions[1]}</span></div>
    <div className="fave-note">{birthday.favourites.noteSticker}<b>♡</b></div><div className="fave-mini">{photo(6)}</div></div></section>;

  if (id === 'moments') return <section className="page moments-page"><div className="timeline-heading"><span className="script">{birthday.moments.kicker}</span>
    <h1>{birthday.moments.heading}</h1><p>{birthday.moments.note}</p></div><div className="moments-board">
      <div className="moment-large">{photo(7, birthday.moments.mainCaption)}<span>{birthday.moments.mainCaption}</span></div>
      <div className="moment-small moment-a">{photo(8, 'One of our little adventures')}</div><div className="moment-small moment-b">{photo(9, 'A favourite little memory')}</div>
      <div className="moment-strip">{[1,4,6,2].map(n => photo(n, 'A memory together'))}</div><div className="moment-note"><Sparkles size={15} /> {birthday.moments.closing}</div></div></section>;

  if (id === 'timeline') return <section className="page timeline-page"><div className="timeline-heading"><span className="script">{birthday.timeline.kicker}</span>
    <h1>{birthday.timeline.heading}</h1></div><div className="story-timeline">{[0,1,2].map((index) => <article className={`story-stop stop-${index+1}`} key={index}>
      <div className="timeline-photo">{photo(index + 7, 'A chapter in our story')}</div><div className="timeline-copy"><span className="timeline-date">{birthday.timeline.dates[index]}</span>
        <p>{birthday.timeline.notes[index]}</p></div></article>)}</div>
      <div className="timeline-bottom"><Heart size={15} /> {birthday.timeline.closing}</div></section>;

  return <section className="page final-page"><div className="final-photo">{photo(0, birthday.final.photoCaption)}<span className="final-photo-label">{birthday.final.photoCaption}</span></div>
    <div className="final-copy"><span className="script">{birthday.final.kicker}</span><h1>{birthday.final.heading}</h1>
      <p>{birthday.final.note}</p>
      <span className="final-love">{birthday.final.signature} <Heart size={17} /></span><div className="final-sparkles">✦ &nbsp; ✧ &nbsp; ✿</div></div>
    <span className="final-heart hleft">♡</span><span className="final-heart hright">♡</span></section>;
}

createRoot(document.getElementById('root')).render(<App />);
