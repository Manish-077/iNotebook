# iNotebook - Modern Note-Taking Application

A beautiful, modern note-taking application built with React.js, Node.js, and MongoDB. Capture your thoughts, ideas, and memories with an intuitive and attractive interface.

## ✨ Features

### 🎨 Modern UI/UX
- **Beautiful Design**: Clean, modern interface with smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Dark Mode Support**: Automatic dark mode detection
- **Smooth Animations**: Fade-in effects and hover animations
- **Modern Typography**: Clean, readable fonts with proper hierarchy

### 📝 Note Management
- **Create Notes**: Add notes with titles, descriptions, and tags
- **Edit Notes**: Update existing notes with a beautiful modal interface
- **Delete Notes**: Remove notes with confirmation dialogs
- **Tag System**: Organize notes with color-coded tags
- **Search & Filter**: Find notes quickly with tags

### 🔐 Security
- **User Authentication**: Secure login and signup system
- **Protected Routes**: Notes are private to each user
- **JWT Tokens**: Secure authentication with JSON Web Tokens

### 🚀 Performance
- **Fast Loading**: Optimized for quick page loads
- **Smooth Interactions**: Responsive UI with no lag
- **Efficient State Management**: React Context for state management

## 🛠️ Technology Stack

### Frontend
- **React.js**: Modern UI framework
- **CSS3**: Custom design system with CSS variables
- **Bootstrap 5**: Responsive grid system
- **Font Awesome**: Beautiful icons

### Backend
- **Node.js**: Server runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **JWT**: Authentication tokens

## 🎯 Key Improvements Made

### Visual Design
- **Modern Color Palette**: Professional color scheme with CSS variables
- **Card-based Layout**: Clean card design for notes and forms
- **Gradient Backgrounds**: Subtle gradients for visual appeal
- **Shadow System**: Consistent shadow hierarchy
- **Border Radius**: Modern rounded corners throughout

### User Experience
- **Fixed Navigation**: Sticky navbar with scroll effects
- **Loading States**: Visual feedback during operations
- **Error Handling**: Beautiful error messages and validation
- **Form Design**: Modern form inputs with icons and placeholders
- **Modal Dialogs**: Elegant edit modals with proper styling

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Flexible Grid**: Responsive card layouts
- **Touch-Friendly**: Proper touch targets and interactions
- **Adaptive Typography**: Font sizes that scale with screen size

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd inotebook
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. **Start the application**
   ```bash
   # Start backend server
   cd backend
   npm start
   
   # Start frontend (in a new terminal)
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📱 Usage

1. **Create Account**: Sign up with your email and password
2. **Add Notes**: Click "Add Note" to create your first note
3. **Organize**: Use tags to categorize your notes
4. **Edit**: Click the edit icon to modify notes
5. **Delete**: Click the trash icon to remove notes

## 🎨 Design System

### Colors
- **Primary**: `#6366f1` (Indigo)
- **Secondary**: `#f59e0b` (Amber)
- **Success**: `#10b981` (Emerald)
- **Danger**: `#ef4444` (Red)
- **Warning**: `#f59e0b` (Amber)

### Typography
- **Font Family**: Inter, system fonts
- **Font Sizes**: Responsive scale from 0.75rem to 2.25rem
- **Line Heights**: Optimized for readability

### Spacing
- **Consistent Scale**: 0.25rem to 4rem spacing system
- **Responsive**: Adapts to screen size
- **Visual Hierarchy**: Proper spacing between elements

## 🔧 Customization

The application uses CSS custom properties (variables) for easy customization:

```css
:root {
  --primary-color: #6366f1;
  --accent-color: #10b981;
  --font-family: 'Inter', sans-serif;
  /* ... more variables */
}
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Built with ❤️ using modern web technologies**
