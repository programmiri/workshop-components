type EnergyDistribution = {
  warpCore: number;
  shields: number;
  lifeSupport: number;
  weapons: number;
};

let energyDistribution: EnergyDistribution = {
  warpCore: 40,
  shields: 30,
  lifeSupport: 20,
  weapons: 10,
};

async function fetchEnergyDistribution() {
  return energyDistribution;
}

async function updateEnergyDistribution(newDistribution: EnergyDistribution) {
  energyDistribution = newDistribution;
  return energyDistribution;
}

export { fetchEnergyDistribution, updateEnergyDistribution };
