# 🕰️ Resonance

**Resonance** is a collaborative timezone coordination tool that helps distributed teams across different time zones find optimal times to work together. Visualize working hours, find overlap windows, and coordinate seamlessly across the seven seas.

## ✨ Features

- **Multi-Timezone Tracking** - Add cities to see real-time or custom-time views across multiple locations
- **Resonance Slots** - Automatically find continuous 24-hour windows where all team members are available simultaneously
- **24-Hour Visual Timeline** - Interactive and colorful timeline showing working hours (green), free time (yellow), and sleep hours (red)
- **Customizable Schedules** - Configure working hours and sleep times to match your team's schedule

### Screenshots
![Resonance Screenshot](./screenshots/app-overview.png)

## Getting Started

### Installation
```bash
bun install
```

### Development
Start a development server with hot module reloading:
```bash
bun dev
```

### Production
Build and run for production:
```bash
bun run build
bun start
```

## Tech Stack

- **Runtime:** Bun + TypeScript
- **Framework:** React 19
- **Styling:** Tailwind CSS 4
- **State Management:** Zustand
- **Date/Time:** date-fns + date-fns-tz
- **Icons:** react-icons

