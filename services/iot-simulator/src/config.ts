export const config = {
  mqttBrokerUrl: process.env.MQTT_URL || 'mqtt://localhost:1883',
  apiEndpoint: process.env.API_URL || 'http://localhost:3001',
  intervalMs: 10000
};
