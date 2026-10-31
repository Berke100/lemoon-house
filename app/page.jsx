import SiteScripts from '../components/SiteScripts';
import LegalDocs, { DOCS, Doc } from '../components/LegalDocs';
import {
  AIRBNB_URL, CONTACT, MAPS_URL, CHAPTERS, ICON, FACTS, ROOMS, HIGHLIGHTS, AMENITIES, AMEN_COUNT,
  DISTANCES, RULES, RATING_BARS, RATINGS, fmtScore, FAQ, LODGING_LD,
} from '../lib/content';

const pad2 = (n) => String(n).padStart(2, '0');

function Icon({ name, className = 'icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={ICON[name]} />
    </svg>
  );
}

// Lemoon mark: a sun-yellow crescent, the moon in the name
function Brand() {
  return (
    <>
      <svg className="brand__mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path d="M27.9 23.4A14 14 0 1 1 9.6 3.5 11 11 0 0 0 27.9 23.4Z" />
      </svg>
      <span className="brand__name">Lemoon</span>
      <span className="brand__house">House</span>
    </>
  );
}

function Head({ eyebrow, title, id, children, from = 'left' }) {
  return (
    <div className="head reveal" data-from={from}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="h-section" id={id}>{title}</h2>
      {children}
    </div>
  );
}

function Chapter({ c, i }) {
  const T = i === 0 ? 'h1' : 'h2';
  return (
    <article className="chapter" data-chapter={i} aria-hidden={i === 0 ? undefined : 'true'}>
      <p className="eyebrow">{pad2(i + 1)} — {c.label}</p>
      <T className="chapter__title">{c.title}</T>
      <p>{c.text}</p>
    </article>
  );
}

function Room({ r, i }) {
  return (
    <article className="room" data-room={r.id} aria-labelledby={`room-${r.id}`}>
      <div className="room__frame">
        <button type="button" className="room__stage" data-room-open={r.id} aria-label={`${r.name} fotoğraflarını büyüt`}>
          {r.photos.map((p, k) => (
            <img key={p.src} src={p.src} alt={p.alt} className={k === 0 ? 'is-on' : ''} loading={i === 0 && k === 0 ? 'eager' : 'lazy'} decoding="async" />
          ))}
        </button>
        <span className="room__count" aria-hidden="true"><b data-room-index>01</b> / {pad2(r.photos.length)}</span>
        <span className="room__zoom" aria-hidden="true">Büyüt ↗</span>
      </div>
      <div className="room__info">
        <span className="room__num" aria-hidden="true">{pad2(i + 1)}</span>
        <h3 className="room__name" id={`room-${r.id}`}>{r.name}</h3>
        <p className="room__text">{r.text}</p>
        {r.photos.length > 1 && (
          <div className="room__thumbs" role="group" aria-label={`${r.name} fotoğrafları`}>
            {r.photos.slice(0, 5).map((p, k) => (
              <button type="button" key={p.thumb} className={'thumb' + (k === 0 ? ' is-on' : '')} data-thumb={k} aria-label={`${k + 1}. fotoğraf`}>
                <img src={p.thumb} alt="" loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        )}
        <button type="button" className="room__all" data-room-open={r.id}>
          {r.photos.length > 1 ? `${r.photos.length} fotoğrafın hepsi` : 'Fotoğrafı büyüt'} <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
}

export default function Home() {
  const lightboxData = ROOMS.map((r) => ({ id: r.id, name: r.name, photos: r.photos.map(({ src, alt }) => ({ src, alt })) }));
  return (
    <>
      <a className="skip" href="#genel-bakis">Tura atla, içeriğe geç</a>

      <div className="loader" id="loader" role="status" aria-live="polite">
        <div className="loader__box">
          <div className="brand"><Brand /></div>
          <div className="loader__bar"><div className="loader__fill" id="loader-fill" /></div>
          <p className="loader__text eyebrow" id="loader-text">Tur hazırlanıyor</p>
        </div>
      </div>

      <header className="nav nav--over" id="nav">
        <div className="nav__bar gutter">
          <a href="#kesfet" className="brand" aria-label="Lemoon House, başa dön"><Brand /></a>
          <button className="nav__toggle" id="nav-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Menüyü aç">
            <span />
          </button>
          <nav className="nav__links" id="nav-links" aria-label="Ana menü">
            <a href="#galeri">Mekânlar</a>
            <a href="#ozellikler">Olanaklar</a>
            <a href="#konum">Konum</a>
            <a href="#sss">SSS</a>
            <a href="#iletisim">İletişim</a>
            <a href="#rezervasyon" className="btn btn--sun">Rezervasyon yap</a>
          </nav>
        </div>
      </header>

      <main>
        {/* 1 — scroll-driven video tour */}
        <section className="tour" id="kesfet" aria-label="Sanal tur">
          <div className="stage-wrap" id="stage-wrap">
            <div className="stage" id="stage">
              <img className="stage__poster" id="stage-poster" src="frames/f001.webp" alt="" aria-hidden="true" />
              <canvas className="stage__canvas" id="stage-canvas" role="img" aria-label="Bungalovun havuzdan yatak odasına uzanan sanal turu" />
              <div className="stage__shade" />
              <div className="copy">
                <div className="copy__inner" id="copy">
                  {CHAPTERS.map((c, i) => <Chapter key={c.id} c={c} i={i} />)}
                </div>
              </div>
              <nav className="rail" id="rail" aria-label="Tur bölümleri">
                {CHAPTERS.map((c, i) => (
                  <button key={c.id} className={'rail__item' + (i === 0 ? ' is-active' : '')} data-index={i} aria-current={i === 0 ? 'step' : undefined}>
                    <span className="rail__label">{c.label}</span>
                    <span className="rail__track"><span className="rail__fill" /></span>
                  </button>
                ))}
              </nav>
              <div className="timecode" aria-hidden="true"><span id="tc-time">00:00.0</span> / 00:10.0</div>
              <p className="stage__ai">Yapay zekâ canlandırması · gerçek fotoğraflar galeride</p>
              <div className="hint" id="hint">Keşfetmek için kaydır <span className="hint__arrow" aria-hidden="true">↓</span></div>
              <div className="stage__fade" id="stage-fade" />
            </div>
          </div>
          <div className="tour-static gutter">
            <div className="wrap">
              {CHAPTERS.map((c, i) => (
                <div className="static-scene" key={c.id}>
                  <div>
                    <p className="eyebrow">{pad2(i + 1)} — {c.label}</p>
                    <h2 className="chapter__title">{c.title}</h2>
                    <p>{c.text}</p>
                  </div>
                  <img src={`frames/f${String(c.frame).padStart(3, '0')}.webp`} alt={`${c.label} görünümü`} loading="lazy" />
                </div>
              ))}
              <video controls preload="none" playsInline poster="frames/f001.webp" src="video/tur.mp4" aria-label="Bungalov tur videosu" />
              <p className="fine">Tur videosu evin fotoğraflarından yapay zekâ ile oluşturulmuş bir canlandırmadır; gerçek fotoğraflar galeridedir.</p>
            </div>
          </div>
        </section>

        {/* 2 — intro */}
        <section className="section intro" id="genel-bakis">
          <div className="wrap gutter intro__grid">
            <Head eyebrow="Lemoon House · Kırkpınar, Sapanca" title={<>Havuz başında başlayan, <em>çatı katında</em> biten bir gün.</>}>
              <p className="lede">Sapanca’nın doğayla iç içe, sakin bir köşesinde; özel havuzu ve bahçesiyle tamamen size ait bir ev.</p>
            </Head>
            <ul className="facts">
              {FACTS.map((f) => (
                <li className="fact reveal" data-from="right" key={f.title}>
                  <Icon name={f.icon} />
                  <b>{f.title}</b>
                  <span>{f.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3 — rooms: the gallery as a walk through the house */}
        <section className="rooms" id="galeri" aria-labelledby="rooms-title">
          <div className="rooms__pin" id="rooms-pin">
            <div className="rooms__head wrap gutter">
              <div>
                <p className="eyebrow">Mekânlar · {ROOMS.reduce((n, r) => n + r.photos.length, 0)} fotoğraf</p>
                <h2 className="h-section" id="rooms-title">Odadan odaya <em>gezin</em></h2>
              </div>
              <div className="rooms__tabs" role="tablist" aria-label="Mekânlar">
                {ROOMS.map((r, i) => (
                  <button type="button" role="tab" key={r.id} className={'tab' + (i === 0 ? ' is-active' : '')} data-tab={i} aria-selected={i === 0 ? 'true' : 'false'}>
                    <span className="tab__num">{pad2(i + 1)}</span> {r.name}
                  </button>
                ))}
              </div>
              <span className="rooms__progress" aria-hidden="true"><span id="rooms-bar" /></span>
            </div>
            <div className="rooms__viewport" id="rooms-viewport">
              <div className="rooms__track" id="rooms-track">
                {ROOMS.map((r, i) => <Room key={r.id} r={r} i={i} />)}
              </div>
            </div>
          </div>
        </section>

        {/* 4 — amenities */}
        <section className="section" id="ozellikler">
          <div className="wrap gutter">
            <div className="split">
              <Head eyebrow="Olanaklar" title={<>İhtiyacınız olan <em>her şey</em> hazır</>} />
              <button type="button" className="btn btn--ghost reveal" data-from="right" data-doc-open="olanaklar">
                Tüm olanaklar ({AMEN_COUNT}) <span aria-hidden="true">→</span>
              </button>
            </div>
            <ul className="tiles">
              {HIGHLIGHTS.map((h) => (
                <li className="tile reveal" data-from="up" key={h.label}>
                  <span className="tile__icon"><Icon name={h.icon} /></span>
                  <span>{h.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5 — location */}
        <section className="section section--light" id="konum">
          <div className="wrap gutter place">
            <Head eyebrow="Konum" title={<>Kırkpınar’da, <em>göle iki dakika</em></>}>
              <p className="lede">Yan yana, birbirini görmeyen iki bağımsız ev. Otopark kapının önünde.</p>
              <div className="place__addr">
                <Icon name="pin" />
                <address>{CONTACT.address}</address>
              </div>
              <a className="btn btn--cobalt" href={MAPS_URL} target="_blank" rel="noopener noreferrer">Haritada aç <span aria-hidden="true">↗</span></a>
            </Head>
            <ul className="dist">
              {DISTANCES.map((d) => (
                <li className="reveal" data-from="right" key={d.what}>
                  <span className="dist__val">{d.value}<small>{d.unit}</small></span>
                  <b>{d.what}</b>
                  <span>{d.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 6 — before you come */}
        <section className="section section--sun" id="bilinmesi-gerekenler">
          <div className="wrap gutter">
            <div className="split">
              <Head eyebrow="Gelmeden önce" title="Kısaca ev kuralları" />
              <div className="split__actions reveal" data-from="right">
                <button type="button" className="btn btn--ink" data-doc-open="ev-kurallari">Kurallar ve güvenlik</button>
                <button type="button" className="btn btn--ghost-ink" data-doc-open="airbnb-iptal">İptal politikası</button>
              </div>
            </div>
            <ul className="pills">
              {RULES.map(([k, v]) => (
                <li className="pill reveal" data-from="up" key={k}><span>{k}</span><b>{v}</b></li>
              ))}
            </ul>
          </div>
        </section>

        {/* 7 — booking */}
        <section className="section" id="rezervasyon">
          <div className="wrap gutter booking">
            <Head eyebrow="Rezervasyon" title={<>Tarihinizi seçin, <em>yerinizi</em> ayırtın</>}>
              <p className="lede">Seçimleriniz Airbnb’ye hazır gelir; fiyat ve müsaitlik orada, tarihlerinize göre gösterilir.</p>
            </Head>
            <form className="panel reveal" data-from="right" id="booking-form" noValidate data-listing={AIRBNB_URL}>
              <div className="fields">
                <div className="field"><label htmlFor="checkin">Giriş</label><input type="date" id="checkin" name="checkin" /></div>
                <div className="field"><label htmlFor="checkout">Çıkış</label><input type="date" id="checkout" name="checkout" /></div>
                <div className="field">
                  <label id="adults-label">Yetişkin</label>
                  <div className="stepper" role="group" aria-labelledby="adults-label">
                    <button type="button" data-step="adults" data-dir="-1" aria-label="Yetişkin sayısını azalt">−</button>
                    <output id="adults" aria-live="polite">2</output>
                    <button type="button" data-step="adults" data-dir="1" aria-label="Yetişkin sayısını artır">+</button>
                  </div>
                </div>
                <div className="field">
                  <label id="children-label">Çocuk · 2–12</label>
                  <div className="stepper" role="group" aria-labelledby="children-label">
                    <button type="button" data-step="children" data-dir="-1" aria-label="Çocuk sayısını azalt">−</button>
                    <output id="children" aria-live="polite">0</output>
                    <button type="button" data-step="children" data-dir="1" aria-label="Çocuk sayısını artır">+</button>
                  </div>
                </div>
              </div>
              <div className="summary">
                <div className="summary__row"><span>Konaklama</span><span id="sum-nights">Tarih seçilmedi</span></div>
                <div className="summary__row"><span>Misafir</span><span id="sum-guests">2 misafir · en fazla 3</span></div>
              </div>
              <div className="note" id="booking-note" hidden />
              <a className="btn btn--sun btn--wide" id="airbnb-btn" href={AIRBNB_URL} target="_blank" rel="noopener noreferrer">
                Airbnb’de rezervasyon yap <span aria-hidden="true">↗</span>
              </a>
              <p className="fine">Airbnb yeni sekmede açılır. Ödeme ve onay Airbnb üzerinden yapılır. Lemoon House bağımsız bir işletmedir; Airbnb ile ortaklığı yoktur, Airbnb adı yalnızca ilanımızın yerini belirtmek için kullanılır.</p>
            </form>
          </div>
        </section>

        {/* 8 — questions */}
        <section className="section" id="sss" aria-labelledby="faq-title">
          <div className="wrap gutter faq">
            <Head eyebrow="Sık sorulan sorular" id="faq-title" title={<>Aklınıza <em>takılanlar</em></>}>
              <p className="lede">Bulamadığınız bir şey olursa bize yazın, hemen yanıtlayalım.</p>
              <a className="btn btn--ghost" href="#iletisim">Soru sor <span aria-hidden="true">→</span></a>
            </Head>
            <div className="faq__list">
              {FAQ.map(([q, a], i) => (
                <details className="qa reveal" data-from="right" key={q} open={i === 0}>
                  <summary><span>{q}</span><i aria-hidden="true" /></summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 9 — contact */}
        <section className="section section--light" id="iletisim">
          <div className="wrap gutter contact">
            <Head eyebrow="İletişim" title={<>Bize <em>ulaşın</em></>}>
              <ul className="contact__list">
                <li><span>Telefon</span><a className="contact__link" href={`tel:${CONTACT.tel}`}>{CONTACT.phone}</a><button type="button" className="copy-btn" data-copy={CONTACT.phone}>Kopyala</button></li>
                <li><span>E-posta</span><a className="contact__link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a><button type="button" className="copy-btn" data-copy={CONTACT.email}>Kopyala</button></li>
              </ul>
              <div className="socials">
                <a className="btn btn--cobalt" href={AIRBNB_URL} target="_blank" rel="noopener noreferrer">Airbnb ilanı <span aria-hidden="true">↗</span></a>
              </div>
            </Head>
            <form className="panel reveal" data-from="right" id="contact-form" noValidate data-email={CONTACT.email}>
              <div className="fields">
                <div className="field"><label htmlFor="c-name">Ad soyad</label><input id="c-name" name="name" autoComplete="name" required /></div>
                <div className="field"><label htmlFor="c-mail">E-posta veya telefon</label><input id="c-mail" name="contact" autoComplete="email" required /></div>
                <div className="field field--full"><label htmlFor="c-msg">Mesajınız</label><textarea id="c-msg" name="message" rows={3} required /></div>
              </div>
              <p className="fine">Bilgileriniz yalnızca mesajınızı yanıtlamak için kullanılır. Ayrıntılar: <button type="button" className="doc__link" data-doc-open="gizlilik-politikasi">KVKK Aydınlatma Metni</button></p>
              <div className="note" id="contact-note" hidden />
              <button type="submit" className="btn btn--cobalt btn--wide">Mesajı gönder</button>
            </form>
          </div>
        </section>

        {/* 9 — guest ratings */}
        <section className="section ratings" id="degerlendirmeler" aria-labelledby="ratings-title">
          <div className="wrap gutter ratings__grid">
            <Head eyebrow="Misafir değerlendirmeleri" id="ratings-title" title={<>Konuklarımız <em>ne düşünüyor</em></>}>
              <div className="dist-bars" aria-label="Genel puan dağılımı">
                {RATING_BARS.map(([star, w]) => (
                  <div className="dist-bars__row" key={star}>
                    <span>{star}</span>
                    <span className="dist-bars__track"><span className="dist-bars__fill" data-w={w} style={{ width: `${w}%` }} /></span>
                  </div>
                ))}
              </div>
              <a className="btn btn--ghost" href={AIRBNB_URL} target="_blank" rel="noopener noreferrer">Yorumları Airbnb’de okuyun <span aria-hidden="true">↗</span></a>
              <p className="fine">Puanlar Airbnb ilanımızdaki misafir değerlendirmelerinden alınmıştır (Ekim 2026).</p>
            </Head>
            <ul className="scores" aria-label="Kategori puanları">
              {RATINGS.map((r) => (
                <li className="score reveal" data-from="right" key={r.label}>
                  <svg className="score__ring" viewBox="0 0 64 64" aria-hidden="true">
                    <circle cx="32" cy="32" r="28" className="score__track" />
                    <circle cx="32" cy="32" r="28" className="score__arc" pathLength="100" data-p={(r.value / 5) * 100} style={{ strokeDashoffset: 100 - (r.value / 5) * 100 }} />
                    <g transform="translate(20 20)"><path d={ICON[r.icon]} className="score__icon" /></g>
                  </svg>
                  <span className="score__value" data-v={r.value}>{fmtScore(r.value)}</span>
                  <span className="score__label">{r.label}</span>
                  <span className="sr-only"> / 5</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {/* phones: booking always one tap away */}
      <div className="mbar" id="mbar" hidden>
        <div>
          <b>Lemoon House</b>
          <span>Isıtmalı havuz · Jakuzi · en fazla 3 kişi</span>
        </div>
        <a href="#rezervasyon" className="btn btn--sun">Rezervasyon</a>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LODGING_LD) }} />

      <footer className="footer">
        <div className="wrap gutter">
          <div className="footer__top">
            <div className="footer__brand" aria-label="Lemoon House"><Brand /></div>
            <div className="footer__cols">
              <nav aria-label="Alt menü">
                <p className="eyebrow">Site</p>
                <a href="#kesfet">Sanal tur</a>
                <a href="#galeri">Mekânlar</a>
                <a href="#ozellikler">Olanaklar</a>
                <a href="#konum">Konum</a>
                <a href="#rezervasyon">Rezervasyon</a>
                <a href="#sss">Sık sorulan sorular</a>
              </nav>
              <nav aria-label="Kurumsal">
                <p className="eyebrow">Kurumsal</p>
                {DOCS.map((d) => (
                  <button type="button" key={d.id} data-doc-open={d.id}>{d.title}</button>
                ))}
              </nav>
            </div>
          </div>
          <div className="footer__bottom">
            <span>© 2026 Lemoon House · {CONTACT.address} · İzin belge no 54-0381 · 54-0383</span>
            <span><a href={`tel:${CONTACT.tel}`}>{CONTACT.phone}</a> · <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></span>
          </div>
        </div>
      </footer>

      {/* dialogs */}
      <Doc id="olanaklar" title="Tüm olanaklar" eyebrow="Olanaklar">
        <div className="amen">
          {AMENITIES.map((a) => (
            <div className={'amen__col' + (a.missing ? ' amen__col--missing' : '')} key={a.title}>
              <h3>{a.title}</h3>
              <ul>
                {a.items.map(([t, n]) => (
                  <li key={t}>
                    <span>{a.missing ? <><span className="sr-only">Yok: </span><s>{t}</s></> : t}{n ? <small>{n}</small> : null}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="doc__note">Kullanılan araç, gereçler ve dekorasyon ürünleri değişkenlik gösterebilir.</p>
      </Doc>

      <Doc id="ev-kurallari" title="Ev kuralları ve güvenlik" eyebrow="Gelmeden önce">
        <h3>Giriş ve çıkış</h3>
        <p>Giriş 14:00 – 00:00 arasında, kilitli kutu ile kendi kendinize. Çıkış en geç 11:00.</p>
        <h3>Ev kuralları</h3>
        <ul className="doc__list">
          <li>En fazla 3 kişi konaklayabilir (1 çift kişilik yatak, 1 tek kişilik kanepe).</li>
          <li>Dışarıdan misafir kabul edilmez.</li>
          <li>Eve ayakkabıyla girilmez.</li>
          <li>Girişte kimlik zorunludur.</li>
          <li>18 yaş altı misafirler ebeveynsiz konaklayamaz; rezervasyon oluşsa bile giriş yapılamaz.</li>
        </ul>
        <h3>Güvenlik</h3>
        <ul className="doc__list">
          <li>Dış mekânda güvenlik kameraları (otopark alanında)</li>
          <li>Duman dedektörü, yangın söndürücü ve Pronet alarm sistemi</li>
          <li>Karbonmonoksit alarmı</li>
          <li>Jeneratör ve su deposu</li>
        </ul>
      </Doc>

      <Doc id="airbnb-iptal" title="İptal politikası" eyebrow="Airbnb rezervasyonları">
        <ol className="policy">
          <li><span className="policy__when">Rezervasyondan sonraki 24 saat</span><b>Tam para iadesi</b><span>Ödediğiniz tutarın tamamını geri alırsınız.</span></li>
          <li><span className="policy__when">Son iptal tarihine kadar, saat 14:00</span><b>Kısmi para iadesi</b><span>Her gece için %50 iade. Hizmet bedeli iade edilmez.</span></li>
          <li><span className="policy__when">Son iptal tarihinden sonra</span><b>Para iadesi yapılmaz</b></li>
        </ol>
        <p className="doc__note">Son iptal tarihi Airbnb’de, giriş tarihinize göre gösterilir. Doğrudan bizimle yapılan rezervasyonlarda <button type="button" className="doc__link" data-doc-open="iptal-iade">İptal ve İade Şartları</button> geçerlidir.</p>
      </Doc>

      {/* photo viewer (one room at a time) */}
      <dialog className="lightbox" id="lightbox" aria-label="Fotoğraf görüntüleyici">
        <div className="lightbox__top">
          <span className="eyebrow" id="lb-caption" />
          <button className="lb-btn" id="lb-close" aria-label="Kapat">✕</button>
        </div>
        <div className="lightbox__stage"><img id="lb-img" alt="" /></div>
        <div className="lightbox__thumbs" id="lb-thumbs" />
        <div className="lightbox__bottom">
          <button className="lb-btn" id="lb-prev" aria-label="Önceki fotoğraf">←</button>
          <span className="eyebrow" id="lb-count" />
          <button className="lb-btn" id="lb-next" aria-label="Sonraki fotoğraf">→</button>
        </div>
      </dialog>
      <script type="application/json" id="rooms-data" dangerouslySetInnerHTML={{ __html: JSON.stringify(lightboxData) }} />
      <LegalDocs contact={CONTACT} />
      <SiteScripts />
    </>
  );
}
