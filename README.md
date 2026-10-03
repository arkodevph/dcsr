# DCSR website

A React and Vite landing page for DCSR Aircon & Refrigeration Repair Services.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. Run `npm run build` and then `npm start` to serve the production build and inquiry API. The server uses `PORT` when supplied by the host.

## Hero video

The supplied Google Flow clip is installed at `public/assets/hero-aircon-loop.mp4`. The hero uses its first frame as a still while loading and when reduced motion is requested. Its headline and buttons remain live HTML over the video, so they stay sharp, accessible, and clickable.

The video is muted and loops automatically. To use a different clip, replace the MP4 or set `VITE_HERO_VIDEO_URL` in `.env.local` to its public URL.
The AUX mark is placed over the static outdoor unit by the `.hero-unit-logo` SVG in `src/App.jsx`; update its coordinates if the hero clip changes.

## Service inquiries and attachments

The Inquire section has a three-step request form: customer and service details, a preferred date and time, then a confirmation review. Visitors can attach up to four images or documents (JPG, PNG, WebP, GIF, HEIC, HEIF, AVIF, PDF, DOC, DOCX, or TXT), with a 4 MB combined limit. The form and attachments are sent together to DCSR; the preferred schedule is only a request. The combined limit keeps multipart requests under Vercel Functions' 4.5 MB request limit.

Copy `.env.example` to `.env.local` and set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, and `SMTP_FROM` for DCSR's SMTP account. Set `INQUIRY_TO` to the inbox that should receive requests. `SMTP_FROM` must be an address the SMTP account is allowed to send from. These variables are read only by the server; never prefix SMTP secrets with `VITE_`. Restart the server after changing them. Without SMTP settings, the API returns an unavailable message and the form does not claim the request was sent.

On Vercel, `api/inquiries.js` handles the same form as a Node.js Function. Add the SMTP variables in the Vercel project's Production environment and redeploy before accepting online inquiries. The Vite build serves the site from `dist`.

If `VITE_CAL_LINK` is set to a public Cal.com event path, the inline calendar appears below the request form as another way to arrange a discussion. Calendar bookings do not send the form's attachments.

## Content and design sources

- Business name, logo, and tagline: https://www.facebook.com/zzzbhbp30
- Services, owner, founding year, phone, email, and Capas address: DCSR business flyer supplied in the conversation on 30 September 2026.
- Brands shown below the hero: DCSR brand strip supplied in the conversation on 30 September 2026. Local logo artwork and its sources are listed in [docs/brand-logo-sources.md](docs/brand-logo-sources.md).
- AUX wordmark on the visible aircon units: logo supplied on 3 October 2026. The service illustrations and room photos are illustrative images with the AUX mark added; the hero places the mark over the unit in both the still and video.
- Facebook destination: https://www.facebook.com/zzzbhbp30
- Initial landing page reference: https://dribbble.com/shots/26753792-AC-Repair-Landing-Page-Design
- Service section layout and saturated blue palette: https://dribbble.com/shots/26865291-AirServe-HVAC-Repair-Website-Design
- Deep navy, pale blue, and white section rhythm: https://dribbble.com/shots/27270697-HVAC-Website-Design-CoolFix
- Hero layout: the two images supplied in the conversation
- Preloader motion references: [ideative's blue wave](https://dribbble.com/shots/4321884-Preloader-animation), [ExtraHut's blue and white brand intro](https://dribbble.com/shots/5408341-ExtraHut-website-preloader), and [Uniko's minimal site transition](https://dribbble.com/shots/24954294-Architectural-Website-Design-Preloader-Menu). DCSR uses its own fan mark and a circular reveal from the fan into the aircon hero.
- Illustrative room photo: https://www.pexels.com/photo/a-minimalistic-white-room-7587368/
- About section photo: technician image supplied in the conversation.

The About and room photos illustrate the service; they are not presented as DCSR jobs.

## Before publication

- Confirm the supplied customer recommendation excerpts and names against the original Facebook posts before publication; the site links to DCSR's reviews page as their source.
- Confirm service coverage and hours with DCSR before adding them.
- Check that the Facebook links open the intended DCSR page from the target browser and location.
