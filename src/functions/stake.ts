export function calculateStakeReturns(
  amount?: string,
  months?: number,
  stakeBonus?: number | undefined,
  stakeLongBonus?: number | undefined
) : {
  bonus: number
  longBonus: number
  APY: number
  total: number
  bonusPercent: number
  longBonusPercent: number
} {
    if (!stakeBonus){
        stakeBonus = 150
    }
    if (!stakeLongBonus){
        stakeLongBonus = 300
    }

    let [bonus, longBonus, APY ,total ,bonusPercent,longBonusPercent] = [0, 0, 0, 0, 0, 0];
    const amountNumber = parseFloat(amount ?? "0") ?? 0;
    months = months ?? 0;

    if (months && amountNumber){
      bonus = amountNumber * months * 30 * stakeBonus / 365 / 1000;
      longBonus = amountNumber * months * 30 * months * 30 / 1000 * stakeLongBonus / 365 / 1000;
      APY = (bonus + longBonus) / months * 12 / amountNumber * 100;
      total = bonus + longBonus;
      bonusPercent = bonus / total * 100;
      longBonusPercent = longBonus / total * 100;
    }

  return {bonus, longBonus, APY, total, bonusPercent, longBonusPercent}
}