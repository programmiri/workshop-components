type WarpCoreStatusFirst = {
  data: string;
};

async function getWarpCoreStatusFirst(): Promise<WarpCoreStatusFirst> {
  return new Promise((resolve) =>
    setTimeout(
      () => resolve({ data: Math.random() > 0.5 ? "Stable" : "Critical" }),
      500
    )
  );
}

type ShieldStatusFirst = {
  data: string;
};

async function getShieldStatusFirst(): Promise<ShieldStatusFirst> {
  return new Promise((resolve) =>
    setTimeout(
      () => resolve({ data: Math.random() > 0.5 ? "Active" : "Inactive" }),
      500
    )
  );
}

type LifeSupportStatusFirst = {
  data: string;
};

async function getLifeSupportStatusFirst(): Promise<LifeSupportStatusFirst> {
  return new Promise((resolve) =>
    setTimeout(
      () => resolve({ data: `${Math.floor(Math.random() * 100)}% Oxygen` }),
      500
    )
  );
}

type WeaponsStatusFirst = {
  data: string;
};

async function getWeaponsStatusFirst(): Promise<WeaponsStatusFirst> {
  return new Promise((resolve) =>
    setTimeout(
      () => resolve({ data: Math.random() > 0.3 ? "Online" : "Offline" }),
      500
    )
  );
}

// WAY BETTER API

type WarpCoreStatusSecond = {
  health: "Stable" | "Critical";
};

async function getWarpCoreStatusSecond(): Promise<WarpCoreStatusSecond> {
  return new Promise((resolve) =>
    setTimeout(
      () => resolve({ health: Math.random() > 0.5 ? "Stable" : "Critical" }),
      500
    )
  );
}

type ShieldStatusSecond = {
  active: boolean;
};

async function getShieldStatusSecond(): Promise<ShieldStatusSecond> {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ active: Math.random() > 0.5 }), 500)
  );
}

type LifeSupportStatusSecond = {
  oxygenLevel: number;
};

async function getLifeSupportStatusSecond(): Promise<LifeSupportStatusSecond> {
  return new Promise((resolve) =>
    setTimeout(
      () => resolve({ oxygenLevel: Math.floor(Math.random() * 100) }),
      500
    )
  );
}

type WeaponsStatusSecond = {
  status: "Online" | "Offline";
};

async function getWeaponsStatusSecond(): Promise<WeaponsStatusSecond> {
  return new Promise((resolve) =>
    setTimeout(
      () => resolve({ status: Math.random() > 0.3 ? "Online" : "Offline" }),
      500
    )
  );
}

export type {
  WarpCoreStatusFirst,
  ShieldStatusFirst,
  LifeSupportStatusFirst,
  WeaponsStatusFirst,
  WarpCoreStatusSecond,
  ShieldStatusSecond,
  LifeSupportStatusSecond,
  WeaponsStatusSecond,
};

export {
  getWarpCoreStatusFirst,
  getShieldStatusFirst,
  getLifeSupportStatusFirst,
  getWeaponsStatusFirst,
  getWarpCoreStatusSecond,
  getShieldStatusSecond,
  getLifeSupportStatusSecond,
  getWeaponsStatusSecond,
};
