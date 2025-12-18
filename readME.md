# Evangadi Learning Platform 📚

A collaborative learning platform where students can ask questions, answer peers, and review responses to enhance their understanding through discussion and feedback.

## 🌟 Features

### 🔐 Authentication
- User registration and login system
- Persistent authentication using Zustand
- Protected routes for logged-in users

### ❓ Q&A System
- Post academic questions and challenges
- Browse existing questions by category
- Provide answers and solutions to peers
- Rich text formatting support

### ⭐ Review System
- Rate and review answers
- Highlight best responses
- Quality-based sorting

### 🎯 User Experience
- Clean, responsive design
- Intuitive navigation
- Real-time updates

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Zustand** - State management
- **Lucide React** - Icon library
- **Shadcn/ui** - UI component library

### Authentication
- Client-side state management with Zustand
- Local storage persistence
- Protected route middleware

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/evangadi-platform.git
cd evangadi-platform
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Environment Setup**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

4. **Run development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open in browser**
Navigate to `http://localhost:3000`

## 📁 Project Structure

```
evangadi-platform/
├── app/
│   ├── api/              # API routes
│   ├── (auth)/          # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/       # User dashboard
│   ├── how-it-works/    # Platform explanation
│   └── layout.tsx       # Root layout
├── components/
│   ├── ui/             # Reusable UI components
│   ├── NavBar.tsx      # Navigation component
│   └── ProtectedRoute.tsx
├── store/
│   └── useAuthStore.ts # Zustand auth store
├── public/             # Static assets
└── styles/            # Global styles
```

## 🔐 Authentication Flow

1. **Registration/Login**
   - User creates account or logs in
   - Credentials stored in Zustand store
   - Token persisted in localStorage

2. **Protected Access**
   - Authentication state checked on protected routes
   - Unauthenticated users redirected to login

3. **Logout**
   - Clears auth state from store and localStorage
   - Redirects to login page

## 🎨 UI Components

The project uses a custom UI component library with:
- Consistent design system
- Responsive components
- Accessible markup
- Dark/light mode ready

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm:640px, md:768px, lg:1024px, xl:1280px
- Touch-friendly interfaces

## 🧪 Testing

Run the test suite:
```bash
npm run test
# or
yarn test
```

## 📦 Build & Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deployment Options
- **Vercel** (Recommended)
- **Netlify**
- **AWS Amplify**
- **Docker**

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## 📄 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | API base URL | `http://localhost:3000/api` |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Code Guidelines

- Use TypeScript for type safety
- Follow the established component structure
- Write meaningful commit messages
- Update documentation when needed
- Test changes thoroughly

## 🐛 Troubleshooting

### Common Issues

1. **Authentication not persisting**
   - Clear browser localStorage
   - Check Zustand persist configuration

2. **Build errors**
   - Clear `.next` folder: `rm -rf .next`
   - Reinstall dependencies: `npm ci`

3. **Styles not loading**
   - Restart development server
   - Check Tailwind config imports

## 📞 Support

For support, please:
1. Check the [documentation](#)
2. Search existing [issues](#)
3. Create a new issue with details

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Zustand](https://zustand-demo.pmnd.rs/) for simple state management
- All contributors and testers

---

**Happy Learning!** 🎓

Built with ❤️ by the Evangadi Team