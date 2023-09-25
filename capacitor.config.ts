import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  // appId: 'io.ionic.starter',
  appId: 'studentcorner.app',
  appName: 'student-corner',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
