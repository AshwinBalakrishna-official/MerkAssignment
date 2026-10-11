/** Simulates network latency of a real API. Disabled under test (MOCK_API_LATENCY_MS=0). */
export function simulateLatency(): Promise<void> {
  const ms = Number(process.env.MOCK_API_LATENCY_MS ?? 150);
  return ms > 0 ? new Promise((r) => setTimeout(r, ms)) : Promise.resolve();
}
