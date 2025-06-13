export function getdeliveryPrice(deliveryOptionId) {
  const deliveryOption = deliveryOptions.find(option => option.id === deliveryOptionId);
  return deliveryOption ? deliveryOption.priceCents : 0;
}

export const deliveryOptions = [{
  id: 1,
  deliveryDays: 7,
  priceCents: 0,}
, {
  id: 2,
  deliveryDays: 3,
  priceCents: 499,}
, {
  id: 3,
  deliveryDays: 1,
  priceCents: 999,
}];