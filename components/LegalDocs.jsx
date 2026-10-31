// Kurumsal belgeler: lemoonbungalovsapanca.com'daki "Kurumsal" sayfalarından aktarıldı.
// Sözleşme metinleri başlık başlık aktarılmıştır; resmi metin değişirse bu dosyayı güncelleyin.

export const IBAN = 'TR04 0011 1000 0000 0101 0474 70';
export const ACCOUNT_HOLDER = 'Mehmet Çapoğlu';
export const BANK = 'Enpara';

export const DOCS = [
  { id: 'gizlilik-politikasi', title: 'KVKK ve Gizlilik' },
  { id: 'iptal-iade', title: 'İptal ve İade Şartları' },
  { id: 'mesafeli-satis', title: 'Mesafeli Satış Sözleşmesi' },
  { id: 'banka-hesaplari', title: 'Banka Hesap Numaralarımız' },
  { id: 'odeme-bildirimi', title: 'Ödeme Bildirimi' },
];

export function Doc({ id, title, eyebrow = 'Kurumsal', children }) {
  return (
    <dialog className="doc" id={`doc-${id}`} aria-labelledby={`doc-${id}-title`}>
      <div className="doc__bar">
        <p className="eyebrow">{eyebrow}</p>
        <button type="button" className="lb-btn doc__close" data-doc-close aria-label="Kapat">✕</button>
      </div>
      <div className="doc__body">
        <h2 className="display" id={`doc-${id}-title`}>{title}</h2>
        {children}
      </div>
    </dialog>
  );
}

export default function LegalDocs({ contact }) {
  return (
    <>
      <Doc id="gizlilik-politikasi" title="KVKK Aydınlatma Metni ve Gizlilik Politikası">
        <p>Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu’nun (KVKK) 10. maddesi uyarınca, Lemoon House’un kişisel verilerinizi nasıl işlediğini açıklar.</p>
        <h3>Veri sorumlusu</h3>
        <p>Lemoon House, Mehmet Çapoğlu · {contact.address} · {contact.phone} · {contact.email}</p>
        <h3>Hangi verileri, neden işliyoruz?</h3>
        <ul>
          <li><strong>İletişim formu:</strong> ad soyad, e-posta veya telefon ve mesajınız. Sorunuzu yanıtlamak için. Hukuki sebep: sözleşmenin kurulması öncesi talebiniz (KVKK m.5/2-c) ve meşru menfaatimiz (m.5/2-f).</li>
          <li><strong>Ödeme bildirimi:</strong> ad, soyad, rezervasyon numarası. Havale veya EFT ödemenizi rezervasyonla eşleştirmek için. Hukuki sebep: sözleşmenin ifası (m.5/2-c) ve vergi/muhasebe yükümlülükleri (m.5/2-ç).</li>
          <li><strong>Konaklama sırasında:</strong> konaklayan herkesin kimlik bilgileri. 1774 sayılı Kimlik Bildirme Kanunu gereği Kimlik Bildirim Sistemi’ne (KBS) bildirmek için. Hukuki sebep: kanunlarda açıkça öngörülme ve hukuki yükümlülük (m.5/2-a, ç). Kimlik kartınızın fotokopisini ya da fotoğrafını almayız.</li>
        </ul>
        <h3>Veriler nasıl toplanır?</h3>
        <p>Sitedeki formlar bilgilerinizi bir sunucuya kaydetmez; “Gönder” düğmesi, yazdıklarınızı sizin e-posta uygulamanızda bize yazılmış bir taslak olarak açar. Bilgiler, siz e-postayı gönderdiğinizde bize ulaşır. Telefon, e-posta ve konaklama sırasında doğrudan da toplanabilir.</p>
        <h3>Kimlere aktarılır?</h3>
        <p>Kimlik bilgileri yalnızca kanun gereği emniyet ve jandarmaya (KBS) bildirilir. Ödeme bilgileri bankamızla ve gerektiğinde mali müşavirimizle paylaşılır. Yetkili kamu kurumlarının yasal talepleri dışında verileriniz üçüncü kişilere aktarılmaz, satılmaz ve reklam amacıyla kullanılmaz.</p>
        <p>E-postalarımız Google (Gmail) hizmeti üzerinden alındığından, bize gönderdiğiniz iletiler Google’ın yurt dışındaki sunucularında saklanabilir. Rezervasyon bağlantısına tıkladığınızda Airbnb sitesine geçersiniz; orada paylaştığınız veriler Airbnb’nin kendi gizlilik politikasına tabidir.</p>
        <h3>Çerezler</h3>
        <p>Bu site çerez, ziyaretçi takibi, reklam ya da istatistik aracı kullanmaz. Yazı tipleri ve görseller sitenin kendi sunucusundan yüklenir. Siteyi barındıran hizmet sağlayıcı, güvenlik ve işletim amacıyla teknik erişim kayıtları (IP adresi gibi) tutabilir.</p>
        <h3>Saklama süresi</h3>
        <p>Veriler, işlendikleri amaç için gereken süre ve ilgili mevzuatta öngörülen süreler boyunca saklanır, ardından silinir veya anonim hâle getirilir.</p>
        <h3>Haklarınız</h3>
        <p>KVKK’nın 11. maddesi uyarınca verilerinizin işlenip işlenmediğini öğrenme, bilgi isteme, düzeltilmesini veya silinmesini isteme, aktarıldığı kişileri öğrenme, itiraz etme ve zararın giderilmesini talep etme haklarına sahipsiniz. Başvurularınızı {contact.email} adresine yazılı olarak iletebilirsiniz; en geç 30 gün içinde yanıtlanır.</p>
        <h3>Güvenlik</h3>
        <p>Kart bilgisi istemeyiz. E-postalarınızda kart numarası, şifre gibi bilgileri yazmayın.</p>
        <p className="doc__note">Son güncelleme: Ekim 2026</p>
      </Doc>

      <Doc id="iptal-iade" title="İptal ve İade Şartları">
        <p className="doc__note">Airbnb üzerinden yapılan rezervasyonlarda Airbnb’nin iptal politikası geçerlidir. Aşağıdaki şartlar doğrudan bizimle yapılan rezervasyonlar içindir.</p>
        <h3>Girişten önce iptal</h3>
        <p>Ödeme yapıldıktan sonra, giriş tarihine 30 gün veya daha az kala yapılan iptallerde toplam konaklama bedelinin tamamı kesilir.</p>
        <h3>Gelmeme</h3>
        <p>Rezervasyonu iptal edip ya da giriş yapmayıp tesiste hiç konaklamamanız hâlinde ödediğiniz tutar iade edilmez.</p>
        <h3>Lemoon House tarafından iptal</h3>
        <p>Rezervasyonun bizim tarafımızdan iptal edilmesi durumunda en kısa sürede bilgilendirilirsiniz ve uygunsa aynı tarihler için eşdeğer bir ev önerilir. Öneriyi kabul etmezseniz ve iptal mücbir sebepten kaynaklanmıyorsa ödemeniz iade edilir.</p>
        <h3>Misafir kusurundan kaynaklanan iptal</h3>
        <p>İptal misafirin kusurundan kaynaklanıyorsa veya sözleşme usulüne uygun yazılı bildirim yapılmadan sona ererse, kullanılmayan konaklamadan işletme sorumlu tutulamaz. Bedelin tamamı kararlaştırılan tarihte muaccel olur; işletmenin yasal hakları saklıdır.</p>
      </Doc>

      <Doc id="mesafeli-satis" title="Mesafeli Satış Sözleşmesi">
        <p>Bu sözleşme, Sapanca / Sakarya’da villa ve tiny house kiralama hizmeti veren Lemoon House ile konaklama yapan misafir arasındaki kiralama koşullarını düzenler. Rezervasyon yapan misafir, bu sözleşmenin şartlarını kabul etmiş sayılır.</p>
        <h3>Rezervasyon ve ödeme</h3>
        <p>Rezervasyonlar internet üzerinden, telefonla veya e-postayla yapılabilir. Ödeme, bir iş günü içinde havale veya EFT ile yapılır; süresinde ödenmeyen rezervasyonlar iptal edilir.</p>
        <h3>Giriş ve çıkış saatleri</h3>
        <p>Giriş 14:00–00:00 arasında kilitli kutu ile kendi kendinize yapılır, çıkış en geç 11:00’dedir. Geç giriş ya da geç çıkıştan doğan durumlar misafirin sorumluluğundadır.</p>
        <h3>Ev kapasitesi</h3>
        <p>Evin belirtilen kapasitesinin üzerinde veya kayıt dışı misafir kabul edilmez. Kişi sayısındaki değişiklikler ek ücrete tabi olabilir.</p>
        <h3>Temizlik, bakım ve ek giderler</h3>
        <p>Giriş temizliği fiyata dahildir. İlan sayfasında aksi belirtilmedikçe elektrik, su gibi giderler ve standart donanım fiyata dahildir.</p>
        <h3>Evcil hayvan ve sigara</h3>
        <p>Aksi belirtilmedikçe evcil hayvan kabul edilmez ve ev içinde sigara içilmez.</p>
        <h3>Fiyatlar</h3>
        <p>Belirtilen fiyatlar seçilen tarihler için geçerlidir.</p>
        <h3>İptal ve iade</h3>
        <p>Giriş tarihine 30 gün veya daha az kala yapılan iptallerde konaklama bedelinin tamamı kesilir. İşletme tarafından yapılan iptallerde eşdeğer bir ev önerilir ya da ödeme iade edilir. Ayrıntılar için İptal ve İade Şartları’na bakınız.</p>
        <h3>Yüzme havuzları</h3>
        <p>Havuz suyunun sıcaklığı hava koşullarına göre değişebilir. Havuzun kullanılamadığı durumlardan işletme sorumlu tutulamaz.</p>
        <h3>Sorumluluklarımız</h3>
        <p>Ev temiz ve kullanıma hazır olarak teslim edilir. Arızaların hemen bildirilmesi gerekir; onarımlar mümkünse 48 saat içinde yapılır.</p>
        <h3>Misafirin sorumlulukları</h3>
        <p>Misafir, evi ve içindeki eşyaları özenle kullanmak, hasarları bildirmek, gürültü ve yasa dışı davranışlardan kaçınmakla yükümlüdür. Oluşan hasarlar depozitodan karşılanır.</p>
        <h3>Mücbir sebepler</h3>
        <p>Doğal afet, savaş, salgın gibi işletmenin kontrolü dışındaki durumlarda işletme sözleşmeyi sorumluluk doğmadan feshedebilir.</p>
        <h3>Şikâyetler</h3>
        <p>Şikâyetlerin konaklama sırasında iletilmesi gerekir. Çıkıştan sonra yapılan şikâyetler dikkate alınmayabilir.</p>
        <h3>Güvenlik ve gizlilik</h3>
        <p>Kişisel veriler üçüncü kişilere satılmaz ve yalnızca KVKK Aydınlatma Metni’nde belirtilen amaçlarla işlenir.</p>
        <h3>Diğer önemli bilgiler</h3>
        <p>Yol koşulları, yolculuk sırasında yaşanabilecek kazalar, havuz ve şebeke kaynaklı aksaklıklar, böcek ve hayvanlar, mobil şebeke çekimi ve ilan fotoğrafları ile ev arasındaki küçük farklılıklardan işletme sorumlu tutulamaz.</p>
        <h3>Uyuşmazlıklar</h3>
        <p>Bu sözleşmeden doğan uyuşmazlıklarda Sapanca icra daireleri ve mahkemeleri yetkilidir.</p>
      </Doc>

      <Doc id="banka-hesaplari" title="Banka Hesap Numaralarımız">
        <div className="bank">
          <dl>
            <div><dt>Banka</dt><dd>{BANK}</dd></div>
            <div><dt>Hesap sahibi</dt><dd>{ACCOUNT_HOLDER}</dd></div>
            <div><dt>IBAN</dt><dd><span className="bank__iban">{IBAN}</span><button type="button" className="copy-btn" data-copy={IBAN.replace(/\s/g, '')}>Kopyala</button></dd></div>
          </dl>
        </div>
        <p>Havale veya EFT işlemini yaptıktan sonra lütfen <button type="button" className="doc__link" data-doc-open="odeme-bildirimi">ödeme bildirim formunu</button> doldurun.</p>
      </Doc>

      <Doc id="odeme-bildirimi" title="Ödeme Bildirimi">
        <form className="pay-form" id="pay-form" noValidate data-email={contact.email}>
          <div className="fields">
            <div className="field"><label htmlFor="p-first">Ad</label><input id="p-first" name="first" autoComplete="given-name" required /></div>
            <div className="field"><label htmlFor="p-last">Soyad</label><input id="p-last" name="last" autoComplete="family-name" required /></div>
            <div className="field field--full"><label htmlFor="p-res">Rezervasyon no</label><input id="p-res" name="res" required /></div>
          </div>
          <p className="doc__note">Ödeme yaptığınız hesabımız: {BANK} · {ACCOUNT_HOLDER} · {IBAN}</p>
          <div className="note" id="pay-note" hidden />
          <div className="actions"><button type="submit" className="btn btn--primary">Gönder</button></div>
        </form>
      </Doc>
    </>
  );
}
