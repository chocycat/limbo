/* Registers GSAP plugins and easings */

import gsap from 'gsap';
import { CustomEase, Flip } from 'gsap/all';

gsap.registerPlugin(CustomEase, Flip);

CustomEase.create('standard', '0.2, 0.1, 0, 1.0');
CustomEase.create('standard-accelerate', '0.3, 0, 1, 1');
CustomEase.create('standard-decelerate', '0, 0, 0, 1');
CustomEase.create('emphasized-accelerate', '0.3, 0.0, 0.8, 0.15');
CustomEase.create('emphasized-decelerate', '0.05, 0.7, 0.1, 1.0');
