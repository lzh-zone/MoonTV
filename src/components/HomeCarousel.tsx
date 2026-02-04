/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { PlayCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { DoubanItem } from '@/lib/types';
import { processImageUrl } from '@/lib/utils';

interface HomeCarouselProps {
  items: DoubanItem[];
}

export default function HomeCarousel({ items }: HomeCarouselProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !items || items.length === 0) return null;

  // Take top 5 items for the carousel to avoid overcrowding
  const carouselItems = items.slice(0, 8);

  return (
    <div className='w-full relative group mb-8 rounded-[32px] overflow-hidden glass-card shadow-2xl animate-fade-in border border-white/20'>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect='fade'
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className='w-full h-[400px] md:h-[500px]'
      >
        {carouselItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div className='relative w-full h-full flex items-center justify-center overflow-hidden'>
              {/* 背景：模糊处理的海报 */}
              <div className='absolute inset-0'>
                <Image
                  src={processImageUrl(item.poster)}
                  alt={item.title}
                  fill
                  className='object-cover blur-3xl opacity-50 scale-110'
                  priority
                  referrerPolicy='no-referrer'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent' />
                <div className='absolute inset-0 bg-gradient-to-r from-gray-900/80 via-transparent to-transparent' />
              </div>

              {/* 内容区域 */}
              <div className='relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-8 md:gap-12'>
                {/* 海报图片 */}
                <div className='relative shrink-0 w-40 md:w-64 aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-transform duration-700 hover:scale-105 group-hover:shadow-[0_20px_60px_rgba(139,92,246,0.3)] border border-white/10 ring-1 ring-white/20'>
                  <Image
                    src={processImageUrl(item.poster)}
                    alt={item.title}
                    fill
                    className='object-cover'
                    priority
                    referrerPolicy='no-referrer'
                  />
                  {/* 角标 */}
                  <div className='absolute top-3 right-3 flex flex-col gap-2'>
                    <div className='bg-violet-600/90 backdrop-blur-md text-white px-2 py-1 rounded-lg text-sm font-bold shadow-lg border border-white/10'>
                      {item.rate}
                    </div>
                  </div>
                </div>

                {/* 信息及操作 */}
                <div className='flex-1 text-center md:text-left text-white space-y-4 md:space-y-8 max-w-2xl'>
                  <h2 className='text-3xl md:text-6xl font-extrabold tracking-tight drop-shadow-2xl'>
                    <span className='bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-violet-200'>
                      {item.title}
                    </span>
                    <span className='ml-4 text-lg md:text-2xl font-light text-violet-200 bg-violet-500/10 px-3 py-1 rounded-xl backdrop-blur-md border border-white/10 align-middle'>
                      {item.year}
                    </span>
                  </h2>

                  <div className='flex items-center justify-center md:justify-start gap-4'>
                    <Link
                      href='/douban?type=movie' // 既然是轮播，暂时跳到详情或搜索
                      onClick={(e) => {
                        e.preventDefault();
                        // 这里最好有一个直接去播放页的逻辑，但因为是豆瓣数据，可能需要先跳搜索
                        window.location.href = `/play?title=${encodeURIComponent(
                          item.title
                        )}&year=${item.year}`;
                      }}
                    >
                      <button className='group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-violet-900 rounded-2xl font-bold text-lg transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] hover:-translate-y-1 overflow-hidden border border-white/50'>
                        <div className='absolute inset-0 bg-violet-100 translate-y-full skew-y-12 group-hover:translate-y-0 transition-transform duration-500 ease-out' />
                        <PlayCircle
                          size={28}
                          className='fill-violet-600 text-white relative z-10'
                        />
                        <span className='relative z-10'>立即观看</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
