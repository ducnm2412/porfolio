"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

/* Mỗi phần = 1 ảnh + 1 khối chữ. Thêm/bớt phần tuỳ ý (màu có sẵn cho 7 phần). */
const slides = [
  {
    nav: "Kaito Dog",
    symbols: ["♣", "♦", "♠", "♥"],
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
    symbols: ["★", "✦", "✸"],
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
    symbols: ["♪", "♫", "♬"],
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
    symbols: ["</>", "{ }", ";", "#"],
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
    symbols: ["♥", "✦", "✿"],
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
    symbols: ["!", "?", "!!"],
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
    symbols: ["🍉", "♥", "🍉"],
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

// Biểu tượng trôi lơ lửng trên nền màu: [trái %, trên %, cỡ px, chu kỳ s, trễ s]
const FLOATIES = [
  [8, 14, 28, 7, 0],
  [30, 6, 18, 9, 1.2],
  [62, 10, 34, 8, 0.4],
  [88, 22, 20, 10, 2],
  [14, 44, 16, 9, 1.6],
  [92, 52, 30, 7, 0.8],
  [6, 78, 24, 8, 2.4],
  [34, 90, 18, 10, 0.2],
  [66, 86, 30, 9, 1.4],
  [84, 74, 16, 7, 3],
];

type Spark = {
  id: number;
  char: string;
  dx: number;
  dy: number;
  rot: number;
  size: number;
};

// Tách tên thành từng chữ cái để mỗi chữ rơi xuống và nảy lên lệch nhịp nhau
function BouncyTitle({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <h2 aria-label={text}>
      {words.map((word, w) => {
        const start = words.slice(0, w).join("").length;
        return (
          <span key={w} aria-hidden>
            {w > 0 && " "}
            <span className="hero-word">
              {[...word].map((char, k) => (
                <span key={k} style={{ "--c": start + k } as CSSProperties}>
                  {char}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </h2>
  );
}

export default function Hero() {
  const [active, setActive] = useState(0);
  // Trong lúc hiệu ứng mở trang còn chạy, chữ tiêu đề chờ khối chữ hiện ra rồi mới nảy
  const [booted, setBooted] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<HTMLDivElement>(null);
  const bobRef = useRef<HTMLButtonElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mainRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const sparkId = useRef(0);

  const go = (i: number) => {
    const height = stageRef.current?.offsetHeight || window.innerHeight;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: clamp(i, 0, N - 1) * height,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  // Chọc vào ảnh chính: ảnh giật mình rung lên và bắn ra một chùm biểu tượng của phần đang xem
  const poke = () => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    bobRef.current?.animate(
      [
        { scale: 1, rotate: "0deg" },
        { scale: 0.9, rotate: "-9deg" },
        { scale: 1.08, rotate: "8deg" },
        { scale: 0.98, rotate: "-4deg" },
        { scale: 1, rotate: "0deg" },
      ],
      { duration: 520, easing: "ease-out" },
    );
    const symbols = slides[active].symbols;
    const reach = (wheelRef.current?.offsetWidth || 300) * 0.5;
    const batch = Array.from({ length: 12 }, (_, k) => {
      const angle = (k / 12) * Math.PI * 2 + Math.random() * 0.5;
      const distance = reach * (1.05 + Math.random() * 0.55);
      return {
        id: ++sparkId.current,
        char: symbols[k % symbols.length],
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        rot: Math.random() * 360 - 180,
        size: 18 + Math.random() * 20,
      };
    });
    const ids = new Set(batch.map((spark) => spark.id));
    setSparks((current) => [...current, ...batch]);
    setTimeout(
      () => setSparks((current) => current.filter((s) => !ids.has(s.id))),
      950,
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => setBooted(true), 3300);
    return () => clearTimeout(timer);
  }, []);

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

    // Ảnh chính nghiêng theo con trỏ chuột: --px, --py chạy từ -1 tới 1 tính từ tâm bánh xe
    const tilt = (event: PointerEvent) => {
      if (reduce || event.pointerType !== "mouse") return;
      const box = wheel.getBoundingClientRect();
      const px = (event.clientX - (box.left + box.width / 2)) / (stage.offsetWidth / 2);
      const py = (event.clientY - (box.top + box.height / 2)) / (stage.offsetHeight / 2);
      wheel.style.setProperty("--px", clamp(px, -1, 1).toFixed(3));
      wheel.style.setProperty("--py", clamp(py, -1, 1).toFixed(3));
    };
    const untilt = () => {
      wheel.style.setProperty("--px", "0");
      wheel.style.setProperty("--py", "0");
    };

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", measure);
    stage.addEventListener("pointermove", tilt);
    stage.addEventListener("pointerleave", untilt);
    measure();
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", measure);
      stage.removeEventListener("pointermove", tilt);
      stage.removeEventListener("pointerleave", untilt);
      cancelAnimationFrame(raf);
    };
  }, []);

  const last = active === N - 1;
  const symbols = slides[active].symbols;

  return (
    <main className="hero-track" style={{ "--n": N } as CSSProperties}>
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className="hero-snap"
          style={{ top: `calc(${i} * 100dvh)` }}
        />
      ))}

      <div
        ref={stageRef}
        className={`hero-stage ${booted ? "" : "is-booting"}`}
        data-slide={active % 7}
      >
        <div className="hero-tint" />

        <div className="hero-floaties" aria-hidden>
          {FLOATIES.map(([left, top, size, duration, delay], k) => (
            <span
              key={`${active}-${k}`}
              style={
                {
                  left: `${left}%`,
                  top: `${top}%`,
                  fontSize: size,
                  "--dur": `${duration}s`,
                  "--delay": `${delay}s`,
                } as CSSProperties
              }
            >
              {symbols[k % symbols.length]}
            </span>
          ))}
        </div>

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
              <BouncyTitle text={slide.title} />
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
                <span className="hero-thumb-face">
                  <Image
                    src={slide.src}
                    alt=""
                    fill
                    sizes="120px"
                    className="object-cover"
                    style={{ objectPosition: slide.position }}
                  />
                </span>
              </button>
            ))}
          </div>
          <div className="hero-mains">
            <button
              ref={bobRef}
              type="button"
              className="hero-bob"
              aria-label={`Chọc ${slides[active].nav}`}
              onClick={poke}
            >
              {slides.map((slide, i) => (
                <span
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
                </span>
              ))}
            </button>
          </div>
          <div className="hero-burst" aria-hidden>
            {sparks.map((spark) => (
              <span
                key={spark.id}
                style={
                  {
                    fontSize: spark.size,
                    "--dx": `${spark.dx.toFixed(0)}px`,
                    "--dy": `${spark.dy.toFixed(0)}px`,
                    "--rot": `${spark.rot.toFixed(0)}deg`,
                  } as CSSProperties
                }
              >
                {spark.char}
              </span>
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
