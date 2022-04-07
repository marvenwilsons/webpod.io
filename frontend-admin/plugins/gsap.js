export default async ({ app }, inject) => {
    // await import { gsap, ScrollTrigger, Draggable, MotionPathPlugin } from "gsap/all";
    const { gsap, ScrollTrigger, Draggable, MotionPathPlugin, ScrollToPlugin, Flip } = await import('gsap/all')
    gsap.registerPlugin(ScrollTrigger, Draggable, Flip, MotionPathPlugin, ScrollToPlugin)
    inject('gsap', gsap)
}