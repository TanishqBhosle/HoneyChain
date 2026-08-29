import mqtt from 'mqtt';
import axios from 'axios';
import { config } from './config';

export async function startSimulator() {
  const client = mqtt.connect(config.mqttBrokerUrl);
  
  client.on('connect', () => {
    console.log('Connected to MQTT Broker:', config.mqttBrokerUrl);
    
    setInterval(() => {
      for (let i = 1; i <= 12; i++) {
        const hiveId = `hive_${i}`;
        
        let temp = 34 + Math.random() * 2;
        let hum = 60 + Math.random() * 5;
        let weight = 20 + Math.random();

        if (i === 7) { temp = 37 + Math.random() * 2; }
        if (i === 11) { temp = 39 + Math.random() * 3; hum = 75 + Math.random() * 10; weight -= 0.05; }

        const timestamp = new Date().toISOString();

        const pTemp = { sensorId: `sens_temp_${i}`, hiveId, sensorType: 'temperature', timestamp, value: temp, unit: 'C' };
        const pHum = { sensorId: `sens_hum_${i}`, hiveId, sensorType: 'humidity', timestamp, value: hum, unit: '%' };
        const pWeight = { sensorId: `sens_w_${i}`, hiveId, sensorType: 'weight', timestamp, value: weight, unit: 'kg' };

        [pTemp, pHum, pWeight].forEach(payload => {
          const topic = `hives/${hiveId}/telemetry`;
          client.publish(topic, JSON.stringify(payload));
        });

        // HTTP Fallback
        axios.post(`${config.apiEndpoint}/sensor-data`, [pTemp, pHum, pWeight]).catch(() => {});
      }
      console.log('Published telemetry for 12 hives');
    }, config.intervalMs);
  });
}
