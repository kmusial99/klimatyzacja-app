import * as os from 'os';

export function freemem(): number {
  return os.freemem() / ( 1024 * 1024 );
}

export function totalmem(): number {
  return os.totalmem() / ( 1024 * 1024 );
}

export function freememPercentage(): number {
  return os.freemem() / os.totalmem();
}

function getCPUInfo(): { idle: number; total: number } {
  const cpus = os.cpus();

  let user = 0;
  let nice = 0;
  let sys = 0;
  let idle = 0;
  let irq = 0;
  let total = 0;

  for(const cpu in cpus) {
    if (!cpus.hasOwnProperty(cpu)) {
      continue;
    }

    user += cpus[cpu].times.user;
    nice += cpus[cpu].times.nice;
    sys += cpus[cpu].times.sys;
    irq += cpus[cpu].times.irq;
    idle += cpus[cpu].times.idle;
  }

  total = user + nice + sys + idle + irq;

  return {
    'idle': idle,
    'total': total
  };
}

export async function getCPUUsage(): Promise<number> {
  const stats1 = getCPUInfo();
  const startIdle = stats1.idle;
  const startTotal = stats1.total;

  return new Promise<number>((resolve) => {
    setTimeout(function() {
      const stats2 = getCPUInfo();
      const endIdle = stats2.idle;
      const endTotal = stats2.total;

      const idle = endIdle - startIdle;
      const total = endTotal - startTotal;
      const perc = idle / total;

      resolve(1 - perc);
    }, 1000 );
  });
}
