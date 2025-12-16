# Warehouse Management App

This is a mobile warehouse management application built with React Native. The app allows users to register, store, and track products in a warehouse using QR and barcode scanning. It utilizes Firebase for data management and provides a user-friendly interface for managing inventory.

## Features

- **User Authentication**: Users can register and log in to the application.
- **Product Registration**: Add new products by scanning QR or barcodes.
- **Inventory Management**: View a list of all products in the warehouse.
- **Product Deletion**: Remove products from the inventory by scanning their QR or barcodes.
- **Product Tracking**: Track when products leave the warehouse and maintain a record of outgoing items.
- **Responsive Design**: The app is designed with user experience in mind, following best practices for mobile design.

## Technologies Used

- **React Native**: For building the mobile application.
- **Firebase**: For authentication and database management.
- **QR/Barcode Scanning**: For product registration and deletion.
- **TypeScript**: For type safety and better development experience.

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd warehouse-management-app
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Set up Firebase:
   - Create a Firebase project and configure authentication and Firestore.
   - Update the `firebase.ts` file with your Firebase configuration.

5. Run the application:
   ```
   npm start
   ```

6. Use a mobile device or emulator to scan QR codes and manage inventory.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.