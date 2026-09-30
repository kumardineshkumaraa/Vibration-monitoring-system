# Vibration Monitoring System — UI Demo

A React + Vite dashboard for **Accelerometer-Based Vibration Characterization**.

## Scope

This version is **frontend only** and uses dummy/simulated accelerometer data.

It does NOT include:
- STM32 firmware
- SPI/I2C communication
- USB/COM-port communication
- Python backend
- WebSocket/API
- Database
- Machine learning

## Features

- X, Y, Z acceleration live cards
- Vibration magnitude
- Real-time simulated time-domain waveform
- Simulated FFT/frequency spectrum
- RMS
- Peak
- Peak-to-Peak
- Crest Factor
- Dominant Frequency
- Start / Stop / Reset
- Record toggle
- CSV export of simulated samples
- Demo/status panel
- Responsive engineering-style UI

## Run

Install Node.js first, then open a terminal in this folder:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, normally:

```text
http://localhost:5173/
```

**Do not double-click `index.html`.**

## Data flow

```text
Dummy Data Generator
        ↓
React State
        ↓
Dashboard Components
        ↓
Charts + Metrics
```

Later, the dummy generator can be replaced by the real STM32/host data pipeline without redesigning the dashboard UI.