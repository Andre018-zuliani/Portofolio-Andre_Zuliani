import React, { useState } from 'react';
import { Check, Copy, Mail, MessageCircle, Send } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);
  const [senderName, setSenderName] = useState('');
  const [senderRole, setSenderRole] = useState('');
  const [messageBody, setMessageBody] = useState('');

  const handleCopy = async (value: string, field: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2200);
    } catch {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2200);
    }
  };

  const composedMessage = `Halo Andre, saya ${
    senderName.trim() || 'Rekruter / Rekan Kolaborasi'
  }${senderRole.trim() ? ` dari ${senderRole.trim()}` : ''}. ${
    messageBody.trim() ||
    'Saya tertarik mendiskusikan peluang kerja sama / peran di tim kami setelah melihat portofolio Anda.'
  }`;

  const mailtoHref = `mailto:${PROFILE_DATA.email}?subject=${encodeURIComponent(
    `Kolaborasi / Peluang Karier — ${senderName.trim() || 'Portofolio Andre Zuliani'}`
  )}&body=${encodeURIComponent(composedMessage)}`;

  const whatsappHref = `https://wa.me/${
    PROFILE_DATA.whatsappNumber
  }?text=${encodeURIComponent(composedMessage)}`;

  return (
    <section
      id="kontak"
      className="clay-snap-section min-h-[calc(100dvh-5.75rem)] flex flex-col justify-between max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12"
    >
      <div className="clay-white rounded-[42px] p-7 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contact Channels */}
          <div className="lg:col-span-6">
            <p className="text-sm font-bold text-[#6D28D9] mb-2">
              Mari Berkolaborasi
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-black text-[#191744] tracking-tight mb-4"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              Siap berkontribusi di tim{' '}
              <span className="text-[#6D28D9]">QA, Produk TI, maupun AI.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#3D3A6E] leading-relaxed mb-8 max-w-[50ch]">
              Terbuka untuk peluang penuh waktu, proyek kolaborasi pengembangan web, pengujian perangkat lunak (QA), maupun inisiatif transformasi digital.
            </p>

            <div className="space-y-4">
              {/* Email Row */}
              <div className="clay-recessed rounded-[24px] p-4 sm:px-5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#58548E]">Alamat Email</p>
                  <p className="text-sm sm:text-base font-extrabold text-[#191744] truncate">
                    {PROFILE_DATA.email}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(PROFILE_DATA.email, 'email')}
                  className="clay-btn-white inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold text-[#191744] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copiedField === 'email' ? (
                    <>
                      <Check className="w-4 h-4 text-[#0B8478]" aria-hidden="true" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#6D28D9]" aria-hidden="true" />
                      <span>Salin Email</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone / WhatsApp Row */}
              <div className="clay-recessed rounded-[24px] p-4 sm:px-5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#58548E]">
                    Telepon & WhatsApp
                  </p>
                  <p className="text-sm sm:text-base font-extrabold text-[#191744] tabular-nums">
                    {PROFILE_DATA.phone}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(PROFILE_DATA.phone, 'phone')}
                  className="clay-btn-white inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold text-[#191744] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copiedField === 'phone' ? (
                    <>
                      <Check className="w-4 h-4 text-[#0B8478]" aria-hidden="true" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#6D28D9]" aria-hidden="true" />
                      <span>Salin Nomor</span>
                    </>
                  )}
                </button>
              </div>

              {/* External Profile Links */}
              <div className="pt-3 flex flex-wrap items-center gap-5 text-sm font-bold text-[#44407A]">
                <a
                  href={PROFILE_DATA.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#6D28D9] underline underline-offset-4 whitespace-nowrap"
                >
                  LinkedIn: Andre Zuliani ↗
                </a>
                <span aria-hidden="true">·</span>
                <a
                  href={PROFILE_DATA.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#6D28D9] underline underline-offset-4 whitespace-nowrap"
                >
                  GitHub: Andre018-zuliani ↗
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quick Message Composer */}
          <div className="lg:col-span-6">
            <div className="clay-card-purple rounded-[34px] p-6 sm:p-8 text-white">
              <div className="flex items-center justify-between gap-3 mb-5">
                <div>
                  <h3 className="font-display text-2xl font-extrabold">
                    Kirim Pesan Cepat
                  </h3>
                  <p className="text-xs sm:text-sm text-white/90 mt-0.5">
                    Tulis sapaan singkat dan kirim langsung via Email atau WhatsApp
                  </p>
                </div>
                <div className="clay-emoji-pedestal w-13 h-13 rounded-2xl flex items-center justify-center text-2xl shrink-0">
                  <span role="img" aria-hidden="true">
                    ✉️
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-bold text-white/95 mb-1.5"
                    >
                      Nama Anda
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Misal: Budi Santoso"
                      className="w-full rounded-2xl bg-white/95 px-4 py-2.5 text-sm font-semibold text-[#191744] placeholder:text-[#7874A8] focus:outline-2 focus:outline-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-org"
                      className="block text-xs font-bold text-white/95 mb-1.5"
                    >
                      Perusahaan / Tim
                    </label>
                    <input
                      id="contact-org"
                      type="text"
                      value={senderRole}
                      onChange={(e) => setSenderRole(e.target.value)}
                      placeholder="Misal: Tim Engineering"
                      className="w-full rounded-2xl bg-white/95 px-4 py-2.5 text-sm font-semibold text-[#191744] placeholder:text-[#7874A8] focus:outline-2 focus:outline-white"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-bold text-white/95 mb-1.5"
                  >
                    Pesan atau Kebutuhan Peran
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    value={messageBody}
                    onChange={(e) => setMessageBody(e.target.value)}
                    placeholder="Halo Andre, kami ingin mengundang diskusi terkait posisi QA Engineer / Project Management..."
                    className="w-full rounded-2xl bg-white/95 px-4 py-3 text-sm font-semibold text-[#191744] placeholder:text-[#7874A8] focus:outline-2 focus:outline-white resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={mailtoHref}
                    className="clay-btn-white inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs sm:text-sm font-extrabold text-[#191744] whitespace-nowrap shrink-0"
                  >
                    <Mail className="w-4 h-4 text-[#6D28D9]" aria-hidden="true" />
                    <span>Kirim via Email</span>
                  </a>

                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs sm:text-sm font-extrabold text-white bg-[#0B8478] hover:bg-[#0D9488] transition-colors whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>Chat via WhatsApp</span>
                    <Send className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiet, Clean Editorial Footer */}
      <footer className="mt-10 px-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-medium text-[#4F4B85]">
        <p>© {new Date().getFullYear()} Andre Zuliani · Kota Tangerang, Banten</p>
        <div className="flex items-center gap-4">
          <a href="#beranda" className="hover:text-[#191744] transition-colors">
            Kembali ke Atas ↑
          </a>
          <span aria-hidden="true">·</span>
          <a
            href={PROFILE_DATA.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#191744] transition-colors"
          >
            LinkedIn
          </a>
          <span aria-hidden="true">·</span>
          <a
            href={PROFILE_DATA.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#191744] transition-colors"
          >
            GitHub
          </a>
        </div>
      </footer>
    </section>
  );
};
