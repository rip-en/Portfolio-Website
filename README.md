# Portfolio Website - Next.js/React Version

This is a modern portfolio website built with Next.js 14, React, TypeScript, and Tailwind CSS. It features a clean, minimalist design with dark/light theme toggle, custom cursor, and smooth animations.

## Features

- ⚡ **Next.js 14** with App Router
- 🎨 **Tailwind CSS** for styling
- 🌙 **Dark/Light Theme** toggle with persistence
- 🎯 **Custom Cursor** with hover effects
- 📱 **Responsive Design** for all devices
- ✨ **Smooth Animations** with Framer Motion
- 🎭 **TypeScript** for type safety
- 🚀 **Optimized Performance**

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Footer.tsx
│   │   └── CustomCursor.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── images/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## Technologies Used

- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## Customization

### Adding New Projects
Edit the `projects` array in `app/components/Projects.tsx`:

```typescript
const projects = [
  {
    title: 'Your Project',
    description: 'Project description',
    technologies: ['React', 'Next.js'],
    link: 'https://your-project.com',
    linkText: 'View Live →'
  }
]
```

### Adding New Skills
Edit the `skills` array in `app/components/Skills.tsx`:

```typescript
const skills = [
  {
    title: 'Your Skill Category',
    technologies: ['Skill 1', 'Skill 2']
  }
]
```

### Styling
- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component-specific styles use Tailwind classes

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

## License

This project is open source and available under the [MIT License](LICENSE).