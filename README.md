# Invierte - Land Marketplace

Invierte is a modern web platform designed to simplify the buying and selling of land. It provides an intuitive experience for exploring, listing, and managing real estate properties.

## Main Features

- **Land Exploration**: Browse through an extensive selection of available land plots.
- **Property Listing**: Users can list their land for sale.
- **Interactive Map**: View the exact location of properties.
- **Lot Management**: Divide and manage lots within a property.
- **Reservation System**: Buyers can reserve lots of interest.
- **User Authentication**: Secure registration and login for accessing advanced features.
- **Responsive Design**: Adaptable interface for various devices and screen sizes.

## Technologies Used

- **Frontend**: Next.js, React
- **Styling**: Tailwind CSS, Shadcn UI
- **Mapping**: Leaflet
- **Forms**: React Hook Form, Zod
- **Authentication**: JWT (custom implementation)
- **State Management**: React Context API

## Project Structure

The project follows a standard Next.js structure:

- `/app`: Contains the application's routes and pages.
- `/components`: Reusable React components.
- `/contexts`: React contexts for global state management.
- `/lib`: Utilities, types, and validation schemas.
- `/utils`: Helper functions and API calls.

## Setup and Running

1. Clone the repository:
   ```
   git clone https://github.com/IvanSmir/Invierte.git
   ```

2. Install dependencies:
   ```
   cd invierte-app
   npm install
   ```

3. Configure environment variables:
   Create a `.env.local` file in the project root and add the necessary variables.

4. Start the development server:
   ```
   npm run dev
   ```

5. Open `http://localhost:3000` in your browser.

## Deployment

The project is configured for deployment on Vercel. Connect your GitHub repository to Vercel for automatic deployments.

## Contributions

Contributions are welcome! Please open an issue to discuss major changes before submitting a pull request.

## License

This project is licensed under the MIT License.
