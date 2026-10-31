'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initSite } from '../lib/site';

export default function SiteScripts() {
  useEffect(() => {
    const cleanup = initSite(gsap, ScrollTrigger);
    return cleanup;
  }, []);
  return null;
}
