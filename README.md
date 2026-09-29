# DCSR website

A React and Vite landing page for DCSR Aircon & Refrigeration Repair Services.

## Run locally

```bash
npm install --legacy-peer-deps
npm run dev
```

Open the URL shown by Vite. Run `npm run build` for the production build.

## Hero video

The supplied Google Flow clip is installed at `public/assets/hero-aircon-loop.mp4`. The hero uses its first frame as a still while loading and when reduced motion is requested. Its headline and buttons remain live HTML over the video, so they stay sharp, accessible, and clickable.

The video is muted and loops automatically. To use a different clip, replace the MP4 or set `VITE_HERO_VIDEO_URL` in `.env.local` to its public URL.

## Connect the service inquiry calendar

The Inquire section is ready for a Cal.com inline calendar. Until a link is supplied, it clearly offers Messenger as the working inquiry option. The calendar is for an inquiry time; it does not promise a repair visit.

1. Create a Cal.com event type for service inquiries and set its availability and duration. In the event's booking questions, collect the service or unit type, what is happening, and the customer's city or barangay. Cal.com already collects name and email; add a phone question only if DCSR needs it for follow-up.
2. Copy `.env.example` to `.env.local` and set `VITE_CAL_LINK` to the event path, such as `yourname/service-inquiry` (without `https://cal.com/`). No API key is needed for the public embed.
3. Restart Vite. The branded inline calendar will replace the Messenger fallback in the Inquire section. An external calendar link remains available if the embed cannot load.

The website controls the section layout, typography, and surrounding colors. Cal.com's embed uses a light theme and DCSR blue (`#245cc4`); the event's booking questions and availability are managed in Cal.com. Changing every internal calendar component would require a more involved Cal.com Atoms integration.

## Content and design sources

- Business name, logo, and tagline: https://www.facebook.com/zzzbhbp30
- Messenger destination: https://m.me/zzzbhbp30
- Initial landing page reference: https://dribbble.com/shots/26753792-AC-Repair-Landing-Page-Design
- Service section layout and saturated blue palette: https://dribbble.com/shots/26865291-AirServe-HVAC-Repair-Website-Design
- Deep navy, pale blue, and white section rhythm: https://dribbble.com/shots/27270697-HVAC-Website-Design-CoolFix
- Hero layout: the two images supplied in the conversation
- Preloader motion references: [ideative's blue wave](https://dribbble.com/shots/4321884-Preloader-animation), [ExtraHut's blue and white brand intro](https://dribbble.com/shots/5408341-ExtraHut-website-preloader), and [Uniko's minimal site transition](https://dribbble.com/shots/24954294-Architectural-Website-Design-Preloader-Menu). DCSR uses its own fan mark and a circular reveal from the fan into the aircon hero.
- Illustrative room photo: https://www.pexels.com/photo/a-minimalistic-white-room-7587368/

The room photo illustrates the service; it is not presented as a DCSR job.

## Before publication

- Confirm the supplied customer recommendation excerpts and names against the original Facebook posts before publication; the site links to DCSR's reviews page as their source.
- Confirm the exact service list, area coverage, hours, and any business phone number with DCSR before adding them.
- Check that the Messenger link opens the intended DCSR conversation from the target browser and location.
