import Image from "next/image";
import { BookOpen } from "lucide-react";
import { Button, Divider } from "@heroui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { menuItems } from "./Home.constants";
import Link from "next/link";

const jadwal = [
  {
    name: "pengajian akhir tahun",
  },
  {
    name: "pengajian desa",
  },
];

const banner = [
  {
    id: "1",
    title: "sadasd",
    image: "/bg.png",
  },
  {
    id: "2",
    title: "sadasd",
    image: "/profil.jpg",
  },
];

const Homes = () => {
  return (
    <div className="w-full flex flex-col relative ">
      {/* HEADER */}
      <header className="relative h-56 rounded-b-[2.5rem] overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 bg-blue-800">
          <div className="absolute inset-0 bg-[url('/bg.png')] mix-blend-multiply bg-cover bg-top bg-no-repeat"></div>
        </div>

        {/* Konten di tengah */}
        <div className="relative flex justify-start items-center gap-2 z-10 text-white pt-5 px-5">
          <Image
            src="/profil.jpg"
            alt="Profile"
            width={72}
            height={72}
            className="rounded-full"
          />
          <div>
            <p className="text-sm opacity-90">Selamat datang,</p>
            <h1 className="text-lg font-semibold leading-tight text-center">
              Samodra Wijaya Samdoria
            </h1>
          </div>
        </div>
      </header>
      {/* Kartu SIAPkerja ID */}
      <section className="mx-4 -mt-26 bg-white dark:bg-gray-900 shadow-md rounded-2xl p-4 relative z-20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="flex flex-col">
              <span className="text-sm text-black dark:text-white">Jadwal Hari Ini</span>
              <span className="font-semibold text-md">Selasa, 14 Okt</span>
            </div>
          </div>
          <Button
            variant="flat"
            color="primary"
            size="sm"
            className="font-medium"
          >
            Lihat Jadwal
          </Button>
        </div>
        <Divider className="my-2 h-px bg-gray-200 dark:bg-gray-600" />

        <div className="space-y-2">
          {jadwal.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-50 dark:bg-gray-600 rounded-xl p-2 text-sm font-medium flex items-center justify-between hover:bg-gray-100 transition"
            >
              <p className="text-gray-700 dark:text-white">{item.name}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="flex justify-center mt-4 px-4">
        <div className="relative bg-gradient-to-r from-blue-800 to-sky-600 text-white rounded-2xl px-5 py-4 flex items-center justify-between shadow-lg w-full h-30">
          <div className="w-80">
            <div className="flex items-center gap-2 text-xs opacity-90 mb-1">
              <BookOpen size={14} />
              <span>KMM Link</span>
            </div>
            <h2 className="text-sm font-semibold leading-tight">
              Mengaji bukan sekedar datang tapi juga memahami dan mengamalkan
            </h2>
          </div>
          <div className="absolute right-0 bottom-0 w-26">
            <Image
              src="/Group.png"
              alt="Qur'an Illustration"
              width={200}
              height={200}
              className="drop-shadow-lg translate-x-2"
            />
          </div>
        </div>
      </div>
      {/* MENU UTAMA */}
      <div className="mt-4 px-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl space-y-5 p-4">
          <div className="leading-tight space-y-1">
            <h1 className="text-lg font-semibold">KMM Activity</h1>
            <p className="text-[12px] text-gray-500">
              Gunakan menu ini untuk melihat aktivitas yang sedang berlangsung
              di Desa dan Daerah Anda
            </p>
          </div>

          <nav className="grid grid-cols-4 gap-2 px-4 text-center text-sm">
            {menuItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <div className="flex flex-col items-center">
                  <div
                    className={`rounded-xl w-10 h-10 flex items-center justify-center mb-1 ${item.bg}`}
                  >
                    <span className="text-lg">{item.icon}</span>
                  </div>
                  <p className="text-xs text-gray-700 font-medium">
                    {item.name}
                  </p>
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="mb-6 mt-6 px-4">
        <div className="bg-white dark:bg-gray-900 p-5 rounded-xl space-y-5">
          <h1 className="text-lg font-semibold">Pengurus KMM</h1>
          <div className="h-[50vw] sm:h-[30vw] lg:h-[20vw]">
            <Swiper
              pagination={{
                // dynamicBullets: true,
                clickable: true,
              }}
              spaceBetween={30}
              loop
              modules={[Autoplay, Pagination]}
              className="h-full w-full "
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
            >
              {banner?.map((banner) => (
                <SwiperSlide key={banner.id}>
                  <Image
                    src={banner.image}
                    alt={`${banner.title}`}
                    className="h-full w-full rounded-none lg:rounded-2xl object-cover"
                    width={1920}
                    height={800}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homes;
