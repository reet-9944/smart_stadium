# Smart Stadiums & Tournament Operations (FIFA 2026)

## Overview
This project is a real-time, GenAI-enabled web application prototype built for the **PromptWars Hackathon**. It directly tackles **Challenge 4: Smart Stadiums & Tournament Operations** by demonstrating how Generative AI can optimize workflows and elevate the fan experience during massive events like the FIFA World Cup 2026.

## Chosen Vertical
**Smart Stadiums & Tournament Operations**
The solution focuses on resolving real-world stadium issues:
- **Language Barriers**: Multilingual GenAI translations in real-time.
- **Crowd Management & Bottlenecks**: GenAI predictive insights to redirect fans.
- **Navigation & Food**: Context-aware routing for restrooms, seats, and concessions.
- **Operational Intelligence**: Staff dashboard for proactive decision-making.

## Approach and Logic
We adopted a dual-view approach to address both sides of the stadium ecosystem in a single cohesive platform:
1. **Fan Experience (The Problem)**: Fans often face chaos navigating massive venues, finding food, and overcoming language barriers. We built a conversational AI interface that processes natural language requests in any language and provides instant, localized answers.
2. **Staff Operations (The Solution)**: Staff lack real-time predictive insights to proactively manage incidents. We built an Operational Intelligence dashboard that surfaces actionable GenAI recommendations based on simulated IoT stadium data (e.g., predicted bottlenecks, sentiment analysis).

## How the Solution Works
- **Tech Stack**: Built as a highly responsive Single Page Application (SPA) using **React** and **Vite**.
- **Real-time GenAI Integration**: The app uses the official `@google/generative-ai` SDK. Users can input their own Gemini API Key directly into the secure UI settings panel to talk to the live `gemini-1.5-flash-latest` model.
- **Seamless Graceful Degradation**: If an API key is missing or invalid, the app seamlessly falls back to a highly polished "Demo Mode" with local keyword-routing logic, ensuring the presentation never breaks during evaluation.
- **Premium Aesthetics**: Fully responsive UI/UX utilizing custom glassmorphism, dynamic CSS animations, interactive cursor-tracking spotlights, and World Cup-themed aesthetics without relying on heavy external styling libraries.

## Any Assumptions Made
- **IoT Infrastructure**: We assume the stadium is equipped with modern IoT sensors (cameras, turnstiles, weather sensors) that would feed real-time data into the backend of our Operational Intelligence Dashboard in a production environment.
- **API Key Provisioning**: We assume evaluators possess their own Google Gemini API key to test the live GenAI capabilities. We securely request this on the client side rather than hardcoding it into the repository.

## Evaluation Criteria Alignment
- **Code Quality**: Clean, modular React component architecture.
- **Security (High Impact)**: API keys are **never** hardcoded. They are requested via a secure UI input and stored locally in the browser's `localStorage`.
- **Efficiency**: Pure CSS animations and client-side processing ensure lightweight performance (<10MB repository size).
- **Accessibility**: High-contrast text, clear iconography, and a fully responsive layout (mobile-first hamburger menus) ensure usability across all devices.

## Setup & Running Locally
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the local development server.
4. (Optional) Open the "API Settings" in the sidebar to input your Gemini API Key for live AI responses.
