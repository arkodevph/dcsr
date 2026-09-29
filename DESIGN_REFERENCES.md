# DCSR design direction

Reviewed September 29, 2026. This is a reference and decision log for the site, not a source of claims about DCSR.

## Visitor path

A first-time visitor should recognize a relevant service, hear from actual customers, understand what to send, and open Messenger. Cal.com can replace the Messenger inquiry panel once DCSR supplies its event link. The page keeps familiar service, review, FAQ, and contact landmarks, while the visual style carries the hero's pale sky and frosted white surfaces all the way to the footer.

## Dribbble reference set

| Reference | Visual or structural cue considered | Decision |
| --- | --- | --- |
| [Blue Flow HVAC](https://dribbble.com/shots/27702544-Blue-Flow-HVAC-Repair-Air-Conditioning-Landing-Page) | Blue cooling identity and local service context | Use as category context, without copying its layout. |
| [CoolFix by Phenomenon Studio](https://dribbble.com/shots/27270697-HVAC-Website-Design-CoolFix) | Calm HVAC presentation and direct service entry points | Keep services legible and one direct CTA destination. |
| [CoolFix by CST Digital Agency](https://dribbble.com/shots/27451705-CoolFix-Professional-Air-Conditioning-Service-Website) | Service, review, FAQ, and inquiry sequence | Keep the full lead path but use DCSR's blue and white palette. |
| [Gradient Abstract Fluid Technology](https://dribbble.com/shots/24856476-Gradient-abstract-fluid-technology-Website-landing-page) | Fluid field rather than square section blocks | Use broad, subtle airflow rings behind content. |
| [HostTempo Landing Page](https://dribbble.com/shots/20640990-HostTempo-Landing-Page) | A restrained blue hierarchy and flowing animation | Keep motion secondary to legibility. |
| [Cloud Landing Page](https://dribbble.com/shots/14373479-Cloud-Landing-Page) | Airy blue and near-white palette | Extend the hero's light atmosphere through the page. |
| [Blue Gradient Landing Page](https://dribbble.com/shots/10823661-Blue-Gradient-Landing-Page-Design) | Powder blue, cyan, and darker blue balance | Reserve saturated blue for actions and dark blue for text. |
| [Air Conditioning & Heating UI](https://dribbble.com/shots/26895245-Air-Conditioning-Heating-HVAC-Website-UI-Design) | Need for quick service recognition and CTA | Name services plainly; show Messenger within each service. |
| [Air Conditioners Website](https://dribbble.com/shots/14144724-Air-Conditioners-Website) | White space and product context | Leave room around the illustration and avoid decorative clutter. |
| [Montreval Membership Page](https://dribbble.com/shots/27440833-Montreval-Luxury-Private-Club-Membership-Website-Page-Design) | Layered editorial content | Keep customer recommendations as a tangible stack. |

The earlier condensed typography, dark rectangular sections, and service table broke the visual continuity with the video hero. The revised palette is sky `#dbeef9`, cloud white `#fafdff`, ice `#e5f5fc`, ink `#173d59`, action blue `#236b96`, and cyan accents. Outfit and Georgia continue the hero type pairing. Sections use curved airflow traces, staggered rounded service bands, glassy white quotes and reviews, and a light final inquiry area. These are adaptations of the references, not imported designs or business facts.

## Evidence ledger

| Source and task | Finding and confidence | Boundary | Design implication and falsification |
| --- | --- | --- | --- |
| [Tuch et al. (2012), two website first-impression studies](https://www.sciencedirect.com/science/article/pii/S1071581912001127); first study rated 119 real-site screenshots | Visual complexity and prototypicality affected perceived aesthetics. Moderate confidence for first impressions. | Screenshot judgments do not establish lead conversion for DCSR. | Keep recognizable headings and service-to-contact flow; concentrate visual novelty in the atmospheric surfaces. Falsified if visitors cannot locate services or contact quickly. |
| [Scheibehenne, Greifeneder & Todd (2010), meta-analysis of choice overload](https://doi.org/10.1086/651235) | A universal “fewer choices is better” rule was not supported across studied choice tasks. Moderate confidence as a corrective finding. | Product choice experiments do not directly test home-service inquiries. | Retain three distinct service options with comparable titles and CTAs. Falsified if visitors confuse repair and maintenance or repeatedly choose the wrong route. |
| [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Contrast, visible focus, operable controls, and reduced motion are implementation standards. High confidence as standards, not behavioral conversion evidence. | Conformance requires a full audit, not a screenshot check. | Keep dark text on the translucent panels, 44px-class CTAs, keyboard focus, semantic details, and reduced-motion behavior. Falsified by contrast, keyboard, or mobile operability failures. |

## Remaining assumptions

There are no DCSR-specific conversion data or Cal.com event URL yet. The review wording comes from customer-provided text; the room photograph is marked as illustrative. The current primary action opens DCSR Messenger, and the calendar panel is ready for a supplied `VITE_CAL_LINK`.
