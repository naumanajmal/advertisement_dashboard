# Advertising Dashboard MVP

## Overview

This project is a Minimum Viable Product (MVP) for an advertising campaign management dashboard. It provides advertisers with tools to create, manage, and analyze advertising campaigns with AI-powered features.

## Features

### User Authentication
- Secure login system
- Session management
- Protected routes for authenticated users

### Campaign Management
- Create new advertising campaigns
- Upload banner images for campaigns
- Target specific audiences based on demographics (age, location, interests)
- View and manage existing campaigns
- Campaign approval workflow (approve/reject campaigns)

### AI-Powered Features
- AI-generated ad copy based on campaign details using OpenAI API
- Customized headlines, ad copy text, and taglines
- Option to regenerate AI content if needed

### Analytics
- Visual campaign performance metrics
- Key performance indicators (impressions, clicks, conversions)
- ROI calculation and visualization
- Time-series data for trend analysis

## Technology Stack

### Frontend
- React 19
- React Router v7
- Tailwind CSS v4 for styling
- Chart.js and react-chartjs-2 for data visualization

### APIs
- OpenAI API for AI-generated ad copy

### Development Tools
- Vite for fast development and building
- ESLint for code quality

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd advertisement_dashboard
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the project root with your OpenAI API key
```
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the development server
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

### Login
- Use any email and password combination (this is a demo)

### Dashboard
- View all your campaigns
- See campaign status (Pending, Approved, Rejected)
- Manage campaign approvals
- View analytics for each campaign

### Creating a Campaign
1. Click "Create Campaign" on the dashboard
2. Fill in campaign details (name, target audience, etc.)
3. Upload a banner image
4. Generate AI ad copy based on your campaign details
5. Submit the campaign for approval

## How I Built It

I built this project using a mix of experience and smart tools to move fast without cutting corners. I've been building apps for over 5 years, so I've got a solid understanding of how things work behind the scenes—like how frontends talk to backends, how to structure code cleanly, and how to keep things running smoothly.

To speed things up, I used AI coding tools like Windsurf and ChatGPT. These helped me:

- Quickly write out components and boilerplate code
- Come up with ideas for features
- Fix issues on the go
- Generate ad copy content with AI

Even though I built it fast—in just 2 hours—I made sure the core of the project is strong and well-structured. Everything from user login to campaign creation and analytics is built in a way that's easy to understand and improve later.

Using AI didn't mean I skipped understanding things—it just helped me go faster while still keeping full control over the code and design.
