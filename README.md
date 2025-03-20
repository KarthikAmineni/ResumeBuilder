# **Resume Optimizer**  

## **Overview**  
Resume Optimizer is a web application that helps users generate AI-enhanced resumes tailored to specific job descriptions. Users can upload resumes, provide job descriptions, and receive optimized resumes with editing and chat-based modification features. The final resume can be downloaded or saved in the database for future use.  

## **Features**  
✅ **Resume Upload**: Upload resumes from Google Drive, local storage, or use a saved resume.  
✅ **Job Description Input**: Provide the job description for AI-powered resume customization.  
✅ **AI-Optimized Resume**: Generate a tailored resume using an AI API.  
✅ **Chat-Based Modifications**: Users can chat with AI to refine their resume.  
✅ **On-Screen Editing**: Directly edit the generated resume before finalizing.  
✅ **Download & Save**: Download the optimized resume or save it in the database with a custom name.  

## **Technology Stack**  
- **Frontend**: Angular 16 (Standalone, RxJS, Interceptors)  
- **Backend**: Node.js, Express  
- **Database**: MongoDB  
- **Other**: OpenAI API, Google Drive API, WebSockets for real-time chat  

## **Installation**  
1. **Clone the repository**  
   ```sh
   git clone https://github.com/your-repo/resume-optimizer.git
   cd resume-optimizer
   ```  
2. **Install dependencies**  
   ```sh
   npm install  
   ```  
3. **Setup environment variables** (`.env` file)  
   ```
   MONGO_URI=your_mongodb_uri
   OPENAI_API_KEY=your_openai_key
   JWT_SECRET=your_secret_key
   ```  
4. **Run the application**  
   ```sh
   npm start  
   ```  

## **API Endpoints**  
- **POST /upload** → Upload resume  
- **POST /generate** → Generate AI-enhanced resume  
- **POST /modify** → Modify resume via chat  
- **GET /resume/:id** → Fetch saved resume  

## **Contributors**  
Developed by **Karthik**  
