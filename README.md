# Pexels Wallpapers App

This project is a React Native application that allows users to search and view wallpapers using the Pexels API. The app is built using functional components with TypeScript and leverages libraries such as `react-native-reanimated` for animations and `@tanstack/react-query` for data fetching.

<img src="./demo.gif" alt="Description of the GIF" height="800">

## Features

- **Search Wallpapers**: Users can search for wallpapers using a search bar.
- **Animated Transitions**: Smooth animations for list items and backdrop photos.
- **Responsive Design**: The app is designed to work on various screen sizes.

## Technologies Used

- **React Native**: For building the mobile application.
- **TypeScript**: For type safety and better code quality.
- **React Query**: For managing server state and data fetching.
- **React Native Reanimated**: For creating animations.
- **Expo**: For building and running the app.

## Setup and Installation

1. **Clone the repository**:
```bash
   git clone https://github.com/Gabi1M/pexels-wallpapers.git
   cd pexels-wallpapers   
```

2. **Install dependencies**:
```bash
   npm install
```

3. **Run the app**:
```bash
   npm start
```

4. **Open the app**:
   - Use the Expo Go app on your mobile device to scan the QR code.
   - Alternatively, you can run the app on an emulator.

## API Key

To use the Pexels API, you need an API key. Replace the `authKey` in `pexelsWallpapers.tsx` with your own Pexels API key.

```typescript
const authKey = 'your-pexels-api-key';
```

## Project Structure

- **`pexelsWallpapers.tsx`**: Main component that handles the search and display of wallpapers.
- **`photoBackdrop.tsx`**: Component for rendering the animated backdrop photo.
- **`photoItem.tsx`**: Component for rendering each photo item with animations.
- **`searchBar.tsx`**: Component for the search bar functionality.