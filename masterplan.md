# Masterplan for Material Order Prediction Web Application

## 1. App Overview

The Material Order Prediction System is a web-based application designed to predict door sales for a business that orders doors from Turkey for resale in Libya. The system uses historical sales data to predict future sales, enabling the company to manage lead times (typically 45 days) and ensure optimal stock levels for upcoming demand.

## 2. Target Audience

- **Initial Users**: Production Engineer and Director, who will use the app to predict sales and make inventory decisions.
- **Future Users**: The system could eventually expand to include sales managers or logistics personnel.

## 3. Core Features and Functionality

### Key Features:

#### 1. Sales Predictions:
- Predict sales for the **next week**, **next month**, and **until the end of the year** based on historical data.
- Display sales predictions as ranges (e.g., "likely to sell 100-120 units").
- Account for lead time, suggesting reorder points based on predicted sales and delivery lead times.

**Step-by-step breakdown**:
- **Step 1**: Collect historical sales data from CSV.
- **Step 2**: Analyze data using a simple moving average (for initial MVP) to predict sales.
- **Step 3**: Display predicted sales in a clean, easy-to-understand chart for various timeframes (weekly, monthly, yearly).
- **Step 4**: Allow users to download the prediction report as a PDF or CSV file for external use.

#### 2. Data Upload Functionality:
- Users can upload new sales data via a CSV file through the **data upload page**.
- The app will validate the CSV structure and provide meaningful error messages if the file doesn't meet the expected format.

**Step-by-step breakdown**:
- **Step 1**: Design a simple upload form where users can choose the CSV file.
- **Step 2**: Validate file structure and format (correct columns, no negative values, proper date formatting).
- **Step 3**: Process the file and store it in the database (Supabase).
- **Step 4**: Notify users of successful upload or errors, allowing them to retry.

#### 3. Analytics Dashboard:
- A comprehensive page that visualizes historical data and future predictions.
- Filter options to view sales trends by product type or time range.

**Step-by-step breakdown**:
- **Step 1**: Pull data from Supabase (historical and predicted).
- **Step 2**: Render data using charting libraries like **Chart.js** or **Recharts** for line charts, bar charts, and pie charts.
- **Step 3**: Implement filters for timeframe and product type.
- **Step 4**: Allow users to toggle between predicted vs. actual sales comparisons on the dashboard.

#### 4. Responsive Design:
- Ensure that the entire app is fully responsive, working seamlessly on both desktop and mobile.

**Step-by-step breakdown**:
- **Step 1**: Use Tailwind CSS with utility classes to handle different screen sizes.
- **Step 2**: Test layout, charts, and input forms on both mobile and desktop to ensure usability.
- **Step 3**: Make sure interactive elements (charts, buttons) are touch-friendly for mobile users.

#### 5. Error Handling and Data Validation:
- Validate both historical data and newly uploaded files to ensure clean, usable data.
- Graceful handling of errors with clear error messages.

**Step-by-step breakdown**:
- **Step 1**: Implement backend validation logic for uploaded CSV files.
- **Step 2**: Use frontend form validation to prevent submission of invalid files.
- **Step 3**: Log errors in the system for debugging, while ensuring smooth user experience.

#### 6. Regular Model Review:
- Regularly compare **actual sales** against **predicted sales** to track prediction accuracy.
- Display accuracy reports on the dashboard for review.

**Step-by-step breakdown**:
- **Step 1**: Store actual sales data as it's uploaded.
- **Step 2**: Compare the actual data with previous predictions.
- **Step 3**: Generate accuracy metrics (e.g., Mean Absolute Error) and provide reports to users.
- **Step 4**: Notify users if the model shows significant deviations and suggest improvements.

## 4. Tech Stack Overview

### Frontend:
- **React.js**: Core UI library for building dynamic, responsive components.
- **Tailwind CSS**: Utility-first CSS framework for building a responsive, modern interface.
- **Shadcn**: Collection of prebuilt, customizable components.
- **Lucide Icons**: Clean, lightweight icon library.
- **Chart.js** or **Recharts**: For rendering sales predictions in chart form.

### Backend:
- **Supabase**: For handling database storage (PostgreSQL) and real-time data updates.
  - **PostgreSQL**: Reliable, scalable relational database to store all sales data and predictions.
  - **Supabase Functions**: For handling custom business logic.

### Deployment:
- **Vercel** or **Netlify**: For hosting the frontend React app with continuous integration (CI) pipelines.

## 5. Detailed File Structure

```
/project-root
│
├── /public                # Static assets
│   └── /images
│
├── /src                   # All source code
│   ├── /components        # Reusable UI components
│   │   ├── Button.js
│   │   ├── Chart.js
│   │   ├── UploadForm.js
│   │   └── Navbar.js
│   │
│   ├── /pages             # Main pages
│   │   ├── LandingPage.js
│   │   ├── Dashboard.js
│   │   └── UploadPage.js
│   │
│   ├── /hooks             # Custom hooks
│   │   ├── useFetchSalesData.js
│   │   ├── useFetchPredictions.js
│   │   └── useUploadFile.js
│   │
│   ├── /services          # API services
│   │   ├── salesService.js
│   │   ├── predictionService.js
│   │   └── uploadService.js
│   │
│   ├── /utils             # Utility functions
│   │   ├── dataValidation.js
│   │   ├── errorHandling.js
│   │   └── predictionLogic.js
│   │
│   ├── /styles            # Global and component-specific styles
│   │   └── global.css
│   │
│   ├── App.js             # Main React entry point
│   └── index.js           # Main file rendering React app
│
├── tailwind.config.js     # Tailwind configuration
├── .env                   # Environment variables
├── package.json           # Project dependencies
├── README.md              # Project documentation
└── masterplan.md          # This document
```

## 6. Detailed Error Handling and Data Validation

### Error Handling:
- **Frontend**: Provide user-friendly error messages for form submissions, file uploads, and invalid inputs.
- **Backend**: Log errors for database operations and provide detailed error messages for developers.

### Data Validation:
- **On File Upload**: 
  - Ensure correct columns (`date`, `product_type`, `quantity`).
  - Check for valid dates (YYYY-MM-DD format), non-negative quantities, and no duplicate records.
- **On Data Processing**: 
  - Handle missing data by skipping or imputing values.
  - Flag outliers for review but don't immediately exclude them.

### Error Reporting:
- Log errors or discrepancies during upload or prediction process.
- Display user-friendly messages for operational errors, with detailed logs on the backend.

## 7. Detailed Core Functionalities (Step-by-Step)

### 1. Sales Predictions:
- **Step 1**: Collect and preprocess historical sales data.
- **Step 2**: Calculate sales predictions using a moving average algorithm.
- **Step 3**: Display results as ranges on the Analytics Dashboard.
- **Step 4**: Allow users to download predictions as CSV or PDF files.

### 2. Data Upload Functionality:
- **Step 1**: Design a simple CSV upload form.
- **Step 2**: Validate the uploaded file structure.
- **Step 3**: Store the data in Supabase.
- **Step 4**: Notify the user of upload status.

### 3. Analytics Dashboard:
- **Step 1**: Retrieve historical sales data and prediction data from Supabase.
- **Step 2**: Visualize sales predictions using Chart.js or Recharts.
- **Step 3**: Implement filters for data analysis.
- **Step 4**: Compare actual vs. predicted sales and generate accuracy metrics.

### 4. Responsive Design:
- **Step 1**: Build pages using Tailwind CSS for responsiveness.
- **Step 2**: Test components on both mobile and desktop.
- **Step 3**: Optimize touch interactions for mobile users.

### 5. Error Handling and Data Validation:
- **Step 1**: Implement frontend and backend validation for file uploads.
- **Step 2**: Log error details and provide meaningful error messages to users.
- **Step 3**: Use validation libraries or custom validators for user inputs and file structures.

### 6. Regular Model Review:
- **Step 1**: Compare actual sales with predicted values when new data is uploaded.
- **Step 2**: Calculate and display accuracy metrics.
- **Step 3**: Notify users of significant deviations and provide feedback for model adjustment.

## 8. Conclusion

This masterplan outlines the full architecture, tech stack, and detailed functionalities of the Material Order Prediction Web Application. The modular file structure, scalable prediction algorithms, and robust tech stack (React, Tailwind, Supabase) will allow for launching an MVP with core functionality while maintaining flexibility for future expansion.

### Next steps:
1. Set up the React app with the suggested file structure and Tailwind integration.
2. Implement core features (sales predictions, data upload, and analytics).
3. Test and validate predictions using historical data.
4. Optimize and finalize the app for a smooth, responsive experience.
5. Deploy the application using Vercel or Netlify.
6. Plan for future scalability and iterations based on user feedback.

### Future Potential:
- Implement more sophisticated data analytics and prediction models.
- Add user authentication for role-based access.
- Expand features to include inventory management and third-party integrations.

This masterplan provides a comprehensive guide to building the Material Order Prediction Web Application, outlining the project architecture, core features, technical stack, and file structure. By following this plan, you will be able to develop a robust MVP that can evolve with future enhancements.
