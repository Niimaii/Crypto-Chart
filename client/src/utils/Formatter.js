export const shortFormatter = (amount) => {
  if (amount >= 1e9) {
    return `$${(amount / 1e9).toFixed(1)}B`;
  } else if (amount >= 1e6) {
    return `$${(amount / 1e6).toFixed(1)}M`;
  } else if (amount >= 1e3) {
    return `$${(amount / 1e3).toFixed(1)}K`;
  } else {
    return `$${amount.toFixed(2)}`;
  }
};

export const formatterCustom = (money, decimal) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimal,
  });

  return formatter.format(money);
};

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

// High Level: Format based on needs (decimals, type of formatting & '$' usage)
/* The 'chamber' argument is the weird one, basically that tells
the function until when do you want to use the shorthand formatter.
So if chamber is at 5, it will format normal until it reaches values  
above 100k, then it will shorthand. */
export const smartFormatter = (
  money,
  chamber = 6,
  decimal = 2,
  dollar = true
) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimal,
  });
  if (money >= 1e9) {
    // If 'dollar' is true, then keep the '$' symbol; else don't
    if (chamber >= 1) return `${dollar ? '$' : ''}${(money / 1e9).toFixed(1)}B`;
    // If the chamber is incorrect, format normally (not shorthand)
    else
      return dollar
        ? formatter.format(money)
        : formatter.format(money).slice(1);
  } else if (money >= 1e8) {
    if (chamber >= 2) return `${dollar ? '$' : ''}${(money / 1e6).toFixed(1)}M`;
    else
      return dollar
        ? formatter.format(money)
        : formatter.format(money).slice(1);
  } else if (money >= 1e7) {
    if (chamber >= 3) return `${dollar ? '$' : ''}${(money / 1e6).toFixed(1)}M`;
    else
      return dollar
        ? formatter.format(money)
        : formatter.format(money).slice(1);
  } else if (money >= 1e6) {
    if (chamber >= 4) return `${dollar ? '$' : ''}${(money / 1e6).toFixed(1)}M`;
    else
      return dollar
        ? formatter.format(money)
        : formatter.format(money).slice(1);
  } else if (money >= 1e5) {
    if (chamber >= 5) return `${dollar ? '$' : ''}${(money / 1e3).toFixed(1)}K`;
    else
      return dollar
        ? formatter.format(money)
        : formatter.format(money).slice(1);
  } else if (money >= 1e3) {
    if (chamber >= 6) return `${dollar ? '$' : ''}${(money / 1e3).toFixed(1)}K`;
    else
      return dollar
        ? formatter.format(money)
        : formatter.format(money).slice(1);
  } else {
    return dollar ? formatter.format(money) : formatter.format(money).slice(1);
  }
};
