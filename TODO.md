# Voi Home — Edit List

- [x] 1. Add a "Map view" button to the hero section, next to the existing buttons at the bottom
- [x] 2. Properties on scroll: show them all in one row instead of one after another
- [x] 3. Homepage properties section: show 4 properties instead of 3
- [x] 4. Reduce the spacing between sections
- [x] 5. End slider: each image is labelled with a municipality and links to a blog post about that municipality
- [x] 6. Add a partner strip to the homepage
- [x] 7. Footer buttons: fix the hover state that turns black on the black background
- [x] 8. Add a Services page
- [x] 9. Create a link-in-bio (Linktree-style) page with all social links and the phone number
- [x] 10. Remove the gold tags (single property and blog pages)
- [x] 11. Modernize the admin page

## Client feedback (Nov 13): Services page

- [x] 12. Services grid with all 8 core services from the brief (Sales, Rentals, Investment Advisory, Property Management, After-Sales Support, Citizenship Assistance, Interior Design & Furnishing, Project & Sales Office Setup)
- [x] 13. Clicking a service opens its own page: title, tagline, intro, image and every sub-service from the brief
- [x] 14. Interior Design page: section on design styles ("schools" of design)
- [x] 15. Remove the photos under the services
- [x] 16. Keep the "Ask about this" button on each service

## Parked: client feedback for later

- [ ] Colour "Speak with us" burgundy (logo red). Confirm: Services page only, or also the header button?
- [ ] Olive colour (#747B65) on the "Ask about this" buttons; maybe olive accents elsewhere, as in his mock-ups
- [ ] Logo: he loves the current "Voi" logo and fonts, so keep them. His mock-ups say "Real Estate Advisory" under the logo; confirm whether he wants that wording
- [ ] Images: replace placeholder photos with his photos (he has them), including one per service. Swap them in `src/data/services/index.ts`
- [ ] Social media at the bottom of every page: more visible "Follow us" row; ask whether there is a YouTube account (shown in his mock-up)
- [ ] "Activate the WhatsApp button": find out what isn't working for him (floating button? links? hidden on property pages?)
- [ ] Municipality material (photos and blog posts) is coming from him. Blog slugs needed: sisli, uskudar, beykoz, sariyer, beyoglu, kadikoy
- [ ] Service pages: FAQ sections (recommended in his brief, but no questions were provided)
- [ ] Service pages: editable from the admin panel (the brief asks for this; currently the content lives in `src/data/services/`)
- [ ] Have the Arabic service text checked by a native speaker
- [ ] Russian: translations exist (including all services) but Russian isn't switched on in the site's language settings
