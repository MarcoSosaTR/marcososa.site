# Marco Sosa Portfolio

A modern, fast portfolio website built with **Vite** and **React**, styled with **Tailwind CSS**, and ready for deployment on **Cloudflare**.

## Features

- ⚡ **Vite** - Lightning-fast build tool and dev server
- ⚛️ **React 18** - Modern UI framework
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📱 **Responsive Design** - Mobile-friendly layout
- 🚀 **Cloudflare Ready** - Configured for easy deployment
- 🔧 **TypeScript** - Type-safe development

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will open automatically at `http://localhost:5173`

### Build

Create a production-ready build:

```bash
npm run build
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
src/
├── main.tsx          # React entry point
├── App.tsx           # Main App component
├── App.css           # App styles
├── index.css         # Global styles with Tailwind directives
```

## Deployment

### Cloudflare Pages

1. Push your repository to GitHub (or GitLab/Gitea)
2. Connect your repository to [Cloudflare Pages](https://pages.cloudflare.com)
3. Set build command: `npm run build`
4. Set publish directory: `dist`

## Future Enhancements

- Add portfolio projects section
- Add skills/experience section
- Add contact form
- Add dark/light mode toggle
- Add blog/articles section

## License

MIT

## Author

Marco Sosa
