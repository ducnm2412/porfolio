"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

/* Mỗi phần = 1 ảnh + 1 khối chữ. Thêm/bớt phần tuỳ ý (màu có sẵn cho 7 phần). */
const slides = [
  {
    nav: "Kaito Dog",
    title: "Kaito Dog",
    desc: "“Siêu trộm là một nghệ sĩ, đánh cắp con mồi bằng sự hoa mỹ. Còn thám tử chỉ là nhà phê bình, lần theo dấu chân chúng tôi mà bới móc.” — Kaito Kid",
    stats: [
      ["Mật danh", "1412"],
      ["Giờ ra tay", "Đêm trăng"],
      ["Đạo cụ", "Dao bấm"],
      ["Thư báo trước", "Luôn có"],
    ],
    cta: "Gặp Boss Dog",
    card: {
      label: "Thư báo trước",
      message: "Hẹn gặp bạn dưới ánh trăng đêm nay.",
      name: "Kaito Dog",
      mark: "♣ 1412",
    },
    src: "/kaitodog.jpeg",
    alt: "Kaito Dog — chú chó Shiba đội mũ trùm đen, tay cầm dao",
    position: "50% 20%",
  },
  {
    nav: "Boss Dog",
    title: "Boss Dog",
    desc: "Tao không ngán ai. Sống đơn giản thôi, phần ồn ào đã có khẩu súng lo.",
    stats: [
      ["Độ ngầu", "10/10"],
      ["Kính râm", "Luôn đeo"],
      ["Hoả lực", "Tối đa"],
      ["Ngán ai", "0"],
    ],
    cta: "Gặp Chill Dog",
    card: {
      label: "Cảnh báo",
      message: "Đứng xa ra một chút, nòng súng đang nóng.",
      name: "Boss Dog",
      mark: "♠ 0007",
    },
    src: "/meme-cho-cam-sung.webp",
    alt: "Chó Shiba đeo kính râm, ôm súng máy giữa chiến trường",
    position: "10% 50%",
  },
  {
    nav: "Chill Dog",
    title: "Chill Dog",
    desc: "Ngoài kia cứ mưa, trong này đã có nhạc. Đeo tai nghe lên, thế giới tự khắc nhỏ lại.",
    stats: [
      ["Thể loại", "Lo-fi"],
      ["Thời tiết", "Mưa"],
      ["Âm lượng", "Vừa đủ"],
      ["Làm phiền", "Xin đừng"],
    ],
    cta: "Gặp Dev Dog",
    card: {
      label: "Đang phát",
      message: "Một bản lo-fi cho buổi chiều mưa.",
      name: "Chill Dog",
      mark: "♪ 03:14",
    },
    src: "/chilldog.webp",
    alt: "Chó Shiba đeo tai nghe, nhắm mắt bên cửa sổ ngày mưa",
    position: "50% 35%",
  },
  {
    nav: "Dev Dog",
    title: "Dev Dog",
    desc: "Code chạy rồi thì đừng đụng vào. Còn nếu chưa chạy, thử tắt đi bật lại xem sao.",
    stats: [
      ["Cà phê", "3 ly/ngày"],
      ["Bug", "Đang tìm"],
      ["Commit", "Trước khi ngủ"],
      ["Trực tuyến", "24/7"],
    ],
    cta: "Gặp Selfie Dog",
    card: {
      label: "Ghi chú",
      message: "Nhớ commit trước khi đi ngủ.",
      name: "Dev Dog",
      mark: "♦ 0404",
    },
    src: "/images.jpg",
    alt: "Chó Shiba đeo tai nghe có mic, ngồi trước màn hình máy tính",
    position: "100% 50%",
  },
  {
    nav: "Selfie Dog",
    title: "Selfie Dog",
    desc: "Tắm xong là phải có một tấm. Nháy mắt một cái, góc nào cũng là góc đẹp.",
    stats: [
      ["Góc đẹp", "Bên trái"],
      ["Ảnh mỗi ngày", "99+"],
      ["Filter", "Không cần"],
      ["Khăn tắm", "Luôn đội"],
    ],
    cta: "Gặp Panic Dog",
    card: {
      label: "Đã đăng",
      message: "Tắm xong rồi, xinh chưa nè?",
      name: "Selfie Dog",
      mark: "♥ 9.9k",
    },
    src: "/anh_meme_cho_bua_hai_huoc_19_ba7d7077f2.jpg",
    alt: "Chó Shiba đội khăn tắm, nháy mắt chụp ảnh tự sướng bằng điện thoại",
    position: "50% 50%",
  },
  {
    nav: "Panic Dog",
    title: "Panic Dog",
    desc: "Deadline là ngày mai mà cứ tưởng tuần sau. Hít một hơi thật sâu rồi hoảng tiếp.",
    stats: [
      ["Nhịp tim", "180"],
      ["Deadline", "Ngày mai"],
      ["Bình tĩnh", "0/10"],
      ["Tiếng hét", "Đang bật"],
    ],
    cta: "Gặp Foodie Dog",
    card: {
      label: "Khẩn cấp",
      message: "Ai đó cứu tôi với!",
      name: "Panic Dog",
      mark: "⚠ 113",
    },
    src: "/hinh-anh-meme-chu-cho-voi-doi-mat-mo-to-the-hien-su-so-hai-622_1781589454.webp",
    alt: "Chú chó nhỏ mắt mở to, hai chân ôm mặt hoảng sợ",
    position: "50% 0%",
  },
  {
    nav: "Foodie Dog",
    title: "Foodie Dog",
    desc: "Dưa hấu chia đôi, tình bạn nhân đôi. Ăn trước đã, mọi chuyện khác tính sau.",
    stats: [
      ["Món tủ", "Dưa hấu"],
      ["Bữa mỗi ngày", "5"],
      ["Chia phần", "Miễn cưỡng"],
      ["No chưa", "Chưa"],
    ],
    cta: "Về đầu trang",
    card: {
      label: "Thực đơn",
      message: "Hôm nay có dưa hấu, ai đến trước ăn trước.",
      name: "Foodie Dog",
      mark: "♥ 2 suất",
    },
    src: "/images (1).jpg",
    alt: "Hai chú chó Shiba nhe răng cùng cắn một miếng dưa hấu",
    position: "50% 50%",
  },
];

const N = slides.length;
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export default function Hero() {
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mainRefs = useRef<(HTMLDivElement | null)[]>([]);

  const go = (i: number) => {
    const height = stageRef.current?.offsetHeight || window.innerHeight;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: clamp(i, 0, N - 1) * height,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  useEffect(() => {
    const stage = stageRef.current;
    const wheel = wheelRef.current;
    const arc = arcRef.current;
    if (!stage || !wheel || !arc) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let base = 180;
    let step = 36;
    let current = 0;
    let raf = 0;

    const frame = () => {
      raf = 0;
      const height = stage.offsetHeight || window.innerHeight || 1;
      const p = clamp(window.scrollY / height, 0, N - 1);
      const a = Math.round(p);
      if (a !== current) {
        current = a;
        setActive(a);
      }
      // Ảnh nhỏ chạy trên cung lớn: tâm cung lùi ra xa để điểm sát ảnh chính vẫn cách tâm bánh xe R,
      // và bước góc thu lại để khoảng cách giữa các ảnh nhỏ giữ nguyên
      const R = wheel.offsetWidth * 0.74;
      const big = arc.offsetWidth / 2 || R;
      const baseRad = (base * Math.PI) / 180;
      const cx = (R - big) * Math.cos(baseRad);
      const cy = (R - big) * Math.sin(baseRad);
      const bigStep = (step * R) / big;
      for (let i = 0; i < N; i++) {
        const d = i - p;
        const ad = Math.abs(d);
        const ang = ((base - d * bigStep) * Math.PI) / 180;
        const near = Math.max(0, 1 - ad);

        const thumb = thumbRefs.current[i];
        if (thumb) {
          const to = clamp(2.5 - ad, 0, 1);
          thumb.style.transform = `translate(-50%,-50%) translate(${(cx + big * Math.cos(ang)).toFixed(1)}px,${(cy + big * Math.sin(ang)).toFixed(1)}px) scale(${(1 + 0.18 * near).toFixed(3)})`;
          thumb.style.opacity = String(to);
          thumb.style.visibility = to ? "visible" : "hidden";
        }

        const main = mainRefs.current[i];
        if (main) {
          const mo = clamp(1 - ad * 1.5, 0, 1);
          main.style.opacity = String(mo);
          main.style.visibility = mo ? "visible" : "hidden";
          main.style.transform = `rotate(${reduce ? 0 : (d * -80).toFixed(1)}deg) scale(${(1 - Math.min(1, ad) * 0.12).toFixed(3)})`;
        }
      }
    };

    const request = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    // --base và --step đổi theo breakpoint trong globals.css
    const measure = () => {
      const cs = getComputedStyle(stage);
      base = parseFloat(cs.getPropertyValue("--base")) || 180;
      step = parseFloat(cs.getPropertyValue("--step")) || 36;
      request();
    };

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", measure);
    measure();
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(raf);
    };
  }, []);

  const last = active === N - 1;

  return (
    <main className="hero-track" style={{ "--n": N } as CSSProperties}>
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className="hero-snap"
          style={{ top: `calc(${i} * 100dvh)` }}
        />
      ))}

      <div ref={stageRef} className="hero-stage" data-slide={active % 7}>
        <div className="hero-tint" />

        <header className="hero-top">
          <h1 className="hero-logo">Kaito Dog</h1>
          <button
            type="button"
            className="hero-meet"
            onClick={() => go(N - 1)}
          >
            Gặp {slides[N - 1].nav}
          </button>
        </header>

        <div className="hero-copy">
          {slides.map((slide, i) => (
            <section
              key={slide.src}
              className={`hero-panel ${i === active ? "on" : ""}`}
              inert={i !== active}
              aria-hidden={i !== active}
            >
              <h2>{slide.title}</h2>
              <p>{slide.desc}</p>
              <dl className="hero-stats">
                {slide.stats.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <button
                type="button"
                className="hero-cta"
                onClick={() => go(i === N - 1 ? 0 : i + 1)}
              >
                {slide.cta}
              </button>
            </section>
          ))}
        </div>

        <div ref={wheelRef} className="hero-wheel">
          <div ref={arcRef} className="hero-arc" />
          <div className="hero-thumbs">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                ref={(el) => {
                  thumbRefs.current[i] = el;
                }}
                type="button"
                className="hero-thumb"
                aria-label={`Đi tới phần ${slide.nav}`}
                onClick={() => go(i)}
              >
                <Image
                  src={slide.src}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover"
                  style={{ objectPosition: slide.position }}
                />
              </button>
            ))}
          </div>
          <div className="hero-mains">
            {slides.map((slide, i) => (
              <div
                key={slide.src}
                ref={(el) => {
                  mainRefs.current[i] = el;
                }}
                className="hero-main"
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 820px) 48vw, 31vw"
                  className="object-cover"
                  style={{ objectPosition: slide.position }}
                  preload={i === 0}
                />
              </div>
            ))}
          </div>
          <div className="hero-card-wrap">
            <div key={active} className="hero-card">
              <p className="hero-card-label">{slides[active].card.label}</p>
              <p className="hero-card-message">
                {slides[active].card.message}
              </p>
              <p className="hero-card-sign">
                <span>{slides[active].card.name}</span>
                <span>{slides[active].card.mark}</span>
              </p>
            </div>
          </div>
        </div>

        <nav className="hero-chapters" aria-label="Các phần của hồ sơ">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              aria-current={i === active}
              style={{ "--i": i } as CSSProperties}
              onClick={() => go(i)}
            >
              {slide.nav}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className={`hero-next ${last ? "up" : ""}`}
          aria-label={last ? "Về đầu trang" : "Phần tiếp theo"}
          onClick={() => go(last ? 0 : active + 1)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </button>
      </div>
    </main>
  );
}
