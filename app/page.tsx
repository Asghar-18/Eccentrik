"use client";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="relative h-[100vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images.JPG"
            alt="ECCENTRIK brand hero image"
            fill
            priority
            quality={95}
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>

        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="relative z-10 mx-auto flex h-full flex-col items-center justify-end px-4 pb-16 text-center">
          <Link
            href="/zippers"
            className="text-2xl text-white font-medium relative group transition-colors"
          >
            Shop Obscure
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </Link>
        </div>
      </section>
      <section className="relative h-[100vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/Background.webp"
            alt="ECCENTRIK brand hero image"
            fill
            priority
            quality={95}
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>

        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="relative z-10 mx-auto flex h-full flex-col items-center justify-end px-4 pb-16 text-center">
          <Link
            href="/products"
            className="text-2xl text-white font-medium relative group transition-colors"
          >
            Shop Now
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </Link>
        </div>
      </section>
    </main>
  );
}
