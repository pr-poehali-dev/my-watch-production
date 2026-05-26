import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const watches = [
  {
    id: 1,
    name: "Meteorite",
    subtitle: "Метеорит & Розовое золото",
    description: "Циферблат из метеоритного железа. Турбийон. Корпус из розового золота.",
    price: "от 480 000 ₽",
    image: "https://cdn.poehali.dev/projects/5110b0a3-b9e9-4792-b257-04cdcc30b0dc/bucket/158e7827-eb2e-4e34-a958-af2365e2668c.jpg",
  },
  {
    id: 2,
    name: "Golden Laza",
    subtitle: "Малахит & Розовое золото",
    description: "Циферблат из натурального малахита. Турбийон. Знаки зодиака на циферблате.",
    price: "от 620 000 ₽",
    image: "https://cdn.poehali.dev/projects/5110b0a3-b9e9-4792-b257-04cdcc30b0dc/bucket/5079b291-e5cd-4fb0-88ce-568d5862b54e.jpg",
  },
  {
    id: 3,
    name: "Подарочное издание",
    subtitle: "Эксклюзивная упаковка",
    description: "Фирменная шкатулка из дерева. Часы в стеклянном футляре. Молоточек LUXURUSS в комплекте.",
    price: "от 390 000 ₽",
    image: "https://cdn.poehali.dev/projects/5110b0a3-b9e9-4792-b257-04cdcc30b0dc/bucket/3fdf3a6f-201c-4038-b304-fc1a91976af4.jpg",
  },
];

export default function Index() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
      if (cursorRingRef.current) {
        setTimeout(() => {
          if (cursorRingRef.current) {
            cursorRingRef.current.style.left = e.clientX + "px";
            cursorRingRef.current.style.top = e.clientY + "px";
          }
        }, 80);
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ["home", "gallery", "about", "contacts"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(id);
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0806] text-[#E8DCC8] overflow-x-hidden">
      <div ref={cursorRef} className="custom-cursor hidden md:block" />
      <div ref={cursorRingRef} className="custom-cursor-ring hidden md:block" />

      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(10,8,6,0.95)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.15)" : "none",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <button
            onClick={() => scrollTo("home")}
            className="text-xl tracking-[0.3em] text-[#C9A84C] hover:text-[#E8C96C] transition-colors"
            style={{ fontFamily: "'Arial Black', Arial, sans-serif", cursor: "none" }}
          >
            LUXURUSS
          </button>

          <div className="hidden md:flex items-center gap-10">
            {[
              { id: "home", label: "Главная" },
              { id: "gallery", label: "Галерея" },
              { id: "about", label: "О бренде" },
              { id: "contacts", label: "Контакты" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link ${activeSection === item.id ? "!text-[#C9A84C]" : ""}`}
                style={{ cursor: "none" }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden text-[#C9A84C]"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ cursor: "none" }}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#0A0806] border-t border-[#C9A84C]/10 px-8 py-6 flex flex-col gap-6">
            {[
              { id: "home", label: "Главная" },
              { id: "gallery", label: "Галерея" },
              { id: "about", label: "О бренде" },
              { id: "contacts", label: "Контакты" },
            ].map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="nav-link text-left">
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${watches[0].image})`, filter: "brightness(0.25) saturate(0.5)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0806]/60 via-transparent to-[#0A0806]" />

        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
          <div className="w-px h-24 bg-gradient-to-b from-transparent to-[#C9A84C]" />
          <span
            className="text-[#C9A84C] text-[0.55rem] tracking-[0.4em] uppercase"
            style={{ writingMode: "vertical-rl", fontFamily: "Montserrat, sans-serif" }}
          >
            Время — это искусство
          </span>
          <div className="w-px h-24 bg-gradient-to-t from-transparent to-[#C9A84C]" />
        </div>

        <div className="relative z-10 text-center px-8 max-w-5xl mx-auto">
          <p className="section-label mb-8 opacity-0 animate-fade-in delay-100" style={{ animationFillMode: "forwards" }}>
            Ручное производство · Россия
          </p>
          <h1
            className="text-6xl md:text-8xl lg:text-9xl leading-none mb-6 opacity-0 animate-fade-in-up delay-200"
            style={{ animationFillMode: "forwards", fontFamily: "'Arial Black', Arial, sans-serif" }}
          >
            <span className="gold-shimmer">LUXURUSS</span>
          </h1>
          <p
            className="font-['Cormorant_Garamond'] italic text-2xl md:text-3xl text-[#B8A88A] mb-4 opacity-0 animate-fade-in-up delay-300"
            style={{ animationFillMode: "forwards" }}
          >
            Воплощение времени и роскоши
          </p>
          <div className="gold-divider my-8 opacity-0 animate-fade-in delay-500" style={{ animationFillMode: "forwards" }} />
          <p
            className="font-['Cormorant_Garamond'] italic text-3xl md:text-5xl text-[#C9A84C] mb-12 opacity-0 animate-fade-in delay-700"
            style={{ animationFillMode: "forwards" }}
          >
            LUXURUSS — это любовь
          </p>
          <div className="opacity-0 animate-fade-in delay-1000" style={{ animationFillMode: "forwards" }}>
            <button className="btn-gold" onClick={() => scrollTo("gallery")}>
              <span>Смотреть коллекцию</span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="section-label text-[#C9A84C]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#C9A84C] to-transparent animate-pulse" />
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-32 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="section-label mb-4">Коллекция 2024</p>
          <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl font-light text-[#E8DCC8] mb-6">
            Галерея
          </h2>
          <div className="gold-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {watches.map((watch, i) => (
            <div key={watch.id} className="gallery-item group" style={{ cursor: "none" }}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <img src={watch.image} alt={watch.name} className="w-full h-full object-cover" />
                <div
                  className="absolute inset-0 flex flex-col justify-end p-8 z-10"
                  style={{ background: "linear-gradient(to top, rgba(10,8,6,0.95) 0%, rgba(10,8,6,0.4) 50%, transparent 100%)" }}
                >
                  <p className="section-label mb-2 opacity-70">{watch.subtitle}</p>
                  <h3 className="font-['Cormorant_Garamond'] text-3xl font-light text-[#E8DCC8] mb-2">{watch.name}</h3>
                  <p className="text-[#8A7A64] text-xs leading-relaxed mb-4" style={{ fontFamily: "Montserrat" }}>
                    {watch.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#C9A84C] font-['Cormorant_Garamond'] text-xl">{watch.price}</span>
                    <button
                      className="w-10 h-10 border border-[#C9A84C]/40 flex items-center justify-center group-hover:border-[#C9A84C] transition-colors"
                      style={{ cursor: "none" }}
                    >
                      <Icon name="ArrowRight" size={16} className="text-[#C9A84C]" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="py-4 px-2 flex items-center justify-between border-b border-[#C9A84C]/10">
                <span className="font-['Cormorant_Garamond'] text-[#C9A84C]/30 text-4xl font-light">0{i + 1}</span>
                <div className="w-12 h-px bg-[#C9A84C]/20 group-hover:bg-[#C9A84C]/60 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 relative overflow-hidden">
        <div
          className="absolute right-0 top-0 w-1/2 h-full opacity-5"
          style={{ backgroundImage: `url(${watches[2].image})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-r from-[#0A0806] to-transparent" />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="section-label mb-4">Наша история</p>
              <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl font-light text-[#E8DCC8] mb-8 leading-tight">
                О бренде
                <span className="block italic text-[#C9A84C]">Luxuruss</span>
              </h2>
              <div className="h-px w-14 bg-gradient-to-r from-[#C9A84C] to-transparent mb-10" />
              <p className="text-[#8A7A64] leading-[2] mb-6 text-sm" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Каждые часы LUXURUSS рождаются в руках мастера. Мы создаём исключительные механизмы,
                которые становятся наследием — передаются из поколения в поколение.
              </p>
              <p className="text-[#8A7A64] leading-[2] mb-10 text-sm" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Используем только драгоценные металлы высшей пробы, сапфировые кристаллы и отборные
                материалы от лучших поставщиков мира. Каждая деталь — отражение нашей философии:
                совершенство в каждой секунде.
              </p>

              <div className="grid grid-cols-3 gap-6">
                {[
                  { num: "12", label: "лет мастерства" },
                  { num: "847", label: "созданных часов" },
                  { num: "100%", label: "ручная работа" },
                ].map((stat) => (
                  <div key={stat.label} className="border-l border-[#C9A84C]/30 pl-4">
                    <div className="font-['Cormorant_Garamond'] text-3xl text-[#C9A84C]">{stat.num}</div>
                    <div className="text-[#8A7A64] text-[0.65rem] leading-tight mt-1 tracking-widest uppercase" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {[
                { icon: "Gem", title: "Премиальные материалы", text: "18-каратное золото, платина, сапфировые кристаллы и натуральная кожа." },
                { icon: "Settings2", title: "Швейцарские механизмы", text: "Каждый механизм сертифицирован и проходит 200 часов испытаний." },
                { icon: "Shield", title: "Гарантия 10 лет", text: "Мы уверены в качестве и даём пожизненное сервисное обслуживание." },
                { icon: "Star", title: "Именная гравировка", text: "Персонализируем каждое изделие по желанию клиента." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-6 p-6 border border-[#C9A84C]/10 hover:border-[#C9A84C]/30 transition-colors group"
                  style={{ cursor: "none" }}
                >
                  <div className="flex-shrink-0 w-10 h-10 border border-[#C9A84C]/30 flex items-center justify-center group-hover:border-[#C9A84C] transition-colors">
                    <Icon name={item.icon} fallback="Star" size={16} className="text-[#C9A84C]" />
                  </div>
                  <div>
                    <h4 className="font-['Cormorant_Garamond'] text-lg text-[#E8DCC8] mb-1">{item.title}</h4>
                    <p className="text-[#8A7A64] text-xs leading-relaxed" style={{ fontFamily: "Montserrat" }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-24 px-8 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-[#C9A84C]/8 font-['Cormorant_Garamond'] text-[120px] leading-none select-none absolute -top-8 left-1/2 -translate-x-1/2 pointer-events-none">
            "
          </div>
          <p className="font-['Cormorant_Garamond'] italic text-3xl md:text-4xl text-[#B8A88A] leading-relaxed relative z-10">
            Время не ждёт никого — но в наших часах оно обретает красоту
          </p>
          <div className="gold-divider mt-8" />
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-32 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-label mb-4">Связаться с нами</p>
          <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl font-light text-[#E8DCC8] mb-6">
            Контакты
          </h2>
          <div className="gold-divider mb-16" />

          <p className="text-[#8A7A64] text-sm leading-[2] mb-16 max-w-xl mx-auto" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Запишитесь на персональную презентацию коллекции или закажите индивидуальные часы.
            Мы создадим что-то уникальное специально для вас.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 mb-16">
            {[
              { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
              { icon: "Mail", label: "E-mail", value: "hello@chronos.ru" },
              { icon: "MapPin", label: "Шоурум", value: "Москва, Тверская 1" },
            ].map((contact) => (
              <div
                key={contact.label}
                className="flex flex-col items-center gap-4 p-10 border border-[#C9A84C]/10 hover:border-[#C9A84C]/30 transition-colors"
              >
                <div className="w-12 h-12 border border-[#C9A84C]/30 flex items-center justify-center">
                  <Icon name={contact.icon} fallback="Phone" size={18} className="text-[#C9A84C]" />
                </div>
                <p className="section-label text-[0.55rem]">{contact.label}</p>
                <p className="font-['Cormorant_Garamond'] text-lg text-[#E8DCC8]">{contact.value}</p>
              </div>
            ))}
          </div>

          <button className="btn-gold">
            <span>Записаться на презентацию</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#C9A84C]/10 py-10 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-['Cormorant_Garamond'] text-lg tracking-[0.3em] text-[#C9A84C]/60">LUXURUSS</span>
          <p className="text-[#8A7A64]/50 text-[0.6rem] tracking-widest uppercase" style={{ fontFamily: "Montserrat, sans-serif" }}>
            © 2024 Luxuruss. Все права защищены.
          </p>
          <div className="flex items-center gap-6">
            <button className="nav-link" style={{ cursor: "none" }}>Инстаграм</button>
            <button className="nav-link" style={{ cursor: "none" }}>Телеграм</button>
          </div>
        </div>
      </footer>
    </div>
  );
}