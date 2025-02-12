import { HardwareInfo, ServerInfo } from './lib/common/index.js';
import { BehaviorSubject, Observable, map } from 'rxjs';
import * as si from 'systeminformation';
import { inspect } from 'util';
import { CONFIG } from './config.js';
import getCpuInfo from './data/cpu.js';
import getGpuInfo from './data/gpu.js';
import getNetworkInfo from './data/network.js';
import getOsInfo from './data/os.js';
import getRamInfo from './data/ram.js';
import getStorageInfo from './data/storage/index.js';
import { get } from 'http';
import { hUptime } from './utils.js';

const STATIC_INFO = new BehaviorSubject<HardwareInfo>({
  os: {
    arch: '',
    distro: '',
    kernel: '',
    platform: '',
    release: '',
    uptime: 0,
    dash_buildhash: '',
    dash_version: '',
  },
  cpu: {
    brand: '',
    model: '',
    cores: 0,
    ecores: 0,
    pcores: 0,
    threads: 0,
    frequency: 0,
  },
  ram: {
    size: 0,
    layout: [],
  },
  storage: [],
  network: {
    interfaceSpeed: 0,
    speedDown: 0,
    speedUp: 0,
    lastSpeedTest: 0,
    type: '',
    publicIp: '',
  },
  gpu: {
    layout: [],
  },
});

const promIf = <T>(condition: boolean, func: () => Promise<T>): Promise<T> => {
  return condition ? func() : Promise.resolve(null);
};

export const loadInfo = <
  T extends 'os' | 'cpu' | 'storage' | 'ram' | 'network' | 'gpu',
  B extends boolean
>(
  info: T,
  loader: () => Promise<
    B extends true ? Partial<HardwareInfo[T]> : HardwareInfo[T]
  >,
  append: B
) => {
  return promIf(CONFIG.widget_list.includes(info), async () => {
    STATIC_INFO.next({
      ...STATIC_INFO.getValue(),
      [info]: append
        ? {
            ...STATIC_INFO.getValue()[info],
            ...(await loader()),
          }
        : await loader(),
    });
  });
};

export const loadStaticServerInfo = async (): Promise<void> => {
  await loadInfo('os', getOsInfo.static, false);
  await loadInfo('cpu', getCpuInfo.static, false);
  await loadInfo('ram', getRamInfo.static, false);
  await loadInfo('storage', getStorageInfo.static, false);
  await loadInfo('network', getNetworkInfo.static, true);
  await loadInfo('gpu', getGpuInfo.static, true);

};

export const getEndPoints = () : String [] => {
  return [
    "/endpoints",
    "/info",
    "/config",
    "/load/cpu",
    "/load/ram",
    "/load/storage",
    "/load/network", 
    "/load/gpu"
    ]
}

export const getStaticServerInfo = (): ServerInfo => {
  return {
    ...STATIC_INFO.getValue(),
    os: {
      ...STATIC_INFO.getValue().os,
      uptime: +si.time().uptime,
    },
    config: CONFIG,
  };
};

export const getStaticServerInfoObs = (): Observable<ServerInfo> => {
  return STATIC_INFO.pipe(
    map(info => ({
      ...info,
      os: {
        ...info.os,
        uptime: +si.time().uptime,
      },
      config: CONFIG,
    }))
  );
};

