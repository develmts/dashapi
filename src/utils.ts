import os from 'os';
import { join } from 'path';
import { CONFIG } from './config.js';

export const fromHost = (path: string): string => {
  const pathInDocker = path === '/' ? '/mnt/host' : join('/mnt/host', path);
  return CONFIG.running_in_docker ? pathInDocker : path;
};

export const PLATFORM_IS_WINDOWS = os.platform() === 'win32';

export function hUptime(uptime: number): string{
  const mill = (uptime - Math.floor(uptime)) * 1000
  uptime =  Math.floor(uptime)
  let ret = {
    days : Math.floor(uptime / (3600 * 24)),
    hours : Math.floor((uptime % (3600 * 24)) / 3600),
    mimutes : Math.floor((uptime % 3600) / 60),
    seconds : Math.floor(uptime % 60)
  }
  return '${ret.days} days ${ret.hours} hours ${ret.minutes} minutes ${ret.seconds} seconds ${ret.mill} ml.'

}