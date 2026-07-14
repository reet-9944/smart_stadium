# Smart Stadiums & Tournament Operations (Challenge 4)

## Overview
This project is a GenAI-enabled web application prototype built for the **PromptWars Hackathon**. It tackles **Challenge 4: Smart Stadiums & Tournament Operations** by demonstrating how Generative AI can optimize workflows and elevate the fan experience during the FIFA World Cup 2026.

## Chosen Vertical
**Challenge 4: Smart Stadiums & Tournament Operations**
The solution focuses on resolving real-world stadium issues such as language barriers, crowd bottlenecks, accessibility routing, and staff decision-making.

## Approach and Logic
We adopted a dual-view approach to address both sides of the stadium experience:
1. **Fan Experience (The Problem)**: Fans often face chaos navigating massive venues, finding food, and overcoming language barriers.
2. **Staff Operations (The Solution)**: Staff lack real-time predictive insights to proactively manage incidents and crowds.

The application serves as a prototype consisting of:
- **An Informational Landing Page**: Highlights specific real-world problems and GenAI solutions using a premium, immersive design.
- **A Smart Dashboard**: Simulates two critical interfaces:
  - **GenAI Fan Assistant**: A conversational AI interface that provides multilingual assistance, wayfinding, and context-aware suggestions (e.g., nearest accessible restroom or least-crowded food stand).
  - **Operational Intelligence Dashboard**: A staff command center that consumes mock real-time data to predict bottlenecks, track accessibility requests, and provide automated recommendations (e.g., deploying staff to specific sectors based on sentiment analysis).

## How the Solution Works
- The application is a Single Page Application (SPA) built with **React** and **Vite**.
- **Aesthetic & UI**: Developed with highly customized vanilla CSS to create a premium, dark-mode, glassmorphism design as requested.
- **GenAI Simulation**: The `Dashboard.jsx` component includes a mocked NLP engine that parses user inputs for keywords (e.g., "food", "spanish", "bathroom") and simulates intelligent, contextual GenAI responses. 
- **Real-Time Feed**: The staff dashboard simulates a live feed of GenAI-processed insights, turning raw stadium metrics into actionable recommendations.

## Assumptions Made
- **GenAI Integration**: For the purpose of this <10MB code prototype, the GenAI backend calls (e.g., to Gemini API) are simulated on the frontend to demonstrate UX flow without requiring complex backend setup or API key management from the evaluators.
- **Data Availability**: We assume the stadium is equipped with IoT sensors (cameras, turnstiles, weather sensors) that feed real-time data into our Operational Intelligence Dashboard.
- **Deployment**: The app is designed to run completely on the client-side to ensure maximum efficiency and minimal repository size.

## Setup & Running Locally
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the local development server.
