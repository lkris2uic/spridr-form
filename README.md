
# Spidr Form

A visually engaging Next.js app featuring a particle background and a stylish form for the Spidr Challenge.

## Features

- Animated particle background that reacts to mouse movement
- Responsive, modern UI built with Tailwind CSS
- Secure form for collecting user details and a secret 16-digit Spidr PIN
- Fun, interactive submission experience with a fancy confirmation message

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Open your browser:
   Visit [http://localhost:3000](http://localhost:3000) to see the app in action.

## Project Structure

- `src/app/components/SpidrForm.jsx` — Main animated form component
- `src/app/globals.css` — Global styles (Tailwind CSS)
- `src/app/page.tsx` — Main page entry
- `components/ui/` — Reusable UI components (Button, Card, Input)

## Customization

- Particle Animation:
  - The background canvas is interactive; connections between particles appear near your cursor.
  - Tweaked the animation logic in `SpidrForm.jsx` for different effects.
- Form:
  - Collects first name, last name, phone, email, guess, and a 16-digit Spidr PIN.
  - On submit, a fancy animated message is shown.

## Deployment

Deploy easily on [Vercel](https://vercel.com/) or any platform supporting Next.js.

## Credits

- Built with [Next.js](https://nextjs.org/)
- UI powered by [Tailwind CSS](https://tailwindcss.com/)

---

End of the Spidr Challenge! 🕸️
