# 🚆 Angular Trains — Modern Train Booking & Reservation Portal

An enterprise-grade, high-performance Railway Reservation and Train Tracking Web Application built with **Angular 21**, **Angular SSR (Server-Side Rendering)**, **Tailwind CSS v4**, and **Angular Signals**.

Inspired by IRCTC and modern travel platforms, **Angular Trains** delivers a seamless, real-time ticket booking experience featuring dynamic train searching, live station autocomplete, multi-criteria filtering and sorting, multi-step passenger onboarding, multi-method payment checkout, and digital ticket / PNR management with printable e-tickets.

---

## 🌟 Key Features

### 🔍 1. Smart Train Search & Station Autocomplete
- **Dynamic Station Autocomplete**: Real-time debounce query fetching against `/trains/stations`.
- **Source & Destination Interchange**: One-click quick toggle button between source and destination stations.
- **Advanced Query Parameters**: Search by travel date, train classes (`1A`, `2A`, `3A`, `SL`), and train types (`Vande Bharat`, `Rajdhani`, `Shatabdi`, `Duronto`, `Superfast`, `Express`).
- **Recent Searches**: Automatically logs search history to user profile for quick re-searching.

### 🚄 2. Train Availability, Filtering & Sorting
- **Interactive Train Cards**: Real-time availability indicators, seat counts, quota fares, departure/arrival schedules, and intermediate station stoppage details.
- **Deep Filtering Sidebar**:
  - Filter by train category (Rajdhani, Shatabdi, Duronto, Express, Superfast).
  - Filter by travel classes (`1A`, `2A`, `3A`, `SL`).
  - Filter by departure time of day (**Morning**: 00:00–06:00, **Noon**: 06:00–12:00, **Evening**: 12:00–18:00, **Night**: 18:00–24:00).
- **Multi-Criteria Sorting**: Sort by Departure Time, Early Arrival, or shortest Journey Duration.

### 🎫 3. Guided Multi-Step Booking Workflow
- **State-Driven Workflow**: Backed by reactive Angular Signals via `BookingService` to ensure reliable booking state across routes.
- **Passenger Onboarding (`/booking/passenger-fare`)**:
  - Dynamic passenger addition/removal.
  - Berth preferences: *Lower*, *Middle*, *Upper*, *Side Lower*, *Side Upper*.
  - Contact information and optional travel insurance inclusion.
  - Live fare breakdown (Base Fare, Superfast charges, Reservation charges, Insurance, GST).
- **Payment & Checkout (`/booking/payment`)**:
  - Multiple payment channels: **UPI** (GPay, PhonePe, Paytm with VPA verification), **Credit/Debit Cards**, **Net Banking**, and **Wallets**.

### 🧾 4. E-Ticket & PNR Management
- **Booking History (`/booking-confirmation`)**: View all past and confirmed bookings.
- **Detailed Digital Ticket (`/booking-confirmation/:id`)**:
  - Full PNR breakdown, allocated berths, journey timeline, and passenger status (`CONFIRMED`, `RAC`, `WL`).
  - Built-in **Print Ticket** and **PDF Download** features.

### 🔐 5. Authentication & Session Security
- **Authentication**: User sign up with avatar upload, user login with JWT tokens.
- **HTTP Interceptor (`credentialsInterceptor`)**: Automatically injects `Authorization: Bearer <token>` and `withCredentials: true` on outbound API requests.
- **Granular Route Protection**:
  - `authGuard`: Redirects authenticated users away from `/login` and `/signup`.
  - `authRequireGuard`: Protects private routes (`/booking-confirmation`, `/booking/**`).
  - `bookingGuard`: Prevents navigating into booking steps unless valid train/class selections are active.

### 🎨 6. Premium Dark Cyber-Rail UI & SSR
- **Modern Theme**: Sleek dark theme (`#101522`) with glassmorphism cards (`backdrop-blur`), radial rail track patterns, and responsive mobile navigation.
- **Server-Side Rendering (SSR)**: Powered by `@angular/ssr` and Express 5 for enhanced SEO and ultra-fast initial load times.
- **Toast Notifications**: Interactive toast alerts powered by `ngx-toastr`.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | [Angular 21](https://angular.dev/) (Standalone Components, Signals, `inject()`) |
| **Server-Side Rendering** | [@angular/ssr](https://angular.dev/guide/ssr), [Express 5](https://expressjs.com/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/), `@tailwindcss/postcss`, Custom Glassmorphism CSS |
| **State Management** | Native Angular Signals (`signal`, `computed`) & Injectable Services |
| **HTTP & API** | Angular `HttpClient` with Functional Interceptors |
| **Form Handling** | Angular Template-driven (`FormsModule`) & Reactive Patterns |
| **Testing** | [Vitest](https://vitest.dev/) (`@angular/build:unit-test`), jsdom |
| **Code Formatting** | Prettier, EditorConfig |
| **Language & Runtime** | TypeScript 5.9, Node.js (tested with npm 11.x & Bun) |

---

## 📁 Project Architecture & Directory Structure

```text
Angular_Trains/
├── public/                     # Static public assets (background patterns, default avatars)
├── src/
│   ├── app/
│   │   ├── about-us/           # About Us page
│   │   ├── additional-services/# Value-added services component
│   │   ├── booking-card/       # Individual booking detail view with print/PDF action
│   │   ├── booking-confirmation/# User booking history listing
│   │   ├── booking-footer/     # Booking layout footer
│   │   ├── booking-header/     # Booking step navigation header
│   │   ├── contact/            # Support and contact page
│   │   ├── fare-summary/       # Real-time passenger fare calculation card
│   │   ├── footer/             # Application global footer
│   │   ├── footer-disclaimer/  # IRCTC / legal disclaimer banner
│   │   ├── footer-security-banner/ # Payment security and encryption badges
│   │   ├── frequently-asked-questions/ # FAQ component
│   │   ├── guard/              # Booking guard (booking flow validation)
│   │   ├── guards/             # Auth guards (authGuard, authRequireGuard)
│   │   ├── hero-section/       # Landing page hero component
│   │   ├── home/               # Homepage combining search, tickers, quick access
│   │   ├── journey-summary/    # Compact journey recap banner
│   │   ├── login/              # User login page
│   │   ├── mobile-nav/         # Mobile drawer navigation
│   │   ├── navbar/             # Top navigation bar with profile and auth controls
│   │   ├── news-ticker/        # Real-time announcements and train alerts banner
│   │   ├── passenger-fare/     # Passenger form & fare checkout page
│   │   ├── passenger-forms/    # Form components for adding/editing passengers
│   │   ├── payment/            # Payment gateway wrapper page
│   │   ├── payment-methods/    # UPI / Card / Net banking payment selector
│   │   ├── quick-access/       # Quick service shortcuts (PNR status, live train status)
│   │   ├── recent-searches/    # Saved user searches grid
│   │   ├── search-panel/       # Main train search engine with autocomplete
│   │   ├── sidebar-filters/    # Filter drawer (time, class, type, sort)
│   │   ├── signup/             # User registration page with avatar upload
│   │   ├── station-input/      # Reusable station search input with autocomplete
│   │   ├── ticket-details/     # Printable digital ticket component
│   │   ├── train-avaliability/ # Availability page coordinating filters & results
│   │   ├── train-card/         # Train card with class availability and pricing
│   │   ├── train-list/         # Train results list
│   │   ├── traininfo-banner/   # Train schedule recap in booking flow
│   │   ├── app.config.server.ts# Server-side Angular configuration
│   │   ├── app.config.ts       # Application providers, interceptors, animations
│   │   ├── app.html / app.ts   # Root container component
│   │   ├── app.routes.ts       # Client routing definitions
│   │   ├── app.routes.server.ts# SSR route rendering modes (RenderMode.Server)
│   │   ├── auth.ts             # Authentication API service
│   │   ├── booking.ts          # Reactive booking state service (Signals)
│   │   ├── http-intercepter.ts # Functional credentials & Bearer token interceptor
│   │   ├── url.ts              # API backend base URL configuration
│   │   └── user-context.ts     # User state & localStorage session management
│   ├── index.html              # Root HTML template
│   ├── main.server.ts          # Angular SSR bootstrap
│   ├── main.ts                 # Browser client bootstrap
│   ├── server.ts               # Express 5 server configuration for SSR
│   ├── styles.css              # Global styles & Tailwind CSS v4 import
│   └── types.ts                # TypeScript domain models (User, Train, Booking, etc.)
├── angular.json                # Angular CLI workspace configuration
├── package.json                # Dependencies and npm scripts
└── tsconfig.json               # TypeScript compiler configuration
```

---

## 🚦 Application Routes

| Path | Component | Guard / Access | Description |
| :--- | :--- | :--- | :--- |
| `/home` | `Home` | Public | Homepage with search panel, hero, and news |
| `/login` | `Login` | `authGuard` (Guests only) | User authentication |
| `/signup` | `Signup` | `authGuard` (Guests only) | User account registration |
| `/train-availability` | `TrainAvaliability` | Public | Search results, filtering, and sorting |
| `/booking/passenger-fare` | `PassengerFare` | `authRequireGuard`, `bookingGuard` | Passenger entry & fare breakdown |
| `/booking/payment` | `Payment` | `authRequireGuard`, `bookingGuard` | Payment options & checkout |
| `/booking-confirmation` | `BookingConfirmation`| `authRequireGuard` | User's past and confirmed bookings |
| `/booking-confirmation/:id` | `BookingCard` | `authRequireGuard` | Digital ticket view, print & PDF export |
| `/about` | `AboutUs` | Public | About the platform |
| `/faq` | `FrequentlyAskedQuestions` | Public | Frequently Asked Questions |
| `/contact` | `Contact` | Public | Support and contact details |

---

## 🔌 Backend API Integration

The application interfaces with a REST API backend configured in [`src/app/url.ts`](src/app/url.ts):

```typescript
export const baseUrl = "http://localhost:3000/api/v1";
```

### Core API Endpoints:
- **Authentication**:
  - `POST /users/signup` — Register a new user (supports `multipart/form-data` for avatar).
  - `POST /users/login` — Authenticate user and receive access token.
  - `POST /users/logout` — Revoke user session.
  - `PATCH /users/profile-image` — Update profile photo.
  - `POST /users/recent-searches` — Save recent station search queries.
- **Trains & Stations**:
  - `GET /trains/stations?query=:q` — Autocomplete station search.
  - `POST /trains/search` — Search train availability based on route and date.
- **Bookings**:
  - `GET /bookings/my-bookings` — Retrieve authenticated user's bookings.
  - `POST /bookings/create` — Confirm ticket reservation and generate PNR.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v20.x or v22.x LTS recommended
- **npm**: v10.x / v11.x (or [Bun](https://bun.sh/))
- **Backend Service**: Ensure the corresponding backend API is running on `http://localhost:3000` (or update `src/app/url.ts`).

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/HimanshuPadecha/Angular_Trains.git
cd Angular_Trains

# Install dependencies using npm
npm install

# OR using bun
bun install
```

### 2. Run the Development Server

```bash
npm start
# or
ng serve
```

Open [http://localhost:4200/](http://localhost:4200/) in your browser. The application will automatically reload if you change any of the source files.

### 3. Run with Server-Side Rendering (SSR)

```bash
npm run build
npm run serve:ssr:angular_trains
```

This compiles both the browser client bundle and Node/Express server in `dist/angular_trains/`, serving SSR pages directly.

---

## 🧪 Testing & Code Quality

### Unit Tests
The project uses the modern **Vitest** runner integrated into Angular CLI:

```bash
npm test
```

### Code Formatting
Ensure uniform code style across the codebase with Prettier:

```bash
npx prettier --write .
```

---

## 👤 Author

**Himanshu Padecha**
- GitHub: [@HimanshuPadecha](https://github.com/HimanshuPadecha)
- Email: [himanshupadecha@gmail.com](mailto:himanshupadecha@gmail.com)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
